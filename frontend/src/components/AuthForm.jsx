import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import ErrorBanner from "./ErrorBanner";

const EMPTY = { email: "", password: "", name: "" };

export default function AuthForm({ defaultMode = "register" }) {
  const [mode, setMode] = useState(defaultMode);
  const [form, setForm] = useState(EMPTY);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  const { login, register } = useAuth();
  const navigate = useNavigate();
  const registering = mode === "register";

  function switchTo(next) {
    setMode(next);
    setError("");
    setFieldErrors({});
  }

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setFieldErrors({});

    const problems = {};
    if (!form.email.trim()) problems.email = "Enter your email.";
    if (!form.password) problems.password = "Enter your password.";
    if (registering && form.password.length < 8) problems.password = "At least 8 characters.";
    if (Object.keys(problems).length > 0) {
      setFieldErrors(problems);
      return;
    }

    setBusy(true);
    try {
      if (registering) {
        await register({
          email: form.email,
          password: form.password,
          name: form.name || null,
        });
      } else {
        await login(form.email, form.password);
      }
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="auth-card">
      <div className="auth-tabs" role="tablist">
        <button
          type="button"
          role="tab"
          className={`auth-tab ${!registering ? "is-active" : ""}`}
          aria-selected={!registering}
          onClick={() => switchTo("login")}
        >
          Sign in
        </button>
        <button
          type="button"
          role="tab"
          className={`auth-tab ${registering ? "is-active" : ""}`}
          aria-selected={registering}
          onClick={() => switchTo("register")}
        >
          Create account
        </button>
      </div>

      <ErrorBanner message={error} onDismiss={() => setError("")} />

      <form onSubmit={handleSubmit} className="auth-form" noValidate>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          value={form.email}
          aria-invalid={fieldErrors.email ? true : undefined}
          aria-describedby={fieldErrors.email ? "email-error" : undefined}
          onChange={(e) => update("email", e.target.value)}
        />
        {fieldErrors.email && (
          <p className="field-error" id="email-error" role="alert">{fieldErrors.email}</p>
        )}

        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          required
          minLength={registering ? 8 : undefined}
          autoComplete={registering ? "new-password" : "current-password"}
          value={form.password}
          aria-invalid={fieldErrors.password ? true : undefined}
          aria-describedby={fieldErrors.password ? "password-error" : undefined}
          onChange={(e) => update("password", e.target.value)}
        />
        {fieldErrors.password ? (
          <p className="field-error" id="password-error" role="alert">{fieldErrors.password}</p>
        ) : (
          registering && <p className="field-hint">At least 8 characters.</p>
        )}

        {registering && (
          <>
            <label htmlFor="full_name">Your name (optional)</label>
            <input
              id="full_name"
              name="name"
              autoComplete="name"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
            />
          </>
        )}

        <button type="submit" className="auth-submit" disabled={busy}>
          {busy ? "Please wait…" : registering ? "Create account" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
