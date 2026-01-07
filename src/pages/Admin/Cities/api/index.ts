import { baseApi } from '@/api/baseApi'
import type { CityForCreationDto, CityDto } from '@/types'

const API_ENDPOINTS = {
  CITIES: '/cities',
  CITY_BY_ID: (id: number) => `/cities/${id}`,
} as const

export interface PaginationQuery {
  searchQuery?: string
  name?: string
  pageNumber?: number
  pageSize?: number
}

export const citiesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCities: build.query<CityDto[], PaginationQuery | void>({
      query: (params) => {
        if (!params) return API_ENDPOINTS.CITIES
        return { url: API_ENDPOINTS.CITIES, params }
      },
      providesTags: ['Cities'],
    }),

    createCity: build.mutation<CityDto, CityForCreationDto>({
      query: (body) => ({
        url: API_ENDPOINTS.CITIES,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Cities'],
    }),

    updateCity: build.mutation<CityDto, { id: number; data: CityForCreationDto }>({
      query: ({ id, data }) => ({
        url: API_ENDPOINTS.CITY_BY_ID(id),
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Cities'],
    }),

    deleteCity: build.mutation<void, number>({
      query: (id) => ({
        url: API_ENDPOINTS.CITY_BY_ID(id),
        method: 'DELETE',
      }),
      invalidatesTags: ['Cities'],
    }),
  }),
})

export const {
  useGetCitiesQuery,
  useCreateCityMutation,
  useUpdateCityMutation,
  useDeleteCityMutation,
} = citiesApi
