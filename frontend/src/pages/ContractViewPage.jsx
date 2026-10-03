import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { usePageTitle } from "../hooks/usePageTitle";
import { api, isAbortError } from "../lib/api";
import RiskBadge from "../components/RiskBadge";
import ErrorBanner from "../components/ErrorBanner";
import { SkeletonPanel } from "../components/Skeleton";

export default function ContractViewPage() {
  const { id } = useParams();
  const [contract, setContract] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  usePageTitle(contract?.title || "Contract");

  const load = useCallback(() => {
    const ctrl = new AbortController();
    setLoading(true);
    api.getContract(id, { signal: ctrl.signal })
      .then((c) => { setContract(c); setError(""); })
      .catch((e) => { if (!isAbortError(e)) setError(e.message); })
      .finally(() => setLoading(false));
    return () => ctrl.abort();
  }, [id]);

  useEffect(() => load(), [load]);

  if (loading) return <SkeletonPanel lines={6} label="Loading contract" />;

  return (
    <>
      <div className="page-head">
        <div>
          <h1>{contract?.title || "Contract"}</h1>
          <p style={{ color: "var(--ink-soft)", fontSize: "0.88rem", margin: 0 }}>
            {contract?.source === "generated" ? "Generated" : "Uploaded"} · {contract?.status}
            {contract?.created_at && ` · ${new Date(contract.created_at).toLocaleDateString("en-IN")}`}
          </p>
        </div>
        <div className="page-actions">
          <Link to="/" className="btn btn-ghost">Back to dashboard</Link>
        </div>
      </div>

      <ErrorBanner message={error} onDismiss={() => setError("")} />

      {contract && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
          <div className="panel">
            <h2>Details</h2>
            <dl style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "0.5rem 1rem", fontSize: "0.9rem" }}>
              <dt style={{ color: "var(--ink-soft)" }}>Source</dt>
              <dd style={{ margin: 0 }}>{contract.source}</dd>
              <dt style={{ color: "var(--ink-soft)" }}>File type</dt>
              <dd style={{ margin: 0 }}>{contract.file_type?.toUpperCase() || "—"}</dd>
              <dt style={{ color: "var(--ink-soft)" }}>Language</dt>
              <dd style={{ margin: 0 }}>{contract.language === "hi" ? "Hindi" : "English"}</dd>
              <dt style={{ color: "var(--ink-soft)" }}>Status</dt>
              <dd style={{ margin: 0 }}><span className="chip chip-neutral">{contract.status}</span></dd>
              {contract.risk_level && (
                <>
                  <dt style={{ color: "var(--ink-soft)" }}>Risk level</dt>
                  <dd style={{ margin: 0 }}><RiskBadge level={contract.risk_level} /></dd>
                </>
              )}
            </dl>
          </div>
          <div className="panel">
            <h2>Actions</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {contract.source === "upload" && (
                <Link to={`/review/${contract.id}`} className="btn btn-primary" style={{ textAlign: "center" }}>
                  View clause review
                </Link>
              )}
              <button type="button" className="btn btn-ghost" onClick={() => window.alert("Download coming soon")}>
                Download PDF
              </button>
              <button type="button" className="btn btn-ghost" onClick={() => window.alert("Download coming soon")}>
                Download DOCX
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
