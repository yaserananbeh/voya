import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const APP_NAME = 'Voya'
const TITLE_SEPARATOR = ' | '

export function usePageTitle(
  titleKey?: string,
  dynamicTitle?: string,
  options?: {
    includeAppName?: boolean
    appName?: string
  },
) {
  const { t } = useTranslation()
  const includeAppName = options?.includeAppName !== false
  const appName = options?.appName || APP_NAME

  useEffect(() => {
    const parts: string[] = []

    if (dynamicTitle) {
      parts.push(dynamicTitle)
    }

    if (titleKey) {
      const translatedTitle = t(titleKey)
      if (translatedTitle && translatedTitle.trim()) {
        parts.push(translatedTitle)
      }
    }

    if (includeAppName) {
      parts.push(appName)
    }

    document.title = parts.length > 0 ? parts.join(TITLE_SEPARATOR) : appName
  }, [titleKey, dynamicTitle, includeAppName, appName, t])
}
