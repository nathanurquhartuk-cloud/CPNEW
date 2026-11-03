import { AlertTriangle, ArrowRight, Battery, ClipboardCheck, Clock, Download, FileText, MapPin, Package, Plane, Search, Ship, Thermometer, Truck } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { SpecialistOptions } from '../components/SpecialistContact'
import { Button, Drawer, Empty, Expand, KV, Page, PageHead, Pill, Section, Segmented, statusTone } from '../components/ui'
import { CLUSTERS, Cluster, WorldMap } from '../components/WorldMap'
import { INVOICES } from '../data/invoices'
import { JOBS } from '../data/jobs'
import { capaForJob } from '../data/capas'
import { Order as StoreOrder, allOrders, useOrders } from '../lib/orders'
import { fmtDayMonthYear } from '../lib/dates'
import { downloadInvoicePdf, downloadPodPdf, downloadTemperaturePdf, invoiceTotal } from '../lib/pdf'

type Order = StoreOrder
type Job = (typeof JOBS)[number]
type Filter = 'all' | 'transit' | 'attention' | 'delivered' | 'quotes'

const jobFor = (o: Order) => JOBS.find((j) => j.number === o.jobNumber)
const invoiceFor = (o: Order) => INVOICES.find((i) => i.orderRef === o.id)
const hasIssue = (o: Order) => (jobFor(o)?.issues.length ?? 0) > 0 || /risk|hold|excursion|processing/i.test(o.status + o.note)
const modeIcon = (m: string) => (m === 'air' || m === 'plane' ? <Plane size={15} /> : m === 'sea' ? <Ship size={15} /> : m === 'broker' || m === 'customs' ? <FileText size={15} /> : <Truck size={15} />)

