import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import TemplateCustomizerPage from "./TemplateCustomizerPage";

vi.mock("../hooks/usePageTitle", () => ({ usePageTitle: vi.fn() }));
vi.mock("../components/ToolsNav", () => ({ default: () => <nav data-testid="tools-nav" /> }));
vi.mock("../components/ShareButtons", () => ({ default: () => <div data-testid="share-buttons" /> }));

function renderPage() {
  return render(
    <MemoryRouter>
      <TemplateCustomizerPage />
    </MemoryRouter>,
  );
}

describe("TemplateCustomizerPage", () => {
  it("renders the title and subtitle", () => {
    renderPage();
    expect(screen.getByText("Contract Template Customizer")).toBeInTheDocument();
    expect(screen.getByText(/Customize your contract look/)).toBeInTheDocument();
  });

  it("renders branding controls", () => {
    renderPage();
    expect(screen.getByText("Branding")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Acme Technologies Pvt. Ltd.")).toBeInTheDocument();
  });

  it("renders color pickers", () => {
    renderPage();
    expect(screen.getByText("Colors")).toBeInTheDocument();
    expect(screen.getByText(/Primary/)).toBeInTheDocument();
    expect(screen.getByText(/Secondary/)).toBeInTheDocument();
  });

  it("renders font selector", () => {
    renderPage();
    expect(screen.getByText("Typography")).toBeInTheDocument();
    const select = screen.getByDisplayValue("Inter (Modern)");
    expect(select).toBeInTheDocument();
  });

  it("renders layout controls", () => {
    renderPage();
    expect(screen.getByText("Layout")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Modern")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Standard")).toBeInTheDocument();
  });

  it("shows live preview with contract content", () => {
    renderPage();
    expect(screen.getByText("Live Preview")).toBeInTheDocument();
    expect(screen.getByText("Service Agreement")).toBeInTheDocument();
    expect(screen.getByText("1. Scope of Work")).toBeInTheDocument();
    expect(screen.getByText("2. Payment Terms")).toBeInTheDocument();
  });

  it("updates company name in preview when changed", () => {
    renderPage();
    const input = screen.getByDisplayValue("Acme Technologies Pvt. Ltd.");
    fireEvent.change(input, { target: { value: "Test Corp" } });
    expect(screen.getAllByText(/Test Corp/).length).toBeGreaterThan(0);
  });

  it("has Copy CSS, Print, and Reset buttons", () => {
    renderPage();
    expect(screen.getByText("Copy CSS")).toBeInTheDocument();
    expect(screen.getByText("Print")).toBeInTheDocument();
    expect(screen.getByText("Reset")).toBeInTheDocument();
  });

  it("resets to defaults on Reset click", () => {
    renderPage();
    const input = screen.getByDisplayValue("Acme Technologies Pvt. Ltd.");
    fireEvent.change(input, { target: { value: "Changed" } });
    fireEvent.click(screen.getByText("Reset"));
    expect(screen.getByDisplayValue("Acme Technologies Pvt. Ltd.")).toBeInTheDocument();
  });

  it("renders footer toggle checkbox", () => {
    renderPage();
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox.checked).toBe(true);
  });

  it("hides footer when unchecked", () => {
    renderPage();
    expect(screen.getByText(/Page 1 of 3/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("checkbox"));
    expect(screen.queryByText(/Page 1 of 3/)).not.toBeInTheDocument();
  });

  it("renders FAQ section", () => {
    renderPage();
    expect(screen.getByText("Frequently Asked Questions")).toBeInTheDocument();
    expect(screen.getByText("Why should I customize my contract templates?")).toBeInTheDocument();
  });

  it("renders ToolsNav and ShareButtons", () => {
    renderPage();
    expect(screen.getByTestId("tools-nav")).toBeInTheDocument();
    expect(screen.getByTestId("share-buttons")).toBeInTheDocument();
  });

  it("renders JSON-LD schemas", () => {
    const { container } = renderPage();
    const scripts = container.querySelectorAll('script[type="application/ld+json"]');
    expect(scripts.length).toBeGreaterThanOrEqual(2);
  });
});
