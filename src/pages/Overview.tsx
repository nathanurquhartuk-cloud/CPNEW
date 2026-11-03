import { ArrowRight, FlaskConical, MapPin, Package, Receipt } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import LaneReroute from '../components/LaneReroute'
import CoraMark from '../components/CoraMark'
import { Button, Page, QuickAction, Section } from '../components/ui'
import { SCHEDULES } from '../data/schedules'
import { fmtLong, greeting, today } from '../lib/dates'
import { openActions, useNotifications } from '../lib/notifications'
import { USER } from '../lib/user'

export default function Overview() {
  const [params] = useSearchParams()
  const items = useNotifications((s) => s.items)
  const needs = items.filter((n) => n.needsAction).length
  const handled = items.filter((n) => !n.needsAction && (n.kind === 'reroute' || n.kind === 'excursion' || n.kind === 'risk')).length

  return (
    <Page>
      <div className="hero">
        <div className="eyebrow" style={{ marginBottom: 10 }}>{fmtLong(today())} · {USER.company} workspace</div>
        <h1>{greeting()}, {USER.first}</h1>
        <div className="sub">Your logistics are in good hands.</div>
      </div>

      <div className="banner" style={{ marginTop: 28 }}>
        <span className="icon-wrap lg" style={{ background: 'var(--purple)', color: '#fff' }}><CoraMark size={24} /></span>
        <div className="grow">
          <div className="title">Cora's daily update</div>
          <div className="text">
            {needs > 0 ? `${needs} item${needs > 1 ? 's' : ''} need${needs > 1 ? '' : 's'} your decision.` : 'Nothing needs your decision.'} We are managing {handled} exception{handled === 1 ? '' : 's'}. Everything else is progressing as planned.
          </div>
        </div>
        <Button onClick={openActions} icon={<ArrowRight size={16} />}>Review my actions</Button>
      </div>

      <Section title="What would you like to do?">
        <div className="grid cols-3">
          <QuickAction icon={<Package size={28} strokeWidth={1.6} />} label="Book shipment" to="/book" />
          <QuickAction icon={<MapPin size={28} strokeWidth={1.6} />} label="Track shipment" to="/shipments/live" />
          <QuickAction icon={<FlaskConical size={28} strokeWidth={1.6} />} label="My studies" to="/studies" />
        </div>
      </Section>

      <Section title="Handled for you today">
        <LaneReroute defaultOpen={params.get('intervention') === '1'} />
      </Section>

      <Section title="Your solutions" action={<a href="#/solutions">All solutions <ArrowRight size={14} style={{ verticalAlign: -2 }} /></a>}>
        <div className="card" style={{ overflow: 'hidden' }}>
          {SCHEDULES.map((s) => (
            <a key={s.id} href={`#/solutions?schedule=${s.id}`} className="list-row click" style={{ color: 'inherit' }}>
              <span className="icon-wrap"><Receipt size={18} /></span>
              <div className="grow">
                <div className="title">{s.name}</div>
                <div className="meta ellipsis">{s.tierSummary}</div>
              </div>
              <span className="small muted hide-m">{s.volume} · {s.utilisation}% utilised</span>
              <ArrowRight size={16} className="faint" />
            </a>
          ))}
        </div>
      </Section>
    </Page>
  )
}
