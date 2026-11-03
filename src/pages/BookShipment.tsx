import { ArrowLeft, Check, Package, Sparkles } from 'lucide-react'
import { FormEvent, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Button, Page, PageHead, Pill, cx } from '../components/ui'
import { ORDERS } from '../data/orders'
import { SCHEDULES } from '../data/schedules'
import { SERVICE_LINES } from '../data/serviceLines'
import { STUDIES } from '../data/studies'
import { daysFrom, fmtDayMonth } from '../lib/dates'
import { openCora } from '../lib/notifications'

type Mode = 'direct' | 'quote'

export default function BookShipment() {
  const [params] = useSearchParams()
  const quoteRef = params.get('quote')
  const quote = quoteRef ? ORDERS.find((o) => o.id === quoteRef) : undefined
  const initialMode: Mode = params.get('mode') === 'quote' ? 'quote' : 'direct'
  const [mode, setMode] = useState<Mode>(initialMode)
  const [service, setService] = useState(params.get('service') || quote?.serviceLine || 'Radiopharma')
  const [tier, setTier] = useState(params.get('tier') || quote?.tier || 'Critical')
  const [study, setStudy] = useState(params.get('study') || '')
  const [site, setSite] = useState(params.get('site') || '')
  const [origin, setOrigin] = useState('')
  const [dest, setDest] = useState('')
  const [date, setDate] = useState(fmtDayMonth(daysFrom(2)))
  const [temp, setTemp] = useState('2–8 °C')
  const [notes, setNotes] = useState('')
  const [done, setDone] = useState<string | null>(null)

  const active = SERVICE_LINES.filter((s) => s.active)
  const schedule = useMemo(() => SCHEDULES.find((s) => service.startsWith(s.name.split(' ')[0])), [service])
  const isClinical = /clinical/i.test(service)
  const rate = useMemo(() => schedule?.rates.find((r) => r.tier === tier)?.rate, [schedule, tier])

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const ref = mode === 'quote' ? `QUO-2026-0${16 + Math.floor(Math.random() * 80)}` : `ORD-2026-0${13 + Math.floor(Math.random() * 80)}`
    setDone(ref)
  }

  if (done) {
    return (
      <Page>
        <div className="card pad" style={{ maxWidth: 640, margin: '40px auto', textAlign: 'center', padding: '44px 32px' }}>
          <span className="icon-wrap ok lg" style={{ margin: '0 auto 16px' }}><Check size={24} /></span>
          <h1 style={{ fontSize: 26 }}>{mode === 'quote' ? 'Quote requested' : 'Shipment booked'}</h1>
          <p className="muted" style={{ marginTop: 8 }}>
            {mode === 'quote' ? `Reference ${done}. CPQ prices the request against your MSA and returns a firm quote within 4 hours, valid for 30 days.` : `Reference ${done}. Priced from your rate card${rate ? ` at $${rate}` : ''}, confirmed immediately and visible in Shipments with a job number within minutes.`}
          </p>
          <div className="row" style={{ justifyContent: 'center', gap: 10, marginTop: 24 }}>
            <Button to="/shipments">Go to Shipments</Button>
            <Button variant="secondary" onClick={() => setDone(null)}>Book another</Button>
          </div>
        </div>
      </Page>
    )
  }

  return (
    <Page>
      <Link to="/shipments" className="row small" style={{ gap: 6, marginBottom: 14 }}><ArrowLeft size={14} />Shipments</Link>
      <PageHead title={mode === 'quote' ? 'Request a quote' : 'Book a shipment'} sub={mode === 'quote' ? 'For new service lines, bundles or add-ons. CPQ prices against your MSA and returns a firm quote within 4 hours.' : 'Direct orders are priced from your rate card and confirmed immediately.'} />

      {quote && (
        <div className="tip" style={{ marginBottom: 20, fontStyle: 'normal' }}><Sparkles size={16} />Accepting quote {quote.id}: {quote.route} · {quote.value}. Confirm the details below to book.</div>
      )}

      <form onSubmit={submit} className="grid" style={{ gridTemplateColumns: 'minmax(0, 1fr) 320px', gap: 24, alignItems: 'start' }}>
        <div className="stack" style={{ gap: 20 }}>
          <div className="grid cols-2">
            {([['direct', 'Direct order', 'Priced from your rate card, confirmed now'], ['quote', 'Request a quote', 'New service lines, bundles or add-ons']] as [Mode, string, string][]).map(([m, t, d]) => (
              <button type="button" key={m} className={cx('choice', mode === m && 'on')} onClick={() => setMode(m)}>
                <span className="icon-wrap" style={{ width: 34, height: 34 }}>{m === 'direct' ? <Package size={17} /> : <Sparkles size={17} />}</span>
                <span><span className="t">{t}</span><span className="d" style={{ display: 'block' }}>{d}</span></span>
              </button>
            ))}
          </div>

          <div className="card pad">
            <div className="strong" style={{ marginBottom: 14 }}>Service</div>
            <div className="grid cols-2">
              <div className="field"><label>Service line</label>
                <select className="select" value={service} onChange={(e) => setService(e.target.value)}>
                  {(mode === 'quote' ? SERVICE_LINES : active).map((s) => <option key={s.id} value={s.name}>{s.name}{s.active ? '' : ' (new)'}</option>)}
                </select>
              </div>
              <div className="field"><label>Tier</label>
                <select className="select" value={tier} onChange={(e) => setTier(e.target.value)}>
                  <option>Critical</option>{!/radiopharma/i.test(service) && <option>Optimised</option>}
                </select>
              </div>
            </div>
            {isClinical && (
              <div className="grid cols-2" style={{ marginTop: 14 }}>
                <div className="field"><label>Study</label>
                  <select className="select" value={study} onChange={(e) => setStudy(e.target.value)}><option value="">Select a study</option>{STUDIES.map((s) => <option key={s.id} value={s.id}>{s.id} · {s.title}</option>)}</select>
                </div>
                <div className="field"><label>Site</label><input className="input" value={site} onChange={(e) => setSite(e.target.value)} placeholder="Site 014" /></div>
              </div>
            )}
          </div>

          <div className="card pad">
            <div className="strong" style={{ marginBottom: 14 }}>Route and timing</div>
            <div className="grid cols-2">
              <div className="field"><label>Collect from</label><input className="input" value={origin} onChange={(e) => setOrigin(e.target.value)} placeholder={isClinical ? 'WC Frankfurt depot' : 'Macclesfield'} required /></div>
              <div className="field"><label>Deliver to</label><input className="input" value={dest} onChange={(e) => setDest(e.target.value)} placeholder="Charité Berlin" required /></div>
              <div className="field"><label>Collection date</label><input className="input" value={date} onChange={(e) => setDate(e.target.value)} /></div>
              <div className="field"><label>Temperature range</label>
                <select className="select" value={temp} onChange={(e) => setTemp(e.target.value)}><option>Ambient 15–25 °C</option><option>2–8 °C</option><option>−25 to −15 °C</option><option>Cryogenic</option></select>
              </div>
            </div>
            <div className="field" style={{ marginTop: 14 }}><label>Commodity and notes</label><textarea className="textarea" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Product, quantity, dangerous goods class, special handling" /></div>
          </div>
        </div>

        <aside className="card pad" style={{ position: 'sticky', top: 84 }}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>Summary</div>
          <div className="stack" style={{ gap: 10 }}>
            <div className="row between"><span className="muted small">Type</span><Pill tone="brand">{mode === 'quote' ? 'Quote' : 'Direct order'}</Pill></div>
            <div className="row between"><span className="muted small">Service</span><span className="strong small" style={{ textAlign: 'right' }}>{service}</span></div>
            <div className="row between"><span className="muted small">Tier</span><span className="strong small">{tier}</span></div>
            {study && <div className="row between"><span className="muted small">Study</span><span className="strong small">{study}{site ? ` · ${site}` : ''}</span></div>}
            <div className="row between"><span className="muted small">Collection</span><span className="strong small">{date}</span></div>
            <div className="row between"><span className="muted small">Temperature</span><span className="strong small">{temp}</span></div>
            <div style={{ borderTop: '1px solid var(--line)', paddingTop: 10 }} className="row between">
              <span className="muted small">{mode === 'quote' ? 'Pricing' : 'Rate card'}</span>
              <span className="strong">{mode === 'quote' ? 'Firm quote in 4 h' : rate ? `$${rate}` : 'Per schedule'}</span>
            </div>
          </div>
          <div className="stack" style={{ marginTop: 18 }}>
            <Button type="submit" block>{mode === 'quote' ? 'Request quote' : 'Confirm booking'}</Button>
            <Button variant="ghost" block onClick={() => openCora(`Help me ${mode === 'quote' ? 'request a quote' : 'book a shipment'} for ${service}`)}>Ask Cora for help</Button>
          </div>
          <div className="tiny faint" style={{ marginTop: 12 }}>Approved commercial terms in your MSA govern pricing. Nothing is booked until you confirm.</div>
        </aside>
      </form>
    </Page>
  )
}
