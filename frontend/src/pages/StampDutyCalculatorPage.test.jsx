import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import StampDutyCalculatorPage from "./StampDutyCalculatorPage";

vi.mock("../hooks/usePageTitle", () => ({ usePageTitle: () => {} }));
vi.mock("../lib/share", () => ({
  fullUrl: (p) => `http://localhost${p}`,
  whatsappUrl: (t, u) => `https://wa.me/?text=${encodeURIComponent(`${t} ${u}`)}`,
  twitterUrl: (t, u) => `https://twitter.com/intent/tweet?text=${encodeURIComponent(t)}`,
  copyToClipboard: vi.fn(),
}));

describe("StampDutyCalculatorPage", () => {
  it("renders the page title", () => {
    render(<MemoryRouter><StampDutyCalculatorPage /></MemoryRouter>);
    expect(screen.getByText("Stamp Duty Calculator — India")).toBeInTheDocument();
  });

  it("renders all form inputs", () => {
    render(<MemoryRouter><StampDutyCalculatorPage /></MemoryRouter>);
    expect(screen.getByLabelText("State")).toBeInTheDocument();
    expect(screen.getByLabelText("Document Type")).toBeInTheDocument();
    expect(screen.getByLabelText(/Property/)).toBeInTheDocument();
  });

  it("calculates stamp duty when inputs are filled", () => {
    render(<MemoryRouter><StampDutyCalculatorPage /></MemoryRouter>);
    fireEvent.change(screen.getByLabelText("State"), { target: { value: "Maharashtra" } });
    fireEvent.change(screen.getByPlaceholderText("e.g. 50,00,000"), { target: { value: "10000000" } });
    expect(screen.getByText(/Stamp Duty \(6%\)/)).toBeInTheDocument();
    expect(screen.getByText(/Total Payable/)).toBeInTheDocument();
  });

  it("renders comparison table", () => {
    render(<MemoryRouter><StampDutyCalculatorPage /></MemoryRouter>);
    expect(screen.getByText("Stamp Duty Comparison — Top 5 States")).toBeInTheDocument();
  });

  it("renders FAQ section", () => {
    render(<MemoryRouter><StampDutyCalculatorPage /></MemoryRouter>);
    expect(screen.getByText("Frequently Asked Questions")).toBeInTheDocument();
    expect(screen.getByText("What is stamp duty in India?")).toBeInTheDocument();
  });

  it("toggles FAQ answers", () => {
    render(<MemoryRouter><StampDutyCalculatorPage /></MemoryRouter>);
    fireEvent.click(screen.getByText("What is stamp duty in India?"));
    expect(screen.getByText(/tax levied by state governments/)).toBeInTheDocument();
  });

  it("renders JSON-LD structured data", () => {
    const { container } = render(<MemoryRouter><StampDutyCalculatorPage /></MemoryRouter>);
    const scripts = container.querySelectorAll('script[type="application/ld+json"]');
    expect(scripts.length).toBeGreaterThanOrEqual(2);
  });
});
