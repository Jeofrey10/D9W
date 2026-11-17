import { CaseDefinition } from '@/features/case-translator/types/caseTranslator.types'

export const GERMAN_CASE_DEFINITIONS: Record<
  'Nominativ' | 'Akkusativ' | 'Dativ' | 'Genitiv',
  CaseDefinition
> = {
  Nominativ: {
    caseName: 'Nominativ',
    germanName: '1. Fall / Wer-Fall (Nominativ)',
    englishLabel: 'The Subject Case (Who or What performs the action)',
    questionWords: ['Wer? (people)', 'Was? (things/concepts)'],
    roleDescription:
      'Der Nominativ identifies the subject of the clause—the person, animal, or entity performing the action or being described by the verb.',
    syntacticRoles: [
      'Grammatical Subject (Subjekt)',
      'Predicate Noun after sein, werden, bleiben, heißen (Gleichsetzungsnominativ)',
    ],
    definiteArticles: {
      masculine: 'der',
      feminine: 'die',
      neuter: 'das',
      plural: 'die',
    },
    indefiniteArticles: {
      masculine: 'ein',
      feminine: 'eine',
      neuter: 'ein',
      plural: '— (keine plural indefinite)',
    },
    personalPronouns: ['ich', 'du', 'er', 'sie', 'es', 'wir', 'ihr', 'sie', 'Sie'],
    keyPrepositions: [
      'None (German prepositions never govern the Nominativ case)',
    ],
    commonVerbs: [
      'sein (to be)',
      'werden (to become)',
      'bleiben (to remain)',
      'heißen (to be called)',
      'scheinen (to seem)',
    ],
    typicalSentenceStructure:
      '[Subject in Nominativ] + [Finite Verb] + [Objects / Adverbials]',
    commonMistakes: [
      {
        wrong: 'Der Mann ist einen Lehrer.',
        correct: 'Der Mann ist ein Lehrer.',
        explanation:
          'Verbs like "sein" (to be) are copula verbs. They take a Predicate Nominative, NOT an Accusative direct object.',
      },
      {
        wrong: 'Mich bin müde.',
        correct: 'Ich bin müde.',
        explanation:
          'The subject performing the action or state must always take the Nominative pronoun ("ich", not "mich").',
      },
      {
        wrong: 'Dem Hund schläft.',
        correct: 'Der Hund schläft.',
        explanation:
          'The subject initiating or undergoing the verb must be in Nominativ ("der Hund").',
      },
    ],
    exampleSentences: [
      {
        german: 'Der Lehrer erklärt die deutsche Grammatik.',
        english: 'The teacher explains German grammar.',
        highlight: 'Der Lehrer',
        explanation: '"Der Lehrer" is the subject performing the action of explaining (Wer erklärt? -> Der Lehrer).',
        level: 'A1',
      },
      {
        german: 'Das neue Buch ist sehr spannend.',
        english: 'The new book is very exciting.',
        highlight: 'Das neue Buch',
        explanation: '"Das neue Buch" is the grammatical subject in the neuter nominative (Was ist spannend? -> Das neue Buch).',
        level: 'A1',
      },
      {
        german: 'Meine Schwester wird eine erfolgreiche Ärztin.',
        english: 'My sister is becoming a successful doctor.',
        highlight: 'eine erfolgreiche Ärztin',
        explanation: 'Predicate nominative: after "werden", the complement remains in the Nominativ case.',
        level: 'A2',
      },
      {
        german: 'Die fleißigen Studenten bleiben auch im Prüfungsstress ruhig.',
        english: 'The diligent students remain calm even under exam stress.',
        highlight: 'Die fleißigen Studenten',
        explanation: 'Plural nominative subject triggering the plural verb agreement "bleiben".',
        level: 'B1',
      },
    ],
  },

  Akkusativ: {
    caseName: 'Akkusativ',
    germanName: '4. Fall / Wen-Fall (Akkusativ)',
    englishLabel: 'The Direct Object Case (Whom or What receives the action directly)',
    questionWords: ['Wen? (whom - people)', 'Was? (what - things/concepts)', 'Wohin? (where to - directional movement)'],
    roleDescription:
      'Der Akkusativ indicates the direct object that is directly affected, used, bought, consumed, or received by the verb, or the target of directional motion after two-way prepositions.',
    syntacticRoles: [
      'Direct Object (Akkusativobjekt)',
      'Directional Destination after Wechselpräpositionen (Wohin?)',
      'Object of Pure Accusative Prepositions (durch, für, gegen, ohne, um)',
      'Definite Time and Duration Expressions (jeden Tag, den ganzen Abend)',
    ],
    definiteArticles: {
      masculine: 'den',
      feminine: 'die',
      neuter: 'das',
      plural: 'die',
    },
    indefiniteArticles: {
      masculine: 'einen',
      feminine: 'eine',
      neuter: 'ein',
      plural: '— (keine)',
    },
    personalPronouns: ['mich', 'dich', 'ihn', 'sie', 'es', 'uns', 'euch', 'sie', 'Sie'],
    keyPrepositions: [
      'durch (through)',
      'für (for)',
      'gegen (against)',
      'ohne (without)',
      'um (around/at)',
      'bis (until)',
      'entlang (along - postposition)',
    ],
    commonVerbs: [
      'haben (to have)',
      'sehen (to see)',
      'brauchen (to need)',
      'kaufen (to buy)',
      'essen (to eat)',
      'trinken (to drink)',
      'lesen (to read)',
      'finden (to find)',
      'besuchen (to visit)',
      'lieben (to love)',
      'kennen (to know a person/place)',
      'anrufen (to call)',
    ],
    typicalSentenceStructure:
      '[Subject (Nom)] + [Verb] + [Direct Object (Akk)]',
    commonMistakes: [
      {
        wrong: 'Ich habe ein neuer Computer.',
        correct: 'Ich habe einen neuen Computer.',
        explanation:
          '"Computer" is masculine (der Computer). In the accusative case as direct object of "haben", masculine articles and adjectives take the "-en" ending ("einen neuen").',
      },
      {
        wrong: 'Das Geschenk ist für mein Bruder.',
        correct: 'Das Geschenk ist für meinen Bruder.',
        explanation:
          'The preposition "für" ALWAYS demands the accusative case regardless of the verb.',
      },
      {
        wrong: 'Ich sehe du im Park.',
        correct: 'Ich sehe dich im Park.',
        explanation:
          'Direct object pronouns must be in the accusative case ("dich", not the nominative "du").',
      },
    ],
    exampleSentences: [
      {
        german: 'Ich kaufe den schwarzen Pullover.',
        english: 'I am buying the black sweater.',
        highlight: 'den schwarzen Pullover',
        explanation: '"Pullover" is masculine (der Pullover). As direct object of "kaufen", the article shifts to "den" (Wen oder was kaufe ich? -> Den schwarzen Pullover).',
        level: 'A1',
      },
      {
        german: 'Wir gehen ohne meinen besten Freund ins Kino.',
        english: 'We are going to the cinema without my best friend.',
        highlight: 'ohne meinen besten Freund',
        explanation: '"ohne" is a pure accusative preposition; "Freund" takes the masculine accusative possessive "meinen".',
        level: 'A2',
      },
      {
        german: 'Der Vater stellt die Flasche auf den Tisch.',
        english: 'The father places the bottle onto the table.',
        highlight: 'auf den Tisch',
        explanation: '"auf" is a two-way preposition. Because "stellen" indicates directional placement (Wohin?), it governs the Akkusativ ("den Tisch").',
        level: 'B1',
      },
      {
        german: 'Sie investieren jeden Cent in nachhaltige Energien.',
        english: 'They invest every cent into sustainable energy.',
        highlight: 'jeden Cent',
        explanation: 'Definite duration/amount expression in masculine accusative ("jeden Cent").',
        level: 'B2',
      },
    ],
  },

  Dativ: {
    caseName: 'Dativ',
    germanName: '3. Fall / Wem-Fall (Dativ)',
    englishLabel: 'The Indirect Object Case (To or For whom an action is performed)',
    questionWords: ['Wem? (to/for whom)', 'Wo? (where - static location)'],
    roleDescription:
      'Der Dativ denotes the recipient, beneficiary, or passive experiencer of an action (indirect object), static location after two-way prepositions (Wo?), or objects governed by pure dative prepositions and verbs.',
    syntacticRoles: [
      'Indirect Object / Beneficiary (Dativobjekt)',
      'Static Location after Wechselpräpositionen (Wo?)',
      'Object of Pure Dative Prepositions (aus, bei, mit, nach, seit, von, zu, gegenüber)',
      'Impersonal Experiencer Expressions (Mir ist kalt, Wie geht es dir?)',
    ],
    definiteArticles: {
      masculine: 'dem',
      feminine: 'der',
      neuter: 'dem',
      plural: 'den (+n on noun)',
    },
    indefiniteArticles: {
      masculine: 'einem',
      feminine: 'einer',
      neuter: 'einem',
      plural: '— (keinen +n)',
    },
    personalPronouns: ['mir', 'dir', 'ihm', 'ihr', 'ihm', 'uns', 'euch', 'ihnen', 'Ihnen'],
    keyPrepositions: [
      'aus (out of / from)',
      'bei (at / with / near)',
      'mit (with / by means of)',
      'nach (after / to a city or country)',
      'seit (since / for a duration)',
      'von (from / of)',
      'zu (to / at)',
      'gegenüber (opposite / across from)',
      'außer (except for)',
    ],
    commonVerbs: [
      'helfen (to help)',
      'danken (to thank)',
      'gefallen (to please / be liked by)',
      'gehören (to belong to)',
      'antworten (to answer someone)',
      'gratulieren (to congratulate)',
      'schmecken (to taste good to)',
      'passen (to fit / suit)',
      'vertrauen (to trust)',
      'folgen (to follow)',
      'fehlen (to be missing from / to miss)',
    ],
    typicalSentenceStructure:
      '[Subject (Nom)] + [Verb] + [Indirect Object (Dat)] + [Direct Object (Akk)]',
    commonMistakes: [
      {
        wrong: 'Ich helfe dich.',
        correct: 'Ich helfe dir.',
        explanation:
          'The verb "helfen" requires a Dativ object in German (Wem helfe ich? -> dir), unlike English "help you".',
      },
      {
        wrong: 'Ich fahre mit der Bus.',
        correct: 'Ich fahre mit dem Bus.',
        explanation:
          '"mit" is a pure dative preposition. Masculine "der Bus" shifts to "dem Bus".',
      },
      {
        wrong: 'Ich gebe die Kinder die Geschenke.',
        correct: 'Ich gebe den Kindern die Geschenke.',
        explanation:
          'In dative plural, the article becomes "den" AND plural nouns add an extra "-n" if they do not already end in -n or -s (Kinder -> Kindern).',
      },
    ],
    exampleSentences: [
      {
        german: 'Der Arzt hilft dem kranken Patienten.',
        english: 'The doctor helps the sick patient.',
        highlight: 'dem kranken Patienten',
        explanation: '"helfen" governs the Dativ case (Wem hilft der Arzt? -> Dem kranken Patienten).',
        level: 'A1',
      },
      {
        german: 'Sie wohnt seit einem Jahr in Berlin.',
        english: 'She has been living in Berlin for a year.',
        highlight: 'seit einem Jahr',
        explanation: '"seit" is a pure dative preposition; neuter "das Jahr" becomes "einem Jahr".',
        level: 'A2',
      },
      {
        german: 'Das Buch liegt auf dem Tisch.',
        english: 'The book is lying on the table.',
        highlight: 'auf dem Tisch',
        explanation: '"auf" is a two-way preposition. Because "liegen" denotes static location (Wo?), it governs the Dativ ("dem Tisch").',
        level: 'A2',
      },
      {
        german: 'Der Dozent erklärt den internationalen Studierenden das Konzept.',
        english: 'The lecturer explains the concept to the international students.',
        highlight: 'den internationalen Studierenden',
        explanation: 'Indirect recipient in dative plural ("den Studierenden") preceding the accusative direct object ("das Konzept").',
        level: 'B1',
      },
    ],
  },

  Genitiv: {
    caseName: 'Genitiv',
    germanName: '2. Fall / Wessen-Fall (Genitiv)',
    englishLabel: 'The Possessive / Relationship Case (Belonging, origin, or cause)',
    questionWords: ['Wessen? (whose)'],
    roleDescription:
      'Der Genitiv denotes possession, relationship, part-whole association, origin, or objects controlled by pure genitive prepositions. It represents the hallmark of formal and written German fluency.',
    syntacticRoles: [
      'Possessive Attribute (Genitivattribut)',
      'Object of Pure Genitive Prepositions (während, wegen, trotz, innerhalb, außerhalb, statt)',
      'Indefinite Time Expressions (eines Tages, morgens, abends)',
      'Complement to select formal/legal verbs (gedenken, bedürfen, anklagen)',
    ],
    definiteArticles: {
      masculine: 'des (+s / +es on noun)',
      feminine: 'der',
      neuter: 'des (+s / +es on noun)',
      plural: 'der',
    },
    indefiniteArticles: {
      masculine: 'eines (+s / +es on noun)',
      feminine: 'einer',
      neuter: 'eines (+s / +es on noun)',
      plural: '— (keiner)',
    },
    personalPronouns: ['meiner', 'deiner', 'seiner', 'ihrer', 'seiner', 'unser', 'euer', 'ihrer', 'Ihrer'],
    keyPrepositions: [
      'während (during)',
      'wegen (because of / on account of)',
      'trotz (in spite of / despite)',
      'statt / anstatt (instead of)',
      'innerhalb (within / inside of)',
      'außerhalb (outside of)',
      'aufgrund / auf Grund (on the basis of / due to)',
      'infolge (as a result of)',
      'anlässlich (on the occasion of)',
    ],
    commonVerbs: [
      'gedenken (to commemorate)',
      'bedürfen (to require / necessitate)',
      'sich erinnern (in formal register with genitive: sich einer Sache rühmen)',
      'anklagen (to accuse someone of a crime)',
      'verdächtigen (to suspect someone of)',
    ],
    typicalSentenceStructure:
      '[Noun Phrase] + [Genitive Attribute: des/der + Noun]',
    commonMistakes: [
      {
        wrong: 'Das Auto von dem Mann.',
        correct: 'Das Auto des Mannes.',
        explanation:
          'While "von + Dativ" is common in spoken German, standard written German and CEFR exams require the Genitive ("des Mannes").',
      },
      {
        wrong: 'Wegen dem schlechten Wetter bleiben wir zu Hause.',
        correct: 'Wegen des schlechten Wetters bleiben wir zu Hause.',
        explanation:
          '"wegen" standardly governs the Genitiv in academic and formal German (des Wetters, not dem Wetter).',
      },
      {
        wrong: 'Das Dach des Haus ist kaputt.',
        correct: 'Das Dach des Hauses ist kaputt.',
        explanation:
          'Single-syllable masculine and neuter nouns ending in -s, -ss, -ß, -z, or -x add "-es" in the Genitive (das Haus -> des Hauses; der Mann -> des Mannes).',
      },
    ],
    exampleSentences: [
      {
        german: 'Das ist das Auto des neuen Lehrers.',
        english: 'That is the new teacher’s car.',
        highlight: 'des neuen Lehrers',
        explanation: 'Genitive attribute indicating possession (Wessen Auto? -> Des neuen Lehrers). Masculine noun adds "-s".',
        level: 'A2',
      },
      {
        german: 'Trotz des starken Regens machten wir einen langen Spaziergang.',
        english: 'Despite the heavy rain, we went for a long walk.',
        highlight: 'Trotz des starken Regens',
        explanation: '"trotz" is a formal genitive preposition. Masculine "der Regen" becomes "des starken Regens".',
        level: 'B1',
      },
      {
        german: 'Während der Sommerferien reiste die Familie durch ganz Europa.',
        english: 'During the summer vacation, the family traveled throughout Europe.',
        highlight: 'Während der Sommerferien',
        explanation: '"während" governs the genitive; plural "die Sommerferien" takes "der Sommerferien".',
        level: 'B1',
      },
      {
        german: 'Die Umsetzung des Projekts bedarf der Zustimmung des Vorstandes.',
        english: 'The implementation of the project requires the approval of the board.',
        highlight: 'des Projekts bedarf der Zustimmung des Vorstandes',
        explanation: 'Advanced C1 structure: "bedürfen" governs genitive ("der Zustimmung"), followed by possessive genitive ("des Vorstandes").',
        level: 'C1',
      },
    ],
  },
}
