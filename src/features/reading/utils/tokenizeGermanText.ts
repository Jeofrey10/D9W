import { ReadingWordToken } from '../types/reading.types'

/**
 * Tokenizes a German paragraph into a sequence of word tokens and non-word tokens (whitespace/punctuation).
 * Preserves exact text layout, casing, German umlauts (ä, ö, ü, ß), and sentence punctuation.
 */
export function tokenizeParagraph(
  paragraph: string,
  paragraphIndex: number
): ReadingWordToken[] {
  if (!paragraph) return []

  // Match words with optional leading/trailing punctuation, or whitespace
  // German word characters: a-z, A-Z, ä, ö, ü, Ä, Ö, Ü, ß
  const tokens: ReadingWordToken[] = []
  const regex = /(\s+|[^\s\wÄÖÜäöüß]+|[\wÄÖÜäöüß]+(?:-[\wÄÖÜäöüß]+)*)/g

  let match: RegExpExecArray | null
  let tokenIdx = 0

  while ((match = regex.exec(paragraph)) !== null) {
    const raw = match[0]
    if (!raw) continue

    // Check if contains word characters
    const isWord = /[a-zA-ZäöüÄÖÜß]/.test(raw)

    if (isWord) {
      // Split leading and trailing punctuation
      const wordMatch = raw.match(/^([^a-zA-ZäöüÄÖÜß]*)([a-zA-ZäöüÄÖÜß]+(?:-[a-zA-ZäöüÄÖÜß]+)*)([^a-zA-ZäöüÄÖÜß]*)$/)

      if (wordMatch) {
        const prefixPunctuation = wordMatch[1] || ''
        const cleanWord = wordMatch[2]
        const suffixPunctuation = wordMatch[3] || ''

        tokens.push({
          id: `p${paragraphIndex}-w${tokenIdx++}`,
          rawToken: raw,
          cleanWord,
          prefixPunctuation: prefixPunctuation || undefined,
          suffixPunctuation: suffixPunctuation || undefined,
          isWord: true,
          lookupKey: cleanWord.toLowerCase(),
        })
      } else {
        tokens.push({
          id: `p${paragraphIndex}-w${tokenIdx++}`,
          rawToken: raw,
          cleanWord: raw,
          isWord: true,
          lookupKey: raw.toLowerCase(),
        })
      }
    } else {
      // Pure whitespace or standalone punctuation (e.g. "—", "...")
      tokens.push({
        id: `p${paragraphIndex}-s${tokenIdx++}`,
        rawToken: raw,
        cleanWord: '',
        isWord: false,
        lookupKey: '',
      })
    }
  }

  return tokens
}

/**
 * Tokenizes all paragraphs of a reading passage.
 */
export function tokenizePassage(paragraphs: string[]): ReadingWordToken[][] {
  return paragraphs.map((para, idx) => tokenizeParagraph(para, idx))
}
