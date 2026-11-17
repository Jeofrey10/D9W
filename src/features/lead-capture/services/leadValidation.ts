import {
  CEFR_COURSE_LEVELS,
  LEARNING_MODES,
  ENQUIRY_TYPES,
  PREFERRED_CONTACT_TIMES,
  LEAD_LIMITS,
} from '@/config/leadCapture'
import { LeadFormData } from '../types/lead'

export interface ValidationErrors {
  fullName?: string
  phone?: string
  email?: string
  courseLevel?: string
  learningMode?: string
  enquiryType?: string
  privacyConsent?: string
  message?: string
  form?: string
}

/**
 * Validates international or local phone numbers.
 * Allows +, spaces, dashes, parentheses and at least 7 to 20 digits.
 */
export function isValidPhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s\-().]/g, '')
  // Check for international plus or plain digits
  const phoneRegex = /^\+?[0-9]{7,20}$/
  return phoneRegex.test(cleaned)
}

/**
 * Validates email format if provided.
 */
export function isValidEmail(email: string): boolean {
  if (!email || email.trim() === '') return true
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
  return emailRegex.test(email.trim())
}

/**
 * Validates the full Lead Form data before submission.
 */
export function validateLeadForm(data: LeadFormData): {
  isValid: boolean
  errors: ValidationErrors
} {
  const errors: ValidationErrors = {}

  // 1. Full Name
  const trimmedName = data.fullName.trim()
  if (!trimmedName) {
    errors.fullName = 'Please enter your full name.'
  } else if (trimmedName.length < LEAD_LIMITS.minNameLength) {
    errors.fullName = `Name must be at least ${LEAD_LIMITS.minNameLength} characters.`
  } else if (trimmedName.length > LEAD_LIMITS.maxNameLength) {
    errors.fullName = `Name must not exceed ${LEAD_LIMITS.maxNameLength} characters.`
  }

  // 2. Phone / WhatsApp
  const trimmedPhone = data.phone.trim()
  if (!trimmedPhone) {
    errors.phone = 'Please enter your WhatsApp / mobile phone number.'
  } else if (!isValidPhone(trimmedPhone)) {
    errors.phone = 'Please enter a valid phone number (e.g. +91 80566 57640 or +49 1520 1234567).'
  }

  // 3. Email (Optional)
  if (data.email && !isValidEmail(data.email)) {
    errors.email = 'Please enter a valid email address (or leave it blank).'
  }

  // 4. Course Level
  if (!CEFR_COURSE_LEVELS.includes(data.courseLevel)) {
    errors.courseLevel = 'Please select a valid German course level.'
  }

  // 5. Learning Mode
  if (!LEARNING_MODES.includes(data.learningMode)) {
    errors.learningMode = 'Please select your preferred learning mode.'
  }

  // 6. Enquiry Type
  if (!ENQUIRY_TYPES.includes(data.enquiryType)) {
    errors.enquiryType = 'Please select the type of enquiry.'
  }

  // 7. Preferred Contact Time
  if (!PREFERRED_CONTACT_TIMES.includes(data.preferredContactTime)) {
    errors.form = 'Please select a preferred contact time.'
  }

  // 8. Message limit
  if (data.message && data.message.length > LEAD_LIMITS.maxMessageLength) {
    errors.message = `Message must not exceed ${LEAD_LIMITS.maxMessageLength} characters.`
  }

  // 9. Privacy Consent (Strict requirement)
  if (!data.privacyConsent) {
    errors.privacyConsent = 'You must acknowledge the privacy notice to submit an enquiry.'
  }

  // 10. Honeypot (Bot trap)
  if (data.instituteReferralCode && data.instituteReferralCode.trim() !== '') {
    errors.form = 'Automated submission rejected.'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}
