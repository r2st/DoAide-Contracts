import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import ToolsNav from "../components/ToolsNav";
import ShareButtons from "../components/ShareButtons";
import { usePageTitle } from "../hooks/usePageTitle";
import { getTemplateBySlug } from "../lib/templates";

export default function TemplateDetailPage() {
  const { slug } = useParams();
  const template = getTemplateBySlug(slug);
  const [showFull, setShowFull] = useState(false);

  usePageTitle(template ? `Free ${template.name} Template India 2026` : "Template not found");

  if (!template) {
    return (
      <div className="tool-page">
        <ToolsNav />
        <main className="tool-main">
          <div className="tool-container">
            <div className="empty">
              <p>Template not found.</p>
              <Link to="/templates" className="btn btn-primary" style={{ marginTop: "1rem", display: "inline-block" }}>
                Browse all templates
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const previewLines = template.body.split("\n").slice(0, 20).join("\n");

  return (
    <div className="tool-page">
      <ToolsNav />
      <main className="tool-main">
        <div className="tool-container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/templates">Templates</Link>
            <span aria-hidden="true"> / </span>
            <span>{template.name}</span>
          </nav>

          <h1 className="tool-title">{template.name}</h1>
          <p className="tool-subtitle">{template.description}</p>

          <div className="template-actions">
            <Link to={`/generator?template=${slug}`} className="btn btn-primary">
              Customize & Generate
            </Link>
            <ShareButtons
              path={`/template/${slug}`}
              text={`Free ${template.name} template for Indian businesses`}
              label={`Share ${template.name}`}
            />
          </div>

          <div className="panel template-preview">
            <h2>Template Preview</h2>
            <pre className="template-body">
              {showFull ? template.body : previewLines + "\n\n..."}
            </pre>
            {!showFull && (
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => setShowFull(true)}
                style={{ marginTop: "1rem" }}
              >
                Show full template
              </button>
            )}
          </div>

          <div className="panel">
            <h2>Key Fields</h2>
            <div className="template-fields-preview">
              {template.fields.map((f) => (
                <div key={f.key} className="template-field-item">
                  <strong>{f.label}</strong>
                  {f.required && <span className="chip chip-warn" style={{ marginLeft: "0.5rem" }}>Required</span>}
                  {f.placeholder && <span style={{ color: "var(--ink-soft)", fontSize: "0.85rem", display: "block" }}>{f.placeholder}</span>}
                </div>
              ))}
            </div>
          </div>

          <div className="template-share-lawyer">
            <h2>Need legal review?</h2>
            <p>Share this template with your lawyer for review before signing.</p>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(`Please review this contract template: ${template.name} — https://contracts.doaide.com/template/${slug}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Share with your lawyer
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
