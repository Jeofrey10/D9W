import {
  ArticleDeclensionSet,
  ArticleType,
  DeclensionForm,
  GrammaticalCase,
  GrammaticalGender,
} from '@/features/case-translator/types/caseTranslator.types'

/**
 * 1. DEFINITE ARTICLES (Bestimmte Artikel: der, die, das, die)
 */
export const DEFINITE_ARTICLES: ArticleDeclensionSet = {
  articleType: 'definite',
  label: 'Definite Article (der / die / das / die)',
  declension: {
    Nominativ: {
      masculine: 'der',
      feminine: 'die',
      neuter: 'das',
      plural: 'die',
    },
    Akkusativ: {
      masculine: 'den',
      feminine: 'die',
      neuter: 'das',
      plural: 'die',
    },
    Dativ: {
      masculine: 'dem',
      feminine: 'der',
      neuter: 'dem',
      plural: 'den (+n)',
    },
    Genitiv: {
      masculine: 'des (+s/+es)',
      feminine: 'der',
      neuter: 'des (+s/+es)',
      plural: 'der',
    },
  },
  notes:
    'Notice the "Rese-Nese-MrMn-SrSr" mnemonic rhyme commonly used in German pedagogy to remember article endings across the 4 cases.',
}

/**
 * 2. INDEFINITE ARTICLES (Unbestimmte Artikel: ein, eine, ein, —)
 */
export const INDEFINITE_ARTICLES: ArticleDeclensionSet = {
  articleType: 'indefinite',
  label: 'Indefinite Article (ein / eine / ein)',
  baseWord: 'ein',
  declension: {
    Nominativ: {
      masculine: 'ein',
      feminine: 'eine',
      neuter: 'ein',
      plural: '— (no plural indefinite)',
    },
    Akkusativ: {
      masculine: 'einen',
      feminine: 'eine',
      neuter: 'ein',
      plural: '— (no plural indefinite)',
    },
    Dativ: {
      masculine: 'einem',
      feminine: 'einer',
      neuter: 'einem',
      plural: '— (use keinen / Dative nouns)',
    },
    Genitiv: {
      masculine: 'eines (+s/+es)',
      feminine: 'einer',
      neuter: 'eines (+s/+es)',
      plural: '— (no plural indefinite)',
    },
  },
  notes:
    'German has NO plural form for "ein". In plural, nouns simply stand alone with zero article (Nullartikel: "Ich kaufe Äpfel") or use "einige / manche".',
}

/**
 * 3. NEGATIVE ARTICLES (Negationsartikel: kein, keine, kein, keine)
 */
export const NEGATIVE_ARTICLES: ArticleDeclensionSet = {
  articleType: 'negative',
  label: 'Negative Article (kein / keine / kein / keine)',
  baseWord: 'kein',
  declension: {
    Nominativ: {
      masculine: 'kein',
      feminine: 'keine',
      neuter: 'kein',
      plural: 'keine',
    },
    Akkusativ: {
      masculine: 'keinen',
      feminine: 'keine',
      neuter: 'kein',
      plural: 'keine',
    },
    Dativ: {
      masculine: 'keinem',
      feminine: 'keiner',
      neuter: 'keinem',
      plural: 'keinen (+n)',
    },
    Genitiv: {
      masculine: 'keines (+s/+es)',
      feminine: 'keiner',
      neuter: 'keines (+s/+es)',
      plural: 'keiner',
    },
  },
  notes:
    '"kein" declines like the indefinite article in singular, and acquires full plural endings ("keine", "keine", "keinen", "keiner") in plural.',
}

/**
 * 4. POSSESSIVE ARTICLES (Possessivartikel: mein, dein, sein, ihr, unser, euer, ihr, Ihr)
 */
export const POSSESSIVE_BASE_WORDS = [
  { stem: 'mein', label: 'mein (my - 1st person sing.)' },
  { stem: 'dein', label: 'dein (your informal - 2nd person sing.)' },
  { stem: 'sein', label: 'sein (his / its - 3rd person masc./neut.)' },
  { stem: 'ihr', label: 'ihr (her - 3rd person fem.)' },
  { stem: 'unser', label: 'unser (our - 1st person plural)' },
  { stem: 'euer', label: 'euer (your informal - 2nd person plural)' },
  { stem: 'ihr', label: 'ihr (their - 3rd person plural)' },
  { stem: 'Ihr', label: 'Ihr (your formal - 2nd person formal)' },
]

/**
 * Generates declensions for any possessive base stem
 */
