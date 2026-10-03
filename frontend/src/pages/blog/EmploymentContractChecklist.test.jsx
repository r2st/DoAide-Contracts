import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import EmploymentContractChecklist from "./EmploymentContractChecklist";

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
      <EmploymentContractChecklist />
    </MemoryRouter>,
  );
}

describe("EmploymentContractChecklist", () => {
  it("shows article title", () => {
    renderArticle();
    expect(screen.getByText(/Employment Contract Checklist/)).toBeInTheDocument();
  });

  it("links to employment template", () => {
    renderArticle();
    const links = screen.getAllByRole("link");
    const templateLink = links.find((l) => l.getAttribute("href") === "/template/employment");
    expect(templateLink).toBeDefined();
  });
});
