import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

function renderLanding() {
  return render(
    <MemoryRouter>
      <LandingPage />
    </MemoryRouter>,
  );
}

describe("LandingPage", () => {
  it("shows the headline", () => {
    renderLanding();
    expect(screen.getByText("AI-Powered Contract Review for India")).toBeInTheDocument();
  });

  it("shows the subtitle about contract review", () => {
    renderLanding();
    expect(screen.getByText(/Upload any contract for clause-by-clause risk analysis/)).toBeInTheDocument();
  });

  it("renders the auth form with create-account tab active by default", () => {
    renderLanding();
    const create = screen.getByRole("tab", { name: "Create account" });
    const signIn = screen.getByRole("tab", { name: "Sign in" });
    expect(create).toHaveAttribute("aria-selected", "true");
    expect(signIn).toHaveAttribute("aria-selected", "false");
  });

  it("shows pricing hints", () => {
    renderLanding();
    expect(screen.getByText("Free forever")).toBeInTheDocument();
    expect(screen.getByText(/2,399/)).toBeInTheDocument();
  });

  it("renders footer with DoAide product links", () => {
    renderLanding();
    expect(screen.getByText("Desk")).toBeInTheDocument();
    expect(screen.getByText("GST")).toBeInTheDocument();
    expect(screen.getByText("Realty")).toBeInTheDocument();
    expect(screen.getByText("doaide.com")).toBeInTheDocument();
  });

  it("links to doaide.com from footer", () => {
    renderLanding();
    const link = screen.getByText("doaide.com").closest("a");
    expect(link).toHaveAttribute("href", "https://doaide.com");
  });
});
