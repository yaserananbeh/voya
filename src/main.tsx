import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/styles/reset.css'
import App from '@/App.tsx'
import { ErrorBoundary } from '@/providers/ErrorBoundary.tsx'
import { setupGlobalErrorHandlers } from '@/utils/globalErrors'
import { Providers } from './providers'
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
