import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import StatCard from "./StatCard";

describe("StatCard", () => {
  it("renders label, value, and sub", () => {
    render(<StatCard label="Total" value={42} sub="this month" />);
    expect(screen.getByText("Total")).toBeInTheDocument();
    expect(screen.getByText("42")).toBeInTheDocument();
    expect(screen.getByText("this month")).toBeInTheDocument();
  });

  it("applies tone class", () => {
    const { container } = render(<StatCard label="Risk" value={5} tone="bad" />);
    expect(container.querySelector(".tone-bad")).toBeTruthy();
  });

  it("omits sub when not provided", () => {
    const { container } = render(<StatCard label="Count" value={10} />);
    expect(container.querySelector(".stat-sub")).toBeNull();
  });
});
