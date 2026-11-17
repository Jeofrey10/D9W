import { CaseQuizQuestion } from '@/features/case-translator/types/caseTranslator.types'

export const CASE_QUIZ_QUESTIONS: CaseQuizQuestion[] = [
  // --- A1 QUESTIONS ---
  {
    id: 'cq-a1-01',
    level: 'A1',
    type: 'choose-article',
    targetCase: 'Akkusativ',
    prompt: 'Ergänzen Sie den passenden unbestimmten Artikel im Satz: „Ich kaufe _____ neuen Computer.“',
    sentenceWithBlank: 'Ich kaufe _____ neuen Computer.',
    options: ['ein', 'einen', 'einem', 'eines'],
    correctIndex: 1,
    correctAnswerText: 'einen',
    explanation:
      '"Computer" is masculine (der Computer). In the accusative case as the direct object of "kaufen", the masculine indefinite article is "einen".',
    grammarConcept: 'Masculine Accusative Direct Object',
    hint: 'der Computer -> Akkusativ direct object',
  },
  {
    id: 'cq-a1-02',
    level: 'A1',
    type: 'identify-function',
    targetCase: 'Nominativ',
    prompt: 'Welche grammatikalische Funktion hat „Der Lehrer“ im Satz: „Der Lehrer erklärt die Aufgabe.“?',
    options: ['Subjekt (Nominativ)', 'Direktes Objekt (Akkusativ)', 'Indirektes Objekt (Dativ)', 'Genitivattribut'],
    correctIndex: 0,
    correctAnswerText: 'Subjekt (Nominativ)',
    explanation:
      '"Der Lehrer" is the subject performing the action of explaining (Wer erklärt? -> Der Lehrer).',
    grammarConcept: 'Subject Identification',
  },
  {
    id: 'cq-a1-03',
    level: 'A1',
    type: 'choose-article',
    targetCase: 'Dativ',
    prompt: 'Ergänzen Sie den Artikel: „Der Arzt hilft _____ kranken Kind.“',
    sentenceWithBlank: 'Der Arzt hilft _____ kranken Kind.',
    options: ['das', 'den', 'dem', 'des'],
    correctIndex: 2,
    correctAnswerText: 'dem',
    explanation:
      '"Kind" is neuter (das Kind). The verb "helfen" strictly governs the Dativ case (Wem hilft der Arzt? -> dem Kind).',
    grammarConcept: 'Dative Verb Government',
    hint: 'helfen + Dativ; das Kind in Dativ',
  },
  {
    id: 'cq-a1-04',
    level: 'A1',
    type: 'choose-preposition',
    targetCase: 'Dativ',
    prepositionCategory: 'dative',
    prompt: 'Welche Präposition passt hier? „Wir fahren jeden Tag _____ dem Bus zur Arbeit.“',
    sentenceWithBlank: 'Wir fahren jeden Tag _____ dem Bus zur Arbeit.',
    options: ['ohne', 'durch', 'mit', 'für'],
    correctIndex: 2,
    correctAnswerText: 'mit',
    explanation:
      '"mit" is a pure dative preposition used for vehicles and instruments (mit dem Bus). "durch", "für", and "ohne" require the accusative.',
    grammarConcept: 'Dative Means of Transport',
  },
  {
    id: 'cq-a1-05',
    level: 'A1',
    type: 'correct-sentence',
    targetCase: 'Nominativ',
    prompt: 'Welcher Satz ist grammatikalisch korrekt?',
    options: [
      'Er ist einen guter Arzt.',
      'Er ist ein guter Arzt.',
      'Er ist einem guten Arzt.',
      'Er ist eines guten Arztes.',
    ],
    correctIndex: 1,
    correctAnswerText: 'Er ist ein guter Arzt.',
    explanation:
      'The verb "sein" is a copula verb. It takes a Predicate Nominative (Gleichsetzungsnominativ), NOT an accusative object. Therefore "ein guter Arzt" is correct.',
    grammarConcept: 'Predicate Nominative with "sein"',
  },

  // --- A2 QUESTIONS ---
  {
    id: 'cq-a2-01',
    level: 'A2',
    type: 'two-way-distinction',
    targetCase: 'Dativ',
    prepositionCategory: 'two-way',
    prompt: 'Das Buch liegt _____ dem Tisch. Welcher Fall liegt vor?',
    options: ['Dativ (Wo? - statische Position)', 'Akkusativ (Wohin? - Bewegung zum Ziel)', 'Nominativ (Subjekt)', 'Genitiv (Besitz)'],
    correctIndex: 0,
    correctAnswerText: 'Dativ (Wo? - statische Position)',
    explanation:
      '"liegen" expresses stationary rest / location (Wo liegt das Buch?). Two-way prepositions with "Wo?" demand the DATIV case.',
    grammarConcept: 'Wechselpräpositionen Location (Wo?)',
  },
  {
    id: 'cq-a2-02',
    level: 'A2',
    type: 'two-way-distinction',
    targetCase: 'Akkusativ',
    prepositionCategory: 'two-way',
    prompt: '„Ich lege das Buch auf _____ Tisch.“ Welcher Artikel ist korrekt?',
    sentenceWithBlank: 'Ich lege das Buch auf _____ Tisch.',
    options: ['der', 'den', 'dem', 'des'],
    correctIndex: 1,
    correctAnswerText: 'den',
    explanation:
      '"legen" expresses active placement into a new position (Wohin lege ich das Buch?). Two-way prepositions answering "Wohin?" demand the AKKUSATIV case ("den Tisch").',
    grammarConcept: 'Wechselpräpositionen Destination (Wohin?)',
  },
  {
    id: 'cq-a2-03',
    level: 'A2',
    type: 'choose-article',
    targetCase: 'Dativ',
    prompt: '„Sie schenkt _____ Mutter eine schöne Blume.“ Welches Pronomen / welcher Artikel gehört hierher?',
    sentenceWithBlank: 'Sie schenkt _____ Mutter eine schöne Blume.',
    options: ['ihre', 'ihrer', 'ihren', 'ihrem'],
    correctIndex: 1,
    correctAnswerText: 'ihrer',
    explanation:
      '"schenken" is a dual-object verb. The recipient ("Mutter", feminine) must be in Dativ. Feminine dative possessive: "ihrer Mutter".',
    grammarConcept: 'Dual-Object Recipient in Dativ',
  },
  {
    id: 'cq-a2-04',
    level: 'A2',
    type: 'choose-preposition',
    targetCase: 'Akkusativ',
    prepositionCategory: 'accusative',
    prompt: 'Welche Präposition verlangt IMMER den Akkusativ?',
    options: ['nach', 'ohne', 'aus', 'mit'],
    correctIndex: 1,
    correctAnswerText: 'ohne',
    explanation:
      '"ohne" is a pure accusative preposition (DOGFU: durch, ohne, gegen, für, um). "nach", "aus", and "mit" are pure dative prepositions.',
    grammarConcept: 'Pure Accusative Prepositions',
  },
  {
    id: 'cq-a2-05',
    level: 'A2',
    type: 'fill-blank',
    targetCase: 'Dativ',
    prompt: 'Ergänzen Sie das passende Personalpronomen: „Können Sie _____ bitte die Uhrzeit sagen?“',
    sentenceWithBlank: 'Können Sie _____ bitte die Uhrzeit sagen?',
    options: ['mich', 'mir', 'ich', 'meiner'],
    correctIndex: 1,
    correctAnswerText: 'mir',
    explanation:
      'The recipient of the information ("sagen") is an indirect object and takes the Dativ pronoun "mir" (Wem sagen? -> mir).',
    grammarConcept: 'Dative Personal Pronouns',
  },

  // --- B1 QUESTIONS ---
  {
    id: 'cq-b1-01',
    level: 'B1',
    type: 'identify-case',
    targetCase: 'Genitiv',
    prompt: 'Welchen Kasus hat „des neuen Lehrers“ im Satz: „Das ist das moderne Auto des neuen Lehrers.“?',
    options: ['Nominativ', 'Akkusativ', 'Dativ', 'Genitiv'],
    correctIndex: 3,
    correctAnswerText: 'Genitiv',
    explanation:
      '"des neuen Lehrers" is a genitive attribute expressing possession (Wessen Auto? -> Des neuen Lehrers). Masculine genitive uses "des" and adds "-s" to the noun.',
    grammarConcept: 'Genitive Attribute of Possession',
  },
  {
    id: 'cq-b1-02',
    level: 'B1',
    type: 'choose-article',
    targetCase: 'Genitiv',
    prompt: 'Ergänzen Sie den Artikel: „Trotz _____ schlechten Wetters machten wir eine Wanderung.“',
    sentenceWithBlank: 'Trotz _____ schlechten Wetters machten wir eine Wanderung.',
    options: ['dem', 'den', 'des', 'das'],
    correctIndex: 2,
    correctAnswerText: 'des',
    explanation:
      '"trotz" is a standard genitive preposition in German. Neuter "das Wetter" becomes "des schlechten Wetters".',
    grammarConcept: 'Genitive Preposition "trotz"',
  },
  {
    id: 'cq-b1-03',
    level: 'B1',
    type: 'fill-blank',
    targetCase: 'Dativ',
    prompt: 'Ergänzen Sie das Nomen mit der korrekten Endung im Dativ Plural: „Er schenkt den _____ (Kinder) Spielzeug.“',
    sentenceWithBlank: 'Er schenkt den _____ Spielzeug.',
    options: ['Kinder', 'Kindern', 'Kind', 'Kindes'],
    correctIndex: 1,
    correctAnswerText: 'Kindern',
    explanation:
      'In Dativ Plural, all nouns add an extra "-n" or "-en" unless they already end in -n or -s (Kinder -> Kindern).',
    grammarConcept: 'Dative Plural +n Rule',
  },
  {
    id: 'cq-b1-04',
    level: 'B1',
    type: 'two-way-distinction',
    targetCase: 'Dativ',
    prepositionCategory: 'two-way',
    prompt: '„Der Hund läuft im Garten herum.“ Warum steht hier Dativ („im Garten“)?',
    options: [
      'Weil der Hund sich innerhalb eines festen Ortes bewegt (kein Zielwechsel, Wo?).',
      'Weil „laufen“ immer den Dativ verlangt.',
      'Weil „im“ immer Akkusativ bedeutet.',
      'Weil „der Garten“ feminin ist.',
    ],
    correctIndex: 0,
    correctAnswerText: 'Weil der Hund sich innerhalb eines festen Ortes bewegt (kein Zielwechsel, Wo?).',
    explanation:
      'Physical movement inside a location without crossing boundaries or targeting a new destination answers "Wo?" and stays in DATIV (in dem Garten = im Garten). Movement is NOT always accusative!',
    grammarConcept: 'Movement within Location (Wo? vs Wohin?)',
  },
  {
    id: 'cq-b1-05',
    level: 'B1',
    type: 'choose-preposition',
    targetCase: 'Genitiv',
    prepositionCategory: 'genitive',
    prompt: 'Welche Präposition verlangt standardmäßig den Genitiv?',
    options: ['wegen', 'mit', 'ohne', 'aus'],
    correctIndex: 0,
    correctAnswerText: 'wegen',
    explanation:
      '"wegen" governs the Genitiv in standard German ("wegen des Regens"). "mit" and "aus" take Dativ; "ohne" takes Akkusativ.',
    grammarConcept: 'Genitive Preposition "wegen"',
  },

  // --- B2 QUESTIONS ---
  {
    id: 'cq-b2-01',
    level: 'B2',
    type: 'choose-article',
    targetCase: 'Genitiv',
    prompt: '„Während _____ Sommerferien reiste die Familie nach Italien.“ Welcher Artikel ist korrekt?',
    sentenceWithBlank: 'Während _____ Sommerferien reiste die Familie nach Italien.',
    options: ['die', 'der', 'den', 'des'],
    correctIndex: 1,
    correctAnswerText: 'der',
    explanation:
      '"während" governs the Genitiv. Plural "die Sommerferien" takes the plural genitive article "der".',
    grammarConcept: 'Genitive Plural with "während"',
  },
  {
    id: 'cq-b2-02',
    level: 'B2',
    type: 'correct-sentence',
    targetCase: 'Dativ',
    prompt: 'Welcher Satz enthält das korrekte Rezipienten-Pronomen?',
    options: [
      'Der Manager vertraut ihn blind.',
      'Der Manager vertraut ihm blind.',
      'Der Manager vertraut er blind.',
      'Der Manager vertraut seiner blind.',
    ],
    correctIndex: 1,
    correctAnswerText: 'Der Manager vertraut ihm blind.',
    explanation:
      '"vertrauen" is a dative verb (Wem vertraut der Manager? -> ihm).',
    grammarConcept: 'Advanced Dative Verb "vertrauen"',
  },
  {
    id: 'cq-b2-03',
    level: 'B2',
    type: 'identify-case',
    targetCase: 'Genitiv',
    prompt: 'Welche Endung erhält das maskuline Nomen im Genitiv: „Das Dach des _____ (Haus)“?',
    options: ['Hauss', 'Hauses', 'Hausen', 'Hause'],
    correctIndex: 1,
    correctAnswerText: 'Hauses',
    explanation:
      'Nouns ending in sibilants (-s, -ss, -ß, -z) and monosyllabic nouns compulsory take "-es" in the Genitive: des Hauses.',
    grammarConcept: 'Noun Ending -es in Genitive',
  },

  // --- C1 QUESTIONS ---
  {
    id: 'cq-c1-01',
    level: 'C1',
    type: 'identify-case',
    targetCase: 'Genitiv',
    prompt: 'Welcher Kasus wird vom Verb „bedürfen“ im Satz gefordert: „Dieses Vorhaben bedarf gründlicher Prüfung.“?',
    options: ['Nominativ', 'Akkusativ', 'Dativ', 'Genitiv'],
    correctIndex: 3,
    correctAnswerText: 'Genitiv',
    explanation:
      '"bedürfen" is a formal academic/literary verb that strictly governs an object in the Genitiv case ("gründlicher Prüfung").',
    grammarConcept: 'C1 Genitive Verb Valency',
  },
  {
    id: 'cq-c1-02',
    level: 'C1',
    type: 'correct-sentence',
    targetCase: 'Genitiv',
    prompt: 'Welcher Satz verwendet die gehobene Genitiv-Konstruktion korrekt?',
    options: [
      'Man beschuldigte ihn des schweren Betruges.',
      'Man beschuldigte ihm dem schweren Betrug.',
      'Man beschuldigte ihn den schweren Betrug.',
      'Man beschuldigte seiner den schweren Betrug.',
    ],
    correctIndex: 0,
    correctAnswerText: 'Man beschuldigte ihn des schweren Betruges.',
    explanation:
      'The verb "beschuldigen" requires an accusative object for the accused person ("ihn") and a genitive object for the alleged offense ("des schweren Betruges").',
    grammarConcept: 'C1 Double Valency: Akkusativ + Genitiv',
  },
]

export function getQuestionsByLevel(level: 'All' | 'A1' | 'A2' | 'B1' | 'B2' | 'C1'): CaseQuizQuestion[] {
  if (level === 'All') return CASE_QUIZ_QUESTIONS
  return CASE_QUIZ_QUESTIONS.filter((q) => q.level === level)
}

export function getQuestionsByCase(targetCase: 'All' | 'Nominativ' | 'Akkusativ' | 'Dativ' | 'Genitiv'): CaseQuizQuestion[] {
  if (targetCase === 'All') return CASE_QUIZ_QUESTIONS
  return CASE_QUIZ_QUESTIONS.filter((q) => q.targetCase === targetCase)
}
