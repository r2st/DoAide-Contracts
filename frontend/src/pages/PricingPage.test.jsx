import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import PricingPage from "./PricingPage";

vi.mock("../hooks/usePageTitle", () => ({ usePageTitle: () => {} }));

function renderPricing() {
  return render(
    <MemoryRouter>
      <PricingPage />
    </MemoryRouter>,
  );
}

describe("PricingPage", () => {
  it("shows the pricing headline", () => {
    renderPricing();
    expect(screen.getByText("Simple, transparent pricing")).toBeInTheDocument();
  });

  it("renders three plan tiers", () => {
    renderPricing();
    expect(screen.getByText("Free")).toBeInTheDocument();
    expect(screen.getByText("Pro")).toBeInTheDocument();
    expect(screen.getByText("Business")).toBeInTheDocument();
  });

  it("shows prices in INR", () => {
    renderPricing();
    expect(screen.getByText("₹0")).toBeInTheDocument();
    expect(screen.getByText("₹2,399")).toBeInTheDocument();
    expect(screen.getByText("₹8,199")).toBeInTheDocument();
  });

  it("highlights Pro as most popular", () => {
    renderPricing();
    expect(screen.getByText("Most popular")).toBeInTheDocument();
  });

  it("shows key feature differentiators", () => {
    renderPricing();
    expect(screen.getByText("3 contract reviews / month")).toBeInTheDocument();
    expect(screen.getByText("Unlimited contract reviews")).toBeInTheDocument();
    expect(screen.getByText("API access")).toBeInTheDocument();
  });
});
