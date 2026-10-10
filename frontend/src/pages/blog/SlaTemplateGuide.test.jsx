import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import SlaTemplateGuide from "./SlaTemplateGuide";

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
      <SlaTemplateGuide />
    </MemoryRouter>,
  );
}

describe("SlaTemplateGuide", () => {
  it("shows article title", () => {
    renderArticle();
    expect(screen.getByText(/Service Level Agreement \(SLA\) Template/)).toBeInTheDocument();
  });

  it("shows read time", () => {
    renderArticle();
    expect(screen.getByText(/13 min read/)).toBeInTheDocument();
  });

  it("covers performance metrics section", () => {
    renderArticle();
    expect(screen.getByText(/Performance Metrics and KPIs/)).toBeInTheDocument();
  });

  it("covers penalty structure section", () => {
    renderArticle();
    expect(screen.getByText(/Penalty and Service Credit Structure/)).toBeInTheDocument();
  });

  it("covers Indian legal considerations", () => {
    renderArticle();
    expect(screen.getByText(/Indian Legal Considerations for SLAs/)).toBeInTheDocument();
  });

  it("links to stamp duty calculator", () => {
    renderArticle();
    const links = screen.getAllByRole("link");
    const calcLink = links.find((l) => l.getAttribute("href") === "/tools/stamp-duty-calculator");
    expect(calcLink).toBeDefined();
  });

  it("links to clause library", () => {
    renderArticle();
    const links = screen.getAllByRole("link");
    const libLink = links.find((l) => l.getAttribute("href") === "/tools/clause-library");
    expect(libLink).toBeDefined();
  });

  it("injects JSON-LD schema", () => {
    renderArticle();
    const scripts = document.querySelectorAll('script[type="application/ld+json"]');
    const texts = Array.from(scripts).map((s) => s.textContent);
    expect(texts.some((t) => t.includes("BlogPosting"))).toBe(true);
    expect(texts.some((t) => t.includes("FAQPage"))).toBe(true);
  });
});
