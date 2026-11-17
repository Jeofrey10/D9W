import { VocabularyItem, GermanArticle, CefrLevel } from '@/types/learning'
import a1Nouns from './a1-nouns.json'
import a2Nouns from './a2-nouns.json'
import b1Nouns from './b1-nouns.json'
import a1Verbs from './a1-verbs.json'
import a1Adjectives from './a1-adjectives.json'
import commonPhrases from './common-phrases.json'
import b2Vocabulary from './b2-vocabulary.json'
import c1Vocabulary from './c1-vocabulary.json'

export const ALL_VOCABULARY: VocabularyItem[] = [
  ...(a1Nouns as VocabularyItem[]),
  ...(a2Nouns as VocabularyItem[]),
  ...(b1Nouns as VocabularyItem[]),
  ...(a1Verbs as VocabularyItem[]),
  ...(a1Adjectives as VocabularyItem[]),
  ...(commonPhrases as VocabularyItem[]),
  ...(b2Vocabulary as VocabularyItem[]),
  ...(c1Vocabulary as VocabularyItem[]),
]

export const VOCABULARY_BY_ID: Map<string, VocabularyItem> = new Map(
  ALL_VOCABULARY.map((item) => [item.id, item])
)

export const ALL_NOUNS = ALL_VOCABULARY.filter(
  (item): item is VocabularyItem & { article: GermanArticle } =>
    item.type === 'noun' && Boolean(item.article)
)

export const NOUNS_BY_LEVEL: Record<CefrLevel, typeof ALL_NOUNS> = {
  A1: ALL_NOUNS.filter((n) => n.level === 'A1'),
  A2: ALL_NOUNS.filter((n) => n.level === 'A2'),
  B1: ALL_NOUNS.filter((n) => n.level === 'B1'),
  B2: ALL_NOUNS.filter((n) => n.level === 'B2'),
  C1: ALL_NOUNS.filter((n) => n.level === 'C1'),
}

export function findVocabularyById(id: string): VocabularyItem | undefined {
  return ALL_VOCABULARY.find((item) => item.id === id)
}

export function searchVocabulary(query: string): VocabularyItem[] {
  const normalized = query.trim().toLowerCase()
  if (!normalized) return []

  return ALL_VOCABULARY.filter((item) => {
    const wordMatches = item.word.toLowerCase().includes(normalized)
    const englishMatches = item.english.toLowerCase().includes(normalized)
    const articleWord = item.article ? `${item.article} ${item.word}`.toLowerCase() : ''
    const articleMatches = articleWord.includes(normalized)
    const categoryMatches = item.category.toLowerCase().includes(normalized)
    const tagMatches = item.tags.some((t) => t.toLowerCase().includes(normalized))

    return wordMatches || englishMatches || articleMatches || categoryMatches || tagMatches
  })
}
