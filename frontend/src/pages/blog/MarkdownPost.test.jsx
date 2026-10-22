import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import MarkdownPost from "./MarkdownPost";
import { MARKDOWN_POSTS, extractFaq, parseFrontmatter } from "./markdownPosts";

vi.mock("../../hooks/usePageTitle", () => ({ usePageTitle: () => {} }));
vi.mock("../../lib/share", () => ({
  fullUrl: (p) => `http://localhost${p}`,
  whatsappUrl: () => "https://wa.me",
  twitterUrl: () => "https://twitter.com",
  copyToClipboard: vi.fn(),
}));

// The prerender script builds its route list from the sitemap.
const sitemap = readFileSync(resolve(__dirname, "../../../public/sitemap.xml"), "utf8");

function renderAt(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/blog/:slug" element={<MarkdownPost />} />
      </Routes>
    </MemoryRouter>,
  );
}

describe("markdown blog posts", () => {
  it("loads every post with the frontmatter the page needs", () => {
    expect(MARKDOWN_POSTS.length).toBeGreaterThanOrEqual(3);
    for (const post of MARKDOWN_POSTS) {
      expect(post.slug).toMatch(/^[a-z0-9-]+$/);
      expect(post.description.length).toBeGreaterThan(50);
      expect(post.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(post.html).toContain("<h2");
      expect(post.faq.length).toBeGreaterThan(0);
      expect(sitemap).toContain(`<loc>https://contracts.doaide.com/blog/${post.slug}</loc>`);
    }
  });

  it("renders a post with its title, body and FAQ", () => {
    const post = MARKDOWN_POSTS[0];
    renderAt(`/blog/${post.slug}`);
    expect(screen.getByRole("heading", { level: 1, name: post.title })).toBeInTheDocument();
    expect(screen.getByText("Frequently Asked Questions")).toBeInTheDocument();
    expect(screen.getByText(post.faq[0].q)).toBeInTheDocument();
  });

  it("shows a not-found message for unknown slugs", () => {
    renderAt("/blog/does-not-exist");
    expect(screen.getByText("Article not found")).toBeInTheDocument();
  });

  it("parses frontmatter values containing colons", () => {
    const { data } = parseFrontmatter("---\ntitle: A: B\nslug: a-b\n---\nHello");
    expect(data).toEqual({ title: "A: B", slug: "a-b" });
  });

  it("moves the FAQ section out of the body", () => {
    const { faq, rest } = extractFaq("Intro\n\n## Frequently Asked Questions\n\n### Q1?\n\nA [link](/x).\n\n## After\n\nEnd");
    expect(faq).toEqual([{ q: "Q1?", a: "A link." }]);
    expect(rest).not.toContain("Q1?");
  });
});
