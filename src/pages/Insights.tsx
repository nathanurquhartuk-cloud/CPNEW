import { ArrowRight, MapPin, Sparkles } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Button, Card, Page, PageHead, Pill, Progress, Section, Segmented, Stat, cx } from '../components/ui'
import { ANALYTICS_QUESTIONS } from '../data/analyticsQuestions'
import { KPI_SETS } from '../data/kpiSets'
import { openCora } from '../lib/notifications'

type ReportPage = 'overview' | 'kpis' | 'coldchain' | 'risk' | 'sustainability' | 'benchmark'
const PAGES: { id: ReportPage; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'kpis', label: 'Live KPIs' },
  { id: 'coldchain', label: 'Cold chain' },
  { id: 'risk', label: 'Risk' },
  { id: 'sustainability', label: 'Sustainability' },
  { id: 'benchmark', label: 'Benchmark' },
]
const isPage = (s: string | null): s is ReportPage => !!s && PAGES.some((p) => p.id === s)

type SetKey = keyof typeof KPI_SETS
const SET_KEYS = Object.keys(KPI_SETS) as SetKey[]
const PURPLE = '#461E96', LILAC = '#8B6FD6', GREEN = '#1E7A3E'

// ---------- charts (plain SVG) ----------
const MONTHS = ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct']
const RADIO = [118, 122, 126, 131, 136, 140, 146, 151, 157, 163, 170, 178]
const LAB = [122, 124, 127, 129, 132, 134, 136, 138, 139, 141, 143, 142]
const CLIN = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 18]

function VolumeChart() {
  const W = 640, H = 240, padL = 36, padB = 28, padT = 10
  const max = 360
  const innerW = W - padL - 10, innerH = H - padB - padT
  const bw = innerW / MONTHS.length
  const y = (v: number) => padT + innerH - (v / max) * innerH
  const ticks = [0, 120, 240, 360]
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 'auto', display: 'block' }} role="img" aria-label="Shipment volume by service line, last 12 months">
      {ticks.map((t) => (
        <g key={t}>
          <line x1={padL} x2={W - 10} y1={y(t)} y2={y(t)} stroke="#F0EFF5" strokeWidth={1} />
          <text x={padL - 8} y={y(t) + 4} textAnchor="end" style={{ fontSize: 11, fill: '#9896A8', fontFamily: 'Inter, sans-serif' }}>{t}</text>
        </g>
      ))}
      {MONTHS.map((m, i) => {
        const x = padL + i * bw + bw * 0.22
        const w = bw * 0.56
        const r = RADIO[i], l = LAB[i], c = CLIN[i]
        return (
          <g key={m}>
            <rect x={x} y={y(r)} width={w} height={y(0) - y(r)} fill={PURPLE} rx={2} />
            <rect x={x} y={y(r + l)} width={w} height={y(0) - y(l)} fill={LILAC} rx={2} />
            {c > 0 && <rect x={x} y={y(r + l + c)} width={w} height={y(0) - y(c)} fill={GREEN} rx={2} />}
            <text x={x + w / 2} y={H - 8} textAnchor="middle" style={{ fontSize: 11, fill: '#6B6880', fontFamily: 'Inter, sans-serif' }}>{m}</text>
          </g>
        )
      })}
    </svg>
  )
}

function Sparkline({ values, labels }: { values: number[]; labels: string[] }) {
  const W = 420, H = 120, padB = 22, padT = 6
  const min = Math.min(...values) - 6, max = Math.max(...values) + 2
  const bw = W / values.length
  const y = (v: number) => padT + (H - padB - padT) * (1 - (v - min) / (max - min))
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 'auto', display: 'block' }} role="img" aria-label="Monthly trend">
      {values.map((v, i) => (
        <g key={i}>
          <rect x={i * bw + bw * 0.25} y={y(v)} width={bw * 0.5} height={H - padB - y(v)} rx={3} fill={i === values.length - 1 ? PURPLE : '#D9D2EE'} />
          <text x={i * bw + bw / 2} y={y(v) - 5} textAnchor="middle" style={{ fontSize: 11, fill: '#2B2940', fontWeight: 600, fontFamily: 'Inter, sans-serif' }}>{v}</text>
          <text x={i * bw + bw / 2} y={H - 6} textAnchor="middle" style={{ fontSize: 11, fill: '#9896A8', fontFamily: 'Inter, sans-serif' }}>{labels[i]}</text>
        </g>
      ))}
    </svg>
  )
}

