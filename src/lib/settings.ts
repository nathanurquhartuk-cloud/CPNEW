import { create } from 'zustand'
import { Locale } from './user'

interface Settings {
  locale: Locale
  setLocale: (l: Locale) => void
  digest: 'daily' | 'weekly' | 'off'
  setDigest: (d: 'daily' | 'weekly' | 'off') => void
}

const read = <T,>(k: string, d: T): T => { try { const v = localStorage.getItem(k); return v ? (JSON.parse(v) as T) : d } catch { return d } }
const write = (k: string, v: unknown) => { try { localStorage.setItem(k, JSON.stringify(v)) } catch {} }

export const useSettings = create<Settings>((set) => ({
  locale: read<Locale>('cw_locale', 'en-GB'),
  setLocale: (locale) => { write('cw_locale', locale); set({ locale }) },
  digest: read('cw_digest', 'daily'),
  setDigest: (digest) => { write('cw_digest', digest); set({ digest }) },
}))

export const LOCALE_ACK: Record<Locale, string> = {
  'en-GB': 'Done. Your workspace language is set to English.',
  'fr-FR': 'C\'est fait. La langue de votre espace de travail est désormais le français. La traduction complète de l\'interface arrive bientôt ; les formats de date et de nombre sont déjà adaptés.',
  'de-DE': 'Erledigt. Ihre Arbeitsbereichssprache ist jetzt Deutsch. Die vollständige Übersetzung der Oberfläche folgt; Datums- und Zahlenformate sind bereits umgestellt.',
  'es-ES': 'Hecho. El idioma de su espacio de trabajo es ahora el español. La traducción completa de la interfaz llegará pronto; los formatos de fecha y número ya están ajustados.',
  'pt-PT': 'Feito. O idioma do seu espaço de trabalho é agora o português. A tradução completa da interface chegará em breve; os formatos de data e número já estão ajustados.',
  'it-IT': 'Fatto. La lingua del tuo spazio di lavoro è ora l\'italiano. La traduzione completa dell\'interfaccia arriverà presto; i formati di data e numero sono già aggiornati.',
  'zh-CN': '已完成。您的工作区语言已设置为简体中文。界面的完整翻译即将推出；日期和数字格式已切换。',
}
