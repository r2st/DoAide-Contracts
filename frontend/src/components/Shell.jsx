import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import ThemeToggle from "./ThemeToggle";

const LINKS = [
  { to: "/", label: "Dashboard", end: true },
  { to: "/review/upload", label: "Review" },
  { to: "/generate", label: "Generate" },
  { to: "/templates", label: "Templates" },
  { to: "/settings", label: "Settings" },
];

export default function Shell({ children }) {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [navOpen, setNavOpen] = useState(false);
  const toggleRef = useRef(null);

  useEffect(() => { setNavOpen(false); }, [location.pathname]);

  useEffect(() => {
    if (!navOpen) return undefined;
    function onKeyDown(e) {
      if (e.key === "Escape") {
        setNavOpen(false);
        toggleRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [navOpen]);

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <div className="shell">
      <a className="skip-link" href="#main">Skip to content</a>

      <header className="shell-header">
        <div className="brand">
          <svg viewBox="0 0 32 32" className="brand-icon" aria-hidden="true">
            <rect width="32" height="32" rx="6" fill="#0A0A0B"/>
            <path d="M8 7h12a2 2 0 012 2v14a2 2 0 01-2 2H8V7z" fill="#F0B429" opacity="0.9"/>
            <rect x="12" y="11" width="8" height="1.5" rx="0.75" fill="#0A0A0B"/>
            <rect x="12" y="14.5" width="6" height="1.5" rx="0.75" fill="#0A0A0B"/>
            <rect x="12" y="18" width="7" height="1.5" rx="0.75" fill="#0A0A0B"/>
          </svg>
          <span className="brand-name">DoAide <span className="brand-accent">Contracts</span></span>
        </div>

        <button
          type="button"
          ref={toggleRef}
          className="nav-toggle"
          aria-expanded={navOpen}
          aria-controls="main-nav"
          onClick={() => setNavOpen((o) => !o)}
        >
          <span className="nav-toggle-bars" aria-hidden="true" />
          <span className="visually-hidden">{navOpen ? "Close menu" : "Open menu"}</span>
        </button>

        <nav
          id="main-nav"
          className={navOpen ? "shell-nav is-open" : "shell-nav"}
          aria-label="Main"
        >
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) => (isActive ? "nav-link is-active" : "nav-link")}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="shell-user">
          <ThemeToggle />
          <button type="button" className="btn btn-ghost" onClick={handleLogout}>
            Sign out
          </button>
        </div>
      </header>

      {navOpen && (
        <div className="nav-scrim" onClick={() => setNavOpen(false)} aria-hidden="true" />
      )}

      <main className="shell-main" id="main">
        {children}
      </main>
    </div>
  );
}
