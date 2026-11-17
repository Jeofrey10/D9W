import { VerbValencyItem } from '@/features/case-translator/types/caseTranslator.types'

/**
 * 1. PURE ACCUSATIVE VERBS
 */
export const ACCUSATIVE_VERBS: VerbValencyItem[] = [
  {
    id: 'verb-akk-01',
    verb: 'haben',
    meaning: 'to have / possess',
    governedCase: 'Akkusativ',
    valencyPattern: 'haben + Akkusativ',
    exampleGerman: 'Ich habe einen neuen Laptop.',
    exampleEnglish: 'I have a new laptop.',
    level: 'A1',
  },
  {
    id: 'verb-akk-02',
    verb: 'brauchen',
    meaning: 'to need',
    governedCase: 'Akkusativ',
    valencyPattern: 'brauchen + Akkusativ',
    exampleGerman: 'Wir brauchen einen guten Plan.',
    exampleEnglish: 'We need a good plan.',
    level: 'A1',
  },
  {
    id: 'verb-akk-03',
    verb: 'sehen',
    meaning: 'to see',
    governedCase: 'Akkusativ',
    valencyPattern: 'sehen + Akkusativ',
    exampleGerman: 'Siehst du den Regenbogen?',
    exampleEnglish: 'Do you see the rainbow?',
    level: 'A1',
  },
  {
    id: 'verb-akk-04',
    verb: 'kaufen',
    meaning: 'to buy',
    governedCase: 'Akkusativ',
    valencyPattern: 'kaufen + Akkusativ',
    exampleGerman: 'Er kauft einen warmen Mantel.',
    exampleEnglish: 'He is buying a warm coat.',
    level: 'A1',
  },
  {
    id: 'verb-akk-05',
    verb: 'lesen',
    meaning: 'to read',
    governedCase: 'Akkusativ',
    valencyPattern: 'lesen + Akkusativ',
    exampleGerman: 'Ich lese den interessanten Artikel.',
    exampleEnglish: 'I am reading the interesting article.',
    level: 'A1',
  },
  {
    id: 'verb-akk-06',
    verb: 'finden',
    meaning: 'to find / consider',
    governedCase: 'Akkusativ',
    valencyPattern: 'finden + Akkusativ',
    exampleGerman: 'Ich finde diesen Vorschlag ausgezeichnet.',
    exampleEnglish: 'I find this suggestion excellent.',
    level: 'A2',
  },
  {
    id: 'verb-akk-07',
    verb: 'anrufen',
    meaning: 'to call (by telephone)',
    governedCase: 'Akkusativ',
    valencyPattern: 'anrufen + Akkusativ',
    exampleGerman: 'Ich rufe meinen Bruder morgen an.',
    exampleEnglish: 'I will call my brother tomorrow.',
    notes: 'Takes accusative in German, unlike English "call to someone".',
    level: 'A2',
  },
  {
    id: 'verb-akk-08',
    verb: 'kennen',
    meaning: 'to be acquainted with (person or place)',
    governedCase: 'Akkusativ',
    valencyPattern: 'kennen + Akkusativ',
    exampleGerman: 'Kennst du diesen berühmten Autor?',
    exampleEnglish: 'Do you know this famous author?',
    level: 'A2',
  },
  {
    id: 'verb-akk-09',
    verb: 'fragen',
    meaning: 'to ask (someone a question)',
    governedCase: 'Akkusativ',
    valencyPattern: 'fragen + Akkusativ',
    exampleGerman: 'Der Schüler fragt die Lehrerin.',
    exampleEnglish: 'The student asks the female teacher.',
    notes: 'Direct person being asked is Akkusativ.',
    level: 'A2',
  },
  {
    id: 'verb-akk-10',
    verb: 'lieben',
    meaning: 'to love',
    governedCase: 'Akkusativ',
    valencyPattern: 'lieben + Akkusativ',
    exampleGerman: 'Er liebt die deutsche Kultur.',
    exampleEnglish: 'He loves German culture.',
    level: 'A1',
  },
]

/**
 * 2. PURE DATIVE VERBS
 */
