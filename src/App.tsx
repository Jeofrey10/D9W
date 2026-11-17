import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from '@/routes'
import { I18nProvider } from '@/i18n'
import { ErrorBoundary } from '@/components/common/ErrorBoundary'
import { LeadCaptureProvider, LeadCaptureModal } from '@/features/lead-capture'

export const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <I18nProvider>
          <LeadCaptureProvider>
            <AppRoutes />
            <LeadCaptureModal />
          </LeadCaptureProvider>
        </I18nProvider>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App
