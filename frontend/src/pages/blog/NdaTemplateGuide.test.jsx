import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import NdaTemplateGuide from "./NdaTemplateGuide";

vi.mock("../../hooks/usePageTitle", () => ({ usePageTitle: () => {} }));
vi.mock("../../lib/share", () => ({
  fullUrl: (p) => `http://localhost${p}`,
  whatsappUrl: () => "https://wa.me",
  twitterUrl: () => "https://twitter.com",
  copyToClipboard: vi.fn(),
}));

function renderArticle() {
  return render(
    <MemoryRouter>
      <NdaTemplateGuide />
    </MemoryRouter>,
  );
}

describe("NdaTemplateGuide", () => {
  it("shows article title", () => {
    renderArticle();
    expect(screen.getByText("Free NDA Template India 2026")).toBeInTheDocument();
  });

  it("shows read time", () => {
    renderArticle();
    expect(screen.getByText(/8 min read/)).toBeInTheDocument();
  });

  it("covers what is NDA section", () => {
    renderArticle();
    expect(screen.getByText(/What Is a Non-Disclosure Agreement/)).toBeInTheDocument();
  });

  it("covers when to use NDA", () => {
    renderArticle();
    expect(screen.getByText(/When Do You Need an NDA/)).toBeInTheDocument();
  });

  it("links to NDA template", () => {
    renderArticle();
    const links = screen.getAllByRole("link");
    const templateLink = links.find((l) => l.getAttribute("href") === "/template/nda");
    expect(templateLink).toBeDefined();
  });
});
