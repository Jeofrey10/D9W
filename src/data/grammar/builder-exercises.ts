import { CaseSentenceBuilderExercise } from '@/features/case-translator/types/caseTranslator.types'

export const BUILDER_EXERCISES: CaseSentenceBuilderExercise[] = [
  {
    id: 'scb-01',
    level: 'A1',
    category: 'Geben (Dativ-Empfänger + Akkusativ-Objekt)',
    englishPrompt: 'I give the man the book.',
    targetGerman: 'Ich gebe dem Mann das Buch.',
    scrambledTiles: ['gebe', 'Ich', 'das Buch.', 'dem Mann'],
    acceptableOrders: [
      'Ich gebe dem Mann das Buch.',
      'Dem Mann gebe ich das Buch.',
    ],
    caseBreakdown: [
      {
        element: 'Ich',
        word: 'Ich',
        caseName: 'Nominativ',
        explanation: 'Subject performing the action of giving (Wer gibt? -> Ich).',
      },
      {
        element: 'dem Mann',
        word: 'dem Mann',
        caseName: 'Dativ',
        explanation: 'Recipient of the book (Wem gebe ich das Buch? -> dem Mann).',
      },
      {
        element: 'das Buch',
        word: 'das Buch',
        caseName: 'Akkusativ',
        explanation: 'Thing given (Was gebe ich dem Mann? -> das Buch).',
      },
    ],
    explanation:
      'Standard word order with two noun objects: Dativ precedes Akkusativ (dem Mann vor das Buch).',
  },
  {
    id: 'scb-02',
    level: 'A2',
    category: 'Wechselpräposition Destination (Wohin? -> Akkusativ)',
    englishPrompt: 'The father places the bottle onto the table.',
    targetGerman: 'Der Vater stellt die Flasche auf den Tisch.',
    scrambledTiles: ['stellt', 'Der Vater', 'auf den Tisch.', 'die Flasche'],
    acceptableOrders: ['Der Vater stellt die Flasche auf den Tisch.'],
    caseBreakdown: [
      {
        element: 'Der Vater',
        word: 'Der Vater',
        caseName: 'Nominativ',
        explanation: 'Subject in Nominativ performing the action (Wer stellt?).',
      },
      {
        element: 'die Flasche',
        word: 'die Flasche',
        caseName: 'Akkusativ',
        explanation: 'Direct object of "stellen" (Was stellt der Vater? -> die Flasche).',
      },
      {
        element: 'auf den Tisch',
        word: 'auf den Tisch',
        caseName: 'Akkusativ',
        explanation: 'Directional target (Wohin stellt er sie? -> auf den Tisch).',
      },
    ],
    explanation:
      '"stellen" is a directional action verb. "auf" governs the Akkusativ ("den Tisch").',
  },
  {
    id: 'scb-03',
    level: 'B1',
    category: 'Genitivattribut (Besitz)',
    englishPrompt: 'We are repairing the door of the old house.',
    targetGerman: 'Wir reparieren die Tür des alten Hauses.',
    scrambledTiles: ['reparieren', 'Wir', 'des alten Hauses.', 'die Tür'],
    acceptableOrders: ['Wir reparieren die Tür des alten Hauses.'],
    caseBreakdown: [
      {
        element: 'Wir',
        word: 'Wir',
        caseName: 'Nominativ',
        explanation: 'Subject pronoun in Nominativ.',
      },
      {
        element: 'die Tür',
        word: 'die Tür',
        caseName: 'Akkusativ',
        explanation: 'Direct object of "reparieren".',
      },
      {
        element: 'des alten Hauses',
        word: 'des alten Hauses',
        caseName: 'Genitiv',
        explanation: 'Genitive attribute indicating possession/origin (Wessen Tür? -> des alten Hauses).',
      },
    ],
    explanation:
      'Neuter noun "das Haus" adds "-es" in the genitive case, preceded by the genitive article "des".',
  },
]
