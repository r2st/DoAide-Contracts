import { useState } from "react";
import ToolsNav from "../components/ToolsNav";
import ShareButtons from "../components/ShareButtons";
import { usePageTitle } from "../hooks/usePageTitle";

const RISKY_PATTERNS = [
  { pattern: /unlimited liability/i, issue: "Unlimited liability clause detected. Consider capping liability to the contract value.", severity: "high" },
  { pattern: /waive[s]?\s+(all|any)\s+right/i, issue: "Broad waiver of rights. This could give up important legal protections.", severity: "high" },
  { pattern: /indemnif(y|ication)\s+.{0,50}(all|any|every)\s+(claims?|losses?|damages?)/i, issue: "Very broad indemnification clause. Consider limiting scope.", severity: "high" },
  { pattern: /non[-\s]?compete.{0,100}(indefinite|perpetual|\d{2,}\s*year)/i, issue: "Non-compete period appears excessively long. Indian courts typically enforce 1-2 years maximum.", severity: "high" },
  { pattern: /auto[-\s]?renew/i, issue: "Auto-renewal clause found. Ensure you have adequate notice period before renewal.", severity: "medium" },
  { pattern: /sole\s+discretion/i, issue: "'Sole discretion' gives one party unchecked decision power. Consider adding reasonableness standards.", severity: "medium" },
  { pattern: /without\s+(prior\s+)?notice/i, issue: "Action allowed without notice. Consider requiring written notice.", severity: "medium" },
  { pattern: /liquidated\s+damages/i, issue: "Liquidated damages clause found. Under Indian Contract Act (Section 74), courts may reduce penalties to reasonable compensation.", severity: "medium" },
  { pattern: /governing\s+law.{0,50}(foreign|overseas|international)/i, issue: "Foreign governing law specified. This may increase legal costs and complexity for Indian parties.", severity: "medium" },
  { pattern: /no\s+(refund|return)/i, issue: "No-refund clause detected. Consider adding exceptions for non-delivery or breach.", severity: "medium" },
  { pattern: /termination.{0,50}immediate/i, issue: "Immediate termination clause found. Consider adding a cure period for non-material breaches.", severity: "low" },
  { pattern: /force\s+majeure/i, issue: "Force majeure clause present. Verify it covers pandemics and government-ordered shutdowns.", severity: "low" },
  { pattern: /confidential/i, issue: "Confidentiality clause found. Ensure it specifies duration and exceptions.", severity: "low" },
  { pattern: /intellectual\s+property/i, issue: "IP clause present. Verify ownership and licensing terms are clear.", severity: "low" },
  { pattern: /arbitration/i, issue: "Arbitration clause found. Note: under the Arbitration and Conciliation Act, 1996, seat and rules should be specified.", severity: "low" },
];

const MISSING_CHECKS = [
  { pattern: /termination|terminat/i, label: "Termination clause" },
  { pattern: /confidential/i, label: "Confidentiality clause" },
  { pattern: /governing\s+law|jurisdiction/i, label: "Governing law / jurisdiction" },
  { pattern: /dispute|arbitration|mediation/i, label: "Dispute resolution" },
  { pattern: /force\s+majeure/i, label: "Force majeure" },
  { pattern: /indemnif/i, label: "Indemnification" },
  { pattern: /liability/i, label: "Liability limitation" },
  { pattern: /notice/i, label: "Notice provisions" },
];

function analyzeContract(text) {
  const issues = [];

  for (const { pattern, issue, severity } of RISKY_PATTERNS) {
    if (pattern.test(text)) {
      issues.push({ issue, severity });
    }
  }

  const missing = [];
  for (const { pattern, label } of MISSING_CHECKS) {
    if (!pattern.test(text)) {
      missing.push(label);
    }
  }

  return { issues, missing };
}

function SeverityBadge({ severity }) {
  const cls = severity === "high" ? "risk-high" : severity === "medium" ? "risk-medium" : "risk-low";
  return <span className={`risk-badge ${cls}`}>{severity}</span>;
}

