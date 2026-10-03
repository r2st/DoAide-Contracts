import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import NdaGeneratorPage from "./NdaGeneratorPage";

vi.mock("../hooks/usePageTitle", () => ({ usePageTitle: () => {} }));
vi.mock("../lib/share", () => ({
  fullUrl: (p) => `http://localhost${p}`,
  whatsappUrl: (t, u) => `https://wa.me/?text=${encodeURIComponent(`${t} ${u}`)}`,
  twitterUrl: (t, u) => `https://twitter.com/intent/tweet?text=${encodeURIComponent(t)}`,
  copyToClipboard: vi.fn(),
}));

describe("NdaGeneratorPage", () => {
  it("renders the page title and form", () => {
    render(<MemoryRouter><NdaGeneratorPage /></MemoryRouter>);
    expect(screen.getByText("Free NDA Generator")).toBeInTheDocument();
    expect(screen.getByText("Mutual NDA")).toBeInTheDocument();
  });

  it("generates NDA on button click", () => {
    render(<MemoryRouter><NdaGeneratorPage /></MemoryRouter>);
    fireEvent.click(screen.getByText("Generate NDA"));
    expect(screen.getByText("Your NDA")).toBeInTheDocument();
    expect(screen.getByText("Copy NDA")).toBeInTheDocument();
  });

  it("shows one-way NDA type option", () => {
    render(<MemoryRouter><NdaGeneratorPage /></MemoryRouter>);
    expect(screen.getByText("One-Way NDA")).toBeInTheDocument();
  });
});
