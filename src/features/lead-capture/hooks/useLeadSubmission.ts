import { useState, useCallback, useRef } from 'react'
import {
  LeadFormData,
  SubmissionStatus,
  LeadModalOptions,
} from '../types/lead'
import { validateLeadForm, ValidationErrors } from '../services/leadValidation'
import {
  buildLeadPayload,
  generateIdempotencyKey,
  getInitialLeadFormData,
} from '../services/leadPayload'
import { submitLead } from '../services/leadApi'

export interface SubmittedSummary {
  leadId: string
  fullName: string
  phone: string
  email?: string
  courseLevel: string
  learningMode: string
  enquiryType: string
  preferredBatch?: string
}

export function useLeadSubmission(initialOptions?: LeadModalOptions) {
  const [formData, setFormData] = useState<LeadFormData>(() =>
    getInitialLeadFormData(initialOptions)
  )
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [status, setStatus] = useState<SubmissionStatus>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [submittedSummary, setSubmittedSummary] = useState<SubmittedSummary | null>(null)

  // Stable idempotency key per form lifecycle; regenerated only on explicit reset or new form
  const idempotencyKeyRef = useRef<string>(generateIdempotencyKey())

  const source = initialOptions?.source || 'Direct Modal'

  const updateField = useCallback(
    <K extends keyof LeadFormData>(field: K, value: LeadFormData[K]) => {
      setFormData((prev) => ({ ...prev, [field]: value }))
      // Clear specific field error when edited
      if (errors[field as keyof ValidationErrors]) {
        setErrors((prev) => {
          const next = { ...prev }
          delete next[field as keyof ValidationErrors]
          return next
        })
      }
      if (errorMessage) {
        setErrorMessage(null)
      }
    },
    [errors, errorMessage]
  )

  const resetForm = useCallback((options?: LeadModalOptions) => {
    setFormData(getInitialLeadFormData(options))
    setErrors({})
    setStatus('idle')
    setErrorMessage(null)
    setSubmittedSummary(null)
    idempotencyKeyRef.current = generateIdempotencyKey()
  }, [])

  const handleSubmit = useCallback(
    async (e?: React.FormEvent) => {
      if (e) e.preventDefault()

      // Prevent duplicate clicks while submitting
      if (status === 'submitting' || status === 'validating') return

      setStatus('validating')
      setErrorMessage(null)

      const validation = validateLeadForm(formData)
      if (!validation.isValid) {
        setErrors(validation.errors)
        setStatus('idle')
        return
      }

      setErrors({})
      setStatus('submitting')

      const payload = buildLeadPayload(
        formData,
        source,
        idempotencyKeyRef.current
      )

      const result = await submitLead(payload)

      if (result.success) {
        setStatus('success')
        setSubmittedSummary({
          leadId: result.leadId,
          fullName: formData.fullName.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim() || undefined,
          courseLevel: formData.courseLevel,
          learningMode: formData.learningMode,
          enquiryType: formData.enquiryType,
          preferredBatch: formData.preferredBatch.trim() || undefined,
        })
      } else {
        setStatus('failure')
        setErrorMessage(result.message)
        // We preserve formData in state so the user can review and retry without retyping!
      }
    },
    [formData, source, status]
  )

  return {
    formData,
    updateField,
    errors,
    status,
    errorMessage,
    submittedSummary,
    handleSubmit,
    resetForm,
    isSubmitting: status === 'submitting' || status === 'validating',
  }
}
