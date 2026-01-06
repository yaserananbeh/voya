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

/**
 * Load environment variables from .env file
 */
function loadEnvFile() {
  const envPath = path.join(__dirname, '..', '.env')
  const envLocalPath = path.join(__dirname, '..', '.env.local')

  // Try .env.local first, then .env
  const filesToTry = [envLocalPath, envPath]

  for (const envFile of filesToTry) {
    if (fs.existsSync(envFile)) {
      const content = fs.readFileSync(envFile, 'utf8')
      const lines = content.split('\n')

      for (const line of lines) {
        const trimmedLine = line.trim()
        // Skip comments and empty lines
        if (!trimmedLine || trimmedLine.startsWith('#')) continue

        const match = trimmedLine.match(/^([^=]+)=(.*)$/)
        if (match) {
          const key = match[1].trim()
          let value = match[2].trim()

          // Remove quotes if present
          if (
            (value.startsWith('"') && value.endsWith('"')) ||
            (value.startsWith("'") && value.endsWith("'"))
          ) {
            value = value.slice(1, -1)
          }

          // Only set if not already in process.env (env vars take precedence)
          if (!process.env[key]) {
            process.env[key] = value
          }
        }
      }
      break
    }
  }
}

// Load .env file
loadEnvFile()

// API base URL - reads from .env file or environment variable, falls back to production URL
const API_BASE_URL =
  process.env.VITE_API_BASE_URL || 'https://travel-and-accommodation-booking-static.onrender.com'
const SITE_URL = 'https://ya-voya.netlify.app'
const HOTELS_ENDPOINT = `${API_BASE_URL}/hotels`

// Static routes that should always be included
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

/**
 * Fetch all hotels from the API
 * Note: This assumes the API supports pagination or returns all hotels
 * You may need to adjust this based on your API's pagination behavior
 */
async function fetchAllHotels() {
  try {
    // Fetch hotels with a large page size to get all hotels
    // Adjust pageSize based on your API's maximum allowed value
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

/**
 * Generate sitemap XML content
 */
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

/**
 * Main function to generate sitemap
 */
async function main() {
  console.log('Generating sitemap...')
  console.log(`API URL: ${API_BASE_URL}`)
  console.log(`Site URL: ${SITE_URL}`)

  // Fetch hotels from API
  const hotels = await fetchAllHotels()
  console.log(`Found ${hotels.length} hotels`)

  // Create routes for hotels
  const hotelRoutes = hotels.map((hotel) => ({
    loc: `${SITE_URL}/hotel/${hotel.id}`,
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'weekly',
    priority: '0.7',
  }))

  // Combine static and dynamic routes
  const allRoutes = [...staticRoutes, ...hotelRoutes]

  // Generate sitemap XML
  const sitemapXml = generateSitemap(allRoutes)

  // Write to public/sitemap.xml
  const sitemapPath = path.join(__dirname, '..', 'public', 'sitemap.xml')
  fs.writeFileSync(sitemapPath, sitemapXml, 'utf8')

  console.log(`✅ Sitemap generated successfully!`)
  console.log(`   Total URLs: ${allRoutes.length}`)
  console.log(`   Static routes: ${staticRoutes.length}`)
  console.log(`   Hotel pages: ${hotelRoutes.length}`)
  console.log(`   Saved to: ${sitemapPath}`)
}

// Run the script
main().catch((error) => {
  console.error('Error generating sitemap:', error)
  process.exit(1)
})
