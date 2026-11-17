import { useLocalStorage } from '@/hooks/useLocalStorage'
import { ReadingPreferences } from '../types/reading.types'

const PREFERENCES_KEY = 'd9w-reading-preferences-v1'

const DEFAULT_PREFERENCES: ReadingPreferences = {
  fontSize: 'md',
  lineSpacing: 'comfortable',
  mode: 'learning',
  vocabularyAssistance: true,
}

export function useReadingPreferences() {
  const [preferences, setPreferences] = useLocalStorage<ReadingPreferences>(
    PREFERENCES_KEY,
    DEFAULT_PREFERENCES
  )

  const setFontSize = (fontSize: ReadingPreferences['fontSize']) => {
    setPreferences((prev) => ({ ...prev, fontSize }))
  }

  const setLineSpacing = (lineSpacing: ReadingPreferences['lineSpacing']) => {
    setPreferences((prev) => ({ ...prev, lineSpacing }))
  }

  const setMode = (mode: ReadingPreferences['mode']) => {
    setPreferences((prev) => ({ ...prev, mode }))
  }

  const toggleVocabularyAssistance = () => {
    setPreferences((prev) => ({
      ...prev,
      vocabularyAssistance: !prev.vocabularyAssistance,
    }))
  }

  return {
    preferences,
    setFontSize,
    setLineSpacing,
    setMode,
    toggleVocabularyAssistance,
  }
}
