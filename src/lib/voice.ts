// Voice input and output for Cora, built on the browser's Web Speech API.
// Recognition: Chrome, Edge and Safari (webkitSpeechRecognition). Synthesis: all modern browsers.

type RecognitionLike = {
  lang: string; interimResults: boolean; continuous: boolean; maxAlternatives: number
  onresult: ((e: { resultIndex: number; results: ArrayLike<{ isFinal: boolean; 0: { transcript: string } }> }) => void) | null
  onend: (() => void) | null; onerror: ((e: { error: string }) => void) | null
  start: () => void; stop: () => void; abort: () => void
}
type RecognitionCtor = new () => RecognitionLike

const ctor = (): RecognitionCtor | null => {
  const w = window as unknown as { SpeechRecognition?: RecognitionCtor; webkitSpeechRecognition?: RecognitionCtor }
  return w.SpeechRecognition || w.webkitSpeechRecognition || null
}
export const canListen = () => typeof window !== 'undefined' && !!ctor()
export const canSpeak = () => typeof window !== 'undefined' && 'speechSynthesis' in window

export interface Listener { stop: () => void }

export function listen(lang: string, on: { interim: (t: string) => void; final: (t: string) => void; end: () => void; error: (code: string) => void }): Listener | null {
  const C = ctor(); if (!C) return null
  const r = new C()
  r.lang = lang; r.interimResults = true; r.continuous = false; r.maxAlternatives = 1
  let finalText = ''
  r.onresult = (e) => {
    let interim = ''
    for (let i = e.resultIndex; i < e.results.length; i++) { const res = e.results[i]; if (res.isFinal) finalText += res[0].transcript; else interim += res[0].transcript }
    on.interim(finalText + interim)
  }
  r.onerror = (e) => { if (e.error !== 'aborted' && e.error !== 'no-speech') on.error(e.error) }
  r.onend = () => { const t = finalText.trim(); if (t) on.final(t); on.end() }
  try { r.start() } catch { return null }
  return { stop: () => { try { r.stop() } catch {} } }
}

let voicesCache: SpeechSynthesisVoice[] = []
const loadVoices = () => { if (!canSpeak()) return; voicesCache = window.speechSynthesis.getVoices(); if (!voicesCache.length) window.speechSynthesis.onvoiceschanged = () => { voicesCache = window.speechSynthesis.getVoices() } }
if (typeof window !== 'undefined') loadVoices()

const pickVoice = (lang: string) => {
  const list = voicesCache.length ? voicesCache : (canSpeak() ? window.speechSynthesis.getVoices() : [])
  const prefer = ['Google UK English Female', 'Microsoft Sonia', 'Microsoft Libby', 'Kate', 'Serena', 'Daniel']
  return list.find((v) => prefer.some((p) => v.name.includes(p)) && v.lang.replace('_', '-').startsWith(lang.slice(0, 2)))
    || list.find((v) => v.lang.replace('_', '-').toLowerCase() === lang.toLowerCase())
    || list.find((v) => v.lang.toLowerCase().startsWith(lang.slice(0, 2).toLowerCase()))
    || null
}

// Make a message pleasant to hear: drop arrows and references that read badly aloud.
export const speakable = (text: string) => text
  .replace(/→/g, ' to ').replace(/·/g, ', ').replace(/–/g, ' to ').replace(/\n+/g, '. ').replace(/\s{2,}/g, ' ')
  .replace(/\b(\d{9})CL\b/g, (m) => m.split('').join(' '))
  .replace(/ORD-2026-(\d+)/g, 'order $1').replace(/QUO-2026-(\d+)/g, 'quote $1').replace(/INV-26-(\d+)/g, 'invoice $1').replace(/CAPA-2026-(\d+)/g, 'CAPA $1')
  .replace(/\(no time given, so I have assumed 09:00\)/, 'I assumed nine o\'clock')
  .replace(/\$([\d,]+)/g, '$1 dollars').replace(/°C/g, ' degrees').replace(/\.\s*\./g, '.')

export function speak(text: string, lang: string, onEnd?: () => void): () => void {
  if (!canSpeak()) { onEnd?.(); return () => {} }
  const synth = window.speechSynthesis
  synth.cancel()
  const u = new SpeechSynthesisUtterance(speakable(text))
  u.lang = lang; u.rate = 1.02; u.pitch = 1.0
  const v = pickVoice(lang); if (v) u.voice = v
  let done = false
  const finish = () => { if (!done) { done = true; onEnd?.() } }
  u.onend = finish; u.onerror = finish
  synth.speak(u)
  return () => { done = true; synth.cancel() }
}
export const stopSpeaking = () => { if (canSpeak()) window.speechSynthesis.cancel() }
