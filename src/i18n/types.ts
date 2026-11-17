export type Language = 'en' | 'de'

export interface LanguageOption {
  code: Language
  label: string
  nativeLabel: string
  flag: string
  ariaLabel: string
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  {
    code: 'de',
    label: 'German',
    nativeLabel: 'Deutsch',
    flag: '🇩🇪',
    ariaLabel: 'Zu Deutsch wechseln (German)',
  },
  {
    code: 'en',
    label: 'English',
    nativeLabel: 'English',
    flag: '🇬🇧',
    ariaLabel: 'Switch to English',
  },
]

export interface I18nContextValue {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string, params?: Record<string, string | number>) => string
  isGerman: boolean
  isEnglish: boolean
  dir: 'ltr'
}
