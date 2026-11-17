import type { IncomingMessage, ServerResponse } from 'http'

interface ExtendedIncomingMessage extends IncomingMessage {
  body?: any
  query?: Record<string, string>
}

// In-memory idempotency cache (keyed by idempotencyKey -> { leadId, timestamp })
const idempotencyCache = new Map<string, { leadId: string; timestamp: number }>()
const IDEMPOTENCY_TTL_MS = 15 * 60 * 1000 // 15 minutes

// In-memory rate limiting map (IP -> list of timestamps)
const rateLimitMap = new Map<string, number[]>()
const RATE_LIMIT_WINDOW_MS = 60 * 1000 // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5

// Payload size limit (50 KB)
const MAX_PAYLOAD_SIZE = 50 * 1024

const VALID_LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'Undecided']
const VALID_MODES = ['Online', 'Offline', 'Undecided']
const VALID_ENQUIRY_TYPES = [
  'Course Enquiry',
  'Free Demo Class',
  'Batch Availability',
  'Syllabus Request',
  'General Consultation',
]
const VALID_CONTACT_TIMES = ['Morning', 'Afternoon', 'Evening', 'Any time']

/**
 * Generates a collision-resistant Lead Reference ID.
 * Example: D9W-2026-739201
 */
function generateLeadId(): string {
  const year = new Date().getFullYear()
  const randomSixDigits = Math.floor(100000 + Math.random() * 900000)
  return `D9W-${year}-${randomSixDigits}`
}

/**
 * Sanitizes string inputs to prevent injection and control character abuse.
 */
function sanitizeText(input: unknown, maxLength: number): string {
  if (typeof input !== 'string') return ''
  return Array.from(input)
    .filter((c) => {
      const code = c.charCodeAt(0)
      return (code >= 32 && code !== 127) || code === 10 || code === 13
    })
    .join('')
    .trim()
    .slice(0, maxLength)
}

/**
 * Validates international / local phone number format.
 */
function isValidPhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s\-().]/g, '')
  return /^\+?[0-9]{7,20}$/.test(cleaned)
}

/**
 * Validates email format.
 */
function isValidEmail(email: string): boolean {
  if (!email) return true
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)
}

/**
 * Helper to read JSON body if not pre-parsed by hosting provider.
 */
async function parseBody(req: ExtendedIncomingMessage): Promise<any> {
  if (req.body && typeof req.body === 'object') {
    return req.body
  }
  return new Promise((resolve, reject) => {
    let raw = ''
    let size = 0
    req.on('data', (chunk) => {
      size += chunk.length
      if (size > MAX_PAYLOAD_SIZE) {
        reject(new Error('PAYLOAD_TOO_LARGE'))
        return
      }
      raw += chunk
    })
    req.on('end', () => {
      try {
        if (!raw) resolve({})
        else resolve(JSON.parse(raw))
      } catch {
        reject(new Error('INVALID_JSON'))
      }
    })
    req.on('error', (err) => reject(err))
  })
}

/**
 * Vercel Serverless Function Handler
 * POST /api/leads
 */
