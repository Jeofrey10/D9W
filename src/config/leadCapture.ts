/**
 * Centralized Lead Capture Configuration for D9W German Language Institute.
 * Defines institute contacts, accepted enumerations, field constraints, and endpoints.
 */

import { businessInfo } from '@/config/business'

export const D9W_WHATSAPP_NUMBER = businessInfo.whatsappNumber
export const D9W_CONTACT_EMAIL = businessInfo.email
export const D9W_INSTITUTE_NAME = businessInfo.name

export const CEFR_COURSE_LEVELS = [
  'A1',
  'A2',
  'B1',
  'B2',
  'C1',
  'Undecided',
] as const

export type LeadCourseLevel = (typeof CEFR_COURSE_LEVELS)[number]

export const LEARNING_MODES = [
  'Online',
  'Offline',
  'Undecided',
] as const

export type LeadLearningMode = (typeof LEARNING_MODES)[number]

export const ENQUIRY_TYPES = [
  'Course Enquiry',
  'Free Demo Class',
  'Batch Availability',
  'Syllabus Request',
  'General Consultation',
] as const

export type LeadEnquiryType = (typeof ENQUIRY_TYPES)[number]

export const PREFERRED_CONTACT_TIMES = [
  'Morning',
  'Afternoon',
  'Evening',
  'Any time',
] as const

export type LeadPreferredContactTime = (typeof PREFERRED_CONTACT_TIMES)[number]

export const LEAD_SOURCES = [
  'Course Comparison',
  'Batch Calendar',
  'Syllabus Generator',
  'Homepage Hero',
  'Homepage Demo',
  'Demo Page',
  'Course Level Detail',
  'Navbar Consultation',
  'Direct Modal',
] as const

export type LeadSource = (typeof LEAD_SOURCES)[number] | string

export const LEAD_STATUS_VALUES = [
  'New',
  'Contacted',
  'Converted',
  'Closed',
] as const

export type LeadStatus = (typeof LEAD_STATUS_VALUES)[number]

/**
 * Excel Table & OneDrive Schema Constants
 */
export const EXCEL_WORKBOOK_NAME = 'D9W-Leads.xlsx'
export const EXCEL_WORKSHEET_NAME = 'Leads'
export const EXCEL_TABLE_NAME = 'D9W_Enquiries'
export const EXCEL_DASHBOARD_SHEET_NAME = 'Dashboard'

/**
 * Lead API Endpoint
 */
export const LEAD_API_ENDPOINT = '/api/leads'

/**
 * Constraints
 */
export const LEAD_LIMITS = {
  maxNameLength: 100,
  minNameLength: 2,
  maxPhoneLength: 25,
  minPhoneLength: 7,
  maxEmailLength: 100,
  maxMessageLength: 1000,
  maxPreferredBatchLength: 100,
  rateLimitWindowMs: 60 * 1000, // 1 minute
  rateLimitMaxRequests: 5,
} as const
