export type HotelAmenityDto = {
  id: number
  name: string
  description?: string
}

export type RoomAmenityDto = {
  id: number
  name: string
  description: string
}

export type HotelRoomDto = {
  roomId: number
  roomNumber: number
  roomPhotoUrl: string
  roomType: string
  capacityOfAdults: number
  capacityOfChildren: number
  amenities: RoomAmenityDto[]
  price: number
  availability: boolean
}

export type HotelDto = {
  id: number
  name: string
  hotelName?: string
  location: string
  description: string
  hotelType: 'Boutique' | 'Resort' | 'Hotel' | 'Lodge' | 'Inn' | (string & {})
  starRating: number
  latitude?: number
  longitude?: number
  rooms: HotelRoomDto[]
  imageUrl?: string
  availableRooms?: number
  cityId?: number
  amenities: HotelAmenityDto[]
}

export type GetHotelsQuery = {
  searchQuery?: string
  pageNumber: number
  pageSize: number
}

export type HotelGalleryPhotoDto = {
  id: number
  url: string
}

export type HotelReviewDto = {
  reviewId: number
  customerName: string
  rating: number
  description: string
}

export interface RoomCapacityDto {
  adults: number
  children: number
}

export interface RoomAvailabilityResultDto {
  id: number
  roomNumber: string
  imageUrl: string
  roomType: string
  capacity: RoomCapacityDto
  amenities: string[]
  pricePerNight: number
  isAvailable: boolean
}
