import { baseApi } from '@/api/baseApi'
import { BOOKING_STATUS } from '../constants'

const API_ENDPOINTS = {
  BOOKINGS: '/bookings',
  BOOKING_BY_ID: (id: number) => `/bookings/${id}`,
} as const
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

type CreateBookingResponse =
  | BookingDetailsDto
  | { bookingId?: number; id?: number; [key: string]: unknown }

export const checkoutApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBooking: builder.mutation<BookingDetailsDto, BookingRequest>({
      query: (body) => ({
        url: API_ENDPOINTS.BOOKINGS,
        method: 'POST',
        body,
      }),
      transformResponse: (res: CreateBookingResponse): BookingDetailsDto => {
        if (typeof res === 'object' && res !== null) {
          return {
            customerName: 'customerName' in res ? (res.customerName as string | null) : null,
            hotelName: 'hotelName' in res ? (res.hotelName as string | null) : null,
            roomNumber: 'roomNumber' in res ? (res.roomNumber as string | null) : null,
            roomType: 'roomType' in res ? (res.roomType as string | null) : null,
            bookingDateTime:
              'bookingDateTime' in res ? (res.bookingDateTime as string) : new Date().toISOString(),
            totalCost: 'totalCost' in res ? (res.totalCost as number) : 0,
            paymentMethod: 'paymentMethod' in res ? (res.paymentMethod as string | null) : null,
            bookingStatus:
              'bookingStatus' in res
                ? (res.bookingStatus as string | null)
                : BOOKING_STATUS.CONFIRMED,
            confirmationNumber:
              'confirmationNumber' in res ? (res.confirmationNumber as string | null) : null,
          }
        }
        throw new Error('Invalid booking response shape')
      },
    }),

    getBookingById: builder.query<BookingDetailsDto, number>({
      query: (bookingId) => API_ENDPOINTS.BOOKING_BY_ID(bookingId),
    }),
  }),
})

export const { useCreateBookingMutation, useGetBookingByIdQuery } = checkoutApi