function Legend({ items }: { items: [string, string][] }) {
  return (
    <div className="row wrap small muted" style={{ gap: 14, marginTop: 10 }}>
      {items.map(([label, color]) => (
        <span key={label} className="row" style={{ gap: 6 }}><span style={{ width: 10, height: 10, borderRadius: 3, background: color, display: 'inline-block' }} />{label}</span>
      ))}
    </div>
  )
}

function Bars({ labels, vals }: { labels: string[]; vals: number[] }) {
  return (
    <div className="stack" style={{ gap: 12 }}>
      {labels.map((l, i) => (
        <div key={l}>
          <div className="row between small" style={{ marginBottom: 4 }}><span className="muted">{l}</span><span className="strong mono">{vals[i]}%</span></div>
          <Progress value={vals[i]} tone={vals[i] >= 95 ? 'ok' : vals[i] >= 90 ? undefined : 'warn'} />
        </div>
      ))}
    </div>
  )
}

function Compare({ rows }: { rows: [string, number, number][] }) {
  return (
    <div className="stack" style={{ gap: 16 }}>
      {rows.map(([label, you, peer]) => (
        <div key={label}>
          <div className="row between small" style={{ marginBottom: 6 }}>
            <span className="strong">{label}</span>
            <span className="muted">You <span className="strong mono">{you}%</span> · peer median <span className="mono">{peer}%</span></span>
          </div>
          <Progress value={you} tone="ok" />
          <div style={{ marginTop: 4 }}><Progress value={peer} /></div>
        </div>
      ))}
      <Legend items={[['You', GREEN], ['Peer median', PURPLE]]} />
    </div>
  )
}

