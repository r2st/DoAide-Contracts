import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import IndianContractActGuide from "./IndianContractActGuide";

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
      <IndianContractActGuide />
    </MemoryRouter>,
  );
}

describe("IndianContractActGuide", () => {
  it("shows article title", () => {
    renderArticle();
    expect(screen.getByRole("heading", { level: 1, name: /Indian Contract Act 1872/ })).toBeInTheDocument();
  });

  it("shows read time", () => {
    renderArticle();
    expect(screen.getByText(/12 min read/)).toBeInTheDocument();
  });

  it("covers essential elements section", () => {
    renderArticle();
    expect(screen.getByText(/Essential Elements of a Valid Contract/)).toBeInTheDocument();
  });

  it("covers essential clauses section", () => {
    renderArticle();
    expect(screen.getByText(/10 Essential Clauses for Indian Business Agreements/)).toBeInTheDocument();
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
