import { useState, useEffect, useCallback, useRef } from 'react'

export type SpeechPlaybackSpeed = 0.75 | 1.0 | 1.25

export interface UseGermanSpeechResult {
  speak: (text: string, speedOverride?: SpeechPlaybackSpeed) => void
  stop: () => void
  replay: () => void
  isPlaying: boolean
  isSupported: boolean
  hasGermanVoice: boolean
  speed: SpeechPlaybackSpeed
  setSpeed: (speed: SpeechPlaybackSpeed) => void
  currentText: string | null
}

export function useGermanSpeech(): UseGermanSpeechResult {
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [isSupported] = useState<boolean>(() => typeof window !== 'undefined' && 'speechSynthesis' in window)
  const [hasGermanVoice, setHasGermanVoice] = useState<boolean>(false)
  const [speed, setSpeed] = useState<SpeechPlaybackSpeed>(1.0)
  const [currentText, setCurrentText] = useState<string | null>(null)

  const activeVoiceRef = useRef<SpeechSynthesisVoice | null>(null)
  const lastSpokenTextRef = useRef<string | null>(null)

  // Initialize SpeechSynthesis voice finding
  useEffect(() => {
    if (!isSupported) return

    const findGermanVoice = () => {
      const voices = window.speechSynthesis.getVoices()
      const germanVoice =
        voices.find((v) => v.lang.toLowerCase() === 'de-de') ||
        voices.find((v) => v.lang.toLowerCase().startsWith('de')) ||
        null

      if (germanVoice) {
        activeVoiceRef.current = germanVoice
        setHasGermanVoice(true)
      } else {
        setHasGermanVoice(false)
      }
    }

    findGermanVoice()

    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = findGermanVoice
    }

    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel()
      }
    }
  }, [isSupported])

  const stop = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      setIsPlaying(false)
    }
  }, [])

  const speak = useCallback(
    (text: string, speedOverride?: SpeechPlaybackSpeed) => {
      if (!text || typeof window === 'undefined' || !('speechSynthesis' in window)) {
        return
      }

      // Stop previous utterance
      window.speechSynthesis.cancel()

      const playbackRate = speedOverride ?? speed
      const utterance = new SpeechSynthesisUtterance(text)

      utterance.lang = 'de-DE'
      utterance.rate = playbackRate
      utterance.pitch = 1.0

      if (activeVoiceRef.current) {
        utterance.voice = activeVoiceRef.current
      }

      utterance.onstart = () => {
        setIsPlaying(true)
        setCurrentText(text)
        lastSpokenTextRef.current = text
      }

      utterance.onend = () => {
        setIsPlaying(false)
        setCurrentText(null)
      }

      utterance.onerror = (e) => {
        // Ignored if cancelled intentionally
        if (e.error !== 'interrupted' && e.error !== 'canceled') {
          console.warn('Speech synthesis playback notice:', e.error)
        }
        setIsPlaying(false)
        setCurrentText(null)
      }

      window.speechSynthesis.speak(utterance)
    },
    [speed]
  )

  const replay = useCallback(() => {
    if (lastSpokenTextRef.current) {
      speak(lastSpokenTextRef.current)
    }
  }, [speak])

  return {
    speak,
    stop,
    replay,
    isPlaying,
    isSupported,
    hasGermanVoice,
    speed,
    setSpeed,
    currentText,
  }
}
