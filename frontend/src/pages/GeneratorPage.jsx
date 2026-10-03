import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { usePageTitle } from "../hooks/usePageTitle";
import { api, isAbortError } from "../lib/api";
import ErrorBanner from "../components/ErrorBanner";
import { SkeletonPanel } from "../components/Skeleton";

export default function GeneratorPage() {
  const { templateId } = useParams();
  const navigate = useNavigate();
  const [template, setTemplate] = useState(null);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [step, setStep] = useState(0);

  usePageTitle(template?.name ? `Generate: ${template.name}` : "Generate contract");

  const load = useCallback(() => {
    const ctrl = new AbortController();
    api.getTemplate(templateId, { signal: ctrl.signal })
      .then((t) => {
        setTemplate(t);
        const defaults = {};
        (t.schema?.fields || []).forEach((f) => { defaults[f.key] = f.default || ""; });
        setFormData(defaults);
        setError("");
      })
      .catch((e) => { if (!isAbortError(e)) setError(e.message); })
      .finally(() => setLoading(false));
    return () => ctrl.abort();
  }, [templateId]);

  useEffect(() => load(), [load]);

  const fields = template?.schema?.fields || [];
  const groups = [];
  for (let i = 0; i < fields.length; i += 4) {
    groups.push(fields.slice(i, i + 4));
  }

  function update(key, value) {
    setFormData((prev) => ({ ...prev, [key]: value }));
  }

  async function handleGenerate() {
    setError("");
    setGenerating(true);
    try {
      const result = await api.generateContract(templateId, formData);
      navigate(`/contract/${result.id}`);
    } catch (err) {
      setError(err.message);
      setGenerating(false);
    }
  }

  if (loading) return <SkeletonPanel lines={6} label="Loading template" />;
  if (!template) return <div className="empty"><p>Template not found.</p></div>;

  const atEnd = step >= groups.length - 1;

  return (
    <>
      <div className="page-head">
        <div>
          <h1>{template.name}</h1>
          <p style={{ color: "var(--ink-soft)", fontSize: "0.88rem", margin: 0 }}>
            {template.description}
          </p>
        </div>
      </div>

      <ErrorBanner message={error} onDismiss={() => setError("")} />

      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
        {groups.map((_, i) => (
          <div
            key={i}
            style={{
              flex: 1, height: 4, borderRadius: 2,
              background: i <= step ? "var(--brand)" : "var(--line)",
              transition: "background 200ms ease",
            }}
          />
        ))}
      </div>

      <div className="panel">
        <h2>Step {step + 1} of {groups.length}</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1rem" }}>
          {(groups[step] || []).map((field) => (
            <label key={field.key} style={{ display: "grid", gap: "0.25rem" }}>
              <span>{field.label}{field.required && " *"}</span>
              {field.type === "textarea" ? (
                <textarea
                  rows={3}
                  value={formData[field.key] || ""}
                  placeholder={field.placeholder || ""}
                  onChange={(e) => update(field.key, e.target.value)}
                />
              ) : field.type === "select" ? (
                <select
                  value={formData[field.key] || ""}
                  onChange={(e) => update(field.key, e.target.value)}
                >
                  <option value="">Select…</option>
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
                />
              )}
              {field.hint && <span className="field-hint">{field.hint}</span>}
            </label>
          ))}
        </div>

        <div className="button-row" style={{ marginTop: "1.5rem" }}>
          {step > 0 && (
            <button type="button" className="btn btn-ghost" onClick={() => setStep(step - 1)}>
              Previous
            </button>
          )}
          {atEnd ? (
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleGenerate}
              disabled={generating}
            >
              {generating ? "Generating…" : "Generate contract"}
            </button>
          ) : (
            <button type="button" className="btn btn-primary" onClick={() => setStep(step + 1)}>
              Next
            </button>
          )}
        </div>
      </div>
    </>
  );
}
