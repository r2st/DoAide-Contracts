import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { usePageTitle } from "../hooks/usePageTitle";
import { useAuth } from "../hooks/useAuth";
import ThemeToggle from "../components/ThemeToggle";
import { api } from "../lib/api";

const PLANS = [
  {
    key: "free",
    name: "Free",
    price: "₹0",
    priceNum: 0,
    period: "forever",
    cta: "Get started",
    highlight: false,
    features: [
      "3 contracts/month",
      "Basic templates",
      "PDF risk reports",
      "Email support",
    ],
  },
  {
    key: "pro",
    name: "Pro",
    price: "₹399",
    priceNum: 399,
    period: "/month",
    cta: "Subscribe",
    highlight: true,
    features: [
      "Unlimited contracts",
      "E-signatures",
      "Custom templates",
      "Export to PDF/Word",
      "Version comparison",
      "Priority support",
    ],
  },
  {
    key: "enterprise",
    name: "Enterprise",
    price: "₹1,499",
    priceNum: 1499,
    period: "/month",
    cta: "Subscribe",
    highlight: false,
    features: [
      "Everything in Pro",
      "API access",
      "Team collaboration",
      "Audit trail",
      "Compliance reporting",
      "Dedicated support",
    ],
  },
];

function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (document.getElementById("razorpay-script")) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.id = "razorpay-script";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function PricingPage() {
  usePageTitle("Pricing");
  const { user } = useAuth();
  const navigate = useNavigate();
  const [busy, setBusy] = useState(null);
  const [error, setError] = useState("");

  async function handleSubscribe(planKey) {
    if (!user) {
      navigate("/register");
      return;
    }

    if (user.plan === planKey) return;

    if (planKey === "free") {
      navigate("/settings");
      return;
    }

    setError("");
    setBusy(planKey);

    try {
      const loaded = await loadRazorpayScript();
      if (!loaded) {
        setError("Failed to load payment gateway. Please try again.");
        setBusy(null);
        return;
      }

      const sub = await api.createSubscription(planKey);

      const options = {
        key: sub.razorpay_key_id,
        subscription_id: sub.subscription_id,
        name: "DoAide Contracts",
        description: `${planKey === "pro" ? "Pro" : "Enterprise"} Plan`,
        handler: async function (response) {
          try {
            await api.verifyPayment({
              razorpay_subscription_id: response.razorpay_subscription_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            navigate("/settings");
            window.location.reload();
          } catch (err) {
            setError(err.message || "Payment verification failed.");
          } finally {
            setBusy(null);
          }
        },
        prefill: {
          email: user.email,
          name: user.name,
        },
        theme: {
          color: "#2563eb",
        },
        modal: {
          ondismiss: () => setBusy(null),
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      setError(err.message || "Could not start payment.");
      setBusy(null);
    }
  }

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

        {error && (
          <div className="banner" style={{ background: "var(--danger-bg)", color: "var(--danger)", marginBottom: "1.5rem", textAlign: "center" }}>
            {error}
          </div>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
          {PLANS.map((plan) => {
            const isCurrent = user?.plan === plan.key;

            return (
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
                {isCurrent ? (
                  <span
                    className="btn btn-ghost"
                    style={{ display: "block", textAlign: "center", opacity: 0.6, cursor: "default" }}
                  >
                    Current plan
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleSubscribe(plan.key)}
                    className={`btn ${plan.highlight ? "btn-primary" : "btn-ghost"}`}
                    style={{ display: "block", textAlign: "center", width: "100%" }}
                    disabled={busy !== null}
                  >
                    {busy === plan.key ? "Processing…" : plan.cta}
                  </button>
                )}
              </div>
            );
          })}
        </div>

        <div style={{ textAlign: "center", marginTop: "3rem", color: "var(--ink-soft)", fontSize: "0.88rem" }}>
          <p>All prices in INR. GST applicable. Cancel anytime.</p>
          <p>Need a custom plan? <a href="mailto:contracts@doaide.com">Contact us</a></p>
        </div>
      </div>
    </div>
  );
}
