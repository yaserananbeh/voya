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

export type BookingRequest = {
  customerName: string
  hotelName: string
  roomNumber: string
  roomType: string
  bookingDateTime: string
  totalCost: number
  paymentMethod: string
  specialRequests?: string
}

export type BookingDetailsResponseDto = {
  customerName: string | null
  hotelName: string | null
  roomNumber: string | null
  roomType: string | null
  bookingDateTime: string
  totalCost: number
  paymentMethod: string | null
  bookingStatus: string | null
  confirmationNumber: string | null
}

export type UserInfoValues = {
  customerName: string
  paymentMethod: string
  specialRequests?: string
}

export type CreateBookingResponse =
  | BookingDetailsResponseDto
  | { bookingId?: number; id?: number; [key: string]: unknown }
