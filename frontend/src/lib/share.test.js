import { describe, expect, it, vi } from "vitest";
import { copyToClipboard, embedSnippet, fullUrl, origin, twitterUrl, whatsappUrl } from "./share";

describe("origin", () => {
  it("returns window.location.origin when available", () => {
    expect(origin()).toBe("http://localhost:3000");
  });
});

describe("fullUrl", () => {
  it("prepends origin to path", () => {
    expect(fullUrl("/templates")).toContain("/templates");
  });
});

describe("whatsappUrl", () => {
  it("encodes text and url into wa.me link", () => {
    const url = whatsappUrl("Hello", "https://example.com");
    expect(url).toContain("wa.me");
    expect(url).toContain(encodeURIComponent("Hello https://example.com"));
  });

  it("works without url", () => {
    const url = whatsappUrl("Hello");
    expect(url).toContain(encodeURIComponent("Hello"));
  });
});

describe("twitterUrl", () => {
  it("builds twitter intent url with text and url params", () => {
    const url = twitterUrl("Hello", "https://example.com");
    expect(url).toContain("twitter.com/intent/tweet");
    expect(url).toContain("text=Hello");
    expect(url).toContain("url=");
  });
});

describe("copyToClipboard", () => {
  it("uses navigator.clipboard when available", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText },
      writable: true,
      configurable: true,
    });

    const result = await copyToClipboard("test");
    expect(writeText).toHaveBeenCalledWith("test");
    expect(result).toBe(true);
  });
});

describe("embedSnippet", () => {
  it("returns an iframe tag with default dimensions", () => {
    const snippet = embedSnippet();
    expect(snippet).toContain("<iframe");
    expect(snippet).toContain('width="100%"');
    expect(snippet).toContain('height="400"');
    expect(snippet).toContain("/embed");
  });

  it("accepts custom dimensions", () => {
    const snippet = embedSnippet({ width: "500", height: "600" });
    expect(snippet).toContain('width="500"');
    expect(snippet).toContain('height="600"');
  });
});
