import { baseApi } from '../baseApi'
import type { BookingRequestDto, BookingDetailsDto } from '../../types/models'

export const checkoutApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createBooking: build.mutation<BookingDetailsDto, BookingRequestDto>({
      query: (body) => ({
        url: '/bookings',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Booking', 'Rooms'],
    }),

    getBooking: build.query<BookingDetailsDto, number>({
      query: (id) => `/bookings/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Booking', id }, 'Booking'],
    }),
  }),
})

export const { useCreateBookingMutation, useGetBookingQuery } = checkoutApi
