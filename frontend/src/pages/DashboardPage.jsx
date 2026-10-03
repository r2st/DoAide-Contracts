import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { usePageTitle } from "../hooks/usePageTitle";
import { api, isAbortError } from "../lib/api";
import StatCard from "../components/StatCard";
import RiskBadge from "../components/RiskBadge";
import ErrorBanner from "../components/ErrorBanner";
import { SkeletonPanel } from "../components/Skeleton";

export default function DashboardPage() {
  usePageTitle("Dashboard");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const load = useCallback(() => {
    const ctrl = new AbortController();
    setLoading(true);
    api.dashboard({ signal: ctrl.signal })
      .then((d) => { setData(d); setError(""); })
      .catch((e) => { if (!isAbortError(e)) setError(e.message); })
      .finally(() => setLoading(false));
    return () => ctrl.abort();
  }, []);

  useEffect(() => load(), [load]);

  if (loading && !data) return <SkeletonPanel lines={6} label="Loading dashboard" />;

  return (
    <>
      <div className="page-head">
        <h1>Dashboard</h1>
        <div className="page-actions">
          <Link to="/review/upload" className="btn btn-primary">Review a contract</Link>
          <Link to="/generate" className="btn btn-ghost">Generate</Link>
        </div>
      </div>

      <ErrorBanner message={error} onDismiss={() => setError("")} />

      <div className="stat-grid">
        <StatCard label="Total contracts" value={data?.total_contracts ?? 0} tone="brand" />
        <StatCard label="Reviewed" value={data?.reviewed ?? 0} tone="good" />
        <StatCard label="Generated" value={data?.generated ?? 0} tone="neutral" />
        <StatCard label="High risk" value={data?.high_risk ?? 0} tone="bad" />
      </div>

      <div className="panel">
        <h2>Recent contracts</h2>
        {(!data?.recent || data.recent.length === 0) ? (
          <div className="empty">
            <p>No contracts yet. Upload one to get started.</p>
            <Link to="/review/upload" className="btn btn-primary" style={{ marginTop: "1rem" }}>
              Upload contract
            </Link>
          </div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Source</th>
                <th>Risk</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {data.recent.map((c) => (
                <tr key={c.id}>
                  <td>
                    <Link to={c.source === "upload" ? `/review/${c.id}` : `/contract/${c.id}`}>
                      {c.title}
                    </Link>
                  </td>
                  <td>{c.source}</td>
                  <td>{c.risk_level ? <RiskBadge level={c.risk_level} /> : "—"}</td>
                  <td><span className="chip chip-neutral">{c.status}</span></td>
                  <td style={{ fontSize: "0.85rem", color: "var(--ink-soft)" }}>
                    {new Date(c.created_at).toLocaleDateString("en-IN")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
