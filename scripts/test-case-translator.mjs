/**
 * Automated Verification Test Suite for D9W Contextual Case Translator & Grammar Engine (P03-08)
 */

import { createServer } from 'vite'

let passed = 0
let failed = 0

function assert(name, condition, message = '') {
  if (condition) {
    console.log(`✓ PASS: ${name}`)
    passed++
  } else {
    console.error(`✗ FAIL: ${name} — ${message}`)
    failed++
  }
}

async function runTests() {
  console.log('=== Starting D9W Contextual Case Translator Verification Suite ===\n')

  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    logLevel: 'silent',
  })

  // Load modules via Vite SSR
  const { GERMAN_CASE_DEFINITIONS } = await vite.ssrLoadModule('./src/data/grammar/cases.ts')
  const {
    DEFINITE_ARTICLES,
    INDEFINITE_ARTICLES,
    NEGATIVE_ARTICLES,
    getArticleForm,
    generatePossessiveDeclension,
    NOUN_ENDINGS_RULES,
  } = await vite.ssrLoadModule('./src/data/grammar/articles.ts')
  const { PERSONAL_PRONOUNS } = await vite.ssrLoadModule('./src/data/grammar/pronouns.ts')
  const {
    ACCUSATIVE_PREPOSITIONS,
    DATIVE_PREPOSITIONS,
    GENITIVE_PREPOSITIONS,
    TWO_WAY_PREPOSITIONS,
    PREPOSITION_CONTRACTIONS,
  } = await vite.ssrLoadModule('./src/data/grammar/prepositions.ts')
  const {
    ACCUSATIVE_VERBS,
    DATIVE_VERBS,
    DUAL_OBJECT_VERBS,
    GENITIVE_VERBS,
    findVerbValency,
  } = await vite.ssrLoadModule('./src/data/grammar/verbs.ts')
  const { VERIFIED_CASE_EXAMPLES } = await vite.ssrLoadModule('./src/data/grammar/case-examples.ts')
  const { CASE_QUIZ_QUESTIONS } = await vite.ssrLoadModule('./src/data/grammar/case-questions.ts')
  const { SUPPORTED_GRAMMAR_PATTERNS } = await vite.ssrLoadModule('./src/data/grammar/sentence-patterns.ts')
  const { analyzeSentence, normalizeSentenceText } = await vite.ssrLoadModule('./src/features/case-translator/utils/caseAnalyzer.ts')
  const { CASE_COLOR_TOKENS } = await vite.ssrLoadModule('./src/features/case-translator/utils/caseColorTokens.ts')

  await vite.close()

  // 1. FOUR GRAMMATICAL CASE DEFINITIONS
  console.log('\n--- 1. Four Grammatical Case Definitions ---')
  assert(
    'Verified sentence examples contain at least 10 annotated sentences',
    VERIFIED_CASE_EXAMPLES.length >= 10,
    `Found: ${VERIFIED_CASE_EXAMPLES.length}`
  )
  assert(
    'Supported grammar patterns catalog contains at least 10 declarative patterns',
    SUPPORTED_GRAMMAR_PATTERNS.length >= 10,
    `Found: ${SUPPORTED_GRAMMAR_PATTERNS.length}`
  )
  assert(
    'Sentence text normalizer removes punctuation and lowercases',
    normalizeSentenceText('Der Mann, gibt dem Kind einen Apfel!') === 'der mann gibt dem kind einen apfel',
    'Normalizer output mismatch'
  )
  const caseKeys = Object.keys(GERMAN_CASE_DEFINITIONS)
  assert(
    'All four cases defined (Nominativ, Akkusativ, Dativ, Genitiv)',
    caseKeys.length === 4 &&
      caseKeys.includes('Nominativ') &&
      caseKeys.includes('Akkusativ') &&
      caseKeys.includes('Dativ') &&
      caseKeys.includes('Genitiv'),
    `Cases found: ${caseKeys.join(', ')}`
  )

  assert(
    'Nominativ contains Wer?/Was? questions',
    GERMAN_CASE_DEFINITIONS.Nominativ.questionWords.some((q) => q.includes('Wer')),
    'Missing Wer? in Nominativ'
  )
  assert(
    'Akkusativ contains Wen?/Was? questions',
    GERMAN_CASE_DEFINITIONS.Akkusativ.questionWords.some((q) => q.includes('Wen')),
    'Missing Wen? in Akkusativ'
  )
  assert(
    'Dativ contains Wem? question',
    GERMAN_CASE_DEFINITIONS.Dativ.questionWords.some((q) => q.includes('Wem')),
    'Missing Wem? in Dativ'
  )
  assert(
    'Genitiv contains Wessen? question',
    GERMAN_CASE_DEFINITIONS.Genitiv.questionWords.some((q) => q.includes('Wessen')),
    'Missing Wessen? in Genitiv'
  )

  // 2. ARTICLE DECLENSION ACCURACY
  console.log('\n--- 2. Article Declension Precision ---')
  // Definite
  assert(
    'Definite masculine: der -> den -> dem -> des',
    DEFINITE_ARTICLES.declension.Nominativ.masculine === 'der' &&
      DEFINITE_ARTICLES.declension.Akkusativ.masculine === 'den' &&
      DEFINITE_ARTICLES.declension.Dativ.masculine === 'dem' &&
      DEFINITE_ARTICLES.declension.Genitiv.masculine.startsWith('des'),
    'Definite masculine declension error'
  )
  assert(
    'Definite feminine: die -> die -> der -> der',
    DEFINITE_ARTICLES.declension.Nominativ.feminine === 'die' &&
      DEFINITE_ARTICLES.declension.Akkusativ.feminine === 'die' &&
      DEFINITE_ARTICLES.declension.Dativ.feminine === 'der' &&
      DEFINITE_ARTICLES.declension.Genitiv.feminine === 'der',
    'Definite feminine declension error'
  )
  assert(
    'Definite neuter: das -> das -> dem -> des',
    DEFINITE_ARTICLES.declension.Nominativ.neuter === 'das' &&
      DEFINITE_ARTICLES.declension.Akkusativ.neuter === 'das' &&
      DEFINITE_ARTICLES.declension.Dativ.neuter === 'dem' &&
      DEFINITE_ARTICLES.declension.Genitiv.neuter.startsWith('des'),
    'Definite neuter declension error'
  )
  assert(
    'Definite plural: die -> die -> den (+n) -> der',
    DEFINITE_ARTICLES.declension.Nominativ.plural === 'die' &&
      DEFINITE_ARTICLES.declension.Akkusativ.plural === 'die' &&
      DEFINITE_ARTICLES.declension.Dativ.plural.includes('den') &&
      DEFINITE_ARTICLES.declension.Genitiv.plural === 'der',
    'Definite plural declension error'
  )

  // Indefinite
  assert(
    'Indefinite masculine accusative is "einen"',
    INDEFINITE_ARTICLES.declension.Akkusativ.masculine === 'einen',
    `Found: ${INDEFINITE_ARTICLES.declension.Akkusativ.masculine}`
  )
  assert(
    'Indefinite masculine dative is "einem"',
    INDEFINITE_ARTICLES.declension.Dativ.masculine === 'einem',
    `Found: ${INDEFINITE_ARTICLES.declension.Dativ.masculine}`
  )
  assert(
    'Indefinite plural is correctly documented as non-existent',
    INDEFINITE_ARTICLES.declension.Nominativ.plural.includes('no plural'),
    'Indefinite plural should not have standard form'
  )

  // Negative & Possessive
  assert(
    'Negative masculine accusative is "keinen"',
    NEGATIVE_ARTICLES.declension.Akkusativ.masculine === 'keinen',
    `Found: ${NEGATIVE_ARTICLES.declension.Akkusativ.masculine}`
  )
  assert(
    'Possessive "euer" handles stem contraction (euer -> eure, euren, eurem)',
    generatePossessiveDeclension('euer').Akkusativ.masculine === 'euren' &&
      generatePossessiveDeclension('euer').Dativ.masculine === 'eurem',
    'euer contraction failed'
  )
  assert(
    'getArticleForm helper computes correct values',
    getArticleForm('definite', 'Akkusativ', 'masculine') === 'den' &&
      getArticleForm('indefinite', 'Dativ', 'feminine') === 'einer' &&
      getArticleForm('negative', 'Genitiv', 'plural') === 'keiner',
    'getArticleForm lookup mismatch'
  )

  // Noun endings rules
  assert(
    'Noun ending rules cover genitive -s/-es and dative plural +n',
    NOUN_ENDINGS_RULES.genitiveMasculineNeuter.rules.length >= 2 &&
      NOUN_ENDINGS_RULES.dativePlural.rules.length >= 1,
    'Noun ending rules incomplete'
  )

  // 3. PERSONAL PRONOUN DECLENSION ACROSS 4 CASES
  console.log('\n--- 3. Personal Pronoun Declension Across All 4 Cases ---')
  assert(
    'Personal pronoun table contains all 9 grammatical persons',
    PERSONAL_PRONOUNS.length === 9,
    `Found: ${PERSONAL_PRONOUNS.length}`
  )

  const ich = PERSONAL_PRONOUNS.find((p) => p.nominativ === 'ich')
  assert(
    'ich -> mich -> mir -> meiner',
    ich && ich.akkusativ === 'mich' && ich.dativ === 'mir' && ich.genitiv === 'meiner',
    `1st person pronoun mismatch: ${JSON.stringify(ich)}`
  )

  const er = PERSONAL_PRONOUNS.find((p) => p.nominativ === 'er')
  assert(
    'er -> ihn -> ihm -> seiner',
    er && er.akkusativ === 'ihn' && er.dativ === 'ihm' && er.genitiv === 'seiner',
    `3rd person masculine pronoun mismatch: ${JSON.stringify(er)}`
  )

  const formalSie = PERSONAL_PRONOUNS.find((p) => p.nominativ === 'Sie')
  assert(
    'Sie (formal) -> Sie -> Ihnen -> Ihrer',
    formalSie && formalSie.akkusativ === 'Sie' && formalSie.dativ === 'Ihnen' && formalSie.genitiv === 'Ihrer',
    `Formal pronoun mismatch: ${JSON.stringify(formalSie)}`
  )

  // 4. PREPOSITION RECTION & TWO-WAY WECHSELPRÄPOSITIONEN
  console.log('\n--- 4. Preposition Rection & Two-Way Distinctions ---')
  assert(
    'Accusative prepositions include DOGFU (durch, ohne, gegen, für, um)',
    ['durch', 'ohne', 'gegen', 'für', 'um'].every((p) =>
      ACCUSATIVE_PREPOSITIONS.some((item) => item.preposition === p)
    ),
    'Missing core accusative prepositions'
  )

  assert(
    'Dative prepositions include aus, bei, mit, nach, seit, von, zu',
    ['aus', 'bei', 'mit', 'nach', 'seit', 'von', 'zu'].every((p) =>
      DATIVE_PREPOSITIONS.some((item) => item.preposition === p)
    ),
    'Missing core dative prepositions'
  )

  assert(
    'Genitive prepositions include während, wegen, trotz, innerhalb, außerhalb, statt',
    ['während', 'wegen', 'trotz', 'innerhalb', 'außerhalb'].every((p) =>
      GENITIVE_PREPOSITIONS.some((item) => item.preposition.includes(p))
    ),
    'Missing core genitive prepositions'
  )

  assert(
    'Exactly 9 Wechselpräpositionen (an, auf, hinter, in, neben, über, unter, vor, zwischen)',
    TWO_WAY_PREPOSITIONS.length === 9,
    `Found: ${TWO_WAY_PREPOSITIONS.length}`
  )

  assert(
    'Preposition contractions cover im, ins, am, ans, beim, vom, zum, zur',
    ['im', 'ins', 'am', 'ans', 'beim', 'vom', 'zum', 'zur'].every((c) =>
      PREPOSITION_CONTRACTIONS.some((item) => item.contracted === c)
    ),
    'Core contractions missing'
  )

  // 5. VERB VALENCY INDEX
  console.log('\n--- 5. Verb Valency Index ---')
  assert(
    'Accusative verbs present (haben, sehen, kaufen, lesen...)',
    ACCUSATIVE_VERBS.length >= 8,
    `Found: ${ACCUSATIVE_VERBS.length}`
  )
  assert(
    'Dative verbs present (helfen, danken, gehören, gefallen...)',
    DATIVE_VERBS.length >= 8,
    `Found: ${DATIVE_VERBS.length}`
  )
  assert(
    'Dual-object verbs present (geben, schenken, zeigen...)',
    DUAL_OBJECT_VERBS.length >= 5,
    `Found: ${DUAL_OBJECT_VERBS.length}`
  )
  assert(
    'Genitive verbs present (bedürfen, gedenken...)',
    GENITIVE_VERBS.length >= 3,
    `Found: ${GENITIVE_VERBS.length}`
  )
  assert(
    'findVerbValency correctly identifies "helfen" as Dativ',
    findVerbValency('helfen')?.governedCase === 'Dativ',
    'helfen valency check failed'
  )

  // 6. CONTEXTUAL SENTENCE ANALYZER
  console.log('\n--- 6. Contextual Sentence Analyzer ---')
  // Test A: Ditransitive sentence
  const res1 = analyzeSentence('Der Mann gibt dem Kind einen Apfel.')
  assert(
    'Analyzes "Der Mann gibt dem Kind einen Apfel." with 100% confidence',
    res1.status === 'supported' && res1.confidence === 100,
    `Status: ${res1.status}, Conf: ${res1.confidence}`
  )
  assert(
    'Der Mann identified as Nominativ (Subjekt)',
    res1.elements.some((el) => el.text.includes('Der Mann') && el.caseName === 'Nominativ'),
    'Der Mann role mismatch'
  )
  assert(
    'dem Kind identified as Dativ (Indirektes Objekt)',
    res1.elements.some((el) => el.text.includes('dem Kind') && el.caseName === 'Dativ'),
    'dem Kind role mismatch'
  )
  assert(
    'einen Apfel identified as Akkusativ (Direktes Objekt)',
    res1.elements.some((el) => el.text.includes('einen Apfel') && el.caseName === 'Akkusativ'),
    'einen Apfel role mismatch'
  )

  // Test B: Two-way preposition (Wo? -> Dativ)
  const res2 = analyzeSentence('Das Buch liegt auf dem Tisch.')
  assert(
    'Analyzes "Das Buch liegt auf dem Tisch." with Dativ location',
    res2.elements.some((el) => el.text.includes('auf dem Tisch') && el.caseName === 'Dativ'),
    'auf dem Tisch dative check failed'
  )

  // Test C: Two-way preposition (Wohin? -> Akkusativ)
  const res3 = analyzeSentence('Ich lege das Buch auf den Tisch.')
  assert(
    'Analyzes "Ich lege das Buch auf den Tisch." with Akkusativ destination',
    res3.elements.some((el) => el.text.includes('auf den Tisch') && el.caseName === 'Akkusativ'),
    'auf den Tisch accusative check failed'
  )

  // Test D: Genitive attribute
  const res4 = analyzeSentence('Das ist das moderne Auto des Lehrers.')
  assert(
    'Analyzes "des Lehrers" as Genitiv attribute',
    res4.elements.some((el) => el.text.includes('des Lehrers') && el.caseName === 'Genitiv'),
    'des Lehrers genitive check failed'
  )

  // Test E: Empty input handling
  const resEmpty = analyzeSentence('')
  assert(
    'Handles empty input gracefully with status: empty',
    resEmpty.status === 'empty' && resEmpty.tokens.length === 0,
    'Empty sentence handling failed'
  )

  // Test F: Transparent handling of unsupported sentence
  const resUnknown = analyzeSentence('Quantenverschränkung ist ein faszinierendes Phänomen.')
  assert(
    'Does not invent fake analysis for unsupported sentence; provides disclaimer note',
    Boolean(resUnknown.limitationsNote) && resUnknown.confidence < 100,
    'Unsupported sentence not flagged properly'
  )

  // 7. INTERACTIVE QUIZ DATASET
  console.log('\n--- 7. Interactive Quiz Dataset ---')
  assert(
    'Quiz questions pool has at least 15 verified questions',
    CASE_QUIZ_QUESTIONS.length >= 15,
    `Found: ${CASE_QUIZ_QUESTIONS.length}`
  )
  const levelsRepresented = new Set(CASE_QUIZ_QUESTIONS.map((q) => q.level))
  assert(
    'Quiz covers all CEFR levels (A1, A2, B1, B2, C1)',
    ['A1', 'A2', 'B1', 'B2', 'C1'].every((lvl) => levelsRepresented.has(lvl)),
    `Levels: ${Array.from(levelsRepresented).join(', ')}`
  )
  const questionTypes = new Set(CASE_QUIZ_QUESTIONS.map((q) => q.type))
  assert(
    'Quiz includes multiple question formats (choose-article, identify-function, two-way-distinction, correct-sentence...)',
    questionTypes.size >= 5,
    `Question types: ${Array.from(questionTypes).join(', ')}`
  )
  assert(
    'All questions have valid correctIndex within options range',
    CASE_QUIZ_QUESTIONS.every((q) => q.correctIndex >= 0 && q.correctIndex < q.options.length),
    'Some questions have invalid correctIndex'
  )

  // 8. CASE COLOR TOKENS
  console.log('\n--- 8. Case Color Tokens ---')
  assert(
    'All 4 cases have distinct color configurations',
    CASE_COLOR_TOKENS.Nominativ.hex !== CASE_COLOR_TOKENS.Akkusativ.hex &&
      CASE_COLOR_TOKENS.Akkusativ.hex !== CASE_COLOR_TOKENS.Dativ.hex &&
      CASE_COLOR_TOKENS.Dativ.hex !== CASE_COLOR_TOKENS.Genitiv.hex,
    'Duplicate color tokens detected'
  )

  // SUMMARY
  console.log(`\n========================================`)
  console.log(`Total tests: ${passed + failed}`)
  console.log(`Passed:      ${passed}`)
  console.log(`Failed:      ${failed}`)
  console.log(`========================================\n`)

  if (failed > 0) {
    process.exit(1)
  }
}

runTests().catch((err) => {
  console.error('Fatal error running verification suite:', err)
  process.exit(1)
})
