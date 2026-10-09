import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import ShareButtons from "../components/ShareButtons";
import ThemeToggle from "../components/ThemeToggle";
import { usePageTitle } from "../hooks/usePageTitle";
import { TEMPLATES } from "../lib/templates";
import { copyToClipboard, fullUrl } from "../lib/share";

const PHRASES = [
  "Generate a contract in 60 seconds",
  "Free NDA template for Indian businesses",
  "Clause-by-clause risk analysis",
  "Templates for rental, employment, MSA",
];

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

const TEMPLATE_ICONS = {
  lock: (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#F0B429" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></svg>
  ),
  briefcase: (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#F0B429" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" /></svg>
  ),
  user: (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#F0B429" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
  ),
  home: (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#F0B429" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
  ),
  users: (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#F0B429" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" /></svg>
  ),
  handshake: (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#F0B429" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="8" y1="13" x2="16" y2="13" /><line x1="8" y1="17" x2="13" y2="17" /></svg>
  ),
  clipboard: (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#F0B429" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2" /><rect x="8" y="2" width="8" height="4" rx="1" /><line x1="8" y1="10" x2="16" y2="10" /><line x1="8" y1="14" x2="16" y2="14" /><line x1="8" y1="18" x2="12" y2="18" /></svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#F0B429" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><line x1="9" y1="12" x2="15" y2="12" /></svg>
  ),
  truck: (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#F0B429" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13" rx="1" /><path d="M16 8h4l3 3v5h-7V8z" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg>
  ),
};

function Typewriter({ phrases }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const phrase = phrases[index];
    let timeout;
    if (!deleting && text === phrase) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && text === "") {
      setDeleting(false);
      setIndex((i) => (i + 1) % phrases.length);
    } else {
      const speed = deleting ? 30 : 60;
      timeout = setTimeout(() => {
        setText(deleting ? phrase.slice(0, text.length - 1) : phrase.slice(0, text.length + 1));
      }, speed);
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, index, phrases]);

  return (
    <span className="landing-typewriter" aria-label={phrases[index]}>
      {text}
      <span className="landing-cursor" aria-hidden="true">|</span>
    </span>
  );
}

const FEATURES = [
  {
    title: "Free Contract Templates",
    desc: "NDA, Employment, Freelancer, Rental, Partnership, Service, Consulting, Non-Compete, and Vendor Agreement templates ready to use.",
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#F0B429" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="8" y1="13" x2="16" y2="13" /><line x1="8" y1="17" x2="13" y2="17" /></svg>
    ),
  },
  {
    title: "Instant Contract Generator",
    desc: "Fill in your details, get a complete contract in 60 seconds. No sign-up needed.",
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#F0B429" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>
    ),
  },
  {
    title: "Clause Risk Checker",
    desc: "Paste any contract text to identify risky or missing clauses instantly.",
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#F0B429" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /><line x1="8" y1="11" x2="14" y2="11" /></svg>
    ),
  },
  {
    title: "AI Contract Review",
    desc: "Upload contracts for AI-powered clause-by-clause risk analysis with actionable suggestions.",
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#F0B429" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" /><line x1="8" y1="6" x2="16" y2="6" /><line x1="8" y1="10" x2="16" y2="10" /><line x1="8" y1="14" x2="12" y2="14" /><path d="M14 16l2 2 4-4" /></svg>
    ),
  },
  {
    title: "Indian Law Compliant",
    desc: "All templates drafted for Indian legal requirements — Indian Contract Act, stamp duty, and jurisdiction.",
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#F0B429" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
    ),
  },
  {
    title: "Share & Collaborate",
    desc: "Share contracts via WhatsApp or email. Send to your lawyer for review with one click.",
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#F0B429" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" /></svg>
    ),
  },
];

