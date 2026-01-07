/**
 * Script to generate sitemap.xml with dynamic hotel pages
 * Run this script before deploying to update the sitemap with current hotel IDs
 *
 * Usage: pnpm generate:sitemap
 * Or: node scripts/generate-sitemap.js
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function loadEnvFile() {
  const envPath = path.join(__dirname, '..', '.env')
  const envLocalPath = path.join(__dirname, '..', '.env.local')

  const filesToTry = [envLocalPath, envPath]

  for (const envFile of filesToTry) {
    if (fs.existsSync(envFile)) {
      const content = fs.readFileSync(envFile, 'utf8')
      const lines = content.split('\n')

      for (const line of lines) {
        const trimmedLine = line.trim()
        if (!trimmedLine || trimmedLine.startsWith('#')) continue

        const match = trimmedLine.match(/^([^=]+)=(.*)$/)
        if (match) {
          const key = match[1].trim()
          let value = match[2].trim()

          if (
            (value.startsWith('"') && value.endsWith('"')) ||
            (value.startsWith("'") && value.endsWith("'"))
          ) {
            value = value.slice(1, -1)
          }

          if (!process.env[key]) {
            process.env[key] = value
          }
        }
      }
      break
    }
  }
}

loadEnvFile()

const API_BASE_URL =
  process.env.VITE_API_BASE_URL || 'https://travel-and-accommodation-booking-static.onrender.com'
const SITE_URL = 'https://ya-voya.netlify.app'
const HOTELS_ENDPOINT = `${API_BASE_URL}/hotels`

const staticRoutes = [
  {
    loc: `${SITE_URL}/home`,
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'daily',
    priority: '1.0',
  },
  {
    loc: `${SITE_URL}/search`,
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'daily',
    priority: '0.8',
  },
  {
    loc: `${SITE_URL}/login`,
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: '0.5',
  },
]

async function fetchAllHotels() {
  try {
    const response = await fetch(`${HOTELS_ENDPOINT}?pageNumber=1&pageSize=1000`)

    if (!response.ok) {
      console.warn(
        `Warning: Failed to fetch hotels (${response.status}). Continuing with static routes only.`,
      )
      return []
    }

    const hotels = await response.json()
    return Array.isArray(hotels) ? hotels : []
  } catch (error) {
    console.warn(
      `Warning: Error fetching hotels: ${error.message}. Continuing with static routes only.`,
    )
    return []
  }
}

function generateSitemap(routes) {
  const urls = routes
    .map(
      (route) => `  <url>
    <loc>${route.loc}</loc>
    <lastmod>${route.lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`,
    )
    .join('\n\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">

${urls}

</urlset>`
}

async function main() {
  console.log('Generating sitemap...')
  console.log(`API URL: ${API_BASE_URL}`)
  console.log(`Site URL: ${SITE_URL}`)

  const hotels = await fetchAllHotels()
  console.log(`Found ${hotels.length} hotels`)

  const hotelRoutes = hotels.map((hotel) => ({
    loc: `${SITE_URL}/hotel/${hotel.id}`,
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'weekly',
    priority: '0.7',
  }))

  const allRoutes = [...staticRoutes, ...hotelRoutes]

  const sitemapXml = generateSitemap(allRoutes)

  const sitemapPath = path.join(__dirname, '..', 'public', 'sitemap.xml')
  fs.writeFileSync(sitemapPath, sitemapXml, 'utf8')

  console.log(`✅ Sitemap generated successfully!`)
  console.log(`   Total URLs: ${allRoutes.length}`)
  console.log(`   Static routes: ${staticRoutes.length}`)
  console.log(`   Hotel pages: ${hotelRoutes.length}`)
  console.log(`   Saved to: ${sitemapPath}`)
}

main().catch((error) => {
  console.error('Error generating sitemap:', error)
  process.exit(1)
})
