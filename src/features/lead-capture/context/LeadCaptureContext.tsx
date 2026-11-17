import React, { useState, useCallback } from 'react'
import { LeadModalOptions } from '../types/lead'
import { LeadCaptureContext } from './LeadCaptureContextDefinition'

export const LeadCaptureProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [modalOptions, setModalOptions] = useState<LeadModalOptions | undefined>(undefined)

  const openLeadModal = useCallback((options?: LeadModalOptions) => {
    setModalOptions(options)
    setIsOpen(true)
  }, [])

  const closeLeadModal = useCallback(() => {
    setIsOpen(false)
    setTimeout(() => setModalOptions(undefined), 200)
  }, [])

  return (
    <LeadCaptureContext.Provider
      value={{
        isOpen,
        modalOptions,
        openLeadModal,
        closeLeadModal,
      }}
    >
      {children}
    </LeadCaptureContext.Provider>
  )
}
