import React from 'react'
import {
  User,
  Phone,
  Mail,
  Calendar,
  Clock,
  MessageSquare,
  HelpCircle,
  Sparkles,
  ArrowRight,
  Shield,
} from 'lucide-react'
import { LeadFormField } from './LeadFormField'
import { Button } from '@/components/common/Button'
import {
  CEFR_COURSE_LEVELS,
  LEARNING_MODES,
  ENQUIRY_TYPES,
  PREFERRED_CONTACT_TIMES,
  LEAD_LIMITS,
} from '@/config/leadCapture'
import { LeadFormData } from '../types/lead'
import { ValidationErrors } from '../services/leadValidation'
import { useTranslation } from '@/i18n'

interface LeadCaptureFormProps {
  formData: LeadFormData
  updateField: <K extends keyof LeadFormData>(field: K, value: LeadFormData[K]) => void
  errors: ValidationErrors
  onSubmit: (e?: React.FormEvent) => void
  isSubmitting: boolean
  sourceText?: string
}

export const LeadCaptureForm: React.FC<LeadCaptureFormProps> = ({
  formData,
  updateField,
  errors,
  onSubmit,
  isSubmitting,
  sourceText,
}) => {
  const { t } = useTranslation()

  return (
    <form onSubmit={onSubmit} noValidate className="p-6 sm:p-8 space-y-6">
      {/* Contextual notice if prefilled from a specific feature */}
      {sourceText && (
        <div className="flex items-center gap-2 p-2.5 rounded-[4px] bg-[#E8E5DD]/50 border border-[#DCD7CD] text-xs text-[#55534F]">
          <Sparkles className="w-4 h-4 text-[#C83B32] shrink-0" />
          <span>
            Prefilled enquiry context from: <strong className="text-[#171717]">{sourceText}</strong>
          </span>
        </div>
      )}

      {/* Row 1: Student Name & Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <LeadFormField
          label={t('common.leadModal.fullName')}
          required
          error={errors.fullName}
          icon={<User className="w-3.5 h-3.5" />}
        >
          <input
            type="text"
            required
            autoComplete="name"
            maxLength={LEAD_LIMITS.maxNameLength}
            value={formData.fullName}
            onChange={(e) => updateField('fullName', e.target.value)}
            placeholder={t('common.leadModal.fullNamePlaceholder')}
            className="w-full h-10 px-3 text-xs text-[#171717] bg-white border border-[#DCD7CD] rounded-[4px] shadow-inner focus:outline-none focus:ring-1 focus:ring-[#C83B32] focus:border-[#C83B32] placeholder:text-[#A09D95]"
          />
        </LeadFormField>

        <LeadFormField
          label={t('common.leadModal.phone')}
          required
          error={errors.phone}
          hint="Include country code"
          icon={<Phone className="w-3.5 h-3.5 text-[#25D366]" />}
        >
          <input
            type="tel"
            required
            autoComplete="tel"
            maxLength={LEAD_LIMITS.maxPhoneLength}
            value={formData.phone}
            onChange={(e) => updateField('phone', e.target.value)}
            placeholder="e.g. +91 80566 57640"
            className="w-full h-10 px-3 text-xs text-[#171717] font-mono bg-white border border-[#DCD7CD] rounded-[4px] shadow-inner focus:outline-none focus:ring-1 focus:ring-[#C83B32] focus:border-[#C83B32] placeholder:text-[#A09D95]"
          />
        </LeadFormField>
      </div>

      {/* Row 2: Email & Preferred Contact Time */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <LeadFormField
          label="Email Address"
          hint="Optional"
          error={errors.email}
          icon={<Mail className="w-3.5 h-3.5" />}
        >
          <input
            type="email"
            autoComplete="email"
            maxLength={LEAD_LIMITS.maxEmailLength}
            value={formData.email}
            onChange={(e) => updateField('email', e.target.value)}
            placeholder="e.g. j.schmidt@example.com"
            className="w-full h-10 px-3 text-xs text-[#171717] bg-white border border-[#DCD7CD] rounded-[4px] shadow-inner focus:outline-none focus:ring-1 focus:ring-[#C83B32] focus:border-[#C83B32] placeholder:text-[#A09D95]"
          />
        </LeadFormField>

        <LeadFormField
          label="Preferred Contact Time"
          icon={<Clock className="w-3.5 h-3.5" />}
        >
          <select
            value={formData.preferredContactTime}
            onChange={(e) =>
              updateField(
                'preferredContactTime',
                e.target.value as (typeof PREFERRED_CONTACT_TIMES)[number]
              )
            }
            className="w-full h-10 px-3 text-xs text-[#171717] bg-white border border-[#DCD7CD] rounded-[4px] shadow-inner focus:outline-none focus:ring-1 focus:ring-[#C83B32] focus:border-[#C83B32]"
          >
            {PREFERRED_CONTACT_TIMES.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </LeadFormField>
      </div>

      {/* Row 3: Course Level Selector (Physical Buttons) */}
      <LeadFormField
        label="Target German Course Level"
        required
        error={errors.courseLevel}
        hint="Select your current or target tier"
      >
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 pt-1">
          {CEFR_COURSE_LEVELS.map((level) => {
            const isSelected = formData.courseLevel === level
            const label = level === 'Undecided' ? 'Not sure yet' : level
            return (
              <button
                type="button"
                key={level}
                onClick={() => updateField('courseLevel', level)}
                className={`h-9 px-2 rounded-[4px] text-xs font-semibold transition-all border ${
                  isSelected
                    ? 'bg-[#171717] text-white border-[#171717] shadow-inner translate-y-0.5'
                    : 'bg-white text-[#55534F] border-[#DCD7CD] hover:border-[#171717] hover:bg-[#F7F5F0]'
                }`}
              >
                {label}
              </button>
            )
          })}
        </div>
      </LeadFormField>

      {/* Row 4: Learning Mode Selector & Enquiry Type */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <LeadFormField
          label="Learning Mode"
          required
          error={errors.learningMode}
        >
          <div className="grid grid-cols-3 gap-2 pt-1">
            {LEARNING_MODES.map((mode) => {
              const isSelected = formData.learningMode === mode
              const label = mode === 'Undecided' ? 'Not decided' : mode
              return (
                <button
                  type="button"
                  key={mode}
                  onClick={() => updateField('learningMode', mode)}
                  className={`h-9 px-2 rounded-[4px] text-xs font-semibold transition-all border ${
                    isSelected
                      ? 'bg-[#C83B32] text-white border-[#C83B32] shadow-inner translate-y-0.5'
                      : 'bg-white text-[#55534F] border-[#DCD7CD] hover:border-[#C83B32] hover:bg-[#F7F5F0]'
                  }`}
                >
                  {label}
                </button>
              )
            })}
          </div>
        </LeadFormField>

        <LeadFormField
          label="Enquiry Classification"
          required
          error={errors.enquiryType}
          icon={<HelpCircle className="w-3.5 h-3.5" />}
        >
          <select
            value={formData.enquiryType}
            onChange={(e) =>
              updateField(
                'enquiryType',
                e.target.value as (typeof ENQUIRY_TYPES)[number]
              )
            }
            className="w-full h-10 px-3 text-xs text-[#171717] bg-white border border-[#DCD7CD] rounded-[4px] shadow-inner focus:outline-none focus:ring-1 focus:ring-[#C83B32] focus:border-[#C83B32] mt-1"
          >
            {ENQUIRY_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </LeadFormField>
      </div>

      {/* Row 5: Preferred Batch (if applicable) */}
      {formData.preferredBatch && (
        <LeadFormField
          label="Selected Batch Schedule"
          hint="From Calendar"
          icon={<Calendar className="w-3.5 h-3.5 text-[#C83B32]" />}
        >
          <input
            type="text"
            readOnly
            value={formData.preferredBatch}
            className="w-full h-9 px-3 text-xs text-[#171717] bg-[#E8E5DD]/40 border border-[#DCD7CD] rounded-[4px] font-mono cursor-default"
          />
        </LeadFormField>
      )}

      {/* Row 6: Additional Message */}
      <LeadFormField
        label="Questions or Specific Learning Goals"
        hint="Optional"
        error={errors.message}
        icon={<MessageSquare className="w-3.5 h-3.5" />}
      >
        <textarea
          rows={3}
          maxLength={LEAD_LIMITS.maxMessageLength}
          value={formData.message}
          onChange={(e) => updateField('message', e.target.value)}
          placeholder="Tell us about your visa deadlines, previous German study, or specific scheduling requirements..."
          className="w-full p-3 text-xs text-[#171717] bg-white border border-[#DCD7CD] rounded-[4px] shadow-inner focus:outline-none focus:ring-1 focus:ring-[#C83B32] focus:border-[#C83B32] placeholder:text-[#A09D95] resize-y"
        />
        <div className="text-right text-[10px] text-[#89857E] mt-0.5">
          {formData.message.length} / {LEAD_LIMITS.maxMessageLength}
        </div>
      </LeadFormField>

      {/* Honeypot field (Strictly off-screen for bot trapping) */}
      <div
        className="opacity-0 absolute -z-50 pointer-events-none h-0 w-0 overflow-hidden"
        aria-hidden="true"
      >
        <label htmlFor="instituteReferralCode">Institute Referral Code</label>
        <input
          id="instituteReferralCode"
          name="instituteReferralCode"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={formData.instituteReferralCode}
          onChange={(e) => updateField('instituteReferralCode', e.target.value)}
        />
      </div>

      {/* Row 7: Privacy Consent Checkbox */}
      <div className="pt-1">
        <label className="flex items-start gap-3 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={formData.privacyConsent}
            onChange={(e) => updateField('privacyConsent', e.target.checked)}
            className="mt-0.5 w-4 h-4 rounded border-[#DCD7CD] text-[#C83B32] focus:ring-[#C83B32] cursor-pointer"
          />
          <span className="text-[11px] text-[#55534F] leading-relaxed">
            I consent to D9W German Language Institute storing and processing my contact details for academic counselling, course consultation, and admissions follow-up in accordance with the institute&apos;s privacy notice.
          </span>
        </label>
        {errors.privacyConsent && (
          <p className="text-[11px] text-[#C83B32] font-medium mt-1.5 flex items-center gap-1">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#C83B32]" />
            {errors.privacyConsent}
          </p>
        )}
      </div>

      {/* Row 8: General Form Error if any */}
      {errors.form && (
        <div className="p-3 rounded-[4px] bg-[#C83B32]/10 border border-[#C83B32]/30 text-xs text-[#C83B32] font-semibold">
          {errors.form}
        </div>
      )}

      {/* Row 9: Actions */}
      <div className="pt-2 border-t border-[#E8E5DD] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-[11px] text-[#89857E]">
          <Shield className="w-3.5 h-3.5 text-[#2E7D32]" />
          <span>Strict European data security standard &bull; Zero spam</span>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="md"
          disabled={isSubmitting}
          className="w-full sm:w-auto min-w-[200px]"
        >
          <span>{isSubmitting ? t('common.leadModal.submitting') : t('common.leadModal.submit')}</span>
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </form>
  )
}
