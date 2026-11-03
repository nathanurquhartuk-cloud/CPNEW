import { ArrowRight, ClipboardCheck, Download, FileText, Package, Search, Thermometer } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Button, Drawer, Empty, Expand, KV, Page, PageHead, Pill, Segmented, Stat, cx, statusTone } from '../components/ui'
import { CAPAS, Capa } from '../data/capas'
import { DOCUMENTS } from '../data/documents'
import { INVOICES } from '../data/invoices'
import { JOBS } from '../data/jobs'
import { SCHEDULES } from '../data/schedules'
import { fmtDayMonthYear } from '../lib/dates'
import { downloadCapaPdf, downloadInvoicePdf, downloadPodPdf, downloadRateCardPdf, downloadSchedulePdf, downloadTemperaturePdf } from '../lib/pdf'

type Kind = 'all' | 'capa' | 'commercial' | 'shipment'
interface Doc { id: string; kind: Kind; title: string; meta: string; status?: string; date: string; onDownload: () => void; capa?: Capa; link?: string }

export const capaTone = (s: Capa['status']) => (s === 'Closed' ? 'ok' : s === 'Effectiveness check' ? 'info' : s === 'Open' ? 'bad' : 'warn')

export default function Documents() {
  const [params, setParams] = useSearchParams()
  const [kind, setKind] = useState<Kind>((params.get('kind') as Kind) || 'all')
  const [q, setQ] = useState('')
  const [capa, setCapa] = useState<Capa | null>(null)

  useEffect(() => { const id = params.get('capa'); const c = id ? CAPAS.find((x) => x.id === id) : null; if (c) { setCapa(c); setKind('capa') } }, [params])

  const docs = useMemo<Doc[]>(() => [
    ...CAPAS.map((c) => ({ id: c.id, kind: 'capa' as Kind, title: `${c.id} · ${c.title}`, meta: `${c.type} · ${c.severity} · job ${c.jobNumber} · ${c.lane}`, status: c.status, date: c.updated, onDownload: () => downloadCapaPdf(c), capa: c })),
    ...DOCUMENTS.map((d) => { const s = SCHEDULES.find((x) => x.id === (d as { agreementId?: string }).agreementId); return { id: d.id, kind: 'commercial' as Kind, title: d.title, meta: `${d.kind} · ${d.service} · ${d.version}`, status: d.status, date: d.effective, onDownload: () => (s ? downloadSchedulePdf(s) : downloadRateCardPdf()) } }),
    ...INVOICES.flatMap((i) => { const t = (i as { temperature?: { result: string; excursions: number } }).temperature; return t ? [{ id: `TOR-${i.jobNumber}`, kind: 'shipment' as Kind, title: `Temperature of record · job ${i.jobNumber}`, meta: `${i.serviceLine} · ${i.route} · ${t.result}`, status: t.excursions ? `${t.excursions} excursion` : 'Within specification', date: fmtDayMonthYear(i.issued), onDownload: () => downloadTemperaturePdf(i), link: `/shipments?ref=${i.orderRef}` }] : [] }),
    ...JOBS.filter((j) => j.deliveryStatus === 'Delivered').map((j) => ({ id: `POD-${j.number}`, kind: 'shipment' as Kind, title: `Proof of delivery · job ${j.number}`, meta: `${j.service} · ${j.destination}`, status: 'Signed', date: j.eta, onDownload: () => downloadPodPdf(j), link: `/shipments?job=${j.number}` })),
    ...INVOICES.map((i) => ({ id: i.number, kind: 'shipment' as Kind, title: `${i.number} · ${i.type}`, meta: `${i.serviceLine} · ${i.route} · ${i.po}`, status: i.status, date: fmtDayMonthYear(i.issued), onDownload: () => downloadInvoicePdf(i), link: `/financials?invoice=${i.number}` })),
  ], [])

  const rows = docs.filter((d) => (kind === 'all' || d.kind === kind) && (!q || `${d.title} ${d.meta}`.toLowerCase().includes(q.toLowerCase())))
  const openCapas = CAPAS.filter((c) => c.status !== 'Closed').length

  return (
    <Page>
      <PageHead title="Document library" sub="Investigation reports, agreements, temperature records, proofs of delivery and invoices, all in one place." tools={<Button variant="secondary" onClick={downloadRateCardPdf} icon={<Download size={16} />}>Rate card</Button>} />
      <div className="grid cols-3" style={{ marginBottom: 22 }}>
        <Stat label="Open CAPAs" value={openCapas} delta={`${CAPAS.length - openCapas} closed this quarter`} tone={openCapas ? 'warn' : 'ok'} />
        <Stat label="Documents" value={docs.length} delta="Agreements, records and invoices" />
        <Stat label="Audit readiness" value="100%" delta="Every record has an owner and a sign-off trail" tone="ok" />
      </div>
      <div className="row between wrap" style={{ gap: 12, marginBottom: 14 }}>
        <Segmented value={kind} onChange={(k) => { setKind(k); setParams(k === 'all' ? {} : { kind: k }) }} options={[{ id: 'all', label: 'All', count: docs.length }, { id: 'capa', label: 'CAPA reports', count: CAPAS.length }, { id: 'commercial', label: 'Agreements', count: DOCUMENTS.length }, { id: 'shipment', label: 'Shipment documents', count: docs.length - CAPAS.length - DOCUMENTS.length }]} />
        <div style={{ position: 'relative', maxWidth: 280, flex: 1 }}>
          <Search size={15} style={{ position: 'absolute', left: 12, top: 12, color: 'var(--faint)' }} />
          <input className="input" style={{ paddingLeft: 34, height: 38 }} placeholder="Reference, job, lane or title" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Filter documents" />
        </div>
      </div>
      {kind === 'capa' && <div className="tip" style={{ marginBottom: 14, fontStyle: 'normal' }}><ClipboardCheck size={16} />Corrective and preventive action reports follow the GDP deviation standard: problem, containment, root cause, corrective and preventive actions, effectiveness check and sign-off. Each is linked to the shipment it investigates.</div>}
      {rows.length === 0 ? <Empty title="No documents match" /> : (
        <div className="card" style={{ overflow: 'hidden' }}>
          {rows.map((d) => (
            <div key={d.id} className={cx('list-row', 'click')} onClick={() => (d.capa ? setCapa(d.capa) : d.onDownload())}>
              <span className={cx('icon-wrap', d.kind === 'capa' && capaTone(d.capa!.status))}>{d.kind === 'capa' ? <ClipboardCheck size={18} /> : d.id.startsWith('TOR') ? <Thermometer size={18} /> : d.id.startsWith('POD') ? <Package size={18} /> : <FileText size={18} />}</span>
              <div className="grow">
                <div className="title">{d.title}</div>
                <div className="meta ellipsis">{d.meta}</div>
              </div>
              <span className="small muted hide-m" style={{ width: 110, textAlign: 'right' }}>{d.date}</span>
              {d.status && <Pill tone={d.capa ? capaTone(d.capa.status) : statusTone(d.status)} dot>{d.status}</Pill>}
              <button className="btn ghost xs hide-m" onClick={(e) => { e.stopPropagation(); d.onDownload() }} aria-label={`Download ${d.id}`}><Download size={14} />PDF</button>
            </div>
          ))}
        </div>
      )}
      {capa && <CapaDrawer capa={capa} onClose={() => { setCapa(null); if (params.get('capa')) setParams(kind === 'all' ? {} : { kind }) }} />}
    </Page>
  )
}

