import { logger } from './logger'

export const setupGlobalErrorHandlers = () => {
  window.addEventListener('unhandledrejection', (event) => {
    logger.error('Unhandled Promise Rejection', event.reason)
  })

  window.addEventListener('error', (event) => {
    logger.error('Global Runtime Error', event.error)
  })
}
