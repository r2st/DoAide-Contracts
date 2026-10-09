import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import StampDutyGuide from "./StampDutyGuide";

describe("StampDutyGuide", () => {
  it("renders the article heading", () => {
    render(
      <MemoryRouter>
        <StampDutyGuide />
      </MemoryRouter>,
    );
    expect(screen.getByText(/Stamp Duty on Contracts in India/)).toBeInTheDocument();
  });

  it("contains key sections", () => {
    render(
      <MemoryRouter>
        <StampDutyGuide />
      </MemoryRouter>,
    );
    expect(screen.getByText("What Is Stamp Duty?")).toBeInTheDocument();
    expect(screen.getByText("State-wise Stamp Duty Comparison")).toBeInTheDocument();
    expect(screen.getByText("Penalties for Non-Payment of Stamp Duty")).toBeInTheDocument();
  });

  it("has a CTA to the stamp duty calculator", () => {
    render(
      <MemoryRouter>
        <StampDutyGuide />
      </MemoryRouter>,
    );
    const link = screen.getByText(/Calculate Stamp Duty →/);
    expect(link).toHaveAttribute("href", "/tools/stamp-duty-calculator");
  });
});
