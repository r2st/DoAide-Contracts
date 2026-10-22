import { useEffect, useState } from "react";

export const ONBOARDING_KEY = "doaide_contracts_onboarded";

const STEPS = [
  { title: "Pick a template", text: "NDA, rental, employment, freelancer and more — all drafted for Indian law." },
  { title: "Fill in the blanks", text: "Names, dates and amounts. Nothing is uploaded; your details stay in this browser." },
  { title: "Send it", text: "Share the finished contract on WhatsApp, download it, or print / save as PDF. No account needed." },
];

function readSeen() {
  try {
    return window.localStorage.getItem(ONBOARDING_KEY) === "1";
  } catch {
    return false;
  }
}

function markSeen() {
  try {
    window.localStorage.setItem(ONBOARDING_KEY, "1");
  } catch {
    // Private mode or blocked storage: the guide just shows again next time.
  }
}

export default function OnboardingGuide() {
  const [open, setOpen] = useState(false);

  // Decide after mount so prerendered HTML never contains the guide.
  useEffect(() => {
    if (!readSeen()) setOpen(true);
  }, []);

  function close() {
    markSeen();
    setOpen(false);
  }

  if (!open) {
    return (
      <button type="button" className="onboarding-reopen" onClick={() => setOpen(true)}>
        How it works
      </button>
    );
  }

  return (
    <section className="onboarding-guide" aria-labelledby="onboarding-title">
      <div className="onboarding-head">
        <h2 id="onboarding-title">New here? Your contract in 3 steps</h2>
        <button type="button" className="onboarding-close" onClick={close} aria-label="Close guide">
          ×
        </button>
      </div>
      <ol className="onboarding-steps">
        {STEPS.map((s, i) => (
          <li key={s.title}>
            <span className="onboarding-num" aria-hidden="true">{i + 1}</span>
            <div>
              <strong>{s.title}</strong>
              <p>{s.text}</p>
            </div>
          </li>
        ))}
      </ol>
      <p className="onboarding-tip">
        Tip: for high-value deals, have a lawyer read the final draft and print it on the right stamp paper.
      </p>
      <button type="button" className="btn btn-primary" onClick={close}>
        Got it, let&apos;s start
      </button>
    </section>
  );
}
