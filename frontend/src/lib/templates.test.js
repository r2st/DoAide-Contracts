import { describe, expect, it } from "vitest";
import { TEMPLATES, fillTemplate, getTemplateBySlug } from "./templates";

describe("TEMPLATES", () => {
  it("has at least 9 templates", () => {
    expect(TEMPLATES.length).toBeGreaterThanOrEqual(9);
  });

  it("includes the new consulting, non-compete, and vendor templates", () => {
    expect(getTemplateBySlug("consulting-agreement")).not.toBeNull();
    expect(getTemplateBySlug("non-compete")).not.toBeNull();
    expect(getTemplateBySlug("vendor-agreement")).not.toBeNull();
  });

  it("each template has required fields", () => {
    for (const t of TEMPLATES) {
      expect(t.slug).toBeTruthy();
      expect(t.name).toBeTruthy();
      expect(t.category).toBeTruthy();
      expect(t.description).toBeTruthy();
      expect(t.icon).toBeTruthy();
      expect(t.fields.length).toBeGreaterThan(0);
      expect(t.body).toBeTruthy();
    }
  });

  it("all slugs are unique", () => {
    const slugs = TEMPLATES.map((t) => t.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("all templates have at least one required field", () => {
    for (const t of TEMPLATES) {
      expect(t.fields.some((f) => f.required)).toBe(true);
    }
  });
});

describe("getTemplateBySlug", () => {
  it("returns the correct template", () => {
    const nda = getTemplateBySlug("nda");
    expect(nda).not.toBeNull();
    expect(nda.name).toContain("NDA");
  });

  it("returns null for unknown slug", () => {
    expect(getTemplateBySlug("nonexistent")).toBeNull();
  });
});

describe("fillTemplate", () => {
  it("replaces placeholders with values", () => {
    const body = "Hello {{name}}, your company is {{company}}.";
    const result = fillTemplate(body, { name: "Alice", company: "Acme" });
    expect(result).toBe("Hello Alice, your company is Acme.");
  });

  it("leaves unfilled placeholders intact", () => {
    const body = "Hello {{name}}, your company is {{company}}.";
    const result = fillTemplate(body, { name: "Alice" });
    expect(result).toBe("Hello Alice, your company is {{company}}.");
  });

  it("handles empty values object", () => {
    const body = "Hello {{name}}.";
    const result = fillTemplate(body, {});
    expect(result).toBe("Hello {{name}}.");
  });
});
