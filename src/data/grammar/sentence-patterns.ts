import {
  GrammaticalCase,
  SyntacticFunction,
} from '@/features/case-translator/types/caseTranslator.types'

export interface GrammarPatternDefinition {
  id: string
  name: string
  description: string
  patternRegexTemplate: string // Conceptual schema
  slots: {
    slotName: string
    syntacticRole: SyntacticFunction
    expectedCase?: GrammaticalCase
    explanation: string
  }[]
  exampleSentence: string
  exampleTranslation: string
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1'
}

export const SUPPORTED_GRAMMAR_PATTERNS: GrammarPatternDefinition[] = [
  {
    id: 'PAT-01',
    name: 'Subject + Transitive Verb + Direct Object',
    description:
      'Standard transitive sentence where a subject performs an action directly upon a direct object in the Akkusativ case.',
    patternRegexTemplate: '[Subject: Nom] + [Verb] + [Direct Object: Akk]',
    slots: [
      {
        slotName: 'Subject',
        syntacticRole: 'subject',
        expectedCase: 'Nominativ',
        explanation: 'The person, entity or animal initiating the action (Wer oder was?).',
      },
      {
        slotName: 'Verb',
        syntacticRole: 'finite-verb',
        explanation: 'Finite transitive verb agreeing with the subject.',
      },
      {
        slotName: 'Direct Object',
        syntacticRole: 'direct-object',
        expectedCase: 'Akkusativ',
        explanation: 'The object or person directly impacted/purchased/seen (Wen oder was?).',
      },
    ],
    exampleSentence: 'Der Mann kauft einen roten Apfel.',
    exampleTranslation: 'The man is buying a red apple.',
    level: 'A1',
  },
  {
    id: 'PAT-02',
    name: 'Subject + Dual-Object Verb + Indirect Object + Direct Object',
    description:
      'Classic ditransitive sentence (geben, schenken, zeigen) with recipient in Dativ and object in Akkusativ.',
    patternRegexTemplate: '[Subject: Nom] + [Verb] + [Recipient: Dat] + [Direct Object: Akk]',
    slots: [
      {
        slotName: 'Subject',
        syntacticRole: 'subject',
        expectedCase: 'Nominativ',
        explanation: 'The giver or presenter of the object.',
      },
      {
        slotName: 'Verb',
        syntacticRole: 'finite-verb',
        explanation: 'Ditransitive verb requiring both someone to receive and something to give.',
      },
      {
        slotName: 'Indirect Object',
        syntacticRole: 'indirect-object',
        expectedCase: 'Dativ',
        explanation: 'The recipient or beneficiary of the action (Wem?).',
      },
      {
        slotName: 'Direct Object',
        syntacticRole: 'direct-object',
        expectedCase: 'Akkusativ',
        explanation: 'The thing or entity being transferred (Wen oder was?).',
      },
    ],
    exampleSentence: 'Der Mann gibt dem Kind einen Apfel.',
    exampleTranslation: 'The man gives the child an apple.',
    level: 'A1',
  },
  {
    id: 'PAT-03',
    name: 'Subject + Copula Verb + Predicate Nominative',
    description:
      'Sentences with sein, werden, bleiben, or heißen where the complement renames the subject and remains in the Nominativ case.',
    patternRegexTemplate: '[Subject: Nom] + [Copula: sein/werden/bleiben] + [Predicate: Nom]',
    slots: [
      {
        slotName: 'Subject',
        syntacticRole: 'subject',
        expectedCase: 'Nominativ',
        explanation: 'The subject being identified or equated.',
      },
      {
        slotName: 'Verb',
        syntacticRole: 'finite-verb',
        explanation: 'Copulative linking verb establishing an identity equality.',
      },
      {
        slotName: 'Predicate Complement',
        syntacticRole: 'predicate-nominative',
        expectedCase: 'Nominativ',
        explanation: 'Renames the subject (Gleichsetzungsnominativ). NOT an accusative object!',
      },
    ],
    exampleSentence: 'Der Mann ist ein freundlicher Lehrer.',
    exampleTranslation: 'The man is a friendly teacher.',
    level: 'A1',
  },
  {
    id: 'PAT-04',
    name: 'Subject + Dative Verb + Dative Object',
    description:
      'Sentences where the verb exclusively governs an indirect/dative object (helfen, danken, gehören, gefallen, antworten).',
    patternRegexTemplate: '[Subject: Nom] + [Dative Verb] + [Object: Dat]',
    slots: [
      {
        slotName: 'Subject',
        syntacticRole: 'subject',
        expectedCase: 'Nominativ',
        explanation: 'The helper, entity or source of the state.',
      },
      {
        slotName: 'Verb',
        syntacticRole: 'finite-verb',
        explanation: 'Verb requiring a dative complement (Wem?).',
      },
      {
        slotName: 'Dative Object',
        syntacticRole: 'indirect-object',
        expectedCase: 'Dativ',
        explanation: 'The person/entity being assisted or thanked (Wem hilft das Subjekt?).',
      },
    ],
    exampleSentence: 'Der Arzt hilft dem kranken Patienten.',
    exampleTranslation: 'The doctor helps the sick patient.',
    level: 'A1',
  },
  {
    id: 'PAT-05',
    name: 'Prepositional Object with Pure Accusative Preposition',
    description:
      'Prepositional phrase governed by durch, für, gegen, ohne, or um strictly triggering Akkusativ.',
    patternRegexTemplate: '[Subject: Nom] + [Verb] + [Prep: durch/für/ohne] + [Noun: Akk]',
    slots: [
      {
        slotName: 'Subject',
        syntacticRole: 'subject',
        expectedCase: 'Nominativ',
        explanation: 'Subject initiating the action.',
      },
      {
        slotName: 'Preposition',
        syntacticRole: 'prepositional-object',
        expectedCase: 'Akkusativ',
        explanation: 'Pure accusative preposition demanding an accusative noun phrase.',
      },
    ],
    exampleSentence: 'Wir gehen ohne meinen besten Freund ins Theater.',
    exampleTranslation: 'We are going to the theater without my best friend.',
    level: 'A2',
  },
  {
    id: 'PAT-06',
    name: 'Prepositional Object with Pure Dative Preposition',
    description:
      'Prepositional phrase governed by aus, bei, mit, nach, seit, von, or zu strictly triggering Dativ.',
    patternRegexTemplate: '[Subject: Nom] + [Verb] + [Prep: mit/bei/nach] + [Noun: Dat]',
    slots: [
      {
        slotName: 'Subject',
        syntacticRole: 'subject',
        expectedCase: 'Nominativ',
        explanation: 'Subject of the clause.',
      },
      {
        slotName: 'Preposition',
        syntacticRole: 'prepositional-object',
        expectedCase: 'Dativ',
        explanation: 'Pure dative preposition demanding a dative noun phrase.',
      },
    ],
    exampleSentence: 'Wir fahren mit dem schnellen Zug nach Berlin.',
    exampleTranslation: 'We are traveling with the fast train to Berlin.',
    level: 'A2',
  },
  {
    id: 'PAT-07',
    name: 'Two-Way Preposition: Static Location (Wo? -> Dativ)',
    description:
      'Two-way preposition (an, auf, in, neben, etc.) combined with static/position verbs (liegen, stehen, sitzen, sein) indicating location.',
    patternRegexTemplate: '[Subject: Nom] + [Position Verb] + [Two-Way Prep] + [Location: Dat]',
    slots: [
      {
        slotName: 'Subject',
        syntacticRole: 'subject',
        expectedCase: 'Nominativ',
        explanation: 'The item or person located in space.',
      },
      {
        slotName: 'Location',
        syntacticRole: 'prepositional-object',
        expectedCase: 'Dativ',
        explanation: 'Answers "Wo?" (Where?) -> demands the Dativ case.',
      },
    ],
    exampleSentence: 'Das Buch liegt auf dem hölzernen Tisch.',
    exampleTranslation: 'The book is lying on the wooden table.',
    level: 'A2',
  },
  {
    id: 'PAT-08',
    name: 'Two-Way Preposition: Directional Destination (Wohin? -> Akkusativ)',
    description:
      'Two-way preposition combined with directional/action verbs (legen, stellen, setzen, gehen) indicating movement to a new target.',
    patternRegexTemplate: '[Subject: Nom] + [Action Verb] + [Direct Object: Akk] + [Two-Way Prep] + [Destination: Akk]',
    slots: [
      {
        slotName: 'Subject',
        syntacticRole: 'subject',
        expectedCase: 'Nominativ',
        explanation: 'The agent performing the placement.',
      },
      {
        slotName: 'Destination',
        syntacticRole: 'prepositional-object',
        expectedCase: 'Akkusativ',
        explanation: 'Answers "Wohin?" (Where to?) -> demands the Akkusativ case.',
      },
    ],
    exampleSentence: 'Ich lege das Buch auf den hölzernen Tisch.',
    exampleTranslation: 'I lay the book onto the wooden table.',
    level: 'A2',
  },
  {
    id: 'PAT-09',
    name: 'Noun Phrase with Genitive Attribute',
    description:
      'A primary noun accompanied by a post-positioned genitive noun phrase expressing ownership, origin or association.',
    patternRegexTemplate: '[Noun Phrase] + [Genitive Attribute: des/der + Noun]',
    slots: [
      {
        slotName: 'Head Noun',
        syntacticRole: 'subject',
        explanation: 'The possessed object or focus of the phrase.',
      },
      {
        slotName: 'Genitive Attribute',
        syntacticRole: 'genitive-attribute',
        expectedCase: 'Genitiv',
        explanation: 'Answers "Wessen?" (Whose?) -> demands the Genitiv case.',
      },
    ],
    exampleSentence: 'Das ist das moderne Auto des neuen Lehrers.',
    exampleTranslation: 'That is the modern car of the new teacher.',
    level: 'B1',
  },
  {
    id: 'PAT-10',
    name: 'Prepositional Phrase with Pure Genitive Preposition',
    description:
      'Sentence governed by während, wegen, trotz, innerhalb, or außerhalb requiring Genitiv in standard German.',
    patternRegexTemplate: '[Prep: trotz/wegen/während] + [Noun: Gen] + [Clause]',
    slots: [
      {
        slotName: 'Genitive Preposition',
        syntacticRole: 'prepositional-object',
        expectedCase: 'Genitiv',
        explanation: 'Demands genitive case in standard/formal German.',
      },
    ],
    exampleSentence: 'Trotz des starken Regens machten wir einen Spaziergang.',
    exampleTranslation: 'Despite the heavy rain, we went for a walk.',
    level: 'B1',
  },
]
