import { Link } from "react-router-dom";
import { usePageTitle } from "../hooks/usePageTitle";
import ThemeToggle from "../components/ThemeToggle";

const PLANS = [
  {
    name: "Free",
    price: "₹0",
    period: "forever",
    cta: "Get started",
    highlight: false,
    features: [
      "3 contract reviews / month",
      "2 contract generations / month",
      "10+ Indian-specific templates",
      "PDF risk reports",
      "Email support",
    ],
  },
  {
    name: "Pro",
    price: "₹2,399",
    period: "/month",
    cta: "Start free trial",
    highlight: true,
    features: [
      "Unlimited contract reviews",
      "20 contract generations / month",
      "Custom templates",
      "Version comparison",
      "Hindi language support",
      "DoAide Desk & Realty integration",
      "Priority email support",
    ],
  },
  {
    name: "Business",
    price: "₹8,199",
    period: "/month",
    cta: "Contact sales",
    highlight: false,
    features: [
      "Everything in Pro",
      "Unlimited generations",
      "API access",
      "Up to 10 team members",
      "White-label branding",
      "Email + chat support",
      "Custom integrations",
    ],
  },
];

export default function PricingPage() {
  usePageTitle("Pricing");

  return (
    <div style={{ minHeight: "100vh", background: "var(--canvas)", padding: "2rem 1.5rem" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <span style={{ fontFamily: "var(--doaide-font-display)", fontSize: 24, color: "var(--ink-strong)" }}>
              DoAide <span style={{ fontStyle: "italic", color: "var(--brand)" }}>Contracts</span>
            </span>
          </Link>
          <ThemeToggle />
        </div>

        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h1 style={{ fontFamily: "var(--doaide-font-display)", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 400, margin: "0 0 12px" }}>
            Simple, transparent pricing
          </h1>
          <p style={{ color: "var(--ink-soft)", fontSize: "1rem", maxWidth: 500, margin: "0 auto" }}>
            Start for free. Upgrade when you need unlimited reviews and advanced features.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className="panel"
              style={{
                borderColor: plan.highlight ? "var(--brand)" : undefined,
                borderWidth: plan.highlight ? 2 : undefined,
                position: "relative",
              }}
            >
              {plan.highlight && (
                <div style={{
                  position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)",
                  background: "var(--brand)", color: "var(--brand-text)",
                  padding: "2px 12px", borderRadius: 999, fontSize: "0.75rem", fontWeight: 700,
                }}>
                  Most popular
                </div>
              )}
              <h2 style={{ margin: "0 0 0.5rem" }}>{plan.name}</h2>
              <div style={{ display: "flex", alignItems: "baseline", gap: "0.25rem", marginBottom: "1rem" }}>
                <span style={{ fontSize: "2rem", fontWeight: 700, color: "var(--ink-strong)" }}>{plan.price}</span>
                <span style={{ color: "var(--ink-soft)", fontSize: "0.9rem" }}>{plan.period}</span>
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1.5rem" }}>
                {plan.features.map((f) => (
                  <li key={f} style={{ padding: "0.35rem 0", fontSize: "0.9rem", color: "var(--ink)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <span style={{ color: "var(--good)", fontWeight: 700 }}>✓</span> {f}
                  </li>
                ))}
              </ul>
              <Link
                to="/register"
                className={`btn ${plan.highlight ? "btn-primary" : "btn-ghost"}`}
                style={{ display: "block", textAlign: "center" }}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "3rem", color: "var(--ink-soft)", fontSize: "0.88rem" }}>
          <p>All prices in INR. GST applicable. Cancel anytime.</p>
          <p>Need a custom plan? <a href="mailto:contracts@doaide.com">Contact us</a></p>
        </div>
      </div>
    </div>
  );
}
