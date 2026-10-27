import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

const SUFFIX = "DoAide Contracts";
const DEFAULT_TITLE = "DoAide Contracts — AI Contract Review & Generation";

function formatTitle(title) {
  return title ? `${title} · ${SUFFIX}` : DEFAULT_TITLE;
}

const PageTitleContext = createContext(null);

export function PageTitleProvider({ children }) {
  const [announcement, setAnnouncement] = useState("");
  const hasAnnounced = useRef(false);

  const set = useCallback((title) => {
    document.title = formatTitle(title);
    if (!hasAnnounced.current) {
      hasAnnounced.current = true;
      return;
    }
    setAnnouncement(title || DEFAULT_TITLE);
  }, []);

  return (
    <PageTitleContext.Provider value={set}>
      {children}
      <p className="visually-hidden" aria-live="polite" aria-atomic="true">
        {announcement}
      </p>
    </PageTitleContext.Provider>
  );
}

function setMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

// `description`, when given, becomes the page's meta description (and its Open
// Graph/Twitter twins); scripts/prerender.mjs bakes it into the static HTML.
// `ogType` defaults to "website"; blog posts should pass "article".
export function usePageTitle(title, description, ogType) {
  const set = useContext(PageTitleContext);
  useEffect(() => {
    if (set) set(title);
    else document.title = formatTitle(title);
    if (description) {
      setMeta("name", "description", description);
      setMeta("property", "og:description", description);
      setMeta("name", "twitter:description", description);
    }
    setMeta("property", "og:type", ogType || "website");
  }, [set, title, description, ogType]);
}

export { DEFAULT_TITLE, formatTitle };
