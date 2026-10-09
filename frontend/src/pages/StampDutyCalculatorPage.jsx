import { useState } from "react";
import ToolsNav from "../components/ToolsNav";
import ShareButtons from "../components/ShareButtons";
import { usePageTitle } from "../hooks/usePageTitle";

const STATES = [
  { name: "Andhra Pradesh", saleDeed: 5, lease: 0.5, giftDeed: 2, partnership: 5, loanAgreement: 0.5, powerOfAttorney: 5, registration: 1 },
  { name: "Arunachal Pradesh", saleDeed: 6, lease: 0.5, giftDeed: 3, partnership: 5, loanAgreement: 0.2, powerOfAttorney: 5, registration: 1 },
  { name: "Assam", saleDeed: 8.25, lease: 0.5, giftDeed: 5, partnership: 5, loanAgreement: 0.5, powerOfAttorney: 5, registration: 1 },
  { name: "Bihar", saleDeed: 6, lease: 2, giftDeed: 6, partnership: 5, loanAgreement: 0.5, powerOfAttorney: 5, registration: 2 },
  { name: "Chhattisgarh", saleDeed: 5, lease: 1, giftDeed: 5, partnership: 5, loanAgreement: 0.5, powerOfAttorney: 5, registration: 1 },
  { name: "Delhi", saleDeed: 6, lease: 2, giftDeed: 4, partnership: 3, loanAgreement: 0.5, powerOfAttorney: 3, registration: 1 },
  { name: "Goa", saleDeed: 3.5, lease: 1, giftDeed: 3.5, partnership: 5, loanAgreement: 0.3, powerOfAttorney: 3, registration: 1 },
  { name: "Gujarat", saleDeed: 4.9, lease: 1, giftDeed: 4.9, partnership: 5, loanAgreement: 0.1, powerOfAttorney: 5, registration: 1 },
  { name: "Haryana", saleDeed: 7, lease: 1.5, giftDeed: 5, partnership: 5, loanAgreement: 0.5, powerOfAttorney: 5, registration: 1 },
  { name: "Himachal Pradesh", saleDeed: 6, lease: 1, giftDeed: 4, partnership: 5, loanAgreement: 0.5, powerOfAttorney: 5, registration: 1 },
  { name: "Jharkhand", saleDeed: 4, lease: 1, giftDeed: 4, partnership: 5, loanAgreement: 0.5, powerOfAttorney: 5, registration: 2 },
  { name: "Karnataka", saleDeed: 5, lease: 1, giftDeed: 5, partnership: 5, loanAgreement: 0.5, powerOfAttorney: 5, registration: 1 },
  { name: "Kerala", saleDeed: 8, lease: 1, giftDeed: 5, partnership: 5, loanAgreement: 0.5, powerOfAttorney: 5, registration: 2 },
  { name: "Madhya Pradesh", saleDeed: 7.5, lease: 1, giftDeed: 5, partnership: 5, loanAgreement: 0.5, powerOfAttorney: 5, registration: 1 },
  { name: "Maharashtra", saleDeed: 6, lease: 0.25, giftDeed: 3, partnership: 5, loanAgreement: 0.2, powerOfAttorney: 5, registration: 1 },
  { name: "Manipur", saleDeed: 7, lease: 1, giftDeed: 4, partnership: 5, loanAgreement: 0.5, powerOfAttorney: 5, registration: 1 },
  { name: "Meghalaya", saleDeed: 9.9, lease: 1, giftDeed: 5, partnership: 5, loanAgreement: 0.5, powerOfAttorney: 5, registration: 1 },
  { name: "Mizoram", saleDeed: 5, lease: 1, giftDeed: 3, partnership: 5, loanAgreement: 0.5, powerOfAttorney: 5, registration: 1 },
  { name: "Nagaland", saleDeed: 8, lease: 1, giftDeed: 5, partnership: 5, loanAgreement: 0.5, powerOfAttorney: 5, registration: 1 },
  { name: "Odisha", saleDeed: 5, lease: 1, giftDeed: 5, partnership: 5, loanAgreement: 0.5, powerOfAttorney: 5, registration: 2 },
  { name: "Punjab", saleDeed: 7, lease: 1, giftDeed: 5, partnership: 5, loanAgreement: 0.5, powerOfAttorney: 5, registration: 1 },
  { name: "Rajasthan", saleDeed: 5, lease: 1, giftDeed: 2.5, partnership: 5, loanAgreement: 0.5, powerOfAttorney: 5, registration: 1 },
  { name: "Sikkim", saleDeed: 5, lease: 1, giftDeed: 5, partnership: 5, loanAgreement: 0.5, powerOfAttorney: 5, registration: 1 },
  { name: "Tamil Nadu", saleDeed: 7, lease: 1, giftDeed: 7, partnership: 5, loanAgreement: 0.5, powerOfAttorney: 5, registration: 1 },
  { name: "Telangana", saleDeed: 5, lease: 0.5, giftDeed: 2, partnership: 5, loanAgreement: 0.5, powerOfAttorney: 5, registration: 0.5 },
  { name: "Tripura", saleDeed: 5, lease: 1, giftDeed: 5, partnership: 5, loanAgreement: 0.5, powerOfAttorney: 5, registration: 1 },
  { name: "Uttar Pradesh", saleDeed: 7, lease: 2, giftDeed: 5, partnership: 5, loanAgreement: 0.5, powerOfAttorney: 5, registration: 1 },
  { name: "Uttarakhand", saleDeed: 5, lease: 1, giftDeed: 5, partnership: 5, loanAgreement: 0.5, powerOfAttorney: 5, registration: 1 },
  { name: "West Bengal", saleDeed: 7, lease: 1, giftDeed: 5, partnership: 5, loanAgreement: 0.5, powerOfAttorney: 5, registration: 1 },
];

