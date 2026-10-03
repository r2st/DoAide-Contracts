import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SkeletonPanel, SkeletonText, Spinner } from "./Skeleton";

describe("Skeleton components", () => {
  it("SkeletonText renders with custom label", () => {
    render(<SkeletonText label="Loading data" />);
    expect(screen.getByText("Loading data…")).toBeInTheDocument();
  });

  it("SkeletonPanel renders with aria-busy", () => {
    const { container } = render(<SkeletonPanel />);
    expect(container.querySelector("[aria-busy='true']")).toBeTruthy();
  });

  it("Spinner renders with label", () => {
    render(<Spinner label="Processing" />);
    expect(screen.getByText("Processing…")).toBeInTheDocument();
  });
});
