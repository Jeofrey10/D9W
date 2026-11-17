import { LEAD_API_ENDPOINT } from '@/config/leadCapture'
import {
  LeadSubmissionPayload,
  LeadApiResponse,
  LeadApiSuccessResponse,
  LeadApiErrorResponse,
} from '../types/lead'

/**
 * Submits lead data to the centralized /api/leads serverless endpoint.
 */
export async function submitLead(
  payload: LeadSubmissionPayload
): Promise<LeadApiResponse> {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 12000) // 12s timeout

  try {
    const response = await fetch(LEAD_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    const data = await response.json()

    if (!response.ok || !data.success) {
      const errorResponse: LeadApiErrorResponse = {
        success: false,
        code: data.code || `HTTP_${response.status}`,
        message:
          data.message ||
          'We could not save your enquiry at this moment. Please check your details and try again.',
        details: data.details,
      }
      return errorResponse
    }

    const successResponse: LeadApiSuccessResponse = {
      success: true,
      leadId: data.leadId,
      message: data.message || 'Your enquiry has been saved successfully.',
    }
    return successResponse
  } catch (err: unknown) {
    clearTimeout(timeoutId)

    if (err instanceof Error && err.name === 'AbortError') {
      return {
        success: false,
        code: 'REQUEST_TIMEOUT',
        message:
          'The request timed out while communicating with the admissions server. Please verify your connection and try again.',
      }
    }

    return {
      success: false,
      code: 'NETWORK_ERROR',
      message:
        'A connection error occurred. Your enquiry could not reach the server. Please try again or reach out directly via WhatsApp.',
    }
  }
}
