// ======================
// Auth
// ======================

export type UserType = 'Admin' | 'User'

export interface LoginRequestDto {
  userName: string
  password: string
}

export interface LoginResponseDto {
  authentication: string
  userType: UserType
}

// ======================
// Home / Search
// ======================

export interface SearchQueryDto {
  city?: string
  checkInDate?: string // ISO date
  checkOutDate?: string
  adults?: number
  children?: number
  numberOfRooms?: number
  amenities?: string[]
  starRating?: number
}

export interface SearchResultDto {
  hotelId: number
  hotelName: string
  city: string
  country?: string | null
  starRating: number
  pricePerNight: number
  originalPrice?: number | null
  discountPercentage?: number | null
  roomType: string
  photoUrl: string
  amenities: string[]
}

export interface FeaturedDealDto {
  id: number
  hotelId: number
  hotelName: string
  city: string
  originalPrice: number
  finalPrice: number
  discountPercentage: number
  title: string
  description?: string | null
  imageUrl: string
  starRating: number
}

export interface RecentHotelResultDto {
  id: number
  hotelId: number
  hotelName: string
  city: string
  starRating: number
  visitDate: string // ISO date
  thumbnailUrl: string
}

export interface DestinationDto {
  id: number
  cityName: string
  country: string
  description?: string | null
  thumbnailUrl: string
}

// ======================
// Amenities (Search Results filters)
// ======================

export interface AmenityDto {
  id: number
  name: string
  description?: string | null
}

// ======================
// Hotel details
// ======================

export interface HotelSummaryDto {
  id: number
  name: string
  city: string
  country?: string | null
  starRating: number
  imageUrl?: string | null
  pricePerNight?: number | null
}
export interface HotelAvailableRoomDto {
  id: number
  roomType: string
  pricePerNight: number
  isAvailable: boolean
  capacity: RoomCapacityDto
  imageUrl?: string | null
}

export interface HotelReviewDto {
  id: number
  userName: string
  rating: number
  comment?: string | null
  createdAt: string // ISO date
}
export interface HotelDetailsDto {
  id: number
  name: string
  description?: string | null
  city: string
  country?: string | null
  location: string
  amenities: string[]
  starRating: number
  numberOfAvailableRooms: number
  imageUrl?: string | null
}

export interface HotelPhotoDto {
  id: number
  hotelId: number
  imageUrl: string
  caption?: string | null
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

// ======================
// Booking / Checkout
// ======================

export interface BookingRequestDto {
  hotelId: number
  roomId: number
  userId: number
  checkInDate: string
  checkOutDate: string
  adults: number
  children: number
  fullName: string
  email: string
  phoneNumber: string
  paymentMethod: 'credit_card' | 'paypal' | 'cash'
}

export interface BookingDetailsDto {
  id: number
  bookingReference: string
  hotelName: string
  roomType: string
  city: string
  checkInDate: string
  checkOutDate: string
  totalPrice: number
  guestName: string
  createdAt: string
}

// ======================
// Admin: Cities / Hotels / Rooms
// ======================

export interface CityWithoutHotelsDto {
  id: number
  name: string
  country: string
}

export interface CityForCreationDto {
  name: string
  country: string
  description?: string | null
}

export interface CityDto extends CityWithoutHotelsDto {
  description?: string | null
}

export interface HotelWithoutRoomsDto {
  id: number
  name: string
  cityId: number
  cityName: string
  starRating: number
}

export interface HotelForCreationDto {
  name: string
  cityId: number
  description?: string | null
  starRating: number
}

export interface RoomDto {
  id: number
  roomNumber: string
  hotelId: number
  hotelName: string
  cityName: string
  capacity: RoomCapacityDto
  pricePerNight: number
}

export interface RoomForCreationDto {
  roomNumber: string
  hotelId: number
  capacity: RoomCapacityDto
  pricePerNight: number
}

// ======================
// Photos / Uploads
// ======================

export interface PhotoDto {
  id: number
  hotelId?: number
  roomId?: number
  imageUrl: string
  thumbnailUrl?: string | null
}