export default function Shipments({ live = false }: { live?: boolean }) {
  const nav = useNavigate()
  const [params, setParams] = useSearchParams()
  const [filter, setFilter] = useState<Filter>('all')
  const [q, setQ] = useState('')
  const [service, setService] = useState('all')
  const created = useOrders((s) => s.created)
  const ALL = useMemo(() => allOrders(created), [created])
  const SERVICES = useMemo(() => Array.from(new Set(ALL.map((o) => o.serviceLine))), [ALL])
  const [sel, setSel] = useState<Order | null>(null)
  const [cluster, setCluster] = useState<Cluster | null>(null)
  const view = live ? 'live' : 'list'

  useEffect(() => {
    const ref = params.get('ref'); const job = params.get('job') || params.get('orderNumber')
    const o = ref ? ALL.find((x) => x.id === ref) : job ? ALL.find((x) => x.jobNumber === job) : null
    if (o) setSel(o)
  }, [params, ALL])

  const rows = useMemo(() => ALL.filter((o) => {
    if (service !== 'all' && o.serviceLine !== service) return false
    if (filter === 'transit' && !/transit|booked|processing/i.test(o.status)) return false
    if (filter === 'attention' && !hasIssue(o)) return false
    if (filter === 'delivered' && !/delivered/i.test(o.status)) return false
    if (filter === 'quotes' && o.kind !== 'Quote') return false
    if (q && !`${o.id} ${o.jobNumber ?? ''} ${o.route} ${o.serviceLine} ${o.study ?? ''}`.toLowerCase().includes(q.toLowerCase())) return false
    return true
  }), [filter, q, service, ALL])

  const scoped = service === 'all' ? ALL : ALL.filter((o) => o.serviceLine === service)
  const counts = { all: scoped.length, transit: scoped.filter((o) => /transit|booked|processing/i.test(o.status)).length, attention: scoped.filter(hasIssue).length, delivered: scoped.filter((o) => /delivered/i.test(o.status)).length, quotes: scoped.filter((o) => o.kind === 'Quote').length }
  const alerts = JOBS.filter((j) => j.isOpenAlert)

  return (
    <Page>
      <PageHead title="Shipments" sub="Every booking, quote and live shipment in one place." tools={<><Button variant="secondary" to="/book?mode=quote">Request a quote</Button><Button to="/book" icon={<Package size={16} />}>Book shipment</Button></>} />

      <div className="row between wrap" style={{ gap: 12, marginBottom: 18 }}>
        <Segmented value={view} onChange={(v) => nav(v === 'live' ? '/shipments/live' : '/shipments')} options={[{ id: 'list', label: 'All shipments' }, { id: 'live', label: 'Live map' }]} />
        {view === 'list' && (
          <div className="row" style={{ gap: 10, flex: 1, justifyContent: 'flex-end' }}>
            <select className="select" style={{ width: 'auto', height: 38, maxWidth: 240 }} value={service} onChange={(e) => setService(e.target.value)} aria-label="Filter by service line">
              <option value="all">All service lines</option>
              {SERVICES.map((sv) => <option key={sv} value={sv}>{sv}</option>)}
            </select>
            <div style={{ position: 'relative', maxWidth: 280, flex: 1 }}>
              <Search size={15} style={{ position: 'absolute', left: 12, top: 12, color: 'var(--faint)' }} />
              <input className="input" style={{ paddingLeft: 34, height: 38 }} placeholder="Job, order, route or study" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Filter shipments" />
            </div>
          </div>
        )}
      </div>

      {view === 'list' && (
        <>
          <div style={{ marginBottom: 14, overflowX: 'auto' }}>
            <Segmented value={filter} onChange={setFilter} options={[{ id: 'all', label: 'All', count: counts.all }, { id: 'transit', label: 'In progress', count: counts.transit }, { id: 'attention', label: 'Needs attention', count: counts.attention }, { id: 'delivered', label: 'Delivered', count: counts.delivered }, { id: 'quotes', label: 'Quotes', count: counts.quotes }]} />
          </div>
          {rows.length === 0 ? <Empty title="No shipments match" text="Try another reference or clear the filter." /> : (
            <div className="card" style={{ overflow: 'hidden' }}>
              {rows.map((o) => {
                const j = jobFor(o); const issue = hasIssue(o)
                return (
                  <div key={o.id} className="list-row click" onClick={() => setSel(o)}>
                    <span className={`icon-wrap ${issue ? 'warn' : /delivered/i.test(o.status) ? 'ok' : ''}`}>{o.kind === 'Quote' ? <FileText size={18} /> : issue ? <AlertTriangle size={18} /> : <Truck size={18} />}</span>
                    <div className="grow">
                      <div className="row" style={{ gap: 8 }}>
                        <span className="title">{o.route}</span>
                      </div>
                      <div className="meta ellipsis">{o.id}{o.jobNumber ? ` · job ${o.jobNumber}` : ''} · {o.serviceLine} · {o.tier} tier{o.study ? ` · ${o.study}` : ''}</div>
                    </div>
                    <div className="hide-m small muted" style={{ width: 180, textAlign: 'right' }}>{o.when}</div>
                    <div className="hide-m strong mono" style={{ width: 90, textAlign: 'right' }}>{o.value}</div>
                    <Pill tone={statusTone(o.status)} dot>{j && j.issues.length ? `${o.status} · ${j.issues.length} alert${j.issues.length > 1 ? 's' : ''}` : o.status}</Pill>
                    <ArrowRight size={16} className="faint hide-m" />
                  </div>
                )
              })}
            </div>
          )}
        </>
      )}

      {view === 'live' && (
        <>
          <div className="card" style={{ overflow: 'hidden' }}>
            <div className="map">
              <WorldMap view={[80, 60, 1560, 760]} clusters={CLUSTERS} onCluster={setCluster} selected={cluster?.id} />
              <div className="live"><span className="pill ok">LIVE</span>847 active shipments · {alerts.length} open alerts</div>
            </div>
          </div>
          {cluster && (
            <div className="tip" style={{ marginTop: 12, fontStyle: 'normal' }}><MapPin size={16} />{cluster.label}: {cluster.count} active shipments{cluster.alert ? `, ${cluster.alert === 'red' ? 'temperature' : 'delay'} alerts open` : ', no open alerts'}. <button className="link" onClick={() => setCluster(null)}>Clear</button></div>
          )}
          <Section title="Open alerts" action={<span className="small muted">Sorted by delivery date</span>}>
            <div className="card" style={{ overflow: 'hidden' }}>
              {alerts.map((j) => {
                const o = ALL.find((x) => x.jobNumber === j.number)
                const top = j.issues[0]
                return (
                  <div key={j.number} className="list-row click" onClick={() => o ? setSel(o) : nav(`/shipments?job=${j.number}`)}>
                    <span className={`icon-wrap ${top?.kind === 'temperature' ? 'bad' : top?.kind === 'delay' ? 'warn' : 'info'}`}>{top?.kind === 'temperature' ? <Thermometer size={18} /> : top?.kind === 'battery' ? <Battery size={18} /> : <Clock size={18} />}</span>
                    <div className="grow">
                      <div className="title">{j.number} <span className="muted" style={{ fontWeight: 400 }}>· {j.service}</span></div>
                      <div className="meta ellipsis">{top?.title}{j.issues.length > 1 ? ` +${j.issues.length - 1}` : ''} · {j.client} → {j.destination} · ETA {j.eta}</div>
                    </div>
                    <Pill tone={statusTone(j.deliveryStatus)} dot>{j.deliveryStatus}</Pill>
                  </div>
                )
              })}
            </div>
          </Section>
        </>
      )}

      {sel && <ShipmentDrawer order={sel} onClose={() => { setSel(null); if (params.get('ref') || params.get('job') || params.get('orderNumber')) setParams({}) }} />}
    </Page>
  )
}

