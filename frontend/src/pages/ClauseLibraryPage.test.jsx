import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import ClauseLibraryPage from "./ClauseLibraryPage";

vi.mock("../hooks/usePageTitle", () => ({ usePageTitle: () => {} }));
vi.mock("../lib/share", () => ({
  fullUrl: (p) => `http://localhost${p}`,
  whatsappUrl: (t, u) => `https://wa.me/?text=${encodeURIComponent(`${t} ${u}`)}`,
  twitterUrl: (t, u) => `https://twitter.com/intent/tweet?text=${encodeURIComponent(t)}`,
  copyToClipboard: vi.fn(),
}));

describe("ClauseLibraryPage", () => {
  it("renders the page title", () => {
    render(<MemoryRouter><ClauseLibraryPage /></MemoryRouter>);
    expect(screen.getByText("Contract Clause Library")).toBeInTheDocument();
  });

  it("renders category filter buttons including All", () => {
    render(<MemoryRouter><ClauseLibraryPage /></MemoryRouter>);
    expect(screen.getByRole("button", { name: /^All \(/ })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /^Termination \(/ })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /^Indemnity \(/ })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /^Confidentiality \(/ })).toBeInTheDocument();
  });

  it("filters clauses by category", () => {
    render(<MemoryRouter><ClauseLibraryPage /></MemoryRouter>);
    fireEvent.click(screen.getByRole("button", { name: /^Termination \(/ }));
    expect(screen.getByText("Termination for Convenience")).toBeInTheDocument();
    expect(screen.getByText("Termination for Cause")).toBeInTheDocument();
    expect(screen.queryByText("Mutual Indemnification")).not.toBeInTheDocument();
  });

  it("searches clauses", () => {
    render(<MemoryRouter><ClauseLibraryPage /></MemoryRouter>);
    fireEvent.change(screen.getByPlaceholderText("Search clauses..."), { target: { value: "arbitration" } });
    expect(screen.getByText("Arbitration Clause (India)")).toBeInTheDocument();
  });

  it("shows no results message for unmatched search", () => {
    render(<MemoryRouter><ClauseLibraryPage /></MemoryRouter>);
    fireEvent.change(screen.getByPlaceholderText("Search clauses..."), { target: { value: "xyznonexistent" } });
    expect(screen.getByText(/No clauses match/)).toBeInTheDocument();
  });

  it("expands clause guidance on click", () => {
    render(<MemoryRouter><ClauseLibraryPage /></MemoryRouter>);
    const expandBtns = screen.getAllByText(/When to use & pitfalls/);
    fireEvent.click(expandBtns[0]);
    expect(screen.getByText("When to use:")).toBeInTheDocument();
    expect(screen.getByText("Common pitfalls:")).toBeInTheDocument();
  });

  it("renders FAQ section with JSON-LD", () => {
    const { container } = render(<MemoryRouter><ClauseLibraryPage /></MemoryRouter>);
    expect(screen.getByText("Frequently Asked Questions")).toBeInTheDocument();
    const scripts = container.querySelectorAll('script[type="application/ld+json"]');
    expect(scripts.length).toBeGreaterThanOrEqual(2);
  });

  it("renders sign-up CTA", () => {
    render(<MemoryRouter><ClauseLibraryPage /></MemoryRouter>);
    const links = screen.getAllByText("Sign up free");
    expect(links.length).toBeGreaterThanOrEqual(1);
  });
});
