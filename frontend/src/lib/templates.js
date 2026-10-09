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
  {
    slug: "consulting-agreement",
    name: "Consulting Agreement",
    category: "sow",
    description: "Professional consulting engagement agreement for Indian businesses. Covers deliverables, fees, IP rights, confidentiality, and termination provisions.",
    icon: "clipboard",
    fields: [
      { key: "company_name", label: "Company Name", type: "text", required: true, placeholder: "e.g. InfoTech Solutions Pvt Ltd" },
      { key: "consultant_name", label: "Consultant Name / Firm", type: "text", required: true, placeholder: "e.g. Rajiv Consulting LLP" },
      { key: "engagement_scope", label: "Scope of Engagement", type: "textarea", required: true, placeholder: "Describe the consulting services, deliverables, and objectives" },
      { key: "start_date", label: "Start Date", type: "date", required: true },
      { key: "end_date", label: "End Date", type: "date", required: true },
      { key: "consulting_fee", label: "Consulting Fee (INR)", type: "text", required: true, placeholder: "e.g. 3,00,000" },
      { key: "payment_schedule", label: "Payment Schedule", type: "select", options: ["Monthly retainer", "Milestone-based", "On completion", "50% advance, 50% on completion"], required: true },
      { key: "governing_state", label: "Governing State", type: "text", required: true, placeholder: "e.g. Maharashtra" },
    ],
    body: `CONSULTING AGREEMENT

This Consulting Agreement ("Agreement") is entered into as of {{start_date}},

BETWEEN:

{{company_name}}, a company incorporated under the laws of India (hereinafter referred to as the "Company"),

AND

{{consultant_name}} (hereinafter referred to as the "Consultant").

1. ENGAGEMENT
The Company hereby engages the Consultant to provide the following consulting services:
{{engagement_scope}}

2. TERM
(a) This Agreement shall commence on {{start_date}} and terminate on {{end_date}}, unless terminated earlier or extended by mutual written agreement.
(b) Either Party may request an extension by providing written notice at least 30 days before the expiry date.

3. COMPENSATION
(a) The Company shall pay the Consultant a fee of ₹{{consulting_fee}} for the services rendered under this Agreement.
(b) Payment schedule: {{payment_schedule}}.
(c) The Consultant shall submit invoices with GST details where applicable. TDS shall be deducted at applicable rates under the Income Tax Act, 1961.
(d) Reimbursable expenses (travel, accommodation) shall be pre-approved in writing and supported by receipts.

4. INDEPENDENT CONTRACTOR
(a) The Consultant is an independent contractor and not an employee, agent, or partner of the Company.
(b) The Consultant is responsible for their own tax filings, insurance, and statutory compliance.
(c) No employment benefits including PF, ESI, gratuity, or leave entitlements shall apply.
(d) The Consultant shall not have authority to bind the Company in any manner.

5. DELIVERABLES AND REPORTING
(a) The Consultant shall deliver the agreed-upon services and deliverables within the timelines specified.
(b) The Consultant shall provide periodic progress reports as mutually agreed.
(c) The Company shall provide reasonable access to information and personnel necessary for the engagement.

6. CONFIDENTIALITY
(a) The Consultant shall maintain strict confidentiality of all proprietary information, trade secrets, business strategies, and client data of the Company.
(b) This obligation shall survive termination of this Agreement for a period of 3 years.
(c) Confidential Information excludes information that is publicly available or independently developed.

7. INTELLECTUAL PROPERTY
(a) All work product, reports, analyses, and deliverables created under this Agreement shall be the exclusive property of the Company upon full payment.
(b) The Consultant assigns all rights, title, and interest in such work product to the Company.
(c) The Consultant retains rights to pre-existing tools, methodologies, and frameworks, with a perpetual licence granted to the Company for use of such materials in the deliverables.

8. NON-SOLICITATION
During the term and for 12 months after termination, the Consultant shall not directly solicit or hire employees of the Company who were involved in this engagement.

9. CONFLICT OF INTEREST
The Consultant shall disclose any existing or potential conflicts of interest. The Consultant shall not engage with direct competitors of the Company during the term without prior written consent.

10. LIABILITY AND INDEMNIFICATION
(a) The Consultant's total liability under this Agreement shall not exceed the total fees paid or payable.
(b) Neither Party shall be liable for indirect, consequential, or punitive damages.
(c) Each Party shall indemnify the other against claims arising from breach of this Agreement or negligence.

11. TERMINATION
(a) Either Party may terminate with 30 days' written notice.
(b) The Company may terminate immediately for cause, including material breach, fraud, or misconduct.
(c) Upon termination, the Consultant shall deliver all work completed to date and return all Company materials.
(d) The Company shall pay for work completed up to the termination date.

12. FORCE MAJEURE
Neither Party shall be liable for delays caused by events beyond reasonable control, including natural disasters, government actions, strikes, or pandemic-related restrictions.

13. DISPUTE RESOLUTION
(a) Disputes shall first be resolved through good-faith negotiation within 30 days.
(b) Failing negotiation, disputes shall be referred to arbitration under the Arbitration and Conciliation Act, 1996, with the seat of arbitration in {{governing_state}}.

14. GOVERNING LAW
This Agreement shall be governed by the laws of India and subject to the exclusive jurisdiction of courts in {{governing_state}}.

15. ENTIRE AGREEMENT
This Agreement constitutes the entire agreement between the Parties. No amendment shall be valid unless in writing and signed by both Parties.

IN WITNESS WHEREOF:

________________________          ________________________
{{company_name}}                  {{consultant_name}}
(Authorized Signatory)            (Consultant Signature)`,
  },
  {
    slug: "non-compete",
    name: "Non-Compete Agreement",
    category: "nda",
    description: "Non-compete and non-solicitation agreement for employees, partners, or business associates. Includes Indian enforceability considerations under Section 27.",
    icon: "shield",
    fields: [
      { key: "company_name", label: "Company Name", type: "text", required: true, placeholder: "e.g. Pinnacle Tech Pvt Ltd" },
      { key: "individual_name", label: "Individual Name", type: "text", required: true, placeholder: "e.g. Arjun Mehta" },
      { key: "individual_role", label: "Role / Designation", type: "text", required: true, placeholder: "e.g. VP of Engineering" },
      { key: "effective_date", label: "Effective Date", type: "date", required: true },
      { key: "restricted_period", label: "Restricted Period", type: "select", options: ["6 months", "12 months", "18 months", "24 months"], required: true },
      { key: "geographic_scope", label: "Geographic Scope", type: "text", required: true, placeholder: "e.g. India or Maharashtra" },
      { key: "business_description", label: "Company's Business Description", type: "textarea", required: true, placeholder: "Describe the company's core business activities" },
      { key: "governing_state", label: "Governing State", type: "text", required: true, placeholder: "e.g. Karnataka" },
    ],
    body: `NON-COMPETE AND NON-SOLICITATION AGREEMENT

This Non-Compete and Non-Solicitation Agreement ("Agreement") is entered into as of {{effective_date}},

BETWEEN:

{{company_name}}, a company incorporated under the laws of India (hereinafter referred to as the "Company"),

AND

{{individual_name}}, serving as {{individual_role}} (hereinafter referred to as the "Individual").

RECITALS:

WHEREAS, the Individual has access to the Company's confidential information, trade secrets, client relationships, and business strategies;

WHEREAS, the Company's business involves: {{business_description}};

WHEREAS, the Parties agree that reasonable restrictions on competitive activities are necessary to protect the Company's legitimate business interests;

NOW, THEREFORE, the Parties agree as follows:

1. NON-COMPETE RESTRICTION
(a) During the term of engagement and for a period of {{restricted_period}} after cessation of engagement ("Restricted Period"), the Individual shall not, directly or indirectly:
    (i) Engage in, establish, or operate any business that competes with the Company's business;
    (ii) Accept employment or consulting engagement with any direct competitor of the Company;
    (iii) Acquire ownership interest (exceeding 5%) in any competing business.
(b) Geographic scope: {{geographic_scope}}.
(c) This restriction applies only to business activities substantially similar to the Company's core business as described herein.

2. NON-SOLICITATION OF CLIENTS
During the Restricted Period, the Individual shall not:
(a) Solicit, contact, or attempt to divert any client, customer, or business partner of the Company with whom the Individual had dealings during the last 24 months of engagement;
(b) Induce any client to reduce or terminate their business relationship with the Company.

3. NON-SOLICITATION OF EMPLOYEES
During the Restricted Period, the Individual shall not:
(a) Recruit, solicit, or induce any employee, contractor, or consultant of the Company to leave the Company;
(b) Hire or engage any person who was employed by the Company within the preceding 12 months.

4. CONFIDENTIALITY
(a) The Individual shall not use or disclose any confidential information, trade secrets, or proprietary data of the Company, whether during or after the engagement.
(b) Confidential information includes, but is not limited to: client lists, pricing strategies, product roadmaps, financial data, and business plans.

5. CONSIDERATION
The Individual acknowledges that this Agreement is supported by adequate consideration, including continued engagement, access to confidential information, and any additional compensation or benefits as specified separately.

6. INDIAN LAW ENFORCEABILITY
(a) The Parties acknowledge that Section 27 of the Indian Contract Act, 1872, renders agreements in restraint of trade void, with exceptions for goodwill sales.
(b) This Agreement is drafted to be reasonable in scope, duration, and geographic extent, and is intended to protect legitimate business interests.
(c) The restrictions herein are intended to operate during the term of engagement; post-termination restrictions are included as contractual obligations and shall be interpreted in accordance with prevailing judicial interpretation in India.
(d) If any provision is found unenforceable, the remaining provisions shall continue in full force, and the unenforceable provision shall be modified to the minimum extent necessary.

7. REMEDIES
(a) The Individual acknowledges that breach of this Agreement may cause irreparable harm to the Company.
(b) In the event of breach, the Company shall be entitled to seek injunctive relief and damages.
(c) The Company may also recover any compensation paid during the notice period.

8. TERM AND SURVIVAL
(a) This Agreement is effective from {{effective_date}} and the restrictions shall survive for the Restricted Period after cessation of engagement.
(b) Confidentiality obligations shall survive indefinitely.

9. DISPUTE RESOLUTION
Any dispute arising from this Agreement shall be resolved through arbitration under the Arbitration and Conciliation Act, 1996, with the seat of arbitration in {{governing_state}}.

10. GOVERNING LAW
This Agreement shall be governed by the laws of India and subject to the jurisdiction of courts in {{governing_state}}.

IMPORTANT NOTE: The enforceability of non-compete clauses in India is subject to judicial interpretation of Section 27 of the Indian Contract Act, 1872. Parties are advised to seek independent legal counsel.

IN WITNESS WHEREOF:

________________________          ________________________
{{company_name}}                  {{individual_name}}
(Authorized Signatory)            (Individual Signature)

WITNESSES:
1. ________________________
2. ________________________`,
  },
  {
    slug: "vendor-agreement",
    name: "Vendor / Supplier Agreement",
    category: "msa",
    description: "Vendor and supplier agreement for procurement of goods or services. Covers pricing, delivery, quality standards, warranties, and payment terms for Indian businesses.",
    icon: "truck",
    fields: [
      { key: "buyer_name", label: "Buyer / Company Name", type: "text", required: true, placeholder: "e.g. Bharat Manufacturing Ltd" },
      { key: "vendor_name", label: "Vendor / Supplier Name", type: "text", required: true, placeholder: "e.g. Quality Parts Pvt Ltd" },
      { key: "goods_description", label: "Goods / Services Description", type: "textarea", required: true, placeholder: "Describe the goods or services to be supplied" },
      { key: "contract_value", label: "Estimated Annual Value (INR)", type: "text", required: true, placeholder: "e.g. 10,00,000" },
      { key: "payment_terms", label: "Payment Terms", type: "select", options: ["Net 30 days", "Net 45 days", "Net 60 days", "Advance payment", "50% advance, 50% on delivery"], required: true },
      { key: "delivery_location", label: "Delivery Location", type: "text", required: true, placeholder: "e.g. Pune, Maharashtra" },
      { key: "start_date", label: "Agreement Start Date", type: "date", required: true },
      { key: "governing_state", label: "Governing State", type: "text", required: true, placeholder: "e.g. Maharashtra" },
    ],
    body: `VENDOR / SUPPLIER AGREEMENT

This Vendor Agreement ("Agreement") is entered into as of {{start_date}},

BETWEEN:

{{buyer_name}}, a company incorporated under the laws of India (hereinafter referred to as the "Buyer"),

AND

{{vendor_name}} (hereinafter referred to as the "Vendor").

1. SCOPE OF SUPPLY
The Vendor agrees to supply the following goods/services to the Buyer:
{{goods_description}}

The specific quantities, specifications, and delivery schedules shall be as per individual Purchase Orders issued under this Agreement.

2. TERM
(a) This Agreement shall commence on {{start_date}} and continue for a period of 12 months, unless terminated earlier.
(b) The Agreement may be renewed for additional 12-month periods by mutual written agreement at least 30 days before expiry.

3. PRICING AND PAYMENT
(a) The estimated annual value of supplies under this Agreement is ₹{{contract_value}}.
(b) Prices shall be as specified in individual Purchase Orders and shall remain firm for the duration of each order.
(c) Payment terms: {{payment_terms}} from the date of invoice and satisfactory delivery.
(d) All prices are exclusive of GST, which shall be charged at applicable rates. The Vendor shall provide valid GST invoices.
(e) TDS shall be deducted at applicable rates under the Income Tax Act, 1961.
(f) Late payments shall attract interest at 1.5% per month.

4. PURCHASE ORDERS
(a) The Buyer shall issue Purchase Orders specifying quantities, delivery dates, and any special requirements.
(b) The Vendor shall acknowledge receipt of each Purchase Order within 2 business days.
(c) A Purchase Order is deemed accepted unless the Vendor raises objections within 3 business days.

5. DELIVERY
(a) Delivery location: {{delivery_location}}.
(b) The Vendor shall deliver goods as per the delivery schedule in each Purchase Order.
(c) Delivery shall be accompanied by a delivery challan, quality certificates, and test reports where applicable.
(d) Risk and title in the goods shall pass to the Buyer upon delivery and acceptance at the delivery location.
(e) Time is of the essence. Delayed delivery beyond 7 days entitles the Buyer to a penalty of 1% of the order value per week, capped at 10%.

6. QUALITY AND INSPECTION
(a) All goods shall conform to the specifications, drawings, and quality standards as agreed.
(b) The Buyer shall have the right to inspect goods at the Vendor's premises and at the delivery location.
(c) The Buyer may reject non-conforming goods within 15 days of delivery.
(d) Rejected goods shall be replaced or refunded within 10 business days at the Vendor's cost.

7. WARRANTIES
(a) The Vendor warrants that all goods shall be free from defects in material and workmanship for a period of 12 months from delivery.
(b) The Vendor warrants that all goods comply with applicable Indian standards (BIS/IS) and regulations.
(c) The Vendor warrants that it has full rights to sell the goods and they do not infringe any third-party IP rights.

8. INDEMNIFICATION
The Vendor shall indemnify and hold harmless the Buyer against:
(a) Claims arising from defective goods or services;
(b) Claims of IP infringement related to the goods supplied;
(c) Any statutory penalties arising from the Vendor's non-compliance with applicable laws.

9. CONFIDENTIALITY
Each Party shall maintain the confidentiality of the other's proprietary information, including pricing, specifications, and business data. This obligation survives termination for 3 years.

10. COMPLIANCE
(a) The Vendor shall comply with all applicable Indian laws, including labour laws, environmental regulations, and anti-corruption laws.
(b) The Vendor shall maintain all required licences, registrations, and certifications.
(c) The Vendor shall not employ child labour or engage in any unfair labour practices.

11. INSURANCE
The Vendor shall maintain adequate insurance covering product liability, transit risks, and statutory liabilities for the duration of this Agreement.

12. TERMINATION
(a) Either Party may terminate with 60 days' written notice.
(b) The Buyer may terminate immediately if the Vendor:
    (i) Fails to deliver on time on 3 or more occasions;
    (ii) Supplies goods that fail quality standards repeatedly;
    (iii) Becomes insolvent or enters liquidation;
    (iv) Commits a material breach not cured within 15 days of notice.
(c) Upon termination, the Vendor shall complete all pending Purchase Orders unless otherwise directed.

13. FORCE MAJEURE
Neither Party shall be liable for delays due to events beyond reasonable control, including natural disasters, government restrictions, strikes, or pandemic-related disruptions. The affected Party shall notify the other within 7 days.

14. DISPUTE RESOLUTION
(a) Disputes shall first be resolved through negotiation between senior representatives within 30 days.
(b) Failing resolution, disputes shall be referred to arbitration under the Arbitration and Conciliation Act, 1996, in {{governing_state}}.

15. GOVERNING LAW
This Agreement shall be governed by the laws of India and subject to the exclusive jurisdiction of courts in {{governing_state}}.

IN WITNESS WHEREOF:

________________________          ________________________
{{buyer_name}}                    {{vendor_name}}
(Authorized Signatory)            (Authorized Signatory)`,
  },
];

export function getTemplateBySlug(slug) {
  return TEMPLATES.find((t) => t.slug === slug) || null;
}

export function fillTemplate(body, values) {
  return body.replace(/\{\{(\w+)\}\}/g, (_, key) => values[key] || `{{${key}}}`);
}
