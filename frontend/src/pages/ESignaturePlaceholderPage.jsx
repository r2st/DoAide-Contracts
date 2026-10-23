import { useState } from "react";
import ToolsNav from "../components/ToolsNav";
import ShareButtons from "../components/ShareButtons";
import { usePageTitle } from "../hooks/usePageTitle";

const PLACEHOLDER_TYPES = [
  { id: "signature", label: "Signature", marker: "SIGNATURE", color: "#0D9488" },
  { id: "initials", label: "Initials", marker: "INITIALS", color: "#2563EB" },
  { id: "date", label: "Date", marker: "DATE", color: "#D97706" },
  { id: "name", label: "Printed Name", marker: "NAME", color: "#7C3AED" },
  { id: "title", label: "Title / Designation", marker: "TITLE", color: "#DC2626" },
];

const SAMPLE_TEXT = `AGREEMENT

This Agreement is entered into as of ____________ by and between:

Party A: ________________________ ("Client")
Party B: ________________________ ("Service Provider")

1. SCOPE OF WORK
The Service Provider agrees to deliver the services described in Schedule A.

2. PAYMENT TERMS
The Client shall pay the Service Provider INR ____________ within 30 days of invoice.

3. CONFIDENTIALITY
Both parties agree to maintain the confidentiality of all proprietary information.

4. TERM AND TERMINATION
This Agreement shall be effective from the date of execution and shall continue for a period of 12 months.


IN WITNESS WHEREOF, the parties have executed this Agreement as of the date first written above.


_______________________________          _______________________________
Party A                                  Party B

Date: ______________                     Date: ______________`;

const FAQ_ITEMS = [
  {
    q: "What is an e-signature placeholder in a contract?",
    a: "An e-signature placeholder marks the exact spot in a contract where a party needs to sign, initial, or enter their details. When preparing a contract for digital signing, placeholders guide signers to the correct locations and ensure no signature line is missed.",
  },
  {
    q: "Are e-signatures legally valid in India?",
    a: "Yes. Under the Information Technology Act, 2000 (Section 5), electronic signatures are legally recognized in India. Aadhaar-based e-signatures and digital signatures issued by licensed Certifying Authorities have the same legal standing as handwritten signatures for most agreements, excluding specific exceptions like wills, negotiable instruments, and powers of attorney.",
  },
  {
    q: "How do I add signature placeholders to my contract?",
    a: "Paste your contract text, select a placeholder type (Signature, Initials, Date, Name, or Title), then click at any position in the preview to insert the marker. You can assign each placeholder to a specific party and rearrange or remove them before copying the final marked text.",
  },
  {
    q: "What types of placeholders should I include?",
    a: "A thorough signing block typically includes: (1) a Signature placeholder for the actual signature, (2) a Printed Name field, (3) a Title/Designation field, and (4) a Date field. For multi-page contracts, add Initials placeholders on each page to confirm the signer has reviewed every page.",
  },
  {
    q: "Can I use this tool for contracts with multiple signers?",
    a: "Yes. You can assign each placeholder to a different party (Party A, Party B, Witness, etc.). The markers are color-coded by type and labelled by party, so each signer knows exactly where to sign when the document is sent for execution.",
  },
];

