import { useCallback } from 'react'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import {
  SavedVocabularyItem,
  ContextualWordExplanation,
  ReadingPassage,
} from '../types/reading.types'
import { normalizeVocabKey } from '../utils/vocabularyExport'

const VOCABULARY_STORAGE_KEY = 'd9w-reading-vocabulary-v1'

export function useReadingVocabulary() {
  const [savedWords, setSavedWords] = useLocalStorage<SavedVocabularyItem[]>(
    VOCABULARY_STORAGE_KEY,
    []
  )

  const isWordSaved = useCallback(
    (word: string, article?: string): boolean => {
      const targetKey = normalizeVocabKey(word, article)
      return savedWords.some(
        (item) => normalizeVocabKey(item.word, item.article) === targetKey
      )
    },
    [savedWords]
  )

  const saveWord = useCallback(
    (item: ContextualWordExplanation, passage: ReadingPassage) => {
      const targetKey = normalizeVocabKey(item.word, item.article)
      setSavedWords((prev) => {
        // Prevent duplicate saves
        const exists = prev.some(
          (w) => normalizeVocabKey(w.word, w.article) === targetKey
        )
        if (exists) return prev

        const newItem: SavedVocabularyItem = {
          id: `vocab-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
          word: item.word,
          baseForm: item.baseForm,
          article: item.article,
          plural: item.plural,
          wordType: item.wordType,
          level: item.level,
          contextMeaning: item.contextMeaning,
          englishMeaning: item.englishMeaning,
          exampleSentence: item.exampleSentence,
          sourcePassageId: passage.id,
          sourcePassageTitle: passage.titleGerman,
          dateSaved: new Date().toISOString().split('T')[0],
        }

        return [newItem, ...prev]
      })
    },
    [setSavedWords]
  )

  const removeWord = useCallback(
    (targetWord: string, article?: string) => {
      const targetKey = normalizeVocabKey(targetWord, article)
      setSavedWords((prev) =>
        prev.filter(
          (item) =>
            item.id !== targetWord &&
            normalizeVocabKey(item.word, item.article) !== targetKey
        )
      )
    },
    [setSavedWords]
  )

  const clearAllVocabulary = useCallback(() => {
    setSavedWords([])
  }, [setSavedWords])

  return {
    savedWords,
    saveWord,
    removeWord,
    isWordSaved,
    clearAllVocabulary,
    totalSaved: savedWords.length,
  }
}
