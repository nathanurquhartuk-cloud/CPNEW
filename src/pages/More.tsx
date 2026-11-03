import { BarChart3, Boxes, ChevronRight, FolderOpen, LayoutGrid, LifeBuoy, LogOut, UserCircle } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { Page, PageHead } from '../components/ui'
import { useAuth } from '../lib/auth'

const ITEMS = [
  { to: '/inventory', label: 'Inventory', detail: 'Stock by site, lot and expiry', icon: Boxes },
  { to: '/insights', label: 'Insights', detail: 'KPIs, risk and benchmarking', icon: BarChart3 },
  { to: '/solutions', label: 'Solutions', detail: 'Your agreements, rates and more services', icon: LayoutGrid },
  { to: '/documents', label: 'Documents', detail: 'CAPA reports, agreements, records and invoices', icon: FolderOpen },
  { to: '/support', label: 'Support', detail: 'Cases and specialist contact', icon: LifeBuoy },
  { to: '/account', label: 'Account', detail: 'Profile, team, security and settings', icon: UserCircle },
]

export default function More() {
  const nav = useNavigate()
  const logout = useAuth((s) => s.logout)
  return (
    <Page>
      <PageHead title="More" />
      <div className="card" style={{ overflow: 'hidden' }}>
        {ITEMS.map((it) => (
          <Link key={it.to} to={it.to} className="list-row click" style={{ color: 'inherit' }}>
            <span className="icon-wrap"><it.icon size={18} /></span>
            <div className="grow">
              <div className="title">{it.label}</div>
              <div className="meta">{it.detail}</div>
            </div>
            <ChevronRight size={18} className="faint" />
          </Link>
        ))}
        <button className="list-row click" style={{ width: '100%', border: 'none', background: 'transparent', textAlign: 'left', font: 'inherit', color: 'inherit' }} onClick={() => { logout(); nav('/login') }}>
          <span className="icon-wrap"><LogOut size={18} /></span>
          <div className="grow">
            <div className="title">Sign out</div>
            <div className="meta">End this session on this device</div>
          </div>
          <ChevronRight size={18} className="faint" />
        </button>
      </div>
    </Page>
  )
}
