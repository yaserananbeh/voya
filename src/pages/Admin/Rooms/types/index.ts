import type { PaginationQuery } from '@/types/common'

export interface RoomDto {
  roomId: number
  id?: number
  roomNumber: number | string
  roomPhotoUrl?: string
  roomType: string
  capacityOfAdults: number
  capacityOfChildren: number
  amenities?: Array<{
    id: number
    name: string
    description?: string
  }>
  price: number
  availability: boolean
  hotelId?: number
  creationDate?: string
  modificationDate?: string
}

export interface RoomForCreationDto {
  roomNumber: number | string
  hotelId: number
  roomType: string
  capacityOfAdults: number
  capacityOfChildren: number
  price: number
  availability?: boolean
  roomPhotoUrl?: string
}

export type { PaginationQuery }
