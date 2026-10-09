import { useState } from "react";
import ToolsNav from "../components/ToolsNav";
import ShareButtons from "../components/ShareButtons";
import { usePageTitle } from "../hooks/usePageTitle";

const CLAUSES = [
  {
    category: "Termination",
    title: "Termination for Convenience",
    explanation: "Allows either party to end the contract at any time with prior written notice, without needing to prove a breach.",
    text: "Either party may terminate this Agreement at any time by providing [30] days' prior written notice to the other party. Upon termination, all obligations regarding Confidential Information and payment for services rendered shall survive.",
    whenToUse: "Use in service agreements, consulting contracts, or ongoing engagements where either party should have flexibility to exit.",
    pitfalls: "Setting too short a notice period may leave the other party scrambling. Ensure you define what happens to pending payments and deliverables.",
  },
  {
    category: "Termination",
    title: "Termination for Cause",
    explanation: "Allows a party to end the contract immediately if the other party materially breaches its obligations or becomes insolvent.",
    text: "Either party may terminate this Agreement immediately upon written notice if the other party: (a) materially breaches this Agreement and fails to cure within [15] days of written notice; or (b) becomes insolvent, files for bankruptcy, or has a receiver appointed over its assets.",
    whenToUse: "Essential in every commercial contract. Protects you if the other party fails to deliver or faces financial collapse.",
    pitfalls: "Define 'material breach' clearly in the contract. Without a cure period, minor disputes could trigger termination.",
  },
  {
    category: "Indemnity",
    title: "Mutual Indemnification",
    explanation: "Each party agrees to compensate the other for losses caused by their own breach, negligence, or misconduct.",
    text: "Each party shall indemnify, defend, and hold harmless the other party, its officers, directors, and employees from and against any claims, damages, losses, and expenses (including reasonable legal fees) arising out of or relating to the indemnifying party's breach of this Agreement or negligent acts or omissions.",
    whenToUse: "Standard in B2B service agreements, technology contracts, and partnerships where both parties carry risk.",
    pitfalls: "Uncapped indemnity can create unlimited financial exposure. Consider adding a liability cap or carve-outs for specific risks.",
  },
  {
    category: "Indemnity",
    title: "One-Way Indemnification (Service Provider)",
    explanation: "The service provider takes on the financial risk and agrees to compensate the client for losses arising from the provider's work.",
    text: "The Service Provider shall indemnify, defend, and hold harmless the Client from and against any third-party claims, damages, losses, and expenses (including reasonable attorney fees) arising from: (a) the Service Provider's breach of this Agreement; (b) the Service Provider's negligence or willful misconduct; or (c) any infringement of third-party intellectual property rights by the deliverables.",
    whenToUse: "When a client engages a vendor or agency and wants protection against the vendor's failures or IP infringement.",
    pitfalls: "Service providers should negotiate a liability cap. Clients should ensure IP indemnity is explicitly included.",
  },
  {
    category: "Confidentiality",
    title: "Standard Confidentiality",
    explanation: "Obligates both parties to keep shared confidential information secret and restrict its use to the purposes of the agreement.",
    text: "Each party agrees to hold in strict confidence all Confidential Information received from the other party and not to disclose such information to any third party without prior written consent. Confidential Information shall not include information that: (a) is publicly available; (b) was known prior to disclosure; (c) is independently developed; or (d) is required to be disclosed by law. This obligation shall survive termination for a period of [2] years.",
    whenToUse: "Use in virtually every business agreement — NDAs, service contracts, employment agreements, and partnerships.",
    pitfalls: "Failing to define exclusions (public info, prior knowledge) can make the clause unenforceable. Set a reasonable survival period.",
  },
  {
    category: "Confidentiality",
    title: "Enhanced Confidentiality with Return Obligation",
    explanation: "Goes beyond standard confidentiality by requiring the receiving party to return or destroy all confidential materials upon termination.",
    text: "Upon termination or expiration of this Agreement, or upon written request, the Receiving Party shall promptly return or destroy all Confidential Information and any copies thereof, and shall certify such return or destruction in writing within [10] business days. The Receiving Party may retain one archival copy solely for compliance purposes, subject to ongoing confidentiality obligations.",
    whenToUse: "In high-sensitivity engagements like technology licensing, M&A due diligence, or trade secret sharing.",
    pitfalls: "The archival copy exception is practical but should specify it cannot be used for commercial purposes.",
  },
  {
    category: "Force Majeure",
    title: "Standard Force Majeure",
    explanation: "Excuses non-performance when extraordinary events beyond a party's control (natural disasters, war, pandemics) prevent them from fulfilling obligations.",
    text: "Neither party shall be liable for any failure or delay in performing its obligations under this Agreement to the extent such failure or delay results from circumstances beyond the reasonable control of that party, including but not limited to: natural disasters, acts of God, war, terrorism, riots, embargoes, epidemics or pandemics, government orders, strikes, power failures, or internet or telecommunications failures. The affected party shall notify the other party promptly and use reasonable efforts to mitigate the impact. If the force majeure event continues for more than [60] days, either party may terminate this Agreement upon written notice.",
    whenToUse: "Include in every commercial agreement. Especially critical for supply chain contracts, event agreements, and long-term service contracts.",
    pitfalls: "Make the list of events specific rather than overly broad. Include a termination right for extended force majeure to avoid being locked in indefinitely.",
  },
  {
    category: "Dispute Resolution",
    title: "Arbitration Clause (India)",
    explanation: "Requires disputes to be resolved through private arbitration rather than court litigation, under Indian arbitration law.",
    text: "Any dispute, controversy, or claim arising out of or relating to this Agreement shall be resolved by binding arbitration in accordance with the Arbitration and Conciliation Act, 1996 (as amended). The arbitration shall be conducted by a sole arbitrator mutually appointed by the parties, seated in [City], India. The language of arbitration shall be English. The arbitral award shall be final and binding and may be enforced in any court of competent jurisdiction.",
    whenToUse: "Preferred in most B2B contracts in India. Arbitration is faster and more private than court litigation.",
    pitfalls: "Specify the seat of arbitration (determines governing procedural law). Without a mechanism for appointing the arbitrator if parties disagree, you may face delays.",
  },
  {
    category: "Dispute Resolution",
    title: "Mediation-First Clause",
    explanation: "Requires parties to attempt mediation before escalating to arbitration or litigation, saving time and cost.",
    text: "The parties agree to first attempt to resolve any dispute arising out of this Agreement through good-faith mediation administered by a mutually agreed mediator. Mediation shall be initiated within [15] days of written notice of the dispute and shall be conducted in [City], India. If the dispute is not resolved within [30] days of initiation of mediation, either party may proceed to arbitration or litigation as provided herein.",
    whenToUse: "Best for long-term business relationships where preserving the relationship matters — joint ventures, franchise agreements, distribution contracts.",
    pitfalls: "Without clear timelines, mediation can drag on indefinitely. Always include a fallback dispute resolution method.",
  },
  {
    category: "Payment Terms",
    title: "Net Payment Terms with Late Fee",
    explanation: "Defines when payment is due and imposes a financial penalty for late payments to incentivize timely settlement.",
    text: "All invoices shall be payable within [30] days of the invoice date ('Due Date'). Payments not received by the Due Date shall accrue interest at the rate of [1.5]% per month (or the maximum rate permitted by law, whichever is lower) from the Due Date until paid in full. The Client shall reimburse the Service Provider for all reasonable costs of collection, including legal fees.",
    whenToUse: "Essential in any service agreement, consulting contract, or supply agreement. Protects cash flow.",
    pitfalls: "Check the applicable usury laws — interest rates exceeding legal limits are unenforceable. Specify whether amounts are inclusive or exclusive of GST.",
  },
  {
    category: "Payment Terms",
    title: "Milestone-Based Payment",
    explanation: "Ties payments to the completion of specific deliverables or project milestones rather than calendar dates.",
    text: "Payment shall be made in installments upon completion and acceptance of each milestone as defined in Schedule [A]. The Client shall review and accept or reject each deliverable within [10] business days of submission. Acceptance shall not be unreasonably withheld. Rejected deliverables shall include written reasons, and the Service Provider shall have [5] business days to cure. Payment for each accepted milestone shall be due within [15] days of acceptance.",
    whenToUse: "Ideal for software development, construction, creative projects, and any engagement with defined deliverables.",
    pitfalls: "Define clear acceptance criteria upfront. Without 'deemed acceptance' after a review period, clients can delay payment indefinitely by not responding.",
  },
  {
    category: "IP Rights",
    title: "IP Assignment — Work for Hire",
    explanation: "Transfers all intellectual property rights in the work created under the agreement to the client.",
    text: "All work product, deliverables, inventions, and materials created by the Service Provider in the course of performing services under this Agreement ('Work Product') shall be the sole and exclusive property of the Client. The Service Provider hereby irrevocably assigns to the Client all rights, title, and interest in and to the Work Product, including all intellectual property rights therein. The Service Provider shall execute any documents reasonably necessary to perfect such assignment.",
    whenToUse: "When hiring developers, designers, writers, or any contractor where you need to own the output — software, designs, content.",
    pitfalls: "Under Indian Copyright Act, 1957, assignment must be in writing to be valid. Ensure pre-existing IP and third-party tools are excluded via a license-back clause.",
  },
  {
    category: "IP Rights",
    title: "IP License Grant (Non-Exclusive)",
    explanation: "Grants the licensee limited rights to use intellectual property without transferring ownership.",
    text: "The Licensor hereby grants the Licensee a non-exclusive, non-transferable, revocable license to use the Licensed Materials solely for the purposes described in this Agreement and within the territory of [India]. The Licensee shall not sublicense, modify, reverse-engineer, or create derivative works of the Licensed Materials without prior written consent. All rights not expressly granted herein are reserved by the Licensor.",
    whenToUse: "When licensing software, content, brand assets, or technology to another party while retaining ownership.",
    pitfalls: "Define scope, territory, and duration clearly. A vaguely defined license can be interpreted broadly against the licensor.",
  },
  {
    category: "Non-Compete",
    title: "Non-Compete Clause (Employment)",
    explanation: "Restricts an employee from joining or starting a competing business for a specified period after leaving.",
    text: "During the term of employment and for a period of [12] months following termination for any reason, the Employee shall not directly or indirectly engage in, own, manage, or be employed by any business that competes with the Employer's business within [city/region]. This restriction applies to the specific business activities the Employee was involved in during the last [12] months of employment.",
    whenToUse: "In employment contracts for key employees, senior management, or roles with access to trade secrets and strategic information.",
    pitfalls: "Non-compete clauses are generally unenforceable in India under Section 27 of the Indian Contract Act (restraint of trade). Courts typically only enforce reasonable restrictions during employment, not post-termination. Consider a non-solicitation clause instead.",
  },
  {
    category: "Non-Compete",
    title: "Non-Solicitation Clause",
    explanation: "Prevents a party from poaching the other party's employees or customers for a specified period.",
    text: "For a period of [12] months following the termination of this Agreement, neither party shall directly or indirectly solicit, recruit, or hire any employee of the other party who was involved in the performance of this Agreement. Neither party shall solicit or divert any client or customer of the other party with whom they had direct contact during the term of this Agreement.",
    whenToUse: "More enforceable than non-compete in India. Use in employment contracts, consulting agreements, and partnership dissolutions.",
    pitfalls: "Ensure the restriction is reasonable in scope and duration. Overly broad non-solicitation clauses may still be challenged under Section 27.",
  },
  {
    category: "Limitation of Liability",
    title: "Mutual Limitation of Liability",
    explanation: "Caps the maximum financial liability each party can face under the contract and excludes indirect damages.",
    text: "IN NO EVENT SHALL EITHER PARTY BE LIABLE TO THE OTHER FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, REVENUE, DATA, OR BUSINESS OPPORTUNITY, REGARDLESS OF THE CAUSE OF ACTION OR THEORY OF LIABILITY. EACH PARTY'S TOTAL AGGREGATE LIABILITY UNDER THIS AGREEMENT SHALL NOT EXCEED THE TOTAL FEES PAID OR PAYABLE UNDER THIS AGREEMENT DURING THE [12] MONTHS IMMEDIATELY PRECEDING THE EVENT GIVING RISE TO THE CLAIM.",
    whenToUse: "Standard in technology agreements, SaaS contracts, and B2B service agreements. Protects both parties from catastrophic liability.",
    pitfalls: "Ensure carve-outs for indemnification obligations, confidentiality breaches, and IP infringement — these typically should not be subject to the cap.",
  },
  {
    category: "Limitation of Liability",
    title: "Liability Cap with Carve-Outs",
    explanation: "Sets a general liability cap but excludes specific high-risk obligations that should have higher or unlimited exposure.",
    text: "Subject to the exceptions below, each party's total aggregate liability under this Agreement shall not exceed [2] times the total fees paid or payable in the [12] months preceding the claim. This limitation shall not apply to: (a) either party's indemnification obligations; (b) breaches of confidentiality; (c) infringement of intellectual property rights; or (d) liability arising from gross negligence or willful misconduct.",
    whenToUse: "When a standard cap is too blunt — use this when certain obligations warrant higher exposure (IP, confidentiality, gross negligence).",
    pitfalls: "The carve-outs create uncapped exposure for those items. Consider adding a separate higher cap for carved-out liabilities rather than leaving them unlimited.",
  },
  {
    category: "Data Protection",
    title: "Data Processing and Privacy Clause",
    explanation: "Governs how personal data is collected, processed, stored, and protected under the agreement, aligned with Indian data protection law.",
    text: "Each party shall comply with all applicable data protection laws, including the Digital Personal Data Protection Act, 2023 (DPDPA), as amended. Where a party processes personal data on behalf of the other ('Data Fiduciary'), it shall: (a) process such data only for the purposes specified in this Agreement; (b) implement appropriate technical and organisational security measures; (c) not transfer personal data outside India except in compliance with applicable law; (d) notify the Data Fiduciary of any personal data breach within [72] hours; and (e) delete or return all personal data upon termination of this Agreement.",
    whenToUse: "Required in any agreement involving exchange or processing of personal data — SaaS agreements, HR outsourcing, marketing services, analytics.",
    pitfalls: "India's DPDPA is evolving — stay updated on rules around cross-border transfers and consent requirements. Ensure sub-processor obligations are covered.",
  },
  {
    category: "Data Protection",
    title: "Data Security Standards",
    explanation: "Specifies the minimum security measures a party must implement when handling the other party's data.",
    text: "The Receiving Party shall implement and maintain industry-standard security measures to protect the Disclosing Party's data, including but not limited to: (a) encryption of data in transit and at rest (AES-256 or equivalent); (b) access controls with role-based permissions; (c) regular security audits and vulnerability assessments; (d) incident response procedures; and (e) employee training on data security. The Receiving Party shall provide evidence of compliance upon reasonable request and shall promptly remediate any identified security deficiencies.",
    whenToUse: "In technology agreements, cloud service contracts, and any engagement where sensitive business or personal data is shared.",
    pitfalls: "Specify who bears the cost of security audits. Vague terms like 'reasonable security' are hard to enforce — be specific about standards.",
  },
  {
    category: "General",
    title: "Governing Law and Jurisdiction",
    explanation: "Specifies which country's and state's laws govern the contract and which courts have authority over disputes.",
    text: "This Agreement shall be governed by and construed in accordance with the laws of India. Subject to the arbitration provisions herein, the courts of [City], India shall have exclusive jurisdiction over any disputes arising under or in connection with this Agreement.",
    whenToUse: "Include in every contract. Critical for cross-border agreements or when parties are in different Indian states.",
    pitfalls: "Choose a jurisdiction convenient for enforcement. Conflicting jurisdiction and arbitration clauses can create confusion — ensure they are consistent.",
  },
  {
    category: "General",
    title: "Entire Agreement / Amendment",
    explanation: "Confirms the written contract is the complete agreement and cannot be changed except in writing signed by both parties.",
    text: "This Agreement, together with all Schedules and Exhibits attached hereto, constitutes the entire agreement between the parties concerning the subject matter hereof and supersedes all prior negotiations, representations, warranties, commitments, and agreements. No amendment, modification, or waiver of any provision of this Agreement shall be effective unless in writing and signed by both parties.",
    whenToUse: "Standard boilerplate for every commercial contract. Prevents parties from claiming oral promises or prior drafts modify the agreement.",
    pitfalls: "Ensure all important side agreements or schedules are referenced. If you rely on representations made during negotiations, document them in the contract.",
  },
  {
    category: "General",
    title: "Severability",
    explanation: "Ensures that if one clause is found invalid or unenforceable, the rest of the contract remains in effect.",
    text: "If any provision of this Agreement is held to be invalid, illegal, or unenforceable by a court of competent jurisdiction, the remaining provisions shall continue in full force and effect. The invalid provision shall be modified to the minimum extent necessary to make it valid and enforceable while preserving the parties' original intent.",
    whenToUse: "Standard boilerplate clause for all contracts. Especially important when including clauses that may be challenged (non-compete, penalty clauses).",
    pitfalls: "Without this clause, a court finding one provision invalid could void the entire contract. Keep it in every agreement.",
  },
];

