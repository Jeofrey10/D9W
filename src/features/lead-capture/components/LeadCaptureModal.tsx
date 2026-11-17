import React, { useEffect } from 'react'
import { X, GraduationCap, Shield } from 'lucide-react'
import { useLeadCapture } from '../context/useLeadCapture'
import { useLeadSubmission } from '../hooks/useLeadSubmission'
import { useTranslation } from '@/i18n'
import { LeadCaptureForm } from './LeadCaptureForm'
import { LeadSubmissionState } from './LeadSubmissionState'
import { LeadSuccessView } from './LeadSuccessView'
import { LeadErrorView } from './LeadErrorView'

export const LeadCaptureModal: React.FC = () => {
  const { t } = useTranslation()
  const { isOpen, modalOptions, closeLeadModal } = useLeadCapture()
  const {
    formData,
    updateField,
    errors,
    status,
    errorMessage,
    submittedSummary,
    handleSubmit,
    resetForm,
    isSubmitting,
  } = useLeadSubmission(modalOptions)

  // Re-synchronize form when modal opens with new options
  useEffect(() => {
    if (isOpen) {
      resetForm(modalOptions)
    }
  }, [isOpen, modalOptions, resetForm])

  // Escape key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && !isSubmitting) {
        closeLeadModal()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, isSubmitting, closeLeadModal])

  if (!isOpen) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-admissions-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
    >
      {/* Backdrop */}
      <div
        onClick={() => {
          if (!isSubmitting) closeLeadModal()
        }}
        className="fixed inset-0 bg-[#171717]/70 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-2xl bg-[#F7F5F0] rounded-[8px] shadow-2xl border border-[#DCD7CD] z-10 overflow-hidden my-auto max-h-[92vh] flex flex-col skeuo-paper-stacked">
        {/* Sticky Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-[#E8E5DD] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[6px] bg-[#171717] text-white flex items-center justify-center shadow-md">
              <GraduationCap className="w-5 h-5 text-[#D7B95D]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-[#C83B32]">
                  {t('common.leadModal.badge')}
                </span>
                <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-[#89857E]" />
                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] text-[#89857E]">
                  <Shield className="w-3 h-3 text-[#2E7D32]" />
                  D9W CRM
                </span>
              </div>
              <h2
                id="modal-admissions-title"
                className="text-base sm:text-lg font-heading font-bold text-[#171717]"
              >
                {t('common.leadModal.title')}
              </h2>
            </div>
          </div>

          <button
            type="button"
            disabled={isSubmitting}
            onClick={closeLeadModal}
            aria-label="Close modal"
            className="p-1.5 rounded-full text-[#89857E] hover:text-[#171717] hover:bg-[#E8E5DD] transition-colors disabled:opacity-30 disabled:pointer-events-none"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto flex-1">
          {status === 'validating' || status === 'submitting' ? (
            <LeadSubmissionState status={status} />
          ) : status === 'success' && submittedSummary ? (
            <LeadSuccessView summary={submittedSummary} onClose={closeLeadModal} />
          ) : status === 'failure' ? (
            <LeadErrorView
              message={errorMessage}
              onRetry={() => {
                // Return to idle state; formData is preserved!
                resetForm({
                  courseLevel: formData.courseLevel,
                  learningMode: formData.learningMode,
                  enquiryType: formData.enquiryType,
                  preferredBatch: formData.preferredBatch,
                  source: modalOptions?.source,
                  initialMessage: formData.message,
                })
              }}
              onClose={closeLeadModal}
              studentName={formData.fullName}
            />
          ) : (
            <LeadCaptureForm
              formData={formData}
              updateField={updateField}
              errors={errors}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              sourceText={modalOptions?.source}
            />
          )}
        </div>
      </div>
    </div>
  )
}
