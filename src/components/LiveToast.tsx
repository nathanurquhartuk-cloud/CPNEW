import { Radio, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLive } from '../lib/live'
import { openCora } from '../lib/notifications'

export default function LiveToast() {
  const firedAt = useLive((s) => s.firedAt)
  const [show, setShow] = useState(false)
  const nav = useNavigate()
  useEffect(() => { if (!firedAt) return; setShow(true); const id = setTimeout(() => setShow(false), 15000); return () => clearTimeout(id) }, [firedAt])
  if (!show) return null
  return (
    <div className="toast" role="status" aria-live="polite">
      <span className="icon-wrap ok" style={{ width: 36, height: 36, borderRadius: 10 }}><Radio size={17} /></span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="t">Proactive shipment intelligence</div>
        <div className="m">Job 261408871CL re-routed via Berlin ahead of a storm cell over Frankfurt. Delivery window protected; no action needed.</div>
        <div className="acts">
          <button className="btn primary xs" onClick={() => { setShow(false); nav('/?intervention=1') }}>See the intervention</button>
          <button className="btn ghost xs" onClick={() => { setShow(false); openCora('Explain the re-route') }}>Ask Cora</button>
        </div>
      </div>
      <button className="icon-btn" style={{ width: 28, height: 28 }} aria-label="Dismiss" onClick={() => setShow(false)}><X size={14} /></button>
    </div>
  )
}
