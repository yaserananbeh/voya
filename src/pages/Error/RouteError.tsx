import { useRouteError, isRouteErrorResponse } from 'react-router-dom'
import { ErrorPage } from './ErrorPage'
import { useTranslation } from 'react-i18next'
import { usePageTitle } from '@/hooks'

export function RouteError() {
  const error = useRouteError()
  const { t } = useTranslation()

  let errorTitle = t('errors.title')
  let errorMessage = t('errors.message')
  let pageTitleKey = 'pages.error'

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      errorTitle = t('errors.notFound')
      errorMessage = t('errors.notFoundMessage')
      pageTitleKey = 'pages.notFound'
    } else if (error.status === 500) {
      errorTitle = t('errors.serverError')
      errorMessage = t('errors.serverErrorMessage')
    } else {
      errorTitle = t('errors.httpError', { status: error.status })
      errorMessage = error.statusText || t('errors.message')
    }
  } else if (error instanceof Error) {
    if (error.message.includes('Failed to fetch dynamically imported module')) {
      errorTitle = t('errors.loadError')
      errorMessage = t('errors.loadErrorMessage')
    } else {
      errorMessage = error.message
    }
  }

  usePageTitle(pageTitleKey, errorTitle)

  return (
    <ErrorPage
      error={error instanceof Error ? error : undefined}
      title={errorTitle}
      message={errorMessage}
    />
  )
}