export default function CheckerPage() {
  usePageTitle("Free Contract Clause Checker — Spot Risky Clauses Instantly");
  const [contractText, setContractText] = useState("");
  const [result, setResult] = useState(null);

  function handleCheck(e) {
    e.preventDefault();
    if (!contractText.trim()) return;
    const analysis = analyzeContract(contractText);
    setResult(analysis);
  }

  function handleClear() {
    setContractText("");
    setResult(null);
  }

  return (
    <div className="tool-page">
      <ToolsNav />
      <main className="tool-main">
        <div className="tool-container">
          <h1 className="tool-title">Contract Clause Checker</h1>
          <p className="tool-subtitle">
            Paste your contract text below to instantly identify risky or missing clauses.
            Free, no sign-up required.
          </p>

          <form onSubmit={handleCheck}>
            <div className="checker-input-area">
              <textarea
                rows={12}
                value={contractText}
                onChange={(e) => setContractText(e.target.value)}
                placeholder="Paste your contract text here..."
                className="checker-textarea"
                aria-label="Contract text to check"
              />
              <div className="checker-count">
                {contractText.length.toLocaleString()} characters
              </div>
            </div>
            <div className="button-row" style={{ marginTop: "1rem" }}>
              <button type="submit" className="btn btn-primary" disabled={!contractText.trim()}>
                Check Contract
              </button>
              {result && (
                <button type="button" className="btn btn-ghost" onClick={handleClear}>
                  Clear
                </button>
              )}
            </div>
          </form>

          {result && (
            <div className="checker-results">
              <div className="stat-grid" style={{ marginTop: "1.5rem" }}>
                <div className={`stat-card ${result.issues.filter((i) => i.severity === "high").length > 0 ? "tone-bad" : "tone-good"}`}>
                  <div className="stat-label">High Risk</div>
                  <div className="stat-value">{result.issues.filter((i) => i.severity === "high").length}</div>
                </div>
                <div className="stat-card tone-warn">
                  <div className="stat-label">Medium Risk</div>
                  <div className="stat-value">{result.issues.filter((i) => i.severity === "medium").length}</div>
                </div>
                <div className="stat-card tone-brand">
                  <div className="stat-label">Low Risk</div>
                  <div className="stat-value">{result.issues.filter((i) => i.severity === "low").length}</div>
                </div>
                <div className={`stat-card ${result.missing.length > 0 ? "tone-warn" : "tone-good"}`}>
                  <div className="stat-label">Missing Clauses</div>
                  <div className="stat-value">{result.missing.length}</div>
                </div>
              </div>

              {result.issues.length > 0 && (
                <div className="panel" style={{ marginTop: "1rem" }}>
                  <h2>Issues Found</h2>
                  <div className="checker-issues">
                    {result.issues.map((item, i) => (
                      <div key={i} className="checker-issue">
                        <SeverityBadge severity={item.severity} />
                        <span>{item.issue}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {result.missing.length > 0 && (
                <div className="panel" style={{ marginTop: "1rem" }}>
                  <h2>Missing Clauses</h2>
                  <p style={{ color: "var(--ink-soft)", fontSize: "0.88rem", margin: "0 0 0.75rem" }}>
                    These standard clauses were not found in your contract:
                  </p>
                  <ul className="checker-missing">
                    {result.missing.map((m) => (
                      <li key={m}>{m}</li>
                    ))}
                  </ul>
                </div>
              )}

              {result.issues.length === 0 && result.missing.length === 0 && (
                <div className="panel" style={{ marginTop: "1rem", textAlign: "center" }}>
                  <p style={{ color: "var(--good)", fontWeight: 600 }}>
                    No issues detected. Your contract looks good!
                  </p>
                </div>
              )}

              <div style={{ marginTop: "1.5rem" }}>
                <ShareButtons
                  path="/checker"
                  text="Free contract clause checker — spot risky clauses instantly"
                  label="Share checker"
                />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
