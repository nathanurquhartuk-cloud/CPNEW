import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui'
import { useAuth } from '../lib/auth'

const BASE = (import.meta as unknown as { env: { BASE_URL: string } }).env.BASE_URL

export default function Login() {
  const nav = useNavigate()
  const [email, setEmail] = useState('sam.whitfield@astrazeneca.com')
  const [password, setPassword] = useState('')

  const signIn = (e?: FormEvent) => {
    e?.preventDefault()
    useAuth.getState().login(email || 'sam.whitfield@astrazeneca.com', password || 'sso')
    nav('/')
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24, background: 'var(--bg)' }}>
      <div className="card" style={{ width: '100%', maxWidth: 420, padding: '36px 32px' }}>
        <div className="row" style={{ gap: 12, marginBottom: 28 }}>
          <img src={`${BASE}brand/cencora.png`} alt="Cencora" style={{ height: 24 }} />
          <span className="strong" style={{ fontSize: 15 }}>Customer Workspace</span>
        </div>
        <h1 style={{ fontSize: 24, marginBottom: 6 }}>Welcome back</h1>
        <p className="muted" style={{ marginBottom: 24 }}>Sign in to your AstraZeneca workspace.</p>
        <form onSubmit={signIn} className="stack" style={{ gap: 14 }}>
          <div className="field">
            <label htmlFor="email">Work email</label>
            <input id="email" className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="username" required />
          </div>
          <div className="field">
            <label htmlFor="password">Password</label>
            <input id="password" className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" placeholder="Any password works in this preview" />
          </div>
          <Button type="submit" block>Sign in</Button>
        </form>
        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <button className="link" type="button" onClick={() => signIn()}>Sign in with AstraZeneca SSO</button>
        </div>
      </div>
      <p className="small faint" style={{ marginTop: 20 }}>Future-state vision · illustrative data</p>
    </div>
  )
}
