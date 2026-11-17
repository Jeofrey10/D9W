import type { CefrLevel } from '@/types'
import { businessInfo } from '@/config/business'

export type LearningMode = 'online' | 'offline'

export type BatchStatus = 'open' | 'filling-fast' | 'full' | 'coming-soon'

export interface Batch {
  id: string
  level: CefrLevel
  mode: LearningMode
  title: string
  startDate: string // ISO YYYY-MM-DD
  endDate?: string // ISO YYYY-MM-DD
  days: string[] // e.g. ['Montag', 'Mittwoch', 'Freitag']
  startTime?: string // e.g. '18:30'
  endTime?: string // e.g. '20:30'
  timezone?: string // e.g. 'IST / CET'
  durationHours?: number
  durationWeeks?: number
  status: BatchStatus
  location?: string // Physical address or online studio
  description?: string
  registrationDeadline?: string // ISO YYYY-MM-DD
  syllabusUrl?: string
  published: boolean
}

/**
 * Official verified institute contact for WhatsApp Admissions.
 * Formatted international number: +91 80566 57640 (918056657640).
 */
export const D9W_WHATSAPP_NUMBER = businessInfo.whatsappNumber

/**
 * Published Batch Schedules Dataset.
 * 
 * NOTE FOR ACADEMIC COORDINATORS:
 * To publish a new batch or update existing timings:
 * 1. Add or edit an entry below using ISO date strings ('YYYY-MM-DD').
 * 2. Ensure 'published: true' is set for live display.
 * 3. Status options: 'open', 'filling-fast', 'full', 'coming-soon'.
 * 4. Do not fabricate seat counters; the status string is the single source of truth.
 */
