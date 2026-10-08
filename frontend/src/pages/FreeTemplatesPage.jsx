import { useState } from "react";
import { Link } from "react-router-dom";
import ToolsNav from "../components/ToolsNav";
import ShareButtons from "../components/ShareButtons";
import { usePageTitle } from "../hooks/usePageTitle";
import { TEMPLATES } from "../lib/templates";

const ICONS = {
  lock: (
    <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="#F0B429" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></svg>
  ),
  briefcase: (
    <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="#F0B429" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" /></svg>
  ),
  user: (
    <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="#F0B429" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
  ),
  home: (
    <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="#F0B429" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
  ),
  users: (
    <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="#F0B429" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" /></svg>
  ),
  handshake: (
    <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="#F0B429" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="8" y1="13" x2="16" y2="13" /><line x1="8" y1="17" x2="13" y2="17" /></svg>
  ),
};

const CATEGORIES = [
  { key: "all", label: "All Templates" },
  { key: "nda", label: "NDA" },
  { key: "employment", label: "Employment" },
  { key: "sow", label: "Freelancer / SOW" },
  { key: "rental", label: "Rental" },
  { key: "msa", label: "Business / MSA" },
];

function TemplatePreview({ body }) {
  const lines = body.split("\n").slice(0, 8).join("\n");
  return (
    <pre className="template-preview-snippet">{lines}</pre>
  );
}

export default function FreeTemplatesPage() {
  usePageTitle("Free Contract Templates India 2026 — NDA, Employment, Rental, Partnership");
  const [activeCategory, setActiveCategory] = useState("all");
  const [expandedSlug, setExpandedSlug] = useState(null);

  const filtered = activeCategory === "all"
    ? TEMPLATES
    : TEMPLATES.filter((t) => t.category === activeCategory);

  return (
    <div className="tool-page">
      <ToolsNav />
      <main className="tool-main">
        <div className="tool-container">
          <h1 className="tool-title">Template Gallery</h1>
          <p className="tool-subtitle">
            Browse legally-sound contract templates for Indian businesses. Preview the full text,
            customize with your details, and download — no sign-up required.
          </p>

          <div className="template-gallery-filters" role="tablist" aria-label="Filter by category">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                role="tab"
                aria-selected={activeCategory === cat.key}
                className={`template-filter-btn ${activeCategory === cat.key ? "active" : ""}`}
                onClick={() => setActiveCategory(cat.key)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <p className="template-gallery-count">{filtered.length} template{filtered.length !== 1 ? "s" : ""}</p>

          <div className="template-grid">
            {filtered.map((t) => (
              <div key={t.slug} className="template-card">
                <Link to={`/template/${t.slug}`} className="template-card-link">
                  <div className="template-card-icon">
                    {ICONS[t.icon] || ICONS.handshake}
                  </div>
                  <h2>{t.name}</h2>
                  <p>{t.description}</p>
                </Link>

                <TemplatePreview body={t.body} />

                <div className="template-card-meta">
                  <span className="chip chip-neutral">{t.category}</span>
                  <span className="template-field-count">{t.fields.length} fields</span>
                </div>

                {expandedSlug === t.slug && (
                  <pre className="template-expanded-preview">
                    {t.body.split("\n").slice(0, 20).join("\n")}
                    {"\n..."}
                  </pre>
                )}

                <div className="template-card-actions">
                  <button
                    type="button"
                    className="btn btn-ghost template-preview-toggle"
                    onClick={() => setExpandedSlug(expandedSlug === t.slug ? null : t.slug)}
                    aria-expanded={expandedSlug === t.slug}
                  >
                    {expandedSlug === t.slug ? "Hide preview" : "Quick preview"}
                  </button>
                  <Link to={`/template/${t.slug}`} className="template-card-cta">
                    View template →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "2rem", textAlign: "center" }}>
            <ShareButtons
              path="/templates"
              text="Free contract templates for Indian businesses — NDA, Employment, Rental, Partnership, and more"
              label="Share templates"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
