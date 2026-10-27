import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ShareButtons from "../../components/ShareButtons";
import { usePageTitle } from "../../hooks/usePageTitle";
import { getMarkdownPost } from "./markdownPosts";

const SITE_URL = "https://contracts.doaide.com";

export default function MarkdownPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const post = getMarkdownPost(slug);

  usePageTitle(post?.title || "Article not found", post?.description, "article");

  useEffect(() => {
    if (!post) return;
    const url = `${SITE_URL}/blog/${post.slug}`;
    const schemas = [
      {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.description,
        author: { "@type": "Organization", name: "DoAide Contracts", url: SITE_URL },
        publisher: { "@type": "Organization", name: "DoAide Contracts", url: SITE_URL },
        datePublished: post.date,
        dateModified: post.date,
        mainEntityOfPage: url,
        url,
        inLanguage: "en-IN",
      },
    ];
    if (post.faq.length) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: post.faq.map((i) => ({
          "@type": "Question",
          name: i.q,
          acceptedAnswer: { "@type": "Answer", text: i.a },
        })),
      });
    }
    const scripts = schemas.map((schema) => {
      const el = document.createElement("script");
      el.type = "application/ld+json";
      el.text = JSON.stringify(schema);
      document.head.appendChild(el);
      return el;
    });
    return () => scripts.forEach((el) => el.remove());
  }, [post]);

  if (!post) {
    return (
      <article className="blog-article">
        <h1>Article not found</h1>
        <p><Link to="/blog">Browse all contract guides →</Link></p>
      </article>
    );
  }

  // Keep in-app links inside the SPA instead of doing a full page load.
  const onClick = (e) => {
    const a = e.target.closest("a");
    const href = a?.getAttribute("href");
    if (!href || !href.startsWith("/") || e.metaKey || e.ctrlKey || e.shiftKey || a.target) return;
    e.preventDefault();
    navigate(href);
  };

  return (
    <article className="blog-article">
      <h1>{post.title}</h1>
      <p className="blog-meta">
        Published {new Date(post.date).toLocaleDateString("en-IN", { month: "long", year: "numeric" })} · {post.readTime}
      </p>
      <div className="md-post" onClick={onClick} dangerouslySetInnerHTML={{ __html: post.html }} />

      {post.faq.length > 0 && (
        <section>
          <h2>Frequently Asked Questions</h2>
          {post.faq.map((item) => (
            <details key={item.q} className="md-faq">
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </section>
      )}

      <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", margin: "1rem 0" }}>
        <Link to="/templates" className="btn btn-primary">Browse Templates</Link>
        <Link to="/generator" className="btn btn-ghost">Generate Contract</Link>
        <Link to="/tools/stamp-duty-calculator" className="btn btn-ghost">Stamp Duty Calculator</Link>
      </div>

      <ShareButtons path={`/blog/${post.slug}`} text={post.title} />
    </article>
  );
}
