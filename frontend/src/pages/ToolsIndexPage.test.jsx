import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import ToolsIndexPage from "./ToolsIndexPage";

vi.mock("../hooks/usePageTitle", () => ({ usePageTitle: () => {} }));

describe("ToolsIndexPage", () => {
  it("renders the page title", () => {
    render(<MemoryRouter><ToolsIndexPage /></MemoryRouter>);
    expect(screen.getByText("Free Contract Tools")).toBeInTheDocument();
  });

  it("lists all tool cards", () => {
    render(<MemoryRouter><ToolsIndexPage /></MemoryRouter>);
    expect(screen.getByText("NDA Generator")).toBeInTheDocument();
    expect(screen.getByText("Contract Clause Library")).toBeInTheDocument();
    expect(screen.getByText("Contract Readability Scorer")).toBeInTheDocument();
  });

  it("links to individual tool pages", () => {
    render(<MemoryRouter><ToolsIndexPage /></MemoryRouter>);
    const ndaLink = screen.getByText("NDA Generator").closest("a");
    expect(ndaLink).toHaveAttribute("href", "/tools/nda-generator");
  });
});
