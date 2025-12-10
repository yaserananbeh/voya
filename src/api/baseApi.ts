import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL as string,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token')
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: ['Auth', 'Home', 'Hotel', 'Rooms', 'Cities', 'Amenities', 'Booking', 'Admin', 'Photos'],
  endpoints: () => ({}),
})
