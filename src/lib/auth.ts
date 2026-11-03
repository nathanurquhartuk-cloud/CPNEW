import { useEffect, useState } from 'react'
import { create } from 'zustand'

interface AuthState {
  isAuthenticated: boolean
  login: (email: string, password: string) => void
  logout: () => void
}

const read = () => { try { return localStorage.getItem('cencora_auth') === 'true' } catch { return false } }

export const useAuth = create<AuthState>((set) => ({
  isAuthenticated: read(),
  login: (email, password) => { if (email && password) { try { localStorage.setItem('cencora_auth', 'true') } catch {} set({ isAuthenticated: true }) } },
  logout: () => { try { localStorage.removeItem('cencora_auth') } catch {} set({ isAuthenticated: false }) },
}))

export const useIsMobile = () => {
  const [m, setM] = useState(() => (typeof window !== 'undefined' ? window.innerWidth <= 760 : false))
  useEffect(() => {
    const on = () => setM(window.innerWidth <= 760)
    window.addEventListener('resize', on)
    return () => window.removeEventListener('resize', on)
  }, [])
  return m
}

export const isEmbedded = () => { try { return window.self !== window.top } catch { return true } }
