import { baseApi } from '@/api/baseApi'

export type FilterAmenityDto = {
  id: number
  name: string
  description?: string
}

export const searchResultsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAmenities: builder.query<FilterAmenityDto[], void>({
      query: () => 'search-results/amenities',
      providesTags: ['Amenities'],
    }),
  }),
})

export const { useGetAmenitiesQuery } = searchResultsApi
