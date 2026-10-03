import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import LandingPage from "./LandingPage";

vi.mock("../hooks/usePageTitle", () => ({ usePageTitle: () => {} }));
vi.mock("../hooks/useAuth", () => ({
  useAuth: () => ({
    user: null,
    loading: false,
    login: vi.fn(),
    register: vi.fn(),
  }),
}));
vi.mock("../lib/share", () => ({
  fullUrl: (p) => `http://localhost${p}`,
  copyToClipboard: vi.fn().mockResolvedValue(true),
}));

function renderLanding() {
  return render(
    <MemoryRouter>
      <LandingPage />
    </MemoryRouter>,
  );
}

describe("LandingPage", () => {
  it("shows the hero headline", () => {
    renderLanding();
    expect(screen.getByText("Generate a Free Contract in 60 Seconds")).toBeInTheDocument();
  });

  it("shows hero CTA buttons", () => {
    renderLanding();
    expect(screen.getAllByText("Generate Free Contract").length).toBeGreaterThan(0);
    expect(screen.getByText("Check a Contract")).toBeInTheDocument();
  });

  it("shows usage counter", () => {
    renderLanding();
    expect(screen.getByText(/8,500\+/)).toBeInTheDocument();
  });

  it("shows instant tool cards", () => {
    renderLanding();
    expect(screen.getByText("Browse Templates")).toBeInTheDocument();
    expect(screen.getByText("Generate Contract")).toBeInTheDocument();
    expect(screen.getByText("Check Clauses")).toBeInTheDocument();
  });

  it("shows template gallery section", () => {
    renderLanding();
    expect(screen.getAllByText("Free Contract Templates").length).toBeGreaterThan(0);
    expect(screen.getByText("View all templates →")).toBeInTheDocument();
  });

  it("shows features section", () => {
    renderLanding();
    expect(screen.getByText("Everything You Need for Contract Management")).toBeInTheDocument();
    expect(screen.getByText("Instant Contract Generator")).toBeInTheDocument();
    expect(screen.getByText("Clause Risk Checker")).toBeInTheDocument();
  });

  it("shows testimonials", () => {
    renderLanding();
    expect(screen.getByText("Vikram R.")).toBeInTheDocument();
    expect(screen.getByText("Anita P.")).toBeInTheDocument();
    expect(screen.getByText("Rohit K.")).toBeInTheDocument();
  });

  it("shows FAQ section", () => {
    renderLanding();
    expect(screen.getByText("Frequently Asked Questions")).toBeInTheDocument();
    expect(screen.getByText("Are these contract templates legally valid in India?")).toBeInTheDocument();
  });

  it("shows referral banner", () => {
    renderLanding();
    expect(screen.getByText("Share with Your Lawyer or CA")).toBeInTheDocument();
  });

  it("shows pricing tiers", () => {
    renderLanding();
    expect(screen.getByText(/Upload any contract for clause-by-clause risk analysis/)).toBeInTheDocument();
  });

  it("renders footer with tool links", () => {
    renderLanding();
    expect(screen.getByText("Free Tools")).toBeInTheDocument();
    expect(screen.getByText("Resources")).toBeInTheDocument();
  });

  it("renders footer with DoAide product links", () => {
    renderLanding();
    expect(screen.getByText("Desk")).toBeInTheDocument();
    expect(screen.getByText("GST")).toBeInTheDocument();
    expect(screen.getByText("doaide.com")).toBeInTheDocument();
  });

  it("links to doaide.com from footer", () => {
    renderLanding();
    const link = screen.getByText("doaide.com").closest("a");
    expect(link).toHaveAttribute("href", "https://doaide.com");
  });

  it("shows final CTA section", () => {
    renderLanding();
    expect(screen.getByText("Start Creating Contracts in Minutes")).toBeInTheDocument();
  });
});
