import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import FreelancerAgreementTemplateGuide from "./FreelancerAgreementTemplateGuide";

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
      <FreelancerAgreementTemplateGuide />
    </MemoryRouter>,
  );
}

describe("FreelancerAgreementTemplateGuide", () => {
  it("shows article title", () => {
    renderArticle();
    expect(screen.getByText(/Freelancer Agreement Template India/)).toBeInTheDocument();
  });

  it("shows read time", () => {
    renderArticle();
    expect(screen.getByText(/11 min read/)).toBeInTheDocument();
  });

  it("covers payment terms section", () => {
    renderArticle();
    expect(screen.getByText(/Payment Terms That Protect You/)).toBeInTheDocument();
  });

  it("covers IP section", () => {
    renderArticle();
    expect(screen.getByText(/Intellectual Property — Your Most Valuable Asset/)).toBeInTheDocument();
  });

  it("covers red flags section", () => {
    renderArticle();
    expect(screen.getByText(/Red Flags to Watch For/)).toBeInTheDocument();
  });

  it("links to freelancer template", () => {
    renderArticle();
    const links = screen.getAllByRole("link");
    const templateLink = links.find((l) => l.getAttribute("href") === "/template/freelancer");
    expect(templateLink).toBeDefined();
  });

  it("injects JSON-LD schema", () => {
    renderArticle();
    const scripts = document.querySelectorAll('script[type="application/ld+json"]');
    const texts = Array.from(scripts).map((s) => s.textContent);
    expect(texts.some((t) => t.includes("BlogPosting"))).toBe(true);
    expect(texts.some((t) => t.includes("FAQPage"))).toBe(true);
  });
});
