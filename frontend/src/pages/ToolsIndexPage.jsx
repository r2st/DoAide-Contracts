import { Link } from "react-router-dom";
import ToolsNav from "../components/ToolsNav";
import { usePageTitle } from "../hooks/usePageTitle";

const TOOLS = [
  { path: "/tools/stamp-duty-calculator", title: "Stamp Duty Calculator", description: "Calculate stamp duty and registration charges for any Indian state and document type.", icon: "🏛️" },
  { path: "/tools/clause-library", title: "Contract Clause Library", description: "Browse 20+ contract clauses with explanations, usage guidance, and pitfalls — copy any clause.", icon: "📚" },
  { path: "/tools/nda-generator", title: "NDA Generator", description: "Generate a ready-to-use Non-Disclosure Agreement with customizable terms.", icon: "🔒" },
  { path: "/tools/readability-scorer", title: "Contract Readability Scorer", description: "Paste any contract text and get a readability score with plain-language suggestions.", icon: "📊" },
  { path: "/tools/risk-analyzer", title: "Contract Risk Analyzer", description: "AI-powered contract risk analysis — identify risky clauses, missing protections, and Indian law issues. Free, no login.", icon: "🤖" },
  { path: "/checker", title: "Clause Risk Checker", description: "Check your contract for risky clauses and missing essentials.", icon: "⚠️" },
  { path: "/generator", title: "Contract Generator", description: "Generate contracts from templates — NDA, employment, freelancer, and more.", icon: "📄" },
  { path: "/templates", title: "Template Library", description: "Browse free contract templates for common business needs.", icon: "📁" },
];

export default function ToolsIndexPage() {
  usePageTitle("Free Contract Tools — No Sign-up Required");
  return (
    <div className="tool-page">
      <ToolsNav />
      <main className="tool-main">
        <div className="tool-container">
          <h1 className="tool-title">Free Contract Tools</h1>
          <p className="tool-subtitle">
            Practical tools to draft, check, and understand contracts — no sign-up required.
          </p>
          <div className="tools-grid">
            {TOOLS.map((t) => (
              <Link key={t.path} to={t.path} className="tool-card">
                <span className="tool-card-icon">{t.icon}</span>
                <h2 className="tool-card-title">{t.title}</h2>
                <p className="tool-card-desc">{t.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Free Contract Tools",
            description: "Free contract tools — NDA generator, clause library, readability scorer, and more.",
            url: "https://contracts.doaide.com/tools",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            author: { "@type": "Organization", name: "Apprend Technologies", url: "https://doaide.com" },
          }),
        }}
      />
    </div>
  );
}