const CATEGORIES = [...new Set(CLAUSES.map((c) => c.category))];

const FAQ_ITEMS = [
  {
    q: "What is a contract clause library?",
    a: "A contract clause library is a curated collection of standard legal clauses commonly used in business agreements. Each clause includes the legal text, a plain-English explanation, guidance on when to use it, and common pitfalls to avoid. It helps you draft contracts faster without starting from scratch.",
  },
  {
    q: "Are these clauses legally valid in India?",
    a: "These clauses follow standard Indian legal conventions and reference applicable Indian laws (Indian Contract Act 1872, Arbitration Act 1996, DPDPA 2023). However, they are templates and should be reviewed by a qualified lawyer for your specific situation, especially for high-value agreements.",
  },
  {
    q: "Can I copy and use these clauses in my contracts?",
    a: "Yes. All clauses are free to copy and use in your agreements. Click the 'Copy' button on any clause to copy it to your clipboard. Replace the bracketed placeholders (like [30] days or [City]) with your specific values.",
  },
  {
    q: "What are the most important clauses in a business contract?",
    a: "Every business contract should include: (1) scope of work / obligations, (2) payment terms, (3) termination provisions, (4) confidentiality, (5) limitation of liability, (6) indemnification, (7) dispute resolution, and (8) governing law. The specific clauses you need depend on the type of agreement.",
  },
];

