import {
  AnalyzedToken,
  GrammaticalCase,
  SentenceAnalysisResult,
  SyntacticFunction,
} from '../types/caseTranslator.types'
import { VERIFIED_CASE_EXAMPLES } from '@/data/grammar/case-examples'
import { ALL_PREPOSITIONS } from '@/data/grammar/prepositions'
import { ALL_VERBS } from '@/data/grammar/verbs'
import { ALL_VOCABULARY } from '@/data/vocabulary'

// Article mapping dictionary
const ARTICLES_MAP: Record<
  string,
  {
    type: 'definite' | 'indefinite' | 'negative' | 'possessive'
    genderHint?: string
    possibleCases: GrammaticalCase[]
  }
> = {
  // Definite
  der: { type: 'definite', possibleCases: ['Nominativ', 'Dativ', 'Genitiv'] },
  die: { type: 'definite', possibleCases: ['Nominativ', 'Akkusativ'] },
  das: { type: 'definite', possibleCases: ['Nominativ', 'Akkusativ'] },
  den: { type: 'definite', possibleCases: ['Akkusativ', 'Dativ'] },
  dem: { type: 'definite', possibleCases: ['Dativ'] },
  des: { type: 'definite', possibleCases: ['Genitiv'] },

  // Indefinite
  ein: { type: 'indefinite', possibleCases: ['Nominativ', 'Akkusativ'] },
  eine: { type: 'indefinite', possibleCases: ['Nominativ', 'Akkusativ'] },
  einen: { type: 'indefinite', possibleCases: ['Akkusativ'] },
  einem: { type: 'indefinite', possibleCases: ['Dativ'] },
  einer: { type: 'indefinite', possibleCases: ['Dativ', 'Genitiv'] },
  eines: { type: 'indefinite', possibleCases: ['Genitiv'] },

  // Negative
  kein: { type: 'negative', possibleCases: ['Nominativ', 'Akkusativ'] },
  keine: { type: 'negative', possibleCases: ['Nominativ', 'Akkusativ'] },
  keinen: { type: 'negative', possibleCases: ['Akkusativ', 'Dativ'] },
  keinem: { type: 'negative', possibleCases: ['Dativ'] },
  keiner: { type: 'negative', possibleCases: ['Dativ', 'Genitiv'] },
  keines: { type: 'negative', possibleCases: ['Genitiv'] },

  // Possessive mein
  mein: { type: 'possessive', possibleCases: ['Nominativ', 'Akkusativ'] },
  meine: { type: 'possessive', possibleCases: ['Nominativ', 'Akkusativ'] },
  meinen: { type: 'possessive', possibleCases: ['Akkusativ', 'Dativ'] },
  meinem: { type: 'possessive', possibleCases: ['Dativ'] },
  meiner: { type: 'possessive', possibleCases: ['Dativ', 'Genitiv'] },
  meines: { type: 'possessive', possibleCases: ['Genitiv'] },
}

// Pronoun mapping
const PRONOUN_MAP: Record<
  string,
  { caseName: GrammaticalCase; role: SyntacticFunction; person: string }
> = {
  // Nominativ
  ich: { caseName: 'Nominativ', role: 'subject', person: '1st sing. (I)' },
  du: { caseName: 'Nominativ', role: 'subject', person: '2nd sing. (you)' },
  er: { caseName: 'Nominativ', role: 'subject', person: '3rd sing. masc. (he)' },
  sie: { caseName: 'Nominativ', role: 'subject', person: '3rd sing. fem. / plural (she/they)' },
  es: { caseName: 'Nominativ', role: 'subject', person: '3rd sing. neut. (it)' },
  wir: { caseName: 'Nominativ', role: 'subject', person: '1st plur. (we)' },
  ihr: { caseName: 'Nominativ', role: 'subject', person: '2nd plur. (you all)' },
  Sie: { caseName: 'Nominativ', role: 'subject', person: '2nd formal (You)' },

  // Akkusativ
  mich: { caseName: 'Akkusativ', role: 'direct-object', person: '1st sing. (me)' },
  dich: { caseName: 'Akkusativ', role: 'direct-object', person: '2nd sing. (you)' },
  ihn: { caseName: 'Akkusativ', role: 'direct-object', person: '3rd sing. masc. (him)' },
  uns: { caseName: 'Akkusativ', role: 'direct-object', person: '1st plur. (us)' },
  euch: { caseName: 'Akkusativ', role: 'direct-object', person: '2nd plur. (you all)' },

  // Dativ
  mir: { caseName: 'Dativ', role: 'indirect-object', person: '1st sing. (to me)' },
  dir: { caseName: 'Dativ', role: 'indirect-object', person: '2nd sing. (to you)' },
  ihm: { caseName: 'Dativ', role: 'indirect-object', person: '3rd sing. masc./neut. (to him/it)' },
  ihnen: { caseName: 'Dativ', role: 'indirect-object', person: '3rd plur. (to them)' },
  Ihnen: { caseName: 'Dativ', role: 'indirect-object', person: '2nd formal (to You)' },
}

