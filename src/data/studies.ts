// Generated from the deployed portal bundle; dates are relative to today so the demo always reads as live.

export const STUDIES = [
  {
    id: "AZ-ONC-301",
    title: "Phase III \u00b7 AZD-4573 in advanced solid tumours",
    phase: "Phase III",
    therapeuticArea: "Oncology",
    serviceLines: ["clinical", "centrallab"],
    sites: 28,
    countries: 9,
    collections: 421,
    deliveries: 409,
    adherence: 96,
    status: "Recruiting",
    siteList: [
      {
        id: "Site 014",
        name: "Charit\u00e9 \u2013 Universit\u00e4tsmedizin Berlin",
        city: "Berlin",
        country: "Germany",
        region: "EMEA",
        lastDelivery: "2 days ago",
        nextResupply: "Thu \u00b7 Critical",
        adherence: 91,
        openIssues: 1,
        health: "Action",
        depot: "Frankfurt",
        stockDays: 6
      },
      {
        id: "Site 028",
        name: "Hospital Israelita Albert Einstein",
        city: "S\u00e3o Paulo",
        country: "Brazil",
        region: "LATAM",
        lastDelivery: "5 days ago",
        nextResupply: "Mon",
        adherence: 97,
        openIssues: 1,
        health: "Watch",
        depot: "Boston",
        stockDays: 19
      },
      {
        id: "Site 003",
        name: "Royal Marsden Hospital",
        city: "Sutton",
        country: "United Kingdom",
        region: "EMEA",
        lastDelivery: "Yesterday",
        nextResupply: "In 12 days",
        adherence: 99,
        openIssues: 0,
        health: "Good",
        depot: "London",
        stockDays: 34
      },
      {
        id: "Site 041",
        name: "Instituto Nacional do Cancer (INCA)",
        city: "Rio de Janeiro",
        country: "Brazil",
        region: "LATAM",
        lastDelivery: "3 days ago",
        nextResupply: "In 9 days",
        adherence: 95,
        openIssues: 0,
        health: "Good",
        depot: "Boston",
        stockDays: 22
      },
      {
        id: "Site 057",
        name: "Universidade Estadual de Campinas",
        city: "Campinas",
        country: "Brazil",
        region: "LATAM",
        lastDelivery: "6 days ago",
        nextResupply: "Tomorrow",
        adherence: 94,
        openIssues: 0,
        health: "Good",
        depot: "Boston",
        stockDays: 11
      }
    ],
    milestones: [
      {
        date: "Today",
        title: "Site 014 \u00b7 missed collection rescheduled",
        detail: "Courier could not access the pharmacy before cut-off; specialist rebooked for 07:30 tomorrow and notified the site coordinator.",
        tone: "warn"
      },
      {
        date: "Yesterday",
        title: "Site 003 \u00b7 resupply delivered inside window",
        detail: "IMP lot 24K118 \u00b7 2\u20138 \u00b0C \u00b7 temperature of record attached.",
        tone: "ok"
      },
      {
        date: "3 days ago",
        title: "Protocol amendment 4 effective",
        detail: "Dosing schedule change raises site resupply frequency from 4 to 3 weeks; depot forecast updated.",
        tone: "info"
      }
    ]
  },
  {
    id: "AZ-CORE-201",
    title: "Phase II \u00b7 cardiovascular outcomes",
    phase: "Phase II",
    therapeuticArea: "Cardiovascular, renal and metabolism",
    serviceLines: ["clinical", "centrallab"],
    sites: 22,
    countries: 7,
    collections: 315,
    deliveries: 309,
    adherence: 98,
    status: "Active",
    siteList: [
      {
        id: "Site 102",
        name: "National Cancer Centre Singapore",
        city: "Singapore",
        country: "Singapore",
        region: "APAC",
        lastDelivery: "8 days ago",
        nextResupply: "Overdue \u00b7 stock below threshold",
        adherence: 93,
        openIssues: 1,
        health: "Action",
        depot: "Singapore",
        stockDays: 4
      },
      {
        id: "Site 108",
        name: "Tata Memorial Hospital",
        city: "Mumbai",
        country: "India",
        region: "APAC",
        lastDelivery: "In transit",
        nextResupply: "Arriving in 3 days",
        adherence: 96,
        openIssues: 0,
        health: "Good",
        depot: "Singapore",
        stockDays: 9
      },
      {
        id: "Site 115",
        name: "Guy\u2019s Cancer Centre",
        city: "London",
        country: "United Kingdom",
        region: "EMEA",
        lastDelivery: "4 days ago",
        nextResupply: "In 15 days",
        adherence: 100,
        openIssues: 0,
        health: "Good",
        depot: "London",
        stockDays: 27
      }
    ],
    milestones: [
      {
        date: "Today",
        title: "Site 102 \u00b7 resupply recommended",
        detail: "Depot forecast shows site stock below the 7-day threshold; a replenishment request is ready to approve on the Inventory page.",
        tone: "bad"
      },
      {
        date: "2 days ago",
        title: "Site 108 \u00b7 shipment departed Singapore depot",
        detail: "Job 261410034CL \u00b7 Optimised tier \u00b7 ETA inside the protocol window.",
        tone: "ok"
      }
    ]
  },
  {
    id: "AZ-CGT-101",
    title: "Phase I \u00b7 autologous cell therapy",
    phase: "Phase I",
    therapeuticArea: "Cell and gene therapy",
    serviceLines: ["centrallab"],
    sites: 18,
    countries: 5,
    collections: 190,
    deliveries: 186,
    adherence: 99,
    status: "Active",
    siteList: [
      {
        id: "Site 201",
        name: "Royal Free Hospital",
        city: "London",
        country: "United Kingdom",
        region: "EMEA",
        lastDelivery: "Yesterday",
        nextResupply: "In 6 days",
        adherence: 100,
        openIssues: 0,
        health: "Good",
        depot: "London",
        stockDays: 18
      },
      {
        id: "Site 207",
        name: "Dana-Farber Cancer Institute",
        city: "Boston",
        country: "United States",
        region: "North America",
        lastDelivery: "2 days ago",
        nextResupply: "In 10 days",
        adherence: 98,
        openIssues: 0,
        health: "Good",
        depot: "Boston",
        stockDays: 25
      }
    ],
    milestones: [
      {
        date: "Yesterday",
        title: "Apheresis collection \u00b7 Site 201",
        detail: "Chain of identity verified at collection and at the manufacturing handoff.",
        tone: "ok"
      },
      {
        date: "Last week",
        title: "Cell & Gene Therapies quote requested",
        detail: "QUO-2026-015 \u00b7 Critical tier bundle with chain of identity and cryogenic dry shipper add-ons \u00b7 CPQ pricing.",
        tone: "info"
      }
    ]
  },
  {
    id: "AZ-RAD-404",
    title: "Phase II \u00b7 radioligand therapy",
    phase: "Phase II",
    therapeuticArea: "Oncology \u00b7 radiopharmaceutical",
    serviceLines: ["radiopharma"],
    sites: 12,
    countries: 4,
    collections: 142,
    deliveries: 138,
    adherence: 92,
    status: "Recruiting",
    siteList: [
      {
        id: "Site 301",
        name: "Charit\u00e9 \u2013 Universit\u00e4tsmedizin Berlin",
        city: "Berlin",
        country: "Germany",
        region: "EMEA",
        lastDelivery: "In transit \u00b7 re-routed via BER",
        nextResupply: "Tomorrow 10:10",
        adherence: 90,
        openIssues: 0,
        health: "Watch",
        depot: "Macclesfield",
        stockDays: 0
      },
      {
        id: "Site 305",
        name: "Guy\u2019s Cancer Centre",
        city: "London",
        country: "United Kingdom",
        region: "EMEA",
        lastDelivery: "3 days ago",
        nextResupply: "Tomorrow 07:00",
        adherence: 95,
        openIssues: 0,
        health: "Good",
        depot: "Macclesfield",
        stockDays: 0
      },
      {
        id: "Site 309",
        name: "Hospital Ernesto Dornelles",
        city: "Porto Alegre",
        country: "Brazil",
        region: "LATAM",
        lastDelivery: "In transit",
        nextResupply: "In 2 days",
        adherence: 88,
        openIssues: 1,
        health: "Action",
        depot: "London",
        stockDays: 0
      }
    ],
    milestones: [
      {
        date: "Today",
        title: "Site 301 \u00b7 dose re-routed via Berlin ahead of storm cell",
        detail: "Proactive shipment intelligence selected Berlin direct; decay margin 5 h 50 m protected.",
        tone: "ok"
      },
      {
        date: "Today",
        title: "Site 309 \u00b7 temperature excursion under review",
        detail: "Job 261396071CL \u00b7 8.2 \u00b0C for 27 min \u00b7 product integrity assessment in progress.",
        tone: "bad"
      }
    ]
  }
]
