import { create } from 'zustand'
import { INITIAL_NOTIFICATIONS } from '../data/notifications'

export type NotifKind = 'reroute' | 'excursion' | 'stock' | 'invoice' | 'quote' | 'agreement' | 'report' | 'case' | 'delivery' | 'security' | 'risk'
export type Tone = 'success' | 'danger' | 'warning' | 'info'
export interface Notification {
  id: string
  kind: NotifKind
  tone: Tone
  title: string
  message: string
  time: string
  unread: boolean
  to: string
  cta: string
  needsAction?: boolean
  action?: string
}

interface State {
  items: Notification[]
  dismissed: Notification[]
  dismiss: (id: string) => void
  markRead: (id: string) => void
  markAllRead: () => void
  clearAll: () => void
  restore: () => void
  add: (n: Notification) => void
}

export const useNotifications = create<State>((set) => ({
  items: (INITIAL_NOTIFICATIONS as Notification[]).filter((n) => n.kind !== 'reroute'),
  dismissed: [],
  dismiss: (id) => set((s) => { const n = s.items.find((x) => x.id === id); return { items: s.items.filter((x) => x.id !== id), dismissed: n ? [...s.dismissed, n] : s.dismissed } }),
  markRead: (id) => set((s) => ({ items: s.items.map((x) => (x.id === id ? { ...x, unread: false } : x)) })),
  markAllRead: () => set((s) => ({ items: s.items.map((x) => ({ ...x, unread: false })) })),
  clearAll: () => set((s) => ({ items: [], dismissed: [...s.dismissed, ...s.items] })),
  restore: () => set((s) => ({ items: [...s.dismissed.filter((n) => n.kind === 'reroute'), ...(INITIAL_NOTIFICATIONS as Notification[]).filter((n) => n.kind !== 'reroute')], dismissed: [] })),
  add: (n) => set((s) => ({ items: [n, ...s.items.filter((x) => x.id !== n.id)] })),
}))

// Cross-component events (kept from the original portal so deep links keep working)
export const openCora = (prompt?: string) => window.dispatchEvent(new CustomEvent('cora:open', { detail: { prompt } }))
export const openActions = () => window.dispatchEvent(new CustomEvent('actions:open'))
export const openNotifications = () => window.dispatchEvent(new CustomEvent('notifications:open'))

// Route aliases: old portal links keep resolving in the new workspace
export const routeAlias = (to: string) => to
  .replace(/^\/orders/, '/shipments')
  .replace(/^\/tracking/, '/shipments/live')
  .replace(/^\/invoices/, '/financials')
  .replace(/^\/agreements/, '/solutions')
  .replace(/^\/analytics/, '/insights')
