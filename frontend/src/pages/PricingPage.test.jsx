import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import PricingPage from "./PricingPage";

vi.mock("../hooks/usePageTitle", () => ({ usePageTitle: () => {} }));

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return { ...actual, useNavigate: () => mockNavigate };
});

let mockUser = null;
vi.mock("../hooks/useAuth", () => ({
  useAuth: () => ({ user: mockUser, loading: false }),
}));

vi.mock("../lib/api", () => ({
  api: {
    createSubscription: vi.fn(),
    verifyPayment: vi.fn(),
  },
}));

function renderPricing() {
  return render(
    <MemoryRouter>
      <PricingPage />
    </MemoryRouter>,
  );
}

describe("PricingPage", () => {
  beforeEach(() => {
    mockUser = null;
    mockNavigate.mockClear();
  });

  it("shows the pricing headline", () => {
    renderPricing();
    expect(screen.getByText("Simple, transparent pricing")).toBeInTheDocument();
  });

  it("renders three plan tiers", () => {
    renderPricing();
    expect(screen.getByText("Free")).toBeInTheDocument();
    expect(screen.getByText("Pro")).toBeInTheDocument();
    expect(screen.getByText("Enterprise")).toBeInTheDocument();
  });

  it("shows prices in INR", () => {
    renderPricing();
    expect(screen.getByText("₹0")).toBeInTheDocument();
    expect(screen.getByText("₹399")).toBeInTheDocument();
    expect(screen.getByText("₹1,499")).toBeInTheDocument();
  });

  it("highlights Pro as most popular", () => {
    renderPricing();
    expect(screen.getByText("Most popular")).toBeInTheDocument();
  });

  it("shows key feature differentiators", () => {
    renderPricing();
    expect(screen.getByText("3 contracts/month")).toBeInTheDocument();
    expect(screen.getByText("Unlimited contracts")).toBeInTheDocument();
    expect(screen.getByText("API access")).toBeInTheDocument();
  });

  it("shows subscribe buttons for paid plans", () => {
    renderPricing();
    const buttons = screen.getAllByRole("button", { name: /subscribe/i });
    expect(buttons).toHaveLength(2);
  });

  it("redirects to register when not logged in", () => {
    mockUser = null;
    renderPricing();
    const buttons = screen.getAllByRole("button", { name: /subscribe/i });
    fireEvent.click(buttons[0]);
    expect(mockNavigate).toHaveBeenCalledWith("/register");
  });

  it("shows current plan indicator for logged-in user", () => {
    mockUser = { email: "test@example.com", name: "Test", plan: "pro" };
    renderPricing();
    expect(screen.getByText("Current plan")).toBeInTheDocument();
  });

  it("shows enterprise features", () => {
    renderPricing();
    expect(screen.getByText("Everything in Pro")).toBeInTheDocument();
    expect(screen.getByText("Team collaboration")).toBeInTheDocument();
    expect(screen.getByText("Audit trail")).toBeInTheDocument();
    expect(screen.getByText("Compliance reporting")).toBeInTheDocument();
  });

  it("shows pro features", () => {
    renderPricing();
    expect(screen.getByText("E-signatures")).toBeInTheDocument();
    expect(screen.getByText("Custom templates")).toBeInTheDocument();
    expect(screen.getByText("Export to PDF/Word")).toBeInTheDocument();
  });

  it("shows cancel anytime note", () => {
    renderPricing();
    expect(screen.getByText(/cancel anytime/i)).toBeInTheDocument();
  });
});
