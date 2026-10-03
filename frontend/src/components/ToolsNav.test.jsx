import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import ToolsNav from "./ToolsNav";

function renderNav(path = "/templates") {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <ToolsNav />
    </MemoryRouter>,
  );
}

describe("ToolsNav", () => {
  it("renders brand link", () => {
    renderNav();
    expect(screen.getByText(/Contracts/)).toBeInTheDocument();
  });

  it("renders tool links", () => {
    renderNav();
    expect(screen.getByText("Templates")).toBeInTheDocument();
    expect(screen.getByText("Generator")).toBeInTheDocument();
    expect(screen.getByText("Clause Checker")).toBeInTheDocument();
  });

  it("highlights active link", () => {
    renderNav("/templates");
    const link = screen.getByText("Templates");
    expect(link.className).toContain("active");
  });

  it("shows sign up CTA", () => {
    renderNav();
    expect(screen.getByText("Sign up free")).toBeInTheDocument();
  });
});