export const BATCHES_DATA: Batch[] = [
  // --- November 2026 (This Month) ---
  {
    id: 'b-2026-11-a1-onl',
    level: 'A1',
    mode: 'online',
    title: 'A1 Evening Live Interactive Studio',
    startDate: '2026-11-23',
    endDate: '2027-01-18',
    days: ['Montag', 'Mittwoch', 'Freitag'],
    startTime: '18:30',
    endTime: '20:30',
    timezone: 'CET (Berlin / Frankfurt)',
    durationHours: 80,
    durationWeeks: 8,
    status: 'open',
    location: 'D9W Live Interactive Studio (HD Video & Recorded Sessions)',
    description: 'Foundational A1 German covering Goethe-Zertifikat A1 exam topics. Small virtual group with native German instructor, live oral practice, and weekly grammar drills.',
    registrationDeadline: '2026-11-20',
    syllabusUrl: '/courses/a1',
    published: true,
  },
  {
    id: 'b-2026-11-a2-off',
    level: 'A2',
    mode: 'offline',
    title: 'A2 Weekend Classroom Intensive',
    startDate: '2026-11-28',
    endDate: '2027-01-23',
    days: ['Samstag', 'Sonntag'],
    startTime: '09:30',
    endTime: '14:30',
    timezone: 'CET (Berlin / Frankfurt)',
    durationHours: 80,
    durationWeeks: 8,
    status: 'filling-fast',
    location: 'D9W Campus, Auditorium 2, Madurai',
    description: 'Immersion classroom batch for learners with A1 foundation. Focus on past tense (Perfekt), social conversations, and telc/Goethe A2 preparation.',
    registrationDeadline: '2026-11-25',
    syllabusUrl: '/courses/a2',
    published: true,
  },

  // --- December 2026 (Next Month) ---
  {
    id: 'b-2026-12-b1-onl',
    level: 'B1',
    mode: 'online',
    title: 'B1 Morning Independence Track',
    startDate: '2026-12-07',
    endDate: '2027-02-15',
    days: ['Montag', 'Dienstag', 'Donnerstag'],
    startTime: '08:30',
    endTime: '11:00',
    timezone: 'CET (Berlin / Frankfurt)',
    durationHours: 100,
    durationWeeks: 10,
    status: 'open',
    location: 'D9W Live Interactive Studio (HD Video & Digital Whiteboard)',
    description: 'Prepare for independent German living, vocational Ausbildung entry, or citizenship. Covers subordinate syntax, adjective declensions, and official correspondence.',
    registrationDeadline: '2026-12-03',
    syllabusUrl: '/courses/b1',
    published: true,
  },
  {
    id: 'b-2026-12-a1-off',
    level: 'A1',
    mode: 'offline',
    title: 'A1 Weekday Classroom Foundation',
    startDate: '2026-12-08',
    endDate: '2027-02-02',
    days: ['Dienstag', 'Donnerstag'],
    startTime: '10:00',
    endTime: '13:00',
    timezone: 'CET (Berlin / Frankfurt)',
    durationHours: 80,
    durationWeeks: 8,
    status: 'open',
    location: 'D9W Campus, Seminar Room 4, Madurai',
    description: 'Absolute beginner curriculum in our state-of-the-art classroom. Complete Goethe-Zertifikat A1 syllabus with physical worksheets and group conversation circles.',
    registrationDeadline: '2026-12-04',
    syllabusUrl: '/courses/a1',
    published: true,
  },
  {
    id: 'b-2026-12-b2-onl',
    level: 'B2',
    mode: 'online',
    title: 'B2 Professional & Healthcare Fast-Track',
    startDate: '2026-12-14',
    endDate: '2027-03-08',
    days: ['Montag', 'Mittwoch', 'Donnerstag'],
    startTime: '19:00',
    endTime: '21:30',
    timezone: 'CET (Berlin / Frankfurt)',
    durationHours: 120,
    durationWeeks: 12,
    status: 'full',
    location: 'D9W Live Interactive Studio',
    description: 'High-intensity professional German for doctors, engineers, and academics. Advanced passive forms, Konjunktiv II, and technical presentations. This cohort has reached maximum capacity.',
    registrationDeadline: '2026-12-05',
    syllabusUrl: '/courses/b2',
    published: true,
  },
  {
    id: 'b-2026-12-c1-onl',
    level: 'C1',
    mode: 'online',
    title: 'C1 Advanced Academic & Executive Seminar',
    startDate: '2026-12-19',
    endDate: '2027-03-27',
    days: ['Samstag'],
    startTime: '09:00',
    endTime: '15:00',
    timezone: 'CET (Berlin / Frankfurt)',
    durationHours: 140,
    durationWeeks: 14,
    status: 'open',
    location: 'D9W Live Interactive Studio (Advanced Academic Track)',
    description: 'University admission and executive career fluency. Nominal style, reported speech (Konjunktiv I), and TestDaF TDN 4/5 / DSH exam preparation.',
    registrationDeadline: '2026-12-15',
    syllabusUrl: '/courses/c1',
    published: true,
  },

  // --- January / February 2027 (Upcoming) ---
  {
    id: 'b-2027-01-a1-onl',
    level: 'A1',
    mode: 'online',
    title: 'A1 New Year Early Morning Accelerator',
    startDate: '2027-01-11',
    endDate: '2027-03-08',
    days: ['Montag', 'Mittwoch', 'Freitag'],
    startTime: '07:00',
    endTime: '09:00',
    timezone: 'CET (Berlin / Frankfurt)',
    durationHours: 80,
    durationWeeks: 8,
    status: 'coming-soon',
    location: 'D9W Live Interactive Studio',
    description: 'Kick-start your German journey with an early morning routine. Comprehensive beginner foundation targeting travel, work visas, or family reunion.',
    registrationDeadline: '2027-01-07',
    syllabusUrl: '/courses/a1',
    published: true,
  },
  {
    id: 'b-2027-01-a2-onl',
    level: 'A2',
    mode: 'online',
    title: 'A2 Evening Live Masterclass',
    startDate: '2027-01-18',
    endDate: '2027-03-15',
    days: ['Montag', 'Mittwoch'],
    startTime: '18:30',
    endTime: '21:00',
    timezone: 'CET (Berlin / Frankfurt)',
    durationHours: 80,
    durationWeeks: 8,
    status: 'open',
    location: 'D9W Live Interactive Studio',
    description: 'Solidify your elementary German skills. Modal verbs, accusative/dative two-way prepositions, and conversational past narratives.',
    registrationDeadline: '2027-01-14',
    syllabusUrl: '/courses/a2',
    published: true,
  },
  {
    id: 'b-2027-01-b1-off',
    level: 'B1',
    mode: 'offline',
    title: 'B1 Weekend Classroom Independence',
    startDate: '2027-01-23',
    endDate: '2027-04-03',
    days: ['Samstag', 'Sonntag'],
    startTime: '10:00',
    endTime: '14:30',
    timezone: 'CET (Berlin / Frankfurt)',
    durationHours: 100,
    durationWeeks: 10,
    status: 'coming-soon',
    location: 'D9W Campus, Auditorium 1, Madurai',
    description: 'Intensive weekend classroom preparation for Goethe-Zertifikat B1. Extensive oral debates, listening stations, and writing labs.',
    registrationDeadline: '2027-01-19',
    syllabusUrl: '/courses/b1',
    published: true,
  },
  {
    id: 'b-2027-02-b2-onl',
    level: 'B2',
    mode: 'online',
    title: 'B2 Spring Medical & Clinical German',
    startDate: '2027-02-01',
    endDate: '2027-04-26',
    days: ['Dienstag', 'Donnerstag'],
    startTime: '19:00',
    endTime: '21:30',
    timezone: 'CET (Berlin / Frankfurt)',
    durationHours: 120,
    durationWeeks: 12,
    status: 'coming-soon',
    location: 'D9W Live Interactive Studio',
    description: 'Curated curriculum for healthcare professionals seeking German Approbation/Kenntnisprüfung. Patient documentation, doctor-patient communication, and B2 exam coaching.',
    registrationDeadline: '2027-01-28',
    syllabusUrl: '/courses/b2',
    published: true,
  },

  // --- Historical Batch (Should be excluded from Upcoming lists) ---
  {
    id: 'b-2026-10-a1-past',
    level: 'A1',
    mode: 'offline',
    title: 'A1 Autumn Cohort (Completed/Active)',
    startDate: '2026-10-12',
    endDate: '2026-12-07',
    days: ['Montag', 'Mittwoch'],
    startTime: '18:00',
    endTime: '20:30',
    timezone: 'CET (Berlin / Frankfurt)',
    durationHours: 80,
    durationWeeks: 8,
    status: 'full',
    location: 'D9W Campus, Seminar Room 1, Madurai',
    description: 'Archived autumn beginner cohort.',
    registrationDeadline: '2026-10-08',
    syllabusUrl: '/courses/a1',
    published: true,
  },

  // --- Unpublished Draft Batch (Must never appear anywhere in public views) ---
  {
    id: 'b-draft-c2-unpub',
    level: 'C1',
    mode: 'online',
    title: 'C2 Native Mastery Pilot (Internal Draft)',
    startDate: '2027-03-01',
    endDate: '2027-06-01',
    days: ['Freitag'],
    startTime: '18:00',
    endTime: '21:00',
    timezone: 'CET',
    durationHours: 140,
    durationWeeks: 14,
    status: 'coming-soon',
    published: false, // Unpublished draft
  },
]
