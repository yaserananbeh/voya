import { baseApi } from '@/api/baseApi'
import type { FilterAmenityDto } from '../types'

const API_ENDPOINTS = {
  SEARCH_AMENITIES: '/search-results/amenities',
} as const

export type { FilterAmenityDto }

export const searchResultsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAmenities: builder.query<FilterAmenityDto[], void>({
      query: () => API_ENDPOINTS.SEARCH_AMENITIES,
      providesTags: ['Amenities'],
    }),
  }),
})

export const { useGetAmenitiesQuery } = searchResultsApi
