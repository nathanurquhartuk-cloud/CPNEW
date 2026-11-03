import { AlertTriangle, ArrowRight, Download, FileText, Receipt, Search, Thermometer } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { BILLING_TEAM, SpecialistOptions } from '../components/SpecialistContact'
import { Button, Drawer, Empty, Expand, KV, Page, PageHead, Pill, Progress, Section, Segmented, Stat, cx, statusTone } from '../components/ui'
import { INVOICES } from '../data/invoices'
import { daysUntil, fmtDayMonthYear } from '../lib/dates'
import { downloadInvoicePdf, downloadStatementPdf, downloadTemperaturePdf, exportCsv, invoiceTotal } from '../lib/pdf'
import { USER } from '../lib/user'

type Invoice = (typeof INVOICES)[number]
type Filter = 'all' | 'open' | 'overdue' | 'disputed' | 'paid' | 'credits'

const money = (n: number) => `$${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
const isOpen = (i: Invoice) => /outstanding|overdue|disputed/i.test(i.status)
const isCredit = (i: Invoice) => i.type === 'Credit note'
const signedTotal = (i: Invoice) => (isCredit(i) ? -1 : 1) * invoiceTotal(i).total

const dueLabel = (i: Invoice) => {
  if (isCredit(i)) return 'Applied'
  if (/paid/i.test(i.status)) return `Paid ${fmtDayMonthYear(i.due)}`
  const n = daysUntil(i.due)
  if (n > 0) return `Due in ${n} day${n === 1 ? '' : 's'}`
  if (n === 0) return 'Due today'
  return `${Math.abs(n)} day${Math.abs(n) === 1 ? '' : 's'} overdue`
}

export default function Financials() {
  const [params, setParams] = useSearchParams()
  const [filter, setFilter] = useState<Filter>('all')
  const [q, setQ] = useState('')
  const [sel, setSel] = useState<Invoice | null>(null)

  useEffect(() => {
    const n = params.get('invoice')
    const inv = n ? INVOICES.find((i) => i.number === n) : null
    if (inv) setSel(inv)
  }, [params])

  const outstanding = INVOICES.filter(isOpen)
  const outstandingTotal = outstanding.reduce((a, i) => a + invoiceTotal(i).total, 0)
  const dueSoon = INVOICES.filter((i) => isOpen(i) && daysUntil(i.due) >= 0 && daysUntil(i.due) <= 7)
  const dueSoonTotal = dueSoon.reduce((a, i) => a + invoiceTotal(i).total, 0)
  const attention = INVOICES.filter((i) => /overdue|disputed/i.test(i.status))

  const counts = {
    all: INVOICES.length,
    open: outstanding.length,
    overdue: INVOICES.filter((i) => /overdue/i.test(i.status)).length,
    disputed: INVOICES.filter((i) => /disputed/i.test(i.status)).length,
    paid: INVOICES.filter((i) => /paid/i.test(i.status)).length,
    credits: INVOICES.filter(isCredit).length,
  }

  const rows = useMemo(() => INVOICES.filter((i) => {
    if (filter === 'open' && !isOpen(i)) return false
    if (filter === 'overdue' && !/overdue/i.test(i.status)) return false
    if (filter === 'disputed' && !/disputed/i.test(i.status)) return false
    if (filter === 'paid' && !/paid/i.test(i.status)) return false
    if (filter === 'credits' && !isCredit(i)) return false
    if (q && !`${i.number} ${i.po} ${i.route} ${i.jobNumber} ${i.orderRef} ${i.serviceLine}`.toLowerCase().includes(q.toLowerCase())) return false
    return true
  }), [filter, q])

  const csv = () => exportCsv(INVOICES.map((i) => ({ Document: i.number, Type: i.type, Service: i.serviceLine, Tier: i.tier, Route: i.route, PO: i.po, Job: i.jobNumber, Issued: fmtDayMonthYear(i.issued), Due: fmtDayMonthYear(i.due), Status: i.status, Total: signedTotal(i).toFixed(2) })), 'invoices.csv')

  const close = () => { setSel(null); if (params.get('invoice')) setParams({}) }

  return (
    <Page>
      <PageHead
        title="Financials"
        sub="Invoices, credits, statements and payment in one place."
        tools={<><Button variant="secondary" onClick={csv} icon={<Download size={16} />}>Export CSV</Button><Button onClick={() => downloadStatementPdf(INVOICES)} icon={<FileText size={16} />}>Statement (PDF)</Button></>}
      />

      <div className="grid cols-3">
        <Stat label="Outstanding balance" value={money(outstandingTotal)} delta={`${outstanding.length} open document${outstanding.length === 1 ? '' : 's'}`} />
        <Stat label="Due in 7 days" value={money(dueSoonTotal)} delta={dueSoon.length ? `${dueSoon.length} invoice${dueSoon.length === 1 ? '' : 's'} · net 15 days` : 'Nothing falls due this week'} tone={dueSoon.length ? 'warn' : 'ok'} />
        <Stat label="Needs attention" value={attention.length} delta={attention.length ? `${counts.overdue} overdue · ${counts.disputed} in dispute` : 'All invoices are on track'} tone={attention.length ? 'bad' : 'ok'} />
      </div>

      <Section>
        <div className="row between wrap" style={{ gap: 12, marginBottom: 14 }}>
          <div style={{ overflowX: 'auto', maxWidth: '100%' }}>
            <Segmented value={filter} onChange={setFilter} options={[
              { id: 'all', label: 'All', count: counts.all },
              { id: 'open', label: 'Open', count: counts.open },
              { id: 'overdue', label: 'Overdue', count: counts.overdue },
              { id: 'disputed', label: 'Disputed', count: counts.disputed },
              { id: 'paid', label: 'Paid', count: counts.paid },
              { id: 'credits', label: 'Credits', count: counts.credits },
            ]} />
          </div>
          <div style={{ position: 'relative', maxWidth: 280, flex: 1, minWidth: 200 }}>
            <Search size={15} style={{ position: 'absolute', left: 12, top: 12, color: 'var(--faint)' }} />
            <input className="input" style={{ paddingLeft: 34, height: 38 }} placeholder="Number, PO, route or job" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Filter invoices" />
          </div>
        </div>

        {rows.length === 0 ? (
          <Empty title="No documents match" text="Try another reference or clear the filter." />
        ) : (
          <div className="card" style={{ overflow: 'hidden' }}>
            {rows.map((i) => {
              const tone = statusTone(i.status)
              const credit = isCredit(i)
              return (
                <div key={i.number} className="list-row click" onClick={() => setSel(i)}>
                  <span className={cx('icon-wrap', tone === 'bad' && 'bad', tone === 'ok' && 'ok', tone === 'warn' && 'warn')}>
                    {tone === 'bad' ? <AlertTriangle size={18} /> : credit ? <Receipt size={18} /> : <FileText size={18} />}
                  </span>
                  <div className="grow">
                    <div className="title">{i.number} <span className="muted" style={{ fontWeight: 400 }}>· {i.type}</span></div>
                    <div className="meta ellipsis">{i.serviceLine} · {i.tier} tier · {i.route} · {i.po}</div>
                  </div>
                  <div className={cx('hide-m small', tone === 'bad' ? 'red' : 'muted')} style={{ width: 150, textAlign: 'right' }}>{dueLabel(i)}</div>
                  <div className="strong mono" style={{ width: 96, textAlign: 'right' }}>{credit ? '−' : ''}{money(invoiceTotal(i).total)}</div>
                  <Pill tone={tone} dot>{i.status}</Pill>
                  <button className="btn ghost xs hide-m" onClick={(e) => { e.stopPropagation(); downloadInvoicePdf(i) }} aria-label={`Download ${i.number} as PDF`}><Download size={14} />PDF</button>
                </div>
              )
            })}
          </div>
        )}
      </Section>

      <Section>
        <div className="card" style={{ padding: '0 22px' }}>
          <Expand title="Billing insights" right={<span className="small muted">This quarter</span>}>
            <div className="stack" style={{ gap: 14 }}>
              {[
                ['Radiopharma', 92330],
                ['Central Lab & Biostorage', 61710],
                ['Clinical Supply Logistics', 16469],
              ].map(([name, v]) => (
                <div key={name as string}>
                  <div className="row between small" style={{ marginBottom: 6 }}><span className="strong">{name as string}</span><span className="muted mono">{money(v as number)}</span></div>
                  <Progress value={((v as number) / 92330) * 100} />
                </div>
              ))}
              <div className="small muted" style={{ marginTop: 4 }}>Invoice accuracy 99.1%: one supplementary invoice (INV-26-0887) is on hold pending a temperature-of-record review.</div>
            </div>
          </Expand>
        </div>
      </Section>

      {sel && <InvoiceDrawer inv={sel} onClose={close} />}
    </Page>
  )
}

function InvoiceDrawer({ inv, onClose }: { inv: Invoice; onClose: () => void }) {
  const { sub, tax, total } = invoiceTotal(inv)
  const credit = isCredit(inv)
  const disputed = /disputed/i.test(inv.status)
  const open = isOpen(inv)
  const [scheduled, setScheduled] = useState(false)
  const [dispute, setDispute] = useState(false)
  const [holdConfirmed, setHoldConfirmed] = useState(false)
  const n = daysUntil(inv.due)
  const dueText = credit ? `Applied to the account on ${fmtDayMonthYear(inv.issued)}` : /paid/i.test(inv.status) ? `Paid · settled ${fmtDayMonthYear(inv.due)}` : n > 0 ? `Due ${fmtDayMonthYear(inv.due)} · in ${n} day${n === 1 ? '' : 's'}` : n === 0 ? `Due today, ${fmtDayMonthYear(inv.due)}` : `Due ${fmtDayMonthYear(inv.due)} · ${Math.abs(n)} day${Math.abs(n) === 1 ? '' : 's'} overdue`
  const ref = `CB-${inv.number.slice(-4)}`

  return (
    <Drawer
      title={inv.number}
      sub={inv.route}
      onClose={onClose}
      badge={<Pill tone={statusTone(inv.status)} dot>{inv.status}</Pill>}
      footer={<>
        <Button onClick={() => downloadInvoicePdf(inv)} icon={<Download size={16} />}>Download PDF</Button>
        {open && !disputed && <Button variant="secondary" onClick={() => setScheduled(true)} disabled={scheduled}>{scheduled ? 'Payment scheduled' : 'Settle or schedule payment'}</Button>}
        {!credit && <Button variant="ghost" onClick={() => setDispute(!dispute)}>Raise a dispute</Button>}
      </>}
    >
      <div className="card pad tint" style={{ margin: '14px 0 4px', padding: '14px 16px' }}>
        <div className="row between">
          <span className="strong" style={{ fontSize: 20 }}>{credit ? '−' : ''}{money(total)}</span>
          <span className="small muted">{inv.type}</span>
        </div>
        <div className="muted small" style={{ marginTop: 4 }}>Issued {fmtDayMonthYear(inv.issued)} · {dueText}</div>
      </div>

      {scheduled && (
        <div className="card pad" style={{ margin: '10px 0 4px', padding: '12px 16px', background: 'var(--green-soft)', borderColor: '#CDE8D5' }}>
          <div className="strong small green">Payment scheduled for {fmtDayMonthYear(inv.due)}</div>
          <div className="small muted" style={{ marginTop: 2 }}>Confirmation {ref} sent to {USER.email}.</div>
        </div>
      )}

      {disputed && (
        <div className="card pad tint" style={{ margin: '10px 0 4px', padding: '12px 16px' }}>
          <div className="row between wrap" style={{ gap: 8 }}>
            <div>
              <div className="strong small">On hold pending the temperature-of-record review</div>
              <div className="small muted" style={{ marginTop: 2 }}>Marcus O. has requested the record from the controlling office. No payment is expected while the review is open.</div>
            </div>
            {holdConfirmed ? <Pill tone="ok" dot>Hold confirmed</Pill> : <Button variant="ghost" size="sm" onClick={() => setHoldConfirmed(true)}>Confirm the dispute can stay on hold</Button>}
          </div>
        </div>
      )}

      {dispute && (
        <div style={{ margin: '12px 0 4px' }}>
          <div className="small muted" style={{ marginBottom: 8 }}>A billing specialist will pick this up with the invoice open. Choose how you would like to connect.</div>
          <SpecialistOptions team={BILLING_TEAM} compact onDone={() => setDispute(false)} />
        </div>
      )}

      <Expand title="Line items" open>
        <div className="table-wrap">
          <table className="table">
            <thead><tr><th>Description</th><th className="num">Qty</th><th className="num">Unit</th><th className="num">Amount</th></tr></thead>
            <tbody>
              {inv.items.map((it, k) => (
                <tr key={k}>
                  <td><div className="strong" style={{ fontSize: 13 }}>{it.description}</div>{it.detail && <div className="small muted">{it.detail}</div>}</td>
                  <td className="num">{it.qty}</td>
                  <td className="num">{money(it.unit)}</td>
                  <td className="num strong">{money(it.qty * it.unit)}</td>
                </tr>
              ))}
              <tr><td colSpan={3} className="num muted">Subtotal</td><td className="num">{money(sub)}</td></tr>
              <tr><td colSpan={3} className="num muted">Tax ({Math.round(inv.taxRate * 100)}%)</td><td className="num">{money(tax)}</td></tr>
              <tr><td colSpan={3} className="num strong">Total</td><td className="num strong">{credit ? '−' : ''}{money(total)}</td></tr>
            </tbody>
          </table>
        </div>
      </Expand>

      {inv.temperature && (
        <Expand title="Temperature of record" right={<span className="small muted">{inv.temperature.result}</span>}>
          <KV rows={[
            ['Range', inv.temperature.range],
            ['Minimum', `${inv.temperature.min} °C`],
            ['Maximum', `${inv.temperature.max} °C`],
            ['Mean', `${inv.temperature.mean} °C`],
            ['Excursions', inv.temperature.excursions === 0 ? 'None' : String(inv.temperature.excursions)],
            ['Sensor', inv.temperature.sensor],
          ]} />
          <div style={{ marginTop: 12 }}><Button size="sm" variant="secondary" onClick={() => downloadTemperaturePdf(inv)} icon={<Thermometer size={15} />}>Temperature of record (PDF)</Button></div>
        </Expand>
      )}

      <Expand title="Payment and remittance">
        <KV rows={[
          ['Payment terms', 'Net 15 days'],
          ['Beneficiary', 'Cencora World Courier Ltd'],
          ['IBAN', 'GB00 DEMO 0000 0000 0000 00'],
          ['BIC', 'DEMOGB2L'],
          ['Reference', inv.number],
          ['AR contact', 'ar.worldcourier@cencora.com'],
        ]} />
      </Expand>

      <Expand title="Linked shipment">
        <KV rows={[['Order', inv.orderRef], ['Job', inv.jobNumber], ['Service', `${inv.serviceLine} · ${inv.tier} tier${inv.addOns?.length ? ` + ${inv.addOns.join(', ')}` : ''}`], ['Route', inv.route]]} />
        <div style={{ marginTop: 12 }}>
          <Link to={`/shipments?ref=${inv.orderRef}`} onClick={onClose} className="btn secondary sm">Open the shipment <ArrowRight size={15} /></Link>
        </div>
      </Expand>
    </Drawer>
  )
}
