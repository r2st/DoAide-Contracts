import { useState } from "react";
import ToolsNav from "../components/ToolsNav";
import ShareButtons from "../components/ShareButtons";
import { usePageTitle } from "../hooks/usePageTitle";

function analyzeReadability(text) {
  if (!text.trim()) return null;
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);
  const words = text.split(/\s+/).filter((w) => w.length > 0);
  const syllables = words.reduce((sum, w) => sum + countSyllables(w), 0);

  const sentenceCount = Math.max(sentences.length, 1);
  const wordCount = words.length;
  const avgWordsPerSentence = wordCount / sentenceCount;
  const avgSyllablesPerWord = wordCount > 0 ? syllables / wordCount : 0;

  // Flesch Reading Ease
  const flesch = 206.835 - 1.015 * avgWordsPerSentence - 84.6 * avgSyllablesPerWord;
  const fleschClamped = Math.max(0, Math.min(100, flesch));

  // Flesch-Kincaid Grade Level
  const gradeLevel = 0.39 * avgWordsPerSentence + 11.8 * avgSyllablesPerWord - 15.59;

  const longSentences = sentences.filter((s) => s.trim().split(/\s+/).length > 25).length;
  const complexWords = words.filter((w) => countSyllables(w) >= 3).length;
  const legalJargon = findJargon(text);

  return {
    fleschScore: Math.round(fleschClamped),
    gradeLevel: Math.max(1, Math.round(gradeLevel * 10) / 10),
    wordCount,
    sentenceCount,
    avgWordsPerSentence: Math.round(avgWordsPerSentence * 10) / 10,
    longSentences,
    complexWords,
    legalJargon,
  };
}

function countSyllables(word) {
  word = word.toLowerCase().replace(/[^a-z]/g, "");
  if (word.length <= 2) return 1;
  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, "");
  word = word.replace(/^y/, "");
  const m = word.match(/[aeiouy]{1,2}/g);
  return m ? m.length : 1;
}

const JARGON_LIST = [
  { term: "hereinafter", plain: "from now on / referred to as" },
  { term: "whereas", plain: "since / because" },
  { term: "notwithstanding", plain: "despite / regardless of" },
  { term: "aforementioned", plain: "mentioned earlier" },
  { term: "hereunder", plain: "under this agreement" },
  { term: "therein", plain: "in that" },
  { term: "forthwith", plain: "immediately" },
  { term: "shall", plain: "will / must" },
  { term: "heretofore", plain: "until now" },
  { term: "inter alia", plain: "among other things" },
  { term: "mutatis mutandis", plain: "with necessary changes" },
  { term: "prima facie", plain: "at first sight / on the face of it" },
];

function findJargon(text) {
  const lower = text.toLowerCase();
  return JARGON_LIST.filter((j) => lower.includes(j.term));
}

function scoreLabel(score) {
  if (score >= 60) return { label: "Easy to Read", color: "var(--good, #22c55e)" };
  if (score >= 30) return { label: "Moderate", color: "var(--warn, #f59e0b)" };
  return { label: "Difficult", color: "var(--bad, #ef4444)" };
}

const SAMPLE = `This Agreement (hereinafter referred to as the "Agreement") is entered into by and between the parties named herein. Notwithstanding any provision to the contrary, the parties shall forthwith comply with all obligations set forth hereunder. The aforementioned terms shall apply mutatis mutandis to any amendments made therein.`;

export default function ReadabilityScorerPage() {
  usePageTitle("Contract Readability Scorer");
  const [text, setText] = useState("");

  const result = analyzeReadability(text);
  const score = result ? scoreLabel(result.fleschScore) : null;

  return (
    <div className="tool-page">
      <ToolsNav />
      <main className="tool-main">
        <div className="tool-container">
          <h1 className="tool-title">Contract Readability Scorer</h1>
          <p className="tool-subtitle">
            Paste any contract text to get a readability score, grade level, and plain-language suggestions — no sign-up required.
          </p>

          <div className="calc-card">
            <label className="calc-label">
              Paste your contract text
              <textarea
                className="calc-input"
                rows={8}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste contract text here..."
                style={{ resize: "vertical", fontFamily: "inherit" }}
              />
            </label>
            <button className="btn btn-ghost" onClick={() => setText(SAMPLE)} style={{ alignSelf: "flex-start", fontSize: "0.8rem" }}>
              Try sample text
            </button>
          </div>

          {result && (
            <>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "0.75rem" }}>
                <div className="stat-card tone-brand">
                  <div style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--ink-muted)" }}>Readability</div>
                  <div style={{ fontSize: "1.5rem", fontWeight: 700, color: score.color }}>{result.fleschScore}/100</div>
                  <div style={{ fontSize: "0.8rem", color: score.color }}>{score.label}</div>
                </div>
                <div className="stat-card">
                  <div style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--ink-muted)" }}>Grade Level</div>
                  <div style={{ fontSize: "1.5rem", fontWeight: 700 }}>{result.gradeLevel}</div>
                </div>
                <div className="stat-card">
                  <div style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--ink-muted)" }}>Words</div>
                  <div style={{ fontSize: "1.5rem", fontWeight: 700 }}>{result.wordCount}</div>
                </div>
                <div className="stat-card">
                  <div style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--ink-muted)" }}>Sentences</div>
                  <div style={{ fontSize: "1.5rem", fontWeight: 700 }}>{result.sentenceCount}</div>
                </div>
                <div className="stat-card">
                  <div style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--ink-muted)" }}>Avg Words/Sentence</div>
                  <div style={{ fontSize: "1.5rem", fontWeight: 700 }}>{result.avgWordsPerSentence}</div>
                </div>
                <div className="stat-card">
                  <div style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--ink-muted)" }}>Long Sentences</div>
                  <div style={{ fontSize: "1.5rem", fontWeight: 700, color: result.longSentences > 0 ? "var(--warn, #f59e0b)" : "inherit" }}>{result.longSentences}</div>
                </div>
              </div>

              {result.legalJargon.length > 0 && (
                <div className="calc-card">
                  <h3 style={{ margin: "0 0 0.75rem", fontSize: "1rem", fontWeight: 600 }}>Legal Jargon Found ({result.legalJargon.length})</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    {result.legalJargon.map((j) => (
                      <div key={j.term} style={{ display: "flex", gap: "1rem", fontSize: "0.85rem", alignItems: "baseline" }}>
                        <span style={{ fontWeight: 600, color: "var(--warn, #f59e0b)", minWidth: "120px" }}>{j.term}</span>
                        <span style={{ color: "var(--ink-soft)" }}>&rarr; {j.plain}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <ShareButtons path="/tools/readability-scorer" text="Contract Readability Scorer — DoAide Contracts" />

              <div className="calc-card" style={{ textAlign: "center" }}>
                <p style={{ fontSize: "0.9rem", color: "var(--ink-soft)", marginBottom: "0.75rem" }}>Want AI-powered contract review with detailed suggestions?</p>
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
            name: "Contract Readability Scorer",
            description: "Analyze contract readability with Flesch score, grade level, and jargon detection.",
            url: "https://contracts.doaide.com/tools/readability-scorer",
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
