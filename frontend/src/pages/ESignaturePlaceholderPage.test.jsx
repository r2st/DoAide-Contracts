import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import ESignaturePlaceholderPage from "./ESignaturePlaceholderPage";

vi.mock("../hooks/usePageTitle", () => ({ usePageTitle: vi.fn() }));
vi.mock("../components/ToolsNav", () => ({ default: () => <nav data-testid="tools-nav" /> }));
vi.mock("../components/ShareButtons", () => ({ default: () => <div data-testid="share-buttons" /> }));

function renderPage() {
  return render(
    <MemoryRouter>
      <ESignaturePlaceholderPage />
    </MemoryRouter>,
  );
}

describe("ESignaturePlaceholderPage", () => {
  it("renders the title and subtitle", () => {
    renderPage();
    expect(screen.getByText("E-Signature Placeholder Tool")).toBeInTheDocument();
    expect(screen.getByText(/Mark where signatures/)).toBeInTheDocument();
  });

  it("shows the textarea in edit mode", () => {
    renderPage();
    expect(screen.getByLabelText("Contract text")).toBeInTheDocument();
  });

  it("switches to place mode on continue button click", () => {
    renderPage();
    fireEvent.click(screen.getByText(/Continue to place signatures/));
    expect(screen.getByText("Placeholder Type")).toBeInTheDocument();
    expect(screen.getByText("Assign to Party")).toBeInTheDocument();
  });

  it("shows sample contract in preview when no text pasted", () => {
    renderPage();
    fireEvent.click(screen.getByText(/Continue to place signatures/));
    expect(screen.getByText(/AGREEMENT/)).toBeInTheDocument();
    expect(screen.getByText("(sample)")).toBeInTheDocument();
  });

  it("renders all placeholder type buttons", () => {
    renderPage();
    fireEvent.click(screen.getByText(/Continue to place signatures/));
    expect(screen.getByText("Signature")).toBeInTheDocument();
    expect(screen.getByText("Initials")).toBeInTheDocument();
    expect(screen.getByText("Date")).toBeInTheDocument();
    expect(screen.getByText("Printed Name")).toBeInTheDocument();
    expect(screen.getByText("Title / Designation")).toBeInTheDocument();
  });

  it("renders party select with default options", () => {
    renderPage();
    fireEvent.click(screen.getByText(/Continue to place signatures/));
    const select = screen.getByRole("combobox");
    expect(select.value).toBe("Party A");
  });

  it("renders FAQ section", () => {
    renderPage();
    expect(screen.getByText("Frequently Asked Questions")).toBeInTheDocument();
    expect(screen.getByText("What is an e-signature placeholder in a contract?")).toBeInTheDocument();
  });

  it("toggles FAQ answers", () => {
    renderPage();
    const btn = screen.getByText("Are e-signatures legally valid in India?");
    fireEvent.click(btn);
    expect(screen.getByText(/Information Technology Act, 2000/)).toBeInTheDocument();
    fireEvent.click(btn);
    expect(screen.queryByText(/Information Technology Act, 2000/)).not.toBeInTheDocument();
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
    const types = [...scripts].map((s) => JSON.parse(s.textContent)["@type"]);
    expect(types).toContain("WebApplication");
    expect(types).toContain("FAQPage");
  });

  it("shows CTA to generate a contract", () => {
    renderPage();
    expect(screen.getByText(/Generate a contract/)).toBeInTheDocument();
  });

  it("can go back to edit mode", () => {
    renderPage();
    fireEvent.click(screen.getByText(/Continue to place signatures/));
    fireEvent.click(screen.getByText(/Back to edit/));
    expect(screen.getByLabelText("Contract text")).toBeInTheDocument();
  });
});
