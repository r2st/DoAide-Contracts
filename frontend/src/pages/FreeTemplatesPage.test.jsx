import { render, screen } from "@testing-library/react";
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
    expect(screen.getByText("Free Contract Templates")).toBeInTheDocument();
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

  it("renders template cards as links", () => {
    renderPage();
    const ndaLinks = screen.getAllByText(/View template/);
    expect(ndaLinks.length).toBeGreaterThan(0);
  });
});
