import type { PaginationQuery } from '@/types/common'

export interface HotelWithoutRoomsDto {
  id: number
  name: string
  cityId: number
  cityName: string
  starRating: number
  numberOfRooms?: number
}

export interface HotelForCreationDto {
  name: string
  cityId: number
  description?: string | null
  hotelType?: string
  starRating: number
  location?: string
  latitude?: number
  longitude?: number
  imageUrl?: string
}

export interface HotelDto {
  id: number
  hotelName?: string
  name: string
  location: string
  description: string
  hotelType: 'Boutique' | 'Resort' | 'Hotel' | 'Lodge' | 'Inn'
  starRating: number
  latitude?: number
  longitude?: number
  rooms?: Array<{
    id: number
    name: string
    type: string
    price: number
    available: boolean
    maxOccupancy: number
  }>
  imageUrl?: string
  availableRooms?: number
  cityId: number
  amenities?: Array<{
    id: number
    name: string
    description?: string
  }>
}

export type { PaginationQuery }
