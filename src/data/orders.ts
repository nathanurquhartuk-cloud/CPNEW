// Generated from the deployed portal bundle; dates are relative to today so the demo always reads as live.
import { daysFrom, fmtDayMonth, today } from '../lib/dates'

export const ORDERS = [
  {
    id: "QUO-2026-014",
    kind: "Quote",
    serviceLine: "Central Lab & Biostorage",
    tier: "Critical",
    route: "Dublin \u2192 Rio de Janeiro (INCA)",
    status: "Quote ready",
    when: `Quoted ${fmtDayMonth(daysFrom(-1))}`,
    value: "$14,200",
    expires: `Valid until ${fmtDayMonth(daysFrom(29))}`,
    note: "Bundle change \u00b7 Critical tier bundle for frozen programme \u00b7 20 consignments"
  },
  {
    id: "QUO-2026-015",
    kind: "Quote",
    serviceLine: "Cell & Gene Therapies",
    tier: "Critical",
    addOns: ["Chain of identity", "Cryogenic dry shipper"],
    route: "Boston \u2192 London (Royal Free)",
    status: "Quote requested",
    when: `Requested ${fmtDayMonth(today())}`,
    value: "Pricing",
    note: "New service line \u00b7 Critical tier bundle with add-ons \u00b7 CPQ pricing"
  },
  {
    id: "ORD-2026-012",
    kind: "Direct",
    serviceLine: "Clinical Supply Logistics",
    tier: "Critical",
    study: "AZ-ONC-301 \u00b7 Site 014",
    route: "WC Frankfurt depot \u2192 Charit\u00e9 Berlin (Site 014)",
    status: "In Transit",
    when: `ETA ${fmtDayMonth(daysFrom(1))}, 7 AM`,
    value: "$10,029",
    jobNumber: "261423115CL",
    note: "First-patient-in resupply \u00b7 IMP lot 24K118"
  },
  {
    id: "ORD-2026-011",
    kind: "Direct",
    serviceLine: "Clinical Supply Logistics",
    tier: "Optimised",
    study: "AZ-CORE-201 \u00b7 Site 102",
    route: "WC Singapore depot \u2192 National Cancer Centre Singapore (Site 102)",
    status: "Booked",
    when: `Pick-up ${fmtDayMonth(daysFrom(1))}`,
    value: "$2,184",
    jobNumber: "261424402CL",
    note: "Replenishment \u00b7 stock below threshold"
  },
  {
    id: "ORD-2026-009",
    kind: "Direct",
    serviceLine: "Radiopharma",
    tier: "Critical",
    addOns: ["Data Analytics"],
    route: "London \u2192 Hospital Ernesto Dornelles, Porto Alegre",
    status: "In Transit",
    when: `ETA ${fmtDayMonth(daysFrom(2))}, 3 PM`,
    value: "$18,640",
    jobNumber: "261396071CL",
    note: "Temperature excursion under review"
  },
  {
    id: "ORD-2026-008",
    kind: "Direct",
    serviceLine: "Central Lab & Biostorage",
    tier: "Critical",
    route: "London \u2192 Universidade Estadual de Campinas",
    status: "In Transit",
    when: `ETA ${fmtDayMonth(daysFrom(2))}, 2 PM`,
    value: "$9,870",
    jobNumber: "261402288CL",
    note: "Customs delay risk at GRU"
  },
  {
    id: "ORD-2026-007",
    kind: "Direct",
    serviceLine: "Radiopharma",
    tier: "Critical",
    addOns: ["Data Analytics"],
    route: "Macclesfield \u2192 Charit\u00e9 Berlin",
    status: "In Transit",
    when: `ETA ${fmtDayMonth(daysFrom(1))}, 9 AM`,
    value: "$12,310",
    jobNumber: "261408871CL"
  },
  {
    id: "ORD-2026-006",
    kind: "Direct",
    serviceLine: "Central Lab & Biostorage",
    tier: "Optimised",
    route: "London \u2192 Tata Memorial Hospital, Mumbai",
    status: "In Transit",
    when: `ETA ${fmtDayMonth(daysFrom(3))}, 6 PM`,
    value: "$6,420",
    jobNumber: "261410034CL"
  },
  {
    id: "ORD-2026-002",
    kind: "Direct",
    serviceLine: "Central Lab & Biostorage",
    tier: "Optimised",
    route: "Dublin \u2192 Instituto Nacional do Cancer (INCA)",
    status: "In Transit",
    when: `ETA ${fmtDayMonth(daysFrom(2))}, 3 PM`,
    value: "$12,450",
    jobNumber: "261416022CL",
    note: "Logger low battery \u00b7 swap arranged"
  },
  {
    id: "ORD-2026-003",
    kind: "Direct",
    serviceLine: "Radiopharma",
    tier: "Critical",
    addOns: ["Data Analytics"],
    route: "Macclesfield \u2192 Guy\u2019s Cancer Centre, London",
    status: "Processing",
    when: `Pick-up ${fmtDayMonth(daysFrom(1))}, 5 AM`,
    value: "$28,900",
    jobNumber: "261421770CL",
    note: "DG documentation pre-populated from MDM"
  },
  {
    id: "ORD-2026-005",
    kind: "Direct",
    serviceLine: "Central Lab & Biostorage",
    tier: "Optimised",
    route: "London \u2192 Hospital Israelita Albert Einstein",
    status: "Booked",
    when: `Pick-up ${fmtDayMonth(daysFrom(2))}`,
    value: "$7,980",
    jobNumber: "261405510CL"
  },
  {
    id: "ORD-2026-001",
    kind: "Direct",
    serviceLine: "Radiopharma",
    tier: "Critical",
    addOns: ["Data Analytics"],
    route: "Macclesfield \u2192 Royal Marsden Hospital",
    status: "Delivered",
    when: "Delivered 20 Sep",
    value: "$45,230",
    jobNumber: "261380004CL"
  },
  {
    id: "ORD-2026-000",
    kind: "Direct",
    serviceLine: "Central Lab & Biostorage",
    tier: "Critical",
    route: "Amsterdam \u2192 Frankfurt biorepository",
    status: "Delivered",
    when: "Delivered 12 Sep",
    value: "$3,140",
    jobNumber: "261380004CL"
  },
  {
    id: "ORD-2026-010",
    kind: "Direct",
    serviceLine: "Clinical Supply Logistics",
    tier: "Optimised",
    study: "AZ-CORE-201 \u00b7 Site 108",
    route: "WC Singapore depot \u2192 Tata Memorial Hospital, Mumbai (Site 108)",
    status: "Delivered",
    when: `Delivered ${fmtDayMonth(daysFrom(-3))}`,
    value: "$6,440",
    jobNumber: "261419880CL"
  }
]
