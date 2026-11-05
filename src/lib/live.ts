import { create } from 'zustand'
import { useNotifications, Notification } from './notifications'

// Simulated real-time event: proactive shipment intelligence re-routes job 261408871CL.
// It fires a set time after the page loads (default 3 minutes; ?reroute=<seconds> for rehearsals).

interface LiveState {
  firedAt: number | null
  fire: () => void
}

export const REROUTE_NOTIFICATION: Notification = {
  id: 'n1',
  kind: 'reroute',
  tone: 'success',
  title: 'Re-routed via Berlin · job 261408871CL',
  message: 'Storm cell over Frankfurt. Proactive shipment intelligence selected Berlin direct; ETA 10:10 inside the window. No action needed.',
  time: 'Just now',
  unread: true,
  to: '/?intervention=1',
  cta: 'See the intervention timeline',
}

export const useLive = create<LiveState>((set, get) => ({
  firedAt: null,
  fire: () => {
    if (get().firedAt) return
    set({ firedAt: Date.now() })
    useNotifications.getState().add(REROUTE_NOTIFICATION)
    playChime()
    try { navigator.vibrate?.([120, 60, 120]) } catch {}
    window.dispatchEvent(new CustomEvent('live:reroute'))
  },
}))

export const rerouteDelayMs = () => {
  try {
    const q = new URLSearchParams(window.location.search).get('reroute')
    if (q !== null && q !== '' && !Number.isNaN(Number(q))) return Math.max(0, Number(q)) * 1000
  } catch {}
  return 180_000
}

// A short two-note chime from the Web Audio API, no asset required.
type AC = AudioContext
let shared: AC | null = null
const ctor = () => (window as unknown as { AudioContext?: typeof AudioContext; webkitAudioContext?: typeof AudioContext }).AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext

// Browsers only let audio start after a user gesture; unlock a shared context on the first one so the chime can play later.
export function armAudio() {
  const unlock = () => {
    try {
      const C = ctor(); if (!C) return
      shared = shared || new C()
      if (shared.state === 'suspended') shared.resume().catch(() => {})
    } catch {}
  }
  const evs = ['pointerdown', 'keydown', 'touchstart'] as const
  evs.forEach((e) => window.addEventListener(e, unlock, { passive: true }))
  return () => evs.forEach((e) => window.removeEventListener(e, unlock))
}

export function playChime() {
  try {
    const C = ctor(); if (!C) return
    const ctx = shared || (shared = new C())
    const play = () => {
      const now = ctx.currentTime
      const notes: [number, number, number][] = [[659.25, 0, 0.32], [987.77, 0.18, 0.55]] // E5 then B5
      for (const [freq, start, dur] of notes) {
        const o = ctx.createOscillator(); const g = ctx.createGain()
        o.type = 'sine'; o.frequency.value = freq
        g.gain.setValueAtTime(0.0001, now + start)
        g.gain.exponentialRampToValueAtTime(0.2, now + start + 0.02)
        g.gain.exponentialRampToValueAtTime(0.0001, now + start + dur)
        o.connect(g); g.connect(ctx.destination)
        o.start(now + start); o.stop(now + start + dur + 0.05)
      }
    }
    if (ctx.state === 'suspended') ctx.resume().then(play).catch(() => {})
    else play()
  } catch {}
}

export const minutesBefore = (at: number, mins: number) => new Date(at - mins * 60000).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
