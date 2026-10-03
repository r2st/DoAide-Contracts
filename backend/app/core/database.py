from __future__ import annotations

from collections.abc import Generator

from sqlalchemy import create_engine, event, text
from sqlalchemy.engine import Engine
from sqlalchemy.orm import DeclarativeBase, Session, sessionmaker
from sqlalchemy.pool import StaticPool

from app.core.config import settings


class Base(DeclarativeBase):
    pass


def _make_engine(url: str) -> Engine:
    common = {"pool_pre_ping": True, "future": True, "echo": False}

    if url.startswith("sqlite"):
        kwargs = {"check_same_thread": False}
        if ":memory:" in url or "mode=memory" in url:
            new_engine = create_engine(url, connect_args=kwargs, poolclass=StaticPool, **common)
        else:
            new_engine = create_engine(url, connect_args=kwargs, **common)

        @event.listens_for(new_engine, "connect")
        def _sqlite_pragmas(dbapi_connection, _record):
            cursor = dbapi_connection.cursor()
            cursor.execute("PRAGMA foreign_keys=ON")
            cursor.close()

        return new_engine

    return create_engine(
        url,
        pool_size=10,
        max_overflow=5,
        pool_timeout=30,
        pool_recycle=1800,
        **common,
    )


engine = _make_engine(settings.database_url)
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False, future=True)


def get_db() -> Generator[Session, None, None]:
    db = SessionLocal()
    try:
        yield db
    except Exception:
        db.rollback()
        raise
    finally:
        db.close()


def check_database(session: Session | None = None) -> tuple[bool, str | None]:
    try:
        if session is not None:
            session.execute(text("SELECT 1"))
        else:
            with engine.connect() as connection:
                connection.execute(text("SELECT 1"))
        return True, None
    except Exception as exc:
        return False, type(exc).__name__
