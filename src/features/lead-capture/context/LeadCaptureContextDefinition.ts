import { createContext } from 'react'
import { LeadModalOptions } from '../types/lead'

export interface LeadCaptureContextType {
  isOpen: boolean
  modalOptions: LeadModalOptions | undefined
  openLeadModal: (options?: LeadModalOptions) => void
  closeLeadModal: () => void
}

export const LeadCaptureContext = createContext<LeadCaptureContextType | undefined>(undefined)