const INSTANT_TOOLS = [
  {
    to: "/templates",
    title: "Browse Templates",
    desc: "NDA, Employment, Rental & 6 more — free",
    icon: TEMPLATE_ICONS.handshake,
  },
  {
    to: "/generator",
    title: "Generate Contract",
    desc: "Fill details → get instant contract",
    icon: TEMPLATE_ICONS.briefcase,
  },
  {
    to: "/checker",
    title: "Check Clauses",
    desc: "Paste text → spot risky clauses",
    icon: TEMPLATE_ICONS.lock,
  },
];

const QUICK_START = [
  {
    slug: "nda",
    name: "Non-Disclosure Agreement",
    tagline: "Protect confidential information — India's most-used business contract",
    icon: "lock",
  },
  {
    slug: "service-agreement",
    name: "Service Agreement",
    tagline: "Define scope, SLAs, and payment terms for B2B engagements",
    icon: "handshake",
  },
  {
    slug: "employment",
    name: "Employment Contract",
    tagline: "Hire confidently with Indian labour law compliance built in",
    icon: "briefcase",
  },
];

function AnimatedCounter({ target, suffix = "+" }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect(); } },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const duration = 1500;
    const steps = 40;
    const increment = target / steps;
    let current = 0;
    const interval = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(interval);
  }, [started, target]);

  const formatted = count.toLocaleString("en-IN");
  return (
    <span ref={ref} className="landing-animated-counter">
      <strong>{formatted}{suffix}</strong>
    </span>
  );
}

const TESTIMONIALS = [
  { name: "Vikram R.", role: "Startup Founder, Bangalore", quote: "Generated an NDA in 2 minutes. Sent it to my lawyer — she said it covered all the bases. Saved us ₹5,000 in legal fees." },
  { name: "Anita P.", role: "HR Manager, Mumbai", quote: "We use DoAide for all our employment contracts now. The clause checker caught a missing IP assignment clause we'd been overlooking." },
  { name: "Rohit K.", role: "Freelance Designer, Delhi", quote: "Finally, a freelancer agreement template that actually covers Indian tax implications. I send it to every new client." },
];

const FAQ_ITEMS = [
  { q: "Are these contract templates legally valid in India?", a: "Yes. Our templates are drafted following Indian Contract Act, 1872 provisions and include standard legal clauses. However, for high-value or complex agreements, we recommend having a lawyer review the final document." },
  { q: "Do I need to register contracts in India?", a: "Not all contracts need registration. However, lease agreements over 11 months, sale deeds, and partnership deeds should be registered under the Registration Act, 1908. Stamp duty applies to most commercial agreements." },
  { q: "Is DoAide Contracts really free?", a: "Yes. Template browsing, contract generation, and clause checking are completely free with no sign-up required. Paid plans (from ₹399/month) add AI-powered contract review, e-signatures, and unlimited contract management." },
  { q: "Can I use these templates for my business?", a: "Absolutely. All templates are designed for Indian businesses and can be freely customized. We recommend reviewing the final document with legal counsel for mission-critical agreements." },
  { q: "What is a contract clause checker?", a: "Our clause checker analyzes your contract text to identify risky clauses (like unlimited liability or broad waivers) and flags missing standard clauses (like force majeure or dispute resolution). It's free and requires no sign-up." },
];

function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);
  return (
    <section className="landing-faq" aria-labelledby="faq-heading">
      <h2 id="faq-heading" className="landing-section-title">Frequently Asked Questions</h2>
      <dl className="landing-faq-list">
        {FAQ_ITEMS.map((item, i) => (
          <div key={i} className="landing-faq-item">
            <dt>
              <button className="landing-faq-q" aria-expanded={openIndex === i} onClick={() => setOpenIndex(openIndex === i ? null : i)}>
                {item.q}
                <span className="landing-faq-chevron" aria-hidden="true">{openIndex === i ? "−" : "+"}</span>
              </button>
            </dt>
            {openIndex === i && <dd className="landing-faq-a">{item.a}</dd>}
          </div>
        ))}
      </dl>
    </section>
  );
}

