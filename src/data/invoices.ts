// Generated from the deployed portal bundle; dates are relative to today so the demo always reads as live.
import { daysFrom } from '../lib/dates'

export const INVOICES = [
  {
    number: "INV-26-0912",
    type: "Invoice",
    serviceLine: "Radiopharma",
    tier: "Critical",
    addOns: ["Data Analytics"],
    orderRef: "ORD-2026-007",
    jobNumber: "261408871CL",
    route: "Macclesfield \u2192 Charit\u00e9 \u2013 Universit\u00e4tsmedizin Berlin",
    po: "PO-AZ-88214",
    issued: daysFrom(-12),
    due: daysFrom(3),
    taxRate: 0,
    status: "Outstanding",
    items: [
      {
        description: "Critical tier transport \u00b7 door to door",
        detail: "Macclesfield \u2192 Berlin \u00b7 time-definite \u00b7 strict pick up and delivery windows included",
        qty: 1,
        unit: 24900
      },
      {
        description: "Data Analytics add-on",
        detail: "Predictive excursion risk \u00b7 temperature of record \u00b7 peer benchmarking \u00b7 sustainability reporting",
        qty: 1,
        unit: 3600
      },
      {
        description: "Class 7 dangerous goods handling and documentation",
        detail: "UN2915 \u00b7 IATA and ADR declarations \u00b7 radiation survey",
        qty: 1,
        unit: 4250
      },
      {
        description: "Type A packaging and shielding",
        qty: 2,
        unit: 1450
      },
      {
        description: "Temperature monitoring device (Controlant)",
        qty: 1,
        unit: 390
      },
      {
        description: "Fuel and security surcharge",
        qty: 1,
        unit: 2360
      }
    ],
    temperature: {
      range: "-25 to -15 \u00b0C",
      min: -22.4,
      max: -17.1,
      mean: -19.8,
      outOfRangeMin: 0,
      excursions: 0,
      sensor: "30141760",
      result: "Within specification"
    }
  },
  {
    number: "INV-26-0918",
    type: "Invoice",
    serviceLine: "Central Lab & Biostorage",
    tier: "Optimised",
    orderRef: "ORD-2026-006",
    jobNumber: "261410034CL",
    route: "London \u2192 Tata Memorial Hospital, Mumbai",
    po: "PO-AZ-88230",
    issued: daysFrom(-10),
    due: daysFrom(5),
    taxRate: 0,
    status: "Outstanding",
    items: [
      {
        description: "Optimised tier transport \u00b7 20 consignments",
        detail: "London \u2192 Mumbai \u00b7 consolidated \u00b7 2-hour response",
        qty: 20,
        unit: 1180
      },
      {
        description: "Passive 120h qualified shipper",
        qty: 20,
        unit: 215
      },
      {
        description: "Dry ice replenishment at hub",
        qty: 20,
        unit: 42
      },
      {
        description: "Temperature monitoring device",
        qty: 20,
        unit: 58
      },
      {
        description: "Customs clearance and broker fees (BOM)",
        qty: 1,
        unit: 1350
      }
    ],
    temperature: {
      range: "2 to 8 \u00b0C",
      min: 3.1,
      max: 7.4,
      mean: 5.2,
      outOfRangeMin: 0,
      excursions: 0,
      sensor: "30141775",
      result: "Within specification"
    }
  },
  {
    number: "INV-26-0921",
    type: "Invoice",
    serviceLine: "Central Lab & Biostorage",
    tier: "Optimised",
    orderRef: "ORD-2026-002",
    jobNumber: "261416022CL",
    route: "Dublin \u2192 Instituto Nacional do Cancer (INCA), Rio de Janeiro",
    po: "PO-AZ-88230",
    issued: daysFrom(-8),
    due: daysFrom(7),
    taxRate: 0,
    status: "Outstanding",
    items: [
      {
        description: "Optimised tier transport \u00b7 15 consignments",
        detail: "Dublin \u2192 Rio de Janeiro \u00b7 consolidated",
        qty: 15,
        unit: 1090
      },
      {
        description: "Passive 96h qualified shipper",
        qty: 15,
        unit: 180
      },
      {
        description: "Temperature monitoring device",
        qty: 15,
        unit: 58
      },
      {
        description: "Customs broker fees (GIG)",
        qty: 1,
        unit: 580
      }
    ],
    temperature: {
      range: "2 to 8 \u00b0C",
      min: 2.8,
      max: 6.9,
      mean: 4.6,
      outOfRangeMin: 0,
      excursions: 0,
      sensor: "30141688",
      result: "Within specification"
    }
  },
  {
    number: "INV-26-0925",
    type: "Invoice",
    serviceLine: "Clinical Supply Logistics",
    tier: "Critical",
    study: "AZ-ONC-301 \u00b7 Site 014",
    orderRef: "ORD-2026-012",
    jobNumber: "261423115CL",
    route: "WC Frankfurt depot \u2192 Charit\u00e9 \u2013 Universit\u00e4tsmedizin Berlin (Site 014)",
    po: "PO-AZ-88302",
    issued: daysFrom(-6),
    due: daysFrom(9),
    taxRate: 0,
    status: "Outstanding",
    items: [
      {
        description: "Critical tier transport \u00b7 depot to site \u00b7 3 consignments",
        detail: "Frankfurt \u2192 Berlin \u00b7 first-patient-in resupply \u00b7 30-minute response",
        qty: 3,
        unit: 2980
      },
      {
        description: "Qualified 2\u20138 \u00b0C shipper",
        qty: 3,
        unit: 165
      },
      {
        description: "Temperature monitoring device",
        qty: 3,
        unit: 58
      },
      {
        description: "IMP returns collection and destruction certificate",
        detail: "Expired lot 24G077 collected from site pharmacy",
        qty: 1,
        unit: 420
      }
    ],
    temperature: {
      range: "2 to 8 \u00b0C",
      min: 3.1,
      max: 6.4,
      mean: 4.7,
      outOfRangeMin: 0,
      excursions: 0,
      sensor: "30141855",
      result: "Within specification"
    }
  },
  {
    number: "INV-26-0887",
    type: "Invoice",
    serviceLine: "Radiopharma",
    tier: "Critical",
    addOns: ["Data Analytics"],
    orderRef: "ORD-2026-009",
    jobNumber: "261396071CL",
    route: "London \u2192 Hospital Ernesto Dornelles, Porto Alegre",
    po: "PO-AZ-88214",
    issued: daysFrom(-24),
    due: daysFrom(-9),
    taxRate: 0,
    status: "Disputed",
    disputeReason: "Charges relate to an excursion under review \u00b7 awaiting temperature-of-record outcome",
    items: [
      {
        description: "Supplementary: dry ice replenishment and re-icing at GRU",
        qty: 1,
        unit: 1250
      },
      {
        description: "Temperature-of-record review and QA report",
        qty: 1,
        unit: 850
      },
      {
        description: "Extended storage at S\u00e3o Paulo hub",
        detail: "Per day",
        qty: 2,
        unit: 1000
      }
    ],
    temperature: {
      range: "2 to 8 \u00b0C",
      min: 2.4,
      max: 8.2,
      mean: 5.1,
      outOfRangeMin: 27,
      excursions: 1,
      sensor: "30141672",
      result: "Excursion reviewed \u00b7 product released"
    }
  },
  {
    number: "INV-26-0876",
    type: "Invoice",
    serviceLine: "Central Lab & Biostorage",
    tier: "Optimised",
    orderRef: "ORD-2026-004",
    jobNumber: "261388102CL",
    route: "London \u2192 Hospital Israelita Albert Einstein, S\u00e3o Paulo",
    po: "PO-AZ-88201",
    issued: daysFrom(-34),
    due: daysFrom(-19),
    taxRate: 0,
    status: "Overdue",
    items: [
      {
        description: "Optimised tier transport \u00b7 5 consignments",
        detail: "London \u2192 S\u00e3o Paulo \u00b7 consolidated",
        qty: 5,
        unit: 1090
      },
      {
        description: "Passive 96h qualified shipper",
        qty: 5,
        unit: 180
      },
      {
        description: "Temperature monitoring device",
        qty: 5,
        unit: 58
      },
      {
        description: "Customs broker fees (GRU)",
        qty: 1,
        unit: 180
      }
    ],
    temperature: {
      range: "2 to 8 \u00b0C",
      min: 3,
      max: 7.1,
      mean: 4.9,
      outOfRangeMin: 0,
      excursions: 0,
      sensor: "30141611",
      result: "Within specification"
    }
  },
  {
    number: "INV-26-0860",
    type: "Invoice",
    serviceLine: "Radiopharma",
    tier: "Critical",
    addOns: ["Data Analytics"],
    orderRef: "ORD-2026-001",
    jobNumber: "261380004CL",
    route: "Macclesfield \u2192 Royal Marsden Hospital, Sutton",
    po: "PO-AZ-88214",
    issued: daysFrom(-23),
    due: daysFrom(-8),
    taxRate: 0,
    status: "Paid",
    paidOn: daysFrom(-11),
    remittance: "AZ-REM-204411",
    items: [
      {
        description: "Critical tier transport \u00b7 door to door",
        detail: "Macclesfield \u2192 Sutton \u00b7 time-definite \u00b7 strict pick up and delivery windows included",
        qty: 1,
        unit: 36400
      },
      {
        description: "Data Analytics add-on",
        detail: "Predictive excursion risk \u00b7 temperature of record \u00b7 peer benchmarking",
        qty: 1,
        unit: 3600
      },
      {
        description: "Class 7 dangerous goods handling and documentation",
        qty: 1,
        unit: 4250
      },
      {
        description: "Type A packaging and shielding",
        qty: 1,
        unit: 980
      }
    ],
    temperature: {
      range: "-25 to -15 \u00b0C",
      min: -23,
      max: -18.2,
      mean: -20.6,
      outOfRangeMin: 0,
      excursions: 0,
      sensor: "30141590",
      result: "Within specification"
    }
  },
  {
    number: "INV-26-0851",
    type: "Invoice",
    serviceLine: "Central Lab & Biostorage",
    tier: "Optimised",
    orderRef: "ORD-2026-000",
    jobNumber: "261379550CL",
    route: "Amsterdam \u2192 Frankfurt biorepository",
    po: "PO-AZ-88201",
    issued: daysFrom(-32),
    due: daysFrom(-17),
    taxRate: 0,
    status: "Paid",
    paidOn: daysFrom(-19),
    remittance: "AZ-REM-204102",
    items: [
      {
        description: "Optimised tier transport \u00b7 4 consignments",
        detail: "Amsterdam \u2192 Frankfurt \u00b7 road",
        qty: 4,
        unit: 620
      },
      {
        description: "Passive 96h qualified shipper",
        qty: 4,
        unit: 120
      },
      {
        description: "Temperature monitoring device",
        qty: 4,
        unit: 45
      }
    ],
    temperature: {
      range: "-80 to -60 \u00b0C",
      min: -78.9,
      max: -66.3,
      mean: -73.1,
      outOfRangeMin: 0,
      excursions: 0,
      sensor: "30141542",
      result: "Within specification"
    }
  },
  {
    number: "INV-26-0902",
    type: "Invoice",
    serviceLine: "Clinical Supply Logistics",
    tier: "Optimised",
    study: "AZ-CORE-201 \u00b7 Site 108",
    orderRef: "ORD-2026-010",
    jobNumber: "261419880CL",
    route: "WC Singapore depot \u2192 Tata Memorial Hospital, Mumbai (Site 108)",
    po: "PO-AZ-88302",
    issued: daysFrom(-20),
    due: daysFrom(-5),
    taxRate: 0,
    status: "Paid",
    paidOn: daysFrom(-7),
    remittance: "AZ-REM-204498",
    items: [
      {
        description: "Optimised tier transport \u00b7 depot to site \u00b7 8 consignments",
        detail: "Singapore \u2192 Mumbai \u00b7 scheduled site resupply",
        qty: 8,
        unit: 640
      },
      {
        description: "Qualified 2\u20138 \u00b0C shipper",
        qty: 8,
        unit: 120
      },
      {
        description: "Temperature monitoring device",
        qty: 8,
        unit: 45
      }
    ],
    temperature: {
      range: "2 to 8 \u00b0C",
      min: 2.9,
      max: 7.2,
      mean: 5,
      outOfRangeMin: 0,
      excursions: 0,
      sensor: "30141810",
      result: "Within specification"
    }
  },
  {
    number: "CN-26-0031",
    type: "Credit note",
    serviceLine: "Radiopharma",
    tier: "Critical",
    orderRef: "ORD-2026-001",
    jobNumber: "261380004CL",
    route: "Macclesfield \u2192 Royal Marsden Hospital, Sutton",
    po: "PO-AZ-88214",
    issued: daysFrom(-14),
    due: daysFrom(-14),
    taxRate: 0,
    status: "Credit applied",
    appliedTo: "INV-26-0860",
    items: [
      {
        description: "Goodwill credit \u00b7 waiting time charge waived",
        detail: "Applied to account balance against INV-26-0860",
        qty: 1,
        unit: -1250
      }
    ]
  }
]
