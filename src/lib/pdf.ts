import type { jsPDF as JsPDF } from 'jspdf'
import { INVOICES } from '../data/invoices'
import { SCHEDULES } from '../data/schedules'
import { JOBS } from '../data/jobs'
import { fmtDayMonthYear, today } from './dates'
import { USER } from './user'

type Invoice = (typeof INVOICES)[number]
type Schedule = (typeof SCHEDULES)[number]
type Job = (typeof JOBS)[number]

export const PURPLE: [number, number, number] = [70, 30, 150]
const GREY: [number, number, number] = [107, 104, 128]
// jsPDF's built-in fonts cannot render some glyphs; keep output ASCII-safe.
export const T = (s: string) => s.replace(/→/g, '->').replace(/[’‘]/g, "'").replace(/[“”]/g, '"').replace(/[–—]/g, '-').replace(/·/g, '|').replace(/°/g, ' deg ').replace(/₂/g, '2').replace(/…/g, '...').replace(/€/g, 'EUR ')

export async function pdfLibs() {
  const [{ jsPDF }, at] = await Promise.all([import('jspdf'), import('jspdf-autotable')])
  return { jsPDF, autoTable: at.default }
}

export function header(doc: JsPDF, title: string, ref: string) {
  doc.setFillColor(...PURPLE); doc.rect(0, 0, 210, 26, 'F')
  doc.setTextColor(255, 255, 255); doc.setFont('helvetica', 'bold'); doc.setFontSize(16); doc.text('cencora', 14, 12)
  doc.setFontSize(9); doc.setFont('helvetica', 'normal'); doc.text('World Courier', 14, 18)
  doc.setFontSize(14); doc.setFont('helvetica', 'bold'); doc.text(T(title), 196, 12, { align: 'right' })
  doc.setFontSize(9); doc.setFont('helvetica', 'normal'); doc.text(T(ref), 196, 18, { align: 'right' })
  doc.setTextColor(28, 26, 51)
}
export function footer(doc: JsPDF, note: string) {
  const pages = doc.getNumberOfPages()
  for (let p = 1; p <= pages; p++) {
    doc.setPage(p); doc.setFontSize(8); doc.setTextColor(...GREY)
    doc.text(T(note), 14, 290); doc.text(`Page ${p} of ${pages}`, 196, 290, { align: 'right' })
  }
}
export function block(doc: JsPDF, x: number, y: number, title: string, lines: string[]) {
  doc.setFontSize(8); doc.setTextColor(...GREY); doc.text(title.toUpperCase(), x, y)
  doc.setFontSize(10); doc.setTextColor(28, 26, 51)
  lines.forEach((l, i) => doc.text(T(l), x, y + 6 + i * 5))
}
const money = (n: number) => `$${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
export const invoiceTotal = (inv: Invoice) => { const sub = inv.items.reduce((a, i) => a + i.qty * i.unit, 0); return { sub, tax: sub * inv.taxRate, total: sub * (1 + inv.taxRate) } }

export async function downloadInvoicePdf(inv: Invoice) {
  const { jsPDF, autoTable } = await pdfLibs()
  const doc = new jsPDF()
  header(doc, inv.type === 'Credit note' ? 'Credit note' : 'Tax invoice', inv.number)
  block(doc, 14, 38, 'Billed to', [USER.legalEntity, `Customer ${USER.customerNo}`, USER.email])
  block(doc, 110, 38, 'Invoice details', [`Issued ${fmtDayMonthYear(inv.issued)}`, `Due ${fmtDayMonthYear(inv.due)}`, `PO ${inv.po} | ${inv.orderRef}`, `Job ${inv.jobNumber}`])
  const addOns = (inv as { addOns?: string[] }).addOns ?? []
  block(doc, 14, 66, 'Service', [`${inv.serviceLine} | ${inv.tier} tier${addOns.length ? ' + ' + addOns.join(', ') : ''}`, inv.route])
  const { sub, tax, total } = invoiceTotal(inv)
  autoTable(doc, { startY: 84, head: [['Description', 'Detail', 'Amount (USD)']], body: inv.items.map((i) => [T(i.description), T(i.detail ?? ''), money(i.qty * i.unit)]), foot: [['', 'Subtotal', money(sub)], ['', `Tax (${Math.round(inv.taxRate * 100)}%)`, money(tax)], ['', 'Total due', money(total)]], headStyles: { fillColor: PURPLE }, footStyles: { fillColor: [247, 244, 253], textColor: [28, 26, 51], fontStyle: 'bold' }, columnStyles: { 2: { halign: 'right' } }, styles: { fontSize: 9 } })
  const y = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 10
  block(doc, 14, y, 'Payment', ['Cencora World Courier Ltd | IBAN GB00 DEMO 0000 0000 0000 00 | BIC DEMOGB2L', `Reference ${inv.number} | Net 15 days | e-invoicing via PEPPOL`])
  const tp = (inv as { temperature?: Invoice['temperature'] }).temperature
  if (tp) block(doc, 14, y + 20, 'Temperature of record', [`Range ${tp.range} | min ${tp.min} | max ${tp.max} | mean ${tp.mean}`, `${tp.excursions} excursions | sensor ${tp.sensor} | ${tp.result}`])
  footer(doc, 'Illustrative document generated from the Customer Workspace future-state vision. Not a live financial record.')
  doc.save(`${inv.number}.pdf`)
}

export async function downloadTemperaturePdf(inv: Invoice) {
  const { jsPDF, autoTable } = await pdfLibs()
  const doc = new jsPDF()
  header(doc, 'Temperature of record', `Job ${inv.jobNumber}`)
  block(doc, 14, 38, 'Shipment', [inv.route, `${inv.serviceLine} | ${inv.tier} tier`, `${inv.orderRef} | ${inv.number}`])
  const tp = (inv as { temperature?: Invoice['temperature'] }).temperature
  if (!tp) return
  block(doc, 110, 38, 'Sensor', [`Device ${tp.sensor}`, `Range ${tp.range}`, tp.result])
  const rows = Array.from({ length: 12 }, (_, i) => { const t = tp.mean + Math.sin(i / 1.7) * (tp.max - tp.min) / 4; return [`${String(i * 2).padStart(2, '0')}:00`, t.toFixed(1), 'In range'] })
  autoTable(doc, { startY: 62, head: [['Time (UTC)', 'Temperature', 'Status']], body: rows, headStyles: { fillColor: PURPLE }, styles: { fontSize: 9 } })
  footer(doc, 'Illustrative temperature-of-record report. Logger data is simulated for the future-state vision.')
  doc.save(`${inv.jobNumber}-temperature-of-record.pdf`)
}

export async function downloadStatementPdf(invoices: Invoice[]) {
  const { jsPDF, autoTable } = await pdfLibs()
  const doc = new jsPDF()
  header(doc, 'Statement of account', fmtDayMonthYear(today()))
  block(doc, 14, 38, 'Account', [USER.legalEntity, `Customer ${USER.customerNo}`, `Prepared for ${USER.name}`])
  const open = invoices.filter((i) => !/paid|credit/i.test(i.status))
  const bal = open.reduce((a, i) => a + invoiceTotal(i).total, 0)
  block(doc, 110, 38, 'Summary', [`${open.length} open documents`, `Balance ${money(bal)}`, 'Terms net 15 days'])
  autoTable(doc, { startY: 62, head: [['Document', 'Service', 'Issued', 'Due', 'Status', 'Amount']], body: invoices.map((i) => [i.number, T(i.serviceLine), fmtDayMonthYear(i.issued), fmtDayMonthYear(i.due), i.status, money(invoiceTotal(i).total)]), headStyles: { fillColor: PURPLE }, columnStyles: { 5: { halign: 'right' } }, styles: { fontSize: 9 } })
  footer(doc, 'Illustrative statement generated from the Customer Workspace future-state vision.')
  doc.save('statement-of-account.pdf')
}

export async function downloadSchedulePdf(s: Schedule) {
  const { jsPDF, autoTable } = await pdfLibs()
  const doc = new jsPDF()
  header(doc, 'Service schedule', s.reference)
  block(doc, 14, 38, 'Solution', [s.name, s.tierSummary, `${s.sla}`])
  block(doc, 110, 38, 'Term', [`Effective ${s.startDate}`, `Renewal ${s.renewalDate} | notice ${s.noticePeriod}`, `Volume ${s.volume}`])
  autoTable(doc, { startY: 66, head: [['Item', 'Tier', `Rate (${s.currency})`, 'Unit', 'Notes']], body: s.rates.map((r) => [T(r.item), r.tier, r.rate, r.unit, T(r.note || '')]), headStyles: { fillColor: PURPLE }, styles: { fontSize: 8.5 } })
  let y = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 10
  block(doc, 14, y, 'Surcharges and pass-through', s.surcharges)
  y += 8 + s.surcharges.length * 5
  block(doc, 14, y, 'Amendments', s.amendments.map((a) => `${a.date} | ${a.title} | ${a.by}`))
  footer(doc, 'Illustrative schedule generated from the Customer Workspace future-state vision. The signed MSA governs.')
  doc.save(`${s.reference.replace(/\s+/g, '-')}.pdf`)
}

export async function downloadRateCardPdf() {
  const { jsPDF, autoTable } = await pdfLibs()
  const doc = new jsPDF()
  header(doc, 'Rate card 2026/27', 'All schedules')
  block(doc, 14, 38, 'Account', [USER.legalEntity, `Customer ${USER.customerNo}`, 'Approved terms drive quoting and invoice assurance automatically'])
  let y = 56
  for (const s of SCHEDULES) {
    doc.setFontSize(11); doc.setFont('helvetica', 'bold'); doc.text(T(s.name), 14, y); doc.setFont('helvetica', 'normal')
    autoTable(doc, { startY: y + 3, head: [['Item', 'Tier', `Rate (${s.currency})`, 'Unit']], body: s.rates.map((r) => [T(r.item), r.tier, r.rate, r.unit]), headStyles: { fillColor: PURPLE }, styles: { fontSize: 8.5 } })
    y = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 12
    if (y > 240) { doc.addPage(); y = 20 }
  }
  footer(doc, 'Illustrative rate card generated from the Customer Workspace future-state vision.')
  doc.save('rate-card-2026-27.pdf')
}

export async function downloadPodPdf(job: Job) {
  const { jsPDF, autoTable } = await pdfLibs()
  const doc = new jsPDF()
  header(doc, 'Proof of delivery', `Job ${job.number}`)
  block(doc, 14, 38, 'Consignee', [job.destination, `Delivered ${job.eta}`, 'Signed: receiving pharmacist'])
  block(doc, 110, 38, 'Shipment', [job.product, job.service, `Final temperature ${job.temp} (${job.tempRange})`])
  autoTable(doc, { startY: 64, head: [['Leg', 'Provider', 'From', 'To', 'Status']], body: job.legs.map((l) => [l.id, l.provider, T(l.from), T(l.to), l.status]), headStyles: { fillColor: PURPLE }, styles: { fontSize: 8.5 } })
  footer(doc, 'Illustrative proof of delivery generated from the Customer Workspace future-state vision.')
  doc.save(`${job.number}-proof-of-delivery.pdf`)
}

export function exportCsv(rows: Record<string, string | number>[], name: string) {
  const keys = Object.keys(rows[0] || {})
  const csv = [keys.join(','), ...rows.map((r) => keys.map((k) => `"${String(r[k]).replace(/"/g, '""')}"`).join(','))].join('\n')
  const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' })); a.download = name; a.click(); URL.revokeObjectURL(a.href)
}

