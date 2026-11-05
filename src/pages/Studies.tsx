import { ArrowRight, Boxes, FlaskConical, Package } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Button, Drawer, Empty, Expand, KV, Page, PageHead, Pill, Progress, Section, Stat, statusTone, cx } from '../components/ui'
import { STUDIES } from '../data/studies'
import { openCora } from '../lib/notifications'

type Study = (typeof STUDIES)[number]
type Site = Study['siteList'][number]

const healthTone = (h: string): 'ok' | 'warn' | 'bad' | 'info' | 'brand' | undefined => {
  const t = h.toLowerCase()
  if (/good|healthy/.test(t)) return 'ok'
  if (/action|critical|low/.test(t)) return 'bad'
  if (/watch|reorder|expiry/.test(t)) return 'warn'
  return statusTone(h)
}
const adherenceTone = (a: number): 'ok' | 'warn' | 'bad' => (a >= 95 ? 'ok' : a >= 90 ? 'warn' : 'bad')

export default function Studies() {
  const [params, setParams] = useSearchParams()
  const [sel, setSel] = useState<Study | null>(null)

  useEffect(() => {
    const id = params.get('study')
    const s = id ? STUDIES.find((x) => x.id.toLowerCase() === id.toLowerCase()) : null
    if (s) setSel(s)
  }, [params])

  const totals = useMemo(() => {
    const sites = STUDIES.reduce((a, s) => a + s.sites, 0)
    const countries = Math.max(...STUDIES.map((s) => s.countries))
    const adherence = Math.round(STUDIES.reduce((a, s) => a + s.adherence, 0) / STUDIES.length)
    return { sites, countries, adherence }
  }, [])

  const issues = useMemo(() => {
    const seen = new Set<string>()
    const out: (Site & { study: string })[] = []
    for (const s of STUDIES) for (const site of s.siteList) {
      if ((site.openIssues > 0 || !/good|healthy/i.test(site.health)) && !seen.has(site.id)) { seen.add(site.id); out.push({ ...site, study: s.id }) }
    }
    return out.slice(0, 5)
  }, [])

  const close = () => { setSel(null); if (params.get('study')) setParams({}) }

  return (
    <Page>
      <PageHead title="Studies" sub="Sites, collections, deliveries and logistics adherence across your clinical programme." tools={<Button to="/book?mode=direct&service=Clinical%20Supply%20Logistics" icon={<Package size={16} />}>Book site shipment</Button>} />

      <div className="grid cols-3">
        <Stat label="Active studies" value={STUDIES.length} delta={`${STUDIES.filter((s) => s.status === 'Recruiting').length} recruiting`} />
        <Stat label="Active sites" value={totals.sites} delta={`across ${totals.countries} countries`} />
        <Stat label="Logistics adherence" value={`${totals.adherence}%`} delta={totals.adherence >= 95 ? 'On target' : 'Below the 95% target'} tone={adherenceTone(totals.adherence)} />
      </div>

      <Section title="Your studies">
        <div className="card" style={{ overflow: 'hidden' }}>
          {STUDIES.map((s) => (
            <div key={s.id} className="list-row click" onClick={() => setSel(s)}>
              <span className="icon-wrap"><FlaskConical size={18} /></span>
              <div className="grow">
                <div className="title">{s.id} <span className="muted" style={{ fontWeight: 400 }}>· {s.title}</span></div>
                <div className="meta ellipsis">{s.phase} · {s.therapeuticArea} · {s.sites} sites · {s.countries} countries</div>
              </div>
              <div className="hide-m" style={{ width: 120 }}>
                <div className="row between tiny muted" style={{ marginBottom: 4 }}><span>Adherence</span><span className="mono">{s.adherence}%</span></div>
                <Progress value={s.adherence} tone={adherenceTone(s.adherence)} />
              </div>
              <Pill tone={statusTone(s.status)} dot>{s.status}</Pill>
              <ArrowRight size={16} className="faint hide-m" />
            </div>
          ))}
        </div>
      </Section>

      <Section title="Site issues">
        {issues.length === 0 ? <Empty title="No site issues" text="Every site is healthy and resupplied on schedule." /> : (
          <div className="card" style={{ overflow: 'hidden' }}>
            {issues.map((site) => (
              <div key={site.id} className="list-row">
                <span className={cx('icon-wrap', healthTone(site.health))}><Boxes size={18} /></span>
                <div className="grow">
                  <div className="title">{site.id} · {site.name}</div>
                  <div className="meta ellipsis">{site.study} · {site.city}, {site.country} · {site.stockDays} days of stock · next resupply {site.nextResupply}</div>
                </div>
                <Pill tone={healthTone(site.health)} dot>{site.health}</Pill>
                <Link to={`/inventory?site=${encodeURIComponent(site.id)}`} className="btn ghost sm hide-m">Storage</Link>
              </div>
            ))}
          </div>
        )}
      </Section>

      {sel && (
        <Drawer title={sel.id} sub={sel.title} onClose={close} badge={<Pill tone={statusTone(sel.status)} dot>{sel.status}</Pill>}
          footer={<>
            <Button to={`/book?mode=direct&study=${encodeURIComponent(sel.id)}`} onClick={close} icon={<Package size={16} />}>Book site shipment</Button>
            <Button variant="ghost" onClick={() => { close(); openCora(`Tell me about ${sel.id}`) }}>Ask Cora about this study</Button>
          </>}>
          <div className="card pad tint" style={{ margin: '14px 0 4px', padding: '14px 16px' }}>
            <div className="grid cols-4" style={{ gap: 10 }}>
              {[['Sites', `${sel.sites}`], ['Collections', `${sel.collections}`], ['Deliveries', `${sel.deliveries}`], ['Adherence', `${sel.adherence}%`]].map(([l, v]) => (
                <div key={l}><div className="tiny faint">{l}</div><div className="strong" style={{ fontSize: 16 }}>{v}</div></div>
              ))}
            </div>
            <div className="muted small" style={{ marginTop: 10 }}>{sel.phase} · {sel.therapeuticArea} · {sel.countries} countries</div>
          </div>

          <Expand title={`Sites · ${sel.siteList.length} shown`} open>
            <div className="stack">
              {sel.siteList.map((site) => (
                <div key={site.id} className="row between wrap" style={{ gap: 10, padding: '8px 0', borderTop: '1px solid var(--line-soft)' }}>
                  <div style={{ flex: 1, minWidth: 180 }}>
                    <div className="strong small">{site.id} · {site.name}</div>
                    <div className="tiny muted">{site.city}, {site.country} · {site.stockDays} days of stock · next resupply {site.nextResupply}</div>
                  </div>
                  <Pill tone={healthTone(site.health)} dot>{site.health}</Pill>
                  <Link to={`/inventory?site=${encodeURIComponent(site.id)}`} className="btn ghost xs" onClick={close}>Storage</Link>
                </div>
              ))}
            </div>
            <div className="tiny faint" style={{ marginTop: 8 }}>Showing the sites with recent activity; the full site list is in the study record.</div>
          </Expand>

          <Expand title="Milestones">
            <div className="timeline">
              {sel.milestones.map((m, i) => (
                <div key={i} className="tl-item">
                  <span className={cx('dot', m.tone === 'warn' && 'red', m.tone === 'ok' && 'green')} />
                  <span className="when">{m.date}</span>
                  <div className="t">{m.title}</div>
                  <div className="d">{m.detail}</div>
                </div>
              ))}
            </div>
          </Expand>

          <Expand title="Shipments">
            <KV rows={[['Service lines', sel.serviceLines.map((l) => (l === 'clinical' ? 'Clinical Supply Logistics' : l === 'centrallab' ? 'Central Lab Logistics' : l === 'radiopharma' ? 'Radiopharma' : l === 'cellgene' ? 'Cell & Gene Therapies' : l)).join(', ')], ['Deliveries', `${sel.deliveries} of ${sel.collections} collections`]]} />
            <div style={{ marginTop: 12 }}><Link to="/shipments" className="btn secondary sm" onClick={close}>View shipments for this study<ArrowRight size={15} /></Link></div>
          </Expand>
        </Drawer>
      )}
    </Page>
  )
}