// Preposition mapping
const PREPOSITION_LOOKUP: Record<
  string,
  {
    category: 'accusative' | 'dative' | 'genitive' | 'two-way'
    governedCase: GrammaticalCase | 'Dativ (Wo?) oder Akkusativ (Wohin?)'
  }
> = {}
for (const p of ALL_PREPOSITIONS) {
  PREPOSITION_LOOKUP[p.preposition.toLowerCase()] = {
    category: p.category,
    governedCase: p.caseTriggered,
  }
}
// Add common contractions
PREPOSITION_LOOKUP['im'] = { category: 'two-way', governedCase: 'Dativ' }
PREPOSITION_LOOKUP['ins'] = { category: 'two-way', governedCase: 'Akkusativ' }
PREPOSITION_LOOKUP['am'] = { category: 'two-way', governedCase: 'Dativ' }
PREPOSITION_LOOKUP['ans'] = { category: 'two-way', governedCase: 'Akkusativ' }
PREPOSITION_LOOKUP['beim'] = { category: 'dative', governedCase: 'Dativ' }
PREPOSITION_LOOKUP['vom'] = { category: 'dative', governedCase: 'Dativ' }
PREPOSITION_LOOKUP['zum'] = { category: 'dative', governedCase: 'Dativ' }
PREPOSITION_LOOKUP['zur'] = { category: 'dative', governedCase: 'Dativ' }
PREPOSITION_LOOKUP['aufs'] = { category: 'two-way', governedCase: 'Akkusativ' }
PREPOSITION_LOOKUP['fürs'] = { category: 'accusative', governedCase: 'Akkusativ' }
PREPOSITION_LOOKUP['ums'] = { category: 'accusative', governedCase: 'Akkusativ' }

/**
 * Normalizes input string for comparison (strips punctuation, trims whitespace)
 */
