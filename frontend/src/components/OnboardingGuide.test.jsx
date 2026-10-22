import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import OnboardingGuide, { ONBOARDING_KEY } from "./OnboardingGuide";

afterEach(() => {
  window.localStorage.clear();
  vi.restoreAllMocks();
});

describe("OnboardingGuide", () => {
  it("shows the three steps to a first-time visitor", () => {
    render(<OnboardingGuide />);
    expect(screen.getByText("New here? Your contract in 3 steps")).toBeInTheDocument();
    expect(screen.getByText("Pick a template")).toBeInTheDocument();
    expect(screen.getByText("Send it")).toBeInTheDocument();
  });

  it("remembers dismissal and can be reopened", () => {
    render(<OnboardingGuide />);
    fireEvent.click(screen.getByText("Got it, let's start"));
    expect(window.localStorage.getItem(ONBOARDING_KEY)).toBe("1");
    expect(screen.queryByText("Pick a template")).not.toBeInTheDocument();
    fireEvent.click(screen.getByText("How it works"));
    expect(screen.getByText("Pick a template")).toBeInTheDocument();
  });

  it("stays closed for returning visitors", () => {
    window.localStorage.setItem(ONBOARDING_KEY, "1");
    render(<OnboardingGuide />);
    expect(screen.queryByText("Pick a template")).not.toBeInTheDocument();
    expect(screen.getByText("How it works")).toBeInTheDocument();
  });

  it("still renders when storage throws", () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    render(<OnboardingGuide />);
    expect(screen.getByText("Pick a template")).toBeInTheDocument();
  });
});
