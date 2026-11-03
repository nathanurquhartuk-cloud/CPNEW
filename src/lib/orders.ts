import { create } from 'zustand'
import { ORDERS } from '../data/orders'

export type Order = (typeof ORDERS)[number] & { jobNumber?: string; study?: string; addOns?: string[]; expires?: string; windows?: { pickup: string; delivery: string }; packaging?: string; handling?: string; repeatOf?: string }

interface OrdersState {
  created: Order[]
  addOrder: (o: Order) => void
}

export const useOrders = create<OrdersState>((set) => ({
  created: [],
  addOrder: (o) => set((s) => ({ created: [o, ...s.created] })),
}))

export const allOrders = (created: Order[]) => [...created, ...(ORDERS as Order[])]

let seq = 13
export const nextOrderRef = () => `ORD-2026-${String(seq++).padStart(3, '0')}`

// Lenient natural-language date and time parser for Cora: "5 Nov 09:00", "tomorrow 9am", "Thursday 10:30", "05/11 14:00"
const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']
const DAYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
export function parseWhen(text: string, after?: Date): { date: Date; assumedTime: boolean } | null {
  const s = text.toLowerCase().replace(/[,.]/g, ' ')
  const now = new Date()
  // time: 09:00, 9.30, 9am, 14h, "at 9"
  let h = -1, m = 0
  const t1 = s.match(/\b(\d{1,2}):(\d{2})\s*(am|pm)?/) || s.match(/\b(\d{1,2})\s*(am|pm)\b/) || s.match(/\b(\d{1,2})h(?:rs)?\b/) || s.match(/\bat\s+(\d{1,2})\b/)
  if (t1) {
    h = +t1[1]; m = t1[2] && /^\d{2}$/.test(t1[2]) ? +t1[2] : 0
    const ap = t1[3] || (t1[2] && /am|pm/.test(t1[2]) ? t1[2] : undefined)
    if (ap === 'pm' && h < 12) h += 12
    if (ap === 'am' && h === 12) h = 0
    if (h > 23) h = -1
  }
  // date
  let d: Date | null = null
  const pick = (dd: number, mm: number, yy?: number) => { const x = new Date(yy ?? now.getFullYear(), mm, dd); if (!yy && x.getTime() < now.getTime() - 864e5 * 30) x.setFullYear(x.getFullYear() + 1); return x }
  const dm = s.match(/\b(\d{1,2})(?:st|nd|rd|th)?\s*(?:of\s*)?([a-z]{3,9})\b/)
  const md = s.match(/\b([a-z]{3,9})\s+(\d{1,2})(?:st|nd|rd|th)?\b(?!:)/)
  const num = s.match(/\b(\d{1,2})[\/-](\d{1,2})(?:[\/-](\d{2,4}))?\b/)
  const day = DAYS.findIndex((n) => new RegExp(`\\b${n.slice(0, 3)}`).test(s))
  if (/\btoday\b/.test(s)) d = new Date(now)
  else if (/\btomorrow\b/.test(s)) { d = new Date(now); d.setDate(d.getDate() + 1) }
  else if (dm && MONTHS.includes(dm[2].slice(0, 3))) d = pick(+dm[1], MONTHS.indexOf(dm[2].slice(0, 3)))
  else if (md && MONTHS.includes(md[1].slice(0, 3))) d = pick(+md[2], MONTHS.indexOf(md[1].slice(0, 3)))
  else if (num) d = pick(+num[1], +num[2] - 1, num[3] ? (+num[3] < 100 ? 2000 + +num[3] : +num[3]) : undefined)
  else if (day >= 0) { d = new Date(now); const diff = (day - d.getDay() + 7) % 7 || 7; d.setDate(d.getDate() + diff) }
  if (!d && h < 0) return null
  const assumedTime = h < 0
  if (!d) { d = after ? new Date(after) : new Date(now); d.setHours(h, m, 0, 0); if (d.getTime() <= (after ? after.getTime() : now.getTime())) d.setDate(d.getDate() + 1); return { date: d, assumedTime } }
  d.setHours(assumedTime ? 9 : h, assumedTime ? 0 : m, 0, 0)
  return { date: d, assumedTime }
}
export const fmtWhen = (d: Date) => d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' }) + ' ' + d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
export const fmtTime = (d: Date) => d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
export const addHours = (d: Date, h: number) => new Date(d.getTime() + h * 3600000)
