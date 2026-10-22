import { useMemo, useState } from "react";
import ToolsNav from "../components/ToolsNav";
import ShareButtons from "../components/ShareButtons";
import { usePageTitle } from "../hooks/usePageTitle";

/**
 * Line-level diff of two contract versions, computed with a longest-common-
 * subsequence table. Lines are compared after collapsing whitespace, so a
 * re-wrapped paragraph is not flagged as a change.
 */
export function diffLines(aText, bText) {
  const clean = (t) =>
    t
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter((l) => l.length > 0);
  const a = clean(aText);
  const b = clean(bText);
  const norm = (l) => l.replace(/\s+/g, " ").toLowerCase();

  // LCS table over normalized lines.
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

  // A removal directly followed by an addition reads as one changed line.
  const merged = [];
  for (let k = 0; k < rows.length; k++) {
    const row = rows[k];
    const next = rows[k + 1];
    if (row.type === "removed" && next?.type === "added") {
      merged.push({ type: "changed", a: row.a, b: next.b });
      k++;
    } else {
      merged.push(row);
    }
  }

  const added = merged.filter((r) => r.type === "added").length;
  const removed = merged.filter((r) => r.type === "removed").length;
  const changed = merged.filter((r) => r.type === "changed").length;
  const same = merged.filter((r) => r.type === "same").length;
  const total = merged.length || 1;
  const similarity = Math.round((same / total) * 100);

  return { rows: merged, added, removed, changed, same, similarity };
}

const wordCount = (t) => t.split(/\s+/).filter((w) => w.length > 0).length;

const SAMPLE_A = `SERVICE AGREEMENT

1. TERM
This Agreement shall commence on 1 November 2026 and continue for a period of 12 months.

2. FEES
The Client shall pay the Service Provider a monthly fee of Rs. 50,000, payable within 30 days of invoice.

3. TERMINATION
Either party may terminate this Agreement with 30 days written notice.

4. GOVERNING LAW
This Agreement shall be governed by the laws of Maharashtra, India.`;

const SAMPLE_B = `SERVICE AGREEMENT

1. TERM
This Agreement shall commence on 1 November 2026 and continue for a period of 24 months.

2. FEES
The Client shall pay the Service Provider a monthly fee of Rs. 50,000, payable within 15 days of invoice.

3. TERMINATION
Either party may terminate this Agreement with 60 days written notice.

4. CONFIDENTIALITY
Each party shall keep the other party's confidential information strictly confidential.

5. GOVERNING LAW
This Agreement shall be governed by the laws of Maharashtra, India.`;

const ROW_TONES = {
  same: { bg: "transparent", mark: "" },
  changed: { bg: "rgba(245, 158, 11, 0.12)", mark: "~" },
  added: { bg: "rgba(34, 197, 94, 0.12)", mark: "+" },
  removed: { bg: "rgba(239, 68, 68, 0.12)", mark: "−" },
};

