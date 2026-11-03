// Generated from the deployed portal bundle; dates are relative to today so the demo always reads as live.
import { minutesAgo } from '../lib/dates'

export const INITIAL_NOTIFICATIONS = [
  {
    id: "n1",
    kind: "reroute",
    tone: "success",
    title: "Re-routed via Berlin \u00b7 job 261408871CL",
    message: "Storm cell over Frankfurt. Proactive shipment intelligence selected Berlin direct; ETA 10:10 inside the window. No action needed.",
    time: `Today ${minutesAgo(38)}`,
    unread: true,
    to: "/",
    cta: "See the intervention timeline"
  },
  {
    id: "n2",
    kind: "excursion",
    tone: "danger",
    title: "Temperature excursion \u00b7 job 261396071CL",
    message: "8.2 \u00b0C for 27 minutes on LHR \u2192 GRU. Product integrity assessment in progress with the controlling office.",
    time: `Today ${minutesAgo(125)}`,
    unread: true,
    to: "/tracking?orderNumber=261396071CL",
    cta: "Open the shipment"
  },
  {
    id: "n3",
    kind: "stock",
    tone: "warning",
    title: "Site 102 below stock threshold",
    message: "AZ-CORE-201 \u00b7 Singapore. 4 days of IMP lot 24M204 left; replenishment ORD-2026-011 is booked. Upgrade to Critical tier to land within 24 hours.",
    time: `Today ${minutesAgo(190)}`,
    unread: true,
    to: "/inventory?site=Site%20102",
    cta: "Review replenishment",
    needsAction: true,
    action: "Approve or upgrade the replenishment"
  },
  {
    id: "n11",
    kind: "risk",
    tone: "warning",
    title: "2 high-risk departures on Thursday",
    message: "Jobs 26141902 (LHR \u2192 GRU, PTE 78) and 26141877 (MAD \u2192 BOG, PTE 64). Predictive risk recommends the 120h passive shipper and customs pre-clearance; your approval is needed before Wednesday 17:00.",
    time: `Today ${minutesAgo(220)}`,
    unread: true,
    to: "/analytics?page=risk",
    cta: "Review recommendations",
    needsAction: true,
    action: "Approve the packaging upgrade"
  },
  {
    id: "n4",
    kind: "delivery",
    tone: "success",
    title: "Delivered \u00b7 Site 003 Royal Marsden \u00b7 AZ-ONC-301",
    message: "IMP lot 24K118 delivered inside the protocol window. Temperature of record attached; no deviations.",
    time: `Today ${minutesAgo(260)}`,
    unread: true,
    to: "/studies?study=AZ-ONC-301",
    cta: "Open the study"
  },
  {
    id: "n5",
    kind: "invoice",
    tone: "warning",
    title: "INV-26-0912 due in 3 days",
    message: "$38,400 \u00b7 Radiopharma Critical tier \u00b7 Macclesfield \u2192 Charit\u00e9 Berlin. PDF and temperature of record are ready to download.",
    time: "Today 08:00",
    unread: false,
    to: "/invoices?invoice=INV-26-0912",
    cta: "View invoice",
    needsAction: true,
    action: "Settle or schedule payment"
  },
  {
    id: "n6",
    kind: "quote",
    tone: "info",
    title: "Quote QUO-2026-014 ready to book",
    message: "Central Lab Critical tier bundle for the frozen programme \u00b7 $14,200 \u00b7 valid for 30 days.",
    time: "Yesterday 16:42",
    unread: false,
    to: "/orders",
    cta: "Accept and book",
    needsAction: true,
    action: "Accept the quote to book"
  },
  {
    id: "n7",
    kind: "case",
    tone: "info",
    title: "Case SUP-2026-041 moved to specialist review",
    message: "Dispute on INV-26-0887 \u00b7 Marcus O. has requested the temperature-of-record outcome from quality; invoice remains on hold.",
    time: "Yesterday 09:40",
    unread: false,
    to: "/support#cases",
    cta: "Open the case",
    needsAction: true,
    action: "Confirm the dispute can stay on hold"
  },
  {
    id: "n8",
    kind: "report",
    tone: "info",
    title: "September KPI report published",
    message: "OTIF 97.6%, temperature compliance 99.2%, top 12% of network shippers. Live KPI reports now include Clinical Supply Logistics.",
    time: "Yesterday 07:05",
    unread: false,
    to: "/analytics?page=kpis",
    cta: "Open Live KPI reports"
  },
  {
    id: "n9",
    kind: "agreement",
    tone: "success",
    title: "Clinical Supply Logistics schedule active",
    message: "Schedule 3 signed \u00b7 Critical and Optimised tiers selected per shipment \u00b7 covers AZ-ONC-301, AZ-CORE-201, AZ-CGT-101 and AZ-RAD-404.",
    time: "2 days ago",
    unread: false,
    to: "/agreements",
    cta: "View the schedule"
  },
  {
    id: "n10",
    kind: "security",
    tone: "info",
    title: "New sign-in from Cambridge, UK",
    message: "Microsoft Entra ID SSO \u00b7 Edge on Windows \u00b7 10:14 today. If this was not you, review active sessions.",
    time: "Today 10:14",
    unread: false,
    to: "/account?tab=security",
    cta: "Review sessions"
  }
]
