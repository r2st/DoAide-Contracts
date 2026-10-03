import { useCallback, useEffect, useState } from "react";
import { usePageTitle } from "../hooks/usePageTitle";
import { api, isAbortError } from "../lib/api";
import ErrorBanner from "../components/ErrorBanner";
import { SkeletonPanel } from "../components/Skeleton";

export default function MyTemplatesPage() {
  usePageTitle("My templates");
  const [templates, setTemplates] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const load = useCallback(() => {
    const ctrl = new AbortController();
    setLoading(true);
    api.listTemplates({ custom: true }, { signal: ctrl.signal })
      .then((d) => { setTemplates(d?.templates || d || []); setError(""); })
      .catch((e) => { if (!isAbortError(e)) setError(e.message); })
      .finally(() => setLoading(false));
    return () => ctrl.abort();
  }, []);

  useEffect(() => load(), [load]);

  return (
    <>
      <div className="page-head">
        <h1>My templates</h1>
        <div className="page-actions">
          <button type="button" className="btn btn-primary" onClick={() => window.alert("Template editor coming soon")}>
            Create template
          </button>
        </div>
      </div>

      <ErrorBanner message={error} onDismiss={() => setError("")} />

      {loading ? (
        <SkeletonPanel lines={4} label="Loading templates" />
      ) : templates.length === 0 ? (
        <div className="empty">
          <p>You have not created any custom templates yet.</p>
          <p className="field-hint" style={{ marginTop: "0.5rem" }}>
            Custom templates are available on Pro and Business plans.
          </p>
        </div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Language</th>
              <th>Uses</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {templates.map((t) => (
              <tr key={t.id}>
                <td><strong>{t.name}</strong></td>
                <td><span className="chip chip-neutral">{t.category?.replace("_", " ")}</span></td>
                <td>{t.language === "hi" ? "Hindi" : "English"}</td>
                <td>{t.usage_count}</td>
                <td style={{ fontSize: "0.85rem", color: "var(--ink-soft)" }}>
                  {new Date(t.created_at).toLocaleDateString("en-IN")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
