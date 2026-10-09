import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import ConsultingAgreementGuide from "./ConsultingAgreementGuide";

describe("ConsultingAgreementGuide", () => {
  it("renders the article heading", () => {
    render(
      <MemoryRouter>
        <ConsultingAgreementGuide />
      </MemoryRouter>,
    );
    expect(screen.getByText("Consulting Agreement Guide for Indian Businesses")).toBeInTheDocument();
  });

  it("contains key sections", () => {
    render(
      <MemoryRouter>
        <ConsultingAgreementGuide />
      </MemoryRouter>,
    );
    expect(screen.getByText("What Is a Consulting Agreement?")).toBeInTheDocument();
    expect(screen.getByText("Key Clauses Every Consulting Agreement Must Have")).toBeInTheDocument();
    expect(screen.getByText("Tax Implications for Consulting Agreements in India")).toBeInTheDocument();
  });

  it("has a CTA to generate consulting agreement", () => {
    render(
      <MemoryRouter>
        <ConsultingAgreementGuide />
      </MemoryRouter>,
    );
    const link = screen.getByText(/Generate Consulting Agreement/);
    expect(link).toHaveAttribute("href", "/generator?template=consulting-agreement");
  });
});
