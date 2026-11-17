import { ReadingCategory, ReadingCategoryKey } from '@/features/reading/types/reading.types'

export const READING_CATEGORIES: ReadingCategory[] = [
  {
    key: 'alltag',
    titleGerman: 'Alltag',
    titleEnglish: 'Everyday Life',
    description: 'Daily routines, apartment living, neighborhood encounters, and basic city transactions.',
    iconName: 'Coffee',
  },
  {
    key: 'familie',
    titleGerman: 'Familie & Freunde',
    titleEnglish: 'Family & Friends',
    description: 'Personal relationships, family traditions, social invitations, and weekend gatherings.',
    iconName: 'Users',
  },
  {
    key: 'reisen',
    titleGerman: 'Reisen & Verkehr',
    titleEnglish: 'Travel & Mobility',
    description: 'Train journeys, public transit tickets, city sightseeing, and holiday itineraries.',
    iconName: 'Compass',
  },
  {
    key: 'essen-kultur',
    titleGerman: 'Essen & Kultur',
    titleEnglish: 'Food & Culture',
    description: 'Culinary traditions, bakery customs, cafe culture, and regional German specialties.',
    iconName: 'Utensils',
  },
  {
    key: 'arbeit-karriere',
    titleGerman: 'Arbeit & Beruf',
    titleEnglish: 'Work & Career',
    description: 'Office correspondence, job interviews, team syncs, and professional workplace etiquette.',
    iconName: 'Briefcase',
  },
  {
    key: 'bildung',
    titleGerman: 'Bildung & Schule',
    titleEnglish: 'Education & Studies',
    description: 'University life, vocational training (Duale Ausbildung), libraries, and lifelong learning.',
    iconName: 'GraduationCap',
  },
  {
    key: 'technologie',
    titleGerman: 'Technologie & Medien',
    titleEnglish: 'Technology & Media',
    description: 'Digital transformation, artificial intelligence, internet culture, and modern communications.',
    iconName: 'Laptop',
  },
  {
    key: 'gesundheit',
    titleGerman: 'Gesundheit & Wohlbefinden',
    titleEnglish: 'Health & Wellness',
    description: 'Doctor visits, pharmacies, health insurance, fitness habits, and medical consultations.',
    iconName: 'HeartPulse',
  },
  {
    key: 'umwelt',
    titleGerman: 'Umwelt & Natur',
    titleEnglish: 'Environment & Sustainability',
    description: 'Renewable energy, recycling systems (Mülltrennung), climate action, and green cities.',
    iconName: 'Leaf',
  },
  {
    key: 'gesellschaft',
    titleGerman: 'Gesellschaft & Politik',
    titleEnglish: 'Society & Civic Life',
    description: 'Community initiatives, volunteering (Ehrenamt), social questions, and civic structures.',
    iconName: 'Building2',
  },
  {
    key: 'geschichte',
    titleGerman: 'Geschichte & Städte',
    titleEnglish: 'History & Cities',
    description: 'Historical milestones, architectural heritage, Berlin, Munich, Vienna, and Zurich.',
    iconName: 'Landmark',
  },
  {
    key: 'literatur',
    titleGerman: 'Literatur & Kunst',
    titleEnglish: 'Literature & Arts',
    description: 'German literary classics, contemporary fiction, theatrical reviews, and philosophical essays.',
    iconName: 'BookOpen',
  },
]

export const CATEGORY_MAP: Record<ReadingCategoryKey, ReadingCategory> =
  READING_CATEGORIES.reduce((acc, cat) => {
    acc[cat.key] = cat
    return acc
  }, {} as Record<ReadingCategoryKey, ReadingCategory>)
