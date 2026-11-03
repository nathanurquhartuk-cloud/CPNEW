// Generated from the deployed portal bundle; dates are relative to today so the demo always reads as live.

export const KPI_SETS = {
  "Clinical Supply Logistics": {
    sub: "Site resupply reliability, depot readiness, protocol-window delivery and returns control.",
    subscribed: true,
    metrics: [
      ["Site deliveries in window", "97%", "Within protocol delivery window", true],
      ["Depot order-to-dispatch", "6.4 h", "Median \u00b7 Critical tier 2.1 h", true],
      ["Stock-out events avoided", "9", "Proactive replenishment \u00b7 90 days", true],
      ["Sites below threshold", "2", "Replenishment booked for both", false]
    ],
    bars: [88, 90, 93, 95, 96, 96, 97],
    labels: ["Window adherence", "Depot readiness", "Temperature integrity", "Returns and destruction"],
    vals: [97, 98, 99, 94],
    detail: [
      {
        label: "Site resupply by study and depot",
        sub: "Drill down by study, site or shipment",
        to: "/studies"
      },
      {
        label: "Depot order-to-dispatch and pick accuracy",
        sub: "Frankfurt, Singapore, Boston, London",
        to: "/inventory"
      },
      {
        label: "Expiry and returns control by lot",
        sub: "Audit-ready destruction certificates",
        to: "/inventory?tab=expiry"
      },
      {
        label: "First-patient-in and rescue lead time",
        sub: "Critical tier shipments \u00b7 90 days",
        to: "/tracking"
      }
    ]
  },
  "Central Lab Logistics": {
    sub: "Study and site performance, sample integrity and collection reliability.",
    subscribed: true,
    metrics: [
      ["Collection success", "98%", "Successful planned collections", true],
      ["On-time lab delivery", "96%", "Before laboratory cut-off", true],
      ["Site protocol adherence", "92%", "Logistics-related requirements", true],
      ["At-risk samples", "7", "Active exceptions under review", false]
    ],
    bars: [84, 89, 91, 92, 94, 96, 98],
    labels: ["Site collections", "On-time delivery", "Sample integrity", "Site adherence"],
    vals: [98, 96, 99, 92],
    detail: [
      {
        label: "Missed collections by site",
        sub: "Drill down by study, site or shipment",
        to: "/studies?study=AZ-ONC-301"
      },
      {
        label: "Laboratory cut-off performance",
        sub: "Audit-ready evidence when available",
        to: "/tracking"
      },
      {
        label: "Sample temperature exceptions",
        sub: "Temperature of record per consignment",
        to: "/analytics?page=coldchain"
      },
      {
        label: "Site logistics compliance evidence",
        sub: "Inspection pack by study",
        to: "/studies"
      }
    ]
  },
  Radiopharma: {
    sub: "Dose-level precision, route resilience and time-to-administration protection.",
    subscribed: true,
    metrics: [
      ["Doses scheduled", "124", "Current planning window", true],
      ["Site delivery adherence", "96%", "Within appointment window", true],
      ["Dose utilisation", "92%", "Scheduled doses used", true],
      ["Rescue interventions", "4", "Proactively coordinated", false]
    ],
    bars: [91, 94, 90, 96, 95, 97, 96],
    labels: ["Dose window compliance", "Product release handoffs", "Route risk control", "Dose utilisation"],
    vals: [96, 98, 93, 92],
    detail: [
      {
        label: "Live dose delivery countdown",
        sub: "Decay margin per shipment",
        to: "/tracking?orderNumber=261408871CL"
      },
      {
        label: "Release-to-dispatch chain",
        sub: "Audit-ready evidence when available",
        to: "/tracking"
      },
      {
        label: "Route and customs risk",
        sub: "Predictive risk by lane",
        to: "/analytics?page=risk"
      },
      {
        label: "Dose utilisation and cost per dose",
        sub: "Data Analytics add-on",
        to: "/analytics?page=spend"
      }
    ]
  },
  "Cell & Gene": {
    sub: "Patient journeys, chain of identity, manufacturing handoffs and treatment timing.",
    subscribed: false,
    metrics: [
      ["Journeys active", "28", "Patients / batches in motion", true],
      ["Chain-of-identity checks", "99.6%", "Verified identity events", true],
      ["Cryogenic exceptions", "2", "Specialist actions underway", false],
      ["Treatment-window adherence", "96%", "Within required delivery window", true]
    ],
    bars: [90, 94, 92, 97, 98, 96, 99],
    labels: ["Identity verification", "Custody handoffs", "Cryogenic compliance", "Treatment windows"],
    vals: [99, 97, 98, 96],
    detail: [
      {
        label: "Patient-specific journey milestones",
        sub: "Available with the Cell & Gene bundle",
        to: "/place-order?mode=quote&service=Cell%20%26%20Gene%20Therapies"
      },
      {
        label: "Manufacturing release readiness",
        sub: "Available with the Cell & Gene bundle",
        to: "/place-order?mode=quote&service=Cell%20%26%20Gene%20Therapies"
      },
      {
        label: "Identity and custody audit trail",
        sub: "Available with the Cell & Gene bundle",
        to: "/place-order?mode=quote&service=Cell%20%26%20Gene%20Therapies"
      },
      {
        label: "Rescue intervention before treatment",
        sub: "Available with the Cell & Gene bundle",
        to: "/place-order?mode=quote&service=Cell%20%26%20Gene%20Therapies"
      }
    ]
  },
  "Commercial Logistics": {
    sub: "OTIF, supply continuity, distributor visibility and cost-to-serve.",
    subscribed: false,
    metrics: [
      ["OTIF performance", "97%", "On time and in full", true],
      ["Delivery exceptions", "8", "Active cases", false],
      ["Distribution lanes", "62", "Active lanes", true],
      ["Invoice match rate", "96%", "Compared with agreements", true]
    ],
    bars: [88, 90, 94, 92, 95, 96, 97],
    labels: ["OTIF", "Distributor delivery", "Temperature integrity", "Invoice assurance"],
    vals: [97, 96, 99, 96],
    detail: [
      {
        label: "Order-to-delivery milestones",
        sub: "Available with Commercial Supply Logistics",
        to: "/place-order?mode=quote&service=Commercial%20Supply%20Logistics"
      },
      {
        label: "Customer and distributor POD",
        sub: "Available with Commercial Supply Logistics",
        to: "/place-order?mode=quote&service=Commercial%20Supply%20Logistics"
      },
      {
        label: "Deviation and return trends",
        sub: "Available with Commercial Supply Logistics",
        to: "/place-order?mode=quote&service=Commercial%20Supply%20Logistics"
      },
      {
        label: "Cost per distribution lane",
        sub: "Available with Commercial Supply Logistics",
        to: "/place-order?mode=quote&service=Commercial%20Supply%20Logistics"
      }
    ]
  }
}
