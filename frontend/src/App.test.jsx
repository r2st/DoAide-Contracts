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
vi.mock("./lib/share", () => ({
  origin: () => "http://localhost",
  fullUrl: (p) => `http://localhost${p}`,
  whatsappUrl: () => "https://wa.me",
  twitterUrl: () => "https://twitter.com",
  copyToClipboard: vi.fn().mockResolvedValue(true),
  embedSnippet: () => "<iframe></iframe>",
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
    expect(screen.getByText("Generate a Free Contract in 60 Seconds")).toBeInTheDocument();
  });

  it("renders login page at /login", () => {
    renderAt("/login");
    expect(screen.getByRole("tab", { name: "Sign in" })).toBeInTheDocument();
  });

  it("renders pricing page at /pricing", () => {
    renderAt("/pricing");
    expect(screen.getByText("Simple, transparent pricing")).toBeInTheDocument();
  });

  it("renders free templates page at /templates", () => {
    renderAt("/templates");
    expect(screen.getByText("Template Gallery")).toBeInTheDocument();
  });

  it("renders template detail page at /template/nda", () => {
    renderAt("/template/nda");
    expect(screen.getAllByText(/Non-Disclosure Agreement/).length).toBeGreaterThan(0);
  });

  it("renders free generator page at /generator", () => {
    renderAt("/generator");
    expect(screen.getByText("Free Contract Generator")).toBeInTheDocument();
  });

  it("renders checker page at /checker", () => {
    renderAt("/checker");
    expect(screen.getByText("Contract Clause Checker")).toBeInTheDocument();
  });

  it("renders embed page at /embed", () => {
    renderAt("/embed");
    expect(screen.getByText(/Embed Contract Generator/)).toBeInTheDocument();
  });

  it("renders blog at /blog", () => {
    renderAt("/blog");
    expect(screen.getByText("DoAide Contracts Blog")).toBeInTheDocument();
  });

  it("redirects unknown routes to /", () => {
    renderAt("/nonexistent");
    expect(screen.getByText("Generate a Free Contract in 60 Seconds")).toBeInTheDocument();
  });
});
