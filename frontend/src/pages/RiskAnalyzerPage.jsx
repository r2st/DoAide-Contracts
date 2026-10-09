import { useState } from "react";
import ToolsNav from "../components/ToolsNav";
import ShareButtons from "../components/ShareButtons";
import { usePageTitle } from "../hooks/usePageTitle";
const API_URL = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api`
  : "/api";

function RiskBadgeInline({ level }) {
  const cls = level === "high" ? "risk-high" : level === "medium" ? "risk-medium" : "risk-low";
  return <span className={`risk-badge ${cls}`}>{level}</span>;
}

function ImportanceBadge({ importance }) {
  const cls = importance === "critical" ? "risk-high" : importance === "recommended" ? "risk-medium" : "risk-low";
  return <span className={`risk-badge ${cls}`}>{importance}</span>;
}

function ScoreGauge({ score }) {
  const color = score >= 70 ? "var(--bad)" : score >= 40 ? "var(--warn)" : "var(--good)";
  return (
    <div className="risk-gauge" style={{ textAlign: "center" }}>
      <div style={{ position: "relative", display: "inline-block", width: 120, height: 120 }}>
        <svg viewBox="0 0 120 120" width="120" height="120">
          <circle cx="60" cy="60" r="50" fill="none" stroke="var(--line)" strokeWidth="8" />
          <circle
            cx="60" cy="60" r="50" fill="none" stroke={color} strokeWidth="8"
            strokeDasharray={`${(score / 100) * 314} 314`}
            strokeLinecap="round"
            transform="rotate(-90 60 60)"
          />
        </svg>
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
          <span style={{ fontSize: "1.75rem", fontWeight: 700, color }}>{score}</span>
          <span style={{ fontSize: "0.7rem", color: "var(--ink-soft)" }}>Risk Score</span>
        </div>
      </div>
    </div>
  );
}

export default function RiskAnalyzerPage() {
  usePageTitle("Free Contract Risk Analyzer — AI-Powered Analysis for Indian Contracts");
  const [contractText, setContractText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleAnalyze(e) {
    e.preventDefault();
    if (!contractText.trim() || contractText.trim().length < 50) {
      setError("Please paste at least 50 characters of contract text.");
      return;
    }
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await fetch(`${API_URL}/risk-analyzer/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contract_text: contractText }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.detail || `Analysis failed (${res.status})`);
      }
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError(err.message || "Analysis failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleClear() {
    setContractText("");
    setResult(null);
    setError("");
  }

  return (
    <div className="tool-page">
      <ToolsNav />
      <main className="tool-main">
        <div className="tool-container">
          <h1 className="tool-title">Contract Risk Analyzer</h1>
          <p className="tool-subtitle">
            Paste your contract text for AI-powered risk analysis. Get insights on risky clauses,
            missing protections, and Indian law considerations — free, no login required.
          </p>

          <form onSubmit={handleAnalyze}>
            <div className="checker-input-area">
              <textarea
                rows={12}
                value={contractText}
                onChange={(e) => setContractText(e.target.value)}
                placeholder="Paste your contract text here (minimum 50 characters)..."
                className="checker-textarea"
                aria-label="Contract text to analyze"
                disabled={loading}
              />
              <div className="checker-count">
                {contractText.length.toLocaleString()} characters
              </div>
            </div>

            {error && (
              <div className="banner banner-error" style={{ marginTop: "0.75rem" }}>
                {error}
              </div>
            )}

            <div className="button-row" style={{ marginTop: "1rem" }}>
              <button type="submit" className="btn btn-primary" disabled={loading || !contractText.trim()}>
                {loading ? (
                  <><span className="spinner" /> Analyzing...</>
                ) : (
                  "Analyze Contract Risk"
                )}
              </button>
              {result && (
                <button type="button" className="btn btn-ghost" onClick={handleClear}>
                  Clear
                </button>
              )}
            </div>
          </form>

          {result && (
            <div className="risk-results" style={{ marginTop: "1.5rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", marginBottom: "1.5rem" }}>
                <div className="stat-card" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem", padding: "1.5rem" }}>
                  <ScoreGauge score={result.risk_score} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  <div className={`stat-card ${result.overall_risk === "high" ? "tone-bad" : result.overall_risk === "medium" ? "tone-warn" : "tone-good"}`}>
                    <div className="stat-label">Overall Risk</div>
                    <div className="stat-value" style={{ textTransform: "capitalize" }}>{result.overall_risk}</div>
                  </div>
                  <div className={`stat-card ${result.risky_clauses.length > 3 ? "tone-bad" : "tone-warn"}`}>
                    <div className="stat-label">Risky Clauses</div>
                    <div className="stat-value">{result.risky_clauses.length}</div>
                  </div>
                  <div className={`stat-card ${result.missing_clauses.length > 2 ? "tone-warn" : "tone-good"}`}>
                    <div className="stat-label">Missing Clauses</div>
                    <div className="stat-value">{result.missing_clauses.length}</div>
                  </div>
                </div>
              </div>

              {result.summary && (
                <div className="panel">
                  <h2>Summary</h2>
                  <p style={{ color: "var(--ink-soft)", lineHeight: 1.7, margin: 0 }}>{result.summary}</p>
                </div>
              )}

              {result.risky_clauses.length > 0 && (
                <div className="panel" style={{ marginTop: "1rem" }}>
                  <h2>Risky Clauses Found</h2>
                  <div style={{ display: "grid", gap: "1rem" }}>
                    {result.risky_clauses.map((item, i) => (
                      <div key={i} style={{ padding: "0.75rem", borderRadius: "var(--radius)", border: "1px solid var(--line)", background: "var(--canvas)" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                          <RiskBadgeInline level={item.risk_level} />
                          <strong style={{ fontSize: "0.9rem" }}>{item.clause}</strong>
                        </div>
                        <p style={{ margin: "0 0 0.35rem", fontSize: "0.85rem", color: "var(--ink-soft)" }}>
                          <strong>Issue:</strong> {item.issue}
                        </p>
                        <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--good)" }}>
                          <strong>Suggestion:</strong> {item.suggestion}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {result.missing_clauses.length > 0 && (
                <div className="panel" style={{ marginTop: "1rem" }}>
                  <h2>Missing Clauses</h2>
                  <div style={{ display: "grid", gap: "0.75rem" }}>
                    {result.missing_clauses.map((item, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", padding: "0.5rem 0", borderBottom: i < result.missing_clauses.length - 1 ? "1px solid var(--line)" : "none" }}>
                        <ImportanceBadge importance={item.importance} />
                        <div>
                          <strong style={{ fontSize: "0.9rem" }}>{item.clause}</strong>
                          <p style={{ margin: "0.2rem 0 0", fontSize: "0.82rem", color: "var(--ink-soft)" }}>{item.reason}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {result.indian_law_notes && result.indian_law_notes.length > 0 && (
                <div className="panel" style={{ marginTop: "1rem" }}>
                  <h2>Indian Law Considerations</h2>
                  <ul style={{ paddingLeft: "1.2rem", margin: 0 }}>
                    {result.indian_law_notes.map((note, i) => (
                      <li key={i} style={{ padding: "0.3rem 0", fontSize: "0.85rem", color: "var(--ink-soft)", lineHeight: 1.6 }}>{note}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div style={{ marginTop: "1.5rem" }}>
                <ShareButtons
                  path="/tools/risk-analyzer"
                  text="Free AI-powered contract risk analyzer for Indian businesses — DoAide Contracts"
                  label="Share risk analyzer"
                />
              </div>

              <div className="panel" style={{ marginTop: "1.5rem", textAlign: "center", fontSize: "0.82rem", color: "var(--ink-soft)" }}>
                <p style={{ margin: 0 }}>
                  This analysis is generated by AI and is for informational purposes only. It does not constitute legal advice.
                  For important contracts, please consult a qualified legal professional.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Contract Risk Analyzer",
            description: "Free AI-powered contract risk analysis for Indian businesses. Identifies risky clauses, missing protections, and Indian law considerations.",
            url: "https://contracts.doaide.com/tools/risk-analyzer",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web",
            offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
            author: { "@type": "Organization", name: "Apprend Technologies", url: "https://doaide.com" },
          }),
        }}
      />
    </div>
  );
}
