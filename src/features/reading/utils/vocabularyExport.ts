import { SavedVocabularyItem } from '../types/reading.types'

/**
 * Normalizes a vocabulary key to prevent duplicate saves.
 */
export function normalizeVocabKey(word: string, article?: string): string {
  const normWord = word.trim().toLowerCase()
  const normArticle = article ? article.trim().toLowerCase() : ''
  return normArticle ? `${normArticle}_${normWord}` : normWord
}

/**
 * Escapes a field for standard RFC 4180 CSV export.
 */
function escapeCsvField(value: string | undefined | null): string {
  if (value === undefined || value === null) return '""'
  const stringValue = String(value)
  if (stringValue.includes('"') || stringValue.includes(',') || stringValue.includes('\n')) {
    return `"${stringValue.replace(/"/g, '""')}"`
  }
  return `"${stringValue}"`
}

/**
 * Converts an array of saved vocabulary records into a formatted CSV string.
 */
export function generateVocabularyCsv(items: SavedVocabularyItem[]): string {
  const headers = [
    'German Word',
    'Article',
    'Plural',
    'English Meaning',
    'Part of Speech',
    'CEFR Level',
    'Contextual Meaning',
    'Example Sentence',
    'Source Passage',
    'Date Saved',
  ]

  const rows = items.map((item) => [
    escapeCsvField(item.word),
    escapeCsvField(item.article || ''),
    escapeCsvField(item.plural || ''),
    escapeCsvField(item.englishMeaning),
    escapeCsvField(item.wordType),
    escapeCsvField(item.level),
    escapeCsvField(item.contextMeaning),
    escapeCsvField(item.exampleSentence || ''),
    escapeCsvField(item.sourcePassageTitle),
    escapeCsvField(item.dateSaved),
  ])

  return [headers.map((h) => `"${h}"`).join(','), ...rows.map((r) => r.join(','))].join('\r\n')
}

/**
 * Triggers a browser download of the generated CSV file.
 */
export function downloadVocabularyCsv(items: SavedVocabularyItem[]): boolean {
  if (typeof window === 'undefined' || items.length === 0) return false

  try {
    const csvContent = '\uFEFF' + generateVocabularyCsv(items) // Add BOM for Excel UTF-8 compatibility
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.setAttribute('href', url)
    link.setAttribute(
      'download',
      `D9W-Saved-Vocabulary-${new Date().toISOString().split('T')[0]}.csv`
    )
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    return true
  } catch (err) {
    console.error('Failed to export vocabulary CSV:', err)
    return false
  }
}

/**
 * Formats a single vocabulary item for quick text copy.
 */
export function formatVocabularyItemForCopy(item: SavedVocabularyItem): string {
  const articlePart = item.article ? `${item.article} ` : ''
  const pluralPart = item.plural ? ` (Plural: ${item.plural})` : ''
  let text = `${articlePart}${item.word}${pluralPart} [${item.level}] — ${item.englishMeaning}`
  if (item.exampleSentence) {
    text += `\nBeispiel: "${item.exampleSentence}"`
  }
  return text
}
