import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import Shell from "./Shell";
import { StubAuth } from "../test/auth";

vi.mock("../hooks/usePageTitle", () => ({ usePageTitle: () => {} }));

function renderShell(children = <p>Page content</p>) {
  return render(
    <MemoryRouter>
      <StubAuth>
        <Shell>{children}</Shell>
      </StubAuth>
    </MemoryRouter>,
  );
}

describe("Shell", () => {
  it("renders the brand name", () => {
    renderShell();
    expect(screen.getByText("Contracts")).toBeInTheDocument();
  });

  it("renders navigation links", () => {
    renderShell();
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Review")).toBeInTheDocument();
    expect(screen.getByText("Generate")).toBeInTheDocument();
    expect(screen.getByText("Templates")).toBeInTheDocument();
    expect(screen.getByText("Settings")).toBeInTheDocument();
  });

  it("renders children", () => {
    renderShell(<p>Hello from page</p>);
    expect(screen.getByText("Hello from page")).toBeInTheDocument();
  });

  it("has a sign out button", () => {
    renderShell();
    expect(screen.getByText("Sign out")).toBeInTheDocument();
  });

  it("has a skip link", () => {
    renderShell();
    expect(screen.getByText("Skip to content")).toBeInTheDocument();
  });
});
