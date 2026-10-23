import { useMemo, useState } from "react";
import ToolsNav from "../components/ToolsNav";
import ShareButtons from "../components/ShareButtons";
import { usePageTitle } from "../hooks/usePageTitle";

function diffLines(aText, bText) {
  const clean = (t) =>
    t.split(/\r?\n/).map((l) => l.trim()).filter((l) => l.length > 0);
  const a = clean(aText);
  const b = clean(bText);
  const norm = (l) => l.replace(/\s+/g, " ").toLowerCase();
  const m = a.length;
  const n = b.length;
  const lcs = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = m - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      lcs[i][j] =
        norm(a[i]) === norm(b[j])
          ? lcs[i + 1][j + 1] + 1
          : Math.max(lcs[i + 1][j], lcs[i][j + 1]);
    }
  }
  const rows = [];
  let i = 0;
  let j = 0;
  while (i < m && j < n) {
    if (norm(a[i]) === norm(b[j])) {
      rows.push({ type: "same", a: a[i], b: b[j] });
      i++;
      j++;
    } else if (lcs[i + 1][j] >= lcs[i][j + 1]) {
      rows.push({ type: "removed", a: a[i], b: null });
      i++;
    } else {
      rows.push({ type: "added", a: null, b: b[j] });
      j++;
    }
  }
  while (i < m) rows.push({ type: "removed", a: a[i++], b: null });
  while (j < n) rows.push({ type: "added", a: null, b: b[j++] });
  return rows;
}

const FAQ_ITEMS = [
  {
    q: "Why should I track contract versions?",
    a: "Contract negotiations often involve multiple rounds of revisions. Tracking versions helps you identify exactly what changed between drafts, ensures no unauthorized modifications slip through, and provides an audit trail that can be critical during disputes or compliance reviews.",
  },
  {
    q: "How many versions can I compare?",
    a: "You can add up to 5 contract versions. Select any two versions from the timeline to see a detailed side-by-side comparison highlighting every addition, removal, and change.",
  },
  {
    q: "What does the diff show?",
    a: "The diff compares lines between two versions. Green-highlighted lines are new additions, red-highlighted lines are removals, and unchanged lines are shown without highlighting. A summary count of added, removed, and unchanged lines is shown above the diff.",
  },
  {
    q: "Is version comparison important for Indian contracts?",
    a: "Yes. Under the Indian Contract Act 1872, the final signed version is binding. If a dispute arises, courts look at the executed document. Maintaining a clear version history proves which terms were agreed upon and helps demonstrate good-faith negotiation, which can be important in arbitration proceedings.",
  },
  {
    q: "Can I export the comparison results?",
    a: "Yes. Click the 'Copy diff summary' button to copy a text-based comparison to your clipboard. This includes the version labels, line-by-line changes, and summary statistics — useful for sharing with legal teams or attaching to email threads.",
  },
];

