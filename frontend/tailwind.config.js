/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        canvas: "var(--canvas)",
        surface: "var(--surface)",
        "surface-hover": "var(--surface-hover)",
        line: "var(--line)",
        ink: "var(--ink)",
        "ink-soft": "var(--ink-soft)",
        "ink-strong": "var(--ink-strong)",
        "ink-muted": "var(--ink-muted)",
        brand: "var(--brand)",
        "brand-dark": "var(--brand-dark)",
        "brand-text": "var(--brand-text)",
        good: "var(--good)",
        warn: "var(--warn)",
        bad: "var(--bad)",
      },
      fontFamily: {
        display: ["Instrument Serif", "Georgia", "serif"],
        body: ["Schibsted Grotesk", "system-ui", "sans-serif"],
        mono: ["IBM Plex Mono", "ui-monospace", "monospace"],
      },
      borderRadius: {
        DEFAULT: "var(--radius)",
      },
    },
  },
  plugins: [],
};
