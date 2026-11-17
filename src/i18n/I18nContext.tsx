import React, { useState, useEffect, useCallback, useMemo } from 'react'
import type { Language, I18nContextValue } from './types'
import { I18nContext } from './context'
import { en } from './locales/en'
import { de } from './locales/de'

const STORAGE_KEY = 'd9w_language'
const DEFAULT_LANGUAGE: Language = 'en'

const dictionaries = { en, de }

/**
 * Traverses nested object with dot notation path.
 */
function getNestedValue(obj: any, path: string): string | undefined {
  if (!obj || !path) return undefined
  const parts = path.split('.')
  let current: any = obj
  for (const part of parts) {
    if (current === undefined || current === null) return undefined
    current = current[part]
  }
  return typeof current === 'string' ? current : undefined
}

export interface I18nProviderProps {
  children: React.ReactNode
  initialLanguage?: Language
}

export const I18nProvider: React.FC<I18nProviderProps> = ({
  children,
  initialLanguage,
}) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (initialLanguage) return initialLanguage
    // 1. Check URL search param if present (?lang=de or ?lang=en)
    try {
      if (typeof window !== 'undefined' && window.location && window.location.search) {
        const params = new URLSearchParams(window.location.search)
        const urlLang = params.get('lang')
        if (urlLang === 'de' || urlLang === 'en') {
          return urlLang
        }
      }
    } catch {
      // Ignore URL parsing errors
    }

    // 2. Check localStorage
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored === 'de' || stored === 'en') {
        return stored
      }
    } catch {
      // LocalStorage unavailable (private mode or sandbox)
    }
    return DEFAULT_LANGUAGE
  })

  // Synchronize document attributes and metadata on language change
  useEffect(() => {
    try {
      document.documentElement.lang = language
      document.documentElement.setAttribute('lang', language)
      localStorage.setItem(STORAGE_KEY, language)

      // Update Page Title
      if (language === 'de') {
        document.title = 'D9W Deutsches Sprachinstitut | Deutsch lernen in Madurai | A1–C1 GER-Kurse'
      } else {
        document.title = 'D9W German Language Institute | Learn German in Madurai | A1–C1 CEFR Courses'
      }

      // Update Meta Description
      const metaDesc = document.querySelector('meta[name="description"]')
      if (metaDesc) {
        metaDesc.setAttribute(
          'content',
          language === 'de'
            ? 'Führendes deutsches Sprachinstitut in Madurai, Tamil Nadu. Strukturierte A1-C1 GER-Kurse, interaktive digitale Lernwerkzeuge und gezielte Goethe/telc-Prüfungsvorbereitung. Tel. +91 80566 57640.'
            : 'Premier German language institute in Madurai, Tamil Nadu offering A1-C1 CEFR courses, interactive digital learning tools, and Goethe/telc exam preparation. Call +91 80566 57640.'
        )
      }

      // Update Open Graph Locale
      const ogLocale = document.querySelector('meta[property="og:locale"]')
      if (ogLocale) {
        ogLocale.setAttribute('content', language === 'de' ? 'de_DE' : 'en_IN')
      }
    } catch {
      // Silently catch DOM/storage errors
    }
  }, [language])

  const setLanguage = useCallback((newLang: Language) => {
    setLanguageState(newLang)
  }, [])

  /**
   * Translates key with fallback to English, interpolating {param} tags.
   */
  const t = useCallback(
    (key: string, params?: Record<string, string | number>): string => {
      // 1. Check active language dictionary
      let text = getNestedValue(dictionaries[language], key)

      // 2. Fallback to English dictionary if not found in active language
      if (!text && language !== 'en') {
        text = getNestedValue(dictionaries.en, key)
      }

      // 3. Ultimate fallback: last key fragment
      if (!text) {
        text = key.split('.').pop() || key
      }

      // 4. Interpolate parameters if provided
      if (params) {
        Object.entries(params).forEach(([paramKey, paramVal]) => {
          text = text!.replace(new RegExp(`\\{${paramKey}\\}`, 'g'), String(paramVal))
        })
      }

      return text
    },
    [language]
  )

  const value = useMemo<I18nContextValue>(
    () => ({
      language,
      setLanguage,
      t,
      isGerman: language === 'de',
      isEnglish: language === 'en',
      dir: 'ltr',
    }),
    [language, setLanguage, t]
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}
