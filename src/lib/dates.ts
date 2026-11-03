// Relative date helpers so the demo data always reads as "today".
export const today = () => { const d = new Date(); d.setHours(0, 0, 0, 0); return d }
export const daysFrom = (n: number, base: Date = today()) => { const d = new Date(base); d.setDate(d.getDate() + n); return d }
export const fmtDayMonth = (d: Date) => d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
export const fmtDayMonthYear = (d: Date) => d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
export const fmtMonDay = (d: Date) => d.toLocaleDateString('en-US', { month: 'short', day: '2-digit' })
export const fmtNumeric = (d: Date) => d.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }).replace(/\//g, '-')
export const fmtUtc18 = (d: Date) => `${d.getDate()} ${d.toLocaleDateString('en-GB', { month: 'short' })} ${d.getFullYear()} 18:00 UTC`
export const fmtLong = (d: Date) => d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })
export const minutesAgo = (n: number) => new Date(Date.now() - n * 60000).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
export const daysUntil = (d: Date) => Math.round((d.getTime() - today().getTime()) / 864e5)
export const greeting = () => { const h = new Date().getHours(); return h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening' }
export const nowTime = () => new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
