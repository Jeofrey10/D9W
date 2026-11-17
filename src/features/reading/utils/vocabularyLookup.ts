import { ALL_VOCABULARY } from '@/data/vocabulary'
import { ContextualWordExplanation, ReadingPassage } from '../types/reading.types'
import { GermanArticle } from '@/types/learning'

/**
 * Curated German inflection and morphology mapping table.
 * Maps inflected surface forms (lowercased) to their canonical dictionary base word (lemma).
 */
export const GERMAN_MORPHOLOGY_MAP: Record<string, string> = {
  // Common irregular and conjugated verbs
  stehe: 'aufstehen',
  stehst: 'aufstehen',
  steht: 'aufstehen',
  stand: 'aufstehen',
  aufgestanden: 'aufstehen',
  trinke: 'trinken',
  trinkst: 'trinken',
  trinkt: 'trinken',
  getrunken: 'trinken',
  esse: 'essen',
  isst: 'essen',
  aß: 'essen',
  gegessen: 'essen',
  wohne: 'wohnen',
  wohnst: 'wohnen',
  wohnt: 'wohnen',
  gewohnt: 'wohnen',
  verlasse: 'verlassen',
  verlässt: 'verlassen',
  verlassen: 'verlassen',
  nehme: 'nehmen',
  nimmst: 'nehmen',
  nimmt: 'nehmen',
  nahm: 'nehmen',
  genommen: 'nehmen',
  beginnt: 'beginnen',
  begann: 'beginnen',
  begonnen: 'beginnen',
  heißt: 'heißen',
  hieß: 'heißen',
  geheißen: 'heißen',
  arbeitet: 'arbeiten',
  gearbeitet: 'arbeiten',
  liest: 'lesen',
  gelesen: 'lesen',
  gehe: 'gehen',
  gehst: 'gehen',
  geht: 'gehen',
  ging: 'gehen',
  gegangen: 'gehen',
  spreche: 'sprechen',
  spricht: 'sprechen',
  sprach: 'sprechen',
  gesprochen: 'sprechen',
  fahre: 'fahren',
  fährst: 'fahren',
  fährt: 'fahren',
  fuhr: 'fahren',
  gefahren: 'fahren',
  schien: 'scheinen',
  geschienen: 'scheinen',
  gemietet: 'mieten',
  erholt: 'erholen',
  sucht: 'suchen',
  gesucht: 'suchen',
  besichtigt: 'besichtigen',
  kauft: 'kaufen',
  gekauft: 'kaufen',
  bezahlt: 'bezahlen',

  // Nouns: plural and case inflections
  brötchen: 'Brötchen',
  morgen: 'Morgen',
  wohnungen: 'Wohnung',
  häuser: 'Haus',
  häusern: 'Haus',
  kindern: 'Kind',
  kinder: 'Kind',
  müttern: 'Mutter',
  mütter: 'Mutter',
  vätern: 'Vater',
  väter: 'Vater',
  brüdern: 'Bruder',
  brüder: 'Bruder',
  freunden: 'Freund',
  freunde: 'Freund',
  bäckereien: 'Bäckerei',
  brezeln: 'Brezel',
  ausflüge: 'Ausflug',
  ausflügen: 'Ausflug',
  fahrräder: 'Fahrrad',
  fahrrädern: 'Fahrrad',
  zügen: 'Zug',
  züge: 'Zug',
  städte: 'Stadt',
  städten: 'Stadt',
  frauen: 'Frau',
  männer: 'Mann',
  männern: 'Mann',
  wörter: 'Wort',
  wörtern: 'Wort',
  lehrern: 'Lehrer',
  lehrerinnen: 'Lehrerin',
  gespräche: 'Gespräch',
  gesprächen: 'Gespräch',

  // Adjectives: inflected forms
  frisches: 'frisch',
  frische: 'frisch',
  frischem: 'frisch',
  frischen: 'frisch',
  frischer: 'frisch',
  kleinen: 'klein',
  kleine: 'klein',
  kleines: 'klein',
  großen: 'groß',
  große: 'groß',
  größeren: 'groß',
  größte: 'groß',
  neuen: 'neu',
  neue: 'neu',
  wichtiges: 'wichtig',
  wichtige: 'wichtig',
  wichtigen: 'wichtig',
  schönen: 'schön',
  schöne: 'schön',
}

