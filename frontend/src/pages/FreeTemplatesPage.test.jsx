import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import FreeTemplatesPage from "./FreeTemplatesPage";

vi.mock("../hooks/usePageTitle", () => ({ usePageTitle: () => {} }));
vi.mock("../lib/share", () => ({
  fullUrl: (p) => `http://localhost${p}`,
  whatsappUrl: (t, u) => `https://wa.me/?text=${encodeURIComponent(`${t} ${u}`)}`,
  twitterUrl: (t, u) => `https://twitter.com/intent/tweet?text=${encodeURIComponent(t)}&url=${encodeURIComponent(u)}`,
  copyToClipboard: vi.fn(),
}));

function renderPage() {
  return render(
    <MemoryRouter>
      <FreeTemplatesPage />
    </MemoryRouter>,
  );
}

describe("FreeTemplatesPage", () => {
  it("shows page title", () => {
    renderPage();
    expect(screen.getByText("Template Gallery")).toBeInTheDocument();
  });

  it("renders all 6 templates", () => {
    renderPage();
    expect(screen.getAllByText(/NDA/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Employment/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Freelancer/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Rental/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Partnership/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Service Agreement/).length).toBeGreaterThan(0);
  });

  it("renders share buttons", () => {
    renderPage();
    expect(screen.getByLabelText("Share on WhatsApp")).toBeInTheDocument();
  });

  it("renders template cards with view links", () => {
    renderPage();
    const links = screen.getAllByText(/View template/);
    expect(links.length).toBeGreaterThan(0);
  });

  it("shows preview snippets for each template", () => {
    renderPage();
    const snippets = document.querySelectorAll(".template-preview-snippet");
    expect(snippets.length).toBe(6);
  });

  it("shows field count for each template", () => {
    renderPage();
    expect(screen.getAllByText(/\d+ fields/).length).toBe(6);
  });

  it("shows category filter buttons", () => {
    renderPage();
    expect(screen.getByText("All Templates")).toBeInTheDocument();
    expect(screen.getByText("NDA")).toBeInTheDocument();
    expect(screen.getByText("Employment")).toBeInTheDocument();
  });

  it("filters templates by category", async () => {
    renderPage();
    const user = userEvent.setup();
    await user.click(screen.getByText("NDA"));
    expect(screen.getByText("1 template")).toBeInTheDocument();
  });

  it("shows quick preview toggle", async () => {
    renderPage();
    const toggles = screen.getAllByText("Quick preview");
    expect(toggles.length).toBe(6);
  });

  it("expands preview on quick preview click", async () => {
    renderPage();
    const user = userEvent.setup();
    const toggles = screen.getAllByText("Quick preview");
    await user.click(toggles[0]);
    expect(screen.getByText("Hide preview")).toBeInTheDocument();
  });

  it("shows template count", () => {
    renderPage();
    expect(screen.getByText("6 templates")).toBeInTheDocument();
  });
});
