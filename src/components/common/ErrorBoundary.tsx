import { Component, type ErrorInfo, type ReactNode } from 'react'
import { Logo } from './Logo'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('D9W Application Error Boundary Caught:', error, errorInfo)
    this.setState({ errorInfo })

    // If chunk loading failed after a new deployment, auto-recover if not yet reloaded
    if (
      error.message?.includes('Failed to fetch dynamically imported module') ||
      error.message?.includes('Loading chunk')
    ) {
      const lastReload = sessionStorage.getItem('d9w_chunk_reload')
      const now = Date.now()
      if (!lastReload || now - parseInt(lastReload, 10) > 10000) {
        sessionStorage.setItem('d9w_chunk_reload', now.toString())
        window.location.reload()
      }
    }
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null })
    window.location.href = '/'
  }

  private handleReload = () => {
    window.location.reload()
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      const isGerman =
        typeof window !== 'undefined' &&
        (localStorage.getItem('d9w_language') === 'de' ||
          document.documentElement.lang === 'de')

      return (
        <div className="min-h-screen min-h-[100dvh] bg-[#F7F5F0] flex flex-col items-center justify-center p-6 text-[#171717]">
          <div className="w-full max-w-lg skeuo-paper-stacked rounded-[8px] p-8 sm:p-10 border border-[#DEDAD1] text-center space-y-6 shadow-card">
            {/* Logo */}
            <div className="flex justify-center">
              <Logo variant="navbar" linkToHome={false} priority />
            </div>

            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest font-mono font-bold text-[#C83B32]">
                {isGerman ? 'SYSTEM-MELDUNG' : 'SYSTEM STATUS'}
              </span>
              <h2 className="text-2xl font-heading font-extrabold text-[#171717]">
                {isGerman
                  ? 'Ein vorübergehender Fehler ist aufgetreten'
                  : 'An Unexpected Issue Occurred'}
              </h2>
              <p className="text-xs sm:text-sm text-[#55534F] leading-relaxed">
                {isGerman
                  ? 'Das Lernportal konnte das gewünschte Modul nicht korrekt laden. Ihre lokalen Lernfortschritte bleiben sicher im Browser gespeichert.'
                  : 'The learning hub could not load the requested view. Your local learning progress remains securely preserved in your browser.'}
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={this.handleReload}
                className="w-full sm:w-auto px-5 py-2.5 rounded-[5px] text-xs font-bold text-white skeuo-button-primary hover:brightness-105 active:translate-y-0.5 cursor-pointer shadow-xs"
              >
                {isGerman ? 'Seite neu laden' : 'Reload Page'}
              </button>
              <button
                type="button"
                onClick={this.handleReset}
                className="w-full sm:w-auto px-5 py-2.5 rounded-[5px] text-xs font-bold text-[#171717] bg-[#E8E5DD] hover:bg-[#DCD7CD] border border-[#C8C4B7] active:translate-y-0.5 cursor-pointer"
              >
                {isGerman ? 'Zur Startseite' : 'Return to Home'}
              </button>
            </div>

            {/* Collapsible Technical Details (Dev diagnostics) */}
            {import.meta.env.DEV && this.state.error && (
              <details className="text-left text-xs bg-[#FAF8F5] p-3 rounded border border-[#DEDAD1] mt-4 font-mono text-[#89857E] overflow-x-auto">
                <summary className="cursor-pointer font-bold text-[#C83B32]">
                  Technical Diagnostics
                </summary>
                <p className="mt-2 text-rose-700 font-semibold">{this.state.error.toString()}</p>
                {this.state.errorInfo?.componentStack && (
                  <pre className="mt-2 text-[10px] whitespace-pre-wrap">
                    {this.state.errorInfo.componentStack}
                  </pre>
                )}
              </details>
            )}
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
