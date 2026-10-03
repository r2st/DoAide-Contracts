import { useState } from "react";
import ToolsNav from "../components/ToolsNav";
import { usePageTitle } from "../hooks/usePageTitle";
import { copyToClipboard, embedSnippet } from "../lib/share";

export default function EmbedPage() {
  usePageTitle("Embed Contract Generator on Your Website — Free Widget");
  const [copied, setCopied] = useState(false);

  const snippet = embedSnippet();

  const handleCopy = async () => {
    const ok = await copyToClipboard(snippet);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="tool-page">
      <ToolsNav />
      <main className="tool-main">
        <div className="tool-container">
          <h1 className="tool-title">Embed Contract Generator on Your Website</h1>
          <p className="tool-subtitle">
            Add a free contract generator to your website with one line of code.
            Your visitors can create contracts directly on your site. No sign-up required.
          </p>

          <div className="panel">
            <h2>How it works</h2>
            <ol style={{ paddingLeft: "1.2rem", lineHeight: 1.8 }}>
              <li>Copy the embed code below</li>
              <li>Paste it into your website&apos;s HTML</li>
              <li>Your visitors can generate free contracts directly on your site</li>
            </ol>
          </div>

          <div className="panel">
            <label style={{ display: "block", marginBottom: "0.5rem" }}>
              <strong>Copy this code to your website</strong>
            </label>
            <pre className="embed-code">{snippet}</pre>
            <button onClick={handleCopy} className="btn btn-primary" style={{ marginTop: "0.75rem" }}>
              {copied ? "Copied!" : "Copy embed code"}
            </button>
          </div>

          <div className="panel">
            <h2>Preview</h2>
            <div style={{ border: "1px solid var(--line)", borderRadius: "8px", overflow: "hidden" }}>
              <iframe
                src="/generator"
                width="100%"
                height="500"
                frameBorder="0"
                title="DoAide Contract Generator Preview"
                style={{ display: "block" }}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
