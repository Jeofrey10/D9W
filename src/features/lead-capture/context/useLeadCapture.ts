import { useContext } from 'react'
import { LeadCaptureContext, LeadCaptureContextType } from './LeadCaptureContextDefinition'

export function useLeadCapture(): LeadCaptureContextType {
  const context = useContext(LeadCaptureContext)
  if (!context) {
    throw new Error('useLeadCapture must be used within a LeadCaptureProvider')
  }
  return context
}
