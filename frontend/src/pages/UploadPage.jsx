import { useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePageTitle } from "../hooks/usePageTitle";
import { api } from "../lib/api";
import ErrorBanner from "../components/ErrorBanner";

const ACCEPTED = ".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document";
const MAX_SIZE = 25 * 1024 * 1024;

export default function UploadPage() {
  usePageTitle("Upload contract");
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const upload = useCallback(async (file) => {
    if (!file) return;
    const ext = file.name.split(".").pop()?.toLowerCase();
    if (!["pdf", "docx"].includes(ext)) {
      setError("Only PDF and DOCX files are supported.");
      return;
    }
    if (file.size > MAX_SIZE) {
      setError("File is too large. Maximum size is 25 MB.");
      return;
    }
    setError("");
    setFileName(file.name);
    setUploading(true);
    try {
      const result = await api.uploadContract(file);
      navigate(`/review/${result.id}`);
    } catch (err) {
      setError(err.message);
      setUploading(false);
    }
  }, [navigate]);

  function onDrop(e) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer?.files?.[0];
    upload(file);
  }

  function onFileChange(e) {
    upload(e.target.files?.[0]);
  }

  return (
    <>
      <div className="page-head">
        <h1>Upload contract for review</h1>
      </div>

      <ErrorBanner message={error} onDismiss={() => setError("")} />

      <div
        className={`dropzone${dragging ? " is-dragging" : ""}`}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
      >
        {uploading ? (
          <div>
            <p style={{ fontWeight: 600 }}>Uploading {fileName}…</p>
            <p className="field-hint">Your contract is being processed. This may take up to 30 seconds.</p>
          </div>
        ) : (
          <div>
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true" style={{ margin: "0 auto 16px", display: "block" }}>
              <rect x="12" y="8" width="24" height="32" rx="3" stroke="var(--ink-soft)" strokeWidth="2" />
              <path d="M18 28l6-6 6 6" stroke="var(--brand)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M24 22v14" stroke="var(--brand)" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <p style={{ fontWeight: 600, margin: "0 0 8px" }}>
              Drag and drop your contract here
            </p>
            <p className="field-hint" style={{ margin: "0 0 16px" }}>
              PDF or DOCX, up to 25 MB
            </p>
            <label className="btn btn-primary" style={{ cursor: "pointer" }}>
              Choose file
              <input
                ref={inputRef}
                type="file"
                accept={ACCEPTED}
                onChange={onFileChange}
                className="visually-hidden"
              />
            </label>
          </div>
        )}
      </div>

      <div className="panel">
        <h2>What happens next?</h2>
        <ol style={{ paddingLeft: "1.2rem", color: "var(--ink-soft)", lineHeight: 1.8 }}>
          <li>We extract text and identify individual clauses</li>
          <li>Each clause is analyzed for risks and compliance issues</li>
          <li>You get a clause-by-clause review with suggestions</li>
          <li>Download a full risk report as PDF</li>
        </ol>
      </div>
    </>
  );
}
