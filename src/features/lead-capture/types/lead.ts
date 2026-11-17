import {
  LeadCourseLevel,
  LeadLearningMode,
  LeadEnquiryType,
  LeadPreferredContactTime,
  LeadSource,
  LeadStatus,
} from '@/config/leadCapture'

export type {
  LeadCourseLevel,
  LeadLearningMode,
  LeadEnquiryType,
  LeadPreferredContactTime,
  LeadSource,
  LeadStatus,
}

/**
 * Frontend Form Data before submission.
 */
export interface LeadFormData {
  fullName: string
  phone: string
  email: string
  courseLevel: LeadCourseLevel
  learningMode: LeadLearningMode
  enquiryType: LeadEnquiryType
  preferredBatch: string
  preferredContactTime: LeadPreferredContactTime
  message: string
  privacyConsent: boolean
  // Honeypot field (must remain empty)
  instituteReferralCode: string
}

/**
 * Payload sent to POST /api/leads
 */
export interface LeadSubmissionPayload {
  fullName: string
  phone: string
  email?: string
  courseLevel: LeadCourseLevel
  learningMode: LeadLearningMode
  enquiryType: LeadEnquiryType
  preferredBatch?: string
  preferredContactTime: LeadPreferredContactTime
  message?: string
  privacyConsent: boolean
  source: LeadSource
  idempotencyKey: string
  // Honeypot field
  instituteReferralCode?: string
}

/**
 * Excel Online D9W_Enquiries Table Row Format (Columns A through O)
 */
export interface ExcelLeadRow {
  'Lead ID': string
  'Submitted At': string
  'Student Name': string
  Phone: string
  Email: string
  'Course Level': string
  'Learning Mode': string
  'Enquiry Type': string
  'Preferred Batch': string
  'Preferred Contact Time': string
  Message: string
  'Lead Source': string
  'Lead Status': LeadStatus
  Consent: string
  'Last Updated': string
}

/**
 * API Response Interfaces
 */
export interface LeadApiSuccessResponse {
  success: true
  leadId: string
  message: string
}

export interface LeadApiErrorResponse {
  success: false
  code: string
  message: string
  details?: string[]
}

export type LeadApiResponse = LeadApiSuccessResponse | LeadApiErrorResponse

/**
 * Contextual parameters for opening the lead modal
 */
export interface LeadModalOptions {
  courseLevel?: LeadCourseLevel
  learningMode?: LeadLearningMode
  enquiryType?: LeadEnquiryType
  preferredBatch?: string
  source?: LeadSource
  initialMessage?: string
}

export type SubmissionStatus =
  | 'idle'
  | 'validating'
  | 'submitting'
  | 'success'
  | 'failure'
