import { ArrowRight, Boxes, Package, Search, Warehouse } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Button, Drawer, Empty, KV, Page, PageHead, Pill, Progress, Section, Segmented, Stat, statusTone, cx } from '../components/ui'
import { INVENTORY } from '../data/inventory'
import { openCora } from '../lib/notifications'

type Line = (typeof INVENTORY)[number]
type Filter = 'all' | 'sites' | 'depots'

const healthTone = (h: string): 'ok' | 'warn' | 'bad' | 'info' | 'brand' | undefined => {
  const t = h.toLowerCase()
  if (/good|healthy/.test(t)) return 'ok'
  if (/low|critical|action/.test(t)) return 'bad'
  if (/reorder|expiry|watch/.test(t)) return 'warn'
  return statusTone(h)
}
const cover = (l: Line) => (l.dailyUse > 0 ? Math.round(l.onHand / l.dailyUse) : 0)
const median = (xs: number[]) => { if (!xs.length) return 0; const s = [...xs].sort((a, b) => a - b); const m = Math.floor(s.length / 2); return s.length % 2 ? s[m] : Math.round((s[m - 1] + s[m]) / 2) }

export default function Inventory() {
  const [params, setParams] = useSearchParams()
  const [filter, setFilter] = useState<Filter>('all')
  const [q, setQ] = useState('')
  const [sel, setSel] = useState<Line | null>(null)

  useEffect(() => {
    const site = params.get('site')
    if (site) {
      setQ(site)
      const first = INVENTORY.find((l) => l.location.toLowerCase().includes(site.toLowerCase()))
      if (first) setSel(first)
    }
  }, [params])

  const rows = useMemo(() => INVENTORY.filter((l) => {
    if (filter === 'sites' && l.kind !== 'Site') return false
    if (filter === 'depots' && l.kind !== 'Depot') return false
    if (q && !`${l.location} ${l.city} ${l.material} ${l.lot} ${l.study}`.toLowerCase().includes(q.toLowerCase())) return false
    return true
  }), [filter, q])

  const below = INVENTORY.filter((l) => l.onHand < l.minimum).length
  const cov = median(INVENTORY.map(cover))
  const close = () => { setSel(null); if (params.get('site')) setParams({}) }

  return (
    <Page>
      <PageHead title="Storage" sub="Stock held at depots and sites, with days of cover and replenishment status." tools={<Button to="/book?mode=direct&service=Clinical%20Supply%20Logistics" icon={<Package size={16} />}>Request replenishment</Button>} />

      <div className="grid cols-3">
        <Stat label="Lines tracked" value={INVENTORY.length} delta={`${INVENTORY.filter((l) => l.kind === 'Depot').length} depot · ${INVENTORY.filter((l) => l.kind === 'Site').length} site`} />
        <Stat label="Below minimum" value={below} delta={below > 0 ? 'Replenishment needed' : 'All lines above minimum'} tone={below > 0 ? 'bad' : 'ok'} />
        <Stat label="Days of cover" value={cov} delta="across sites and depots" />
      </div>

      <Section title="Stock">
        <div className="row between wrap" style={{ gap: 12, marginBottom: 14 }}>
          <Segmented value={filter} onChange={setFilter} options={[{ id: 'all', label: 'All', count: INVENTORY.length }, { id: 'sites', label: 'Sites', count: INVENTORY.filter((l) => l.kind === 'Site').length }, { id: 'depots', label: 'Depots', count: INVENTORY.filter((l) => l.kind === 'Depot').length }]} />
          <div style={{ position: 'relative', maxWidth: 280, flex: 1 }}>
            <Search size={15} style={{ position: 'absolute', left: 12, top: 12, color: 'var(--faint)' }} />
            <input className="input" style={{ paddingLeft: 34, height: 38 }} placeholder="Site, material, lot or study" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Filter inventory" />
          </div>
        </div>
        {rows.length === 0 ? <Empty title="No stock lines match" text="Try another site, material or lot." action={<Button variant="ghost" size="sm" onClick={() => { setQ(''); setFilter('all') }}>Clear filters</Button>} /> : (
          <div className="card" style={{ overflow: 'hidden' }}>
            {rows.map((l) => (
              <div key={l.id} className="list-row click" onClick={() => setSel(l)}>
                <span className={cx('icon-wrap', healthTone(l.health))}>{l.kind === 'Depot' ? <Warehouse size={18} /> : <Boxes size={18} />}</span>
                <div className="grow">
                  <div className="title">{l.material} <span className="muted" style={{ fontWeight: 400 }}>· lot {l.lot}</span></div>
                  <div className="meta ellipsis">{l.location} · {l.city} · {l.study} · expires {l.expiry}</div>
                </div>
                <div className="hide-m" style={{ textAlign: 'right', width: 110 }}>
                  <div className="strong mono">{l.onHand.toLocaleString('en-GB')}</div>
                  <div className="tiny muted">{cover(l)} days of cover</div>
                </div>
                <Pill tone={healthTone(l.health)} dot>{l.health}</Pill>
                <ArrowRight size={16} className="faint hide-m" />
              </div>
            ))}
          </div>
        )}
      </Section>

      {sel && <LineDrawer line={sel} onClose={close} />}
    </Page>
  )
}

