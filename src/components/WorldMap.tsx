import { ReactNode, useMemo } from 'react'
import WORLD from '../data/worldMap.json'

// Pre-projected Mercator: scale 255, translate [800, 500]
export const proj = (lon: number, lat: number): [number, number] => [800 + 255 * (lon * Math.PI / 180), 500 - 255 * Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI) / 360))]

export interface Cluster { id: string; lon: number; lat: number; count: number; alert?: 'red' | 'amber'; label?: string }

export function WorldMap({ view = [0, 0, 1600, 1000], clusters = [], children, height, onCluster, selected }: { view?: [number, number, number, number]; clusters?: Cluster[]; children?: ReactNode; height?: number; onCluster?: (c: Cluster) => void; selected?: string }) {
  const paths = useMemo(() => (WORLD as { n: string; d: string }[]), [])
  const [x, y, w, h] = view
  const r = (n: number) => Math.max(16, Math.min(30, 12 + Math.sqrt(n) * 1.1))
  return (
    <svg viewBox={`${x} ${y} ${w} ${h}`} style={{ width: '100%', height: height ?? 'auto', display: 'block' }} role="img" aria-label="World map of active shipments">
      <rect x={x} y={y} width={w} height={h} fill="#EAF1F8" />
      <g fill="#FFFFFF" stroke="#CFD8E3" strokeWidth={0.6}>
        {paths.map((p) => <path key={p.n} d={p.d} />)}
      </g>
      {children}
      {clusters.map((c) => {
        const [cx, cy] = proj(c.lon, c.lat)
        const rr = r(c.count)
        return (
          <g key={c.id} className="cluster" transform={`translate(${cx},${cy})`} onClick={() => onCluster?.(c)}>
            <circle r={rr + 4} fill={selected === c.id ? '#461E96' : '#2E2B42'} opacity={0.18} />
            <circle r={rr} fill={selected === c.id ? '#461E96' : '#2E2B42'} />
            <text y={1} style={{ fontSize: rr > 22 ? 14 : 12 }}>{c.count}</text>
            {c.alert && <circle cx={rr * 0.75} cy={-rr * 0.75} r={6} fill={c.alert === 'red' ? '#C0392B' : '#B9770E'} stroke="#fff" strokeWidth={1.5} />}
          </g>
        )
      })}
    </svg>
  )
}

export const CLUSTERS: Cluster[] = [
  { id: 'eu', lon: 8, lat: 50, count: 536, alert: 'red', label: 'Europe' },
  { id: 'nae', lon: -77, lat: 40, count: 259, alert: 'amber', label: 'North America East' },
  { id: 'naw', lon: -119, lat: 38, count: 35, label: 'North America West' },
  { id: 'cam', lon: -86, lat: 12, count: 7, label: 'Central America' },
  { id: 'sa', lon: -49, lat: -22, count: 106, alert: 'red', label: 'South America' },
  { id: 'me', lon: 65, lat: 24, count: 34, label: 'Middle East and India' },
  { id: 'ea', lon: 118, lat: 33, count: 17, label: 'East Asia' },
  { id: 'af', lon: 36, lat: -14, count: 3, label: 'Africa' },
  { id: 'oc', lon: 118, lat: -6, count: 8, label: 'South-east Asia' },
]
