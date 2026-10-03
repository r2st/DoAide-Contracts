export const TEMPLATES = [
  {
    slug: "nda",
    name: "Non-Disclosure Agreement (NDA)",
    category: "nda",
    description: "Protect confidential information shared between parties. Covers mutual and one-way NDAs with standard Indian legal provisions.",
    icon: "lock",
    fields: [
      { key: "disclosing_party", label: "Disclosing Party Name", type: "text", required: true, placeholder: "e.g. Acme Pvt Ltd" },
      { key: "receiving_party", label: "Receiving Party Name", type: "text", required: true, placeholder: "e.g. Beta Corp" },
      { key: "effective_date", label: "Effective Date", type: "date", required: true },
      { key: "duration_years", label: "Duration (years)", type: "select", options: ["1", "2", "3", "5"], required: true },
      { key: "governing_state", label: "Governing State", type: "text", required: true, placeholder: "e.g. Maharashtra" },
      { key: "purpose", label: "Purpose of Disclosure", type: "textarea", required: false, placeholder: "Describe the business purpose for sharing confidential information" },
    ],
    body: `NON-DISCLOSURE AGREEMENT

This Non-Disclosure Agreement ("Agreement") is entered into as of {{effective_date}} ("Effective Date"),

BETWEEN:

{{disclosing_party}} (hereinafter referred to as the "Disclosing Party"),

AND

{{receiving_party}} (hereinafter referred to as the "Receiving Party").

(Each individually a "Party" and collectively the "Parties".)

1. PURPOSE
The Parties wish to explore a business opportunity of mutual interest (the "Purpose"): {{purpose}}. In connection with this Purpose, the Disclosing Party may disclose certain confidential and proprietary information to the Receiving Party.

2. DEFINITION OF CONFIDENTIAL INFORMATION
"Confidential Information" means any data or information, oral or written, disclosed by the Disclosing Party that is designated as confidential or that reasonably should be understood to be confidential given the nature of the information and the circumstances of disclosure.

3. OBLIGATIONS OF THE RECEIVING PARTY
The Receiving Party shall:
(a) Hold and maintain the Confidential Information in strict confidence;
(b) Not disclose the Confidential Information to any third parties without prior written consent;
(c) Not use the Confidential Information for any purpose except the Purpose;
(d) Protect the Confidential Information using the same degree of care it uses for its own confidential information, but no less than reasonable care.

4. EXCLUSIONS
Confidential Information shall not include information that:
(a) Is or becomes publicly available through no fault of the Receiving Party;
(b) Was known to the Receiving Party prior to disclosure;
(c) Is independently developed by the Receiving Party without use of Confidential Information;
(d) Is rightfully received from a third party without restriction.

5. TERM
This Agreement shall remain in effect for {{duration_years}} year(s) from the Effective Date.

6. RETURN OF INFORMATION
Upon termination or request, the Receiving Party shall promptly return or destroy all Confidential Information and certify such destruction in writing.

7. GOVERNING LAW
This Agreement shall be governed by the laws of {{governing_state}}, India. Any disputes shall be subject to the exclusive jurisdiction of courts in {{governing_state}}.

8. GENERAL PROVISIONS
(a) This Agreement constitutes the entire agreement between the Parties concerning confidentiality.
(b) No amendment shall be binding unless in writing and signed by both Parties.
(c) If any provision is found unenforceable, the remaining provisions shall continue in full force.

IN WITNESS WHEREOF, the Parties have executed this Agreement as of the Effective Date.


________________________          ________________________
{{disclosing_party}}              {{receiving_party}}
(Authorized Signatory)            (Authorized Signatory)`,
  },
  {
    slug: "employment",
    name: "Employment Agreement",
    category: "employment",
    description: "Standard employment contract for Indian companies. Covers compensation, notice period, IP assignment, and non-compete clauses.",
    icon: "briefcase",
    fields: [
      { key: "employer_name", label: "Employer (Company Name)", type: "text", required: true, placeholder: "e.g. TechCo India Pvt Ltd" },
      { key: "employee_name", label: "Employee Name", type: "text", required: true, placeholder: "e.g. Priya Sharma" },
      { key: "designation", label: "Designation / Title", type: "text", required: true, placeholder: "e.g. Senior Software Engineer" },
      { key: "start_date", label: "Start Date", type: "date", required: true },
      { key: "annual_ctc", label: "Annual CTC (INR)", type: "text", required: true, placeholder: "e.g. 12,00,000" },
      { key: "notice_period", label: "Notice Period", type: "select", options: ["30 days", "60 days", "90 days"], required: true },
      { key: "probation_months", label: "Probation Period (months)", type: "select", options: ["3", "6"], required: true },
      { key: "work_location", label: "Work Location", type: "text", required: true, placeholder: "e.g. Bangalore, Karnataka" },
    ],
    body: `EMPLOYMENT AGREEMENT

This Employment Agreement ("Agreement") is made and entered into on {{start_date}},

BETWEEN:

{{employer_name}}, a company incorporated under the laws of India (hereinafter referred to as the "Employer"),

AND

{{employee_name}} (hereinafter referred to as the "Employee").

1. POSITION AND DUTIES
The Employee is hired for the position of {{designation}}. The Employee shall perform duties as assigned by the Employer and report to the designated supervisor.

2. COMMENCEMENT AND PROBATION
(a) The employment shall commence on {{start_date}}.
(b) The Employee shall be on probation for a period of {{probation_months}} months. During probation, either party may terminate with 15 days' written notice.
(c) Upon successful completion, the Employee shall be confirmed in writing.

3. COMPENSATION
(a) The Employee's annual Cost to Company (CTC) shall be ₹{{annual_ctc}}.
(b) The CTC includes basic salary, allowances, and statutory benefits (PF, ESI, gratuity as applicable).
(c) Salary shall be paid monthly, subject to applicable tax deductions (TDS).

4. WORK LOCATION AND HOURS
(a) The primary work location shall be {{work_location}}.
(b) Standard working hours shall be 9 hours per day, 5 days per week, subject to business requirements.

5. LEAVE POLICY
The Employee shall be entitled to leave as per the Employer's leave policy, including earned leave, casual leave, and sick leave as mandated under applicable state labour laws.

6. CONFIDENTIALITY
The Employee shall not disclose any proprietary or confidential information of the Employer during or after employment without prior written consent.

7. INTELLECTUAL PROPERTY
All work product, inventions, and intellectual property created during employment and related to the Employer's business shall be the exclusive property of the Employer.

8. NON-COMPETE
For a period of 12 months after termination, the Employee shall not directly compete with the Employer's business in the same geographic market.

9. TERMINATION
(a) After confirmation, either party may terminate with {{notice_period}} written notice or payment in lieu thereof.
(b) The Employer may terminate immediately for cause, including misconduct, breach of confidentiality, or fraud.

10. GOVERNING LAW
This Agreement shall be governed by the laws of India and subject to the jurisdiction of courts at {{work_location}}.

IN WITNESS WHEREOF, the Parties have executed this Agreement.


________________________          ________________________
{{employer_name}}                 {{employee_name}}
(Authorized Signatory)            (Employee Signature)`,
  },
  {
    slug: "freelancer",
    name: "Freelancer / Consultant Agreement",
    category: "sow",
    description: "Independent contractor agreement for freelancers and consultants. Covers scope of work, payment terms, IP ownership, and termination.",
    icon: "user",
    fields: [
      { key: "client_name", label: "Client Name", type: "text", required: true, placeholder: "e.g. Startup Inc" },
      { key: "freelancer_name", label: "Freelancer / Consultant Name", type: "text", required: true, placeholder: "e.g. Rahul Verma" },
      { key: "project_description", label: "Project / Scope of Work", type: "textarea", required: true, placeholder: "Describe the deliverables and scope" },
      { key: "start_date", label: "Start Date", type: "date", required: true },
      { key: "end_date", label: "End Date", type: "date", required: true },
      { key: "total_fee", label: "Total Fee (INR)", type: "text", required: true, placeholder: "e.g. 2,50,000" },
      { key: "payment_terms", label: "Payment Terms", type: "select", options: ["50% advance, 50% on completion", "Monthly milestones", "On completion", "Weekly"], required: true },
      { key: "governing_state", label: "Governing State", type: "text", required: true, placeholder: "e.g. Delhi" },
    ],
    body: `FREELANCER / CONSULTANT AGREEMENT

This Agreement is entered into as of {{start_date}},

BETWEEN:

{{client_name}} (hereinafter referred to as the "Client"),

AND

{{freelancer_name}} (hereinafter referred to as the "Consultant").

1. SCOPE OF WORK
The Consultant agrees to perform the following services:
{{project_description}}

2. TERM
This Agreement shall commence on {{start_date}} and terminate on {{end_date}}, unless extended by mutual written agreement.

3. COMPENSATION
(a) The Client shall pay the Consultant a total fee of ₹{{total_fee}} for the services rendered.
(b) Payment terms: {{payment_terms}}.
(c) The Consultant shall submit invoices with GST details (if applicable). TDS shall be deducted at applicable rates.

4. INDEPENDENT CONTRACTOR STATUS
The Consultant is an independent contractor, not an employee. The Consultant is responsible for their own taxes, insurance, and statutory compliance. No employment benefits (PF, ESI, gratuity) shall apply.

5. INTELLECTUAL PROPERTY
All work product and deliverables created under this Agreement shall be the exclusive property of the Client upon full payment. The Consultant assigns all rights, title, and interest.

6. CONFIDENTIALITY
The Consultant shall maintain strict confidentiality of all Client information and shall not disclose it to third parties without written consent.

7. NON-SOLICITATION
During the term and for 6 months after termination, the Consultant shall not solicit the Client's employees or customers for competing purposes.

8. TERMINATION
(a) Either party may terminate with 15 days' written notice.
(b) Upon termination, the Consultant shall deliver all work completed to date.
(c) The Client shall pay for work completed up to the termination date.

9. LIABILITY
The Consultant's total liability under this Agreement shall not exceed the total fees paid.

10. DISPUTE RESOLUTION
Any dispute shall be resolved through arbitration in {{governing_state}} under the Arbitration and Conciliation Act, 1996.

11. GOVERNING LAW
This Agreement shall be governed by the laws of India and subject to jurisdiction in {{governing_state}}.

IN WITNESS WHEREOF:

________________________          ________________________
{{client_name}}                   {{freelancer_name}}
(Authorized Signatory)            (Consultant Signature)`,
  },
  {
    slug: "rental",
    name: "Rental / Lease Agreement",
    category: "rental",
    description: "Residential and commercial rental agreement compliant with Indian rent control laws. Covers rent, deposit, maintenance, and lock-in period.",
    icon: "home",
    fields: [
      { key: "landlord_name", label: "Landlord Name", type: "text", required: true, placeholder: "e.g. Suresh Patel" },
      { key: "tenant_name", label: "Tenant Name", type: "text", required: true, placeholder: "e.g. Meera Joshi" },
      { key: "property_address", label: "Property Address", type: "textarea", required: true, placeholder: "Full address including city, state, and PIN code" },
      { key: "monthly_rent", label: "Monthly Rent (INR)", type: "text", required: true, placeholder: "e.g. 25,000" },
      { key: "security_deposit", label: "Security Deposit (INR)", type: "text", required: true, placeholder: "e.g. 1,00,000" },
      { key: "lease_start", label: "Lease Start Date", type: "date", required: true },
      { key: "lease_duration", label: "Lease Duration", type: "select", options: ["11 months", "1 year", "2 years", "3 years"], required: true },
      { key: "lock_in_period", label: "Lock-in Period", type: "select", options: ["None", "3 months", "6 months"], required: true },
    ],
    body: `RENTAL / LEASE AGREEMENT

This Rental Agreement ("Agreement") is made on {{lease_start}},

BETWEEN:

{{landlord_name}} (hereinafter referred to as the "Landlord/Lessor"),

AND

{{tenant_name}} (hereinafter referred to as the "Tenant/Lessee").

1. PROPERTY
The Landlord hereby lets out the following premises to the Tenant:
{{property_address}}
(hereinafter referred to as the "Premises").

2. TERM
(a) The lease shall commence on {{lease_start}} for a period of {{lease_duration}}.
(b) Lock-in period: {{lock_in_period}}. During this period, neither party may terminate without paying the remaining lock-in rent.

3. RENT
(a) Monthly rent: ₹{{monthly_rent}}, payable on or before the 5th of each month.
(b) Rent shall be paid via bank transfer or cheque.
(c) A late payment fee of ₹500 shall apply if rent is delayed beyond 10 days.

4. SECURITY DEPOSIT
(a) The Tenant shall pay ₹{{security_deposit}} as security deposit before taking possession.
(b) The deposit shall be refunded within 30 days of vacating the Premises, after deducting any outstanding dues or damages beyond normal wear and tear.
(c) The deposit shall not bear interest.

5. MAINTENANCE AND REPAIRS
(a) The Tenant shall maintain the Premises in good condition.
(b) Minor repairs (up to ₹5,000) shall be borne by the Tenant.
(c) Major structural repairs shall be the Landlord's responsibility.
(d) Society maintenance charges shall be borne by the Tenant.

6. USE OF PREMISES
(a) The Premises shall be used solely for residential/commercial purposes as agreed.
(b) The Tenant shall not sublet or assign without written consent.
(c) No structural modifications without Landlord's written approval.

7. UTILITIES
The Tenant shall pay all electricity, water, gas, and internet charges directly.

8. TERMINATION
(a) After the lock-in period, either party may terminate with 2 months' written notice.
(b) The Tenant shall return the Premises in the same condition as received, subject to normal wear and tear.
(c) The Landlord may terminate immediately if rent is unpaid for 2 consecutive months.

9. REGISTRATION
This Agreement shall be registered as required under the Registration Act, 1908, with costs shared equally.

10. GOVERNING LAW
This Agreement shall be governed by the laws of India and the applicable state rent control legislation.

IN WITNESS WHEREOF:

________________________          ________________________
{{landlord_name}}                 {{tenant_name}}
(Landlord)                        (Tenant)

WITNESSES:
1. ________________________
2. ________________________`,
  },
  {
    slug: "partnership",
    name: "Partnership Deed",
    category: "msa",
    description: "Partnership agreement under the Indian Partnership Act, 1932. Covers profit sharing, capital contribution, roles, and dissolution terms.",
    icon: "users",
    fields: [
      { key: "firm_name", label: "Partnership Firm Name", type: "text", required: true, placeholder: "e.g. ABC & Associates" },
      { key: "partner_1", label: "Partner 1 Name", type: "text", required: true },
      { key: "partner_2", label: "Partner 2 Name", type: "text", required: true },
      { key: "business_nature", label: "Nature of Business", type: "text", required: true, placeholder: "e.g. IT Consulting Services" },
      { key: "capital_contribution", label: "Total Capital (INR)", type: "text", required: true, placeholder: "e.g. 10,00,000" },
      { key: "profit_ratio", label: "Profit Sharing Ratio", type: "text", required: true, placeholder: "e.g. 50:50 or 60:40" },
      { key: "effective_date", label: "Effective Date", type: "date", required: true },
      { key: "registered_office", label: "Registered Office Address", type: "textarea", required: true },
    ],
    body: `PARTNERSHIP DEED

This Partnership Deed ("Deed") is made on {{effective_date}},

BETWEEN:

1. {{partner_1}} (hereinafter referred to as "First Partner"),
2. {{partner_2}} (hereinafter referred to as "Second Partner"),

(Collectively referred to as the "Partners".)

WHEREAS the Partners desire to carry on business in partnership under the name "{{firm_name}}" on the terms and conditions set forth herein.

1. NAME AND NATURE OF BUSINESS
(a) The partnership shall be carried on under the name "{{firm_name}}".
(b) Nature of business: {{business_nature}}.
(c) Registered office: {{registered_office}}.

2. COMMENCEMENT
The partnership shall commence from {{effective_date}} and shall continue until dissolved by mutual agreement.

3. CAPITAL CONTRIBUTION
(a) Total capital: ₹{{capital_contribution}}.
(b) Partners shall contribute capital in proportion to their profit-sharing ratio.
(c) Additional capital may be contributed by mutual agreement.

4. PROFIT AND LOSS SHARING
Profits and losses shall be shared in the ratio of {{profit_ratio}}.

5. MANAGEMENT
(a) All Partners shall have equal rights in management unless otherwise agreed.
(b) No Partner shall engage in any competing business during the partnership.
(c) Major decisions (capital expenditure above ₹1,00,000, new partnerships, loans) require unanimous consent.

6. BANKING
The partnership shall maintain bank accounts in the firm name. Cheques and withdrawals shall require signatures of all Partners.

7. ACCOUNTS AND AUDIT
(a) Proper books of accounts shall be maintained at the registered office.
(b) Accounts shall be audited annually by a chartered accountant.
(c) Each Partner shall have access to inspect the books at reasonable times.

8. DRAWINGS
Partners may draw reasonable amounts monthly, to be adjusted against their profit share at year-end.

9. ADMISSION AND RETIREMENT
(a) No new partner shall be admitted without unanimous consent.
(b) A retiring Partner shall give 3 months' written notice.
(c) The retiring Partner's share shall be valued as per the last audited balance sheet.

10. DISSOLUTION
(a) The partnership may be dissolved by mutual written agreement.
(b) Upon dissolution, assets shall be used to settle debts first, then Partners' capital, then residual profits as per ratio.

11. GOVERNING LAW
This Deed shall be governed by the Indian Partnership Act, 1932, and the laws of India.

IN WITNESS WHEREOF:

________________________          ________________________
{{partner_1}}                     {{partner_2}}
(First Partner)                   (Second Partner)

WITNESSES:
1. ________________________
2. ________________________`,
  },
  {
    slug: "service-agreement",
    name: "Service Agreement",
    category: "msa",
    description: "General service agreement for B2B engagements. Covers service scope, SLAs, payment terms, liability limitations, and termination.",
    icon: "handshake",
    fields: [
      { key: "service_provider", label: "Service Provider Name", type: "text", required: true, placeholder: "e.g. Cloud Solutions Pvt Ltd" },
      { key: "client_name", label: "Client Name", type: "text", required: true, placeholder: "e.g. RetailMart India" },
      { key: "services_description", label: "Description of Services", type: "textarea", required: true, placeholder: "Describe the services to be provided" },
      { key: "contract_value", label: "Contract Value (INR)", type: "text", required: true, placeholder: "e.g. 5,00,000" },
      { key: "payment_terms", label: "Payment Terms", type: "select", options: ["Monthly", "Quarterly", "On milestones", "Upfront"], required: true },
      { key: "start_date", label: "Start Date", type: "date", required: true },
      { key: "end_date", label: "End Date", type: "date", required: true },
      { key: "governing_state", label: "Governing State", type: "text", required: true, placeholder: "e.g. Karnataka" },
    ],
    body: `SERVICE AGREEMENT

This Service Agreement ("Agreement") is entered into as of {{start_date}},

BETWEEN:

{{service_provider}} (hereinafter referred to as the "Service Provider"),

AND

{{client_name}} (hereinafter referred to as the "Client").

1. SERVICES
The Service Provider shall provide the following services to the Client:
{{services_description}}

2. TERM
This Agreement shall commence on {{start_date}} and continue until {{end_date}}, unless terminated earlier in accordance with Section 8.

3. COMPENSATION
(a) The Client shall pay ₹{{contract_value}} for the services.
(b) Payment terms: {{payment_terms}}.
(c) All payments are subject to applicable GST. TDS shall be deducted at source as per Income Tax Act provisions.
(d) Late payments shall attract interest at 1.5% per month.

4. SERVICE LEVELS
(a) The Service Provider shall perform services with reasonable skill and care.
(b) Response time for critical issues: 4 hours during business hours.
(c) Availability target: 99.5% uptime for hosted services (if applicable).

5. CONFIDENTIALITY
Each Party shall maintain the confidentiality of the other Party's proprietary information and shall not disclose it without prior written consent.

6. INTELLECTUAL PROPERTY
(a) Pre-existing IP of each Party shall remain with that Party.
(b) IP created specifically for the Client under this Agreement shall be assigned to the Client upon full payment.
(c) The Service Provider retains rights to general methodologies, tools, and know-how.

7. LIABILITY
(a) The Service Provider's total aggregate liability shall not exceed the total fees paid under this Agreement.
(b) Neither Party shall be liable for indirect, consequential, or punitive damages.
(c) This limitation shall not apply to breaches of confidentiality or wilful misconduct.

8. TERMINATION
(a) Either Party may terminate with 30 days' written notice.
(b) Either Party may terminate immediately for material breach if not cured within 15 days of written notice.
(c) Upon termination, the Client shall pay for services rendered up to the termination date.

9. FORCE MAJEURE
Neither Party shall be liable for delays caused by events beyond reasonable control, including natural disasters, government actions, or pandemic-related restrictions.

10. DISPUTE RESOLUTION
Disputes shall first be attempted to be resolved through mediation. Failing that, disputes shall be referred to arbitration under the Arbitration and Conciliation Act, 1996, in {{governing_state}}.

11. GOVERNING LAW
This Agreement shall be governed by the laws of India and subject to jurisdiction of courts in {{governing_state}}.

IN WITNESS WHEREOF:

________________________          ________________________
{{service_provider}}              {{client_name}}
(Authorized Signatory)            (Authorized Signatory)`,
  },
];

export function getTemplateBySlug(slug) {
  return TEMPLATES.find((t) => t.slug === slug) || null;
}

export function fillTemplate(body, values) {
  return body.replace(/\{\{(\w+)\}\}/g, (_, key) => values[key] || `{{${key}}}`);
}
