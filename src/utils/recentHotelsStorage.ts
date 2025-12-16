export type RecentHotel = {
  hotelId: number
  hotelName: string
  city: string
  starRating: number
  thumbnailUrl?: string
  visitedAt: string
}

const KEY = 'voya_recent_hotels'
const MAX_ITEMS = 5

export function loadRecentHotels(): RecentHotel[] {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return []

    const parsed: unknown = JSON.parse(raw)

    if (
      Array.isArray(parsed) &&
      parsed.every((h) => {
        return (
          typeof h === 'object' &&
          h !== null &&
          typeof (h as RecentHotel).hotelId === 'number' &&
          typeof (h as RecentHotel).hotelName === 'string' &&
          typeof (h as RecentHotel).city === 'string' &&
          typeof (h as RecentHotel).starRating === 'number' &&
          typeof (h as RecentHotel).visitedAt === 'string'
        )
      })
    ) {
      return parsed as RecentHotel[]
    }

    return []
  } catch {
    return []
  }
}

export function addRecentHotel(hotel: Omit<RecentHotel, 'visitedAt'>) {
  const existing = loadRecentHotels()
  const now = new Date().toISOString()

  const withoutDup = existing.filter((h) => h.hotelId !== hotel.hotelId)

  const next: RecentHotel[] = [{ ...hotel, visitedAt: now }, ...withoutDup].slice(0, MAX_ITEMS)

  localStorage.setItem(KEY, JSON.stringify(next))
}
