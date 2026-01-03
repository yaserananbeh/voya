import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/styles/reset.css'
import '@/i18n/config' // Initialize i18n before any component code runs
import App from '@/App.tsx'
import { ErrorBoundary } from '@/providers/ErrorBoundary.tsx'
import { setupGlobalErrorHandlers } from '@/utils/globalErrors'
import { Providers } from '@/providers/index.tsx'
setupGlobalErrorHandlers()
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <Providers>
        <App />
      </Providers>
    </ErrorBoundary>
  </StrictMode>,
)
