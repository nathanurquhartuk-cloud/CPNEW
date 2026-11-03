import { Accessibility, Activity, ArrowRight, ChevronRight, MessageSquare, Phone, PhoneCall, Plug } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CONTROL_TOWER, SPECIALISTS, SpecialistOptions } from '../components/SpecialistContact'
import { Button, Card, Page, PageHead, Pill, Section, statusTone } from '../components/ui'
import { CASES } from '../data/cases'
import { openCora, routeAlias } from '../lib/notifications'

const initials = (name: string) => name.replace(/^Dr\s+/, '').split(/\s+/).map((p) => p[0]).join('').replace(/\./g, '').slice(0, 2).toUpperCase()

export default function Support() {
  const nav = useNavigate()
  const [callback, setCallback] = useState(false)
  const [openSpecialist, setOpenSpecialist] = useState<string | null>(null)

  return (
    <Page>
      <PageHead title="Support" sub="Specialist support when you need it, with chat, call or call back." />

      <div className="grid cols-3">
        <Card onClick={() => openCora('I need help')}>
          <div className="row" style={{ gap: 14 }}>
            <span className="icon-wrap"><MessageSquare size={18} /></span>
            <div className="grow" style={{ flex: 1 }}>
              <div className="strong">Chat with Cora</div>
              <div className="muted small">Answers from your workspace, with a hand-off to a specialist when it matters.</div>
            </div>
            <ChevronRight size={18} className="faint" />
          </div>
        </Card>
        <a href={`tel:${CONTROL_TOWER.phone}`} className="card pad hover" style={{ color: 'inherit' }}>
          <div className="row" style={{ gap: 14 }}>
            <span className="icon-wrap ok"><Phone size={18} /></span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="strong">Call the control tower</div>
              <div className="muted small">{CONTROL_TOWER.phoneDisplay} · {CONTROL_TOWER.phoneNote}</div>
            </div>
            <ChevronRight size={18} className="faint" />
          </div>
        </a>
        <Card onClick={() => setCallback((v) => !v)}>
          <div className="row" style={{ gap: 14 }}>
            <span className="icon-wrap info"><PhoneCall size={18} /></span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="strong">Request a call back</div>
              <div className="muted small">{CONTROL_TOWER.callbackNote}.</div>
            </div>
            <ChevronRight size={18} className="faint" />
          </div>
        </Card>
      </div>
      {callback && (
        <div className="card pad" style={{ marginTop: 12 }}>
          <div className="strong" style={{ marginBottom: 10 }}>How would you like to connect?</div>
          <SpecialistOptions compact onDone={() => setCallback(false)} />
        </div>
      )}

      <Section title="Your cases" action={<span className="small muted">{CASES.filter((c) => !/resolved/i.test(c.status)).length} open</span>}>
        <div className="card" style={{ overflow: 'hidden' }}>
          {CASES.map((c) => (
            <div key={c.id} className="list-row click" onClick={() => nav(routeAlias(c.to))}>
              <div className="grow">
                <div className="title">{c.id} <span className="muted" style={{ fontWeight: 400 }}>· {c.topic}</span></div>
                <div className="meta ellipsis">{c.summary} · {c.reference} · {c.owner}</div>
              </div>
              <span className="small muted hide-m">{c.updated}</span>
              <Pill tone={statusTone(c.status)} dot>{c.status}</Pill>
              <ArrowRight size={16} className="faint hide-m" />
            </div>
          ))}
        </div>
      </Section>

      <Section title="Specialists">
        <div className="card" style={{ overflow: 'hidden' }}>
          {SPECIALISTS.map((s) => {
            const open = openSpecialist === s.name
            return (
              <div key={s.name} style={{ borderTop: '1px solid var(--line-soft)' }}>
                <div className="list-row" style={{ borderTop: 'none' }}>
                  <span className="avatar" aria-hidden="true">{initials(s.name)}</span>
                  <div className="grow">
                    <div className="title">{s.name} <span className="muted" style={{ fontWeight: 400 }}>· {s.role}</span></div>
                    <div className="meta ellipsis">{s.scope} · {s.hours}</div>
                  </div>
                  <Pill tone={s.online ? 'ok' : undefined} dot>{s.online ? 'Online' : 'Offline'}</Pill>
                  <Button variant="ghost" size="sm" onClick={() => setOpenSpecialist(open ? null : s.name)}>{open ? 'Close' : 'Connect'}</Button>
                </div>
                {open && (
                  <div style={{ padding: '0 18px 16px 70px' }}>
                    <SpecialistOptions team={s.teamInfo} compact onDone={() => setOpenSpecialist(null)} />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </Section>

      <Section title="Help">
        <div className="card" style={{ overflow: 'hidden' }}>
          <div className="list-row click" onClick={() => nav('/account?tab=security')}>
            <span className="icon-wrap"><Plug size={18} /></span>
            <div className="grow"><div className="title">API, EDI and webhooks</div><div className="meta">Keys, scopes and integration status</div></div>
            <ChevronRight size={18} className="faint" />
          </div>
          <div className="list-row click" onClick={() => openCora('Accessibility')}>
            <span className="icon-wrap"><Accessibility size={18} /></span>
            <div className="grow"><div className="title">Accessibility statement</div><div className="meta">How the workspace supports assistive technology</div></div>
            <ChevronRight size={18} className="faint" />
          </div>
          <div className="list-row click" onClick={() => openCora('Service status')}>
            <span className="icon-wrap ok"><Activity size={18} /></span>
            <div className="grow"><div className="title">Service status</div><div className="meta">All systems operational</div></div>
            <ChevronRight size={18} className="faint" />
          </div>
        </div>
      </Section>
    </Page>
  )
}
