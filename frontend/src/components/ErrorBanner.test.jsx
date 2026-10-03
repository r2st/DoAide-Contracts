import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import ErrorBanner from "./ErrorBanner";

describe("ErrorBanner", () => {
  it("renders nothing when message is empty", () => {
    const { container } = render(<ErrorBanner message="" />);
    expect(container.querySelector(".banner")).toBeNull();
  });

  it("shows the error message", () => {
    render(<ErrorBanner message="Something went wrong" />);
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });

  it("has alert role for accessibility", () => {
    render(<ErrorBanner message="Error" />);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("calls onDismiss when close button is clicked", async () => {
    const onDismiss = vi.fn();
    render(<ErrorBanner message="Error" onDismiss={onDismiss} />);
    await userEvent.click(screen.getByRole("button", { name: "Dismiss" }));
    expect(onDismiss).toHaveBeenCalledOnce();
  });
});