export default function ContractComparisonPage() {
  usePageTitle(
    "Contract Comparison Tool",
    "Compare two versions of a contract side by side and see every added, removed and changed clause highlighted. Free, no sign-up, nothing leaves your browser.",
  );
  const [textA, setTextA] = useState("");
  const [textB, setTextB] = useState("");
  const [hideSame, setHideSame] = useState(false);

  const result = useMemo(() => {
    if (!textA.trim() || !textB.trim()) return null;
    return diffLines(textA, textB);
  }, [textA, textB]);

  const visibleRows = result
    ? result.rows.filter((r) => !hideSame || r.type !== "same")
    : [];

  return (
    <div className="tool-page">
      <ToolsNav />
      <main className="tool-main">
        <div className="tool-container">
          <h1 className="tool-title">Contract Comparison Tool</h1>
          <p className="tool-subtitle">
            Paste two versions of a contract to see what changed between them — every
            added, removed and reworded clause, highlighted. Everything runs in your
            browser; the text never leaves your device.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "0.75rem",
            }}
          >
            <div className="calc-card">
              <label className="calc-label">
                Original version
                <textarea
                  className="calc-input"
                  rows={10}
                  value={textA}
                  onChange={(e) => setTextA(e.target.value)}
                  placeholder="Paste the original contract text here..."
                  style={{ resize: "vertical", fontFamily: "inherit" }}
                />
              </label>
            </div>
            <div className="calc-card">
              <label className="calc-label">
                Revised version
                <textarea
                  className="calc-input"
                  rows={10}
                  value={textB}
                  onChange={(e) => setTextB(e.target.value)}
                  placeholder="Paste the revised contract text here..."
                  style={{ resize: "vertical", fontFamily: "inherit" }}
                />
              </label>
            </div>
          </div>
          <button
            className="btn btn-ghost"
            onClick={() => {
              setTextA(SAMPLE_A);
              setTextB(SAMPLE_B);
            }}
            style={{ alignSelf: "flex-start", fontSize: "0.8rem", marginTop: "0.5rem" }}
          >
            Try sample contracts
          </button>

          {result && (
            <>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
                  gap: "0.75rem",
                  marginTop: "1rem",
                }}
              >
                <div className="stat-card tone-brand">
                  <div style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--ink-muted)" }}>Similarity</div>
                  <div style={{ fontSize: "1.5rem", fontWeight: 700 }}>{result.similarity}%</div>
                </div>
                <div className="stat-card">
                  <div style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--ink-muted)" }}>Changed</div>
                  <div style={{ fontSize: "1.5rem", fontWeight: 700, color: result.changed ? "var(--warn, #f59e0b)" : "inherit" }}>{result.changed}</div>
                </div>
                <div className="stat-card">
                  <div style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--ink-muted)" }}>Added</div>
                  <div style={{ fontSize: "1.5rem", fontWeight: 700, color: result.added ? "var(--good, #22c55e)" : "inherit" }}>{result.added}</div>
                </div>
                <div className="stat-card">
                  <div style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--ink-muted)" }}>Removed</div>
                  <div style={{ fontSize: "1.5rem", fontWeight: 700, color: result.removed ? "var(--bad, #ef4444)" : "inherit" }}>{result.removed}</div>
                </div>
                <div className="stat-card">
                  <div style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--ink-muted)" }}>Words (orig / rev)</div>
                  <div style={{ fontSize: "1.5rem", fontWeight: 700 }}>
                    {wordCount(textA)} / {wordCount(textB)}
                  </div>
                </div>
              </div>

              <div className="calc-card" style={{ marginTop: "1rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.75rem" }}>
                  <h3 style={{ margin: 0, fontSize: "1rem", fontWeight: 600 }}>
                    Changes ({result.changed + result.added + result.removed})
                  </h3>
                  <label style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.8rem", color: "var(--ink-soft)", cursor: "pointer" }}>
                    <input
                      type="checkbox"
                      checked={hideSame}
                      onChange={(e) => setHideSame(e.target.checked)}
                    />
                    Show only changes
                  </label>
                </div>
                {visibleRows.length === 0 && (
                  <p style={{ fontSize: "0.85rem", color: "var(--ink-soft)", margin: 0 }}>
                    The two versions are identical line for line.
                  </p>
                )}
                <div style={{ display: "flex", flexDirection: "column", gap: "2px", overflowX: "auto" }}>
                  {visibleRows.map((row, index) => (
                    <div
                      key={index}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1.25rem 1fr",
                        gap: "0.5rem",
                        padding: "0.3rem 0.5rem",
                        borderRadius: "4px",
                        background: ROW_TONES[row.type].bg,
                        fontSize: "0.82rem",
                        lineHeight: 1.45,
                        overflowWrap: "anywhere",
                      }}
                    >
                      <span aria-hidden="true" style={{ fontWeight: 700, color: "var(--ink-muted)" }}>
                        {ROW_TONES[row.type].mark}
                      </span>
                      {row.type === "changed" ? (
                        <span>
                          <del style={{ color: "var(--bad, #ef4444)", textDecorationThickness: "1px" }}>{row.a}</del>
                          <br />
                          <ins style={{ color: "var(--good, #16a34a)", textDecoration: "none" }}>{row.b}</ins>
                        </span>
                      ) : (
                        <span
                          style={
                            row.type === "removed"
                              ? { color: "var(--bad, #ef4444)", textDecoration: "line-through", textDecorationThickness: "1px" }
                              : row.type === "added"
                                ? { color: "var(--good, #16a34a)" }
                                : undefined
                          }
                        >
                          {row.a ?? row.b}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <ShareButtons path="/tools/contract-comparison" text="Contract Comparison Tool — DoAide Contracts" />

              <div className="calc-card" style={{ textAlign: "center" }}>
                <p style={{ fontSize: "0.9rem", color: "var(--ink-soft)", marginBottom: "0.75rem" }}>
                  Want AI to explain what each change means for you?
                </p>
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
            name: "Contract Comparison Tool",
            description: "Compare two contract versions and see added, removed and changed clauses highlighted.",
            url: "https://contracts.doaide.com/tools/contract-comparison",
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
