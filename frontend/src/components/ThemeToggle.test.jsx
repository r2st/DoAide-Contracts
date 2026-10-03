import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import ThemeToggle from "./ThemeToggle";

vi.mock("../hooks/useTheme", () => {
  let theme = "system";
  return {
    useTheme: () => ({
      theme,
      setTheme: (v) => { theme = v; },
    }),
  };
});

describe("ThemeToggle", () => {
  it("renders with the current theme label", () => {
    render(<ThemeToggle />);
    expect(screen.getByRole("button", { name: /Theme: Auto/ })).toBeInTheDocument();
  });

  it("is a button that can be clicked", async () => {
    render(<ThemeToggle />);
    const btn = screen.getByRole("button");
    await userEvent.click(btn);
    expect(btn).toBeInTheDocument();
  });
});
