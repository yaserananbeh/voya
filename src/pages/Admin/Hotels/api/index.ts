import { baseApi } from '@/api/baseApi'
import type { HotelWithoutRoomsDto, HotelForCreationDto } from '@/types'
import { API_ENDPOINTS } from '@/constants'

export interface PaginationQuery {
  searchQuery?: string
  name?: string
  pageNumber?: number
  pageSize?: number
}

export const hotelsAdminApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAdminHotels: build.query<HotelWithoutRoomsDto[], PaginationQuery | void>({
      query: (params) => {
        if (!params) return API_ENDPOINTS.HOTELS
        return { url: API_ENDPOINTS.HOTELS, params }
      },
      providesTags: ['Hotel'],
    }),

    createHotel: build.mutation<HotelWithoutRoomsDto, HotelForCreationDto>({
      query: (body) => ({
        url: API_ENDPOINTS.HOTELS,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Hotel'],
    }),

    updateHotel: build.mutation<HotelWithoutRoomsDto, { id: number; data: HotelForCreationDto }>({
      query: ({ id, data }) => ({
        url: API_ENDPOINTS.HOTEL_BY_ID(id),
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Hotel'],
    }),

    deleteHotel: build.mutation<void, number>({
      query: (id) => ({
        url: API_ENDPOINTS.HOTEL_BY_ID(id),
        method: 'DELETE',
      }),
      invalidatesTags: ['Hotel'],
    }),
  }),
})

export const {
  useGetAdminHotelsQuery,
  useCreateHotelMutation,
  useUpdateHotelMutation,
  useDeleteHotelMutation,
} = hotelsAdminApi