export default function ClauseLibraryPage() {
  usePageTitle("Free Contract Clause Library — 20+ Ready-to-Use Clauses");
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [copiedIdx, setCopiedIdx] = useState(null);
  const [expandedIdx, setExpandedIdx] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);

  const filtered = CLAUSES.filter((c) => {
    if (filter !== "All" && c.category !== filter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        c.title.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q) ||
        c.explanation.toLowerCase().includes(q) ||
        c.text.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const copyClause = async (idx, text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIdx(idx);
      setTimeout(() => setCopiedIdx(null), 2000);
    } catch { /* clipboard unavailable */ }
  };

  return (
    <div className="tool-page">
      <ToolsNav />
      <main className="tool-main" style={{ maxWidth: "860px" }}>
        <div className="tool-container">
          <h1 className="tool-title">Contract Clause Library</h1>
          <p className="tool-subtitle">
            Browse {CLAUSES.length}+ common contract clauses with plain-English explanations, usage guidance, and pitfalls. Copy any clause into your contract — free, no sign-up required.
          </p>

          <div className="calc-card" style={{ padding: "0.75rem 1rem" }}>
            <input
              type="text"
              className="calc-input"
              placeholder="Search clauses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ margin: 0, border: "none", background: "transparent", padding: "0.25rem 0" }}
              aria-label="Search clauses"
            />
          </div>

          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            <button className={`btn ${filter === "All" ? "btn-primary" : "btn-ghost"}`} onClick={() => setFilter("All")}>All ({CLAUSES.length})</button>
            {CATEGORIES.map((cat) => {
              const count = CLAUSES.filter((c) => c.category === cat).length;
              return (
                <button key={cat} className={`btn ${filter === cat ? "btn-primary" : "btn-ghost"}`} onClick={() => setFilter(cat)}>
                  {cat} ({count})
                </button>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="calc-card" style={{ textAlign: "center", color: "var(--ink-soft)" }}>
              No clauses match your search. Try a different keyword.
            </div>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {filtered.map((clause, i) => {
              const globalIdx = CLAUSES.indexOf(clause);
              const isExpanded = expandedIdx === globalIdx;
              return (
                <div key={globalIdx} className="calc-card">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem" }}>
                    <div>
                      <span style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--brand)", fontWeight: 600 }}>{clause.category}</span>
                      <h3 style={{ margin: "0.25rem 0 0.5rem", fontSize: "1rem", fontWeight: 600, color: "var(--ink)" }}>{clause.title}</h3>
                    </div>
                    <button className="btn btn-ghost" style={{ flexShrink: 0, fontSize: "0.8rem", minHeight: "44px" }} onClick={() => copyClause(globalIdx, clause.text)}>
                      {copiedIdx === globalIdx ? "Copied!" : "Copy"}
                    </button>
                  </div>
                  <p style={{ fontSize: "0.85rem", lineHeight: 1.6, color: "var(--ink-soft)", margin: "0 0 0.75rem" }}>{clause.explanation}</p>
                  <div style={{
                    background: "var(--surface-dim, rgba(0,0,0,0.15))", borderRadius: "6px", padding: "0.75rem 1rem",
                    fontSize: "0.82rem", lineHeight: 1.7, color: "var(--ink-soft)", fontFamily: "inherit",
                  }}>
                    {clause.text}
                  </div>
                  <button
                    className="btn btn-ghost"
                    style={{ fontSize: "0.8rem", marginTop: "0.5rem", minHeight: "44px" }}
                    onClick={() => setExpandedIdx(isExpanded ? null : globalIdx)}
                    aria-expanded={isExpanded}
                  >
                    {isExpanded ? "Hide guidance ▲" : "When to use & pitfalls ▼"}
                  </button>
                  {isExpanded && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "0.25rem" }}>
                      <div>
                        <strong style={{ fontSize: "0.8rem", color: "var(--brand)" }}>When to use:</strong>
                        <p style={{ fontSize: "0.82rem", lineHeight: 1.6, color: "var(--ink-soft)", margin: "0.25rem 0 0" }}>{clause.whenToUse}</p>
                      </div>
                      <div>
                        <strong style={{ fontSize: "0.8rem", color: "var(--warn, #f59e0b)" }}>Common pitfalls:</strong>
                        <p style={{ fontSize: "0.82rem", lineHeight: 1.6, color: "var(--ink-soft)", margin: "0.25rem 0 0" }}>{clause.pitfalls}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <ShareButtons path="/tools/clause-library" text="Free Contract Clause Library — 20+ Ready-to-Use Clauses — DoAide Contracts" />

          <section aria-labelledby="clause-faq-heading">
            <h2 id="clause-faq-heading" style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--ink)", margin: "2rem 0 1rem" }}>
              Frequently Asked Questions
            </h2>
            <dl style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {FAQ_ITEMS.map((item, i) => (
                <div key={i} className="calc-card" style={{ padding: 0 }}>
                  <dt>
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      aria-expanded={openFaq === i}
                      style={{
                        width: "100%", textAlign: "left", padding: "0.75rem 1rem",
                        display: "flex", justifyContent: "space-between", alignItems: "center",
                        background: "none", border: "none", color: "var(--ink)", cursor: "pointer",
                        fontSize: "0.9rem", fontWeight: 500, minHeight: "44px",
                      }}
                    >
                      {item.q}
                      <span aria-hidden="true" style={{ flexShrink: 0, marginLeft: "0.5rem" }}>{openFaq === i ? "−" : "+"}</span>
                    </button>
                  </dt>
                  {openFaq === i && (
                    <dd style={{ padding: "0 1rem 0.75rem", margin: 0, fontSize: "0.85rem", lineHeight: 1.7, color: "var(--ink-soft)" }}>
                      {item.a}
                    </dd>
                  )}
                </div>
              ))}
            </dl>
          </section>

          <div className="calc-card" style={{ textAlign: "center" }}>
            <p style={{ fontSize: "0.9rem", color: "var(--ink-soft)", marginBottom: "0.75rem" }}>Want to build full contracts from these clauses?</p>
            <a href="/register" className="btn btn-primary" style={{ display: "inline-block" }}>Sign up free</a>
          </div>
        </div>
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Contract Clause Library",
            description: "Browse 20+ common contract clauses with plain-English explanations, usage guidance, and pitfalls. Free to copy and use.",
            url: "https://contracts.doaide.com/tools/clause-library",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            author: { "@type": "Organization", name: "Apprend Technologies", url: "https://doaide.com" },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQ_ITEMS.map((item) => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: { "@type": "Answer", text: item.a },
            })),
          }),
        }}
      />
    </div>
  );
}
