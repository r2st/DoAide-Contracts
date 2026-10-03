import { Link } from "react-router-dom";
import ShareButtons from "../../components/ShareButtons";
import { usePageTitle } from "../../hooks/usePageTitle";

export default function EmploymentContractChecklist() {
  usePageTitle("Employment Contract Checklist for Indian Companies 2026");

  return (
    <article className="blog-article">
      <h1>Employment Contract Checklist for Indian Companies</h1>
      <p className="blog-meta">Updated October 2026 · 10 min read</p>

      <section>
        <h2>Why Employment Contracts Matter in India</h2>
        <p>
          A well-drafted employment agreement protects both the employer and employee. Under
          Indian labour laws, certain terms must be included. Missing or ambiguous clauses
          lead to disputes that are costly and time-consuming to resolve.
        </p>
      </section>

      <section>
        <h2>Essential Clauses Checklist</h2>

        <h3>1. Job Description and Duties</h3>
        <p>Clearly define the role, designation, reporting structure, and key responsibilities.</p>

        <h3>2. Compensation Structure</h3>
        <p>
          Break down the CTC (Cost to Company) into basic salary, HRA, special allowance,
          and statutory components (PF, ESI, gratuity). Specify the payment frequency and TDS implications.
        </p>

        <h3>3. Probation Period</h3>
        <p>
          Standard probation in India is 3-6 months. Specify the terms for confirmation,
          extension, and termination during probation (typically 15 days notice).
        </p>

        <h3>4. Working Hours and Location</h3>
        <p>
          As per the Factories Act and state Shops & Establishments Acts, standard working
          hours are 8-9 hours per day. Include provisions for remote work and transfer.
        </p>

        <h3>5. Leave Policy</h3>
        <p>
          Indian labour law mandates earned leave, casual leave, and sick leave. The exact
          entitlement varies by state. Reference the company leave policy document.
        </p>

        <h3>6. Notice Period</h3>
        <p>
          Typically 30-90 days for confirmed employees. Specify whether payment in lieu of
          notice is allowed and how the notice period changes during probation.
        </p>

        <h3>7. Confidentiality and IP Assignment</h3>
        <p>
          Include confidentiality obligations that survive termination. IP assignment clauses
          should specify that work-related inventions belong to the employer.
        </p>

        <h3>8. Non-Compete and Non-Solicitation</h3>
        <p>
          Note: Post-employment non-compete clauses are generally unenforceable in India
          under Section 27 of the Indian Contract Act. Non-solicitation clauses for a
          reasonable period (6-12 months) are more likely to be upheld.
        </p>

        <h3>9. Termination Clauses</h3>
        <p>
          Define grounds for termination with and without cause. Include the process for
          disciplinary action and the required documentation.
        </p>

        <h3>10. Dispute Resolution</h3>
        <p>
          Specify the governing law, jurisdiction, and whether disputes go through
          arbitration or courts.
        </p>
      </section>

      <section>
        <h2>Generate Your Employment Agreement</h2>
        <p>
          Use our free employment contract generator to create a compliant agreement
          customized for your company.
        </p>
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", margin: "1rem 0" }}>
          <Link to="/template/employment" className="btn btn-primary">View Template</Link>
          <Link to="/generator?template=employment" className="btn btn-ghost">Generate Now</Link>
        </div>
      </section>

      <ShareButtons
        path="/blog/employment-contract-checklist"
        text="Employment Contract Checklist for Indian Companies 2026"
      />
    </article>
  );
}
