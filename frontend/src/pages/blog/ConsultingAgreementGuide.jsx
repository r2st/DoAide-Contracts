import { Link } from "react-router-dom";
import ShareButtons from "../../components/ShareButtons";
import { usePageTitle } from "../../hooks/usePageTitle";

export default function ConsultingAgreementGuide() {
  usePageTitle("Consulting Agreement Guide for Indian Businesses — Key Clauses & Template");

  return (
    <article className="blog-article">
      <h1>Consulting Agreement Guide for Indian Businesses</h1>
      <p className="blog-meta">Updated October 2026 · 9 min read</p>

      <section>
        <h2>What Is a Consulting Agreement?</h2>
        <p>
          A Consulting Agreement is a legally binding contract between a company and an
          independent consultant or consulting firm. It defines the scope of engagement,
          deliverables, fees, intellectual property rights, and termination provisions.
          Unlike an employment agreement, a consulting agreement establishes an independent
          contractor relationship — the consultant is not an employee.
        </p>
        <p>
          In India, consulting agreements are governed by the Indian Contract Act, 1872. They
          are increasingly important as businesses engage external experts for technology,
          management, legal, financial, and strategic advisory services.
        </p>
      </section>

      <section>
        <h2>When Do You Need a Consulting Agreement?</h2>
        <ul>
          <li><strong>Hiring a technology consultant</strong> for software development, cloud migration, or IT strategy</li>
          <li><strong>Engaging a management consultant</strong> for business process optimization or market entry strategy</li>
          <li><strong>Working with a legal or compliance advisor</strong> on regulatory matters</li>
          <li><strong>Hiring a financial consultant</strong> for fundraising, valuation, or tax planning</li>
          <li><strong>Engaging a marketing consultant</strong> for brand strategy, digital marketing, or SEO</li>
          <li><strong>Advisory board or fractional CXO engagements</strong></li>
        </ul>
      </section>

      <section>
        <h2>Key Clauses Every Consulting Agreement Must Have</h2>

        <h3>1. Scope of Engagement</h3>
        <p>
          Clearly define the consulting services, deliverables, milestones, and expected outcomes.
          Ambiguous scope is the number one cause of disputes in consulting engagements. List specific
          tasks and deliverables — not just general descriptions like &quot;advisory services.&quot;
        </p>

        <h3>2. Independent Contractor Status</h3>
        <p>
          Explicitly state that the consultant is an independent contractor, not an employee. This is
          critical in India because misclassification can trigger obligations under the Employees&apos;
          Provident Funds Act, ESI Act, and other labour laws. The consultant should be responsible
          for their own tax filings, GST registration, and insurance.
        </p>

        <h3>3. Compensation and Payment Terms</h3>
        <p>
          Specify the total fee or rate structure (hourly, monthly retainer, milestone-based, or
          project fee). Address:
        </p>
        <ul>
          <li>Payment schedule and invoicing requirements</li>
          <li>GST applicability — consultants above the threshold must charge GST</li>
          <li>TDS deduction at applicable rates (typically 10% under Section 194J for professional services)</li>
          <li>Reimbursable expenses policy</li>
          <li>Late payment interest</li>
        </ul>

        <h3>4. Intellectual Property Rights</h3>
        <p>
          IP ownership is often the most negotiated clause. Common approaches:
        </p>
        <ul>
          <li><strong>Full assignment:</strong> All work product becomes the company&apos;s property upon payment</li>
          <li><strong>Licence model:</strong> Company gets an exclusive licence; consultant retains ownership</li>
          <li><strong>Pre-existing IP carve-out:</strong> Consultant retains rights to existing tools and frameworks, with a licence for the company to use them</li>
        </ul>
        <p>
          In India, IP assignment should be documented clearly to avoid disputes. The Indian Copyright
          Act, 1957, and the Patents Act, 1970, provide the legal framework.
        </p>

        <h3>5. Confidentiality</h3>
        <p>
          Consultants often access sensitive business information — strategy documents, financial data,
          client lists, and trade secrets. Include a confidentiality clause specifying:
        </p>
        <ul>
          <li>Definition of confidential information</li>
          <li>Obligations during and after the engagement (typically 2-3 years post-termination)</li>
          <li>Permitted disclosures (legal requirements, pre-existing knowledge)</li>
        </ul>

        <h3>6. Non-Compete and Non-Solicitation</h3>
        <p>
          While post-termination non-compete clauses are generally unenforceable in India under
          Section 27 of the Indian Contract Act, non-solicitation clauses (prohibiting solicitation
          of clients and employees) are more commonly upheld. During the engagement, non-compete
          restrictions are generally valid.
        </p>

        <h3>7. Termination Provisions</h3>
        <p>
          Define how either party can exit the engagement:
        </p>
        <ul>
          <li>Notice period for termination without cause (typically 15-30 days)</li>
          <li>Immediate termination for cause (breach, fraud, misconduct)</li>
          <li>Obligations on termination — return of materials, payment for completed work, transition assistance</li>
        </ul>

        <h3>8. Liability Limitation</h3>
        <p>
          Cap the consultant&apos;s total liability to the fees paid under the agreement. Exclude
          indirect, consequential, and punitive damages. This protects both parties from
          disproportionate risk.
        </p>

        <h3>9. Dispute Resolution</h3>
        <p>
          Specify the dispute resolution mechanism — arbitration is preferred for business disputes
          in India under the Arbitration and Conciliation Act, 1996. Define the seat of arbitration
          and the governing state.
        </p>
      </section>

      <section>
        <h2>Tax Implications for Consulting Agreements in India</h2>
        <ul>
          <li><strong>TDS:</strong> The company must deduct TDS at 10% on consulting fees under Section 194J (professional services) of the Income Tax Act</li>
          <li><strong>GST:</strong> Consultants registered under GST must charge 18% GST on services. The threshold for mandatory registration is ₹20 lakh (₹10 lakh for special category states)</li>
          <li><strong>Invoicing:</strong> GST-registered consultants must issue tax invoices with GSTIN, SAC code, and applicable tax breakup</li>
          <li><strong>Reverse charge:</strong> If the consultant is unregistered and the company is registered, reverse charge may apply</li>
        </ul>
      </section>

      <section>
        <h2>Common Mistakes to Avoid</h2>
        <ol>
          <li><strong>Vague scope of work</strong> — leading to scope creep and disputes over deliverables</li>
          <li><strong>Missing IP assignment clause</strong> — resulting in unclear ownership of work product</li>
          <li><strong>Treating consultants as employees</strong> — providing office space, fixed hours, and employee benefits can create deemed employment</li>
          <li><strong>No conflict of interest clause</strong> — the consultant may work with competitors simultaneously</li>
          <li><strong>Overlooking TDS and GST compliance</strong> — leading to tax penalties for both parties</li>
          <li><strong>Relying on verbal agreements</strong> — always have a written contract, even for short engagements</li>
        </ol>
      </section>

      <section>
        <h2>Generate Your Consulting Agreement</h2>
        <p>
          Use our free consulting agreement template to create a professional, legally structured
          agreement in minutes. The template covers all essential clauses for Indian businesses,
          including IP assignment, confidentiality, tax compliance, and dispute resolution.
        </p>
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "1rem" }}>
          <Link to="/generator?template=consulting-agreement" className="btn btn-primary">Generate Consulting Agreement →</Link>
          <Link to="/template/consulting-agreement" className="btn btn-ghost">Preview Template →</Link>
          <Link to="/tools/risk-analyzer" className="btn btn-ghost">Analyze a Contract →</Link>
        </div>
      </section>

      <ShareButtons
        path="/blog/consulting-agreement-guide"
        text="Consulting Agreement Guide for Indian Businesses — key clauses, tax implications, and free template"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Consulting Agreement Guide for Indian Businesses — Key Clauses & Template",
            description: "Complete guide to drafting consulting agreements in India. Covers scope, IP rights, tax implications (TDS, GST), and key clauses with a free template.",
            author: { "@type": "Organization", name: "DoAide", url: "https://doaide.com" },
            publisher: { "@type": "Organization", name: "DoAide", url: "https://doaide.com" },
            datePublished: "2026-10-10",
            dateModified: "2026-10-10",
            mainEntityOfPage: "https://contracts.doaide.com/blog/consulting-agreement-guide",
          }),
        }}
      />
    </article>
  );
}
