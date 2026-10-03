import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { formatTitle, usePageTitle } from "./usePageTitle";

describe("formatTitle", () => {
  it("appends suffix to a page name", () => {
    expect(formatTitle("Dashboard")).toBe("Dashboard · DoAide Contracts");
  });

  it("returns default title when empty", () => {
    expect(formatTitle(null)).toBe("DoAide Contracts — AI Contract Review & Generation");
  });
});

describe("usePageTitle", () => {
  it("sets document.title", () => {
    renderHook(() => usePageTitle("Settings"));
    expect(document.title).toBe("Settings · DoAide Contracts");
  });
});