function ShipmentDrawer({ order: o, onClose }: { order: Order; onClose: () => void }) {
  const j = jobFor(o) as Job | undefined
  const inv = invoiceFor(o)
  const [spec, setSpec] = useState(false)
  const delivered = /delivered/i.test(o.status)
  const capa = capaForJob(o.jobNumber)
  return (
    <Drawer title={o.route} sub={`${o.id}${o.jobNumber ? ` · job ${o.jobNumber}` : ''} · ${o.serviceLine}`} onClose={onClose} badge={<Pill tone={statusTone(o.status)} dot>{o.status}</Pill>}
      footer={<>
        {o.kind === 'Quote' && /ready/i.test(o.status) && <Button onClick={onClose} to={`/book?quote=${o.id}`}>Accept and book</Button>}
        {o.kind !== 'Quote' && !delivered && <Button to="/shipments/live" onClick={onClose}>Live map</Button>}
        {delivered && j && <Button variant="secondary" onClick={() => downloadPodPdf(j)} icon={<Download size={16} />}>Proof of delivery</Button>}
        <Button variant="ghost" onClick={() => setSpec(!spec)}>Speak with a specialist</Button>
      </>}>
      {spec && <div style={{ margin: '14px 0 4px' }}><SpecialistOptions compact onDone={() => setSpec(false)} /></div>}
      <div className="card pad tint" style={{ margin: '14px 0 4px', padding: '14px 16px' }}>
        <div className="row between"><span className="strong">{o.when}</span><span className="strong mono">{o.value}</span></div>
        <div className="muted small" style={{ marginTop: 4 }}>{o.note}</div>
        {o.expires && <div className="small amber" style={{ marginTop: 4 }}>{o.expires}</div>}
      </div>

      <Expand title="Booking" open>
        <KV rows={[['Reference', o.id], ['Type', `${o.kind} order${o.repeatOf ? ` · repeat of ${o.repeatOf}` : ''}`], ['Service', `${o.serviceLine} · ${o.tier} tier`], ['Add-ons', o.addOns?.length ? o.addOns.join(', ') : 'None'], ...(o.study ? [['Study', o.study] as [string, string]] : []), ['Route', o.route], ...(o.windows ? [['Pick-up window', o.windows.pickup] as [string, string], ['Delivery window', o.windows.delivery] as [string, string]] : []), ...(o.packaging ? [['Packaging', o.packaging] as [string, string]] : []), ...(o.handling ? [['Handling', `${o.handling} (radioactive category)`] as [string, string]] : []), ['Value', o.value]]} />
      </Expand>

      {j && (
        <Expand title={`Tracking · leg ${j.leg} of ${j.legs.length}`} open={!delivered} right={<Pill tone={statusTone(j.deliveryStatus)}>{j.deliveryStatus}</Pill>}>
          <div className="muted small" style={{ marginBottom: 12 }}>ETA {j.eta} · {j.product}</div>
          <div className="timeline">
            {j.legs.map((l, i) => (
              <div key={l.id} className="tl-item">
                <span className={`dot ${l.status === 'done' ? 'green' : l.status === 'active' ? '' : ''}`} style={l.status === 'pending' ? { background: 'var(--line)' } : undefined} />
                <span className="when">{l.eta}</span>
                <div className="t row" style={{ gap: 8 }}>{modeIcon(l.mode)}{l.provider} <span className="faint" style={{ fontWeight: 400 }}>· {l.id}</span></div>
                <div className="d">{l.from} → {l.to}{l.issue ? <span className="red"> · {l.issue}</span> : ''}{i === j.leg - 1 && !delivered ? <span className="purple"> · current leg</span> : ''}</div>
              </div>
            ))}
          </div>
        </Expand>
      )}

      {j && (
        <Expand title="Temperature and conditions" right={<span className="small muted">{j.temp} · battery {j.battery}</span>}>
          <KV rows={[['Range', j.tempRange], ['Current', j.temp], ['Sensor', `${j.sensorId} · battery ${j.battery}`], ['Open issues', j.issues.length ? `${j.issues.length}` : 'None']]} />
          {j.issues.map((is, i) => (
            <div key={i} className={`card pad ${is.kind === 'temperature' ? '' : 'tint'}`} style={{ marginTop: 10, padding: '12px 14px', borderColor: is.kind === 'temperature' ? '#F1C7C2' : undefined, background: is.kind === 'temperature' ? 'var(--red-soft)' : undefined }}>
              <div className="row between"><span className="strong small">{is.title}</span><span className="tiny faint">{is.age}</span></div>
              <div className="small" style={{ marginTop: 4 }}>{is.body}</div>
            </div>
          ))}
          {inv && <div style={{ marginTop: 12 }}><Button size="sm" variant="secondary" onClick={() => downloadTemperaturePdf(inv)} icon={<Download size={15} />}>Temperature of record (PDF)</Button></div>}
        </Expand>
      )}

      {capa && (
        <Expand title="Investigation" open right={<Pill tone={capa.status === 'Closed' ? 'ok' : 'warn'}>{capa.status}</Pill>}>
          <div className="card pad" style={{ padding: '12px 14px', background: 'var(--amber-soft)', borderColor: '#F1E0B8' }}>
            <div className="row" style={{ gap: 8 }}><ClipboardCheck size={16} className="amber" /><span className="strong small">{capa.id} · {capa.type}</span></div>
            <div className="small" style={{ marginTop: 6 }}>{capa.title}. Root cause: {capa.rootCauseCategory}.</div>
            <div style={{ marginTop: 10 }}><Link to={`/documents?capa=${capa.id}`} className="btn secondary xs" onClick={onClose}>Open the CAPA report</Link></div>
          </div>
        </Expand>
      )}

      <Expand title="Documents">
        <div className="stack">
          {inv && <button className="list-row click" style={{ border: '1px solid var(--line)', borderRadius: 12, background: 'var(--surface)', width: '100%', textAlign: 'left', font: 'inherit' }} onClick={() => downloadInvoicePdf(inv)}><FileText size={18} className="purple" /><span className="grow"><span className="title">{inv.number} · {inv.type}</span><span className="meta"> {inv.status} · ${invoiceTotal(inv).total.toLocaleString('en-US')} · due {fmtDayMonthYear(inv.due)}</span></span><Download size={16} className="faint" /></button>}
          {inv && inv.temperature && <button className="list-row click" style={{ border: '1px solid var(--line)', borderRadius: 12, background: 'var(--surface)', width: '100%', textAlign: 'left', font: 'inherit' }} onClick={() => downloadTemperaturePdf(inv)}><Thermometer size={18} className="purple" /><span className="grow"><span className="title">Temperature of record</span><span className="meta"> Logger {inv.temperature.sensor} · {inv.temperature.result}</span></span><Download size={16} className="faint" /></button>}
          {delivered && j && <button className="list-row click" style={{ border: '1px solid var(--line)', borderRadius: 12, background: 'var(--surface)', width: '100%', textAlign: 'left', font: 'inherit' }} onClick={() => downloadPodPdf(j)}><Package size={18} className="purple" /><span className="grow"><span className="title">Proof of delivery</span><span className="meta"> Signed on delivery · {j.eta}</span></span><Download size={16} className="faint" /></button>}
          {!inv && !delivered && <div className="muted small">Documents appear here as the shipment progresses: booking confirmation, temperature of record, proof of delivery and the invoice.</div>}
        </div>
      </Expand>

      {inv && (
        <Expand title="Invoice" right={<Pill tone={statusTone(inv.status)}>{inv.status}</Pill>}>
          <KV rows={[['Number', inv.number], ['PO', inv.po], ['Issued', fmtDayMonthYear(inv.issued)], ['Due', fmtDayMonthYear(inv.due)], ['Total', `$${invoiceTotal(inv).total.toLocaleString('en-US', { minimumFractionDigits: 2 })}`]]} />
          <div style={{ marginTop: 12 }}><Button size="sm" variant="secondary" to={`/financials?invoice=${inv.number}`} onClick={onClose}>Open in Financials</Button></div>
        </Expand>
      )}
    </Drawer>
  )
}
