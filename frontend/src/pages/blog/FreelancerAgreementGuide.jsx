import { Link } from "react-router-dom";
import ShareButtons from "../../components/ShareButtons";
import { usePageTitle } from "../../hooks/usePageTitle";

export default function FreelancerAgreementGuide() {
  usePageTitle("Freelancer Agreement Guide — Protect Your Business in India");

  return (
    <article className="blog-article">
      <h1>Freelancer Agreement Guide: Protect Your Business</h1>
      <p className="blog-meta">Updated October 2026 · 9 min read</p>

      <section>
        <h2>Why You Need a Freelancer Agreement</h2>
        <p>
          Hiring freelancers and consultants without a written agreement exposes your
          business to significant risks: IP disputes, payment disagreements, and
          misclassification as employer-employee relationships. A proper consultant
          agreement under Indian law protects both parties.
        </p>
      </section>

      <section>
        <h2>Contractor vs Employee in India</h2>
        <p>
          Indian tax and labour law distinguishes between employees and independent contractors.
          Getting this wrong can trigger PF, ESI, and gratuity obligations. Key factors courts
          consider:
        </p>
        <ul>
          <li><strong>Control:</strong> Do you control how the work is done, or only the result?</li>
          <li><strong>Tools:</strong> Does the worker use their own tools and equipment?</li>
          <li><strong>Exclusivity:</strong> Can the worker take on other clients?</li>
          <li><strong>Integration:</strong> Is the worker integrated into your business operations?</li>
        </ul>
        <p>
          If the relationship looks like employment, a freelancer agreement alone won&apos;t
          protect you. Structure the engagement to reflect genuine independence.
        </p>
      </section>

      <section>
        <h2>Essential Clauses</h2>

        <h3>1. Scope of Work</h3>
        <p>
          Define deliverables, milestones, and acceptance criteria precisely. Vague scopes
          lead to scope creep and disputes.
        </p>

        <h3>2. Payment Terms</h3>
        <p>
          Specify total fee, payment schedule, and invoicing requirements. Include GST
          registration details and TDS obligations (Section 194J for professional services
          at 10%, or Section 194C for contractors at 1-2%).
        </p>

        <h3>3. Intellectual Property</h3>
        <p>
          Under Indian copyright law, the creator owns the copyright by default — even
          for commissioned work. You must have an explicit IP assignment clause. Ensure
          the assignment is effective upon full payment.
        </p>

        <h3>4. Confidentiality</h3>
        <p>
          Protect your business information with a confidentiality clause that survives
          the agreement. Define what is confidential and the duration of the obligation.
        </p>

        <h3>5. Non-Solicitation</h3>
        <p>
          Prevent the freelancer from poaching your employees or clients for a reasonable
          period (6-12 months). Unlike non-compete, non-solicitation clauses are more
          likely to be enforced in India.
        </p>

        <h3>6. Termination</h3>
        <p>
          Allow either party to terminate with notice (15-30 days). Specify what happens
          to work-in-progress and payment for completed work upon termination.
        </p>

        <h3>7. Liability Cap</h3>
        <p>
          Limit the freelancer&apos;s total liability to the fees paid. This is standard
          practice and protects both parties from disproportionate claims.
        </p>
      </section>

      <section>
        <h2>Tax Implications</h2>
        <ul>
          <li>Freelancers must issue invoices with GST (if registered)</li>
          <li>Companies must deduct TDS at applicable rates</li>
          <li>Form 16A must be issued to the freelancer</li>
          <li>No PF/ESI obligations for genuine contractor relationships</li>
        </ul>
      </section>

      <section>
        <h2>Create Your Freelancer Agreement</h2>
        <p>
          Use our free template to generate a professionally drafted freelancer agreement
          in minutes.
        </p>
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", margin: "1rem 0" }}>
          <Link to="/template/freelancer" className="btn btn-primary">View Template</Link>
          <Link to="/generator?template=freelancer" className="btn btn-ghost">Generate Now</Link>
        </div>
      </section>

      <ShareButtons
        path="/blog/freelancer-agreement-guide"
        text="Freelancer Agreement Guide for Indian Businesses"
      />
    </article>
  );
}
