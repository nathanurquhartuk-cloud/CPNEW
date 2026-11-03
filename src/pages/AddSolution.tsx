import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ACCOUNT_TEAM, SpecialistOptions } from '../components/SpecialistContact'
import { Button, Page, PageHead, Pill, cx } from '../components/ui'
import { SERVICE_LINES } from '../data/serviceLines'

export default function AddSolution() {
  const [params] = useSearchParams()
  const [sel, setSel] = useState<string>(params.get('service') || '')
  const [spec, setSpec] = useState(false)
  const chosen = SERVICE_LINES.find((s) => s.id === sel)

  return (
    <Page>
      <Link to="/solutions" className="row small" style={{ gap: 6, marginBottom: 14 }}><ArrowLeft size={14} />Solutions</Link>
      <PageHead title="All services" sub="Choose a service line to add to your programme. We price the bundle against your MSA and return a firm quote within 4 hours." />
      <div className="grid cols-2">
        {SERVICE_LINES.map((s) => (
          <button key={s.id} type="button" className={cx('choice', sel === s.id && 'on')} onClick={() => setSel(s.id)} style={{ alignItems: 'flex-start' }}>
            <span style={{ flex: 1 }}>
              <span className="row between" style={{ gap: 8 }}><span className="t">{s.name}</span>{s.active ? <Pill tone="ok" dot>Active</Pill> : <Pill>Available</Pill>}</span>
              <span className="d" style={{ display: 'block' }}>{s.description}</span>
              <span className="small muted" style={{ display: 'block', marginTop: 8 }}>{s.capabilities.slice(0, 3).join(' · ')}</span>
            </span>
            {sel === s.id && <Check size={18} className="purple" />}
          </button>
        ))}
      </div>
      <div className="card pad" style={{ marginTop: 20 }}>
        {chosen ? (
          <div className="row between wrap" style={{ gap: 12 }}>
            <div>
              <div className="strong">{chosen.name}{chosen.active ? ' is already part of your programme' : ''}</div>
              <div className="muted small" style={{ marginTop: 3 }}>{chosen.active ? 'Book directly from your rate card, or request a quote to extend the bundle.' : `Tiers: ${(chosen.tiers ?? []).join(' · ')}${chosen.addOns?.length ? ` · add-ons: ${chosen.addOns.join(', ')}` : ''}`}</div>
            </div>
            <div className="row" style={{ gap: 8 }}>
              {chosen.active && <Button variant="secondary" to={`/book?mode=direct&service=${encodeURIComponent(chosen.name)}`}>Book shipment</Button>}
              <Button to={`/book?mode=quote&service=${encodeURIComponent(chosen.name)}`} icon={<ArrowRight size={16} />}>Request a quote</Button>
            </div>
          </div>
        ) : <div className="muted">Select a service line to continue.</div>}
      </div>
      <div className="row wrap" style={{ marginTop: 18, gap: 12 }}>
        <span className="muted">Not sure which fits?</span>
        <Button variant="ghost" size="sm" onClick={() => setSpec(!spec)}>Talk to a specialist</Button>
      </div>
      {spec && <div style={{ marginTop: 10 }}><SpecialistOptions team={ACCOUNT_TEAM} compact onDone={() => setSpec(false)} /></div>}
    </Page>
  )
}