export default function ESignaturePlaceholderPage() {
  usePageTitle(
    "E-Signature Placeholder Tool — Mark Where to Sign in Contracts",
    "Free tool to mark signature, initials, date and name placeholders in your contract. Prepare contracts for e-signing — no sign-up required.",
  );

  const [contractText, setContractText] = useState("");
  const [placeholders, setPlaceholders] = useState([]);
  const [activeType, setActiveType] = useState("signature");
  const [partyName, setPartyName] = useState("Party A");
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [mode, setMode] = useState("edit");

  const lines = (contractText || SAMPLE_TEXT).split("\n");
  const usingSample = !contractText;

  function handleLineClick(lineIdx) {
    if (mode !== "place") return;
    const type = PLACEHOLDER_TYPES.find((t) => t.id === activeType);
    if (!type) return;
    setPlaceholders((prev) => [
      ...prev,
      { id: Date.now(), lineIdx, type: type.id, marker: type.marker, party: partyName, color: type.color },
    ]);
  }

  function removePlaceholder(id) {
    setPlaceholders((prev) => prev.filter((p) => p.id !== id));
  }

  function buildMarkedText() {
    const grouped = {};
    for (const p of placeholders) {
      if (!grouped[p.lineIdx]) grouped[p.lineIdx] = [];
      grouped[p.lineIdx].push(p);
    }
    return lines
      .map((line, i) => {
        if (!grouped[i]) return line;
        const markers = grouped[i].map((p) => `[${p.marker}: ${p.party}]`).join("  ");
        return line + "  " + markers;
      })
      .join("\n");
  }

  async function copyMarkedText() {
    try {
      await navigator.clipboard.writeText(buildMarkedText());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* clipboard unavailable */ }
  }

  const placeholdersByLine = {};
  for (const p of placeholders) {
    if (!placeholdersByLine[p.lineIdx]) placeholdersByLine[p.lineIdx] = [];
    placeholdersByLine[p.lineIdx].push(p);
  }

  return (
    <div className="tool-page">
      <ToolsNav />
      <main className="tool-main">
        <div className="tool-container">
          <h1 className="tool-title">E-Signature Placeholder Tool</h1>
          <p className="tool-subtitle">
            Mark where signatures, initials, dates and names go in your contract.
            Prepare any agreement for e-signing — free, no sign-up required.
          </p>

          {mode === "edit" && (
            <div className="calc-card">
              <h2 style={{ fontSize: "1rem", fontWeight: 600, color: "var(--ink)", margin: "0 0 0.75rem" }}>
                Step 1: Paste your contract text
              </h2>
              <textarea
                rows={12}
                className="calc-input"
                placeholder="Paste your contract text here, or leave empty to use the sample contract..."
                value={contractText}
                onChange={(e) => setContractText(e.target.value)}
                style={{ width: "100%", fontFamily: "inherit", resize: "vertical" }}
                aria-label="Contract text"
              />
              <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.75rem" }}>
                <button className="btn btn-primary" onClick={() => setMode("place")}>
                  Continue to place signatures →
                </button>
                {contractText && (
                  <button className="btn btn-ghost" onClick={() => setContractText("")}>
                    Clear
                  </button>
                )}
              </div>
            </div>
          )}

          {mode === "place" && (
            <>
              <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: "1rem", alignItems: "start" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", position: "sticky", top: "1rem" }}>
                  <div className="calc-card">
                    <h2 style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--ink)", margin: "0 0 0.5rem" }}>
                      Placeholder Type
                    </h2>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                      {PLACEHOLDER_TYPES.map((type) => (
                        <button
                          key={type.id}
                          className={`btn ${activeType === type.id ? "btn-primary" : "btn-ghost"}`}
                          onClick={() => setActiveType(type.id)}
                          style={{
                            textAlign: "left", fontSize: "0.82rem", justifyContent: "flex-start",
                            borderLeft: `3px solid ${type.color}`, minHeight: "36px",
                          }}
                        >
                          {type.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="calc-card">
                    <h2 style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--ink)", margin: "0 0 0.5rem" }}>
                      Assign to Party
                    </h2>
                    <select
                      className="calc-input"
                      value={partyName}
                      onChange={(e) => setPartyName(e.target.value)}
                      style={{ width: "100%", margin: 0 }}
                    >
                      <option>Party A</option>
                      <option>Party B</option>
                      <option>Witness 1</option>
                      <option>Witness 2</option>
                      <option>Notary</option>
                    </select>
                  </div>

                  <div className="calc-card">
                    <h2 style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--ink)", margin: "0 0 0.5rem" }}>
                      Placed ({placeholders.length})
                    </h2>
                    {placeholders.length === 0 && (
                      <p style={{ fontSize: "0.8rem", color: "var(--ink-soft)", margin: 0 }}>
                        Click any line to place a marker.
                      </p>
                    )}
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem", maxHeight: "200px", overflowY: "auto" }}>
                      {placeholders.map((p) => (
                        <div key={p.id} style={{
                          display: "flex", justifyContent: "space-between", alignItems: "center",
                          fontSize: "0.75rem", padding: "0.25rem 0.5rem", borderRadius: "4px",
                          background: "var(--surface-dim, rgba(0,0,0,0.15))",
                        }}>
                          <span>
                            <span style={{ color: p.color, fontWeight: 600 }}>{p.marker}</span>
                            <span style={{ color: "var(--ink-soft)" }}> · {p.party} · L{p.lineIdx + 1}</span>
                          </span>
                          <button
                            onClick={() => removePlaceholder(p.id)}
                            style={{ background: "none", border: "none", color: "var(--ink-soft)", cursor: "pointer", padding: "2px 4px", fontSize: "0.85rem" }}
                            aria-label={`Remove ${p.marker} placeholder`}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button className="btn btn-ghost" onClick={() => { setMode("edit"); setPlaceholders([]); }}>
                    ← Back to edit
                  </button>
                </div>

                <div className="calc-card" style={{ padding: 0 }}>
                  <div style={{ padding: "0.75rem 1rem", borderBottom: "1px solid var(--line, var(--doaide-border))", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h2 style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--ink)", margin: 0 }}>
                      Contract Preview {usingSample && <span style={{ fontWeight: 400, color: "var(--ink-soft)" }}>(sample)</span>}
                    </h2>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <button className="btn btn-primary" style={{ fontSize: "0.8rem" }} onClick={copyMarkedText}>
                        {copied ? "Copied!" : "Copy marked text"}
                      </button>
                    </div>
                  </div>
                  <div style={{ padding: "1rem", fontFamily: "var(--doaide-font-mono, monospace)", fontSize: "0.8rem", lineHeight: 1.8, whiteSpace: "pre-wrap", maxHeight: "600px", overflowY: "auto" }}>
                    {lines.map((line, i) => (
                      <div
                        key={i}
                        onClick={() => handleLineClick(i)}
                        style={{
                          padding: "1px 4px", borderRadius: "3px", cursor: "pointer",
                          background: placeholdersByLine[i] ? "var(--doaide-primary-bg, rgba(13,148,136,0.1))" : "transparent",
                          transition: "background 150ms ease",
                        }}
                        onMouseEnter={(e) => { if (!placeholdersByLine[i]) e.currentTarget.style.background = "var(--surface-dim, rgba(0,0,0,0.08))"; }}
                        onMouseLeave={(e) => { if (!placeholdersByLine[i]) e.currentTarget.style.background = "transparent"; }}
                        role="button"
                        tabIndex={0}
                        aria-label={`Line ${i + 1}: ${line || "(empty line)"}`}
                        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleLineClick(i); }}
                      >
                        <span style={{ color: "var(--ink-soft)", userSelect: "none", display: "inline-block", width: "2.5em", textAlign: "right", marginRight: "1em", fontSize: "0.7rem" }}>
                          {i + 1}
                        </span>
                        {line || " "}
                        {placeholdersByLine[i] && placeholdersByLine[i].map((p) => (
                          <span
                            key={p.id}
                            style={{
                              display: "inline-block", marginLeft: "0.5em", padding: "1px 8px",
                              borderRadius: "3px", fontSize: "0.7rem", fontWeight: 600,
                              background: p.color + "22", color: p.color, border: `1px solid ${p.color}55`,
                            }}
                          >
                            [{p.marker}: {p.party}]
                          </span>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          <ShareButtons path="/tools/e-signature-placeholder" text="E-Signature Placeholder Tool — Mark Where to Sign in Contracts — DoAide" />

          <section aria-labelledby="esign-faq-heading">
            <h2 id="esign-faq-heading" style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--ink)", margin: "2rem 0 1rem" }}>
              Frequently Asked Questions
            </h2>
            <dl style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {FAQ_ITEMS.map((item, i) => (
                <div key={i} className="calc-card" style={{ padding: 0 }}>
                  <dt>
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      aria-expanded={openFaq === i}
                      style={{
                        width: "100%", textAlign: "left", padding: "0.75rem 1rem",
                        display: "flex", justifyContent: "space-between", alignItems: "center",
                        background: "none", border: "none", color: "var(--ink)", cursor: "pointer",
                        fontSize: "0.9rem", fontWeight: 500, minHeight: "44px",
                      }}
                    >
                      {item.q}
                      <span aria-hidden="true" style={{ flexShrink: 0, marginLeft: "0.5rem" }}>{openFaq === i ? "−" : "+"}</span>
                    </button>
                  </dt>
                  {openFaq === i && (
                    <dd style={{ padding: "0 1rem 0.75rem", margin: 0, fontSize: "0.85rem", lineHeight: 1.7, color: "var(--ink-soft)" }}>
                      {item.a}
                    </dd>
                  )}
                </div>
              ))}
            </dl>
          </section>

          <div className="calc-card" style={{ textAlign: "center" }}>
            <p style={{ fontSize: "0.9rem", color: "var(--ink-soft)", marginBottom: "0.75rem" }}>
              Need a complete contract? Generate one with all signature blocks included.
            </p>
            <a href="/generator" className="btn btn-primary" style={{ display: "inline-block" }}>
              Generate a contract — free
            </a>
          </div>
        </div>
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "E-Signature Placeholder Tool",
            description: "Mark where signatures, initials, dates and names go in your contract. Prepare agreements for e-signing.",
            url: "https://contracts.doaide.com/tools/e-signature-placeholder",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            author: { "@type": "Organization", name: "Apprend Technologies", url: "https://doaide.com" },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQ_ITEMS.map((item) => ({
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
