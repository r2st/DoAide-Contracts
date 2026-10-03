import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import UsageMeter from "./UsageMeter";

describe("UsageMeter", () => {
  it("renders label and usage text", () => {
    render(<UsageMeter label="Reviews" used={2} limit={3} />);
    expect(screen.getByText("Reviews")).toBeInTheDocument();
    expect(screen.getByText("2 / 3")).toBeInTheDocument();
  });

  it("shows Unlimited when limit is -1", () => {
    render(<UsageMeter used={5} limit={-1} />);
    expect(screen.getByText("5 / Unlimited")).toBeInTheDocument();
  });

  it("applies is-over class when usage exceeds limit", () => {
    const { container } = render(<UsageMeter used={5} limit={3} />);
    expect(container.querySelector(".is-over")).toBeTruthy();
  });
});
