import { baseApi } from '@/api/baseApi'
import type {
  BookingDetailsDto,
  BookingRequest,
  BookingDetailsResponseDto,
  CreateBookingResponse,
} from '@/pages/Checkout/types'

const API_ENDPOINTS = {
  BOOKINGS: '/bookings',
  BOOKING_BY_ID: (id: number) => `/bookings/${id}`,
} as const

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
          const id =
            'id' in res ? (res.id as number) : 'bookingId' in res ? (res.bookingId as number) : 0
          const confirmationNumber =
            'confirmationNumber' in res ? (res.confirmationNumber as string | null) : null

          return {
            id,
            bookingReference: confirmationNumber || `BOOK-${id}`,
            hotelName: 'hotelName' in res ? (res.hotelName as string | null) || '' : '',
            roomType: 'roomType' in res ? (res.roomType as string | null) || '' : '',
            city: '',
            checkInDate: '',
            checkOutDate: '',
            totalPrice: 'totalCost' in res ? (res.totalCost as number) : 0,
            guestName: 'customerName' in res ? (res.customerName as string | null) || '' : '',
            createdAt:
              'bookingDateTime' in res ? (res.bookingDateTime as string) : new Date().toISOString(),
          }
        }
        throw new Error('Invalid booking response shape')
      },
    }),

    getBookingById: builder.query<BookingDetailsResponseDto, number>({
      query: (bookingId) => API_ENDPOINTS.BOOKING_BY_ID(bookingId),
    }),
  }),
})

export const { useCreateBookingMutation, useGetBookingByIdQuery } = checkoutApi
