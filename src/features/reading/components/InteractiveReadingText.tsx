import React, { useMemo } from 'react'
import {
  ReadingPassage,
  ReadingPreferences,
  ReadingWordToken,
  ContextualWordExplanation,
  SavedVocabularyItem,
} from '../types/reading.types'
import { tokenizeParagraph } from '../utils/tokenizeGermanText'
import { lookupWord, getGenderStyles } from '../utils/vocabularyLookup'
import { normalizeVocabKey } from '../utils/vocabularyExport'
import { cn } from '@/lib/utils'

interface InteractiveReadingTextProps {
  passage: ReadingPassage
  preferences: ReadingPreferences
  savedWords: SavedVocabularyItem[]
  activeTokenId: string | null
  onWordClick: (
    token: ReadingWordToken,
    rect: DOMRect,
    explanation: ContextualWordExplanation | null
  ) => void
}

export const InteractiveReadingText: React.FC<InteractiveReadingTextProps> = ({
  passage,
  preferences,
  savedWords,
  activeTokenId,
  onWordClick,
}) => {
  // Pre-calculate tokenized paragraphs
  const tokenizedParagraphs = useMemo(() => {
    return passage.paragraphs.map((para, idx) => tokenizeParagraph(para, idx))
  }, [passage.paragraphs])

  // Set of normalized keys for quick saved check
  const savedKeysSet = useMemo(() => {
    return new Set(
      savedWords.map((item) => normalizeVocabKey(item.word, item.article))
    )
  }, [savedWords])

  // Key vocabulary words set
  const keyVocabSet = useMemo(() => {
    const set = new Set<string>()
    if (passage.keyVocabulary) {
      for (const item of passage.keyVocabulary) {
        set.add(item.word.toLowerCase())
        set.add(item.baseForm.toLowerCase())
      }
    }
    return set
  }, [passage.keyVocabulary])

  // Typography sizing classes
  const fontSizeClass = {
    sm: 'text-base sm:text-[17px]',
    md: 'text-lg sm:text-[19px]',
    lg: 'text-xl sm:text-[22px]',
  }[preferences.fontSize]

  const lineSpacingClass = {
    compact: 'leading-relaxed',
    comfortable: 'leading-loose',
    relaxed: 'leading-[2.2]',
  }[preferences.lineSpacing]

  const handleTokenClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    token: ReadingWordToken
  ) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const explanation = lookupWord(token.cleanWord, passage)
    onWordClick(token, rect, explanation)
  }

  return (
    <article
      className={cn(
        'font-serif text-[#171717] transition-all duration-150 select-text space-y-6',
        fontSizeClass,
        lineSpacingClass
      )}
    >
      {tokenizedParagraphs.map((tokens, pIdx) => (
        <p key={`p-${pIdx}`} className="text-justify indent-0 sm:indent-2">
          {tokens.map((token) => {
            if (!token.isWord) {
              return <span key={token.id}>{token.rawToken}</span>
            }

            const isSaved = savedKeysSet.has(
              normalizeVocabKey(token.cleanWord)
            )
            const isKeyVocab =
              preferences.mode !== 'reading' &&
              keyVocabSet.has(token.cleanWord.toLowerCase())
            const isActive = activeTokenId === token.id

            // Check if noun in key vocabulary to get subtle gender dot
            const vocabInfo = isKeyVocab
              ? passage.keyVocabulary?.find(
                  (v) =>
                    v.word.toLowerCase() === token.cleanWord.toLowerCase() ||
                    v.baseForm.toLowerCase() === token.cleanWord.toLowerCase()
                )
              : null
            const genderStyles = vocabInfo?.article
              ? getGenderStyles(vocabInfo.article)
              : null

            return (
              <span key={token.id} className="inline-block whitespace-nowrap">
                {token.prefixPunctuation}
                <button
                  type="button"
                  onClick={(e) => handleTokenClick(e, token)}
                  aria-label={`Erklärung für ${token.cleanWord}`}
                  className={cn(
                    'relative rounded px-0.5 py-0.25 font-medium transition-all duration-100 cursor-pointer',
                    'hover:bg-[#EFECE6] hover:text-[#171717] focus:outline-none focus:ring-1 focus:ring-[#C83B32]',
                    isActive && 'bg-[#171717] text-white hover:bg-[#171717] hover:text-white',
                    isSaved && !isActive && 'border-b-2 border-[#D7B95D] bg-[#FFFBEB]/60',
                    isKeyVocab &&
                      !isActive &&
                      !isSaved &&
                      'border-b border-dashed border-[#89857E] hover:border-solid hover:border-[#C83B32]'
                  )}
                >
                  {token.cleanWord}
                  {genderStyles && !isActive && (
                    <span
                      aria-hidden="true"
                      className={cn(
                        'inline-block h-1.5 w-1.5 rounded-full ml-0.5 align-top mt-1',
                        genderStyles.dotColor
                      )}
                    />
                  )}
                </button>
                {token.suffixPunctuation}
              </span>
            )
          })}
        </p>
      ))}
    </article>
  )
}
