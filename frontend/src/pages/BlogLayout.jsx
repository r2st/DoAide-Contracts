import { Link, Outlet } from "react-router-dom";

const ARTICLES = [
  {
    slug: "free-nda-template-india-2026",
    title: "Free NDA Template India 2026",
    description: "Download a free Non-Disclosure Agreement template compliant with Indian law. Covers mutual and one-way NDAs with key clauses explained.",
  },
  {
    slug: "employment-contract-checklist",
    title: "Employment Contract Checklist for Indian Companies",
    description: "Everything your employment agreement needs — from CTC structure to IP assignment. A practical checklist for HR teams and founders.",
  },
  {
    slug: "freelancer-agreement-guide",
    title: "Freelancer Agreement Guide: Protect Your Business",
    description: "How to create a solid freelancer agreement under Indian law. Covers IP ownership, payment terms, and contractor vs employee classification.",
  },
  {
    slug: "service-level-agreement-guide",
    title: "Service Level Agreement (SLA) Guide for IT Services",
    description: "How to draft an enforceable SLA for IT and managed services in India. Covers uptime guarantees, penalty structures, and escalation procedures.",
  },
  {
    slug: "consulting-agreement-guide",
    title: "Consulting Agreement Guide for Indian Businesses",
    description: "Complete guide to drafting consulting agreements in India. Covers scope, IP rights, TDS/GST implications, and key clauses with a free template.",
  },
  {
    slug: "stamp-duty-guide-india",
    title: "Stamp Duty on Contracts in India — Complete Guide",
    description: "Everything businesses need to know about stamp duty on contracts. State-wise rates, exemptions, penalties, and practical compliance tips.",
  },
  {
    slug: "indian-contract-act-essential-clauses",
    title: "Indian Contract Act 1872: Essential Clauses Every Business Agreement Needs",
    description: "Comprehensive guide to the Indian Contract Act 1872 — essential clauses, enforceability requirements, and practical tips for drafting legally sound business agreements.",
  },
  {
    slug: "freelancer-agreement-template-india",
    title: "Freelancer Agreement Template India: Protect Your Work and Get Paid",
    description: "Free freelancer agreement template for India. Learn how to protect your IP, ensure timely payments, and draft enforceable contracts as a freelancer under Indian law.",
  },
  {
    slug: "sla-template-indian-it-companies",
    title: "SLA Template: Complete Guide for Indian IT Companies",
    description: "Free SLA template and complete guide for Indian IT companies. Covers uptime guarantees, penalty structures, escalation procedures, and Indian legal compliance.",
  },
];

export { ARTICLES };

export default function BlogLayout() {
  return (
    <div className="blog-layout">
      <header className="blog-header">
        <Link to="/" className="blog-home-link">← Back to DoAide Contracts</Link>
        <h1 className="blog-title">DoAide Contracts Blog</h1>
        <p className="blog-subtitle">Guides and resources for contract management in India</p>
      </header>
      <Outlet />
    </div>
  );
}

export function BlogIndex() {
  return (
    <div className="blog-index">
      {ARTICLES.map((a) => (
        <Link key={a.slug} to={`/blog/${a.slug}`} className="blog-card">
          <h2>{a.title}</h2>
          <p>{a.description}</p>
          <span className="blog-read-more">Read more →</span>
        </Link>
      ))}
    </div>
  );
}
