import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi, beforeEach } from "vitest";
import RiskAnalyzerPage from "./RiskAnalyzerPage";

function renderPage() {
  return render(
    <MemoryRouter>
      <RiskAnalyzerPage />
    </MemoryRouter>,
  );
}

describe("RiskAnalyzerPage", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("renders the page title and textarea", () => {
    renderPage();
    expect(screen.getByText("Contract Risk Analyzer")).toBeInTheDocument();
    expect(screen.getByLabelText("Contract text to analyze")).toBeInTheDocument();
  });

  it("shows the analyze button disabled when textarea is empty", () => {
    renderPage();
    const btn = screen.getByRole("button", { name: /analyze contract risk/i });
    expect(btn).toBeDisabled();
  });

  it("enables the button when text is entered", async () => {
    const user = userEvent.setup();
    renderPage();
    const textarea = screen.getByLabelText("Contract text to analyze");
    await user.type(textarea, "This is a sample contract text with more than fifty characters for testing purposes.");
    const btn = screen.getByRole("button", { name: /analyze contract risk/i });
    expect(btn).not.toBeDisabled();
  });

  it("shows error for text too short", async () => {
    const user = userEvent.setup();
    renderPage();
    const textarea = screen.getByLabelText("Contract text to analyze");
    await user.type(textarea, "Short text");
    const btn = screen.getByRole("button", { name: /analyze contract risk/i });
    await user.click(btn);
    expect(screen.getByText(/at least 50 characters/i)).toBeInTheDocument();
  });

  it("calls the API and displays results on success", async () => {
    const mockResult = {
      overall_risk: "medium",
      risk_score: 55,
      summary: "The contract has moderate risk.",
      risky_clauses: [
        { clause: "Unlimited liability", risk_level: "high", issue: "No cap on liability", suggestion: "Add a cap" },
      ],
      missing_clauses: [
        { clause: "Force majeure", importance: "critical", reason: "Needed for protection" },
      ],
      indian_law_notes: ["Section 73 of Indian Contract Act applies."],
    };

    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResult),
    });

    const user = userEvent.setup();
    renderPage();
    const textarea = screen.getByLabelText("Contract text to analyze");
    await user.type(textarea, "This is a sample contract text with more than fifty characters for testing the risk analyzer feature thoroughly.");
    const btn = screen.getByRole("button", { name: /analyze contract risk/i });
    await user.click(btn);

    expect(await screen.findByText("The contract has moderate risk.")).toBeInTheDocument();
    expect(screen.getByText("Unlimited liability")).toBeInTheDocument();
    expect(screen.getByText("Force majeure")).toBeInTheDocument();
    expect(screen.getByText("Section 73 of Indian Contract Act applies.")).toBeInTheDocument();
  });

  it("shows error when API call fails", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
      ok: false,
      status: 502,
      json: () => Promise.resolve({ detail: "AI analysis failed." }),
    });

    const user = userEvent.setup();
    renderPage();
    const textarea = screen.getByLabelText("Contract text to analyze");
    await user.type(textarea, "This is a sample contract text with more than fifty characters for testing the error handling path.");
    const btn = screen.getByRole("button", { name: /analyze contract risk/i });
    await user.click(btn);

    expect(await screen.findByText(/AI analysis failed/i)).toBeInTheDocument();
  });
});
