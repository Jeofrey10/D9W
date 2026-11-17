import { GrammaticalCase, SyntacticFunction } from '@/features/case-translator/types/caseTranslator.types'
import { CefrLevel } from '@/types/learning'

export interface CaseSentenceExample {
  id: string
  german: string
  english: string
  level: CefrLevel
  patternId: string
  elements: {
    text: string
    role: SyntacticFunction
    roleLabel: string
    caseName?: GrammaticalCase
    explanation: string
  }[]
  overallExplanation: string
}

export const VERIFIED_CASE_EXAMPLES: CaseSentenceExample[] = [
  {
    id: 'ex-01',
    german: 'Der Mann gibt dem Kind einen Apfel.',
    english: 'The man gives the child an apple.',
    level: 'A1',
    patternId: 'PAT-02',
    elements: [
      {
        text: 'Der Mann',
        role: 'subject',
        roleLabel: 'Subjekt',
        caseName: 'Nominativ',
        explanation: 'Performs the action of giving (Wer gibt? -> Der Mann). Masculine nominative: "der".',
      },
      {
        text: 'gibt',
        role: 'finite-verb',
        roleLabel: 'Finites Verb',
        explanation: 'Conjugated verb (geben), 3rd person singular in Position 2.',
      },
      {
        text: 'dem Kind',
        role: 'indirect-object',
        roleLabel: 'Indirektes Objekt (Empfänger)',
        caseName: 'Dativ',
        explanation: 'Recipient of the gift (Wem gibt er etwas? -> dem Kind). Neuter dative: "dem".',
      },
      {
        text: 'einen Apfel',
        role: 'direct-object',
        roleLabel: 'Direktes Objekt (Sache)',
        caseName: 'Akkusativ',
        explanation: 'Thing being given (Was gibt er? -> einen Apfel). Masculine accusative: "einen".',
      },
    ],
    overallExplanation:
      'Classic three-part German structure: Subject (Nominativ: Der Mann) + Verb (gibt) + Indirect Recipient (Dativ: dem Kind) + Direct Object (Akkusativ: einen Apfel).',
  },
  {
    id: 'ex-02',
    german: 'Die Frau kauft einen neuen Schreibtisch.',
    english: 'The woman is buying a new desk.',
    level: 'A1',
    patternId: 'PAT-01',
    elements: [
      {
        text: 'Die Frau',
        role: 'subject',
        roleLabel: 'Subjekt',
        caseName: 'Nominativ',
        explanation: 'Subject performing the purchase (Wer kauft? -> Die Frau). Feminine nominative: "die".',
      },
      {
        text: 'kauft',
        role: 'finite-verb',
        roleLabel: 'Finites Verb',
        explanation: 'Conjugated verb (kaufen) in Position 2.',
      },
      {
        text: 'einen neuen Schreibtisch',
        role: 'direct-object',
        roleLabel: 'Direktes Objekt',
        caseName: 'Akkusativ',
        explanation: 'Thing purchased (Was kauft sie? -> einen neuen Schreibtisch). Masculine accusative takes "-en": "einen neuen".',
      },
    ],
    overallExplanation:
      '"Schreibtisch" is masculine (der Schreibtisch). As the direct object of "kaufen", the indefinite article shifts to "einen" and the adjective takes "-en".',
  },
  {
    id: 'ex-03',
    german: 'Der Arzt hilft dem verletzten Patienten.',
    english: 'The doctor helps the injured patient.',
    level: 'A1',
    patternId: 'PAT-04',
    elements: [
      {
        text: 'Der Arzt',
        role: 'subject',
        roleLabel: 'Subjekt',
        caseName: 'Nominativ',
        explanation: 'Subject performing the medical assistance (Wer hilft? -> Der Arzt).',
      },
      {
        text: 'hilft',
        role: 'finite-verb',
        roleLabel: 'Dativ-Verb',
        explanation: '"helfen" is a pure dative verb that governs an indirect dative object.',
      },
      {
        text: 'dem verletzten Patienten',
        role: 'indirect-object',
        roleLabel: 'Dativobjekt',
        caseName: 'Dativ',
        explanation: 'Person being helped (Wem hilft der Arzt? -> dem Patienten). Masculine dative article: "dem". "Patient" is a weak masculine noun taking "-en".',
      },
    ],
    overallExplanation:
      'Unlike English "help someone", German "helfen" strictly demands Dativ. The article becomes "dem" and the adjective takes "-en".',
  },
  {
    id: 'ex-04',
    german: 'Das Buch liegt auf dem Tisch.',
    english: 'The book is lying on the table.',
    level: 'A2',
    patternId: 'PAT-07',
    elements: [
      {
        text: 'Das Buch',
        role: 'subject',
        roleLabel: 'Subjekt',
        caseName: 'Nominativ',
        explanation: 'The item resting on the surface (Was liegt? -> Das Buch).',
      },
      {
        text: 'liegt',
        role: 'finite-verb',
        roleLabel: 'Positionsverb',
        explanation: 'Static position verb denoting stationary rest.',
      },
      {
        text: 'auf dem Tisch',
        role: 'prepositional-object',
        roleLabel: 'Ort (Wo?)',
        caseName: 'Dativ',
        explanation: 'Two-way preposition "auf" indicating static location (Wo liegt das Buch?). Masculine dative: "dem Tisch".',
      },
    ],
    overallExplanation:
      'Wechselpräposition "auf" with static location (Wo?) triggers DATIV. Masculine "der Tisch" becomes "dem Tisch".',
  },
  {
    id: 'ex-05',
    german: 'Ich lege das Buch auf den Tisch.',
    english: 'I lay the book onto the table.',
    level: 'A2',
    patternId: 'PAT-08',
    elements: [
      {
        text: 'Ich',
        role: 'subject',
        roleLabel: 'Subjekt',
        caseName: 'Nominativ',
        explanation: 'Subject initiating the action.',
      },
      {
        text: 'lege',
        role: 'finite-verb',
        roleLabel: 'Aktionsverb',
        explanation: 'Directional action verb denoting active placement.',
      },
      {
        text: 'das Buch',
        role: 'direct-object',
        roleLabel: 'Direktes Objekt',
        caseName: 'Akkusativ',
        explanation: 'Object being moved (Was lege ich? -> das Buch). Neuter accusative: "das".',
      },
      {
        text: 'auf den Tisch',
        role: 'prepositional-object',
        roleLabel: 'Zielrichtung (Wohin?)',
        caseName: 'Akkusativ',
        explanation: 'Two-way preposition "auf" indicating destination/directional movement (Wohin lege ich das Buch?). Masculine accusative: "den Tisch".',
      },
    ],
    overallExplanation:
      'Compare with "Das Buch liegt auf dem Tisch": Here, "legen" is a directional action (Wohin?), so "auf" governs the AKKUSATIV ("den Tisch").',
  },
  {
    id: 'ex-06',
    german: 'Wir fahren mit dem schnellen Zug.',
    english: 'We are traveling with the fast train.',
    level: 'A2',
    patternId: 'PAT-06',
    elements: [
      {
        text: 'Wir',
        role: 'subject',
        roleLabel: 'Subjekt',
        caseName: 'Nominativ',
        explanation: 'Subject pronoun (1st person plural).',
      },
      {
        text: 'fahren',
        role: 'finite-verb',
        roleLabel: 'Finites Verb',
        explanation: 'Verb of travel.',
      },
      {
        text: 'mit dem schnellen Zug',
        role: 'prepositional-object',
        roleLabel: 'Dativ-Präpositionalphrase',
        caseName: 'Dativ',
        explanation: '"mit" is a pure dative preposition. Masculine "der Zug" becomes "dem Zug", with dative adjective ending "-en".',
      },
    ],
    overallExplanation:
      '"mit" ALWAYS triggers the Dativ case, regardless of the verb or context.',
  },
  {
    id: 'ex-07',
    german: 'Das ist das moderne Auto des Lehrers.',
    english: 'That is the modern car of the teacher.',
    level: 'B1',
    patternId: 'PAT-09',
    elements: [
      {
        text: 'Das',
        role: 'subject',
        roleLabel: 'Demonstrativpronomen (Subjekt)',
        caseName: 'Nominativ',
        explanation: 'Demonstrative subject pronoun.',
      },
      {
        text: 'ist',
        role: 'finite-verb',
        roleLabel: 'Kopulaverb (sein)',
        explanation: 'Linking verb.',
      },
      {
        text: 'das moderne Auto',
        role: 'predicate-nominative',
        roleLabel: 'Gleichsetzungsnominativ',
        caseName: 'Nominativ',
        explanation: 'Predicate noun after "sein" remains in Nominativ.',
      },
      {
        text: 'des Lehrers',
        role: 'genitive-attribute',
        roleLabel: 'Genitivattribut (Besitz)',
        caseName: 'Genitiv',
        explanation: 'Genitive attribute expressing possession (Wessen Auto? -> Des Lehrers). Masculine genitive: "des" + noun ending "-s".',
      },
    ],
    overallExplanation:
      'The Genitiv expresses possession in formal/written German. Masculine "der Lehrer" becomes "des Lehrers".',
  },
  {
    id: 'ex-08',
    german: 'Trotz des starken Regens machten wir einen Spaziergang.',
    english: 'Despite the heavy rain, we went for a walk.',
    level: 'B1',
    patternId: 'PAT-10',
    elements: [
      {
        text: 'Trotz des starken Regens',
        role: 'prepositional-object',
        roleLabel: 'Genitiv-Präpositionalphrase',
        caseName: 'Genitiv',
        explanation: '"trotz" is a standard genitive preposition. Masculine "der Regen" takes "des" and noun ending "-s".',
      },
      {
        text: 'machten',
        role: 'finite-verb',
        roleLabel: 'Finites Verb',
        explanation: 'Präteritum verb in Position 2 following the introductory prepositional phrase.',
      },
      {
        text: 'wir',
        role: 'subject',
        roleLabel: 'Subjekt (Inversion)',
        caseName: 'Nominativ',
        explanation: 'Subject following the verb due to V2 word order.',
      },
      {
        text: 'einen Spaziergang',
        role: 'direct-object',
        roleLabel: 'Direktes Objekt',
        caseName: 'Akkusativ',
        explanation: 'Accusative object of "machen" (Was machten wir? -> einen Spaziergang).',
      },
    ],
    overallExplanation:
      '"trotz" standardly governs the Genitiv ("des starken Regens"). Note the V2 verb position ("machten") preceding the subject ("wir").',
  },
  {
    id: 'ex-09',
    german: 'Während des langen Vortrags machten die Studenten viele Notizen.',
    english: 'During the long lecture, the students took many notes.',
    level: 'B2',
    patternId: 'PAT-10',
    elements: [
      {
        text: 'Während des langen Vortrags',
        role: 'prepositional-object',
        roleLabel: 'Genitiv-Temporalphrase',
        caseName: 'Genitiv',
        explanation: '"während" governs the Genitiv case. Masculine "der Vortrag" becomes "des langen Vortrags".',
      },
      {
        text: 'machten',
        role: 'finite-verb',
        roleLabel: 'Finites Verb',
        explanation: 'Conjugated verb in Position 2.',
      },
      {
        text: 'die Studenten',
        role: 'subject',
        roleLabel: 'Subjekt (Plural)',
        caseName: 'Nominativ',
        explanation: 'Plural subject performing the note-taking.',
      },
      {
        text: 'viele Notizen',
        role: 'direct-object',
        roleLabel: 'Akkusativobjekt (Plural)',
        caseName: 'Akkusativ',
        explanation: 'Direct object of "machen" in plural accusative.',
      },
    ],
    overallExplanation:
      'Temporal Genitive preposition "während" with masculine noun "Vortrag" ("des langen Vortrags").',
  },
  {
    id: 'ex-10',
    german: 'Die Umsetzung des Beschlusses bedarf der ausdrücklichen Genehmigung.',
    english: 'The implementation of the resolution requires express approval.',
    level: 'C1',
    patternId: 'PAT-09',
    elements: [
      {
        text: 'Die Umsetzung',
        role: 'subject',
        roleLabel: 'Subjekt (Feminin)',
        caseName: 'Nominativ',
        explanation: 'Abstract feminine noun functioning as grammatical subject.',
      },
      {
        text: 'des Beschlusses',
        role: 'genitive-attribute',
        roleLabel: 'Genitivattribut',
        caseName: 'Genitiv',
        explanation: 'Specifies what is being implemented (Wessen Umsetzung?). Masculine genitive with "-es": "des Beschlusses".',
      },
      {
        text: 'bedarf',
        role: 'finite-verb',
        roleLabel: 'Genitiv-Verb',
        explanation: '"bedürfen" is an advanced formal verb that governs an object in the Genitiv.',
      },
      {
        text: 'der ausdrücklichen Genehmigung',
        role: 'direct-object',
        roleLabel: 'Genitivobjekt',
        caseName: 'Genitiv',
        explanation: 'Governed by the verb "bedürfen". Feminine genitive: "der Genehmigung".',
      },
    ],
    overallExplanation:
      'Sophisticated C1 sentence with two distinct Genitive constructions: a possessive attribute ("des Beschlusses") and a genitive verb complement ("der Genehmigung").',
  },
]

export function findCaseExampleById(id: string): CaseSentenceExample | undefined {
  return VERIFIED_CASE_EXAMPLES.find((e) => e.id === id)
}
