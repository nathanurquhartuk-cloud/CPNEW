import { Building2, Check, Key, MapPin, UserPlus } from 'lucide-react'
import { FormEvent, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Button, Card, Expand, KV, Page, PageHead, Pill, Section, Segmented, cx } from '../components/ui'
import { LOCALE_ACK, useSettings } from '../lib/settings'
import { LOCALES, Locale, USER } from '../lib/user'

type Tab = 'profile' | 'contacts' | 'team' | 'notifications' | 'security' | 'settings'
const TABS: { id: Tab; label: string }[] = [
  { id: 'profile', label: 'Profile' },
  { id: 'contacts', label: 'Contacts' },
  { id: 'team', label: 'Team' },
  { id: 'notifications', label: 'Notifications' },
  { id: 'security', label: 'Security' },
  { id: 'settings', label: 'Settings' },
]
const toTab = (v: string | null): Tab => (v === 'addresses' ? 'contacts' : (TABS.some((t) => t.id === v) ? (v as Tab) : 'profile'))

export default function Account() {
  const [params, setParams] = useSearchParams()
  const tab = toTab(params.get('tab'))
  return (
    <Page>
      <PageHead title="Account" sub="Your profile, team, notifications, security and settings." />
      <div style={{ marginBottom: 22, overflowX: 'auto' }}>
        <Segmented value={tab} onChange={(t) => setParams({ tab: t })} options={TABS} />
      </div>
      {tab === 'profile' && <Profile />}
      {tab === 'contacts' && <Contacts />}
      {tab === 'team' && <Team />}
      {tab === 'notifications' && <Notifications />}
      {tab === 'security' && <Security />}
      {tab === 'settings' && <Settings />}
    </Page>
  )
}

function Profile() {
  return (
    <Card>
      <div className="row" style={{ gap: 16, marginBottom: 20 }}>
        <span className="avatar" style={{ width: 56, height: 56, fontSize: 18 }}>{USER.initials}</span>
        <div>
          <div className="strong" style={{ fontSize: 18 }}>{USER.name}</div>
          <div className="muted">{USER.title} · {USER.company}</div>
        </div>
      </div>
      <KV rows={[['Email', USER.email], ['Department', USER.department], ['Role', USER.role], ['Legal entity', USER.legalEntity], ['Customer number', USER.customerNo]]} />
    </Card>
  )
}

