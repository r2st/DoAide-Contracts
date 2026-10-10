import { useEffect } from "react";
import { Link } from "react-router-dom";
import ShareButtons from "../../components/ShareButtons";
import { usePageTitle } from "../../hooks/usePageTitle";

export default function SlaTemplateGuide() {
  usePageTitle("Service Level Agreement (SLA) Template: Complete Guide for Indian IT Companies");

  useEffect(() => {
    const blogSchema = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: "Service Level Agreement (SLA) Template: Complete Guide for Indian IT Companies",
      description: "Free SLA template and complete guide for Indian IT companies. Covers uptime guarantees, penalty structures, escalation procedures, KPI metrics, and Indian legal compliance.",
      author: { "@type": "Organization", name: "DoAide Contracts", url: "https://contracts.doaide.com" },
      publisher: { "@type": "Organization", name: "DoAide Contracts", url: "https://contracts.doaide.com" },
      datePublished: "2026-10-10",
      dateModified: "2026-10-10",
      mainEntityOfPage: "https://contracts.doaide.com/blog/sla-template-indian-it-companies",
      url: "https://contracts.doaide.com/blog/sla-template-indian-it-companies",
    };
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is a Service Level Agreement (SLA) in IT?",
          acceptedAnswer: { "@type": "Answer", text: "An SLA is a formal contract between an IT service provider and a client that defines measurable performance commitments — uptime guarantees, response times, resolution windows, and penalties for missing targets. It transforms vague service promises into enforceable, quantifiable obligations." },
        },
        {
          "@type": "Question",
          name: "What SLA uptime percentage should Indian IT companies offer?",
          acceptedAnswer: { "@type": "Answer", text: "Most Indian IT companies offer 99.9% uptime (8.76 hours annual downtime) for standard services and 99.99% (52.6 minutes annual downtime) for mission-critical systems. The right target depends on your infrastructure, redundancy, and what your upstream providers guarantee — your SLA cannot exceed their commitments." },
        },
        {
          "@type": "Question",
          name: "Are SLA penalties enforceable in India?",
          acceptedAnswer: { "@type": "Answer", text: "Yes. SLA penalties are enforceable under the Indian Contract Act, 1872. However, Section 74 allows courts to reduce penalties to 'reasonable compensation' if they are found disproportionate. Structure penalties as service credits (5-25% of monthly fees) rather than punitive amounts to ensure enforceability." },
        },
        {
          "@type": "Question",
          name: "What are common SLA metrics for managed IT services?",
          acceptedAnswer: { "@type": "Answer", text: "Common SLA metrics include: uptime/availability (99.9% or higher), incident response time (15 min for critical, 1 hour for high, 4 hours for medium), resolution time (4 hours for critical, 8 hours for high), mean time between failures (MTBF), and customer satisfaction score (CSAT)." },
        },
        {
          "@type": "Question",
          name: "How often should SLAs be reviewed?",
          acceptedAnswer: { "@type": "Answer", text: "SLAs should be reviewed at least quarterly for performance reports and annually for terms revision. As business needs evolve and technology changes, SLA metrics, targets, and penalty structures should be updated. Include a formal review clause in your SLA with specific review dates." },
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
      <h1>Service Level Agreement (SLA) Template: Complete Guide for Indian IT Companies</h1>
      <p className="blog-meta">Published October 2026 · 13 min read</p>

      <section>
        <h2>Why Indian IT Companies Need Robust SLAs</h2>
        <p>
          India&apos;s IT services industry generates over $250 billion annually, serving
          clients across the globe. Whether you are an IT company providing managed services,
          a SaaS startup guaranteeing platform availability, or a BPO handling critical business
          processes, your Service Level Agreement is the document your clients will hold you to
          when things go wrong.
        </p>
        <p>
          A poorly drafted SLA exposes your company to disproportionate penalties, unrealistic
          expectations, and scope disputes. A well-structured SLA protects you while giving
          clients the measurable commitments they need. This guide provides a complete framework
          for Indian IT companies to draft enforceable, practical SLAs.
        </p>
      </section>

      <section>
        <h2>SLA Template Structure</h2>
        <p>
          A comprehensive IT services SLA should follow this structure. Each section addresses
          a specific aspect of the service relationship:
        </p>

        <h3>1. Service Description and Scope</h3>
        <p>
          Define every service covered by the SLA — and equally important, what is excluded.
          Ambiguous scope is the most common source of SLA disputes. For each service, specify:
        </p>
        <ul>
          <li><strong>Service name and description:</strong> e.g., &quot;24x7 Infrastructure Monitoring and Incident Management for production servers&quot;</li>
          <li><strong>In-scope systems:</strong> List specific servers, applications, databases, and network components</li>
          <li><strong>Exclusions:</strong> Development/staging environments, third-party services, client-managed components</li>
          <li><strong>Service hours:</strong> 24x7, business hours (9 AM - 6 PM IST), or extended hours (8 AM - 10 PM IST)</li>
          <li><strong>Dependencies:</strong> What the client must provide (VPN access, credentials, escalation contacts)</li>
        </ul>

        <h3>2. Performance Metrics and KPIs</h3>
        <p>
          Every SLA commitment must be measurable. Vague promises like &quot;best effort
          support&quot; are not SLA metrics — they are wish lists. Define these core KPIs:
        </p>

        <h4>Availability / Uptime</h4>
        <ul>
          <li><strong>99.9% (Three Nines):</strong> 8 hours 45 minutes annual downtime — standard for most managed services</li>
          <li><strong>99.95%:</strong> 4 hours 22 minutes annual downtime — enterprise-grade services</li>
          <li><strong>99.99% (Four Nines):</strong> 52 minutes 33 seconds annual downtime — mission-critical only</li>
          <li><strong>99.999% (Five Nines):</strong> 5 minutes 15 seconds annual downtime — telecom-grade, rarely offered</li>
        </ul>
        <p>
          Important: your SLA uptime cannot exceed what your cloud provider guarantees. If
          you run on AWS (99.99% SLA for EC2), you cannot promise 99.999% to your client.
          Factor in your own application reliability on top of infrastructure guarantees.
        </p>

        <h4>Incident Response Times</h4>
        <table style={{ width: "100%", borderCollapse: "collapse", margin: "1rem 0" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid var(--border)" }}>
              <th style={{ textAlign: "left", padding: "0.5rem" }}>Priority</th>
              <th style={{ textAlign: "left", padding: "0.5rem" }}>Definition</th>
              <th style={{ textAlign: "left", padding: "0.5rem" }}>Response</th>
              <th style={{ textAlign: "left", padding: "0.5rem" }}>Resolution</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: "1px solid var(--border)" }}>
              <td style={{ padding: "0.5rem" }}>P1 — Critical</td>
              <td style={{ padding: "0.5rem" }}>Service completely down, revenue impact</td>
              <td style={{ padding: "0.5rem" }}>15 minutes</td>
              <td style={{ padding: "0.5rem" }}>4 hours</td>
            </tr>
            <tr style={{ borderBottom: "1px solid var(--border)" }}>
              <td style={{ padding: "0.5rem" }}>P2 — High</td>
              <td style={{ padding: "0.5rem" }}>Major feature unavailable, workaround exists</td>
              <td style={{ padding: "0.5rem" }}>1 hour</td>
              <td style={{ padding: "0.5rem" }}>8 hours</td>
            </tr>
            <tr style={{ borderBottom: "1px solid var(--border)" }}>
              <td style={{ padding: "0.5rem" }}>P3 — Medium</td>
              <td style={{ padding: "0.5rem" }}>Minor feature affected, low business impact</td>
              <td style={{ padding: "0.5rem" }}>4 hours</td>
              <td style={{ padding: "0.5rem" }}>24 hours</td>
            </tr>
            <tr style={{ borderBottom: "1px solid var(--border)" }}>
              <td style={{ padding: "0.5rem" }}>P4 — Low</td>
              <td style={{ padding: "0.5rem" }}>Cosmetic issue, enhancement request</td>
              <td style={{ padding: "0.5rem" }}>8 hours</td>
              <td style={{ padding: "0.5rem" }}>5 business days</td>
            </tr>
          </tbody>
        </table>

        <h4>Other Key Metrics</h4>
        <ul>
          <li><strong>Mean Time Between Failures (MTBF):</strong> Average time between service incidents</li>
          <li><strong>Mean Time To Repair (MTTR):</strong> Average time to restore service after failure</li>
          <li><strong>First Call Resolution (FCR):</strong> Percentage of issues resolved on first contact</li>
          <li><strong>Customer Satisfaction (CSAT):</strong> Survey-based score, typically targeted at 4.0+ out of 5.0</li>
        </ul>

        <h3>3. Penalty and Service Credit Structure</h3>
        <p>
          SLA penalties must be proportionate. Under Section 74 of the Indian Contract Act,
          courts can reduce penalties to &quot;reasonable compensation.&quot; Structure your
          penalties as service credits rather than punitive amounts:
        </p>
        <ul>
          <li><strong>Tier 1:</strong> Availability between 99.9% and 99.5% — 5% service credit on monthly fees</li>
          <li><strong>Tier 2:</strong> Availability between 99.5% and 99.0% — 10% service credit</li>
          <li><strong>Tier 3:</strong> Availability between 99.0% and 98.0% — 25% service credit</li>
          <li><strong>Tier 4:</strong> Availability below 98.0% — 50% service credit + client&apos;s right to terminate</li>
        </ul>
        <p>
          Cap total service credits at 100% of the monthly fee. Credits should be applied to the
          next invoice automatically, not require the client to file a claim. For Indian IT
          companies serving global clients, also consider SLA bonuses — a small premium when
          you consistently exceed targets — as this incentivises over-performance.
        </p>

        <h3>4. Escalation Matrix</h3>
        <p>
          Define a clear escalation path with named roles and mandatory timeframes. Indian
          clients particularly value this because it provides accountability beyond the
          helpdesk:
        </p>
        <ul>
          <li><strong>Level 1 — Service Desk:</strong> Initial response and troubleshooting (0-30 minutes)</li>
          <li><strong>Level 2 — Technical Lead:</strong> Escalation if L1 cannot resolve within SLA (30 min - 2 hours)</li>
          <li><strong>Level 3 — Service Delivery Manager:</strong> Engaged for P1/P2 incidents or SLA breach risk (2-4 hours)</li>
          <li><strong>Level 4 — CTO / VP Engineering:</strong> War-room escalation for critical incidents affecting multiple clients</li>
        </ul>
        <p>
          Include both provider and client escalation contacts. Many SLA breaches happen because
          the client&apos;s own team is unavailable to approve a fix or provide access.
        </p>

        <h3>5. Reporting and Governance</h3>
        <p>
          Regular reporting prevents disputes and builds trust. Your SLA should mandate:
        </p>
        <ul>
          <li><strong>Monthly reports:</strong> Uptime statistics, incident summary, SLA compliance status, credit calculations</li>
          <li><strong>Quarterly reviews:</strong> Performance trends, capacity planning, upcoming changes, improvement roadmap</li>
          <li><strong>Annual SLA revision:</strong> Update metrics, targets, and pricing based on actual performance data</li>
          <li><strong>Real-time dashboards:</strong> Provide clients with live monitoring access (Grafana, Datadog, or custom dashboards)</li>
        </ul>

        <h3>6. Maintenance Windows and Exclusions</h3>
        <p>
          Planned maintenance should not count against your uptime SLA. Define:
        </p>
        <ul>
          <li><strong>Scheduled maintenance:</strong> Weekly/monthly windows (e.g., Sunday 2 AM - 6 AM IST) with 72 hours notice</li>
          <li><strong>Emergency maintenance:</strong> Security patches or critical fixes with 4 hours notice</li>
          <li><strong>Client-caused outages:</strong> Downtime caused by the client&apos;s own actions (misconfiguration, unauthorized changes)</li>
          <li><strong>Force majeure:</strong> Natural disasters, government actions, internet backbone failures, pandemic-related disruptions</li>
          <li><strong>Third-party failures:</strong> Outages in cloud providers, DNS services, or CDNs outside your control</li>
        </ul>

        <h3>7. Security and Compliance</h3>
        <p>
          Indian IT companies serving global clients must address multiple compliance frameworks:
        </p>
        <ul>
          <li><strong>DPDP Act, 2023:</strong> Data processing obligations for personal data of Indian citizens</li>
          <li><strong>ISO 27001:</strong> Information security management system certification</li>
          <li><strong>SOC 2 Type II:</strong> Required by most US and European clients</li>
          <li><strong>GDPR:</strong> If processing data of EU residents — include Data Processing Agreement as an SLA addendum</li>
          <li><strong>HIPAA:</strong> For healthcare IT services — Business Associate Agreement required</li>
        </ul>
        <p>
          Include a security breach notification clause with a defined timeline (typically 24-72
          hours after discovery) and the remediation steps you will take.
        </p>

        <h3>8. Termination and Transition</h3>
        <p>
          SLA termination clauses should cover persistent non-performance (e.g., missing uptime
          targets for 3 consecutive months grants termination rights), transition assistance
          (30-90 days of support to migrate to a new provider), data return and deletion (return
          all client data in a standard format within 30 days, certify deletion within 60 days),
          and knowledge transfer (documentation, runbooks, and training for the incoming team).
        </p>
      </section>

      <section>
        <h2>Indian Legal Considerations for SLAs</h2>
        <p>
          SLAs in India are governed by the Indian Contract Act, 1872, with additional provisions
          from the Information Technology Act, 2000 for IT services. Key considerations:
        </p>
        <ul>
          <li><strong>Section 74 (Penalty vs damages):</strong> Indian courts treat penalties and liquidated damages identically — they will award only &quot;reasonable compensation.&quot; Structure service credits, not punitive penalties</li>
          <li><strong>Stamp duty:</strong> SLAs are commercial agreements and may attract stamp duty depending on the state and contract value. Check our <Link to="/tools/stamp-duty-calculator">Stamp Duty Calculator</Link></li>
          <li><strong>Arbitration:</strong> Include an arbitration clause under the Arbitration and Conciliation Act, 1996. Specify seat (typically Mumbai, Delhi, or Bengaluru), language (English), and appointing authority (e.g., Indian Council of Arbitration)</li>
          <li><strong>E-signatures:</strong> Valid under the IT Act, 2000 for SLAs. Aadhaar eSign and DSC both acceptable</li>
          <li><strong>Foreign exchange:</strong> For cross-border SLAs, payment terms must comply with FEMA regulations and RBI guidelines on service exports</li>
        </ul>
      </section>

      <section>
        <h2>SLA Template for Different IT Service Models</h2>

        <h3>Managed Services / Infrastructure</h3>
        <p>
          Focus on uptime, monitoring, patching, and incident resolution. Include separate SLAs
          for infrastructure (servers, network, storage) and application layers. Define backup
          and recovery RPO (Recovery Point Objective) and RTO (Recovery Time Objective).
        </p>

        <h3>SaaS Products</h3>
        <p>
          Platform availability is the core metric. Include API response times, data durability
          guarantees, and planned maintenance schedules. Address multi-tenancy isolation — one
          customer&apos;s issue should not affect others.
        </p>

        <h3>IT Outsourcing / Staff Augmentation</h3>
        <p>
          Metrics shift from uptime to productivity: deliverable quality, sprint velocity,
          defect rates, and knowledge transfer effectiveness. Include resource replacement
          timelines if assigned personnel are unavailable.
        </p>

        <h3>BPO / KPO Services</h3>
        <p>
          Quality metrics dominate: accuracy rates, turnaround times, error percentages, and
          compliance adherence. Include volume-based scaling provisions and seasonal
          adjustment clauses.
        </p>
      </section>

      <section>
        <h2>Frequently Asked Questions</h2>

        <h3>What SLA uptime percentage should Indian IT companies offer?</h3>
        <p>
          Most Indian IT companies offer 99.9% uptime for standard services and 99.99% for
          mission-critical systems. The right target depends on your infrastructure, redundancy
          capabilities, and what your upstream cloud providers guarantee — your SLA cannot
          exceed their commitments.
        </p>

        <h3>Are SLA penalties enforceable in India?</h3>
        <p>
          Yes. SLA penalties are enforceable under the Indian Contract Act, 1872. However,
          Section 74 allows courts to reduce penalties to &quot;reasonable compensation&quot; if
          they are found disproportionate. Structure penalties as service credits (5-25% of
          monthly fees) rather than punitive amounts to ensure enforceability.
        </p>

        <h3>How often should SLAs be reviewed?</h3>
        <p>
          SLAs should be reviewed at least quarterly for performance reports and annually for
          terms revision. As business needs evolve and technology changes, SLA metrics, targets,
          and penalty structures should be updated. Include a formal review clause in your SLA
          with specific review dates.
        </p>

        <h3>What happens if a third-party cloud provider causes my SLA to be breached?</h3>
        <p>
          Define third-party failures as SLA exclusions in your agreement. However, sophisticated
          clients will push back on this — they are paying you to manage the service, including
          vendor risk. The best practice is to build redundancy so that a single vendor failure
          does not breach your SLA.
        </p>
      </section>

      <section>
        <h2>Create Your Service Level Agreement</h2>
        <p>
          Use DoAide Contracts to generate a professionally drafted SLA template covering all
          essential metrics, penalties, and Indian legal requirements. Customise for managed
          services, SaaS, IT outsourcing, or BPO engagements.
        </p>
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", margin: "1rem 0" }}>
          <Link to="/templates" className="btn btn-primary">Browse Templates</Link>
          <Link to="/generator" className="btn btn-ghost">Generate Contract</Link>
          <Link to="/tools/clause-library" className="btn btn-ghost">Clause Library</Link>
        </div>
      </section>

      <ShareButtons
        path="/blog/sla-template-indian-it-companies"
        text="SLA Template: Complete Guide for Indian IT Companies"
      />
    </article>
  );
}
