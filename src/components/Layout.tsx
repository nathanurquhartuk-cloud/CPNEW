import { BarChart3, BatteryFull, Boxes, FlaskConical, Home, LayoutGrid, LifeBuoy, MoreHorizontal, Receipt, Signal, Truck, Wifi } from 'lucide-react'
import { useEffect, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { isEmbedded } from '../lib/auth'
import { useNotifications } from '../lib/notifications'
import Cora from './Cora'
import Header from './Header'
import PhoneFrame from './PhoneFrame'
import { ActionsPanel } from './ActionsPanel'

export const NAV = [
  { to: '/', label: 'Overview', icon: Home, end: true },
  { to: '/shipments', label: 'Shipments', icon: Truck },
  { to: '/studies', label: 'Studies', icon: FlaskConical },
  { to: '/inventory', label: 'Inventory', icon: Boxes },
  { to: '/financials', label: 'Financials', icon: Receipt },
  { to: '/insights', label: 'Insights', icon: BarChart3 },
  { to: '/solutions', label: 'Solutions', icon: LayoutGrid },
]

export default function Layout() {
  const [phone, setPhone] = useState(false)
  const [actions, setActions] = useState(false)
  const loc = useLocation()
  const open = useNotifications((s) => s.items.filter((n) => n.needsAction).length)
  const embedded = isEmbedded()

  useEffect(() => { window.scrollTo({ top: 0 }) }, [loc.pathname])
  useEffect(() => { if (embedded) document.body.classList.add('embedded') }, [embedded])
  useEffect(() => {
    const on = () => setActions(true)
    window.addEventListener('actions:open', on)
    return () => window.removeEventListener('actions:open', on)
  }, [])

  return (
    <div className="shell">
      {embedded && (
        <div className="statusbar" aria-hidden="true">
          <span>{new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}</span>
          <span className="icons"><Signal size={15} /><Wifi size={15} /><BatteryFull size={18} /></span>
        </div>
      )}
      <Header onPhone={() => setPhone(true)} embedded={embedded} />
      <aside className="sidebar" aria-label="Main navigation">
        {NAV.map((n) => (
          <NavLink key={n.to} to={n.to} end={n.end} className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}>
            <n.icon size={19} strokeWidth={1.9} />
            <span>{n.label}</span>
            {n.to === '/' && open > 0 && <span className="badge">{open}</span>}
          </NavLink>
        ))}
        <div className="spacer" />
        <NavLink to="/support" className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}>
          <LifeBuoy size={19} strokeWidth={1.9} />
          <span>Support</span>
        </NavLink>
        <div className="foot">Cencora World Courier<br />Customer Workspace · future-state vision</div>
      </aside>
      <main className="main">
        <Outlet />
      </main>
      <nav className="tabbar" aria-label="Mobile navigation">
        {[NAV[0], NAV[1], NAV[2], NAV[4]].map((n) => (
          <NavLink key={n.to} to={n.to} end={n.end} className={({ isActive }) => (isActive ? 'active' : '')}>
            <n.icon size={20} strokeWidth={1.9} /><span>{n.label}</span>
          </NavLink>
        ))}
        <NavLink to="/more" className={({ isActive }) => (isActive ? 'active' : '')}><MoreHorizontal size={20} strokeWidth={1.9} /><span>More</span></NavLink>
      </nav>
      <Cora />
      {actions && <ActionsPanel onClose={() => setActions(false)} />}
      {phone && !embedded && <PhoneFrame onClose={() => setPhone(false)} path={loc.pathname + loc.search} />}
    </div>
  )
}
