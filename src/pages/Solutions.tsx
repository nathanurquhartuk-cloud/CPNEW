import { ArrowRight, Download, FileText, MessageSquare, Sparkles } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SpecialistOptions, ACCOUNT_TEAM } from '../components/SpecialistContact'
import { Button, Expand, Page, PageHead, Pill, Progress, Section, statusTone } from '../components/ui'
import { DOCUMENTS } from '../data/documents'
import { SCHEDULES } from '../data/schedules'
import { SERVICE_LINES } from '../data/serviceLines'
import { openCora } from '../lib/notifications'
import { downloadRateCardPdf, downloadSchedulePdf } from '../lib/pdf'

const BASE = import.meta.env.BASE_URL
const RECOMMENDED: { id: string; title: string; text: string; img: string }[] = [
  { id: 'cellgene', title: 'Cell & Gene Therapies', text: 'Specialist support for time-critical, patient-specific therapies.', img: 'lab.jpg' },
  { id: 'warehouse', title: 'Depot and warehouse services', text: 'Connect storage, inventory and distribution to your studies.', img: 'plane.jpg' },
  { id: 'commercial', title: 'Commercial Supply Logistics', text: 'Finished products, distribution and replenishment, regulated and non-regulated.', img: 'scientist.jpg' },
]

export default function Solutions() {
  const [params] = useSearchParams()
  const [spec, setSpec] = useState(false)
  const refs = useRef<Record<string, HTMLDivElement | null>>({})
  const focus = params.get('schedule')
  useEffect(() => { if (focus && refs.current[focus]) setTimeout(() => refs.current[focus]?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100) }, [focus])

  return (
    <Page>
      <PageHead title="Explore Solutions" sub="More ways to simplify your healthcare supply chain." tools={<><Button variant="secondary" onClick={downloadRateCardPdf} icon={<Download size={16} />}>Rate card</Button><Button to="/book?mode=quote">Request a quote</Button></>} />

      <div className="tip"><Sparkles size={16} />Already moving laboratory samples? We can help with more of your study. <button className="link" style={{ fontStyle: 'normal', marginLeft: 4 }} onClick={() => openCora('What else can you help with for my studies?')}>Ask Cora</button></div>

      <Section title="Recommended for your programme" action={<a href="#/add-service">View all services <ArrowRight size={14} style={{ verticalAlign: -2 }} /></a>}>
        <div className="grid cols-3">
          {RECOMMENDED.map((r) => (
            <div key={r.id} className="card photo-card">
              <div className="ph" style={{ backgroundImage: `url(${BASE}img/${r.img})` }} role="img" aria-label={r.title} />
              <div className="ph-body">
                <h3>{r.title}</h3>
                <p>{r.text}</p>
                <a href={`#/add-service?service=${r.id}`}>Explore service <ArrowRight size={15} /></a>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Your active solutions" action={<span className="small muted">{SCHEDULES.length} schedules under MSA-AZ-2026 v3.0</span>}>
        <div className="stack" style={{ gap: 14 }}>
          {SCHEDULES.map((s) => {
            const tone = s.utilisation > 110 ? 'warn' : s.utilisation > 80 ? 'ok' : undefined
            return (
              <div key={s.id} ref={(el) => { refs.current[s.id] = el }} className="card" style={{ overflow: 'hidden', outline: focus === s.id ? '2px solid var(--purple)' : undefined, outlineOffset: 2 }}>
                <div style={{ padding: '20px 22px 8px' }}>
                  <div className="row between wrap" style={{ gap: 10 }}>
                    <div>
                      <div className="row" style={{ gap: 10 }}><h3 style={{ fontSize: 17 }}>{s.name}</h3><Pill tone={statusTone(s.status)} dot>{s.status}</Pill></div>
                      <div className="muted small" style={{ marginTop: 3 }}>{s.reference} · {s.tierSummary}</div>
                    </div>
                    <div className="row" style={{ gap: 8 }}>
                      <Button size="sm" variant="secondary" onClick={() => downloadSchedulePdf(s)} icon={<Download size={15} />}>Schedule</Button>
                      <Button size="sm" to={`/book?mode=direct&service=${encodeURIComponent(s.name)}`}>Book</Button>
                    </div>
                  </div>
                  <div className="grid cols-4" style={{ marginTop: 16, gap: 14 }}>
                    <div><div className="tiny faint">Effective</div><div className="strong small">{s.startDate}</div></div>
                    <div><div className="tiny faint">Renewal</div><div className="strong small">{s.renewalDate} · notice {s.noticePeriod}</div></div>
                    <div><div className="tiny faint">Response</div><div className="strong small">{s.sla}</div></div>
                    <div>
                      <div className="tiny faint">Volume · {s.utilisation}% utilised</div>
                      <div className="strong small" style={{ marginBottom: 6 }}>{s.volume}</div>
                      <Progress value={Math.min(100, s.utilisation / 1.3)} tone={tone} />
                    </div>
                  </div>
                </div>
                <div style={{ padding: '0 22px 6px' }}>
                  <Expand title={`Rates · ${s.rates.length} items`} right={<span className="small muted">{s.currency}</span>}>
                    <div className="table-wrap"><table className="table">
                      <thead><tr><th>Item</th><th className="hide-m">Tier</th><th className="num">Rate</th><th className="hide-m">Unit</th><th className="hide-m">Notes</th></tr></thead>
                      <tbody>{s.rates.map((r) => (<tr key={r.item}><td className="strong">{r.item}</td><td className="hide-m"><Pill tone={r.tier === 'Critical' ? 'bad' : r.tier === 'Optimised' ? 'ok' : undefined}>{r.tier}</Pill></td><td className="num strong">{r.rate}</td><td className="hide-m muted">{r.unit}</td><td className="hide-m muted small">{r.note}</td></tr>))}</tbody>
                    </table></div>
                    <div className="small muted" style={{ marginTop: 10 }}>Surcharges and pass-through: {s.surcharges.join(' · ')}</div>
                  </Expand>
                  <Expand title="Capabilities and commitments">
                    <div className="grid cols-2">
                      <div><div className="eyebrow" style={{ marginBottom: 8 }}>What is included</div><ul style={{ margin: 0, paddingLeft: 18 }}>{s.capabilities.map((c) => <li key={c} className="small">{c}</li>)}</ul></div>
                      <div><div className="eyebrow" style={{ marginBottom: 8 }}>Our commitment to you</div><ul style={{ margin: 0, paddingLeft: 18 }}>{s.valuePromise.map((c) => <li key={c} className="small">{c}</li>)}</ul></div>
                    </div>
                  </Expand>
                  <Expand title={`Amendments and activity · ${s.amendments.length}`} right={<span className="small muted">{s.linked.orders} orders · {s.linked.invoices} invoices · {s.linked.openValue} open</span>}>
                    <div className="timeline">{s.amendments.map((a) => (<div key={a.title} className="tl-item"><span className="dot" /><span className="when">{a.date}</span><div className="t">{a.title}</div><div className="d">{a.by}</div></div>))}</div>
                  </Expand>
                </div>
              </div>
            )
          })}
        </div>
      </Section>

      <Section title="Documents and commercial commitments">
        <div className="card" style={{ overflow: 'hidden' }}>
          {DOCUMENTS.map((d) => {
            const sched = SCHEDULES.find((s) => s.id === (d as { agreementId?: string }).agreementId)
            return (
              <button key={d.id} className="list-row click" style={{ width: '100%', textAlign: 'left', font: 'inherit', background: 'none', border: 'none', borderTop: '1px solid var(--line-soft)' }} onClick={() => (sched ? downloadSchedulePdf(sched) : downloadRateCardPdf())}>
                <span className="icon-wrap"><FileText size={18} /></span>
                <div className="grow"><div className="title">{d.title}</div><div className="meta">{d.kind} · {d.service} · effective {d.effective} · {d.version}</div></div>
                <Pill tone={statusTone(d.status)}>{d.status}</Pill>
                <Download size={16} className="faint" />
              </button>
            )
          })}
        </div>
        <div className="small muted" style={{ marginTop: 10 }}>Permissions, approved commercial terms and amendments govern what each user can see; a rate can never be applied that is not in a signed schedule.</div>
      </Section>

      <Section>
        <div className="card pad" style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
          <MessageSquare size={20} className="purple" />
          <span className="strong">Looking for a different solution?</span>
          <span className="muted">We can shape a bundle across {SERVICE_LINES.filter((s) => !s.active).length} further service lines.</span>
          <span style={{ marginLeft: 'auto' }}><Button variant="secondary" size="sm" onClick={() => setSpec(!spec)}>Talk to a specialist</Button></span>
        </div>
        {spec && <div style={{ marginTop: 12 }}><SpecialistOptions team={ACCOUNT_TEAM} compact onDone={() => setSpec(false)} /></div>}
      </Section>
    </Page>
  )
}
