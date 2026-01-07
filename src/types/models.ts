export type UserType = 'Admin' | 'User'

export type CheckoutContext = {
  hotelId: number
  hotelName: string
  roomId: number
  roomNumber: string
  roomType: string
  cityName?: string
  pricePerNight: number
  checkInDate: string
  checkOutDate: string
  userId: number
}

export interface LoginRequestDto {
  userName: string
  password: string
}

export interface LoginResponseDto {
  authentication: string
  userType: UserType
}

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

export interface AmenityDto {
  id: number
  name: string
  description?: string | null
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
  visitDate: string
  thumbnailUrl: string
}

export interface DestinationDto {
  id: number
  cityName: string
  country: string
  description?: string | null
  thumbnailUrl: string
}

export interface AmenityDto {
  id: number
  name: string
  description?: string | null
}

export interface HotelSummaryDto {
  id: number
  name: string
  cityName: string
  country?: string | null
  starRating: number
  mainPhotoUrl?: string | null
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
  createdAt: string
}
export interface HotelDetailsDto {
  id: number
  name: string
  location: string
  description?: string | null
  hotelType?: string
  starRating: number
  latitude: number
  longitude: number
  imageUrl?: string | null
  availableRooms: number
  cityId: number
  amenities: { id: number; name: string; description: string | null }[]
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

export interface CityWithoutHotelsDto {
  id: number
  name: string
  description?: string | null
}

export interface CityForCreationDto {
  name: string
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

export interface HotelWithoutRoomsDto extends Omit<HotelDto, 'rooms'> {
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
