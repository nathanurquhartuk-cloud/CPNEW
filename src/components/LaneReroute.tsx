import { ArrowRight, CheckCircle2, ChevronDown, Radio } from 'lucide-react'
import { useEffect, useState } from 'react'
import { minutesBefore } from '../lib/live'
import { Button, Pill, cx } from './ui'
import { SpecialistOptions } from './SpecialistContact'
import { WorldMap, proj } from './WorldMap'

const timeline = (at: number) => [
  { t: minutesBefore(at, 24), title: 'Risk detected', d: 'Storm cell forecast over Frankfurt 22:00–04:00 threatens the FRA → Berlin road leg; excursion risk rose from 34 to 71.', tone: 'red' },
  { t: minutesBefore(at, 20), title: 'Specialist intercepted', d: 'Control tower reviewed alternatives (Berlin direct, Amsterdam, hold at FRA) against the delivery window and decay margin.', tone: '' },
  { t: minutesBefore(at, 7), title: 'Shipment re-routed', d: 'New lane via Berlin direct on BA 992 confirmed within your Critical tier agreement; dedicated vehicle assigned; Charité informed.', tone: '' },
  { t: minutesBefore(at, 0), title: 'Risk resolved', d: 'Revised lane secured with the delivery window and a 5 h 50 m decay margin protected. ZoomLogi lane and ETA updated.', tone: 'green' },
]

export default function LaneReroute({ defaultOpen = false, onSpecialist, firedAt }: { defaultOpen?: boolean; onSpecialist?: () => void; firedAt?: number }) {
  const TIMELINE = timeline(firedAt ?? Date.now())
  const [open, setOpen] = useState(defaultOpen)
  const [risk, setRisk] = useState(71)
  const [spec, setSpec] = useState(false)
  useEffect(() => { if (!open) return; setRisk(71); const id = setInterval(() => setRisk((r) => (r > 18 ? r - 1 : r)), 25); return () => clearInterval(id) }, [open])
  useEffect(() => { setOpen(defaultOpen) }, [defaultOpen])

  const MAC = proj(-2.13, 53.26), LHR = proj(-0.46, 51.47), FRA = proj(8.57, 50.03), BER = proj(13.5, 52.36), CHA = proj(13.38, 52.53)
  const line = (a: number[], b: number[]) => `M${a[0]},${a[1]} L${b[0]},${b[1]}`

  return (
    <div className="card" style={{ overflow: 'hidden' }}>
      <div className="list-row" style={{ padding: '18px 22px', gap: 16 }}>
        <span className="icon-wrap ok"><Radio size={18} /></span>
        <div className="grow">
          <div className="row" style={{ gap: 10 }}>
            <span className="strong">Proactive shipment intelligence</span>
            <Pill tone="ok" dot>Re-route processed · no action needed</Pill>
          </div>
          <div className="muted small" style={{ marginTop: 3 }}>Job 261408871CL re-routed via Berlin ahead of a storm cell over Frankfurt. Delivery window 08:00–12:00 CEST tomorrow is protected.</div>
        </div>
        <button className="btn ghost sm" onClick={() => setOpen(!open)} aria-expanded={open}>{open ? 'Hide' : 'View intervention'}<ChevronDown size={16} style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }} /></button>
      </div>
      {open && (
        <div style={{ borderTop: '1px solid var(--line-soft)', padding: '20px 22px 22px' }}>
          <div className="grid cols-2" style={{ gap: 22 }}>
            <div>
              <div className="map" style={{ marginBottom: 14 }}>
                <WorldMap view={[772, 203, 104, 52]} height={210}>
                  <path d={`${line(MAC, LHR)} ${line(LHR, FRA)} ${line(FRA, BER)}`} stroke="#8A879C" strokeWidth={0.6} strokeDasharray="1.2 1.2" fill="none" />
                  <circle cx={FRA[0]} cy={FRA[1]} r={4} fill="#C0392B" opacity={0.18} /><circle cx={FRA[0]} cy={FRA[1]} r={1.5} fill="#C0392B" />
                  <path d={`${line(MAC, LHR)} ${line(LHR, BER)} ${line(BER, CHA)}`} stroke="#1E7A3E" strokeWidth={0.9} fill="none" />
                  {[[MAC, 'Macclesfield', 2, -2.2], [LHR, 'LHR', 2, 3.6], [BER, 'BER', -1, 4], [CHA, 'Charité', 2, -2.2]].map(([p, l, dx, dy]) => { const q = p as number[]; return (<g key={l as string}><circle cx={q[0]} cy={q[1]} r={1.2} fill="#461E96" /><text x={q[0] + (dx as number)} y={q[1] + (dy as number)} style={{ fontSize: 2.6, fontWeight: 600, fill: '#1C1A33', fontFamily: 'Inter, sans-serif' }}>{l as string}</text></g>) })}
                  <text x={FRA[0] + 3} y={FRA[1] + 4.5} style={{ fontSize: 2.4, fill: '#C0392B', fontFamily: 'Inter, sans-serif' }}>Storm cell 22:00–04:00</text>
                </WorldMap>
                <div className="live"><span className="pill ok">LIVE</span> Excursion risk <strong className="mono" style={{ marginLeft: 4 }}>{risk}</strong><span className="faint">↓ from 71</span></div>
              </div>
              <div className="card pad tint" style={{ padding: '14px 16px' }}>
                <div className="row between"><span className="strong small">Selected automatically: Berlin direct</span><Pill tone="ok">Active lane</Pill></div>
                <div className="muted small" style={{ marginTop: 4 }}>LHR → BER on BA 992 · dedicated vehicle to Charité</div>
                <div className="grid cols-4" style={{ gap: 10, marginTop: 12 }}>
                  {[['ETA', '10:10 CEST', 'inside window'], ['Decay margin', '5 h 50 m', 'was 3 h via FRA'], ['Cost', '+$1,240', 'within agreement'], ['CO₂e', '0.33 t', '−0.08 t vs FRA']].map(([l, v, d]) => (
                    <div key={l}><div className="tiny faint">{l}</div><div className="strong" style={{ fontSize: 14 }}>{v}</div><div className="tiny green">{d}</div></div>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <div className="strong" style={{ marginBottom: 12 }}>Intervention timeline</div>
              <div className="timeline">
                {TIMELINE.map((t) => (
                  <div key={t.title} className="tl-item">
                    <span className={cx('dot', t.tone)} />
                    <span className="when">{t.t}</span>
                    <div className="t">{t.title}</div>
                    <div className="d">{t.d}</div>
                  </div>
                ))}
              </div>
              <div className="row wrap" style={{ marginTop: 18, gap: 10 }}>
                <Button variant="soft" size="sm" onClick={() => { setSpec(!spec); onSpecialist?.() }}>Speak with monitoring specialist</Button>
                <Button variant="secondary" size="sm" to="/shipments/live" icon={<ArrowRight size={15} />}>All alerts and recovery</Button>
              </div>
              {spec && <div style={{ marginTop: 14 }}><SpecialistOptions compact onDone={() => setSpec(false)} /></div>}
              <div className="row small muted" style={{ marginTop: 16, gap: 8 }}><CheckCircle2 size={15} className="green" />Decided and executed by the EMEA control tower inside your Critical tier agreement.</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