const DOC_TYPES = [
  { key: "saleDeed", label: "Sale Deed" },
  { key: "lease", label: "Lease / Rental Agreement" },
  { key: "giftDeed", label: "Gift Deed" },
  { key: "partnership", label: "Partnership Deed" },
  { key: "loanAgreement", label: "Loan Agreement" },
  { key: "powerOfAttorney", label: "Power of Attorney" },
];

const COMPARE_STATES = ["Maharashtra", "Karnataka", "Delhi", "Tamil Nadu", "Uttar Pradesh"];

const FAQ_ITEMS = [
  {
    q: "What is stamp duty in India?",
    a: "Stamp duty is a tax levied by state governments on legal documents such as property sale deeds, rental agreements, and partnership deeds. It is governed by the Indian Stamp Act, 1899 (and respective state amendments). Paying stamp duty makes a document legally admissible in court.",
  },
  {
    q: "How is stamp duty calculated?",
    a: "Stamp duty is calculated as a percentage of the property value, transaction value, or consideration amount mentioned in the document. The percentage varies by state and document type. Some states also levy additional surcharges or cess on top of the base stamp duty.",
  },
  {
    q: "What are registration charges?",
    a: "Registration charges are fees paid to register a document with the Sub-Registrar's office under the Registration Act, 1908. They are separate from stamp duty and are typically 1% of the property value, though this varies by state. Registration makes the transaction a matter of public record.",
  },
  {
    q: "Is stamp duty the same across all Indian states?",
    a: "No. Stamp duty rates vary significantly across Indian states since it is a state subject. For example, sale deed stamp duty ranges from 3.5% in Goa to 9.9% in Meghalaya. Some states offer concessions for women buyers or first-time homeowners.",
  },
  {
    q: "What happens if I don't pay stamp duty?",
    a: "Documents without proper stamp duty are not admissible as evidence in court. Additionally, you may face penalties of up to 10 times the deficit stamp duty amount plus interest under Section 35 of the Indian Stamp Act. Authorities can impound unstamped or insufficiently stamped documents.",
  },
  {
    q: "Do women get stamp duty concessions in India?",
    a: "Several states offer reduced stamp duty rates for women property buyers. For example, Delhi offers 4% for women (vs 6% for men), Rajasthan offers 4% for women (vs 5% for men), and Haryana charges 5% for women (vs 7% for men). Check your specific state's policy.",
  },
];

function formatINR(amount) {
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`;
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)} L`;
  return `₹${amount.toLocaleString("en-IN")}`;
}

