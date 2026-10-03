import { Link, useLocation } from "react-router-dom";

const TOOLS = [
  { path: "/tools", label: "All Tools" },
  { path: "/templates", label: "Templates" },
  { path: "/generator", label: "Generator" },
  { path: "/checker", label: "Clause Checker" },
];

export default function ToolsNav() {
  const { pathname } = useLocation();

  return (
    <nav className="tools-nav" aria-label="Contract tools">
      <Link to="/" className="tools-nav-brand">
        DoAide <em>Contracts</em>
      </Link>
      <div className="tools-nav-links">
        {TOOLS.map((t) => (
          <Link
            key={t.path}
            to={t.path}
            className={`tools-nav-link${pathname.startsWith(t.path) ? " active" : ""}`}
          >
            {t.label}
          </Link>
        ))}
      </div>
      <Link to="/" className="tools-nav-cta">Sign up free</Link>
    </nav>
  );
}
