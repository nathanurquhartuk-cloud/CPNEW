import { Bell, BookOpen, Check, ChevronDown, Contact, HelpCircle, LogOut, MapPin, Search, Settings, Shield, Smartphone, Trash2, Users, X } from 'lucide-react'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../lib/auth'
import { openCora, routeAlias, useNotifications } from '../lib/notifications'
import { USER } from '../lib/user'
import { cx } from './ui'

const BASE = import.meta.env.BASE_URL

function routeFor(q: string): string | null {
  const s = q.trim()
  if (!s) return null
  if (/^\d{8,9}[A-Z]{0,2}$/i.test(s)) return `/shipments?job=${s.toUpperCase()}`
  if (/^INV-|^CN-/i.test(s)) return `/financials?invoice=${s.toUpperCase()}`
  if (/^(ORD|QUO)-/i.test(s)) return `/shipments?ref=${s.toUpperCase()}`
  if (/^AZ-/i.test(s)) return `/studies?study=${s.toUpperCase()}`
  if (/^site\s?\d+/i.test(s)) return `/inventory?site=${encodeURIComponent(s)}`
  if (/^capa/i.test(s)) return `/documents?capa=${s.toUpperCase()}`
  if (/capa|investigation|deviation/i.test(s)) return '/documents?kind=capa'
  if (/document|library|proof of delivery|temperature of record/i.test(s)) return '/documents'
  if (/invoice|statement|financ/i.test(s)) return '/financials'
  if (/shipment|order|track|job|quote/i.test(s)) return '/shipments'
  if (/stud|site|protocol/i.test(s)) return '/studies'
  if (/inventor|stock|depot|lot/i.test(s)) return '/inventory'
  if (/agreement|rate|solution|service/i.test(s)) return '/solutions'
  if (/kpi|insight|analytic|report/i.test(s)) return '/insights'
  if (/support|case|help|specialist/i.test(s)) return '/support'
  return null
}

export default function Header({ onPhone, embedded }: { onPhone: () => void; embedded: boolean }) {
  const nav = useNavigate()
  const [q, setQ] = useState('')
  const [bell, setBell] = useState(false)
  const [menu, setMenu] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const { items, dismissed, dismiss, markRead, markAllRead, clearAll, restore } = useNotifications()
  const logout = useAuth((s) => s.logout)
  const unread = items.filter((n) => n.unread).length

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.key === '/' && !(e.target instanceof HTMLInputElement) && !(e.target instanceof HTMLTextAreaElement)) || ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k')) { e.preventDefault(); inputRef.current?.focus() }
    }
    const onOpen = () => setBell(true)
    const onClick = (e: MouseEvent) => { if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) { setBell(false); setMenu(false) } }
    window.addEventListener('keydown', onKey)
    window.addEventListener('notifications:open', onOpen)
    document.addEventListener('mousedown', onClick)
    return () => { window.removeEventListener('keydown', onKey); window.removeEventListener('notifications:open', onOpen); document.removeEventListener('mousedown', onClick) }
  }, [])

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const r = routeFor(q)
    if (r) nav(r); else openCora(q)
    setQ('')
  }

  return (
    <header className="header">
      <div className="brand">
        <img src={`${BASE}brand/cencora.png`} alt="Cencora" />
        <span className="ws">Customer Workspace</span>
      </div>
      <form className="search" onSubmit={submit} role="search">
        <Search size={17} />
        <input ref={inputRef} value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search shipments, studies, inventory and more…" aria-label="Search" />
        <kbd>/</kbd>
      </form>
      <div className="actions" ref={wrapRef}>
        {!embedded && (
          <button className="mobile-toggle" onClick={onPhone} title="Preview the workspace on a phone"><Smartphone size={16} />Mobile view</button>
        )}
        <div style={{ position: 'relative' }}>
          <button className="icon-btn" aria-label="Notifications" aria-expanded={bell} onClick={() => { setBell(!bell); setMenu(false) }}>
            <Bell size={19} />{unread > 0 && <span className="dot" />}
          </button>
          {bell && (
            <div className="popover">
              <div className="p-head">
                <span>Notifications{unread > 0 && <span className="muted" style={{ fontWeight: 400 }}> · {unread} unread</span>}</span>
                <span className="row" style={{ gap: 4 }}>
                  {items.length > 0 && <button className="icon-btn" style={{ width: 32, height: 32 }} title="Mark all read" onClick={markAllRead}><Check size={15} /></button>}
                  {items.length > 0 && <button className="icon-btn" style={{ width: 32, height: 32 }} title="Clear all" onClick={clearAll}><Trash2 size={15} /></button>}
                </span>
              </div>
              <div className="p-body">
                {items.length === 0 && (
                  <div style={{ padding: 24, textAlign: 'center' }} className="muted">
                    You are all caught up.{dismissed.length > 0 && <div style={{ marginTop: 8 }}><button className="link" onClick={restore}>Restore cleared notifications</button></div>}
                  </div>
                )}
                {items.map((n) => (
                  <div key={n.id} className={cx('notif', n.unread && 'unread')} onClick={() => { markRead(n.id); setBell(false); nav(routeAlias(n.to)) }}>
                    <span className={cx('icon-wrap', n.tone === 'danger' ? 'bad' : n.tone === 'warning' ? 'warn' : n.tone === 'success' ? 'ok' : 'info')} style={{ width: 32, height: 32, borderRadius: 10 }}><span className="dot" style={{ width: 8, height: 8, borderRadius: 99, background: 'currentColor', display: 'block' }} /></span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div className="t">{n.title}</div>
                      <div className="m">{n.message}</div>
                      <div className="tiny faint" style={{ marginTop: 4 }}>{n.time} · <span className="purple">{n.cta}</span></div>
                    </div>
                    <button className="x" aria-label="Dismiss" onClick={(e) => { e.stopPropagation(); dismiss(n.id) }}><X size={14} /></button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div style={{ position: 'relative' }}>
          <button className="avatar-btn" aria-label="Account menu" aria-expanded={menu} onClick={() => { setMenu(!menu); setBell(false) }}>
            <span className="avatar">{USER.initials}</span>
            <ChevronDown size={16} className="hide-m" />
          </button>
          {menu && (
            <div className="popover" style={{ width: 300 }}>
              <div className="p-head" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 2 }}>
                <span>{USER.name}</span>
                <span className="small muted" style={{ fontWeight: 400 }}>{USER.company} · {USER.role}</span>
              </div>
              <div style={{ padding: '6px 0' }}>
                {[
                  ['profile', 'My profile', Contact],
                  ['contacts', 'Contacts and address book', MapPin],
                  ['team', 'Team members and roles', Users],
                  ['security', 'Security and sessions', Shield],
                  ['settings', 'Settings and language', Settings],
                ].map(([id, label, Icon]) => {
                  const I = Icon as typeof Contact
                  return (<button key={id as string} className="menu-item" onClick={() => { setMenu(false); nav(`/account?tab=${id}`) }}><I size={17} />{label as string}</button>)
                })}
                <button className="menu-item" onClick={() => { setMenu(false); nav('/support') }}><HelpCircle size={17} />Help and support</button>
                <button className="menu-item" onClick={() => { setMenu(false); openCora('Show me around the workspace') }}><BookOpen size={17} />Take the tour with Cora</button>
                <div style={{ borderTop: '1px solid var(--line)', margin: '6px 0' }} />
                <button className="menu-item" onClick={() => { setMenu(false); logout(); nav('/login') }}><LogOut size={17} />Sign out</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
