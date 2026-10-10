import { useEffect } from "react";
import { Link } from "react-router-dom";
import ShareButtons from "../../components/ShareButtons";
import { usePageTitle } from "../../hooks/usePageTitle";

export default function FreelancerAgreementTemplateGuide() {
  usePageTitle("Freelancer Agreement Template India: Protect Your Work and Get Paid");

  useEffect(() => {
    const blogSchema = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: "Freelancer Agreement Template India: Protect Your Work and Get Paid",
      description: "Free freelancer agreement template for India. Learn how to protect your intellectual property, ensure timely payments, and draft enforceable contracts as a freelancer under Indian law.",
      author: { "@type": "Organization", name: "DoAide Contracts", url: "https://contracts.doaide.com" },
      publisher: { "@type": "Organization", name: "DoAide Contracts", url: "https://contracts.doaide.com" },
      datePublished: "2026-10-10",
      dateModified: "2026-10-10",
      mainEntityOfPage: "https://contracts.doaide.com/blog/freelancer-agreement-template-india",
      url: "https://contracts.doaide.com/blog/freelancer-agreement-template-india",
    };
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Is a freelancer agreement legally binding in India?",
          acceptedAnswer: { "@type": "Answer", text: "Yes. A freelancer agreement is a valid contract under the Indian Contract Act, 1872, provided it has free consent, lawful consideration, competent parties, and a lawful object. Written agreements are recommended as they serve as evidence in disputes." },
        },
        {
          "@type": "Question",
          name: "How can a freelancer protect their intellectual property in India?",
          acceptedAnswer: { "@type": "Answer", text: "Under Indian copyright law, the creator owns the copyright by default — even for commissioned work. Freelancers should include a clause that retains IP ownership until full payment is received, and only assigns specific usage rights (not all IP) to the client." },
        },
        {
          "@type": "Question",
          name: "What should a freelancer do if a client refuses to pay?",
          acceptedAnswer: { "@type": "Answer", text: "First, send a formal legal notice referencing the contract terms. If the amount is under ₹10 lakh, file a case in the Consumer Disputes Redressal Forum or use the MSME Samadhaan portal if registered as MSME. For larger amounts, pursue arbitration if the contract includes an arbitration clause, or file a civil suit." },
        },
        {
          "@type": "Question",
          name: "Do freelancers need to charge GST in India?",
          acceptedAnswer: { "@type": "Answer", text: "Freelancers with annual turnover exceeding ₹20 lakh (₹10 lakh for special category states) must register for GST. Services are typically taxed at 18% under SAC code 998314 (IT services) or 998399 (other professional services). Below the threshold, GST registration is optional." },
        },
        {
          "@type": "Question",
          name: "Can a freelancer include a non-compete clause in their agreement?",
          acceptedAnswer: { "@type": "Answer", text: "Section 27 of the Indian Contract Act makes agreements in restraint of trade void. As a freelancer, you generally cannot be restricted from working with competitors after the engagement ends. However, non-solicitation clauses (preventing poaching of clients or employees) are more likely to be enforced." },
        },
      ],
    };
    const s1 = document.createElement("script");
    s1.type = "application/ld+json";
    s1.text = JSON.stringify(blogSchema);
    const s2 = document.createElement("script");
    s2.type = "application/ld+json";
    s2.text = JSON.stringify(faqSchema);
    document.head.appendChild(s1);
    document.head.appendChild(s2);
    return () => { s1.remove(); s2.remove(); };
  }, []);

  return (
    <article className="blog-article">
      <h1>Freelancer Agreement Template India: Protect Your Work and Get Paid</h1>
      <p className="blog-meta">Published October 2026 · 11 min read</p>

      <section>
        <h2>Why Every Indian Freelancer Needs a Written Agreement</h2>
        <p>
          India&apos;s freelance economy is booming — over 15 million professionals work
          independently across IT, design, content, consulting, and digital marketing. Yet most
          Indian freelancers operate without a written contract, leaving them vulnerable to
          delayed payments, scope creep, and intellectual property theft.
        </p>
        <p>
          A freelancer agreement is not a luxury — it is your primary legal protection. Under the
          Indian Contract Act, 1872, a well-drafted agreement gives you enforceable rights to
          payment, ownership of your creative work, and clear boundaries for the engagement.
          This guide walks you through every clause you need, written from the freelancer&apos;s
          perspective.
        </p>
      </section>

      <section>
        <h2>What to Include in Your Freelancer Agreement</h2>

        <h3>1. Clear Scope of Work</h3>
        <p>
          The single most important clause for protecting yourself. Define exactly what you will
          deliver, in what format, and by when. Be specific — &quot;design a website&quot; is
          too vague; &quot;design a 5-page responsive website with homepage, about, services,
          portfolio, and contact pages, delivered as Figma files and production-ready HTML/CSS&quot;
          is enforceable.
        </p>
        <p>
          Include a revision policy. Unlimited revisions is a trap — specify the number of
          revision rounds included (typically 2-3), and the per-revision fee for additional
          rounds. Under Section 29 of the Indian Contract Act, vague agreements are void,
          so precision protects you legally.
        </p>

        <h3>2. Payment Terms That Protect You</h3>
        <p>
          Payment disputes are the most common freelancer complaint. Your agreement should
          address these points:
        </p>
        <ul>
          <li><strong>Advance payment:</strong> Always require 25-50% upfront before starting work. This demonstrates client commitment and covers your initial costs</li>
          <li><strong>Milestone payments:</strong> For larger projects, tie payments to deliverable milestones — not just project completion</li>
          <li><strong>Payment timeline:</strong> Specify exact days (e.g., &quot;within 15 days of invoice&quot;), not vague terms like &quot;upon completion&quot;</li>
          <li><strong>Late payment penalty:</strong> Include interest on overdue payments — 1.5-2% per month is standard in India. Under Section 74 of the Indian Contract Act, courts will award &quot;reasonable compensation&quot; for breach</li>
          <li><strong>GST and TDS:</strong> If you are GST-registered, state that fees are exclusive of 18% GST. Note that the client must deduct TDS at 10% under Section 194J (for professional services) or 1-2% under Section 194C (for contractors)</li>
        </ul>

        <h3>3. Intellectual Property — Your Most Valuable Asset</h3>
        <p>
          This is where most freelancers lose out. Under Indian copyright law (Copyright Act,
          1957), the creator owns the copyright by default — even for work you are paid to
          create. However, many standard client contracts include a blanket IP assignment clause
          that transfers all your rights the moment you create anything.
        </p>
        <p>
          As a freelancer, you should negotiate these protections:
        </p>
        <ul>
          <li><strong>License, not assignment:</strong> Grant the client a license to use the work for their specified purpose, rather than transferring all IP rights</li>
          <li><strong>IP transfers only on full payment:</strong> If you do agree to assign IP, make it conditional on receiving full payment. This is your strongest leverage for ensuring payment</li>
          <li><strong>Portfolio rights:</strong> Retain the right to showcase the work in your portfolio and marketing materials</li>
          <li><strong>Pre-existing IP:</strong> Explicitly exclude your existing tools, templates, code libraries, and methodologies from any IP transfer. These remain yours</li>
        </ul>

        <h3>4. Confidentiality (NDA) Provisions</h3>
        <p>
          Clients will often ask you to sign a separate NDA, but you can include confidentiality
          terms directly in your agreement. As a freelancer, ensure the confidentiality is
          mutual — the client should also protect your proprietary methods and pricing. Set a
          reasonable duration (2-3 years after the engagement ends) and clearly define what
          information is confidential and what is not. Check our{" "}
          <Link to="/blog/free-nda-template-india-2026">NDA template guide</Link> for detailed
          clause language.
        </p>

        <h3>5. Timeline and Delivery Terms</h3>
        <p>
          Specify realistic deadlines and build in buffer time. Include provisions for delays
          caused by the client — late feedback, missing assets, or changed requirements should
          extend your deadline automatically. A sample clause: &quot;Timelines are contingent on
          Client providing required inputs within 3 business days of request. Each day of delay
          in Client inputs extends the delivery date by an equal number of days.&quot;
        </p>

        <h3>6. Termination and Kill Fee</h3>
        <p>
          Protect yourself from clients who cancel mid-project. Your termination clause should
          include:
        </p>
        <ul>
          <li><strong>Kill fee:</strong> If the client terminates without cause, you should receive payment for all work completed plus 25-50% of the remaining contract value</li>
          <li><strong>Your right to terminate:</strong> If the client fails to pay, is unresponsive for more than 14 days, or materially changes the scope without your agreement</li>
          <li><strong>Work-in-progress:</strong> All WIP belongs to you until fully paid for. The client receives deliverables only for milestones they have paid</li>
          <li><strong>Notice period:</strong> 15-30 days written notice for termination without cause by either party</li>
        </ul>

        <h3>7. Limitation of Liability</h3>
        <p>
          Cap your total liability at the fees paid under the agreement. As a freelancer, you
          cannot afford unlimited liability — a single project gone wrong should not put your
          entire livelihood at risk. Exclude consequential, indirect, and special damages. Under
          Section 73 of the Indian Contract Act, damages must &quot;naturally arise&quot; from
          the breach, which supports reasonable liability caps.
        </p>

        <h3>8. Dispute Resolution</h3>
        <p>
          Specify arbitration over litigation. Indian courts are notoriously slow, and as a
          freelancer, you cannot afford years of legal proceedings. Include an arbitration clause
          under the Arbitration and Conciliation Act, 1996, specifying your city as the seat of
          arbitration. For amounts under ₹10 lakh, mention the option of the MSME Samadhaan
          portal if you are registered as an MSME.
        </p>
      </section>

      <section>
        <h2>Tax Compliance for Indian Freelancers</h2>
        <p>
          Your agreement should address these tax obligations to avoid disputes:
        </p>
        <ul>
          <li><strong>GST registration:</strong> Required if annual turnover exceeds ₹20 lakh (₹10 lakh for special category states). Services taxed at 18%</li>
          <li><strong>TDS certificate:</strong> Clients must provide Form 16A after deducting TDS. Include a clause requiring this within 15 days of the quarter end</li>
          <li><strong>Invoice format:</strong> Specify that you will issue proper GST-compliant invoices with SAC codes</li>
          <li><strong>Advance tax:</strong> As a freelancer, you are responsible for paying advance tax in quarterly instalments</li>
        </ul>
      </section>

      <section>
        <h2>Red Flags to Watch For in Client Contracts</h2>
        <ul>
          <li><strong>&quot;Work for hire&quot;:</strong> This US legal concept has no equivalent in Indian law. Reject blanket work-for-hire clauses — negotiate IP terms specifically</li>
          <li><strong>Unlimited revisions:</strong> Always cap revision rounds and charge for extras</li>
          <li><strong>Non-compete clauses:</strong> Under Section 27 of the Indian Contract Act, post-engagement non-competes are generally void. Push back on any clause that restricts your ability to work with other clients</li>
          <li><strong>Payment on &quot;acceptance&quot; with no timeline:</strong> If the client never formally &quot;accepts,&quot; you never get paid. Set a deemed-acceptance timeline (e.g., &quot;if Client does not provide written objections within 7 days, deliverables are deemed accepted&quot;)</li>
          <li><strong>Uncapped indemnity:</strong> Never agree to indemnify a client without limits. Cap indemnity at the fees paid</li>
        </ul>
      </section>

      <section>
        <h2>Frequently Asked Questions</h2>

        <h3>Is a freelancer agreement legally binding in India?</h3>
        <p>
          Yes. A freelancer agreement is a valid contract under the Indian Contract Act, 1872,
          provided it has free consent, lawful consideration, competent parties, and a lawful
          object. Written agreements are recommended as they serve as evidence in disputes.
        </p>

        <h3>How can a freelancer protect their intellectual property in India?</h3>
        <p>
          Under Indian copyright law, the creator owns the copyright by default — even for
          commissioned work. Include a clause that retains IP ownership until full payment is
          received, and only assigns specific usage rights to the client. Keep your pre-existing
          tools and templates excluded from any IP transfer.
        </p>

        <h3>What should I do if a client refuses to pay?</h3>
        <p>
          Send a formal legal notice referencing the contract terms. If the amount is under ₹10
          lakh, file a case in the Consumer Disputes Redressal Forum or use the MSME Samadhaan
          portal if registered as MSME. For larger amounts, pursue arbitration if the contract
          includes an arbitration clause, or file a civil suit.
        </p>

        <h3>Do freelancers need to charge GST in India?</h3>
        <p>
          Freelancers with annual turnover exceeding ₹20 lakh (₹10 lakh for special category
          states) must register for GST. Services are typically taxed at 18%. Below the threshold,
          GST registration is optional but may be beneficial for input tax credit claims.
        </p>
      </section>

      <section>
        <h2>Create Your Freelancer Agreement</h2>
        <p>
          Use DoAide Contracts to generate a professionally drafted freelancer agreement that
          protects your work, ensures timely payment, and complies with Indian law.
        </p>
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", margin: "1rem 0" }}>
          <Link to="/template/freelancer" className="btn btn-primary">View Template</Link>
          <Link to="/generator?template=freelancer" className="btn btn-ghost">Generate Now</Link>
          <Link to="/tools/clause-library" className="btn btn-ghost">Clause Library</Link>
        </div>
      </section>

      <ShareButtons
        path="/blog/freelancer-agreement-template-india"
        text="Freelancer Agreement Template India: Protect Your Work and Get Paid"
      />
    </article>
  );
}
