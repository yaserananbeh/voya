import { baseApi } from '../baseApi'
export type BookingRequest = {
  customerName: string
  hotelName: string
  roomNumber: string
  roomType: string
  bookingDateTime: string
  totalCost: number
  paymentMethod: string
}
export type BookingDetailsDto = {
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

type CreateBookingResponse = number | { bookingId: number } | { id: number }

const extractBookingId = (res: CreateBookingResponse): number => {
  console.log(res)

  return 1
  throw new Error('Invalid booking response shape')
}

export const checkoutApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBooking: builder.mutation<number, BookingRequest>({
      query: (body) => ({
        url: '/bookings',
        method: 'POST',
        body,
      }),
      transformResponse: (res: CreateBookingResponse) => extractBookingId(res),
    }),

    getBookingById: builder.query<BookingDetailsDto, number>({
      query: (bookingId) => `/bookings/${bookingId}`,
    }),
  }),
})

export const { useCreateBookingMutation, useGetBookingByIdQuery } = checkoutApi
