import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import App from "./App";

vi.mock("./hooks/usePageTitle", () => ({ usePageTitle: () => {}, PageTitleProvider: ({ children }) => children }));
vi.mock("./hooks/useAuth", () => ({
  useAuth: () => ({ user: null, loading: false, login: vi.fn(), register: vi.fn(), logout: vi.fn() }),
  AuthProvider: ({ children }) => children,
  AuthContext: { Provider: ({ children }) => children },
}));

function renderAt(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  );
}

describe("App routing", () => {
  it("renders landing page at / when not logged in", () => {
    renderAt("/");
    expect(screen.getByText("AI-Powered Contract Review for India")).toBeInTheDocument();
  });

  it("renders login page at /login", () => {
    renderAt("/login");
    expect(screen.getByRole("tab", { name: "Sign in" })).toBeInTheDocument();
  });

  it("renders pricing page at /pricing", () => {
    renderAt("/pricing");
    expect(screen.getByText("Simple, transparent pricing")).toBeInTheDocument();
  });

  it("redirects unknown routes to /", () => {
    renderAt("/nonexistent");
    expect(screen.getByText("AI-Powered Contract Review for India")).toBeInTheDocument();
  });
});