export const DATIVE_VERBS: VerbValencyItem[] = [
  {
    id: 'verb-dat-01',
    verb: 'helfen',
    meaning: 'to help',
    governedCase: 'Dativ',
    valencyPattern: 'helfen + Dativ',
    exampleGerman: 'Können Sie mir bitte helfen?',
    exampleEnglish: 'Could you please help me?',
    notes: 'Classic dative verb: Wem helfen Sie? -> mir.',
    level: 'A1',
  },
  {
    id: 'verb-dat-02',
    verb: 'danken',
    meaning: 'to thank',
    governedCase: 'Dativ',
    valencyPattern: 'danken + Dativ',
    exampleGerman: 'Ich danke Ihnen für Ihre Unterstützung.',
    exampleEnglish: 'I thank you for your support.',
    level: 'A1',
  },
  {
    id: 'verb-dat-03',
    verb: 'gefallen',
    meaning: 'to please / be appealing to',
    governedCase: 'Dativ',
    valencyPattern: 'gefallen + Dativ',
    exampleGerman: 'Die Stadt Berlin gefällt mir sehr.',
    exampleEnglish: 'I like the city of Berlin very much (Berlin pleases me).',
    notes: 'The thing liked is the subject (Nominativ), the person who likes it is in Dativ.',
    level: 'A2',
  },
  {
    id: 'verb-dat-04',
    verb: 'gehören',
    meaning: 'to belong to',
    governedCase: 'Dativ',
    valencyPattern: 'gehören + Dativ',
    exampleGerman: 'Dieses Wörterbuch gehört dem Studenten.',
    exampleEnglish: 'This dictionary belongs to the student.',
    level: 'A2',
  },
  {
    id: 'verb-dat-05',
    verb: 'antworten',
    meaning: 'to reply / answer to someone',
    governedCase: 'Dativ',
    valencyPattern: 'antworten + Dativ',
    exampleGerman: 'Er antwortet dem Professor sofort.',
    exampleEnglish: 'He replies to the professor immediately.',
    level: 'A2',
  },
  {
    id: 'verb-dat-06',
    verb: 'gratulieren',
    meaning: 'to congratulate',
    governedCase: 'Dativ',
    valencyPattern: 'gratulieren + Dativ',
    exampleGerman: 'Wir gratulieren dir herzlich zum Geburtstag.',
    exampleEnglish: 'We warmly congratulate you on your birthday.',
    level: 'A2',
  },
  {
    id: 'verb-dat-07',
    verb: 'schmecken',
    meaning: 'to taste good to',
    governedCase: 'Dativ',
    valencyPattern: 'schmecken + Dativ',
    exampleGerman: 'Das Essen schmeckt den Gästen wunderbar.',
    exampleEnglish: 'The meal tastes wonderful to the guests.',
    level: 'A1',
  },
  {
    id: 'verb-dat-08',
    verb: 'passen',
    meaning: 'to suit / fit someone',
    governedCase: 'Dativ',
    valencyPattern: 'passen + Dativ',
    exampleGerman: 'Passt Ihnen der Termin am Dienstag?',
    exampleEnglish: 'Does the appointment on Tuesday suit you?',
    level: 'A2',
  },
  {
    id: 'verb-dat-09',
    verb: 'vertrauen',
    meaning: 'to trust',
    governedCase: 'Dativ',
    valencyPattern: 'vertrauen + Dativ',
    exampleGerman: 'Ich vertraue meinem Arzt vollkommen.',
    exampleEnglish: 'I trust my doctor completely.',
    level: 'B1',
  },
  {
    id: 'verb-dat-10',
    verb: 'folgen',
    meaning: 'to follow',
    governedCase: 'Dativ',
    valencyPattern: 'folgen + Dativ',
    exampleGerman: 'Die Touristen folgen dem Stadtführer.',
    exampleEnglish: 'The tourists follow the tour guide.',
    level: 'B1',
  },
]

/**
 * 3. DUAL-OBJECT VERBS (Dativ Recipient + Akkusativ Thing)
 * Rule: Person = Dativ, Thing = Akkusativ.
 * "Der Vater gibt dem Sohn (Dat) den Schlüssel (Akk)."
 */
