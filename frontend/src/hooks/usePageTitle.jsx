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

export function usePageTitle(title) {
  const set = useContext(PageTitleContext);
  useEffect(() => {
    if (set) {
      set(title);
      return;
    }
    document.title = formatTitle(title);
  }, [set, title]);
}

export { DEFAULT_TITLE, formatTitle };
