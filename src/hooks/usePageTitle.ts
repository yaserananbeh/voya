import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const APP_NAME = 'Voya'
const TITLE_SEPARATOR = ' | '

/**
 * Hook to manage page title (document.title)
 * @param titleKey - Translation key for the page title (e.g., 'pages.home')
 * @param dynamicTitle - Optional dynamic title to append (e.g., hotel name)
 * @param options - Optional configuration
 */
export function usePageTitle(
  titleKey?: string,
  dynamicTitle?: string,
  options?: {
    /** Whether to include app name in title */
    includeAppName?: boolean
    /** Custom app name (defaults to 'Voya') */
    appName?: string
  },
) {
  const { t } = useTranslation()
  const includeAppName = options?.includeAppName !== false
  const appName = options?.appName || APP_NAME

  useEffect(() => {
    const parts: string[] = []

    // Add dynamic title if provided
    if (dynamicTitle) {
      parts.push(dynamicTitle)
    }

    // Add translated title if key provided
    if (titleKey) {
      const translatedTitle = t(titleKey)
      // Only add if translation exists and is not empty
      if (translatedTitle && translatedTitle.trim()) {
        parts.push(translatedTitle)
      }
    }

    // Add app name if enabled
    if (includeAppName) {
      parts.push(appName)
    }

    // Set document title
    document.title = parts.length > 0 ? parts.join(TITLE_SEPARATOR) : appName
  }, [titleKey, dynamicTitle, includeAppName, appName, t])
}
