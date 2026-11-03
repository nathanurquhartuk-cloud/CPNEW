import { RotateCcw, Send, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { INVOICES } from '../data/invoices'
import { JOBS } from '../data/jobs'
import { ORDERS } from '../data/orders'
import { STUDIES } from '../data/studies'
import { greeting, nowTime } from '../lib/dates'
import { openActions, useNotifications } from '../lib/notifications'
import { LOCALE_ACK, useSettings } from '../lib/settings'
import { LOCALES, Locale, USER } from '../lib/user'
import CoraMark from './CoraMark'
import { ACCOUNT_TEAM, BILLING_TEAM, CONTROL_TOWER, SpecialistOptions, SpecialistTeam } from './SpecialistContact'

type Action = { label: string; to?: string; run?: () => void }
type Msg = { id: number; who: 'bot' | 'user'; text: string; actions?: Action[]; specialist?: SpecialistTeam; at: string }

const opening = () => `${greeting()}, I'm Cora, your digital concierge.\n\nProactive shipment intelligence has re-routed job 261408871CL via Berlin ahead of a storm cell over Frankfurt; no action is needed. Also open today: a temperature excursion on job 261396071CL and two high-risk departures on Thursday. How can I help today?`

const SUGGESTIONS = ['Explain the re-route', 'What needs my attention?', 'Track shipment 261396071CL', 'Which invoices are due?', 'Switch to German', 'Speak with a specialist']

export default function Cora() {
  const nav = useNavigate()
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [msgs, setMsgs] = useState<Msg[]>([{ id: 1, who: 'bot', text: opening(), at: nowTime(), actions: [{ label: 'Explain the re-route', run: () => reply('Explain the re-route') }, { label: 'Show what needs attention', run: () => reply('What needs my attention?') }] }])
  const bodyRef = useRef<HTMLDivElement>(null)
  const items = useNotifications((s) => s.items)
  const setLocale = useSettings((s) => s.setLocale)
  const seq = useRef(2)

  useEffect(() => {
    const on = (e: Event) => { setOpen(true); const p = (e as CustomEvent).detail?.prompt; if (p) setTimeout(() => reply(p), 50) }
    window.addEventListener('cora:open', on)
    return () => window.removeEventListener('cora:open', on)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items])
  useEffect(() => { bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: 'smooth' }) }, [msgs, open])

  function push(m: Omit<Msg, 'id' | 'at'>) { setMsgs((prev) => [...prev, { ...m, id: seq.current++, at: nowTime() }]) }

  function answer(q: string): Omit<Msg, 'id' | 'at' | 'who'> {
    const s = q.toLowerCase()
    const go = (label: string, to: string): Action => ({ label, to })
    // language
    const loc = LOCALES.find((l) => s.includes(l.label.toLowerCase().split(' ')[0]) || s.includes(l.native.toLowerCase()) || (l.id === 'zh-CN' && /chinese|mandarin|中文/.test(s)))
    if (loc && /language|switch|change|speak|翻译|sprache|idioma|lingua|中文/.test(s)) { setLocale(loc.id as Locale); return { text: LOCALE_ACK[loc.id as Locale], actions: [go('Language settings', '/account?tab=settings')] } }
    if (/language|translate/.test(s)) return { text: 'I can switch the workspace language for you. Which would you like: English, German, Spanish, Portuguese, Italian or Chinese?', actions: LOCALES.map((l) => ({ label: l.native, run: () => reply(`Switch to ${l.label}`) })) }
    // shipment tracking
    const job = s.match(/\b(\d{8,9})(cl)?\b/)
    if (job && /track|where|status|shipment|job|eta/.test(s)) {
      const j = JOBS.find((x) => x.number.startsWith(job[1]))
      const o = ORDERS.find((x) => (x as { jobNumber?: string }).jobNumber?.startsWith(job[1]))
      if (j) return { text: `Job ${j.number} is ${j.deliveryStatus.toLowerCase()} on leg ${j.leg} of ${j.legs.length}, ETA ${j.eta}. Current temperature ${j.temp} (range ${j.tempRange}). ${j.issues.length ? `${j.issues.length} open issue${j.issues.length > 1 ? 's' : ''}: ${j.issues[0].title.toLowerCase()}.` : 'No open issues.'}`, actions: [go('Open the shipment', `/shipments?job=${j.number}`), go('Live map', '/shipments/live')] }
      if (o) return { text: `${o.id} (${o.serviceLine}, ${o.tier} tier) is ${o.status.toLowerCase()}: ${o.when}. ${o.note}`, actions: [go('Open the shipment', `/shipments?ref=${o.id}`)] }
      return { text: `I cannot find job ${job[1]} on your account. Check the number or ask your account team.`, actions: [go('All shipments', '/shipments')] }
    }
    if (/re-?route|berlin|storm|frankfurt/.test(s)) return { text: 'Job 261408871CL (Radiopharma, Critical tier) was due to cross Frankfurt by road tonight. The storm cell forecast over FRA from 22:00 raised the excursion risk from 34 to 71, so the control tower reviewed Berlin direct, Amsterdam and a hold at FRA, and selected Berlin direct on BA 992 inside your Critical tier agreement. The delivery window is protected with a 5 h 50 m decay margin and Charité has been informed. Nothing is needed from you.', actions: [go('See the intervention', '/?intervention=1'), { label: 'Speak with the monitoring specialist', run: () => reply('Speak with the monitoring specialist') }] }
    if (/attention|needs me|decision|today|open items|what.*do/.test(s)) {
      const a = items.filter((n) => n.needsAction)
      return { text: a.length ? `${a.length} item${a.length > 1 ? 's' : ''} need${a.length > 1 ? '' : 's'} your decision:\n${a.map((n) => `• ${n.title}`).join('\n')}\n\nEverything else is being handled for you.` : 'Nothing needs your decision right now. Everything else is being handled for you.', actions: [{ label: 'Review my actions', run: () => { openActions() } }] }
    }
    if (/monitoring|control tower|specialist|human|someone|talk to|speak/.test(s)) {
      const team = /invoice|billing|credit|dispute/.test(s) ? BILLING_TEAM : /account|rate|agreement|solution|quote/.test(s) ? ACCOUNT_TEAM : CONTROL_TOWER
      return { text: `${team.title}. ${team.specialist} is available now. Choose how you would like to connect about ${team.about}.`, specialist: team }
    }
    if (/invoice|due|outstanding|pay|financ|statement/.test(s)) {
      const due = INVOICES.filter((i) => /outstanding|overdue/i.test(i.status))
      return { text: `You have ${due.length} open invoices. Nearest due: ${due[0]?.number} for ${(due[0] as { total?: string }).total || 'the amount shown on the invoice'}. One supplementary invoice (INV-26-0887) is on hold pending a temperature-of-record review.`, actions: [go('Open Financials', '/financials'), { label: 'Billing specialist', run: () => reply('Speak with a billing specialist') }] }
    }
    const study = s.match(/az-[a-z]+-\d+/i)
    if (study || /stud|site|protocol/.test(s)) {
      const st = study ? STUDIES.find((x) => x.id.toLowerCase() === study[0].toLowerCase()) : undefined
      if (st) return { text: `${st.id} (${st.title}): ${st.sites} sites in ${st.countries} countries, ${st.collections} collections and ${st.deliveries} deliveries, logistics adherence ${st.adherence}%. Status: ${st.status}.`, actions: [go('Open the study', `/studies?study=${st.id}`)] }
      return { text: `You have ${STUDIES.length} active studies. Site 102 (AZ-CORE-201, Singapore) is below its stock threshold and needs a decision on the replenishment tier.`, actions: [go('Open Studies', '/studies'), go('Site 102 inventory', '/inventory?site=Site%20102')] }
    }
    if (/inventor|stock|depot|lot|expir/.test(s)) return { text: 'Site 102 in Singapore has 4 days of IMP lot 24M204 left. Replenishment ORD-2026-011 is booked on the Optimised tier and collects tomorrow; upgrading to Critical lands it within 24 hours.', actions: [go('Review the replenishment', '/inventory?site=Site%20102')] }
    if (/kpi|otif|performance|insight|analytic|report|how am i/.test(s)) return { text: 'Your OTIF for September was 97.6%, up 0.2 pp and above your 96% agreement target. Temperature compliance is 99.2% and you rank in the top 12% of shippers on the Cencora network.', actions: [go('Open Insights', '/insights')] }
    if (/agreement|rate|solution|service line|bundle|add-?on/.test(s)) return { text: 'You have three active solutions: Radiopharma (Critical tier with Data Analytics), Central Lab Logistics (Optimised bundle, Critical available per shipment) and Clinical Supply Logistics (Critical and Optimised, selected per shipment). Rates, schedules and amendments are in Solutions.', actions: [go('Open Solutions', '/solutions'), go('Request a quote', '/book?mode=quote')] }
    if (/book|new shipment|quote|order/.test(s)) return { text: 'I can start a booking for you. Direct orders price from your rate card and confirm immediately; quotes are for new service lines, bundles or add-ons.', actions: [go('Book a shipment', '/book'), go('Request a quote', '/book?mode=quote')] }
    if (/support|case|help|how do i|tour|around/.test(s)) return { text: 'The workspace has seven areas: Overview, Shipments, Studies, Inventory, Financials, Insights and Solutions. Search at the top finds any job, invoice, order, study or site reference. I can also open any page for you, or connect you to a specialist by chat, phone or call back.', actions: [go('Support and cases', '/support')] }
    if (/hello|hi\b|hey|thanks|thank you/.test(s)) return { text: `You are welcome, ${USER.first}. Anything else today?` }
    return { text: 'I can help with shipments, studies, inventory, invoices, agreements and KPIs, or connect you to a specialist. Try a job or invoice number, or ask what needs your attention.', actions: [{ label: 'What needs my attention?', run: () => reply('What needs my attention?') }, { label: 'Speak with a specialist', run: () => reply('Speak with a specialist') }] }
  }

  function reply(q: string) {
    push({ who: 'user', text: q })
    const a = answer(q)
    setTimeout(() => push({ who: 'bot', ...a }), 350)
  }

  const send = () => { const q = input.trim(); if (!q) return; setInput(''); reply(q) }

  return (
    <>
      {!open && (
        <div className="cora-launch">
          <button onClick={() => setOpen(true)} aria-label="Ask Cora, your digital concierge"><CoraMark size={26} /></button>
          <span className="lbl">Ask Cora</span>
        </div>
      )}
      {open && (
        <div className="cora" role="dialog" aria-label="Cora, your digital concierge">
          <div className="c-head">
            <span style={{ width: 36, height: 36, borderRadius: 99, background: 'rgba(255,255,255,.18)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}><CoraMark size={20} /></span>
            <div style={{ flex: 1 }}>
              <div className="n">Cora <span style={{ opacity: .7, fontWeight: 400 }}>· your digital concierge</span></div>
              <div className="s">● Online</div>
            </div>
            <button className="icon-btn" style={{ color: '#fff' }} title="Start over" onClick={() => setMsgs([{ id: 1, who: 'bot', text: opening(), at: nowTime() }])}><RotateCcw size={17} /></button>
            <button className="icon-btn" style={{ color: '#fff' }} aria-label="Close" onClick={() => setOpen(false)}><X size={18} /></button>
          </div>
          <div className="c-body" ref={bodyRef}>
            {msgs.map((m) => (
              <div key={m.id} className={`msg ${m.who}`}>
                {m.text}
                {m.specialist && <div style={{ marginTop: 12 }}><SpecialistOptions team={m.specialist} compact /></div>}
                {m.actions && (
                  <div className="acts">
                    {m.actions.map((a, i) => (<button key={i} className="chip" onClick={() => { if (a.to) { setOpen(false); nav(a.to) } else a.run?.() }}>{a.label} →</button>))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="c-sugg">{SUGGESTIONS.map((sg) => <button key={sg} className="chip" onClick={() => reply(sg)}>{sg}</button>)}</div>
          <div className="c-input">
            <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') send() }} placeholder="Ask Cora about a shipment, invoice, study…" aria-label="Message Cora" />
            <button onClick={send} aria-label="Send"><Send size={17} /></button>
          </div>
          <div className="c-foot">Cora answers from your workspace data; verify critical information before acting.</div>
        </div>
      )}
    </>
  )
}