export function CapaDrawer({ capa: c, onClose }: { capa: Capa; onClose: () => void }) {
  const actions = (rows: Capa['corrective']) => (
    <div className="stack" style={{ gap: 8 }}>
      {rows.map((a) => (
        <div key={a.action} className="card pad" style={{ padding: '10px 14px' }}>
          <div className="row between" style={{ alignItems: 'flex-start', gap: 10 }}>
            <div className="small" style={{ flex: 1 }}><span className="strong">{a.action}</span><div className="muted" style={{ marginTop: 2 }}>{a.owner} · due {a.due}</div></div>
            <Pill tone={a.status === 'Complete' ? 'ok' : a.status === 'In progress' ? 'info' : undefined}>{a.status}</Pill>
          </div>
        </div>
      ))}
    </div>
  )
  return (
    <Drawer title={c.id} sub={c.title} onClose={onClose} badge={<Pill tone={capaTone(c.status)} dot>{c.status}</Pill>}
      footer={<><Button onClick={() => downloadCapaPdf(c)} icon={<Download size={16} />}>Download CAPA report</Button><Button variant="secondary" to={`/shipments?job=${c.jobNumber}`} onClick={onClose}>Open the shipment</Button></>}>
      <div className="card pad tint" style={{ margin: '14px 0 4px', padding: '14px 16px' }}>
        <div className="row wrap" style={{ gap: 8 }}><Pill tone={c.severity === 'Critical' ? 'bad' : c.severity === 'Major' ? 'warn' : undefined}>{c.severity}</Pill><Pill>{c.type}</Pill>{c.study && <Pill tone="brand">{c.study}</Pill>}</div>
        <div className="small" style={{ marginTop: 10 }}>{c.problem}</div>
      </div>
      <Expand title="Reference" open>
        <KV rows={[['Shipment', <Link to={`/shipments?job=${c.jobNumber}`} onClick={onClose}>Job {c.jobNumber} · {c.orderRef}</Link>], ['Service', c.serviceLine], ['Lane', c.lane], ['Opened', c.opened], ['Last updated', c.updated], ['Target close', c.targetClose], ['Investigation owner', c.owner], ['Quality lead', c.qualityLead]]} />
      </Expand>
      <Expand title="Immediate containment"><ol style={{ margin: 0, paddingLeft: 18 }} className="small">{c.containment.map((s) => <li key={s} style={{ marginBottom: 6 }}>{s}</li>)}</ol></Expand>
      <Expand title="Investigation and root cause" open>
        <ol style={{ margin: '0 0 12px', paddingLeft: 18 }} className="small">{c.investigation.map((s) => <li key={s} style={{ marginBottom: 6 }}>{s}</li>)}</ol>
        <div className="card pad" style={{ padding: '12px 14px', background: 'var(--amber-soft)', borderColor: '#F1E0B8' }}>
          <div className="eyebrow" style={{ color: 'var(--amber)', marginBottom: 4 }}>Root cause</div>
          <div className="small">{c.rootCause}</div>
          <div className="tiny muted" style={{ marginTop: 6 }}>{c.rootCauseCategory}</div>
        </div>
      </Expand>
      <Expand title={`Corrective actions · ${c.corrective.length}`} open>{actions(c.corrective)}</Expand>
      <Expand title={`Preventive actions · ${c.preventive.length}`}>{actions(c.preventive)}</Expand>
      <Expand title="Effectiveness check" right={c.effectiveness.result ? <Pill tone={c.status === 'Closed' ? 'ok' : 'info'}>{c.status === 'Closed' ? 'Met' : 'In progress'}</Pill> : <Pill>Due {c.effectiveness.due}</Pill>}>
        <div className="small">{c.effectiveness.criteria}</div>
        {c.effectiveness.result && <div className="small green" style={{ marginTop: 6 }}>{c.effectiveness.result}</div>}
      </Expand>
      <Expand title="Impact assessment"><KV rows={[['Product', c.productImpact], ['Customer', c.customerImpact], ['Regulatory', c.regulatory]]} /></Expand>
      <Expand title="Sign-off">
        <div className="stack" style={{ gap: 6 }}>
          {c.signOff.map((s) => (<div key={s.role} className="row between small"><span><span className="strong">{s.role}</span> · {s.name}</span>{s.date ? <Pill tone="ok">{s.date}</Pill> : <Pill>Pending</Pill>}</div>))}
        </div>
        <div className="row" style={{ marginTop: 12 }}><ArrowRight size={14} className="faint" /><span className="tiny muted">Customer QA sign-off is requested through the workspace; the signed report is retained for the audit record.</span></div>
      </Expand>
    </Drawer>
  )
}