export const DUAL_OBJECT_VERBS: VerbValencyItem[] = [
  {
    id: 'verb-dual-01',
    verb: 'geben',
    meaning: 'to give',
    governedCase: 'Dativ + Akkusativ',
    valencyPattern: 'jemandem (Dat) etwas (Akk) geben',
    exampleGerman: 'Der Mann gibt dem Kind einen Apfel.',
    exampleEnglish: 'The man gives the child an apple.',
    notes: 'Recipient (dem Kind) in Dativ; thing given (einen Apfel) in Akkusativ.',
    level: 'A1',
  },
  {
    id: 'verb-dual-02',
    verb: 'schenken',
    meaning: 'to give as a gift',
    governedCase: 'Dativ + Akkusativ',
    valencyPattern: 'jemandem (Dat) etwas (Akk) schenken',
    exampleGerman: 'Sie schenkt ihrer Freundin eine Kette.',
    exampleEnglish: 'She gives her friend a necklace as a gift.',
    level: 'A2',
  },
  {
    id: 'verb-dual-03',
    verb: 'zeigen',
    meaning: 'to show',
    governedCase: 'Dativ + Akkusativ',
    valencyPattern: 'jemandem (Dat) etwas (Akk) zeigen',
    exampleGerman: 'Der Dozent zeigt den Studenten die Grafik.',
    exampleEnglish: 'The lecturer shows the students the graphic.',
    level: 'A2',
  },
  {
    id: 'verb-dual-04',
    verb: 'erklären',
    meaning: 'to explain',
    governedCase: 'Dativ + Akkusativ',
    valencyPattern: 'jemandem (Dat) etwas (Akk) erklären',
    exampleGerman: 'Er erklärt mir die Grammatikregel.',
    exampleEnglish: 'He explains the grammar rule to me.',
    level: 'B1',
  },
  {
    id: 'verb-dual-05',
    verb: 'leihen',
    meaning: 'to lend / borrow to someone',
    governedCase: 'Dativ + Akkusativ',
    valencyPattern: 'jemandem (Dat) etwas (Akk) leihen',
    exampleGerman: 'Kannst du mir deinen Kugelschreiber leihen?',
    exampleEnglish: 'Can you lend me your pen?',
    level: 'A2',
  },
  {
    id: 'verb-dual-06',
    verb: 'schicken / senden',
    meaning: 'to send',
    governedCase: 'Dativ + Akkusativ',
    valencyPattern: 'jemandem (Dat) etwas (Akk) schicken',
    exampleGerman: 'Ich schicke dem Kollegen die Datei.',
    exampleEnglish: 'I am sending the colleague the file.',
    level: 'A2',
  },
]

/**
 * 4. GENITIVE VERBS
 */
export const GENITIVE_VERBS: VerbValencyItem[] = [
  {
    id: 'verb-gen-01',
    verb: 'bedürfen',
    meaning: 'to require / necessitate',
    governedCase: 'Genitiv',
    valencyPattern: 'bedürfen + Genitiv',
    exampleGerman: 'Diese Angelegenheit bedarf gründlicher Prüfung.',
    exampleEnglish: 'This matter requires thorough examination.',
    notes: 'Formal academic/legal register.',
    level: 'C1',
  },
  {
    id: 'verb-gen-02',
    verb: 'gedenken',
    meaning: 'to commemorate / honor the memory of',
    governedCase: 'Genitiv',
    valencyPattern: 'gedenken + Genitiv',
    exampleGerman: 'Wir gedenken der Opfer des Krieges.',
    exampleEnglish: 'We commemorate the victims of the war.',
    level: 'B2',
  },
  {
    id: 'verb-gen-03',
    verb: 'beschuldigen / anklagen',
    meaning: 'to accuse of',
    governedCase: 'Genitiv',
    valencyPattern: 'jemanden (Akk) einer Sache (Gen) beschuldigen',
    exampleGerman: 'Man beschuldigt den Angeklagten des Betrugs.',
    exampleEnglish: 'The defendant is accused of fraud.',
    level: 'C1',
  },
]

export const ALL_VERBS: VerbValencyItem[] = [
  ...ACCUSATIVE_VERBS,
  ...DATIVE_VERBS,
  ...DUAL_OBJECT_VERBS,
  ...GENITIVE_VERBS,
]

export function findVerbValency(infinitiveOrConjugated: string): VerbValencyItem | undefined {
  const norm = infinitiveOrConjugated.trim().toLowerCase()
  return ALL_VERBS.find(
    (v) =>
      v.verb.toLowerCase() === norm ||
      v.valencyPattern.toLowerCase().includes(norm)
  )
}
