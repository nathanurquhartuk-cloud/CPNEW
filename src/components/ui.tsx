import { ChevronDown, ChevronRight, X } from 'lucide-react'
import { ReactNode, useEffect } from 'react'
import { Link } from 'react-router-dom'

export const cx = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(' ')

export function Page({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cx('page', className)}>{children}</div>
}

export function PageHead({ title, sub, tools, eyebrow }: { title: ReactNode; sub?: ReactNode; tools?: ReactNode; eyebrow?: ReactNode }) {
  return (
    <div className="page-head">
      <div>
        {eyebrow && <div className="eyebrow" style={{ marginBottom: 8 }}>{eyebrow}</div>}
        <h1>{title}</h1>
        {sub && <div className="sub">{sub}</div>}
      </div>
      {tools && <div className="tools">{tools}</div>}
    </div>
  )
}

export function Section({ title, action, children, style }: { title?: ReactNode; action?: ReactNode; children: ReactNode; style?: React.CSSProperties }) {
  return (
    <section className="section" style={style}>
      {(title || action) && (
        <div className="section-head">
          {title && <h2>{title}</h2>}
          {action}
        </div>
      )}
      {children}
    </section>
  )
}

export function Card({ children, className, pad = true, onClick, style }: { children: ReactNode; className?: string; pad?: boolean; onClick?: () => void; style?: React.CSSProperties }) {
  return (
    <div className={cx('card', pad && 'pad', onClick && 'hover', className)} onClick={onClick} style={style} role={onClick ? 'button' : undefined} tabIndex={onClick ? 0 : undefined} onKeyDown={onClick ? (e) => { if (e.key === 'Enter') onClick() } : undefined}>
      {children}
    </div>
  )
}

export function Stat({ label, value, delta, tone }: { label: string; value: ReactNode; delta?: ReactNode; tone?: 'ok' | 'warn' | 'bad' }) {
  return (
    <div className="card stat">
      <div className="label">{label}</div>
      <div className="value">{value}</div>
      {delta && <div className={cx('delta', tone === 'ok' && 'green', tone === 'warn' && 'amber', tone === 'bad' && 'red')}>{delta}</div>}
    </div>
  )
}

export function Pill({ children, tone, dot }: { children: ReactNode; tone?: 'ok' | 'warn' | 'bad' | 'info' | 'brand'; dot?: boolean }) {
  return <span className={cx('pill', tone)}>{dot && <span className="dot" />}{children}</span>
}

export const statusTone = (s: string): 'ok' | 'warn' | 'bad' | 'info' | 'brand' | undefined => {
  const t = s.toLowerCase()
  if (/deliver|paid|resolved|on time|active|within|healthy|done|credit/.test(t)) return 'ok'
  if (/overdue|excursion|dispute|critical|alert|breach|at risk|low/.test(t)) return 'bad'
  if (/pending|hold|watch|review|due|awaiting|quote/.test(t)) return 'warn'
  if (/transit|booked|outstanding|open|in progress|scheduled/.test(t)) return 'info'
  return undefined
}

export function Button({ children, variant = 'primary', size, onClick, to, href, type = 'button', disabled, block, icon, title }: { children: ReactNode; variant?: 'primary' | 'secondary' | 'ghost' | 'soft'; size?: 'sm' | 'xs'; onClick?: () => void; to?: string; href?: string; type?: 'button' | 'submit'; disabled?: boolean; block?: boolean; icon?: ReactNode; title?: string }) {
  const cls = cx('btn', variant, size, block && 'block')
  if (to) return <Link to={to} className={cls} title={title}>{icon}{children}</Link>
  if (href) return <a href={href} className={cls} title={title}>{icon}{children}</a>
  return <button type={type} className={cls} onClick={onClick} disabled={disabled} title={title}>{icon}{children}</button>
}

export function Segmented<T extends string>({ value, onChange, options }: { value: T; onChange: (v: T) => void; options: { id: T; label: string; count?: number }[] }) {
  return (
    <div className="seg" role="tablist">
      {options.map((o) => (
        <button key={o.id} role="tab" aria-selected={value === o.id} className={cx(value === o.id && 'active')} onClick={() => onChange(o.id)}>
          {o.label}{o.count !== undefined && <span className="faint" style={{ marginLeft: 6 }}>{o.count}</span>}
        </button>
      ))}
    </div>
  )
}

export function Expand({ title, children, open, right }: { title: ReactNode; children: ReactNode; open?: boolean; right?: ReactNode }) {
  return (
    <details className="expand" open={open}>
      <summary>
        <span>{title}</span>
        <span className="row" style={{ gap: 10 }}>{right}<ChevronDown size={18} className="chev" /></span>
      </summary>
      <div className="body">{children}</div>
    </details>
  )
}

export function KV({ rows }: { rows: [ReactNode, ReactNode][] }) {
  return (
    <dl className="kv">
      {rows.map(([k, v], i) => (<div key={i} style={{ display: 'contents' }}><dt>{k}</dt><dd>{v}</dd></div>))}
    </dl>
  )
}

export function Drawer({ title, sub, onClose, children, footer, badge }: { title: ReactNode; sub?: ReactNode; onClose: () => void; children: ReactNode; footer?: ReactNode; badge?: ReactNode }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [onClose])
  return (
    <>
      <div className="scrim" onClick={onClose} />
      <aside className="drawer" role="dialog" aria-modal="true" aria-label={typeof title === 'string' ? title : 'Details'}>
        <div className="d-head">
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="row" style={{ gap: 10 }}><h2>{title}</h2>{badge}</div>
            {sub && <div className="muted" style={{ marginTop: 4 }}>{sub}</div>}
          </div>
          <button className="icon-btn" onClick={onClose} aria-label="Close"><X size={18} /></button>
        </div>
        <div className="d-body">{children}</div>
        {footer && <div className="d-foot">{footer}</div>}
      </aside>
    </>
  )
}

export function QuickAction({ icon, label, to, onClick }: { icon: ReactNode; label: string; to?: string; onClick?: () => void }) {
  const inner = (<><span className="icon-wrap">{icon}</span><span className="label">{label}</span><ChevronRight size={18} className="chev" /></>)
  if (to) return <Link to={to} className="card hover quick">{inner}</Link>
  return <button className="card hover quick" onClick={onClick} style={{ width: '100%', textAlign: 'left', font: 'inherit' }}>{inner}</button>
}

export function Empty({ title, text, action }: { title: string; text?: string; action?: ReactNode }) {
  return (
    <div className="card pad" style={{ textAlign: 'center', padding: '40px 20px' }}>
      <div className="strong" style={{ fontSize: 16 }}>{title}</div>
      {text && <div className="muted" style={{ marginTop: 6 }}>{text}</div>}
      {action && <div style={{ marginTop: 16 }}>{action}</div>}
    </div>
  )
}

export function Progress({ value, tone }: { value: number; tone?: 'ok' | 'warn' | 'bad' }) {
  return <div className={cx('progress', tone)}><span style={{ width: `${Math.min(100, Math.max(0, value))}%` }} /></div>
}
