import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import VsLegalZoomPage from "./VsLegalZoomPage";

vi.mock("../hooks/usePageTitle", () => ({ usePageTitle: () => {} }));
vi.mock("../lib/share", () => ({
  fullUrl: (p) => `http://localhost${p}`,
  whatsappUrl: (t, u) => `https://wa.me/?text=${encodeURIComponent(`${t} ${u}`)}`,
  twitterUrl: (t) => `https://twitter.com/intent/tweet?text=${encodeURIComponent(t)}`,
  copyToClipboard: vi.fn(),
}));

describe("VsLegalZoomPage", () => {
  it("renders the page title", () => {
    render(<MemoryRouter><VsLegalZoomPage /></MemoryRouter>);
    expect(screen.getByRole("heading", { level: 1, name: /DoAide Contracts vs LegalZoom/i })).toBeInTheDocument();
  });

  it("shows the comparison table with both products", () => {
    render(<MemoryRouter><VsLegalZoomPage /></MemoryRouter>);
    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getByText("Primary market")).toBeInTheDocument();
    expect(screen.getByText("Stamp duty guidance")).toBeInTheDocument();
  });

  it("is honest about when LegalZoom is the better choice", () => {
    render(<MemoryRouter><VsLegalZoomPage /></MemoryRouter>);
    expect(screen.getByText(/When LegalZoom is the better choice/i)).toBeInTheDocument();
  });

  it("includes the trademark disclaimer", () => {
    render(<MemoryRouter><VsLegalZoomPage /></MemoryRouter>);
    expect(screen.getByText(/not affiliated with/i)).toBeInTheDocument();
  });

  it("renders FAQ entries", () => {
    render(<MemoryRouter><VsLegalZoomPage /></MemoryRouter>);
    expect(screen.getByText(/Is DoAide Contracts a free alternative to LegalZoom\?/)).toBeInTheDocument();
  });

  it("links to the generator as the primary CTA", () => {
    render(<MemoryRouter><VsLegalZoomPage /></MemoryRouter>);
    expect(screen.getByRole("link", { name: /Generate a contract free/i })).toHaveAttribute("href", "/generator");
  });
});
