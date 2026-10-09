import { useState } from "react";

const API_BASE = import.meta.env.VITE_API_URL || "";

export default function FeedbackWidget() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!message.trim()) return;
    setStatus("sending");
    try {
      const res = await fetch(`${API_BASE}/api/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: message.trim() }),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
      setMessage("");
      setTimeout(() => {
        setOpen(false);
        setStatus("idle");
      }, 1500);
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Send feedback"
        style={{
          position: "fixed",
          bottom: 16,
          left: 16,
          zIndex: 9999,
          padding: "8px 16px",
          background: "#b8860b",
          color: "#fff",
          border: "none",
          borderRadius: 8,
          cursor: "pointer",
          fontSize: 14,
          fontWeight: 600,
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        }}
      >
        Feedback
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Feedback form"
          onClick={(e) => e.target === e.currentTarget && setOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 10000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0,0,0,0.4)",
          }}
        >
          <form
            onSubmit={handleSubmit}
            style={{
              background: "#fff",
              borderRadius: 12,
              padding: 24,
              width: "90%",
              maxWidth: 420,
              boxShadow: "0 4px 24px rgba(0,0,0,0.2)",
            }}
          >
            <h3 style={{ margin: "0 0 12px", fontSize: 18, color: "#1a1a1a" }}>
              Send Feedback
            </h3>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="What's on your mind?"
              rows={4}
              required
              style={{
                width: "100%",
                padding: 10,
                border: "1px solid #ccc",
                borderRadius: 8,
                fontSize: 14,
                resize: "vertical",
                boxSizing: "border-box",
              }}
            />
            <div style={{ display: "flex", gap: 8, marginTop: 12, justifyContent: "flex-end" }}>
              <button
                type="button"
                onClick={() => setOpen(false)}
                style={{
                  padding: "8px 16px",
                  background: "#eee",
                  border: "none",
                  borderRadius: 8,
                  cursor: "pointer",
                  fontSize: 14,
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={status === "sending"}
                style={{
                  padding: "8px 16px",
                  background: "#b8860b",
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  cursor: "pointer",
                  fontSize: 14,
                  fontWeight: 600,
                }}
              >
                {status === "sending" ? "Sending…" : status === "sent" ? "Sent!" : "Submit"}
              </button>
            </div>
            {status === "error" && (
              <p style={{ color: "red", fontSize: 13, marginTop: 8 }}>
                Failed to send. Please try again.
              </p>
            )}
          </form>
        </div>
      )}
    </>
  );
}
