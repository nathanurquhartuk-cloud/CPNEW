import { ExternalLink, RotateCcw, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

// Renders the live, responsive workspace inside an iPhone-style frame.
export default function PhoneFrame({ onClose, path }: { onClose: () => void; path: string }) {
  const [scale, setScale] = useState(1)
  const [key, setKey] = useState(0)
  const ref = useRef<HTMLIFrameElement>(null)
  const src = `${window.location.origin}${window.location.pathname}?embedded=1#${path}`

  useEffect(() => {
    const fit = () => setScale(Math.min(1, (window.innerHeight - 120) / 884, (window.innerWidth - 40) / 430))
    fit()
    window.addEventListener('resize', fit)
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('resize', fit); window.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [onClose])

  return (
    <div className="phone-scrim" onClick={onClose}>
      <div className="phone-wrap" onClick={(e) => e.stopPropagation()}>
        <div className="phone-bar">
          <span style={{ opacity: .85 }}>iPhone 15 Pro · 393 × 852 · the same workspace, responsive</span>
          <button className="btn secondary sm" onClick={() => setKey((k) => k + 1)}><RotateCcw size={14} />Reload</button>
          <a className="btn secondary sm" href={src} target="_blank" rel="noreferrer"><ExternalLink size={14} />Open</a>
          <button className="btn primary sm" onClick={onClose}><X size={14} />Close</button>
        </div>
        <div style={{ width: 430 * scale, height: 884 * scale }}>
        <div className="phone" style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }}>
          <span className="btn-side vol1" /><span className="btn-side vol2" /><span className="btn-side vol3" /><span className="btn-side power" />
          <div className="screen">
            <div className="island" />
            <iframe key={key} ref={ref} src={src} title="Mobile preview of the Customer Workspace" />
            <div className="home" />
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}