/**
 * Searches for an exact or inflected vocabulary match for a given token.
 * Priority:
 * 1. Passage keyVocabulary explicit definitions
 * 2. Morphological resolution -> ALL_VOCABULARY
 * 3. Exact lemma match in ALL_VOCABULARY
 */
export function lookupWord(
  cleanWord: string,
  passage?: ReadingPassage
): ContextualWordExplanation | null {
  if (!cleanWord || cleanWord.trim() === '') return null

  const lowerWord = cleanWord.toLowerCase()

  // 1. Check passage-specific key vocabulary
  if (passage?.keyVocabulary) {
    const directKeyMatch = passage.keyVocabulary.find(
      (item) =>
        item.word.toLowerCase() === lowerWord ||
        item.baseForm.toLowerCase() === lowerWord
    )
    if (directKeyMatch) return directKeyMatch

    // Check with morphology map
    const mappedBase = GERMAN_MORPHOLOGY_MAP[lowerWord]
    if (mappedBase) {
      const morphKeyMatch = passage.keyVocabulary.find(
        (item) => item.baseForm.toLowerCase() === mappedBase.toLowerCase()
      )
      if (morphKeyMatch) return morphKeyMatch
    }
  }

  // 2. Resolve base form from morphology map
  const lemmaCandidate = GERMAN_MORPHOLOGY_MAP[lowerWord] || cleanWord

  // 3. Search in global ALL_VOCABULARY
  const vocabItem = ALL_VOCABULARY.find(
    (item) =>
      item.word.toLowerCase() === lowerWord ||
      item.word.toLowerCase() === lemmaCandidate.toLowerCase()
  )

  if (vocabItem) {
    return {
      word: cleanWord,
      baseForm: vocabItem.word,
      article: vocabItem.article,
      plural: vocabItem.plural,
      wordType: vocabItem.type,
      level: vocabItem.level,
      contextMeaning: vocabItem.english,
      englishMeaning: vocabItem.english,
      exampleSentence: vocabItem.example.german,
      exampleTranslation: vocabItem.example.english,
      dictionaryId: vocabItem.id,
      grammarNotes: vocabItem.verbDetails
        ? `Infinitive: ${vocabItem.verbDetails.infinitive} | 3rd person: ${vocabItem.verbDetails.present3rd} | Perfekt: ${vocabItem.verbDetails.pastPerfekt}`
        : vocabItem.adjectiveDetails
        ? `Comparative: ${vocabItem.adjectiveDetails.comparative || '—'} | Superlative: ${vocabItem.adjectiveDetails.superlative || '—'}`
        : undefined,
    }
  }

  // 4. Return null if no verified entry exists
  return null
}

/**
 * Authentic German Gender Color and Style Tokens
 */
export function getGenderStyles(article?: GermanArticle) {
  switch (article) {
    case 'der':
      return {
        article: 'der',
        colorClass: 'text-[#1E3A8A] bg-[#EFF6FF] border-[#BFDBFE]',
        badgeBg: 'bg-[#1E3A8A] text-white',
        borderAccent: 'border-l-4 border-l-[#1E3A8A]',
        dotColor: 'bg-[#1E3A8A]',
        label: 'Maskulin (der)',
      }
    case 'die':
      return {
        article: 'die',
        colorClass: 'text-[#C83B32] bg-[#FEF2F2] border-[#FECACA]',
        badgeBg: 'bg-[#C83B32] text-white',
        borderAccent: 'border-l-4 border-l-[#C83B32]',
        dotColor: 'bg-[#C83B32]',
        label: 'Feminin (die)',
      }
    case 'das':
      return {
        article: 'das',
        colorClass: 'text-[#15803D] bg-[#F0FDF4] border-[#BBF7D0]',
        badgeBg: 'bg-[#15803D] text-white',
        borderAccent: 'border-l-4 border-l-[#15803D]',
        dotColor: 'bg-[#15803D]',
        label: 'Neutrum (das)',
      }
    default:
      return {
        article: undefined,
        colorClass: 'text-[#55534F] bg-[#F7F5F0] border-[#DEDAD1]',
        badgeBg: 'bg-[#55534F] text-white',
        borderAccent: 'border-l-4 border-l-[#89857E]',
        dotColor: 'bg-[#89857E]',
        label: 'Wortschatz',
      }
  }
}
