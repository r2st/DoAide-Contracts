import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import ReadabilityScorerPage from "./ReadabilityScorerPage";

vi.mock("../hooks/usePageTitle", () => ({ usePageTitle: () => {} }));
vi.mock("../lib/share", () => ({
  fullUrl: (p) => `http://localhost${p}`,
  whatsappUrl: (t, u) => `https://wa.me/?text=${encodeURIComponent(`${t} ${u}`)}`,
  twitterUrl: (t, u) => `https://twitter.com/intent/tweet?text=${encodeURIComponent(t)}`,
  copyToClipboard: vi.fn(),
}));

describe("ReadabilityScorerPage", () => {
  it("renders the page title", () => {
    render(<MemoryRouter><ReadabilityScorerPage /></MemoryRouter>);
    expect(screen.getByText("Contract Readability Scorer")).toBeInTheDocument();
  });

  it("loads sample text on button click", () => {
    render(<MemoryRouter><ReadabilityScorerPage /></MemoryRouter>);
    fireEvent.click(screen.getByText("Try sample text"));
    expect(screen.getByText("Readability")).toBeInTheDocument();
  });

  it("detects legal jargon in sample text", () => {
    render(<MemoryRouter><ReadabilityScorerPage /></MemoryRouter>);
    fireEvent.click(screen.getByText("Try sample text"));
    expect(screen.getByText(/Legal Jargon Found/)).toBeInTheDocument();
  });
});