export default function VersionHistoryPage() {
  usePageTitle(
    "Contract Version History — Compare Drafts Side by Side",
    "Free tool to compare multiple contract versions. Track changes across drafts with side-by-side diff — no sign-up required.",
  );

  const [versions, setVersions] = useState([]);
  const [draftLabel, setDraftLabel] = useState("");
  const [draftText, setDraftText] = useState("");
  const [selectedA, setSelectedA] = useState(null);
  const [selectedB, setSelectedB] = useState(null);
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  function addVersion() {
    if (!draftText.trim()) return;
    const label = draftLabel.trim() || `Version ${versions.length + 1}`;
    setVersions((prev) => [...prev, { id: Date.now(), label, text: draftText.trim(), addedAt: new Date().toISOString() }]);
    setDraftLabel("");
    setDraftText("");
    if (versions.length === 0) {
      setSelectedA(0);
    } else if (versions.length >= 1 && selectedB === null) {
      setSelectedB(versions.length);
    }
  }

  function removeVersion(idx) {
    setVersions((prev) => prev.filter((_, i) => i !== idx));
    if (selectedA === idx) setSelectedA(null);
    else if (selectedA > idx) setSelectedA(selectedA - 1);
    if (selectedB === idx) setSelectedB(null);
    else if (selectedB > idx) setSelectedB(selectedB - 1);
  }

  const diff = useMemo(() => {
    if (selectedA === null || selectedB === null) return null;
    if (!versions[selectedA] || !versions[selectedB]) return null;
    return diffLines(versions[selectedA].text, versions[selectedB].text);
  }, [versions, selectedA, selectedB]);

  const stats = useMemo(() => {
    if (!diff) return null;
    return {
      added: diff.filter((r) => r.type === "added").length,
      removed: diff.filter((r) => r.type === "removed").length,
      same: diff.filter((r) => r.type === "same").length,
    };
  }, [diff]);

  async function copyDiffSummary() {
    if (!diff || selectedA === null || selectedB === null) return;
    const vA = versions[selectedA];
    const vB = versions[selectedB];
    const header = `Comparison: ${vA.label} → ${vB.label}\nAdded: ${stats.added} | Removed: ${stats.removed} | Unchanged: ${stats.same}\n${"─".repeat(60)}\n`;
    const body = diff
      .map((r) => {
        if (r.type === "same") return `  ${r.a}`;
        if (r.type === "removed") return `- ${r.a}`;
        return `+ ${r.b}`;
      })
      .join("\n");
    try {
      await navigator.clipboard.writeText(header + body);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* clipboard unavailable */ }
  }

  return (
    <div className="tool-page">
      <ToolsNav />
      <main className="tool-main">
        <div className="tool-container">
          <h1 className="tool-title">Contract Version History</h1>
          <p className="tool-subtitle">
            Add up to 5 contract versions and compare any two side by side. Track every change across drafts — free, no sign-up required.
          </p>

          {/* Add version form */}
          <div className="calc-card">
            <h2 style={{ fontSize: "1rem", fontWeight: 600, color: "var(--ink)", margin: "0 0 0.75rem" }}>
              Add a version {versions.length > 0 && <span style={{ fontWeight: 400, color: "var(--ink-soft)" }}>({versions.length}/5)</span>}
            </h2>
            <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem" }}>
              <input
                type="text"
                className="calc-input"
                placeholder={`Version label (e.g. Draft ${versions.length + 1})`}
                value={draftLabel}
                onChange={(e) => setDraftLabel(e.target.value)}
                style={{ margin: 0, flex: 1 }}
                aria-label="Version label"
              />
            </div>
            <textarea
              rows={8}
              className="calc-input"
              placeholder="Paste this version of the contract..."
              value={draftText}
              onChange={(e) => setDraftText(e.target.value)}
              style={{ width: "100%", fontFamily: "inherit", resize: "vertical", margin: 0 }}
              aria-label="Version text"
            />
            <button
              className="btn btn-primary"
              style={{ marginTop: "0.75rem" }}
              onClick={addVersion}
              disabled={!draftText.trim() || versions.length >= 5}
            >
              Add version
            </button>
          </div>

          {/* Timeline */}
          {versions.length > 0 && (
            <div className="calc-card">
              <h2 style={{ fontSize: "1rem", fontWeight: 600, color: "var(--ink)", margin: "0 0 0.75rem" }}>
                Version Timeline
              </h2>
              <p style={{ fontSize: "0.82rem", color: "var(--ink-soft)", margin: "0 0 0.75rem" }}>
                Click two versions to compare them.
              </p>
              <div style={{ display: "flex", gap: "0.75rem", overflowX: "auto", padding: "0.25rem 0" }}>
                {versions.map((v, i) => {
                  const isA = selectedA === i;
                  const isB = selectedB === i;
                  const selected = isA || isB;
                  return (
                    <div key={v.id} style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: "100px" }}>
                      <button
                        className={`btn ${selected ? "btn-primary" : "btn-ghost"}`}
                        style={{ width: "100%", fontSize: "0.82rem", position: "relative" }}
                        onClick={() => {
                          if (isA) { setSelectedA(null); return; }
                          if (isB) { setSelectedB(null); return; }
                          if (selectedA === null) setSelectedA(i);
                          else if (selectedB === null) setSelectedB(i);
                          else { setSelectedA(selectedB); setSelectedB(i); }
                        }}
                      >
                        {v.label}
                        {isA && <span style={{ position: "absolute", top: "-8px", right: "-4px", fontSize: "0.6rem", background: "var(--brand)", color: "#fff", borderRadius: "8px", padding: "0 4px" }}>A</span>}
                        {isB && <span style={{ position: "absolute", top: "-8px", right: "-4px", fontSize: "0.6rem", background: "#2563EB", color: "#fff", borderRadius: "8px", padding: "0 4px" }}>B</span>}
                      </button>
                      <span style={{ fontSize: "0.7rem", color: "var(--ink-soft)", marginTop: "0.25rem" }}>
                        {v.text.split(/\s+/).length} words
                      </span>
                      <button
                        onClick={() => removeVersion(i)}
                        style={{ background: "none", border: "none", color: "var(--ink-soft)", cursor: "pointer", fontSize: "0.7rem", marginTop: "0.25rem" }}
                        aria-label={`Remove ${v.label}`}
                      >
                        remove
                      </button>
                      {i < versions.length - 1 && (
                        <div style={{ position: "absolute", top: "50%", right: "-0.5rem", width: "0.75rem", height: "2px", background: "var(--line, var(--doaide-border))" }} />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Diff view */}
          {diff && stats && (
            <div className="calc-card" style={{ padding: 0 }}>
              <div style={{ padding: "0.75rem 1rem", borderBottom: "1px solid var(--line, var(--doaide-border))", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
                <div>
                  <h2 style={{ fontSize: "1rem", fontWeight: 600, color: "var(--ink)", margin: 0 }}>
                    {versions[selectedA]?.label} → {versions[selectedB]?.label}
                  </h2>
                  <div style={{ display: "flex", gap: "1rem", fontSize: "0.8rem", marginTop: "0.25rem" }}>
                    <span style={{ color: "#34D399" }}>+{stats.added} added</span>
                    <span style={{ color: "#F87171" }}>−{stats.removed} removed</span>
                    <span style={{ color: "var(--ink-soft)" }}>{stats.same} unchanged</span>
                  </div>
                </div>
                <button className="btn btn-ghost" style={{ fontSize: "0.8rem" }} onClick={copyDiffSummary}>
                  {copied ? "Copied!" : "Copy diff summary"}
                </button>
              </div>
              <div style={{ maxHeight: "500px", overflowY: "auto" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", fontSize: "0.8rem", fontFamily: "var(--doaide-font-mono, monospace)", lineHeight: 1.7 }}>
                  <div style={{ padding: "0.5rem 0.75rem", fontWeight: 600, borderBottom: "1px solid var(--line, var(--doaide-border))", color: "var(--ink-soft)", fontSize: "0.75rem" }}>
                    {versions[selectedA]?.label}
                  </div>
                  <div style={{ padding: "0.5rem 0.75rem", fontWeight: 600, borderBottom: "1px solid var(--line, var(--doaide-border))", borderLeft: "1px solid var(--line, var(--doaide-border))", color: "var(--ink-soft)", fontSize: "0.75rem" }}>
                    {versions[selectedB]?.label}
                  </div>
                  {diff.map((row, i) => (
                    <div key={i} style={{ display: "contents" }}>
                      <div style={{
                        padding: "2px 0.75rem", whiteSpace: "pre-wrap",
                        background: row.type === "removed" ? "rgba(248,113,113,0.12)" : row.type === "added" ? "rgba(52,211,153,0.06)" : "transparent",
                        color: row.type === "removed" ? "#F87171" : "var(--ink-soft)",
                        borderBottom: "1px solid var(--line, var(--doaide-border))",
                      }}>
                        {row.a || " "}
                      </div>
                      <div style={{
                        padding: "2px 0.75rem", whiteSpace: "pre-wrap",
                        background: row.type === "added" ? "rgba(52,211,153,0.12)" : row.type === "removed" ? "rgba(248,113,113,0.06)" : "transparent",
                        color: row.type === "added" ? "#34D399" : "var(--ink-soft)",
                        borderBottom: "1px solid var(--line, var(--doaide-border))",
                        borderLeft: "1px solid var(--line, var(--doaide-border))",
                      }}>
                        {row.b || " "}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {versions.length >= 2 && !diff && (
            <div className="calc-card" style={{ textAlign: "center", color: "var(--ink-soft)" }}>
              Select two versions above to see the comparison.
            </div>
          )}

          <ShareButtons path="/tools/version-history" text="Contract Version History — Compare Drafts Side by Side — DoAide" />

          <section aria-labelledby="version-faq-heading">
            <h2 id="version-faq-heading" style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--ink)", margin: "2rem 0 1rem" }}>
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
              Need a fresh contract? Generate one from a template in seconds.
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
            name: "Contract Version History",
            description: "Compare multiple contract versions side by side. Track changes across drafts with detailed diff.",
            url: "https://contracts.doaide.com/tools/version-history",
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
