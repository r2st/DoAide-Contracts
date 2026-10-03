import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import FreelancerAgreementGuide from "./FreelancerAgreementGuide";

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
      <FreelancerAgreementGuide />
    </MemoryRouter>,
  );
}

describe("FreelancerAgreementGuide", () => {
  it("shows article title", () => {
    renderArticle();
    expect(screen.getByText(/Freelancer Agreement Guide/)).toBeInTheDocument();
  });

  it("links to freelancer template", () => {
    renderArticle();
    const links = screen.getAllByRole("link");
    const templateLink = links.find((l) => l.getAttribute("href") === "/template/freelancer");
    expect(templateLink).toBeDefined();
  });
});