// ---------- page ----------
export default function Insights() {
  const [params, setParams] = useSearchParams()
  const page: ReportPage = isPage(params.get('page')) ? (params.get('page') as ReportPage) : 'overview'
  const setPage = (p: ReportPage) => { const next = new URLSearchParams(params); next.set('page', p); setParams(next, { replace: true }) }
  const [setKey, setSetKey] = useState<SetKey>(SET_KEYS[0])
  const set = useMemo(() => KPI_SETS[setKey], [setKey])

  return (
    <Page>
      <PageHead
        title="Insights"
        sub="Live KPI reports, predictive risk, cold chain integrity, sustainability and benchmarking."
        tools={<><Button variant="secondary" to="/shipments/live" icon={<MapPin size={16} />}>Open live tracking</Button><Button onClick={() => openCora('How am I performing this month?')} icon={<Sparkles size={16} />}>Ask Cora</Button></>}
      />

      <div style={{ overflowX: 'auto', marginBottom: 20 }}>
        <Segmented value={page} onChange={setPage} options={PAGES} />
      </div>

      {page === 'overview' && (
        <>
          <div className="grid cols-4">
            <Stat label="OTIF (on time in full)" value="97.4%" delta="+0.8 pp vs prior period" tone="ok" />
            <Stat label="Temperature compliance" value="99.2%" delta="+0.3 pp" tone="ok" />
            <Stat label="Active shipments" value="847" delta="+12 vs last week" tone="ok" />
            <Stat label="Spend YTD" value="$1.20M" delta="+22% vs last year" tone="warn" />
          </div>
          <div className="grid cols-2" style={{ marginTop: 16 }}>
            <Card>
              <div className="strong">Shipment volume by service line</div>
              <div className="small muted" style={{ marginBottom: 10 }}>Last 12 months · ZoomLogi and TMS</div>
              <VolumeChart />
              <Legend items={[['Radiopharma', PURPLE], ['Central Lab & Biostorage', LILAC], ['Clinical Supply Logistics · from Oct', GREEN]]} />
            </Card>
            <Card>
              <div className="row" style={{ gap: 8 }}><span className="strong">Smart narrative</span><Pill tone="brand">AI</Pill></div>
              <div className="small muted" style={{ marginBottom: 12 }}>Auto-generated from this page</div>
              <div className="stack" style={{ gap: 12 }}>
                {[
                  <>Shipment volume reached <b>338</b> in October, up <b>14.6%</b> year on year, driven mainly by Radiopharma (<b>+21%</b>).</>,
                  <>OTIF improved to <b>97.4%</b>, the highest in the period, after a <b>38%</b> reduction in tarmac dwell on the LHR → GRU lane.</>,
                  <>CO₂ per shipment fell <b>9%</b> as 18% of EU road legs moved to consolidated milk runs.</>,
                ].map((t, i) => (
                  <div key={i} className="row" style={{ gap: 10, alignItems: 'flex-start' }}>
                    <span style={{ width: 8, height: 8, borderRadius: 99, background: PURPLE, marginTop: 7, flex: 'none' }} />
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
          <Card style={{ marginTop: 16 }}>
            <div className="strong">Top lanes</div>
            <div className="small muted" style={{ marginBottom: 8 }}>By volume · current quarter</div>
            <div className="table-wrap">
              <table className="table">
                <thead><tr><th>Lane</th><th className="num">Shipments</th><th className="num">OTIF</th><th className="num">Excursions</th></tr></thead>
                <tbody>
                  {([['LHR → GRU', 184, '96.2%', 3], ['FRA → GIG', 121, '97.5%', 1], ['AMS → WAW', 98, '99.0%', 0], ['LHR → JFK', 76, '98.7%', 0], ['SIN → SYD', 42, '95.2%', 1]] as [string, number, string, number][]).map(([lane, n, otif, ex]) => (
                    <tr key={lane}><td className="strong">{lane}</td><td className="num">{n}</td><td className="num">{otif}</td><td className={cx('num', ex > 0 && 'red')}>{ex}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </>
      )}

      {page === 'kpis' && (
        <>
          <div style={{ overflowX: 'auto', marginBottom: 16 }}>
            <Segmented value={setKey} onChange={setSetKey} options={SET_KEYS.map((k) => ({ id: k, label: k }))} />
          </div>
          {!set.subscribed ? (
            <Card className="tint" style={{ textAlign: 'center', padding: '40px 20px' }}>
              <div className="strong" style={{ fontSize: 16 }}>Not subscribed</div>
              <div className="muted" style={{ marginTop: 6 }}>{set.sub}</div>
              <div style={{ marginTop: 16 }}><Button to="/solutions" icon={<ArrowRight size={16} />}>Explore this solution</Button></div>
            </Card>
          ) : (
            <>
              <p className="muted" style={{ marginBottom: 16 }}>{set.sub}</p>
              <div className="grid cols-4">
                {set.metrics.map(([label, value, sub, good]) => (
                  <Stat key={String(label)} label={String(label)} value={String(value)} delta={String(sub)} tone={good ? 'ok' : 'warn'} />
                ))}
              </div>
              <div className="grid cols-2" style={{ marginTop: 16 }}>
                <Card>
                  <div className="strong">Headline trend</div>
                  <div className="small muted" style={{ marginBottom: 10 }}>Monthly · April to October</div>
                  <Sparkline values={set.bars} labels={['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct']} />
                </Card>
                <Card>
                  <div className="strong" style={{ marginBottom: 12 }}>Where you stand</div>
                  <Bars labels={set.labels} vals={set.vals} />
                </Card>
              </div>
              <Card pad={false} style={{ marginTop: 16, overflow: 'hidden' }}>
                {set.detail.map((d) => (
                  <Link key={d.label} to={d.to} className="list-row click" style={{ color: 'inherit' }}>
                    <div className="grow"><div className="title">{d.label}</div><div className="meta">{d.sub}</div></div>
                    <ArrowRight size={16} className="faint" />
                  </Link>
                ))}
              </Card>
            </>
          )}
        </>
      )}

      {page === 'coldchain' && (
        <>
          <div className="grid cols-4">
            <Stat label="Temperature compliance" value="99.2%" delta="+0.3 pp" tone="ok" />
            <Stat label="Open excursions" value="3" delta="1 under review" tone="warn" />
            <Stat label="Mean time to intervene" value="11 min" delta="Target 15 min" tone="ok" />
            <Stat label="Logger coverage" value="100%" delta="All active consignments" tone="ok" />
          </div>
          <Section title="Open excursions">
            <Card pad={false} style={{ overflow: 'hidden' }}>
              {([
                ['261396071CL', 'LHR → GRU', '8.2 °C for 27 minutes', 'Under review', 'warn'],
                ['261402288CL', 'LHR → VCP', '8.4 °C for 12 minutes', 'Closed', 'ok'],
                ['261405510CL', 'LHR → GRU', 'Logger swap pending', 'Pending', 'warn'],
              ] as [string, string, string, string, 'ok' | 'warn'][]).map(([job, lane, what, status, tone]) => (
                <Link key={job} to={`/shipments?job=${job}`} className="list-row click" style={{ color: 'inherit' }}>
                  <div className="grow"><div className="title">{job} <span className="muted" style={{ fontWeight: 400 }}>· {lane}</span></div><div className="meta">{what}</div></div>
                  <Pill tone={tone} dot>{status}</Pill>
                  <ArrowRight size={16} className="faint hide-m" />
                </Link>
              ))}
            </Card>
          </Section>
        </>
      )}

      {page === 'risk' && (
        <>
          <div className="grid cols-4">
            <Stat label="High-risk departures this week" value="2" delta="Thursday" tone="warn" />
            <Stat label="Predictive excursion risk" value="23" delta="Average PTE across open jobs" tone="ok" />
            <Stat label="Customs holds avoided" value="6" delta="Last 30 days" tone="ok" />
            <Stat label="Re-routes executed" value="1" delta="Job 261408871CL via Berlin" tone="ok" />
          </div>
          <Section title="Watch list">
            <Card pad={false} style={{ overflow: 'hidden' }}>
              {([
                ['26141902', 'LHR → GRU', 78, 'Passive shipper upgrade recommended', 'bad'],
                ['26141877', 'MAD → BOG', 64, 'Pre-clear customs, broker alert', 'warn'],
                ['26141910', 'FRA → GIG', 41, 'Monitor tarmac dwell', 'info'],
              ] as [string, string, number, string, 'bad' | 'warn' | 'info'][]).map(([job, lane, pte, action, tone]) => (
                <div key={job} className="list-row">
                  <div className="grow"><div className="title">{job} <span className="muted" style={{ fontWeight: 400 }}>· {lane}</span></div><div className="meta">{action}</div></div>
                  <Pill tone={tone}>PTE {pte}</Pill>
                </div>
              ))}
            </Card>
          </Section>
        </>
      )}

      {page === 'sustainability' && (
        <>
          <div className="grid cols-4">
            <Stat label="Scope 3 CO₂e YTD" value="312 t" delta="−9% per shipment" tone="ok" />
            <Stat label="Consolidated milk runs" value="18%" delta="Of EU road legs" tone="ok" />
            <Stat label="Reusable shippers" value="62%" delta="Of consignments" tone="ok" />
            <Stat label="Offset-ready reports" value="Monthly" delta="Audit-ready evidence" />
          </div>
          <Card style={{ marginTop: 16 }}>
            <div className="stack" style={{ gap: 10 }}>
              <p>Emissions per shipment are down 9% year to date as EU road legs consolidate into milk runs.</p>
              <p>Reusable shipper adoption rose to 62% of consignments, removing single-use packaging from most Central Lab lanes.</p>
              <p>Monthly offset-ready reports are generated per service line and can be exported for your Scope 3 disclosures.</p>
            </div>
          </Card>
        </>
      )}

      {page === 'benchmark' && (
        <>
          <div className="grid cols-4">
            <Stat label="Network rank" value="Top 12%" delta="Of 120 shippers" tone="ok" />
            <Stat label="OTIF percentile" value="88th" delta="+6 places" tone="ok" />
            <Stat label="Temperature compliance" value="Top quartile" delta="+0.1 pp above quartile" tone="ok" />
            <Stat label="Cost per shipment" value="+16 pts" delta="Above top quartile" tone="warn" />
          </div>
          <Card style={{ marginTop: 16 }}>
            <div className="strong">You versus the peer median</div>
            <div className="small muted" style={{ marginBottom: 14 }}>Peer benchmarking across the Cencora World Courier network</div>
            <Compare rows={[['OTIF', 97.4, 95.1], ['Temperature compliance', 99.2, 97.8], ['Invoice accuracy', 99.1, 96.0]]} />
          </Card>
        </>
      )}

      <Section title="Ask about this report">
        <div className="row wrap" style={{ gap: 8 }}>
          {ANALYTICS_QUESTIONS.map((q) => (
            <button key={q.q} className="chip" onClick={() => { if (isPage(q.page)) setPage(q.page); openCora(q.q) }}>
              <Sparkles size={13} />{q.q}
            </button>
          ))}
        </div>
        <p className="tiny faint" style={{ marginTop: 18 }}>Illustrative data for the future-state vision. Reports are embedded with row-level security scoped to your account.</p>
      </Section>
    </Page>
  )
}
