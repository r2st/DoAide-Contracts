import { Link, useLocation } from "react-router-dom";

const TOOLS = [
  { path: "/tools", label: "All Tools" },
  { path: "/templates", label: "Templates" },
  { path: "/generator", label: "Generator" },
  { path: "/checker", label: "Clause Checker" },
  { path: "/tools/risk-analyzer", label: "Risk Analyzer" },
  { path: "/tools/contract-comparison", label: "Compare" },
  { path: "/tools/stamp-duty-calculator", label: "Stamp Duty" },
  { path: "/tools/clause-library", label: "Clauses" },
  { path: "/tools/e-signature-placeholder", label: "E-Sign" },
  { path: "/tools/version-history", label: "Versions" },
  { path: "/tools/template-customizer", label: "Customizer" },
];

export default function ToolsNav() {
  const { pathname } = useLocation();

  return (
    <nav className="tools-nav" aria-label="Contract tools">
      <Link to="/" className="tools-nav-brand">
        <span className="teal">DoAide</span> <span className="pipe">|</span> <span className="product">Contracts</span>
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
      <Link to="/generator" className="tools-nav-cta">Create contract</Link>
    </nav>
  );
}