function ReferralBanner() {
  const [copied, setCopied] = useState(false);
  const url = fullUrl("/?ref=invite");
  const handleCopy = async () => {
    const ok = await copyToClipboard(url);
    if (ok) { setCopied(true); setTimeout(() => setCopied(false), 2000); }
  };
  return (
    <section className="landing-referral">
      <h2>Share with Your Lawyer or CA</h2>
      <p>Share DoAide Contracts with your legal team — they can review and generate contracts in one place.</p>
      <div className="landing-referral-actions">
        <a
          href={`https://wa.me/?text=${encodeURIComponent("Check out DoAide Contracts — free contract templates and generator for Indian businesses: " + url)}`}
          target="_blank" rel="noopener noreferrer" className="btn btn-primary"
        >
          Share on WhatsApp
        </a>
        <button onClick={handleCopy} className="btn landing-copy-btn">
          {copied ? "Link copied!" : "Copy invite link"}
        </button>
      </div>
    </section>
  );
}

export default function LandingPage() {
  usePageTitle("Free Contract Templates & Generator for Indian Businesses");
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  useEffect(() => { requestAnimationFrame(() => setVisible(true)); }, []);
  const vis = visible ? "landing-visible" : "";

  return (
    <div className="landing-root">
      <header className={`landing-header ${vis}`}>
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
        <div style={{ marginLeft: "auto", display: "flex", gap: "0.75rem", alignItems: "center" }}>
          <Link to="/pricing" className="landing-header-link">Pricing</Link>
          <ThemeToggle />
        </div>
      </header>

      <main>
        <section className="landing-instant">
          <h1 className="landing-hero-headline">Generate a Free Contract in 60 Seconds</h1>
          <div className="landing-typewriter-wrap">
            <Typewriter phrases={PHRASES} />
          </div>
          <div className="landing-hero-cta">
            <Link to="/generator" className="btn btn-primary btn-lg">Generate Free Contract</Link>
            <Link to="/checker" className="btn btn-ghost btn-lg">Check a Contract</Link>
          </div>
          <p className="landing-instant-stat">
            Used by <AnimatedCounter target={8500} /> businesses across India
            <span className="landing-stat-sub">and growing</span>
          </p>
          <div className="landing-tool-cards">
            {INSTANT_TOOLS.map((t) => (
              <Link key={t.to} to={t.to} className="landing-tool-card">
                <div className="landing-tool-icon">{t.icon}</div>
                <strong>{t.title}</strong>
                <span>{t.desc}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="landing-section" aria-labelledby="quickstart-heading">
          <h2 id="quickstart-heading" className="landing-section-title">Quick Start — Most Popular Contracts</h2>
          <div className="landing-quickstart-grid">
            {QUICK_START.map((qs) => (
              <div key={qs.slug} className="landing-quickstart-card">
                <div className="landing-feature-icon">{TEMPLATE_ICONS[qs.icon]}</div>
                <h3>{qs.name}</h3>
                <p>{qs.tagline}</p>
                <div className="landing-qs-actions">
                  <Link to={`/generator?template=${qs.slug}`} className="btn btn-primary">Generate Now →</Link>
                  <Link to={`/template/${qs.slug}`} className="btn btn-ghost">Preview →</Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="landing-section" aria-labelledby="templates-heading">
          <h2 id="templates-heading" className="landing-section-title">Free Contract Templates</h2>
          <div className="landing-features-grid">
            {TEMPLATES.slice(0, 6).map((t) => (
              <Link key={t.slug} to={`/template/${t.slug}`} className="landing-feature-card" style={{ textDecoration: "none", color: "inherit" }}>
                <div className="landing-feature-icon">{TEMPLATE_ICONS[t.icon] || TEMPLATE_ICONS.handshake}</div>
                <h3>{t.name}</h3>
                <p>{t.description}</p>
              </Link>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "1rem" }}>
            <Link to="/templates" className="landing-pricing-link">View all templates →</Link>
          </div>
        </section>

        <div className={`landing-split ${vis}`}>
          <div className="landing-left">
            <h2 className="landing-headline" style={{ fontSize: "clamp(24px, 3.5vw, 40px)" }}>
              Need AI-Powered Contract Review?
            </h2>
            <p className="landing-subtitle">
              Upload any contract for clause-by-clause risk analysis. Get actionable suggestions,
              risk scores, and plain-English explanations — powered by AI.
            </p>
            <div className="landing-features">
              <div className="landing-feature">
                <strong>Free</strong>
                <span>3 reviews/month</span>
              </div>
              <div className="landing-feature">
                <strong>Pro — ₹399/mo</strong>
                <span>Unlimited reviews</span>
              </div>
              <div className="landing-feature">
                <strong>Enterprise — ₹1,499/mo</strong>
                <span>Team + API</span>
              </div>
            </div>
            <Link to="/pricing" className="landing-pricing-link">View all plans →</Link>
          </div>
          <div className="landing-right">
            <AuthForm />
          </div>
        </div>

        <section className="landing-section" aria-labelledby="features-heading">
          <h2 id="features-heading" className="landing-section-title">Everything You Need for Contract Management</h2>
          <div className="landing-features-grid">
            {FEATURES.map((f) => (
              <div key={f.title} className="landing-feature-card">
                <div className="landing-feature-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="landing-section" aria-labelledby="testimonials-heading">
          <h2 id="testimonials-heading" className="landing-section-title">Trusted by Indian Businesses</h2>
          <div className="landing-testimonials">
            {TESTIMONIALS.map((t) => (
              <blockquote key={t.name} className="landing-testimonial">
                <p>&ldquo;{t.quote}&rdquo;</p>
                <footer>
                  <strong>{t.name}</strong>
                  <span>{t.role}</span>
                </footer>
              </blockquote>
            ))}
          </div>
        </section>

        <FaqSection />
        <ReferralBanner />

        <section className="landing-cta">
          <h2>Start Creating Contracts in Minutes</h2>
          <p>Free templates, instant generation, and clause checking — no credit card required.</p>
          <Link to="/generator" className="btn btn-primary landing-cta-btn">
            Generate Free Contract
          </Link>
        </section>
      </main>

      <footer className="landing-footer">
        <div className="landing-footer-nav">
          <div className="landing-footer-col">
            <h4>Free Tools</h4>
            <Link to="/templates">Contract Templates</Link>
            <Link to="/generator">Contract Generator</Link>
            <Link to="/checker">Clause Checker</Link>
            <Link to="/tools/risk-analyzer">Risk Analyzer</Link>
            <Link to="/tools/stamp-duty-calculator">Stamp Duty Calculator</Link>
            <Link to="/tools/clause-library">Clause Library</Link>
            <Link to="/embed">Embed Widget</Link>
          </div>
          <div className="landing-footer-col">
            <h4>Templates</h4>
            <Link to="/template/nda">NDA</Link>
            <Link to="/template/employment">Employment</Link>
            <Link to="/template/rental">Rental</Link>
            <Link to="/template/freelancer">Freelancer</Link>
            <Link to="/template/consulting-agreement">Consulting</Link>
            <Link to="/template/vendor-agreement">Vendor</Link>
            <Link to="/template/non-compete">Non-Compete</Link>
          </div>
          <div className="landing-footer-col">
            <h4>Resources</h4>
            <Link to="/blog">Blog</Link>
            <Link to="/blog/free-nda-template-india-2026">NDA Guide</Link>
            <Link to="/blog/employment-contract-checklist">Employment Checklist</Link>
            <Link to="/blog/freelancer-agreement-guide">Freelancer Guide</Link>
            <Link to="/blog/consulting-agreement-guide">Consulting Guide</Link>
            <Link to="/blog/stamp-duty-guide-india">Stamp Duty Guide</Link>
          </div>
          <div className="landing-footer-col">
            <h4>Product</h4>
            <Link to="/pricing">Pricing</Link>
            <a href="mailto:contracts@doaide.com">Contact</a>
            <a href="https://doaide.com">About DoAide</a>
          </div>
        </div>
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
          <span className="landing-footer-copy">&copy; {new Date().getFullYear()} DoAide</span>
        </div>
      </footer>
    </div>
  );
}
