// Generated from the deployed portal bundle; dates are relative to today so the demo always reads as live.

export type TeamId = 'account' | 'controlTower' | 'billing'
export const SPECIALISTS_BASE: { name: string; role: string; scope: string; hours: string; online: boolean; team: TeamId }[] = [
  {
    name: "Priya N.",
    role: "Customer service lead",
    scope: "Orders, bookings, study and site supply",
    hours: "Mon\u2013Fri 08:00\u201318:00 UK",
    online: true,
    team: "account"
  },
  {
    name: "Steven H.",
    role: "Control tower \u00b7 EMEA",
    scope: "Live shipments, interventions, re-routes",
    hours: "24/7 rota",
    online: true,
    team: "controlTower"
  },
  {
    name: "James T.",
    role: "Account director",
    scope: "Agreements, rates, new service lines and bundles",
    hours: "Mon\u2013Fri 09:00\u201317:30 UK",
    online: true,
    team: "account"
  },
  {
    name: "Marcus O.",
    role: "Billing specialist",
    scope: "Invoices, disputes, credits, PEPPOL",
    hours: "Mon\u2013Fri 09:00\u201317:00 UK",
    online: true,
    team: "billing"
  },
  {
    name: "Dr Lena K.",
    role: "Quality and compliance",
    scope: "Temperature of record, deviations, audit packs",
    hours: "Mon\u2013Fri 08:00\u201317:00 CET",
    online: false,
    team: "account"
  }
]
