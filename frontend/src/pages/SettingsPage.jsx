import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { usePageTitle } from "../hooks/usePageTitle";
import { useAuth } from "../hooks/useAuth";
import { api, isAbortError } from "../lib/api";
import UsageMeter from "../components/UsageMeter";
import ErrorBanner from "../components/ErrorBanner";

const PLAN_LIMITS = {
  free: { reviews: 3, generations: 2 },
  pro: { reviews: -1, generations: -1 },
  enterprise: { reviews: -1, generations: -1 },
};

export default function SettingsPage() {
  usePageTitle("Settings");
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [busy, setBusy] = useState(false);
  const [usage, setUsage] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    const ctrl = new AbortController();
    api.usage({ signal: ctrl.signal })
      .then(setUsage)
      .catch((e) => { if (!isAbortError(e)) setError(e.message); });
    api.getSubscription({ signal: ctrl.signal })
      .then(setSubscription)
      .catch(() => {});
    return () => ctrl.abort();
  }, []);

  async function handleSave(e) {
    e.preventDefault();
    setError(""); setSuccess("");
    setBusy(true);
    try {
      await api.updateProfile({ name });
      setSuccess("Profile updated.");
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  async function handleCancel() {
    if (!confirm("Are you sure you want to cancel your subscription? You will be downgraded to the Free plan.")) return;
    setCancelling(true);
    setError("");
    try {
      await api.cancelSubscription();
      setSuccess("Subscription cancelled. You are now on the Free plan.");
      setSubscription(null);
      window.location.reload();
    } catch (err) {
      setError(err.message);
    } finally {
      setCancelling(false);
    }
  }

  const plan = user?.plan || "free";
  const limits = PLAN_LIMITS[plan] || PLAN_LIMITS.free;

  return (
    <>
      <div className="page-head">
        <h1>Settings</h1>
      </div>

      <ErrorBanner message={error} onDismiss={() => setError("")} />
      {success && (
        <div className="banner" style={{ background: "var(--good-bg)", color: "var(--good)" }}>
          {success}
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
        <div className="panel">
          <h2>Profile</h2>
          <form onSubmit={handleSave} style={{ display: "grid", gap: "0.75rem" }}>
            <label style={{ display: "grid", gap: "0.25rem" }}>
              <span>Email</span>
              <input type="email" value={user?.email || ""} disabled />
            </label>
            <label style={{ display: "grid", gap: "0.25rem" }}>
              <span>Name</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <button type="submit" className="btn btn-primary" disabled={busy}>
              {busy ? "Saving…" : "Save changes"}
            </button>
          </form>
        </div>

        <div className="panel">
          <h2>Plan & Usage</h2>
          <div style={{ marginBottom: "1rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontWeight: 600, textTransform: "capitalize" }}>{plan} plan</span>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                {plan === "free" && (
                  <Link to="/pricing" className="btn btn-primary" style={{ fontSize: "0.85rem", padding: "0.3rem 0.7rem" }}>
                    Upgrade
                  </Link>
                )}
                {plan !== "free" && subscription?.status === "active" && (
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="btn btn-ghost"
                    style={{ fontSize: "0.85rem", padding: "0.3rem 0.7rem", color: "var(--danger)" }}
                    disabled={cancelling}
                  >
                    {cancelling ? "Cancelling…" : "Cancel subscription"}
                  </button>
                )}
              </div>
            </div>
          </div>
          {usage && (
            <div style={{ display: "grid", gap: "1rem" }}>
              <UsageMeter
                label="Contract reviews this month"
                used={usage.reviews_used ?? 0}
                limit={limits.reviews}
              />
              <UsageMeter
                label="Contracts generated this month"
                used={usage.generations_used ?? 0}
                limit={limits.generations}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
