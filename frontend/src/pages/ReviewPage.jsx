import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { usePageTitle } from "../hooks/usePageTitle";
import { api, isAbortError } from "../lib/api";
import RiskBadge from "../components/RiskBadge";
import ErrorBanner from "../components/ErrorBanner";
import { SkeletonPanel } from "../components/Skeleton";

function ClauseCard({ clause }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="panel" style={{ borderLeftColor: `var(--${clause.risk_level === "high" ? "bad" : clause.risk_level === "medium" ? "warn" : "good"})`, borderLeftWidth: 3 }}>
      <div
        style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}
        onClick={() => setOpen(!open)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && setOpen(!open)}
      >
        <div>
          <strong>{clause.clause_title || `Clause ${clause.clause_index + 1}`}</strong>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <RiskBadge level={clause.risk_level} />
          <span style={{ color: "var(--ink-soft)", fontSize: "0.85rem" }}>
            {open ? "▲" : "▼"}
          </span>
        </div>
      </div>

      {open && (
        <div style={{ marginTop: "0.75rem" }}>
          <div style={{ padding: "0.75rem", background: "var(--canvas)", borderRadius: "var(--radius)", marginBottom: "0.75rem", fontSize: "0.9rem", lineHeight: 1.6 }}>
            {clause.clause_text}
          </div>

          {clause.issues?.length > 0 && (
            <div style={{ marginBottom: "0.75rem" }}>
              <strong style={{ fontSize: "0.82rem", color: "var(--ink-soft)" }}>Issues identified:</strong>
              <ul style={{ paddingLeft: "1.1rem", margin: "0.4rem 0 0", fontSize: "0.88rem" }}>
                {clause.issues.map((issue, i) => (
                  <li key={i} style={{ color: `var(--${issue.severity === "high" ? "bad" : issue.severity === "medium" ? "warn" : "ink"})` }}>
                    {issue.description}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {clause.explanation && (
            <div style={{ marginBottom: "0.75rem" }}>
              <strong style={{ fontSize: "0.82rem", color: "var(--ink-soft)" }}>Plain-English explanation:</strong>
              <p style={{ margin: "0.3rem 0 0", fontSize: "0.88rem" }}>{clause.explanation}</p>
            </div>
          )}

          {clause.suggested_clause && (
            <div>
              <strong style={{ fontSize: "0.82rem", color: "var(--good)" }}>Suggested revision:</strong>
              <div style={{ padding: "0.75rem", background: "var(--good-bg)", borderRadius: "var(--radius)", marginTop: "0.3rem", fontSize: "0.88rem", lineHeight: 1.6 }}>
                {clause.suggested_clause}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function RiskScoreRing({ score }) {
  const pct = Math.round((score ?? 0) * 100);
  const color = pct >= 70 ? "var(--bad)" : pct >= 40 ? "var(--warn)" : "var(--good)";
  const circumference = 2 * Math.PI * 40;
  const offset = circumference - (pct / 100) * circumference;

  return (
    <div style={{ textAlign: "center" }}>
      <svg width="100" height="100" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="40" fill="none" stroke="var(--line)" strokeWidth="8" />
        <circle
          cx="50" cy="50" r="40" fill="none" stroke={color} strokeWidth="8"
          strokeDasharray={circumference} strokeDashoffset={offset}
          strokeLinecap="round" transform="rotate(-90 50 50)"
        />
        <text x="50" y="50" textAnchor="middle" dominantBaseline="central"
          fontSize="20" fontWeight="700" fill="var(--ink-strong)">
          {pct}
        </text>
      </svg>
      <div style={{ fontSize: "0.82rem", color: "var(--ink-soft)", marginTop: "0.25rem" }}>
        Risk Score
      </div>
    </div>
  );
}

export default function ReviewPage() {
  const { id } = useParams();
  const [contract, setContract] = useState(null);
  const [clauses, setClauses] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  usePageTitle(contract?.title || "Contract review");

  const load = useCallback(() => {
    const ctrl = new AbortController();
    setLoading(true);
    Promise.all([
      api.getContract(id, { signal: ctrl.signal }),
      api.getContractClauses(id, { signal: ctrl.signal }),
    ])
      .then(([c, cl]) => {
        setContract(c);
        setClauses(cl?.clauses || cl || []);
        setError("");
      })
      .catch((e) => { if (!isAbortError(e)) setError(e.message); })
      .finally(() => setLoading(false));
    return () => ctrl.abort();
  }, [id]);

  useEffect(() => load(), [load]);

  if (loading) return <SkeletonPanel lines={8} label="Loading contract review" />;

  return (
    <>
      <div className="page-head">
        <div>
          <h1>{contract?.title || "Contract Review"}</h1>
          <p style={{ color: "var(--ink-soft)", fontSize: "0.88rem", margin: 0 }}>
            {contract?.file_type?.toUpperCase()} · Uploaded {contract?.created_at ? new Date(contract.created_at).toLocaleDateString("en-IN") : ""}
          </p>
        </div>
        <div className="page-actions">
          <Link to="/review/upload" className="btn btn-ghost">Upload another</Link>
        </div>
      </div>

      <ErrorBanner message={error} onDismiss={() => setError("")} />

      {contract && (
        <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "1.5rem", marginBottom: "1.5rem", alignItems: "start" }}>
          <RiskScoreRing score={contract.overall_risk_score} />
          <div className="stat-grid" style={{ marginBottom: 0 }}>
            <div className="stat-card tone-bad">
              <div className="stat-label">High risk clauses</div>
              <div className="stat-value">{clauses.filter((c) => c.risk_level === "high").length}</div>
            </div>
            <div className="stat-card tone-warn">
              <div className="stat-label">Medium risk</div>
              <div className="stat-value">{clauses.filter((c) => c.risk_level === "medium").length}</div>
            </div>
            <div className="stat-card tone-good">
              <div className="stat-label">Low risk</div>
              <div className="stat-value">{clauses.filter((c) => c.risk_level === "low").length}</div>
            </div>
          </div>
        </div>
      )}

      <h2>Clause-by-clause review ({clauses.length} clauses)</h2>
      {clauses.map((clause) => (
        <ClauseCard key={clause.id || clause.clause_index} clause={clause} />
      ))}

      {clauses.length === 0 && !error && (
        <div className="empty">
          <p>No clauses found. The contract may still be processing.</p>
          <button type="button" className="btn btn-primary" onClick={load} style={{ marginTop: "1rem" }}>
            Refresh
          </button>
        </div>
      )}
    </>
  );
}