function LineDrawer({ line: l, onClose }: { line: Line; onClose: () => void }) {
  const [upgraded, setUpgraded] = useState(false)
  const days = cover(l)
  const pct = l.minimum > 0 ? Math.round((l.onHand / l.minimum) * 100) : 100
  const siteId = l.location.split(' · ')[0]
  return (
    <Drawer title={l.material} sub={`${l.location} · lot ${l.lot}`} onClose={onClose} badge={<Pill tone={healthTone(l.health)} dot>{l.health}</Pill>}
      footer={<>
        <Button to={`/book?mode=direct&service=Clinical%20Supply%20Logistics&site=${encodeURIComponent(siteId)}`} onClick={onClose} icon={<Package size={16} />}>Request replenishment</Button>
        {!upgraded && <Button variant="secondary" onClick={() => setUpgraded(true)}>Upgrade to Critical tier</Button>}
        <Button variant="ghost" onClick={() => { onClose(); openCora(`What is the stock position at ${siteId}?`) }}>Ask Cora</Button>
      </>}>
      {upgraded && (
        <div className="card pad tint" style={{ margin: '14px 0 4px', padding: '14px 16px' }}>
          <div className="strong">Upgrade requested</div>
          <div className="muted small" style={{ marginTop: 4 }}>Upgrade requested; the depot will collect tomorrow and land within 24 hours. Reference ORD-2026-011.</div>
        </div>
      )}
      <div className="card pad" style={{ margin: '14px 0 16px', padding: '14px 16px' }}>
        <div className="row between small">
          <span className="muted">Cover against minimum</span>
          <span className="strong mono">{l.onHand.toLocaleString('en-GB')} on hand · {days} days</span>
        </div>
        <div style={{ marginTop: 8 }}><Progress value={pct} tone={pct >= 100 ? 'ok' : pct >= 60 ? 'warn' : 'bad'} /></div>
        <div className="tiny muted" style={{ marginTop: 6 }}>{pct >= 100 ? `${pct}% of the ${l.minimum.toLocaleString('en-GB')} minimum` : `${pct}% of the ${l.minimum.toLocaleString('en-GB')} minimum · ${(l.minimum - l.onHand).toLocaleString('en-GB')} short`}{l.inTransit > 0 ? ` · ${l.inTransit.toLocaleString('en-GB')} in transit` : ''}</div>
      </div>
      <KV rows={[
        ['On hand', l.onHand.toLocaleString('en-GB')],
        ['Allocated', l.allocated.toLocaleString('en-GB')],
        ['In transit', l.inTransit.toLocaleString('en-GB')],
        ['Minimum', l.minimum.toLocaleString('en-GB')],
        ['Daily use', `${l.dailyUse} per day`],
        ['Expiry', l.expiry],
        ['Study', l.study],
        [l.kind === 'Depot' ? 'Depot' : 'Location', `${l.location} · ${l.city}`],
      ]} />
    </Drawer>
  )
}
