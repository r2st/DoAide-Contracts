import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it } from "vitest";
import BlogLayout, { BlogIndex, ARTICLES } from "./BlogLayout";

function renderBlog(path = "/blog") {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/blog" element={<BlogLayout />}>
          <Route index element={<BlogIndex />} />
          <Route path="test-article" element={<div>Test Article Content</div>} />
        </Route>
      </Routes>
    </MemoryRouter>,
  );
}

describe("BlogLayout", () => {
  it("shows blog title", () => {
    renderBlog();
    expect(screen.getByText("DoAide Contracts Blog")).toBeInTheDocument();
  });

  it("shows subtitle", () => {
    renderBlog();
    expect(screen.getByText(/Guides and resources/)).toBeInTheDocument();
  });

  it("shows back to home link", () => {
    renderBlog();
    expect(screen.getByText("← Back to DoAide Contracts")).toBeInTheDocument();
  });

  it("renders child route content", () => {
    renderBlog("/blog/test-article");
    expect(screen.getByText("Test Article Content")).toBeInTheDocument();
  });
});

describe("BlogIndex", () => {
  it("renders all articles", () => {
    renderBlog();
    for (const article of ARTICLES) {
      expect(screen.getByText(article.title)).toBeInTheDocument();
    }
  });

  it("shows article descriptions", () => {
    renderBlog();
    for (const article of ARTICLES) {
      expect(screen.getByText(article.description)).toBeInTheDocument();
    }
  });

  it("links to each article", () => {
    renderBlog();
    const readMoreLinks = screen.getAllByText("Read more →");
    expect(readMoreLinks).toHaveLength(ARTICLES.length);
  });

  it("has 3 articles", () => {
    expect(ARTICLES).toHaveLength(4);
  });
});