export default function StampDutyCalculatorPage() {
  usePageTitle("Stamp Duty Calculator India — All States & Document Types");
  const [state, setState] = useState("");
  const [docType, setDocType] = useState("saleDeed");
  const [value, setValue] = useState("");
  const [openFaq, setOpenFaq] = useState(null);

  const numericValue = parseFloat(value.replace(/,/g, "")) || 0;
  const selectedState = STATES.find((s) => s.name === state);
  const stampDutyRate = selectedState ? selectedState[docType] : 0;
  const registrationRate = selectedState ? selectedState.registration : 0;
  const stampDuty = numericValue * (stampDutyRate / 100);
  const registration = numericValue * (registrationRate / 100);
  const total = stampDuty + registration;
  const hasResult = state && numericValue > 0;

  return (
    <div className="tool-page">
      <ToolsNav />
      <main className="tool-main">
        <div className="tool-container">
          <h1 className="tool-title">Stamp Duty Calculator — India</h1>
          <p className="tool-subtitle">
            Calculate stamp duty and registration charges for any Indian state and document type — free, no sign-up required.
          </p>

          <div className="calc-card">
            <label className="calc-label">
              State
              <select className="calc-input" value={state} onChange={(e) => setState(e.target.value)}>
                <option value="">Select state</option>
                {STATES.map((s) => (
                  <option key={s.name} value={s.name}>{s.name}</option>
                ))}
              </select>
            </label>

            <label className="calc-label">
              Document Type
              <select className="calc-input" value={docType} onChange={(e) => setDocType(e.target.value)}>
                {DOC_TYPES.map((d) => (
                  <option key={d.key} value={d.key}>{d.label}</option>
                ))}
              </select>
            </label>

            <label className="calc-label">
              Property / Transaction Value (₹)
              <input
                className="calc-input"
                type="text"
                inputMode="numeric"
                placeholder="e.g. 50,00,000"
                value={value}
                onChange={(e) => setValue(e.target.value.replace(/[^0-9,]/g, ""))}
              />
            </label>
          </div>

          {hasResult && (
            <>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "0.75rem" }}>
                <div className="stat-card tone-brand">
                  <div style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--ink-muted)" }}>Stamp Duty ({stampDutyRate}%)</div>
                  <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--brand)" }}>{formatINR(Math.round(stampDuty))}</div>
                </div>
                <div className="stat-card">
                  <div style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--ink-muted)" }}>Registration ({registrationRate}%)</div>
                  <div style={{ fontSize: "1.5rem", fontWeight: 700 }}>{formatINR(Math.round(registration))}</div>
                </div>
                <div className="stat-card tone-brand">
                  <div style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--ink-muted)" }}>Total Payable</div>
                  <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--brand)" }}>{formatINR(Math.round(total))}</div>
                </div>
              </div>

              <div className="calc-card" style={{ fontSize: "0.85rem", color: "var(--ink-soft)", lineHeight: 1.7 }}>
                <p style={{ margin: 0 }}>
                  For a <strong>{DOC_TYPES.find((d) => d.key === docType)?.label}</strong> worth <strong>{formatINR(numericValue)}</strong> in <strong>{state}</strong>, the stamp duty is <strong>{formatINR(Math.round(stampDuty))}</strong> ({stampDutyRate}%) and registration charges are <strong>{formatINR(Math.round(registration))}</strong> ({registrationRate}%). You&apos;ll pay a total of <strong>{formatINR(Math.round(total))}</strong> in government fees.
                </p>
              </div>

              <ShareButtons path="/tools/stamp-duty-calculator" text={`Stamp Duty for ${state}: ${formatINR(Math.round(total))} on ${formatINR(numericValue)} — DoAide Contracts`} />
            </>
          )}

          <div className="calc-card">
            <h2 style={{ margin: "0 0 0.75rem", fontSize: "1.1rem", fontWeight: 600, color: "var(--ink)" }}>
              Stamp Duty Comparison — Top 5 States
            </h2>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.8rem" }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid var(--border)" }}>
                    <th style={{ textAlign: "left", padding: "0.5rem", color: "var(--ink-muted)", fontWeight: 600 }}>State</th>
                    {DOC_TYPES.map((d) => (
                      <th key={d.key} style={{ textAlign: "right", padding: "0.5rem", color: "var(--ink-muted)", fontWeight: 600 }}>{d.label}</th>
                    ))}
                    <th style={{ textAlign: "right", padding: "0.5rem", color: "var(--ink-muted)", fontWeight: 600 }}>Registration</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARE_STATES.map((sName) => {
                    const s = STATES.find((st) => st.name === sName);
                    return (
                      <tr key={sName} style={{ borderBottom: "1px solid var(--border)" }}>
                        <td style={{ padding: "0.5rem", fontWeight: 500, color: "var(--ink)" }}>{sName}</td>
                        {DOC_TYPES.map((d) => (
                          <td key={d.key} style={{ textAlign: "right", padding: "0.5rem", color: "var(--ink-soft)" }}>{s[d.key]}%</td>
                        ))}
                        <td style={{ textAlign: "right", padding: "0.5rem", color: "var(--ink-soft)" }}>{s.registration}%</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <section aria-labelledby="faq-heading">
            <h2 id="faq-heading" style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--ink)", margin: "2rem 0 1rem" }}>
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
            <p style={{ fontSize: "0.9rem", color: "var(--ink-soft)", marginBottom: "0.75rem" }}>
              Need a contract for your property transaction? Generate one instantly.
            </p>
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
            name: "Stamp Duty Calculator India",
            description: "Calculate stamp duty and registration charges for all Indian states. Covers sale deeds, rental agreements, gift deeds, partnership deeds, loan agreements, and power of attorney.",
            url: "https://contracts.doaide.com/tools/stamp-duty-calculator",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web",
            offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
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
