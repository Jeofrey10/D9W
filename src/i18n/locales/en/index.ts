import { commonEn } from './common'
import { homeEn } from './home'
import { coursesEn } from './courses'
import { batchesEn } from './batches'
import { learningEn } from './learning'
import { aboutEn } from './about'
import { contactEn } from './contact'

export const en = {
  common: commonEn,
  home: homeEn,
  courses: coursesEn,
  batches: batchesEn,
  learning: learningEn,
  about: aboutEn,
  contact: contactEn,
}

export type TranslationSchema = typeof en
