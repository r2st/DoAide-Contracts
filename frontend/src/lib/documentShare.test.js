import { describe, expect, it, vi } from "vitest";
import {
  WHATSAPP_TEXT_LIMIT,
  canShareFile,
  documentWhatsappText,
  documentWhatsappUrl,
  shareDocumentFile,
  slugifyFilename,
} from "./documentShare";

describe("slugifyFilename", () => {
  it("turns a title into a .txt filename", () => {
    expect(slugifyFilename("Non-Disclosure Agreement (NDA)")).toBe("non-disclosure-agreement-nda.txt");
  });
  it("falls back to contract.txt", () => {
    expect(slugifyFilename("")).toBe("contract.txt");
  });
});

describe("documentWhatsappText", () => {
  it("includes the title, the whole body and the link when short", () => {
    const text = documentWhatsappText("NDA", "Party A and Party B agree.", "https://x.test/generator");
    expect(text).toContain("*NDA*");
    expect(text).toContain("Party A and Party B agree.");
    expect(text).toContain("https://x.test/generator");
  });
  it("shortens long bodies to stay under the limit", () => {
    const body = "clause ".repeat(2000);
    const text = documentWhatsappText("NDA", body, "https://x.test/generator");
    expect(text.length).toBeLessThanOrEqual(WHATSAPP_TEXT_LIMIT);
    expect(text).toContain("shortened for WhatsApp");
    expect(text).toContain("https://x.test/generator");
  });
});

describe("documentWhatsappUrl", () => {
  it("builds an encoded wa.me link carrying the document", () => {
    const url = documentWhatsappUrl("NDA", "Body text", "https://x.test");
    expect(url.startsWith("https://wa.me/?text=")).toBe(true);
    expect(decodeURIComponent(url.split("text=")[1])).toContain("Body text");
  });
});

describe("file sharing", () => {
  it("is unsupported without navigator.share", async () => {
    expect(canShareFile({})).toBe(false);
    expect(await shareDocumentFile("NDA", "body", {})).toBe("unsupported");
  });
  it("shares the document as a .txt file when supported", async () => {
    const share = vi.fn().mockResolvedValue(undefined);
    const nav = { share, canShare: () => true };
    expect(await shareDocumentFile("My NDA", "body", nav)).toBe("shared");
    expect(share.mock.calls[0][0].files[0].name).toBe("my-nda.txt");
  });
  it("reports a cancelled share", async () => {
    const err = Object.assign(new Error("x"), { name: "AbortError" });
    const nav = { share: vi.fn().mockRejectedValue(err), canShare: () => true };
    expect(await shareDocumentFile("NDA", "body", nav)).toBe("cancelled");
  });
});
