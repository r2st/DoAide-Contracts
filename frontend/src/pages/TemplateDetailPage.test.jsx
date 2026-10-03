import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import TemplateDetailPage from "./TemplateDetailPage";

vi.mock("../hooks/usePageTitle", () => ({ usePageTitle: () => {} }));
vi.mock("../lib/share", () => ({
  fullUrl: (p) => `http://localhost${p}`,
  whatsappUrl: (t, u) => `https://wa.me/?text=${encodeURIComponent(`${t} ${u}`)}`,
  twitterUrl: (t, u) => `https://twitter.com/intent/tweet?text=${encodeURIComponent(t)}`,
  copyToClipboard: vi.fn(),
}));

function renderPage(slug = "nda") {
  return render(
    <MemoryRouter initialEntries={[`/template/${slug}`]}>
      <Routes>
        <Route path="/template/:slug" element={<TemplateDetailPage />} />
      </Routes>
    </MemoryRouter>,
  );
}

describe("TemplateDetailPage", () => {
  it("shows template name for NDA", () => {
    renderPage("nda");
    expect(screen.getAllByText(/Non-Disclosure Agreement/).length).toBeGreaterThan(0);
  });

  it("shows breadcrumb navigation", () => {
    renderPage("nda");
    expect(screen.getAllByText("Templates").length).toBeGreaterThan(0);
  });

  it("shows customize button", () => {
    renderPage("nda");
    expect(screen.getByText("Customize & Generate")).toBeInTheDocument();
  });

  it("shows share buttons", () => {
    renderPage("nda");
    expect(screen.getByLabelText("Share on WhatsApp")).toBeInTheDocument();
  });

  it("shows template preview", () => {
    renderPage("nda");
    expect(screen.getByText("Template Preview")).toBeInTheDocument();
  });

  it("shows full template on button click", async () => {
    renderPage("nda");
    const btn = screen.getByText("Show full template");
    await userEvent.click(btn);
    expect(screen.queryByText("Show full template")).not.toBeInTheDocument();
  });

  it("shows 'not found' for unknown slug", () => {
    renderPage("nonexistent");
    expect(screen.getByText("Template not found.")).toBeInTheDocument();
  });

  it("shows share with lawyer button", () => {
    renderPage("nda");
    expect(screen.getByText("Share with your lawyer")).toBeInTheDocument();
  });

  it("shows key fields section", () => {
    renderPage("nda");
    expect(screen.getByText("Key Fields")).toBeInTheDocument();
  });
});
