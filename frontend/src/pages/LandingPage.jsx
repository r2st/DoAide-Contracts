import { useEffect, useRef, useState } from "react";
import { usePageTitle } from "../hooks/usePageTitle";
import AuthForm from "../components/AuthForm";
import ThemeToggle from "../components/ThemeToggle";

const PHRASES = [
  "AI-powered contract review in seconds",
  "Generate Indian-compliant contracts",
  "Clause-by-clause risk analysis",
  "Templates for GST, rental, NDA, MSA",
];

function Typewriter() {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const phrase = PHRASES[index];

  useEffect(() => {
    if (!deleting && text === phrase) {
      const id = setTimeout(() => setDeleting(true), 2000);
      return () => clearTimeout(id);
    }
    if (deleting && text === "") {
      setDeleting(false);
      setIndex((i) => (i + 1) % PHRASES.length);
      return;
    }
    const speed = deleting ? 30 : 60;
    const id = setTimeout(() => {
      setText(deleting ? phrase.slice(0, text.length - 1) : phrase.slice(0, text.length + 1));
    }, speed);
    return () => clearTimeout(id);
  }, [text, deleting, phrase]);

  return (
    <div className="landing-typewriter-wrap">
      <span className="landing-typewriter" aria-label={phrase}>
        {text}
        <span className="landing-cursor" aria-hidden="true">|</span>
      </span>
    </div>
  );
}

const PRODUCTS = [
  { name: "Desk", url: "https://desk.doaide.com" },
  { name: "Jobs", url: "https://jobs.doaide.com" },
  { name: "Pulse", url: "https://pulse.doaide.com" },
  { name: "Med", url: "https://med.doaide.com" },
  { name: "Realty", url: "https://realty.doaide.com" },
  { name: "Reach", url: "https://reach.doaide.com" },
  { name: "Trade", url: "https://trade.doaide.com" },
  { name: "GST", url: "https://gst.doaide.com" },
  { name: "409A", url: "https://409a.doaide.com" },
];

export default function LandingPage() {
  usePageTitle(null);

  return (
    <div className="landing-root">
      <header className="landing-header">
        <a href="https://doaide.com" className="landing-brand">
          <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true">
            <rect width="32" height="32" rx="6" fill="#0A0A0B"/>
            <path d="M8 7h12a2 2 0 012 2v14a2 2 0 01-2 2H8V7z" fill="#F0B429" opacity="0.9"/>
            <rect x="12" y="11" width="8" height="1.5" rx="0.75" fill="#0A0A0B"/>
            <rect x="12" y="14.5" width="6" height="1.5" rx="0.75" fill="#0A0A0B"/>
            <rect x="12" y="18" width="7" height="1.5" rx="0.75" fill="#0A0A0B"/>
          </svg>
          <span className="landing-brand-text">DoAide <em>Contracts</em></span>
        </a>
        <div style={{ marginLeft: "auto" }}>
          <ThemeToggle />
        </div>
      </header>

      <div className="landing-split">
        <div className="landing-left">
          <h1 className="landing-headline">
            AI-Powered Contract Review for India
          </h1>
          <p className="landing-subtitle">
            Upload any contract for clause-by-clause risk analysis, or generate
            legally compliant agreements from Indian-specific templates — GST vendor
            agreements, rental contracts, NDAs, and more.
          </p>
          <Typewriter />

          <div className="landing-features">
            <div className="landing-feature">
              <strong>Free forever</strong>
              <span>3 reviews/month</span>
            </div>
            <div className="landing-feature">
              <strong>Pro — ₹2,399/mo</strong>
              <span>Unlimited reviews</span>
            </div>
            <div className="landing-feature">
              <strong>Business — ₹8,199/mo</strong>
              <span>Team + API access</span>
            </div>
          </div>
        </div>

        <div className="landing-right">
          <AuthForm />
        </div>
      </div>

      <footer className="landing-footer">
        <div className="landing-footer-products">
          {PRODUCTS.map((p) => (
            <a key={p.name} href={p.url} className="landing-footer-link">{p.name}</a>
          ))}
        </div>
        <div className="landing-footer-bottom">
          <a href="https://doaide.com" className="landing-footer-home">
            <svg viewBox="0 0 32 32" width="16" height="16" aria-hidden="true">
              <rect width="32" height="32" rx="6" fill="#F0B429"/>
              <text x="16" y="22" textAnchor="middle" fontSize="16" fontWeight="700" fill="#0A0A0B">D</text>
            </svg>
            doaide.com
          </a>
          <span className="landing-footer-copy">© {new Date().getFullYear()} DoAide</span>
        </div>
      </footer>
    </div>
  );
}