function Contacts() {
  const primary = [
    { name: 'Priya N.', role: 'Customer service lead', detail: 'Orders, bookings, study and site supply' },
    { name: 'James T.', role: 'Account director', detail: 'Agreements, rates, new service lines and bundles' },
  ]
  const addresses = [
    { name: 'Macclesfield site', detail: 'AstraZeneca, Charter Way, Macclesfield SK10 2NA, United Kingdom', kind: 'Collection' },
    { name: 'Charité Berlin', detail: 'Charité – Universitätsmedizin Berlin, Charitéplatz 1, 10117 Berlin, Germany', kind: 'Delivery' },
    { name: 'WC Frankfurt depot', detail: 'World Courier, Cargo City Süd, 60549 Frankfurt am Main, Germany', kind: 'Depot' },
    { name: 'WC Singapore depot', detail: 'World Courier, Airport Logistics Park, Singapore 819829', kind: 'Depot' },
  ]
  return (
    <div className="grid cols-2">
      <div>
        <div className="eyebrow" style={{ marginBottom: 10 }}>Primary contacts</div>
        <div className="card" style={{ overflow: 'hidden' }}>
          {primary.map((c) => (
            <div key={c.name} className="list-row">
              <span className="avatar">{c.name.split(' ').map((p) => p[0]).join('').replace('.', '')}</span>
              <div className="grow">
                <div className="title">{c.name} <span className="muted" style={{ fontWeight: 400 }}>· {c.role}</span></div>
                <div className="meta">{c.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="eyebrow" style={{ marginBottom: 10 }}>Address book</div>
        <div className="card" style={{ overflow: 'hidden' }}>
          {addresses.map((a) => (
            <div key={a.name} className="list-row">
              <span className="icon-wrap">{a.kind === 'Depot' ? <Building2 size={18} /> : <MapPin size={18} />}</span>
              <div className="grow">
                <div className="title">{a.name}</div>
                <div className="meta">{a.detail}</div>
              </div>
              <Pill>{a.kind}</Pill>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Team() {
  const [members, setMembers] = useState([
    { name: 'Sam Whitfield', role: 'Account Admin', email: USER.email },
    { name: 'Alex Morgan', role: 'Study manager', email: 'alex.morgan@astrazeneca.com' },
    { name: 'Rachel Osei', role: 'Finance approver', email: 'rachel.osei@astrazeneca.com' },
    { name: 'Tom Keller', role: 'Site coordinator', email: 'tom.keller@astrazeneca.com' },
  ])
  const [inviting, setInviting] = useState(false)
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('Viewer')
  const [sent, setSent] = useState<string | null>(null)

  const invite = (e: FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    const name = email.split('@')[0].split('.').map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join(' ')
    setMembers((m) => [...m, { name, role, email: email.trim() }])
    setSent(email.trim()); setEmail(''); setInviting(false)
  }

  return (
    <>
      <div className="card" style={{ overflow: 'hidden' }}>
        {members.map((m) => (
          <div key={m.email} className="list-row">
            <span className="avatar">{m.name.split(' ').map((p) => p[0]).join('').slice(0, 2)}</span>
            <div className="grow">
              <div className="title">{m.name}</div>
              <div className="meta">{m.email}</div>
            </div>
            <Pill tone={m.role === 'Account Admin' ? 'brand' : undefined}>{m.role}</Pill>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 14 }}>
        {!inviting && <Button variant="secondary" onClick={() => setInviting(true)} icon={<UserPlus size={16} />}>Invite colleague</Button>}
        {inviting && (
          <form onSubmit={invite} className="card pad" style={{ display: 'grid', gridTemplateColumns: '1fr 180px auto', gap: 12, alignItems: 'end' }}>
            <div className="field"><label htmlFor="invite-email">Work email</label><input id="invite-email" className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@astrazeneca.com" required /></div>
            <div className="field"><label htmlFor="invite-role">Role</label><select id="invite-role" className="select" value={role} onChange={(e) => setRole(e.target.value)}><option>Viewer</option><option>Booker</option><option>Finance approver</option><option>Study manager</option><option>Account Admin</option></select></div>
            <div className="row" style={{ gap: 8 }}><Button type="submit">Send invite</Button><Button variant="ghost" onClick={() => setInviting(false)}>Cancel</Button></div>
          </form>
        )}
        {sent && <div className="tip" style={{ marginTop: 12, fontStyle: 'normal' }}><Check size={16} />Invitation sent to {sent}. They will appear as pending until they accept.</div>}
      </div>
    </>
  )
}

function Toggle({ label, detail, checked, onChange }: { label: string; detail: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="list-row" style={{ cursor: 'pointer' }}>
      <div className="grow">
        <div className="title">{label}</div>
        <div className="meta">{detail}</div>
      </div>
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} style={{ width: 18, height: 18, accentColor: 'var(--purple)' }} />
    </label>
  )
}

function Notifications() {
  const { digest, setDigest } = useSettings()
  const [prefs, setPrefs] = useState({ shipments: true, temperature: true, invoices: true, studies: true })
  const set = (k: keyof typeof prefs) => (v: boolean) => setPrefs((p) => ({ ...p, [k]: v }))
  return (
    <div className="card" style={{ overflow: 'hidden' }}>
      <Toggle label="Shipment alerts" detail="Re-routes, delays and interventions on live shipments" checked={prefs.shipments} onChange={set('shipments')} />
      <Toggle label="Temperature excursions" detail="Immediate alert when a logger leaves its range" checked={prefs.temperature} onChange={set('temperature')} />
      <Toggle label="Invoices" detail="New invoices, due dates and dispute updates" checked={prefs.invoices} onChange={set('invoices')} />
      <Toggle label="Study milestones" detail="Site deliveries, missed collections and resupply" checked={prefs.studies} onChange={set('studies')} />
      <div className="list-row">
        <div className="grow">
          <div className="title">Weekly digest</div>
          <div className="meta">A summary of activity, KPIs and open items by email</div>
        </div>
        <select className="select" style={{ width: 140 }} value={digest} onChange={(e) => setDigest(e.target.value as 'daily' | 'weekly' | 'off')} aria-label="Digest frequency">
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="off">Off</option>
        </select>
      </div>
    </div>
  )
}

function Security() {
  const [sessions, setSessions] = useState([
    { id: 'web', name: 'This browser', detail: 'London · Chrome on macOS · active now' },
    { id: 'ios', name: 'iPhone', detail: 'Cambridge · Customer Workspace app · 2 hours ago' },
  ])
  return (
    <>
      <Card>
        <KV rows={[['Last sign-in', 'Today'], ['Single sign-on', 'AstraZeneca Entra ID'], ['Multi-factor authentication', 'On']]} />
      </Card>
      <Section title="Sessions">
        <div className="card" style={{ overflow: 'hidden' }}>
          {sessions.length === 0 && <div className="list-row muted">No other sessions.</div>}
          {sessions.map((s) => (
            <div key={s.id} className="list-row">
              <div className="grow">
                <div className="title">{s.name}</div>
                <div className="meta">{s.detail}</div>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setSessions((x) => x.filter((y) => y.id !== s.id))}>Sign out</Button>
            </div>
          ))}
        </div>
      </Section>
      <Card style={{ marginTop: 16, paddingTop: 4, paddingBottom: 4 }}>
        <Expand title="API keys">
          <div className="list-row" style={{ padding: '10px 0' }}>
            <span className="icon-wrap"><Key size={18} /></span>
            <div className="grow">
              <div className="title mono">wc_live_7f3a…</div>
              <div className="meta">orders:write · tracking:read · webhooks · created 12 Sep 2026</div>
            </div>
            <Pill tone="ok" dot>Active</Pill>
          </div>
        </Expand>
      </Card>
    </>
  )
}

function Settings() {
  const { locale, setLocale } = useSettings()
  const [tz, setTz] = useState('Europe/London')
  const [currency, setCurrency] = useState('USD')
  return (
    <>
      <div className="eyebrow" style={{ marginBottom: 10 }}>Language</div>
      <div className="grid cols-3">
        {LOCALES.map((l) => (
          <button key={l.id} type="button" className={cx('choice', locale === l.id && 'on')} onClick={() => setLocale(l.id as Locale)} aria-pressed={locale === l.id} style={{ textAlign: 'left', font: 'inherit' }}>
            <div>
              <div className="t">{l.native}</div>
              <div className="d">{l.label}</div>
            </div>
            {locale === l.id && <Check size={18} className="purple" style={{ marginLeft: 'auto' }} />}
          </button>
        ))}
      </div>
      <div className="card pad tint" style={{ marginTop: 14 }}>{LOCALE_ACK[locale]}</div>
      <p className="muted small" style={{ marginTop: 10 }}>Interface translation for French, German, Spanish, Portuguese, Italian and Chinese is on the roadmap; date and number formats already follow your choice. You can also ask Cora: 'switch to German'.</p>

      <Section title="Display">
        <Card>
          <div className="grid cols-2">
            <div className="field">
              <label htmlFor="tz">Time zone</label>
              <select id="tz" className="select" value={tz} onChange={(e) => setTz(e.target.value)}>
                <option value="Europe/London">Europe/London</option>
                <option value="Europe/Berlin">Europe/Berlin</option>
                <option value="Europe/Madrid">Europe/Madrid</option>
                <option value="Europe/Lisbon">Europe/Lisbon</option>
                <option value="Europe/Rome">Europe/Rome</option>
                <option value="Asia/Shanghai">Asia/Shanghai</option>
                <option value="America/New_York">America/New_York</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="currency">Currency display</label>
              <select id="currency" className="select" value={currency} onChange={(e) => setCurrency(e.target.value)}>
                <option value="USD">USD · US dollar</option>
                <option value="EUR">EUR · Euro</option>
                <option value="GBP">GBP · Pound sterling</option>
                <option value="CNY">CNY · Renminbi</option>
              </select>
            </div>
          </div>
        </Card>
      </Section>
    </>
  )
}
