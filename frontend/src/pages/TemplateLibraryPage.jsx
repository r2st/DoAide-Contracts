import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { usePageTitle } from "../hooks/usePageTitle";
import { api, isAbortError } from "../lib/api";
import ErrorBanner from "../components/ErrorBanner";
import { SkeletonPanel } from "../components/Skeleton";

const CATEGORIES = [
  { key: "", label: "All" },
  { key: "gst_vendor", label: "GST Vendor" },
  { key: "rental", label: "Rental" },
  { key: "employment", label: "Employment" },
  { key: "nda", label: "NDA" },
  { key: "msa", label: "MSA" },
  { key: "sow", label: "SoW" },
  { key: "real_estate", label: "Real Estate" },
];

const CATEGORY_ICONS = {
  gst_vendor: "📋",
  rental: "🏠",
  employment: "👔",
  nda: "🔒",
  msa: "📝",
  sow: "📊",
  real_estate: "🏢",
};

export default function TemplateLibraryPage() {
  usePageTitle("Template library");
  const [templates, setTemplates] = useState([]);
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const load = useCallback(() => {
    const ctrl = new AbortController();
    setLoading(true);
    api.listTemplates({ category: category || undefined, search: search || undefined }, { signal: ctrl.signal })
      .then((d) => { setTemplates(d?.templates || d || []); setError(""); })
      .catch((e) => { if (!isAbortError(e)) setError(e.message); })
      .finally(() => setLoading(false));
    return () => ctrl.abort();
  }, [category, search]);

  useEffect(() => load(), [load]);

  return (
    <>
      <div className="page-head">
        <h1>Template library</h1>
      </div>

      <ErrorBanner message={error} onDismiss={() => setError("")} />

      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1rem" }}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            type="button"
            className={`chip ${category === cat.key ? "chip-good" : "chip-neutral"}`}
            style={{ cursor: "pointer", border: category === cat.key ? "1px solid currentColor" : "1px solid transparent" }}
            onClick={() => setCategory(cat.key)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <input
          type="search"
          placeholder="Search templates…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ maxWidth: 400 }}
        />
      </div>

      {loading ? (
        <SkeletonPanel lines={6} label="Loading templates" />
      ) : templates.length === 0 ? (
        <div className="empty">
          <p>No templates found{category ? ` in "${CATEGORIES.find((c) => c.key === category)?.label}"` : ""}.</p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1rem" }}>
          {templates.map((t) => (
            <Link
              key={t.id}
              to={`/generate/${t.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className="panel" style={{ cursor: "pointer", transition: "border-color 200ms ease" }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = "var(--brand)"}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = "var(--line)"}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                  <span style={{ fontSize: "1.5rem" }}>{CATEGORY_ICONS[t.category] || "📄"}</span>
                  <strong>{t.name}</strong>
                </div>
                <p style={{ fontSize: "0.85rem", color: "var(--ink-soft)", margin: "0 0 0.5rem" }}>
                  {t.description || `${t.category} template`}
                </p>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <span className="chip chip-neutral">{t.category?.replace("_", " ")}</span>
                  {t.subcategory && <span className="chip chip-neutral">{t.subcategory}</span>}
                  {t.language === "hi" && <span className="chip chip-warn">Hindi</span>}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
