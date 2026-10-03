import { useState } from "react";
import { Link } from "react-router-dom";
import { usePageTitle } from "../hooks/usePageTitle";
import { api } from "../lib/api";
import ErrorBanner from "../components/ErrorBanner";

export default function ForgotPasswordPage() {
  usePageTitle("Forgot password");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email.trim()) return;
    setError("");
    setBusy(true);
    try {
      await api.forgotPassword(email);
      setSent(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: "1.5rem", background: "var(--canvas)" }}>
      <div style={{ width: "100%", maxWidth: 380, textAlign: "center" }}>
        <h1 style={{ fontFamily: "var(--doaide-font-display)", fontSize: 32, fontWeight: 400, margin: "0 0 8px" }}>
          Reset password
        </h1>
        {sent ? (
          <div className="panel" style={{ textAlign: "left" }}>
            <p>If an account exists for <strong>{email}</strong>, we have sent a reset link.</p>
            <Link to="/login" className="btn btn-primary" style={{ marginTop: "1rem", display: "block", textAlign: "center" }}>
              Back to sign in
            </Link>
          </div>
        ) : (
          <div className="auth-card">
            <p className="field-hint" style={{ marginBottom: "1rem" }}>
              Enter your email and we will send you a link to reset your password.
            </p>
            <ErrorBanner message={error} onDismiss={() => setError("")} />
            <form onSubmit={handleSubmit} className="auth-form" noValidate>
              <label htmlFor="reset-email">Email</label>
              <input
                id="reset-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit" className="auth-submit" disabled={busy}>
                {busy ? "Sending…" : "Send reset link"}
              </button>
            </form>
            <p style={{ fontSize: 14, marginTop: 16, color: "var(--ink-muted)" }}>
              <Link to="/login">Back to sign in</Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