export function generatePossessiveDeclension(stem: string): Record<GrammaticalCase, DeclensionForm> {
  const isEuer = stem.toLowerCase() === 'euer'
  const prefix = isEuer ? 'eur' : stem

  return {
    Nominativ: {
      masculine: stem,
      feminine: `${prefix}e`,
      neuter: stem,
      plural: `${prefix}e`,
    },
    Akkusativ: {
      masculine: `${prefix}en`,
      feminine: `${prefix}e`,
      neuter: stem,
      plural: `${prefix}e`,
    },
    Dativ: {
      masculine: `${prefix}em`,
      feminine: `${prefix}er`,
      neuter: `${prefix}em`,
      plural: `${prefix}en (+n)`,
    },
    Genitiv: {
      masculine: `${prefix}es (+s/+es)`,
      feminine: `${prefix}er`,
      neuter: `${prefix}es (+s/+es)`,
      plural: `${prefix}er`,
    },
  }
}

export const POSSESSIVE_ARTICLES_MEIN: ArticleDeclensionSet = {
  articleType: 'possessive',
  label: 'Possessive Article (mein / meine / mein)',
  baseWord: 'mein',
  declension: generatePossessiveDeclension('mein'),
  notes:
    'All possessive articles (mein, dein, sein, ihr, unser, euer, ihr, Ihr) follow the exact declension pattern of "ein" in singular and "kein" in plural. Note that "euer" drops an "e" when an ending is attached: euer -> eure, euren, eurem, eurer.',
}

/**
 * Declension dictionary lookup helper
 */
export function getArticleForm(
  articleType: ArticleType,
  caseName: GrammaticalCase,
  gender: GrammaticalGender,
  possessiveStem: string = 'mein'
): string {
  if (articleType === 'definite') {
    return DEFINITE_ARTICLES.declension[caseName][gender]
  }
  if (articleType === 'indefinite') {
    return INDEFINITE_ARTICLES.declension[caseName][gender]
  }
  if (articleType === 'negative') {
    return NEGATIVE_ARTICLES.declension[caseName][gender]
  }
  if (articleType === 'possessive') {
    const table = generatePossessiveDeclension(possessiveStem)
    return table[caseName][gender]
  }
  return ''
}

/**
 * 5. NOUN ENDINGS RULES & EXCEPTIONS
 */
export const NOUN_ENDINGS_RULES = {
  genitiveMasculineNeuter: {
    title: 'Genitiv: Masculine & Neuter Noun Endings (-s vs -es)',
    explanation:
      'Unlike English, which uses apostrophe-s (\'s), German masculine and neuter nouns take an ending in the Genitive case. Feminine and plural nouns never add an ending in the Genitive.',
    rules: [
      {
        ending: '-es',
        condition: 'Compulsory for nouns ending in sibilants (-s, -ss, -ß, -z, -tz, -x) and single-syllable nouns for phonetic ease',
        examples: [
          'das Haus -> des Hauses',
          'der Platz -> des Platzes',
          'der Mann -> des Mannes',
          'das Kind -> des Kindes',
          'der Arzt -> des Arztes',
        ],
      },
      {
        ending: '-s',
        condition: 'Standard for multi-syllable nouns, nouns ending in unaccented syllables (-el, -en, -er, -chen, -lein), and modern loanwords',
        examples: [
          'der Lehrer -> des Lehrers',
          'der Computer -> des Computers',
          'das Mädchen -> des Mädchens',
          'der Wagen -> des Wagens',
          'das Auto -> des Autos',
        ],
      },
    ],
    exceptions: [
      {
        category: 'N-Deklination (Weak Masculine Nouns)',
        description: 'Take -en or -n in Akkusativ, Dativ, and Genitiv (never -s alone)',
        examples: [
          'der Student -> des Studenten',
          'der Kollege -> des Kollegen',
          'der Herr -> des Herrn',
          'der Junge -> des Jungen',
          'der Name -> des Namens (irregular: takes -ns)',
        ],
      },
    ],
  },
  dativePlural: {
    title: 'Dativ Plural: The Extra -n Rule',
    explanation:
      'In the Dative plural, in addition to the article becoming "den", ALL plural nouns add an extra "-n" or "-en" unless they already end in "-n" or "-s".',
    rules: [
      {
        ending: '+n',
        condition: 'Nouns whose regular nominative plural ends in a vowel, -e, -er, or consonant other than -n / -s',
        examples: [
          'die Kinder -> den Kindern',
          'die Tische -> den Tischen',
          'die Bücher -> den Büchern',
          'die Frauen -> den Frauen (already ends in -n, no extra -n)',
          'die Autos -> den Autos (foreign loanword ending in -s, no -n added)',
        ],
      },
    ],
  },
}
