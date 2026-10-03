import { describe, expect, it } from "vitest";
import { errorMessage, getToken, isAbortError, setToken } from "./api";

describe("token management", () => {
  it("stores and retrieves a token", () => {
    setToken("abc123");
    expect(getToken()).toBe("abc123");
  });

  it("clears the token", () => {
    setToken("abc123");
    setToken(null);
    expect(getToken()).toBeNull();
  });
});

describe("errorMessage", () => {
  it("extracts detail string", () => {
    expect(errorMessage({ detail: "Not found" })).toBe("Not found");
  });

  it("joins array details", () => {
    expect(errorMessage({ detail: [{ msg: "Bad email" }, { msg: "Too short" }] })).toBe(
      "Bad email, Too short",
    );
  });

  it("uses fallback when detail is missing", () => {
    expect(errorMessage({})).toBe("Request failed");
  });

  it("uses fallback when detail is empty string", () => {
    expect(errorMessage({ detail: "" })).toBe("Request failed");
  });
});

describe("isAbortError", () => {
  it("detects AbortError by name", () => {
    const err = new DOMException("signal aborted", "AbortError");
    expect(isAbortError(err)).toBe(true);
  });

  it("returns false for other errors", () => {
    expect(isAbortError(new Error("nope"))).toBe(false);
  });

  it("returns false for null", () => {
    expect(isAbortError(null)).toBe(false);
  });
});
