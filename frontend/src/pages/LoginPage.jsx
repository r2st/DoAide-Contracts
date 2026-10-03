import { usePageTitle } from "../hooks/usePageTitle";
import AuthForm from "../components/AuthForm";
import ThemeToggle from "../components/ThemeToggle";

export default function LoginPage() {
  usePageTitle("Sign in");

  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: "1.5rem", background: "var(--canvas)" }}>
      <div style={{ width: "100%", maxWidth: 380, textAlign: "center" }}>
        <svg viewBox="0 0 32 32" width="48" height="48" style={{ margin: "0 auto 16px", display: "block" }} aria-hidden="true">
          <rect width="32" height="32" rx="6" fill="#0A0A0B"/>
          <path d="M8 7h12a2 2 0 012 2v14a2 2 0 01-2 2H8V7z" fill="#F0B429" opacity="0.9"/>
          <rect x="12" y="11" width="8" height="1.5" rx="0.75" fill="#0A0A0B"/>
          <rect x="12" y="14.5" width="6" height="1.5" rx="0.75" fill="#0A0A0B"/>
          <rect x="12" y="18" width="7" height="1.5" rx="0.75" fill="#0A0A0B"/>
        </svg>
        <h1 style={{ fontFamily: "var(--doaide-font-display)", fontSize: 42, fontWeight: 400, margin: "0 0 8px" }}>
          DoAide <span style={{ fontStyle: "italic", color: "#F0B429" }}>Contracts</span>
        </h1>
        <p style={{ fontSize: 14, color: "var(--ink-muted)", margin: "0 0 24px" }}>
          AI-powered contract review and generation
        </p>
        <AuthForm defaultMode="login" />
        <div style={{ marginTop: 16 }}>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