export async function downloadCapaPdf(c: import('../data/capas').Capa) {
  const { jsPDF, autoTable } = await pdfLibs()
  const doc = new jsPDF()
  header(doc, 'CAPA report', c.id)
  block(doc, 14, 38, 'Investigation', [c.title, `${c.type} | ${c.severity} | ${c.status}`, `Opened ${c.opened} | updated ${c.updated} | target close ${c.targetClose}`])
  block(doc, 110, 38, 'Shipment', [`Job ${c.jobNumber} | ${c.orderRef}`, c.serviceLine, c.lane + (c.study ? ` | ${c.study}` : '')])
  block(doc, 14, 64, 'Ownership', [`Owner ${c.owner}`, `Quality lead ${c.qualityLead}`])
  const para = (title: string, text: string, y: number) => { doc.setFontSize(8); doc.setTextColor(107, 104, 128); doc.text(title.toUpperCase(), 14, y); doc.setFontSize(10); doc.setTextColor(28, 26, 51); const lines = doc.splitTextToSize(T(text), 182); doc.text(lines, 14, y + 6); return y + 6 + lines.length * 5 + 4 }
  let y = para('Problem statement', c.problem, 82)
  y = para('Immediate containment', c.containment.map((s, i) => `${i + 1}. ${s}`).join('\n'), y)
  y = para('Investigation', c.investigation.map((s, i) => `${i + 1}. ${s}`).join('\n'), y)
  y = para('Root cause', `${c.rootCause}\nCategory: ${c.rootCauseCategory}`, y)
  const table = (title: string, rows: { action: string; owner: string; due: string; status: string }[]) => {
    if (y > 240) { doc.addPage(); y = 20 }
    doc.setFontSize(8); doc.setTextColor(107, 104, 128); doc.text(title.toUpperCase(), 14, y)
    autoTable(doc, { startY: y + 3, head: [['Action', 'Owner', 'Due', 'Status']], body: rows.map((r) => [T(r.action), T(r.owner), r.due, r.status]), headStyles: { fillColor: PURPLE }, styles: { fontSize: 8.5 }, columnStyles: { 0: { cellWidth: 96 } } })
    y = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 10
  }
  table('Corrective actions', c.corrective)
  table('Preventive actions', c.preventive)
  if (y > 220) { doc.addPage(); y = 20 }
  y = para('Effectiveness check', `${c.effectiveness.criteria} Due ${c.effectiveness.due}.${c.effectiveness.result ? ` Result: ${c.effectiveness.result}.` : ''}`, y)
  y = para('Impact assessment', `Product: ${c.productImpact}\nCustomer: ${c.customerImpact}\nRegulatory: ${c.regulatory}`, y)
  if (y > 240) { doc.addPage(); y = 20 }
  autoTable(doc, { startY: y, head: [['Sign-off', 'Name', 'Date']], body: c.signOff.map((s) => [s.role, s.name, s.date || 'Pending']), headStyles: { fillColor: PURPLE }, styles: { fontSize: 8.5 } })
  footer(doc, 'Corrective and preventive action report generated from the Customer Workspace future-state vision. Illustrative content.')
  doc.save(`${c.id}.pdf`)
}
