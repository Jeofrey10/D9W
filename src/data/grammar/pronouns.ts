import { PersonalPronounDeclension } from '@/features/case-translator/types/caseTranslator.types'

/**
 * Complete Personal Pronoun Declension Reference Table across all 4 German cases
 */
export const PERSONAL_PRONOUNS: PersonalPronounDeclension[] = [
  {
    person: '1st Person Singular (I)',
    nominativ: 'ich',
    akkusativ: 'mich',
    dativ: 'mir',
    genitiv: 'meiner',
    english: 'I / me / to me / of me',
  },
  {
    person: '2nd Person Singular Informal (You)',
    nominativ: 'du',
    akkusativ: 'dich',
    dativ: 'dir',
    genitiv: 'deiner',
    english: 'you / you / to you / of you',
  },
  {
    person: '3rd Person Singular Masculine (He / It)',
    nominativ: 'er',
    akkusativ: 'ihn',
    dativ: 'ihm',
    genitiv: 'seiner',
    english: 'he / him / to him / of him',
  },
  {
    person: '3rd Person Singular Feminine (She / It)',
    nominativ: 'sie',
    akkusativ: 'sie',
    dativ: 'ihr',
    genitiv: 'ihrer',
    english: 'she / her / to her / of her',
  },
  {
    person: '3rd Person Singular Neuter (It)',
    nominativ: 'es',
    akkusativ: 'es',
    dativ: 'ihm',
    genitiv: 'seiner',
    english: 'it / it / to it / of it',
  },
  {
    person: '1st Person Plural (We)',
    nominativ: 'wir',
    akkusativ: 'uns',
    dativ: 'uns',
    genitiv: 'unser',
    english: 'we / us / to us / of us',
  },
  {
    person: '2nd Person Plural Informal (You all / Y\'all)',
    nominativ: 'ihr',
    akkusativ: 'euch',
    dativ: 'euch',
    genitiv: 'euer',
    english: 'you all / you all / to you all / of you all',
  },
  {
    person: '3rd Person Plural (They)',
    nominativ: 'sie',
    akkusativ: 'sie',
    dativ: 'ihnen',
    genitiv: 'ihrer',
    english: 'they / them / to them / of them',
  },
  {
    person: '2nd Person Formal (You formal - singular & plural)',
    nominativ: 'Sie',
    akkusativ: 'Sie',
    dativ: 'Ihnen',
    genitiv: 'Ihrer',
    english: 'you (formal) / you / to you / of you',
  },
]

export const PRONOUN_CASE_EXPLANATION = {
  overview:
    'German personal pronouns change their forms depending on their grammatical function in the sentence.',
  keyTakeaways: [
    'Akkusativ is for direct objects: "Er sieht mich" (He sees me).',
    'Dativ is for indirect objects and dative verbs: "Er hilft mir" (He helps me).',
    'Notice that in plural, 1st person (wir -> uns/uns) and 2nd person (ihr -> euch/euch) share identical forms in Akkusativ and Dativ.',
    'Genitive personal pronouns (meiner, deiner, seiner, ihrer, unser, euer, Ihrer) are archaic/formal and appear primarily after genitive prepositions or select formal verbs: "Gedenke meiner" (Remember me).',
    'Formal "Sie / Ihnen" is ALWAYS capitalized in writing to distinguish it from 3rd person plural "sie / ihnen" (they / them) and feminine "sie / ihr" (she / her).',
  ],
}
