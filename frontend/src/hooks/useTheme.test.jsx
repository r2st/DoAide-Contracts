import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ThemeProvider, useTheme } from "./useTheme";

function wrapper({ children }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}

describe("useTheme", () => {
  it("defaults to system", () => {
    const { result } = renderHook(() => useTheme(), { wrapper });
    expect(result.current.theme).toBe("system");
  });

  it("can set theme to dark", () => {
    const { result } = renderHook(() => useTheme(), { wrapper });
    act(() => result.current.setTheme("dark"));
    expect(result.current.theme).toBe("dark");
    expect(result.current.resolved).toBe("dark");
  });

  it("can set theme to light", () => {
    const { result } = renderHook(() => useTheme(), { wrapper });
    act(() => result.current.setTheme("light"));
    expect(result.current.theme).toBe("light");
    expect(result.current.resolved).toBe("light");
  });

  it("falls back to system for invalid values", () => {
    const { result } = renderHook(() => useTheme(), { wrapper });
    act(() => result.current.setTheme("invalid"));
    expect(result.current.theme).toBe("system");
  });
});
