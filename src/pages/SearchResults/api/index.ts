import { baseApi } from '@/api/baseApi'

const API_ENDPOINTS = {
  SEARCH_AMENITIES: '/search-results/amenities',
} as const

export type FilterAmenityDto = {
  id: number
  name: string
  description?: string
}

export const searchResultsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAmenities: builder.query<FilterAmenityDto[], void>({
      query: () => API_ENDPOINTS.SEARCH_AMENITIES,
      providesTags: ['Amenities'],
    }),
  }),
})

export const { useGetAmenitiesQuery } = searchResultsApi
