import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import ToolsNav from "../components/ToolsNav";
import ShareButtons from "../components/ShareButtons";
import { usePageTitle } from "../hooks/usePageTitle";
import { TEMPLATES, fillTemplate, getTemplateBySlug } from "../lib/templates";

export default function FreeGeneratorPage() {
  usePageTitle("Free Contract Generator — Create Contracts in 60 Seconds");
  const [searchParams] = useSearchParams();
  const initialSlug = searchParams.get("template") || "";
  const [selectedSlug, setSelectedSlug] = useState(initialSlug);
  const [formData, setFormData] = useState({});
  const [generated, setGenerated] = useState(null);

  const template = getTemplateBySlug(selectedSlug);

  function handleSelectTemplate(slug) {
    setSelectedSlug(slug);
    setFormData({});
    setGenerated(null);
  }

  function update(key, value) {
    setFormData((prev) => ({ ...prev, [key]: value }));
  }

  function handleGenerate(e) {
    e.preventDefault();
    if (!template) return;
    const filled = fillTemplate(template.body, formData);
    setGenerated(filled);
  }

  function handleCopyContract() {
    if (!generated) return;
    navigator.clipboard?.writeText(generated).catch(() => {});
  }

  return (
    <div className="tool-page">
      <ToolsNav />
      <main className="tool-main">
        <div className="tool-container">
          <h1 className="tool-title">Free Contract Generator</h1>
          <p className="tool-subtitle">
            Pick a template, fill in your details, and get an instant contract preview.
            No sign-up required.
          </p>

          {!template && (
            <div className="generator-select">
              <h2>Choose a template</h2>
              <div className="generator-template-list">
                {TEMPLATES.map((t) => (
                  <button
                    key={t.slug}
                    type="button"
                    className="generator-template-btn"
                    onClick={() => handleSelectTemplate(t.slug)}
                  >
                    <strong>{t.name}</strong>
                    <span>{t.description}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {template && !generated && (
            <form onSubmit={handleGenerate} className="generator-form">
              <div className="generator-form-header">
                <h2>{template.name}</h2>
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => { setSelectedSlug(""); setFormData({}); }}
                >
                  Change template
                </button>
              </div>

              <div className="generator-fields">
                {template.fields.map((field) => (
                  <label key={field.key} className="generator-field">
                    <span>{field.label}{field.required && " *"}</span>
                    {field.type === "textarea" ? (
                      <textarea
                        rows={3}
                        value={formData[field.key] || ""}
                        placeholder={field.placeholder || ""}
                        onChange={(e) => update(field.key, e.target.value)}
                        required={field.required}
                      />
                    ) : field.type === "select" ? (
                      <select
                        value={formData[field.key] || ""}
                        onChange={(e) => update(field.key, e.target.value)}
                        required={field.required}
                      >
                        <option value="">Select...</option>
                        {(field.options || []).map((o) => (
                          <option key={o} value={o}>{o}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={field.type || "text"}
                        value={formData[field.key] || ""}
                        placeholder={field.placeholder || ""}
                        onChange={(e) => update(field.key, e.target.value)}
                        required={field.required}
                      />
                    )}
                  </label>
                ))}
              </div>

              <div className="button-row" style={{ marginTop: "1.5rem" }}>
                <button type="submit" className="btn btn-primary">
                  Generate Contract
                </button>
              </div>
            </form>
          )}

          {generated && (
            <div className="generator-result">
              <div className="generator-result-header">
                <h2>Your Contract</h2>
                <div className="generator-result-actions">
                  <button type="button" className="btn btn-primary" onClick={handleCopyContract}>
                    Copy to clipboard
                  </button>
                  <button
                    type="button"
                    className="btn btn-ghost"
                    onClick={() => setGenerated(null)}
                  >
                    Edit details
                  </button>
                  <button
                    type="button"
                    className="btn btn-ghost"
                    onClick={() => { setSelectedSlug(""); setFormData({}); setGenerated(null); }}
                  >
                    New contract
                  </button>
                </div>
              </div>

              <pre className="template-body generator-output">{generated}</pre>

              <div className="generator-share-section">
                <ShareButtons
                  path="/generator"
                  text="Generate free contracts instantly — NDA, Employment, Rental, and more"
                  label="Share generator"
                />
                <a
                  href={`https://wa.me/?text=${encodeURIComponent("Here's the contract I generated — please review: https://contracts.doaide.com/generator")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost"
                  style={{ marginTop: "0.75rem" }}
                >
                  Share with your lawyer
                </a>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
