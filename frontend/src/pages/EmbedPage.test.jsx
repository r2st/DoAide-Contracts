import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import EmbedPage from "./EmbedPage";

vi.mock("../hooks/usePageTitle", () => ({ usePageTitle: () => {} }));

const mockCopyToClipboard = vi.fn();
vi.mock("../lib/share", () => ({
  copyToClipboard: (...args) => mockCopyToClipboard(...args),
  embedSnippet: () => '<iframe src="http://localhost/embed" width="100%" height="400"></iframe>',
}));

function renderPage() {
  return render(
    <MemoryRouter>
      <EmbedPage />
    </MemoryRouter>,
  );
}

describe("EmbedPage", () => {
  it("shows page title", () => {
    renderPage();
    expect(screen.getByText(/Embed Contract Generator/)).toBeInTheDocument();
  });

  it("shows embed code", () => {
    renderPage();
    expect(screen.getByText(/iframe/)).toBeInTheDocument();
  });

  it("has copy button", () => {
    renderPage();
    expect(screen.getByText("Copy embed code")).toBeInTheDocument();
  });

  it("copies snippet on button click", async () => {
    mockCopyToClipboard.mockResolvedValue(true);
    renderPage();
    await userEvent.click(screen.getByText("Copy embed code"));
    expect(mockCopyToClipboard).toHaveBeenCalled();
    expect(screen.getByText("Copied!")).toBeInTheDocument();
  });

  it("shows how it works section", () => {
    renderPage();
    expect(screen.getByText("How it works")).toBeInTheDocument();
  });

  it("shows preview section", () => {
    renderPage();
    expect(screen.getByText("Preview")).toBeInTheDocument();
  });
});
