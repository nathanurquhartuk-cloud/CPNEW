import { ArrowRight, Check } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { routeAlias, useNotifications } from '../lib/notifications'
import { Button, Drawer, Empty, Pill, cx } from './ui'

export function ActionsPanel({ onClose }: { onClose: () => void }) {
  const nav = useNavigate()
  const { items, dismiss, markRead } = useNotifications()
  const actions = items.filter((n) => n.needsAction)
  const managed = items.filter((n) => !n.needsAction && (n.kind === 'reroute' || n.kind === 'excursion' || n.kind === 'risk'))
  return (
    <Drawer title="Today" sub="What needs you, and what we are handling for you" onClose={onClose}>
      <div className="eyebrow" style={{ margin: '14px 0 10px' }}>Needs your decision · {actions.length}</div>
      {actions.length === 0 && <Empty title="Nothing needs you right now" text="We will let you know the moment something does." />}
      <div className="stack">
        {actions.map((n) => (
          <div key={n.id} className="card pad" style={{ padding: '16px 18px' }}>
            <div className="row between" style={{ alignItems: 'flex-start' }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="strong">{n.title}</div>
                <div className="muted small" style={{ marginTop: 4 }}>{n.message}</div>
              </div>
              <Pill tone={n.tone === 'danger' ? 'bad' : n.tone === 'warning' ? 'warn' : 'info'}>{n.time}</Pill>
            </div>
            <div className="row" style={{ marginTop: 12, gap: 8 }}>
              <Button size="sm" onClick={() => { markRead(n.id); onClose(); nav(routeAlias(n.to)) }} icon={<ArrowRight size={15} />}>{n.action || n.cta}</Button>
              <Button size="sm" variant="ghost" onClick={() => dismiss(n.id)} icon={<Check size={15} />}>Done</Button>
            </div>
          </div>
        ))}
      </div>
      {managed.length > 0 && (
        <>
          <div className="eyebrow" style={{ margin: '26px 0 10px' }}>Being handled for you · {managed.length}</div>
          <div className="card" style={{ overflow: 'hidden' }}>
            {managed.map((n) => (
              <div key={n.id} className={cx('list-row', 'click')} onClick={() => { markRead(n.id); onClose(); nav(routeAlias(n.to)) }}>
                <span className={cx('icon-wrap', n.tone === 'danger' ? 'bad' : n.tone === 'success' ? 'ok' : 'warn')} style={{ width: 34, height: 34, borderRadius: 10 }}><span style={{ width: 8, height: 8, borderRadius: 99, background: 'currentColor' }} /></span>
                <div className="grow">
                  <div className="title ellipsis" style={{ fontSize: 14 }}>{n.title}</div>
                  <div className="meta ellipsis">{n.message}</div>
                </div>
                <ArrowRight size={16} className="faint" />
              </div>
            ))}
          </div>
        </>
      )}
    </Drawer>
  )
}
