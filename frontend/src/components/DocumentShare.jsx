import { useState } from "react";
import {
  canShareFile,
  documentWhatsappUrl,
  downloadDocument,
  shareDocumentFile,
} from "../lib/documentShare";
import { fullUrl } from "../lib/share";

export default function DocumentShare({ title, body, toolPath = "/generator" }) {
  const [status, setStatus] = useState("");
  const link = fullUrl(toolPath);

  async function handleWhatsapp(e) {
    // Phones get the whole contract as a file; everyone else gets the wa.me text.
    if (!canShareFile()) return;
    e.preventDefault();
    const result = await shareDocumentFile(title, body);
    if (result === "unsupported") {
      window.open(documentWhatsappUrl(title, body, link), "_blank", "noopener");
    }
  }

  function handleDownload() {
    downloadDocument(title, body);
    setStatus("Downloaded");
    setTimeout(() => setStatus(""), 2000);
  }

  return (
    <div className="document-share" role="group" aria-label={`Send ${title}`}>
      <a
        href={documentWhatsappUrl(title, body, link)}
        onClick={handleWhatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-primary share-whatsapp document-share-whatsapp"
      >
        Send contract on WhatsApp
      </a>
      <button type="button" className="btn btn-ghost" onClick={handleDownload}>
        {status || "Download .txt"}
      </button>
      <button type="button" className="btn btn-ghost" onClick={() => window.print()}>
        Print / Save as PDF
      </button>
    </div>
  );
}
