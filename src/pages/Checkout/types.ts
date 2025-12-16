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
