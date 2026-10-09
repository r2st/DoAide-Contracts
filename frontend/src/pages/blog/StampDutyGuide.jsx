import { Link } from "react-router-dom";
import ShareButtons from "../../components/ShareButtons";
import { usePageTitle } from "../../hooks/usePageTitle";

export default function StampDutyGuide() {
  usePageTitle("Stamp Duty on Contracts in India — Complete Guide for Businesses (2026)");

  return (
    <article className="blog-article">
      <h1>Stamp Duty on Contracts in India — Complete Guide for Businesses</h1>
      <p className="blog-meta">Updated October 2026 · 10 min read</p>

      <section>
        <h2>What Is Stamp Duty?</h2>
        <p>
          Stamp duty is a tax levied by state governments on legal documents and instruments.
          It is governed by the Indian Stamp Act, 1899, with each state having its own amendments
          and schedules that determine rates. Paying stamp duty makes a document legally admissible
          as evidence in court — without proper stamping, a contract may not be enforceable.
        </p>
        <p>
          For businesses, stamp duty applies to a wide range of documents: sale deeds, rental
          agreements, partnership deeds, loan agreements, share transfer instruments, service
          agreements, and more. Understanding stamp duty obligations is essential for legal
          compliance and risk management.
        </p>
      </section>

      <section>
        <h2>Why Stamp Duty Matters for Business Contracts</h2>
        <ul>
          <li><strong>Legal admissibility:</strong> Under Section 35 of the Indian Stamp Act, an unstamped or insufficiently stamped document cannot be admitted as evidence in court</li>
          <li><strong>Penalties:</strong> Using an unstamped document can attract penalties up to 10 times the deficient stamp duty plus interest</li>
          <li><strong>Impounding:</strong> Courts and authorities can impound documents that are not properly stamped under Section 33</li>
          <li><strong>Due diligence:</strong> Investors and acquirers check stamp duty compliance during due diligence — non-compliance is a red flag</li>
          <li><strong>Registration requirement:</strong> Many documents that require registration under the Registration Act, 1908, must first be adequately stamped</li>
        </ul>
      </section>

      <section>
        <h2>Stamp Duty on Common Business Contracts</h2>

        <h3>1. Rental / Lease Agreements</h3>
        <p>
          Rental agreements are one of the most common stamped documents. Key points:
        </p>
        <ul>
          <li>Agreements under 11 months: Lower stamp duty rates; registration often optional but recommended</li>
          <li>Agreements over 11 months: Higher rates; mandatory registration under the Registration Act</li>
          <li>Rates vary by state — Maharashtra charges 0.25% of total rent for leave and licence agreements, while Delhi charges 2%</li>
          <li>In many states, e-stamping has replaced physical stamp papers</li>
        </ul>

        <h3>2. Sale Deeds and Property Transfers</h3>
        <p>
          Property sale deeds attract the highest stamp duty rates, typically ranging from 3.5%
          (Goa) to 9.9% (Meghalaya) of the property&apos;s market value or consideration amount,
          whichever is higher. Many states also charge additional surcharges and cess.
        </p>
        <ul>
          <li>Women buyers get concessions in several states (Delhi: 4%, Rajasthan: 4%, Haryana: 5%)</li>
          <li>First-time homebuyers may get additional rebates in some states</li>
          <li>Properties in SEZs or industrial zones may have different rates</li>
        </ul>

        <h3>3. Partnership Deeds</h3>
        <p>
          Partnership deeds under the Indian Partnership Act, 1932, require stamp duty payment.
          Most states charge a flat 5% stamp duty on partnership deeds. The deed must be stamped
          before or at the time of execution.
        </p>

        <h3>4. Loan Agreements</h3>
        <p>
          Loan agreements and promissory notes require stamp duty that varies by state. Rates
          typically range from 0.1% to 0.5% of the loan amount. Banks and NBFCs factor this into
          their loan processing.
        </p>

        <h3>5. Service Agreements and Consulting Contracts</h3>
        <p>
          General service agreements may or may not attract stamp duty depending on the state and
          the nature of the agreement. In many states, agreements not specifically listed in the
          stamp duty schedule are charged a nominal duty (typically ₹100 to ₹500). Check your
          state&apos;s specific schedule.
        </p>

        <h3>6. Power of Attorney</h3>
        <p>
          Powers of attorney, especially those related to property transactions, attract stamp duty
          ranging from 3% to 5% depending on the state. General powers of attorney typically have
          lower rates than those granting property-related authority.
        </p>
      </section>

      <section>
        <h2>How to Pay Stamp Duty in India</h2>
        <p>
          There are several methods for paying stamp duty:
        </p>
        <ol>
          <li><strong>E-stamping (SHCIL):</strong> The most common method — purchase e-stamp certificates from authorized banks and collection centres through Stock Holding Corporation of India Limited (SHCIL). Available in most states.</li>
          <li><strong>Franking:</strong> Get documents franked at authorized franking centres (usually banks). A franking machine prints the duty paid on the document.</li>
          <li><strong>Non-judicial stamp paper:</strong> Purchase physical stamp papers of the required denomination from authorized vendors. Increasingly being replaced by e-stamping.</li>
          <li><strong>Online payment:</strong> Some states (Maharashtra, Karnataka, Tamil Nadu) offer online stamp duty payment through their registration department portals.</li>
        </ol>
      </section>

      <section>
        <h2>State-wise Stamp Duty Comparison</h2>
        <p>
          Stamp duty rates vary significantly across Indian states. Here&apos;s a comparison
          for the most common document types:
        </p>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid var(--border)" }}>
                <th style={{ textAlign: "left", padding: "0.5rem" }}>State</th>
                <th style={{ textAlign: "right", padding: "0.5rem" }}>Sale Deed</th>
                <th style={{ textAlign: "right", padding: "0.5rem" }}>Rental</th>
                <th style={{ textAlign: "right", padding: "0.5rem" }}>Partnership</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Maharashtra", "6%", "0.25%", "5%"],
                ["Karnataka", "5%", "1%", "5%"],
                ["Delhi", "6%", "2%", "3%"],
                ["Tamil Nadu", "7%", "1%", "5%"],
                ["Gujarat", "4.9%", "1%", "5%"],
                ["Uttar Pradesh", "7%", "2%", "5%"],
                ["Telangana", "5%", "0.5%", "5%"],
                ["Rajasthan", "5%", "1%", "5%"],
                ["West Bengal", "7%", "1%", "5%"],
                ["Kerala", "8%", "1%", "5%"],
              ].map(([state, sale, rental, partnership]) => (
                <tr key={state} style={{ borderBottom: "1px solid var(--line)" }}>
                  <td style={{ padding: "0.5rem" }}>{state}</td>
                  <td style={{ textAlign: "right", padding: "0.5rem" }}>{sale}</td>
                  <td style={{ textAlign: "right", padding: "0.5rem" }}>{rental}</td>
                  <td style={{ textAlign: "right", padding: "0.5rem" }}>{partnership}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: "0.82rem", color: "var(--ink-soft)", marginTop: "0.5rem" }}>
          Use our <Link to="/tools/stamp-duty-calculator">Stamp Duty Calculator</Link> for exact
          calculations across all 29 states and 8 union territories.
        </p>
      </section>

      <section>
        <h2>Penalties for Non-Payment of Stamp Duty</h2>
        <p>
          The consequences of not paying stamp duty can be severe:
        </p>
        <ul>
          <li><strong>Inadmissibility:</strong> The document cannot be used as evidence in court (Section 35, Indian Stamp Act)</li>
          <li><strong>Penalty:</strong> Up to 10 times the deficient stamp duty amount</li>
          <li><strong>Interest:</strong> 2% per month on the unpaid duty from the date of execution</li>
          <li><strong>Impounding:</strong> Authorities can impound the document and hold it until the deficit is paid with penalties</li>
          <li><strong>Criminal liability:</strong> In some cases, executing a document on insufficient stamp duty can attract criminal penalties</li>
        </ul>
      </section>

      <section>
        <h2>Stamp Duty Exemptions and Concessions</h2>
        <ul>
          <li><strong>Women buyers:</strong> Several states offer 1-2% lower stamp duty for women property buyers</li>
          <li><strong>SC/ST applicants:</strong> Some states offer reduced rates for scheduled caste and scheduled tribe applicants</li>
          <li><strong>First-time buyers:</strong> Select states offer rebates for first-time property purchasers</li>
          <li><strong>Affordable housing:</strong> Properties under certain value thresholds may qualify for reduced rates</li>
          <li><strong>Startup concessions:</strong> Some states offer stamp duty exemptions for startup-related documents</li>
          <li><strong>Government instruments:</strong> Documents executed in favour of government bodies are often exempt</li>
        </ul>
      </section>

      <section>
        <h2>Practical Tips for Businesses</h2>
        <ol>
          <li><strong>Check state-specific rates</strong> before finalizing any agreement — rates vary significantly</li>
          <li><strong>Use e-stamping</strong> wherever available — it&apos;s secure, verifiable, and reduces fraud risk</li>
          <li><strong>Pay stamp duty before execution</strong> — paying after execution can attract penalties</li>
          <li><strong>Keep records</strong> of all stamped documents and payment receipts for at least 8 years</li>
          <li><strong>Factor stamp duty into deal costs</strong> — for property transactions, stamp duty can be 5-10% of the deal value</li>
          <li><strong>Consider registration</strong> — registered documents get additional legal protection and are part of the public record</li>
          <li><strong>Get professional advice</strong> for high-value transactions to optimize stamp duty costs legally</li>
        </ol>
      </section>

      <section>
        <h2>Calculate Stamp Duty for Your Contract</h2>
        <p>
          Use our free Stamp Duty Calculator to instantly calculate stamp duty and registration
          charges for any Indian state and document type. You can also generate contracts with
          the correct jurisdiction clauses using our template generator.
        </p>
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "1rem" }}>
          <Link to="/tools/stamp-duty-calculator" className="btn btn-primary">Calculate Stamp Duty →</Link>
          <Link to="/generator" className="btn btn-ghost">Generate Contract →</Link>
          <Link to="/tools/risk-analyzer" className="btn btn-ghost">Analyze Contract Risk →</Link>
        </div>
      </section>

      <ShareButtons
        path="/blog/stamp-duty-guide-india"
        text="Complete guide to stamp duty on contracts in India — rates, exemptions, and penalties"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Stamp Duty on Contracts in India — Complete Guide for Businesses (2026)",
            description: "Complete guide to stamp duty on business contracts in India. State-wise rates, exemptions, penalties, and practical tips for compliance.",
            author: { "@type": "Organization", name: "DoAide", url: "https://doaide.com" },
            publisher: { "@type": "Organization", name: "DoAide", url: "https://doaide.com" },
            datePublished: "2026-10-10",
            dateModified: "2026-10-10",
            mainEntityOfPage: "https://contracts.doaide.com/blog/stamp-duty-guide-india",
          }),
        }}
      />
    </article>
  );
}
