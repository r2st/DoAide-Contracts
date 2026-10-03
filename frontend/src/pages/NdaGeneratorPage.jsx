import { useState } from "react";
import ToolsNav from "../components/ToolsNav";
import ShareButtons from "../components/ShareButtons";
import { usePageTitle } from "../hooks/usePageTitle";

const NDA_TYPES = [
  { id: "mutual", label: "Mutual NDA", desc: "Both parties share confidential information." },
  { id: "unilateral", label: "One-Way NDA", desc: "Only one party discloses confidential information." },
];

const DURATIONS = ["1 year", "2 years", "3 years", "5 years", "Indefinite"];

const JURISDICTIONS = ["India", "United States", "United Kingdom", "Singapore", "Australia"];

export default function NdaGeneratorPage() {
  usePageTitle("Free NDA Generator");
  const [type, setType] = useState("mutual");
  const [discloser, setDiscloser] = useState("");
  const [receiver, setReceiver] = useState("");
  const [duration, setDuration] = useState("2 years");
  const [jurisdiction, setJurisdiction] = useState("India");
  const [generated, setGenerated] = useState(false);
  const [copied, setCopied] = useState(false);

  const ndaType = NDA_TYPES.find((t) => t.id === type);

  const ndaText = `NON-DISCLOSURE AGREEMENT (${ndaType.label.toUpperCase()})

This Non-Disclosure Agreement ("Agreement") is entered into as of the date of last signature below.

BETWEEN:
  Disclosing Party: ${discloser || "[Party A Name]"}
  ${type === "mutual" ? `  AND\n  Receiving Party: ${receiver || "[Party B Name]"}` : `  Receiving Party: ${receiver || "[Party B Name]"}`}

1. DEFINITION OF CONFIDENTIAL INFORMATION
All non-public, proprietary, or confidential information disclosed by ${type === "mutual" ? "either party" : "the Disclosing Party"} in any form, including but not limited to: trade secrets, business plans, financial data, technical data, customer lists, and intellectual property.

2. OBLIGATIONS OF ${type === "mutual" ? "BOTH PARTIES" : "THE RECEIVING PARTY"}
The ${type === "mutual" ? "receiving party" : "Receiving Party"} agrees to:
  a) Hold all Confidential Information in strict confidence
  b) Not disclose to any third party without prior written consent
  c) Use the information solely for the purpose of the business relationship
  d) Take reasonable measures to protect the confidentiality

3. EXCLUSIONS
This Agreement does not apply to information that:
  a) Is or becomes publicly available through no fault of the receiving party
  b) Was known to the receiving party prior to disclosure
  c) Is independently developed without use of Confidential Information
  d) Is required to be disclosed by law or court order

4. TERM
This Agreement shall remain in effect for ${duration} from the date of execution${duration === "Indefinite" ? "" : ", after which obligations of confidentiality shall survive for an additional 2 years"}.

5. GOVERNING LAW
This Agreement shall be governed by the laws of ${jurisdiction}.

6. REMEDIES
The parties acknowledge that breach may cause irreparable harm and that the injured party shall be entitled to seek injunctive relief in addition to any other remedies available.

IN WITNESS WHEREOF, the parties have executed this Agreement.

Disclosing Party: ________________________  Date: ____________
Name: ${discloser || "[Party A Name]"}

Receiving Party: ________________________  Date: ____________
Name: ${receiver || "[Party B Name]"}

---
Generated with DoAide Contracts — https://contracts.doaide.com/tools/nda-generator`;

  const handleGenerate = () => setGenerated(true);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(ndaText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* clipboard unavailable */ }
  };

  return (
    <div className="tool-page">
      <ToolsNav />
      <main className="tool-main">
        <div className="tool-container">
          <h1 className="tool-title">Free NDA Generator</h1>
          <p className="tool-subtitle">
            Generate a Non-Disclosure Agreement in seconds. Customize the terms and copy the result — no sign-up required.
          </p>

          <div className="calc-card">
            <label className="calc-label">
              NDA Type
              <div style={{ display: "flex", gap: "0.5rem" }}>
                {NDA_TYPES.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setType(t.id)}
                    className={`btn ${type === t.id ? "btn-primary" : "btn-ghost"}`}
                    style={{ flex: 1 }}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </label>
            <label className="calc-label">
              Disclosing Party Name
              <input className="calc-input" value={discloser} onChange={(e) => setDiscloser(e.target.value)} placeholder="e.g. Acme Corp" />
            </label>
            <label className="calc-label">
              Receiving Party Name
              <input className="calc-input" value={receiver} onChange={(e) => setReceiver(e.target.value)} placeholder="e.g. Jane Doe" />
            </label>
            <label className="calc-label">
              Duration
              <select className="calc-input" value={duration} onChange={(e) => setDuration(e.target.value)}>
                {DURATIONS.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
            </label>
            <label className="calc-label">
              Governing Law (Jurisdiction)
              <select className="calc-input" value={jurisdiction} onChange={(e) => setJurisdiction(e.target.value)}>
                {JURISDICTIONS.map((j) => <option key={j} value={j}>{j}</option>)}
              </select>
            </label>
            <button className="btn btn-primary" onClick={handleGenerate}>Generate NDA</button>
          </div>

          {generated && (
            <>
              <div className="calc-card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                  <h2 style={{ margin: 0, fontSize: "1rem", fontWeight: 600 }}>Your NDA</h2>
                  <button className="btn btn-primary" onClick={handleCopy} style={{ padding: "0.4rem 1rem", fontSize: "0.85rem" }}>
                    {copied ? "Copied!" : "Copy NDA"}
                  </button>
                </div>
                <pre style={{ whiteSpace: "pre-wrap", fontFamily: "monospace", fontSize: "0.85rem", lineHeight: 1.6, color: "var(--ink)", background: "var(--bg-canvas)", padding: "1rem", borderRadius: "8px", overflow: "auto" }}>
                  {ndaText}
                </pre>
              </div>

              <ShareButtons path="/tools/nda-generator" text="Free NDA Generator — DoAide Contracts" />

              <div className="calc-card" style={{ textAlign: "center" }}>
                <p style={{ fontSize: "0.9rem", color: "var(--ink-soft)", marginBottom: "0.75rem" }}>Want to save your NDAs and track signatures?</p>
                <a href="/" className="btn btn-primary" style={{ display: "inline-block" }}>Sign up free</a>
              </div>
            </>
          )}
        </div>
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Free NDA Generator",
            description: "Generate a Non-Disclosure Agreement with customizable terms.",
            url: "https://contracts.doaide.com/tools/nda-generator",
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
