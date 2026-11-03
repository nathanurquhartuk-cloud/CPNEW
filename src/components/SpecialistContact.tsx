import { MessageSquare, Phone, PhoneCall } from 'lucide-react'
import { useState } from 'react'
import { CONTROL_TOWER_BASE } from '../data/controlTower'
import { SPECIALISTS_BASE, TeamId } from '../data/specialists'
import { openCora } from '../lib/notifications'
import { Button } from './ui'

export interface SpecialistTeam { id: TeamId; title: string; specialist: string; chatPrompt: string; phone: string; phoneDisplay: string; phoneNote: string; callbackNote: string; about: string }

export const CONTROL_TOWER: SpecialistTeam = { id: 'controlTower', ...CONTROL_TOWER_BASE }
export const ACCOUNT_TEAM: SpecialistTeam = { id: 'account', title: 'Account and customer service team', specialist: 'Priya N. (customer service lead)', chatPrompt: 'Connect me to my account team', phone: '+441932000100', phoneDisplay: '+44 (0)1932 000 100', phoneNote: 'Mon–Fri 08:00–18:00 UK', callbackNote: 'Your account team calls your registered number within one business hour', about: 'your account' }
export const BILLING_TEAM: SpecialistTeam = { id: 'billing', title: 'Billing specialists', specialist: 'Marcus O. (billing specialist)', chatPrompt: 'Connect me to a billing specialist', phone: '+441932000200', phoneDisplay: '+44 (0)1932 000 200', phoneNote: 'Mon–Fri 09:00–17:00 UK', callbackNote: 'A billing specialist calls your registered number within one business hour', about: 'your invoices' }
export const TEAMS: Record<TeamId, SpecialistTeam> = { controlTower: CONTROL_TOWER, account: ACCOUNT_TEAM, billing: BILLING_TEAM }
export const SPECIALISTS = SPECIALISTS_BASE.map((s) => ({ ...s, teamInfo: TEAMS[s.team] }))

export function SpecialistOptions({ team = CONTROL_TOWER, compact, onDone }: { team?: SpecialistTeam; compact?: boolean; onDone?: () => void }) {
  const [callback, setCallback] = useState(false)
  if (callback) {
    return (
      <div className="card pad tint" style={{ padding: 16 }}>
        <div className="strong">Call back requested</div>
        <div className="muted small" style={{ marginTop: 4 }}>{team.callbackNote}. Reference CB-{new Date().getHours()}{new Date().getMinutes()}.</div>
        {onDone && <div style={{ marginTop: 10 }}><Button size="sm" variant="ghost" onClick={onDone}>Close</Button></div>}
      </div>
    )
  }
  return (
    <div className={compact ? 'row wrap' : 'grid cols-3'} style={{ gap: 10 }}>
      <Button variant="primary" size={compact ? 'sm' : undefined} onClick={() => { openCora(team.chatPrompt); onDone?.() }} icon={<MessageSquare size={16} />}>Chat now</Button>
      <Button variant="secondary" size={compact ? 'sm' : undefined} href={`tel:${team.phone}`} icon={<Phone size={16} />} title={`${team.phoneDisplay} · ${team.phoneNote}`}>Call {compact ? '' : team.phoneDisplay}</Button>
      <Button variant="secondary" size={compact ? 'sm' : undefined} onClick={() => setCallback(true)} icon={<PhoneCall size={16} />}>Request a call back</Button>
    </div>
  )
}