export default async function handler(
  req: ExtendedIncomingMessage,
  res: ServerResponse
) {
  // CORS & Security Headers
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('X-Frame-Options', 'DENY')
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate')

  // Only allow POST
  if (req.method !== 'POST') {
    res.statusCode = 405
    res.end(
      JSON.stringify({
        success: false,
        code: 'METHOD_NOT_ALLOWED',
        message: 'Only POST requests are permitted on this admissions endpoint.',
      })
    )
    return
  }

  // Rate Limiting by IP
  const ip =
    (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
    req.socket?.remoteAddress ||
    'unknown-ip'

  const now = Date.now()
  const timestamps = (rateLimitMap.get(ip) || []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  )

  if (timestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    res.statusCode = 429
    res.end(
      JSON.stringify({
        success: false,
        code: 'RATE_LIMIT_EXCEEDED',
        message: 'Too many enquiries from this network. Please wait a minute before retrying.',
      })
    )
    return
  }
  timestamps.push(now)
  rateLimitMap.set(ip, timestamps)

  // Parse Request Body
  let body: any
  try {
    body = await parseBody(req)
  } catch (err: any) {
    if (err?.message === 'PAYLOAD_TOO_LARGE') {
      res.statusCode = 413
      res.end(
        JSON.stringify({
          success: false,
          code: 'PAYLOAD_TOO_LARGE',
          message: 'Enquiry payload exceeds permissible size limits.',
        })
      )
      return
    }
    res.statusCode = 400
    res.end(
      JSON.stringify({
        success: false,
        code: 'MALFORMED_JSON',
        message: 'Request body must be valid JSON.',
      })
    )
    return
  }

  // Honeypot check (Bot trap)
  if (body.instituteReferralCode && String(body.instituteReferralCode).trim() !== '') {
    // Return mock 200 to drop bot traffic silently
    res.statusCode = 200
    res.end(
      JSON.stringify({
        success: true,
        leadId: generateLeadId(),
        message: 'Your enquiry has been saved successfully.',
      })
    )
    return
  }

  // Idempotency Check
  const idempotencyKey = sanitizeText(body.idempotencyKey, 64)
  if (idempotencyKey && idempotencyCache.has(idempotencyKey)) {
    const cached = idempotencyCache.get(idempotencyKey)!
    if (now - cached.timestamp < IDEMPOTENCY_TTL_MS) {
      res.statusCode = 200
      res.end(
        JSON.stringify({
          success: true,
          leadId: cached.leadId,
          message: 'Your enquiry has been saved successfully (duplicate request acknowledged).',
        })
      )
      return
    }
  }

  // Field Extractions & Sanitization
  const fullName = sanitizeText(body.fullName, 100)
  const phone = sanitizeText(body.phone, 25)
  const email = sanitizeText(body.email, 100)
  const courseLevel = sanitizeText(body.courseLevel, 20)
  const learningMode = sanitizeText(body.learningMode, 20)
  const enquiryType = sanitizeText(body.enquiryType, 40)
  const preferredBatch = sanitizeText(body.preferredBatch, 100)
  const preferredContactTime = sanitizeText(body.preferredContactTime, 30)
  const message = sanitizeText(body.message, 1000)
  const source = sanitizeText(body.source, 100) || 'D9W Website'
  const privacyConsent = Boolean(body.privacyConsent)

  // Validation
  const errors: string[] = []
  if (!fullName || fullName.length < 2) errors.push('Full name must be at least 2 characters.')
  if (!phone || !isValidPhone(phone)) errors.push('A valid phone number is required.')
  if (email && !isValidEmail(email)) errors.push('Email address is invalid.')
  if (!VALID_LEVELS.includes(courseLevel)) errors.push('Invalid course level selected.')
  if (!VALID_MODES.includes(learningMode)) errors.push('Invalid learning mode selected.')
  if (!VALID_ENQUIRY_TYPES.includes(enquiryType)) errors.push('Invalid enquiry type selected.')
  if (preferredContactTime && !VALID_CONTACT_TIMES.includes(preferredContactTime)) {
    errors.push('Invalid preferred contact time.')
  }
  if (!privacyConsent) errors.push('Privacy consent acknowledgement is mandatory.')

  if (errors.length > 0) {
    res.statusCode = 400
    res.end(
      JSON.stringify({
        success: false,
        code: 'VALIDATION_FAILED',
        message: errors.join(' '),
        details: errors,
      })
    )
    return
  }

  // Generate Collision-Resistant Lead ID & Timestamps
  const leadId = generateLeadId()
  const submittedAtIso = new Date().toISOString()

  // Format record strictly for Excel Online D9W_Enquiries Table (Columns A through O)
  const excelRowRecord = {
    'Lead ID': leadId,
    'Submitted At': submittedAtIso,
    'Student Name': fullName,
    Phone: phone,
    Email: email || 'N/A',
    'Course Level': courseLevel,
    'Learning Mode': learningMode,
    'Enquiry Type': enquiryType,
    'Preferred Batch': preferredBatch || 'N/A',
    'Preferred Contact Time': preferredContactTime || 'Any time',
    Message: message || '',
    'Lead Source': source,
    'Lead Status': 'New',
    Consent: 'Granted (Web Form)',
    'Last Updated': submittedAtIso,
  }

  // Forward to Power Automate Webhook
  const powerAutomateUrl = process.env.POWER_AUTOMATE_LEAD_WEBHOOK_URL

  if (powerAutomateUrl) {
    try {
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 9500) // 9.5s timeout

      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      }
      if (process.env.LEAD_API_SECRET) {
        headers['X-Lead-Secret'] = process.env.LEAD_API_SECRET
      }

      const paResponse = await fetch(powerAutomateUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          leadId,
          submittedAt: submittedAtIso,
          excelRow: excelRowRecord,
        }),
        signal: controller.signal,
      })

      clearTimeout(timeout)

      if (!paResponse.ok) {
        const errorText = await paResponse.text().catch(() => '')
        console.error(
          `[D9W CRM] Power Automate upstream returned status ${paResponse.status}: ${errorText.slice(0, 150)}`
        )
        res.statusCode = 502
        res.end(
          JSON.stringify({
            success: false,
            code: 'EXCEL_SYNC_FAILED',
            message:
              'We could not confirm insertion into the central admissions workbook. Please retry or contact us on WhatsApp.',
          })
        )
        return
      }

      // Read response from Power Automate
      await paResponse.json().catch(() => ({}))

      // Cache idempotency key upon successful Excel confirmation
      if (idempotencyKey) {
        idempotencyCache.set(idempotencyKey, { leadId, timestamp: now })
      }

      res.statusCode = 200
      res.end(
        JSON.stringify({
          success: true,
          leadId,
          message: 'Your enquiry has been saved successfully in the admissions system.',
        })
      )
      return
    } catch (err: any) {
      console.error('[D9W CRM] Network error or timeout contacting Power Automate:', err?.name)
      res.statusCode = 504
      res.end(
        JSON.stringify({
          success: false,
          code: 'UPSTREAM_TIMEOUT',
          message:
            'The admissions system timed out while recording your enquiry. Please verify your connection or reach out on WhatsApp.',
        })
      )
      return
    }
  }

  // Fallback for Local Development & Staging when webhook is not yet provisioned
  // Documents limitation and allows developer testing without blocking frontend development
  const isProd = process.env.NODE_ENV === 'production' && process.env.VERCEL === '1'

  if (isProd) {
    res.statusCode = 503
    res.end(
      JSON.stringify({
        success: false,
        code: 'CRM_INTEGRATION_UNCONFIGURED',
        message:
          'The admissions CRM webhook is currently awaiting Microsoft 365 configuration. Please contact D9W directly via WhatsApp.',
      })
    )
    return
  }

  // Local Developer Mode Mock Confirmation
  console.info(
    `[D9W CRM DEV MOCK] Lead captured: ${leadId} (${fullName}, ${courseLevel}, ${enquiryType})`
  )

  if (idempotencyKey) {
    idempotencyCache.set(idempotencyKey, { leadId, timestamp: now })
  }

  res.statusCode = 200
  res.end(
    JSON.stringify({
      success: true,
      leadId,
      message:
        'Your enquiry has been saved successfully. (Local development mode: Power Automate mock confirmation)',
      devMode: true,
    })
  )
}
