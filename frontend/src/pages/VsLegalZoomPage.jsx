import { Link } from "react-router-dom";
import ToolsNav from "../components/ToolsNav";
import ShareButtons from "../components/ShareButtons";
import { usePageTitle } from "../hooks/usePageTitle";

const ROWS = [
  { feature: "Primary market", doaide: "India — templates follow Indian drafting practice", other: "United States — documents follow US state law" },
  { feature: "Contract templates", doaide: "Free, unlimited — NDA, employment, rent, partnership, loan and more", other: "Included with paid plans and one-time purchases" },
  { feature: "Price to generate a contract", doaide: "Free, no sign-up", other: "Paid — subscription or per-document fees" },
  { feature: "Indian law provisions", doaide: "Built in — Indian Contract Act, Arbitration Act 1996, state stamp duty", other: "Not covered — drafts reference US law and courts" },
  { feature: "Stamp duty guidance", doaide: "State-wise calculator and guides", other: "Not applicable (US product)" },
  { feature: "AI contract review", doaide: "Risk analyzer flags one-sided and missing clauses", other: "AI-assisted document tools on higher plans" },
  { feature: "Compare two contract versions", doaide: "Free comparison tool, runs in your browser", other: "Not a core feature" },
  { feature: "Business formation services", doaide: "Not offered", other: "Core offering — LLC and corporation filings (US)" },
  { feature: "Access to human attorneys", doaide: "Not offered — consult your own lawyer", other: "Attorney consultations on legal plans (US attorneys)" },
];

const FAQ = [
  {
    q: "Is DoAide Contracts a free alternative to LegalZoom?",
    a: "For contract templates and review in India, yes — DoAide Contracts generates NDAs, employment contracts, rent agreements, partnership deeds and more for free, with Indian legal provisions. LegalZoom is a paid US service whose core strengths are US business formation and access to US attorneys, which DoAide does not offer.",
  },
  {
    q: "Can I use LegalZoom documents in India?",
    a: "Generally no. LegalZoom documents are drafted for US state law — they reference US statutes, courts and practices. An Indian contract should reference the Indian Contract Act 1872, Indian jurisdiction and state stamp duty, which is what DoAide Contracts templates do.",
  },
  {
    q: "Does DoAide Contracts provide lawyers like LegalZoom does?",
    a: "No. DoAide Contracts provides templates, an AI risk analyzer and comparison tools — not attorney services. For high-value or unusual agreements, have an Indian lawyer review your final draft.",
  },
  {
    q: "What does DoAide Contracts cost?",
    a: "The template generator, risk analyzer, comparison tool and stamp duty calculator are free with no sign-up. A free account adds saved documents and AI review features.",
  },
];

export default function VsLegalZoomPage() {
  usePageTitle(
    "DoAide Contracts vs LegalZoom",
    "DoAide Contracts vs LegalZoom compared — pricing, templates, Indian law coverage, AI review and attorney access. Which one fits an Indian business in 2026?",
  );

  return (
    <div className="tool-page">
      <ToolsNav />
      <main className="tool-main">
        <div className="tool-container">
          <h1 className="tool-title">DoAide Contracts vs LegalZoom</h1>
          <p className="tool-subtitle">
            Both help you get legal documents done without starting from a blank page —
            but they're built for different countries and different jobs. Here's an
            honest comparison for Indian businesses in 2026.
          </p>

          <div className="calc-card">
            <h2 style={{ margin: "0 0 0.5rem", fontSize: "1.1rem" }}>The short answer</h2>
            <p style={{ margin: 0, fontSize: "0.92rem", lineHeight: 1.6, color: "var(--ink-soft)" }}>
              <strong>LegalZoom</strong> is a US legal services company — its documents follow US
              state law, and its standout features are US business formation and access to US
              attorneys. <strong>DoAide Contracts</strong> is built for India: free templates that
              reference the Indian Contract Act, state-wise stamp duty guidance, and AI tools to
              review and compare contracts. If your contracts are governed by Indian law, a US-law
              template is the wrong starting point — regardless of price.
            </p>
          </div>

          <div className="calc-card" style={{ marginTop: "1rem", overflowX: "auto" }}>
            <table className="table" style={{ minWidth: "560px" }}>
              <thead>
                <tr>
                  <th style={{ width: "28%" }}>Feature</th>
                  <th>DoAide Contracts</th>
                  <th>LegalZoom</th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row) => (
                  <tr key={row.feature}>
                    <td style={{ fontWeight: 600 }}>{row.feature}</td>
                    <td>{row.doaide}</td>
                    <td>{row.other}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="calc-card" style={{ marginTop: "1rem" }}>
            <h2 style={{ margin: "0 0 0.5rem", fontSize: "1.1rem" }}>When LegalZoom is the better choice</h2>
            <p style={{ margin: 0, fontSize: "0.92rem", lineHeight: 1.6, color: "var(--ink-soft)" }}>
              Forming an LLC or corporation in the United States, filing US trademarks, or when you
              want a US attorney on call. If your business operates under US law, use a US-focused
              service — DoAide Contracts won't help you there.
            </p>
          </div>

          <div className="calc-card" style={{ marginTop: "1rem" }}>
            <h2 style={{ margin: "0 0 0.5rem", fontSize: "1.1rem" }}>When DoAide Contracts is the better choice</h2>
            <ul style={{ margin: 0, paddingLeft: "1.2rem", fontSize: "0.92rem", lineHeight: 1.7, color: "var(--ink-soft)" }}>
              <li>You need an <Link to="/template/nda">NDA</Link>, <Link to="/template/employment">employment contract</Link>, <Link to="/template/rental">rent agreement</Link> or <Link to="/template/partnership">partnership deed</Link> governed by Indian law.</li>
              <li>You want it free and without creating an account — <Link to="/generator">generate a contract</Link> in minutes.</li>
              <li>You received a contract and want AI to flag risky clauses — <Link to="/tools/risk-analyzer">risk analyzer</Link>.</li>
              <li>You're negotiating redlines and want to see exactly what changed — <Link to="/tools/contract-comparison">comparison tool</Link>.</li>
              <li>You need to know what stamp duty applies in your state — <Link to="/tools/stamp-duty-calculator">stamp duty calculator</Link>.</li>
            </ul>
          </div>

          <div className="calc-card" style={{ marginTop: "1rem" }}>
            <h2 style={{ margin: "0 0 0.75rem", fontSize: "1.1rem" }}>Frequently asked questions</h2>
            {FAQ.map((item) => (
              <details key={item.q} className="md-faq">
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>

          <ShareButtons path="/vs/legalzoom" text="DoAide Contracts vs LegalZoom — comparison for Indian businesses" />

          <div className="calc-card" style={{ textAlign: "center", marginTop: "1rem" }}>
            <p style={{ fontSize: "0.9rem", color: "var(--ink-soft)", marginBottom: "0.75rem" }}>
              Draft your first contract free — no sign-up, built for Indian law.
            </p>
            <Link to="/generator" className="btn btn-primary" style={{ display: "inline-block" }}>Generate a contract free</Link>
          </div>

          <p style={{ fontSize: "0.78rem", color: "var(--ink-muted)", marginTop: "1rem" }}>
            LegalZoom is a trademark of LegalZoom.com, Inc. DoAide Contracts is not affiliated with
            LegalZoom. Comparison reflects publicly available information as of October 2026;
            features and pricing may change.
          </p>
        </div>
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQ.map((item) => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: { "@type": "Answer", text: item.a },
            })),
          }),
        }}
      />
    </div>
  );
}