export function normalizeSentenceText(text: string): string {
  return text
    .trim()
    .replace(/[.,/#!$%^&*;:{}=\-_`~()?"'„“]/g, '')
    .replace(/\s+/g, ' ')
    .toLowerCase()
}

/**
 * Main Analyzer Engine
 */
export function analyzeSentence(inputSentence: string): SentenceAnalysisResult {
  const trimmed = inputSentence.trim()
  if (!trimmed) {
    return {
      originalSentence: '',
      status: 'empty',
      confidence: 0,
      tokens: [],
      elements: [],
      overallExplanation: 'Bitte geben Sie einen deutschen Satz ein oder wählen Sie ein integriertes Beispiel.',
    }
  }

  // 1. Check against verified built-in corpus first for authoritative 100% precision
  const normalizedInput = normalizeSentenceText(trimmed)
  const exactMatch = VERIFIED_CASE_EXAMPLES.find(
    (ex) => normalizeSentenceText(ex.german) === normalizedInput
  )

  if (exactMatch) {
    const rawTokens = trimmed.split(/\s+/)
    const analyzedTokens: AnalyzedToken[] = rawTokens.map((raw, idx) => {
      const clean = raw.replace(/[.,/#!$%^&*;:{}=\-_`~()?"'„“]/g, '')
      const lower = clean.toLowerCase()

      let pos: AnalyzedToken['partOfSpeech'] = 'other'
      let cCase: GrammaticalCase | undefined
      let role: SyntacticFunction = 'unknown'
      let reason = ''

      // Find which element covers this word
      const matchedElem = exactMatch.elements.find((el) =>
        normalizeSentenceText(el.text).split(' ').includes(lower)
      )

      if (matchedElem) {
        cCase = matchedElem.caseName
        role = matchedElem.role
        reason = matchedElem.explanation
      }

      if (ARTICLES_MAP[lower]) pos = 'article'
      else if (PRONOUN_MAP[clean] || PRONOUN_MAP[lower]) pos = 'pronoun'
      else if (PREPOSITION_LOOKUP[lower]) pos = 'preposition'
      else if (ALL_VERBS.some((v) => lower.startsWith(v.verb.slice(0, 4)))) pos = 'verb'
      else if (ALL_VOCABULARY.some((v) => v.word.toLowerCase() === lower)) pos = 'noun'

      return {
        index: idx,
        rawToken: raw,
        cleanWord: clean,
        normalizedWord: lower,
        partOfSpeech: pos,
        grammaticalCase: cCase,
        syntacticFunction: role,
        functionLabel: matchedElem?.roleLabel || role,
        reasonExplanation: reason || `Bestandteil von „${matchedElem?.text || clean}“.`,
        associatedPhrase: matchedElem?.text,
      }
    })

    return {
      originalSentence: trimmed,
      status: 'supported',
      confidence: 100,
      patternId: exactMatch.patternId,
      patternName: `Verifiziertes Muster: ${exactMatch.patternId}`,
      translationGermanToEnglish: exactMatch.english,
      tokens: analyzedTokens,
      elements: exactMatch.elements.map((el) => ({
        label: el.roleLabel,
        text: el.text,
        caseName: el.caseName,
        role: el.role,
        roleName: el.roleLabel,
        explanation: el.explanation,
      })),
      overallExplanation: exactMatch.overallExplanation,
      limitationsNote:
        'Dieses Muster entspricht einem verifizierten Referenzsatz der D9W-Grammatikdatenbank.',
    }
  }

  // 2. Rule-based analysis for custom user sentences
  const rawTokens = trimmed.split(/\s+/)
  const tokens: AnalyzedToken[] = []
  const detectedElements: SentenceAnalysisResult['elements'] = []

  let foundSubject = false
  let foundVerb = false
  let currentPrepCase: GrammaticalCase | undefined

  for (let i = 0; i < rawTokens.length; i++) {
    const raw = rawTokens[i]
    const clean = raw.replace(/[.,/#!$%^&*;:{}=\-_`~()?"'„“]/g, '')
    const lower = clean.toLowerCase()

    let pos: AnalyzedToken['partOfSpeech'] = 'other'
    let assignedCase: GrammaticalCase | undefined
    let func: SyntacticFunction = 'unknown'
    let funcLabel = 'Unbekannt'
    let reason = ''

    // A. Check Prepositions
    if (PREPOSITION_LOOKUP[lower]) {
      pos = 'preposition'
      const prepInfo = PREPOSITION_LOOKUP[lower]
      func = 'prepositional-object'
      funcLabel = 'Präposition'
      if (prepInfo.governedCase !== 'Dativ (Wo?) oder Akkusativ (Wohin?)') {
        currentPrepCase = prepInfo.governedCase
        assignedCase = prepInfo.governedCase
      } else {
        // Two-way default: check verb
        currentPrepCase = 'Dativ' // default
        assignedCase = 'Dativ'
      }
      reason = `Präposition „${clean}“ verlangt den ${currentPrepCase}.`
    }
    // B. Check Pronouns
    else if (PRONOUN_MAP[clean] || PRONOUN_MAP[lower]) {
      pos = 'pronoun'
      const pInfo = PRONOUN_MAP[clean] || PRONOUN_MAP[lower]
      assignedCase = pInfo.caseName
      func = pInfo.role
      funcLabel = pInfo.caseName
      reason = `Personalpronomen im ${pInfo.caseName} (${pInfo.person}).`
      if (func === 'subject' && !foundSubject) {
        foundSubject = true
      }
    }
    // C. Check Articles
    else if (ARTICLES_MAP[lower]) {
      pos = 'article'
      const artInfo = ARTICLES_MAP[lower]

      if (currentPrepCase) {
        assignedCase = currentPrepCase
        func = 'prepositional-object'
        funcLabel = `Präpositionales ${currentPrepCase}`
        reason = `Steht nach der Präposition und nimmt deren Fall (${currentPrepCase}) an.`
      } else if (!foundSubject && (lower === 'der' || lower === 'die' || lower === 'das' || lower === 'ein' || lower === 'eine' || lower === 'kein' || lower === 'mein')) {
        assignedCase = 'Nominativ'
        func = 'subject'
        funcLabel = 'Subjekt (Nominativ)'
        reason = 'Bestimmt das Subjekt im Nominativ am Satzanfang.'
        foundSubject = true
      } else if (lower === 'den' || lower === 'einen' || lower === 'keinen' || lower === 'meinen') {
        assignedCase = 'Akkusativ'
        func = 'direct-object'
        funcLabel = 'Akkusativobjekt'
        reason = 'Eindeutige maskuline Akkusativ-Endung „-en“ (direktes Objekt).'
      } else if (lower === 'dem' || lower === 'einem' || lower === 'keinem' || lower === 'meinem') {
        assignedCase = 'Dativ'
        func = 'indirect-object'
        funcLabel = 'Dativobjekt'
        reason = 'Eindeutige Dativ-Endung „-em“ (indirektes Objekt / Empfänger).'
      } else if (lower === 'des' || lower === 'eines' || lower === 'keines' || lower === 'meines') {
        assignedCase = 'Genitiv'
        func = 'genitive-attribute'
        funcLabel = 'Genitivattribut'
        reason = 'Eindeutige Genitiv-Endung „-es“ (Besitzattribut).'
      } else {
        assignedCase = artInfo.possibleCases[0]
        func = assignedCase === 'Nominativ' ? 'subject' : 'direct-object'
        funcLabel = assignedCase
        reason = `Artikel mit möglichem Kasus: ${artInfo.possibleCases.join('/')}.`
      }
    }
    // D. Check Verbs
    else if (
      ALL_VERBS.some(
        (v) =>
          lower.startsWith(v.verb.slice(0, 3)) ||
          lower === 'ist' ||
          lower === 'sind' ||
          lower === 'war' ||
          lower === 'wird' ||
          lower === 'hat' ||
          lower === 'habe'
      )
    ) {
      pos = 'verb'
      func = 'finite-verb'
      funcLabel = 'Finites Verb'
      reason = 'Konjugiertes Prädikat / Verb des Satzes.'
      foundVerb = true
      // Reset prep case if we passed a verb
      currentPrepCase = undefined
    }
    // E. General Noun or word
    else {
      // If preceded by an assigned case, inherit case
      const prevToken = tokens[tokens.length - 1]
      if (prevToken && prevToken.grammaticalCase && prevToken.partOfSpeech === 'article') {
        assignedCase = prevToken.grammaticalCase
        func = prevToken.syntacticFunction
        funcLabel = prevToken.functionLabel
        pos = 'noun'
        reason = `Nomen folgt dem Artikel und steht ebenfalls im ${assignedCase}.`
      } else {
        pos = clean[0] === clean[0].toUpperCase() ? 'noun' : 'other'
        reason = 'Unbestimmtes Satzglied.'
      }
    }

    tokens.push({
      index: i,
      rawToken: raw,
      cleanWord: clean,
      normalizedWord: lower,
      partOfSpeech: pos,
      grammaticalCase: assignedCase,
      syntacticFunction: func,
      functionLabel: funcLabel,
      reasonExplanation: reason,
    })
  }

  // Synthesize elements for visual card
  // Group tokens into logical constituents (e.g. article + noun)
  let currElement: SentenceAnalysisResult['elements'][number] | null = null

  for (const t of tokens) {
    if (t.grammaticalCase) {
      if (currElement && currElement.caseName === t.grammaticalCase && currElement.role === t.syntacticFunction) {
        currElement.text += ` ${t.cleanWord}`
      } else {
        if (currElement) detectedElements.push(currElement)
        currElement = {
          label: t.functionLabel,
          text: t.cleanWord,
          caseName: t.grammaticalCase,
          role: t.syntacticFunction,
          roleName: t.functionLabel,
          explanation: t.reasonExplanation,
        }
      }
    } else {
      if (currElement) {
        detectedElements.push(currElement)
        currElement = null
      }
      if (t.partOfSpeech === 'verb') {
        detectedElements.push({
          label: 'Verb',
          text: t.cleanWord,
          role: 'finite-verb',
          roleName: 'Verb',
          explanation: t.reasonExplanation,
        })
      }
    }
  }
  if (currElement) detectedElements.push(currElement)

  const identifiedCases = tokens.filter((t) => Boolean(t.grammaticalCase))
  const confidence = Math.min(
    90,
    Math.round((identifiedCases.length / Math.max(1, tokens.length)) * 100)
  )

  const status: SentenceAnalysisResult['status'] =
    confidence >= 65 && foundVerb
      ? 'supported'
      : confidence > 20
      ? 'partial'
      : 'unsupported'

  return {
    originalSentence: trimmed,
    status,
    confidence,
    patternName: status === 'supported' ? 'Regelbasierte Struktur' : 'Teilweise erkannt',
    tokens,
    elements: detectedElements,
    overallExplanation:
      status === 'supported'
        ? 'Die grammatikalischen Fälle wurden anhand von Artikeln, Pronomina und Präpositionen regelbasiert identifiziert.'
        : 'Dieser Satz enthält unbestimmte oder mehrdeutige Strukturen. Für verlässliche grammatikalische Auswertungen empfehlen wir unsere verifizierten Beispielsätze.',
    limitationsNote:
      'Hinweis: Dieser Analyzer basiert auf deterministischer deutscher Regellogik (kein KI-Modell). Komplexe Nebensätze, Passiv-Konstruktionen oder freie Wortfolgen können eingeschränkt sein.',
  }
}
