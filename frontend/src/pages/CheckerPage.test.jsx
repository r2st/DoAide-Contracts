import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import CheckerPage from "./CheckerPage";

vi.mock("../hooks/usePageTitle", () => ({ usePageTitle: () => {} }));
vi.mock("../lib/share", () => ({
  fullUrl: (p) => `http://localhost${p}`,
  whatsappUrl: (t, u) => `https://wa.me/?text=${encodeURIComponent(`${t} ${u}`)}`,
  twitterUrl: (t, u) => `https://twitter.com/intent/tweet?text=${encodeURIComponent(t)}`,
  copyToClipboard: vi.fn(),
}));

function renderPage() {
  return render(
    <MemoryRouter>
      <CheckerPage />
    </MemoryRouter>,
  );
}

describe("CheckerPage", () => {
  it("shows page title", () => {
    renderPage();
    expect(screen.getByText("Contract Clause Checker")).toBeInTheDocument();
  });

  it("has a textarea for contract text", () => {
    renderPage();
    expect(screen.getByLabelText("Contract text to check")).toBeInTheDocument();
  });

  it("disables check button when textarea is empty", () => {
    renderPage();
    expect(screen.getByText("Check Contract")).toBeDisabled();
  });

  it("enables check button when text is entered", async () => {
    renderPage();
    await userEvent.type(screen.getByLabelText("Contract text to check"), "Some contract text");
    expect(screen.getByText("Check Contract")).not.toBeDisabled();
  });

  it("shows results after checking", async () => {
    renderPage();
    await userEvent.type(
      screen.getByLabelText("Contract text to check"),
      "This contract includes unlimited liability and the party waives all rights.",
    );
    await userEvent.click(screen.getByText("Check Contract"));
    expect(screen.getByText("High Risk")).toBeInTheDocument();
    expect(screen.getByText("Issues Found")).toBeInTheDocument();
  });

  it("detects missing clauses", async () => {
    renderPage();
    await userEvent.type(
      screen.getByLabelText("Contract text to check"),
      "This is a simple contract between two parties.",
    );
    await userEvent.click(screen.getByText("Check Contract"));
    expect(screen.getAllByText("Missing Clauses").length).toBeGreaterThan(0);
  });

  it("shows character count", async () => {
    renderPage();
    await userEvent.type(screen.getByLabelText("Contract text to check"), "Hello");
    expect(screen.getByText("5 characters")).toBeInTheDocument();
  });

  it("clears results on clear button", async () => {
    renderPage();
    await userEvent.type(screen.getByLabelText("Contract text to check"), "unlimited liability");
    await userEvent.click(screen.getByText("Check Contract"));
    expect(screen.getByText("Issues Found")).toBeInTheDocument();

    await userEvent.click(screen.getByText("Clear"));
    expect(screen.queryByText("Issues Found")).not.toBeInTheDocument();
  });

  it("detects auto-renewal clause", async () => {
    renderPage();
    await userEvent.type(
      screen.getByLabelText("Contract text to check"),
      "This agreement includes an auto-renewal clause with termination and confidentiality and governing law jurisdiction.",
    );
    await userEvent.click(screen.getByText("Check Contract"));
    expect(screen.getByText(/Auto-renewal/)).toBeInTheDocument();
  });
});
