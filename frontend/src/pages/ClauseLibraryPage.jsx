import { useState } from "react";
import ToolsNav from "../components/ToolsNav";
import ShareButtons from "../components/ShareButtons";
import { usePageTitle } from "../hooks/usePageTitle";

const CLAUSES = [
  { category: "Confidentiality", title: "Standard Confidentiality", text: "Each party agrees to hold in confidence all Confidential Information received from the other party and not to disclose such information to any third party without prior written consent. This obligation shall survive the termination of this Agreement for a period of [2] years." },
  { category: "Confidentiality", title: "Mutual Non-Disclosure", text: "Both parties acknowledge that Confidential Information may be exchanged during the course of this Agreement. Each party shall protect the other's Confidential Information with the same degree of care it uses to protect its own, but no less than reasonable care." },
  { category: "Indemnification", title: "Mutual Indemnification", text: "Each party shall indemnify, defend, and hold harmless the other party from and against any claims, damages, losses, and expenses (including reasonable legal fees) arising out of or relating to the indemnifying party's breach of this Agreement or negligent acts." },
  { category: "Indemnification", title: "Limited Indemnification", text: "The Service Provider shall indemnify the Client against direct damages arising from gross negligence or willful misconduct. Total liability shall not exceed the fees paid under this Agreement in the preceding [12] months." },
  { category: "Termination", title: "Termination for Convenience", text: "Either party may terminate this Agreement at any time by providing [30] days' prior written notice to the other party. Upon termination, all obligations regarding Confidential Information and payment for services rendered shall survive." },
  { category: "Termination", title: "Termination for Cause", text: "Either party may terminate this Agreement immediately upon written notice if the other party: (a) materially breaches this Agreement and fails to cure within [15] days of written notice; or (b) becomes insolvent or files for bankruptcy." },
  { category: "Intellectual Property", title: "IP Ownership — Work for Hire", text: "All work product created by the Service Provider under this Agreement shall be considered 'work made for hire' and shall be the exclusive property of the Client. The Service Provider hereby assigns all rights, title, and interest in such work product to the Client." },
  { category: "Intellectual Property", title: "IP License Grant", text: "The Licensor grants the Licensee a non-exclusive, non-transferable, revocable license to use the Licensed Materials solely for the purposes described in this Agreement. All rights not expressly granted are reserved by the Licensor." },
  { category: "Liability", title: "Limitation of Liability", text: "In no event shall either party be liable for any indirect, incidental, special, consequential, or punitive damages. Each party's total aggregate liability shall not exceed the total fees paid or payable under this Agreement during the [12] months preceding the claim." },
  { category: "Dispute Resolution", title: "Arbitration Clause", text: "Any dispute arising out of or relating to this Agreement shall be resolved by binding arbitration in accordance with the rules of [arbitration body]. The arbitration shall be conducted in [city/country], and the decision shall be final and binding." },
  { category: "Dispute Resolution", title: "Mediation First", text: "The parties agree to first attempt to resolve any dispute through good-faith mediation before pursuing arbitration or litigation. Mediation shall be conducted within [30] days of written notice of the dispute." },
  { category: "General", title: "Force Majeure", text: "Neither party shall be liable for failure to perform obligations under this Agreement due to events beyond reasonable control, including but not limited to: natural disasters, war, terrorism, pandemics, government actions, or infrastructure failures." },
];

const CATEGORIES = [...new Set(CLAUSES.map((c) => c.category))];

export default function ClauseLibraryPage() {
  usePageTitle("Free Contract Clause Library");
  const [filter, setFilter] = useState("All");
  const [copiedIdx, setCopiedIdx] = useState(null);

  const filtered = filter === "All" ? CLAUSES : CLAUSES.filter((c) => c.category === filter);

  const copyClause = async (idx, text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIdx(idx);
      setTimeout(() => setCopiedIdx(null), 2000);
    } catch { /* clipboard unavailable */ }
  };

  return (
    <div className="tool-page">
      <ToolsNav />
      <main className="tool-main" style={{ maxWidth: "860px" }}>
        <div className="tool-container">
          <h1 className="tool-title">Contract Clause Library</h1>
          <p className="tool-subtitle">
            Browse common contract clauses. Click to copy any clause and paste it into your contract — no sign-up required.
          </p>

          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            <button className={`btn ${filter === "All" ? "btn-primary" : "btn-ghost"}`} onClick={() => setFilter("All")}>All</button>
            {CATEGORIES.map((cat) => (
              <button key={cat} className={`btn ${filter === cat ? "btn-primary" : "btn-ghost"}`} onClick={() => setFilter(cat)}>{cat}</button>
            ))}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {filtered.map((clause, i) => (
              <div key={i} className="calc-card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem" }}>
                  <div>
                    <span style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--brand)", fontWeight: 600 }}>{clause.category}</span>
                    <h3 style={{ margin: "0.25rem 0 0.5rem", fontSize: "1rem", fontWeight: 600, color: "var(--ink)" }}>{clause.title}</h3>
                  </div>
                  <button className="btn btn-ghost" style={{ flexShrink: 0, fontSize: "0.8rem" }} onClick={() => copyClause(i, clause.text)}>
                    {copiedIdx === i ? "Copied!" : "Copy"}
                  </button>
                </div>
                <p style={{ fontSize: "0.85rem", lineHeight: 1.7, color: "var(--ink-soft)", margin: 0 }}>{clause.text}</p>
              </div>
            ))}
          </div>

          <ShareButtons path="/tools/clause-library" text="Free Contract Clause Library — DoAide Contracts" />

          <div className="calc-card" style={{ textAlign: "center" }}>
            <p style={{ fontSize: "0.9rem", color: "var(--ink-soft)", marginBottom: "0.75rem" }}>Want to build full contracts from these clauses?</p>
            <a href="/" className="btn btn-primary" style={{ display: "inline-block" }}>Sign up free</a>
          </div>
        </div>
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Contract Clause Library",
            description: "Browse and copy common contract clauses for your agreements.",
            url: "https://contracts.doaide.com/tools/clause-library",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            author: { "@type": "Organization", name: "Apprend Technologies", url: "https://doaide.com" },
          }),
        }}
      />
    </div>
  );
}
