import { daysFrom, fmtDayMonthYear } from '../lib/dates'

export type CapaStatus = 'Open' | 'Under investigation' | 'Corrective action in progress' | 'Effectiveness check' | 'Closed'
export type CapaType = 'Temperature excursion' | 'Failed delivery' | 'Delayed delivery' | 'Documentation'
export interface CapaAction { action: string; owner: string; due: string; status: 'Complete' | 'In progress' | 'Planned' }
export interface Capa {
  id: string
  title: string
  type: CapaType
  severity: 'Critical' | 'Major' | 'Minor'
  status: CapaStatus
  jobNumber: string
  orderRef: string
  serviceLine: string
  lane: string
  study?: string
  opened: string
  updated: string
  targetClose: string
  owner: string
  qualityLead: string
  problem: string
  containment: string[]
  investigation: string[]
  rootCause: string
  rootCauseCategory: string
  corrective: CapaAction[]
  preventive: CapaAction[]
  effectiveness: { criteria: string; due: string; result?: string }
  productImpact: string
  customerImpact: string
  regulatory: string
  signOff: { role: string; name: string; date?: string }[]
}

const d = (n: number) => fmtDayMonthYear(daysFrom(n))

export const CAPAS: Capa[] = [
  {
    id: 'CAPA-2026-018',
    title: 'Temperature excursion in transit, 8.2 °C for 27 minutes',
    type: 'Temperature excursion', severity: 'Major', status: 'Under investigation',
    jobNumber: '261396071CL', orderRef: 'ORD-2026-009', serviceLine: 'Radiopharma · Critical tier', lane: 'London (LHR) → Porto Alegre (GRU)',
    opened: d(-1), updated: d(0), targetClose: d(13), owner: 'Steven H. · EMEA control tower', qualityLead: 'Dr Lena K. · Quality and compliance',
    problem: 'Logger 30141672 recorded an internal packaging temperature of 8.2 °C for 27 minutes during the São Paulo airside transfer, outside the 2–8 °C allowable range for job 261396071CL. The consignment remains in transit on leg 4 of 5.',
    containment: ['Shipment held under controlling-office review; customer-appointed broker asked to swap the logger at São Paulo.', 'Product integrity assessment opened with the client QA contact; delivery continues under watch pending the assessment.', 'Replacement passive shipper (120 h qualified) staged at GRU in case re-icing is required.'],
    investigation: ['Logger trace reviewed: excursion coincides with a 41-minute tarmac dwell at GRU in 31 °C ambient.', 'Packaging record confirms a 96 h shipper was selected against a 108 h planned transit; residual capacity at the dwell point was under 4 h.', 'Handling records show no deviation from the SOP; the gap is in shipper selection for the lane season.'],
    rootCause: 'Shipper qualification window too short for the LHR → GRU lane in the southern-hemisphere summer; the 96 h shipper was selected by default rather than from the lane risk assessment.',
    rootCauseCategory: 'Process · lane risk assessment not linked to packaging selection',
    corrective: [
      { action: 'Re-ice and transfer to the 120 h shipper at GRU before the final road leg', owner: 'WC São Paulo', due: d(0), status: 'In progress' },
      { action: 'Complete product integrity assessment with client QA and record the outcome', owner: 'Dr Lena K.', due: d(2), status: 'In progress' },
    ],
    preventive: [
      { action: 'Default the 120 h shipper for LHR → GRU and LHR → VCP from November to March', owner: 'Packaging services', due: d(7), status: 'Planned' },
      { action: 'Link lane risk assessment residual-capacity check to shipper selection in booking', owner: 'Operations systems', due: d(30), status: 'Planned' },
    ],
    effectiveness: { criteria: 'Zero excursions attributable to shipper capacity on the LHR → South America lanes over the next 30 consignments.', due: d(45) },
    productImpact: 'Under assessment. Stability data for the product supports a 2-hour cumulative allowance above 8 °C; the excursion is inside that allowance pending QA confirmation.',
    customerImpact: 'Delivery remains on time. Temperature of record will carry the excursion annotation and the QA disposition.',
    regulatory: 'GDP deviation logged; no regulatory notification required unless QA disposition is rejected.',
    signOff: [{ role: 'Investigation owner', name: 'Steven H.', date: d(-1) }, { role: 'Quality lead', name: 'Dr Lena K.' }, { role: 'Customer QA', name: 'AstraZeneca QA' }],
  },
  {
    id: 'CAPA-2026-015',
    title: 'Temperature excursion and customs delay at Campinas',
    type: 'Temperature excursion', severity: 'Minor', status: 'Effectiveness check',
    jobNumber: '261402288CL', orderRef: 'ORD-2026-008', serviceLine: 'Central Lab & Biostorage · Critical tier', lane: 'London (LHR) → Campinas (VCP)',
    opened: d(-6), updated: d(-2), targetClose: d(24), owner: 'Priya N. · Customer service', qualityLead: 'Dr Lena K. · Quality and compliance',
    problem: 'A 12-minute excursion to 8.4 °C occurred while the consignment was held for customs inspection at VCP; the hold itself added 9 hours to the planned transit.',
    containment: ['Consignment re-iced at the broker facility; logger confirmed back in range within 12 minutes.', 'Broker alerted and pre-clearance requested for the remaining consignments on the lane.'],
    investigation: ['Customs selected the consignment for inspection because the commercial invoice listed the generic commodity code.', 'Inspection area is ambient; the shipper was opened for 12 minutes.'],
    rootCause: 'Incomplete customs documentation (commodity code) increased inspection probability; the inspection procedure does not require cold storage during examination.',
    rootCauseCategory: 'Documentation · customs data quality',
    corrective: [
      { action: 'Correct the commodity code on all open VCP consignments', owner: 'Trade services', due: d(-4), status: 'Complete' },
      { action: 'Request cold-room inspection at VCP via the appointed broker', owner: 'WC São Paulo', due: d(-3), status: 'Complete' },
    ],
    preventive: [
      { action: 'Add commodity-code validation to the booking data contract for Brazil', owner: 'Operations systems', due: d(-1), status: 'Complete' },
      { action: 'Pre-clearance by default for Central Lab consignments into Brazil', owner: 'Trade services', due: d(5), status: 'In progress' },
    ],
    effectiveness: { criteria: 'No customs-driven excursions on Brazil lanes across the next 20 consignments.', due: d(24), result: '7 of 20 consignments cleared without inspection so far' },
    productImpact: 'None. Samples remained inside the stability allowance; confirmed by client QA.',
    customerImpact: 'Delivery 9 hours late but inside the protocol window; site informed.',
    regulatory: 'GDP deviation logged and closed.',
    signOff: [{ role: 'Investigation owner', name: 'Priya N.', date: d(-6) }, { role: 'Quality lead', name: 'Dr Lena K.', date: d(-2) }, { role: 'Customer QA', name: 'AstraZeneca QA', date: d(-2) }],
  },
  {
    id: 'CAPA-2026-012',
    title: 'Failed collection at Site 014, courier unable to access pharmacy',
    type: 'Failed delivery', severity: 'Major', status: 'Closed',
    jobNumber: '261423115CL', orderRef: 'ORD-2026-012', serviceLine: 'Clinical Supply Logistics · Critical tier', lane: 'WC Frankfurt depot → Charité Berlin (Site 014)', study: 'AZ-ONC-301',
    opened: d(-12), updated: d(-3), targetClose: d(-3), owner: 'Priya N. · Customer service', qualityLead: 'Dr Lena K. · Quality and compliance',
    problem: 'The courier arrived inside the agreed window but could not access the site pharmacy; the collection was missed and rescheduled to the following day.',
    containment: ['Collection rescheduled and completed within 24 hours under the Critical tier rescue process.', 'Site coordinator contacted and access instructions confirmed.'],
    investigation: ['Site profile held the main reception address; the pharmacy is in a separate building with restricted hours.', 'Site onboarding form has no field for delivery-point access hours.'],
    rootCause: 'Site master data incomplete: the delivery point and its access hours were not captured at site onboarding.',
    rootCauseCategory: 'Master data · site onboarding',
    corrective: [
      { action: 'Update the Site 014 profile with pharmacy delivery point, contact and access hours', owner: 'Customer service', due: d(-10), status: 'Complete' },
    ],
    preventive: [
      { action: 'Add delivery point and access hours to the site onboarding checklist for all studies', owner: 'Study supply team', due: d(-5), status: 'Complete' },
      { action: 'Back-fill delivery-point data for the 80 active sites', owner: 'Customer service', due: d(-3), status: 'Complete' },
    ],
    effectiveness: { criteria: 'No access-related failed collections across all AZ sites over 60 days.', due: d(-3), result: 'Met: zero access-related failures in the review period' },
    productImpact: 'None. Materials remained in the site pharmacy under controlled conditions.',
    customerImpact: 'One-day delay to the sample collection; protocol window maintained.',
    regulatory: 'No deviation beyond the logistics record.',
    signOff: [{ role: 'Investigation owner', name: 'Priya N.', date: d(-12) }, { role: 'Quality lead', name: 'Dr Lena K.', date: d(-3) }, { role: 'Customer QA', name: 'AstraZeneca QA', date: d(-3) }],
  },
  {
    id: 'CAPA-2026-009',
    title: 'Late delivery to Site 309, missed protocol window by 2 hours',
    type: 'Delayed delivery', severity: 'Critical', status: 'Corrective action in progress',
    jobNumber: '261419880CL', orderRef: 'ORD-2026-010', serviceLine: 'Clinical Supply Logistics · Optimised tier', lane: 'WC Singapore depot → Porto Alegre (Site 309)', study: 'AZ-RAD-404',
    opened: d(-9), updated: d(-1), targetClose: d(21), owner: 'Steven H. · EMEA control tower', qualityLead: 'Dr Lena K. · Quality and compliance',
    problem: 'The consignment arrived 2 hours after the protocol delivery window following a missed airline connection at GRU; the dose was administered on the next scheduled slot.',
    containment: ['Control tower re-booked the onward flight and arranged a dedicated vehicle from GRU.', 'Site and sponsor informed; replacement dose confirmed from the regional depot.'],
    investigation: ['The Optimised tier routing used a 2 h 10 m connection at GRU, inside the airline minimum but below the lane risk assessment recommendation of 4 h for radiopharma-linked timing.', 'Weather delay of 55 minutes on the inbound leg consumed the margin.'],
    rootCause: 'Tier selection did not reflect the time-critical nature of the study material; the Optimised tier connection margin was inadequate for a dated product.',
    rootCauseCategory: 'Service design · tier fit for time-critical material',
    corrective: [
      { action: 'Move AZ-RAD-404 site deliveries to the Critical tier with a 4 h minimum connection', owner: 'Account team', due: d(-2), status: 'Complete' },
      { action: 'Credit the Optimised tier uplift difference on the affected invoice', owner: 'Billing', due: d(3), status: 'In progress' },
    ],
    preventive: [
      { action: 'Flag dated or time-critical materials at study setup so the Critical tier is proposed by default', owner: 'Study supply team', due: d(14), status: 'In progress' },
      { action: 'Add minimum-connection rules from the lane risk assessment to routing selection', owner: 'Operations systems', due: d(21), status: 'Planned' },
    ],
    effectiveness: { criteria: '100% of AZ-RAD-404 deliveries inside the protocol window over the next 15 shipments.', due: d(50) },
    productImpact: 'Dose expired against the treatment window and was destroyed per protocol; replacement supplied.',
    customerImpact: 'Patient slot moved by one day; site informed with the audit record.',
    regulatory: 'Protocol deviation reported by the site; logistics evidence supplied.',
    signOff: [{ role: 'Investigation owner', name: 'Steven H.', date: d(-9) }, { role: 'Quality lead', name: 'Dr Lena K.' }, { role: 'Customer QA', name: 'AstraZeneca QA' }],
  },
]

export const capaForJob = (job?: string) => (job ? CAPAS.find((c) => c.jobNumber === job) : undefined)
