import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'

interface SEOProps {
  /** Page title (will be combined with app name) */
  title?: string
  /** Page description for meta tag */
  description?: string
  /** Keywords for meta tag */
  keywords?: string
  /** Canonical URL */
  canonical?: string
  /** Open Graph image URL */
  image?: string
  /** Open Graph type (default: 'website') */
  ogType?: string
  /** Whether to prevent indexing (noindex) */
  noindex?: boolean
  /** Whether to prevent following links (nofollow) */
  nofollow?: boolean
  /** Additional meta tags */
  additionalMeta?: Array<{ name: string; content: string }>
}

const APP_NAME = 'Voya'
const DEFAULT_DESCRIPTION =
  'Discover stays that fit how you travel. Search trusted stays, compare deals, and book in minutes.'
const DEFAULT_KEYWORDS = 'hotels, booking, travel, accommodation, stays, vacation, trip'
const BASE_URL = typeof window !== 'undefined' ? window.location.origin : ''

/**
 * SEO component that manages meta tags for pages
 * Handles title, description, keywords, Open Graph tags, and robots directives
 */
export function SEO({
  title,
  description,
  keywords,
  canonical,
  image,
  ogType = 'website',
  noindex = false,
  nofollow = false,
  additionalMeta = [],
}: SEOProps) {
  const { i18n } = useTranslation()
  const location = useLocation()
  const currentLang = i18n.language || 'en'

  useEffect(() => {
    // Set document title
    const fullTitle = title ? `${title} | ${APP_NAME}` : APP_NAME
    document.title = fullTitle

    // Update or create meta tags
    const updateMetaTag = (
      name: string,
      content: string,
      attribute: 'name' | 'property' = 'name',
    ) => {
      let element = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement
      if (!element) {
        element = document.createElement('meta')
        element.setAttribute(attribute, name)
        document.head.appendChild(element)
      }
      element.setAttribute('content', content)
    }

    // Title
    updateMetaTag('title', fullTitle)

    // Description
    if (description) {
      updateMetaTag('description', description)
      updateMetaTag('og:description', description, 'property')
    } else {
      updateMetaTag('description', DEFAULT_DESCRIPTION)
      updateMetaTag('og:description', DEFAULT_DESCRIPTION, 'property')
    }

    // Keywords
    if (keywords) {
      updateMetaTag('keywords', keywords)
    } else {
      updateMetaTag('keywords', DEFAULT_KEYWORDS)
    }

    // Canonical URL
    const canonicalUrl = canonical || `${BASE_URL}${location.pathname}`
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement
    if (!canonicalLink) {
      canonicalLink = document.createElement('link')
      canonicalLink.setAttribute('rel', 'canonical')
      document.head.appendChild(canonicalLink)
    }
    canonicalLink.setAttribute('href', canonicalUrl)

    // Open Graph tags
    updateMetaTag('og:title', fullTitle, 'property')
    updateMetaTag('og:type', ogType, 'property')
    updateMetaTag('og:url', `${BASE_URL}${location.pathname}`, 'property')
    updateMetaTag('og:site_name', APP_NAME, 'property')
    updateMetaTag('og:locale', currentLang, 'property')

    if (image) {
      updateMetaTag('og:image', image, 'property')
    }

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image')
    updateMetaTag('twitter:title', fullTitle)
    if (description) {
      updateMetaTag('twitter:description', description)
    }
    if (image) {
      updateMetaTag('twitter:image', image)
    }

    // Robots meta tag
    const robotsContent: string[] = []
    if (noindex) {
      robotsContent.push('noindex')
    } else {
      robotsContent.push('index')
    }
    if (nofollow) {
      robotsContent.push('nofollow')
    } else {
      robotsContent.push('follow')
    }
    updateMetaTag('robots', robotsContent.join(', '))

    // Additional meta tags
    additionalMeta.forEach((meta) => {
      updateMetaTag(meta.name, meta.content)
    })

    // Update html lang attribute
    document.documentElement.lang = currentLang

    // Cleanup function (optional, but good practice)
    return () => {
      // We don't remove meta tags on cleanup as they should persist
      // until the next page navigation
    }
  }, [
    title,
    description,
    keywords,
    canonical,
    image,
    ogType,
    noindex,
    nofollow,
    additionalMeta,
    location.pathname,
    currentLang,
  ])

  return null // This component doesn't render anything
}
