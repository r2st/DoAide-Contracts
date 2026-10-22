import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import ContractComparisonPage, { diffLines } from "./ContractComparisonPage";

vi.mock("../hooks/usePageTitle", () => ({ usePageTitle: () => {} }));
vi.mock("../lib/share", () => ({
  fullUrl: (p) => `http://localhost${p}`,
  whatsappUrl: (t, u) => `https://wa.me/?text=${encodeURIComponent(`${t} ${u}`)}`,
  twitterUrl: (t, u) => `https://twitter.com/intent/tweet?text=${encodeURIComponent(t)}`,
  copyToClipboard: vi.fn(),
}));

describe("diffLines", () => {
  it("marks identical texts as 100% similar", () => {
    const result = diffLines("1. TERM\nTwelve months.", "1. TERM\nTwelve months.");
    expect(result.similarity).toBe(100);
    expect(result.added).toBe(0);
    expect(result.removed).toBe(0);
    expect(result.changed).toBe(0);
  });

  it("ignores whitespace-only differences", () => {
    const result = diffLines("The  fee is   Rs. 50,000.", "The fee is Rs. 50,000.");
    expect(result.similarity).toBe(100);
  });

  it("pairs a removal followed by an addition as one changed line", () => {
    const result = diffLines("Notice period is 30 days.", "Notice period is 60 days.");
    expect(result.changed).toBe(1);
    expect(result.added).toBe(0);
    expect(result.removed).toBe(0);
  });

  it("counts a clause only present in the revision as added", () => {
    const a = "1. TERM\n2. FEES";
    const b = "1. TERM\n2. FEES\n3. CONFIDENTIALITY";
    const result = diffLines(a, b);
    expect(result.added).toBe(1);
    expect(result.removed).toBe(0);
    expect(result.rows.find((r) => r.type === "added").b).toBe("3. CONFIDENTIALITY");
  });

  it("counts a clause only present in the original as removed", () => {
    const result = diffLines("1. TERM\n2. NON-COMPETE", "1. TERM");
    expect(result.removed).toBe(1);
    expect(result.rows.find((r) => r.type === "removed").a).toBe("2. NON-COMPETE");
  });
});

describe("ContractComparisonPage", () => {
  it("renders the page title", () => {
    render(<MemoryRouter><ContractComparisonPage /></MemoryRouter>);
    expect(screen.getByText("Contract Comparison Tool")).toBeInTheDocument();
  });

  it("shows nothing until both sides have text", () => {
    render(<MemoryRouter><ContractComparisonPage /></MemoryRouter>);
    fireEvent.change(screen.getByPlaceholderText(/original contract text/i), {
      target: { value: "1. TERM" },
    });
    expect(screen.queryByText("Similarity")).not.toBeInTheDocument();
  });

  it("compares the sample contracts on button click", () => {
    render(<MemoryRouter><ContractComparisonPage /></MemoryRouter>);
    fireEvent.click(screen.getByText("Try sample contracts"));
    expect(screen.getByText("Similarity")).toBeInTheDocument();
    // The sample revision adds a confidentiality clause and reworded terms.
    expect(screen.getByText(/Changes \(/)).toBeInTheDocument();
    expect(screen.getAllByText(/confidential/i).length).toBeGreaterThan(0);
  });

  it("filters unchanged lines with the show-only-changes toggle", () => {
    render(<MemoryRouter><ContractComparisonPage /></MemoryRouter>);
    fireEvent.click(screen.getByText("Try sample contracts"));
    expect(screen.getAllByText("SERVICE AGREEMENT").length).toBeGreaterThan(0);
    fireEvent.click(screen.getByLabelText("Show only changes"));
    expect(screen.queryByText("SERVICE AGREEMENT")).not.toBeInTheDocument();
  });
});
