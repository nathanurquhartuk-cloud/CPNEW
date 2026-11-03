import { USER_BASE } from '../data/user'

export const USER = {
  ...USER_BASE,
  get name(): string { return `${this.first} ${this.last}` },
  get initials(): string { return `${this.first[0]}${this.last[0]}` },
}

export type Locale = 'en-GB' | 'de-DE' | 'es-ES' | 'pt-PT' | 'it-IT' | 'zh-CN'
export const LOCALES: { id: Locale; label: string; native: string }[] = [
  { id: 'en-GB', label: 'English', native: 'English' },
  { id: 'de-DE', label: 'German', native: 'Deutsch' },
  { id: 'es-ES', label: 'Spanish', native: 'Español' },
  { id: 'pt-PT', label: 'Portuguese', native: 'Português' },
  { id: 'it-IT', label: 'Italian', native: 'Italiano' },
  { id: 'zh-CN', label: 'Chinese (Simplified)', native: '简体中文' },
]
