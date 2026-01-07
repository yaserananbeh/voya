export interface SearchQueryDto {
  city?: string
  checkInDate?: string
  checkOutDate?: string
  adults?: number
  children?: number
  numberOfRooms?: number
  amenities?: string[]
  starRating?: number
}

export type FilterAmenityDto = {
  id: number
  name: string
  description?: string
}

export interface AmenityDto {
  id: number
  name: string
  description?: string | null
}
