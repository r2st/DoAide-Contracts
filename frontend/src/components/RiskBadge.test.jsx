import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import RiskBadge from "./RiskBadge";

describe("RiskBadge", () => {
  it("renders high risk badge", () => {
    render(<RiskBadge level="high" />);
    expect(screen.getByText("High Risk")).toBeInTheDocument();
  });

  it("renders medium risk badge", () => {
    render(<RiskBadge level="medium" />);
    expect(screen.getByText("Medium")).toBeInTheDocument();
  });

  it("renders low risk badge", () => {
    render(<RiskBadge level="low" />);
    expect(screen.getByText("Low Risk")).toBeInTheDocument();
  });

  it("applies the correct CSS class", () => {
    const { container } = render(<RiskBadge level="high" />);
    expect(container.querySelector(".risk-high")).toBeTruthy();
  });
});
