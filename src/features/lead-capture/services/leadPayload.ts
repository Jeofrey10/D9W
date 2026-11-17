import { D9W_WHATSAPP_NUMBER } from '@/config/leadCapture'
import {
  LeadFormData,
  LeadSubmissionPayload,
  LeadModalOptions,
  ExcelLeadRow,
} from '../types/lead'

/**
 * Creates a collision-resistant idempotency key for preventing duplicate submissions.
 */
export function generateIdempotencyKey(): string {
  const timestamp = Date.now().toString(36)
  const randomPart = Math.random().toString(36).substring(2, 10)
  return `idemp_${timestamp}_${randomPart}`
}

/**
 * Prepares the payload for API submission.
 */
export function buildLeadPayload(
  formData: LeadFormData,
  source: string,
  idempotencyKey: string
): LeadSubmissionPayload {
  return {
    fullName: formData.fullName.trim(),
    phone: formData.phone.trim(),
    email: formData.email.trim() || undefined,
    courseLevel: formData.courseLevel,
    learningMode: formData.learningMode,
    enquiryType: formData.enquiryType,
    preferredBatch: formData.preferredBatch.trim() || undefined,
    preferredContactTime: formData.preferredContactTime,
    message: formData.message.trim() || undefined,
    privacyConsent: formData.privacyConsent,
    source,
    idempotencyKey,
    instituteReferralCode: formData.instituteReferralCode,
  }
}

/**
 * Creates initial form state with contextual defaults.
 */
export function getInitialLeadFormData(options?: LeadModalOptions): LeadFormData {
  return {
    fullName: '',
    phone: '',
    email: '',
    courseLevel: options?.courseLevel || 'Undecided',
    learningMode: options?.learningMode || 'Undecided',
    enquiryType: options?.enquiryType || 'General Consultation',
    preferredBatch: options?.preferredBatch || '',
    preferredContactTime: 'Any time',
    message: options?.initialMessage || '',
    privacyConsent: false,
    instituteReferralCode: '',
  }
}

/**
 * Generates the official post-registration WhatsApp URL.
 * Reuses verified D9W WhatsApp number without duplication.
 */
export function buildRegisteredLeadWhatsAppUrl(params: {
  leadId: string
  fullName: string
  courseLevel: string
  learningMode: string
  enquiryType: string
}): string {
  const { leadId, fullName, courseLevel, learningMode, enquiryType } = params

  const message = [
    'Hello D9W Team,',
    '',
    'My enquiry has been registered.',
    '',
    `Lead Reference: ${leadId}`,
    `Name: ${fullName}`,
    `Course Level: ${courseLevel}`,
    `Learning Mode: ${learningMode}`,
    `Enquiry Type: ${enquiryType}`,
    '',
    'I would like to know more about the course and next steps.',
    '',
    'Thank you.',
  ].join('\n')

  return `https://wa.me/${D9W_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

/**
 * Converts validated payload to the exact 15-column Excel Online row format.
 */
export function formatExcelLeadRow(
  payload: LeadSubmissionPayload,
  leadId: string,
  submittedAtIso: string
): ExcelLeadRow {
  return {
    'Lead ID': leadId,
    'Submitted At': submittedAtIso,
    'Student Name': payload.fullName,
    Phone: payload.phone,
    Email: payload.email || 'N/A',
    'Course Level': payload.courseLevel,
    'Learning Mode': payload.learningMode,
    'Enquiry Type': payload.enquiryType,
    'Preferred Batch': payload.preferredBatch || 'N/A',
    'Preferred Contact Time': payload.preferredContactTime,
    Message: payload.message || '',
    'Lead Source': payload.source,
    'Lead Status': 'New',
    Consent: payload.privacyConsent ? 'Granted (Web Form)' : 'No',
    'Last Updated': submittedAtIso,
  }
}
