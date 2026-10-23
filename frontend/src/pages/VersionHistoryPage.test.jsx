import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import VersionHistoryPage from "./VersionHistoryPage";

vi.mock("../hooks/usePageTitle", () => ({ usePageTitle: vi.fn() }));
vi.mock("../components/ToolsNav", () => ({ default: () => <nav data-testid="tools-nav" /> }));
vi.mock("../components/ShareButtons", () => ({ default: () => <div data-testid="share-buttons" /> }));

function renderPage() {
  return render(
    <MemoryRouter>
      <VersionHistoryPage />
    </MemoryRouter>,
  );
}

function addVersion(label, text) {
  fireEvent.change(screen.getByLabelText("Version label"), { target: { value: label } });
  fireEvent.change(screen.getByLabelText("Version text"), { target: { value: text } });
  fireEvent.click(screen.getByText("Add version"));
}

describe("VersionHistoryPage", () => {
  it("renders the title", () => {
    renderPage();
    expect(screen.getByText("Contract Version History")).toBeInTheDocument();
  });

  it("shows add version form", () => {
    renderPage();
    expect(screen.getByLabelText("Version label")).toBeInTheDocument();
    expect(screen.getByLabelText("Version text")).toBeInTheDocument();
    expect(screen.getByText("Add version")).toBeInTheDocument();
  });

  it("adds a version and shows timeline", () => {
    renderPage();
    addVersion("Draft 1", "This is the first draft of the contract.");
    expect(screen.getByText("Version Timeline")).toBeInTheDocument();
    expect(screen.getByText("Draft 1")).toBeInTheDocument();
  });

  it("shows diff when two versions are selected", () => {
    renderPage();
    addVersion("Draft 1", "Line one.\nLine two.\nLine three.");
    addVersion("Draft 2", "Line one.\nLine two modified.\nLine three.\nLine four added.");
    expect(screen.getAllByText("Draft 1").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Draft 2").length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/\+\d+ added/)).toBeInTheDocument();
  });

  it("disables add button when textarea is empty", () => {
    renderPage();
    const btn = screen.getByText("Add version");
    expect(btn).toBeDisabled();
  });

  it("clears form after adding a version", () => {
    renderPage();
    addVersion("Draft 1", "Some text.");
    expect(screen.getByLabelText("Version label").value).toBe("");
    expect(screen.getByLabelText("Version text").value).toBe("");
  });

  it("renders FAQ section", () => {
    renderPage();
    expect(screen.getByText("Frequently Asked Questions")).toBeInTheDocument();
    expect(screen.getByText("Why should I track contract versions?")).toBeInTheDocument();
  });

  it("toggles FAQ answers", () => {
    renderPage();
    const btn = screen.getByText("Why should I track contract versions?");
    fireEvent.click(btn);
    expect(screen.getByText(/audit trail/)).toBeInTheDocument();
    fireEvent.click(btn);
    expect(screen.queryByText(/audit trail/)).not.toBeInTheDocument();
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
