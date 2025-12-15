export type CheckoutContext = {
  hotelId: number
  hotelName: string
  roomId: number
  roomNumber: string
  roomType: string
  cityName?: string
  pricePerNight: number
  checkInDate: string // YYYY-MM-DD
  checkOutDate: string // YYYY-MM-DD
  userId: number
}
