import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string
  canonical?: string
  image?: string
  ogType?: string
  noindex?: boolean
  nofollow?: boolean
  additionalMeta?: Array<{ name: string; content: string }>
}

const APP_NAME = 'Voya'
const DEFAULT_DESCRIPTION =
  'Discover stays that fit how you travel. Search trusted stays, compare deals, and book in minutes.'
const DEFAULT_KEYWORDS = 'hotels, booking, travel, accommodation, stays, vacation, trip'
const BASE_URL = typeof window !== 'undefined' ? window.location.origin : ''

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
    const fullTitle = title ? `${title} | ${APP_NAME}` : APP_NAME
    document.title = fullTitle

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

    updateMetaTag('title', fullTitle)

    if (description) {
      updateMetaTag('description', description)
      updateMetaTag('og:description', description, 'property')
    } else {
      updateMetaTag('description', DEFAULT_DESCRIPTION)
      updateMetaTag('og:description', DEFAULT_DESCRIPTION, 'property')
    }

    if (keywords) {
      updateMetaTag('keywords', keywords)
    } else {
      updateMetaTag('keywords', DEFAULT_KEYWORDS)
    }

    const canonicalUrl = canonical || `${BASE_URL}${location.pathname}`
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement
    if (!canonicalLink) {
      canonicalLink = document.createElement('link')
      canonicalLink.setAttribute('rel', 'canonical')
      document.head.appendChild(canonicalLink)
    }
    canonicalLink.setAttribute('href', canonicalUrl)

    updateMetaTag('og:title', fullTitle, 'property')
    updateMetaTag('og:type', ogType, 'property')
    updateMetaTag('og:url', `${BASE_URL}${location.pathname}`, 'property')
    updateMetaTag('og:site_name', APP_NAME, 'property')
    updateMetaTag('og:locale', currentLang, 'property')

    if (image) {
      updateMetaTag('og:image', image, 'property')
    }

    updateMetaTag('twitter:card', 'summary_large_image')
    updateMetaTag('twitter:title', fullTitle)
    if (description) {
      updateMetaTag('twitter:description', description)
    }
    if (image) {
      updateMetaTag('twitter:image', image)
    }

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

    additionalMeta.forEach((meta) => {
      updateMetaTag(meta.name, meta.content)
    })

    document.documentElement.lang = currentLang

    return () => {}
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

  return null
}
