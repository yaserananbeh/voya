import { baseApi } from '../baseApi'
import type {
  CityForCreationDto,
  CityDto,
  HotelWithoutRoomsDto,
  HotelForCreationDto,
  RoomDto,
  RoomForCreationDto,
} from '../../types/models'
import { API_ENDPOINTS } from '@/constants'

export interface PaginationQuery {
  searchQuery?: string
  name?: string
  pageNumber?: number
  pageSize?: number
}

export const adminApi = baseApi.injectEndpoints({
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

    getRoomsAdmin: build.query<RoomDto[], PaginationQuery | void>({
      query: (params) => {
        if (!params) return API_ENDPOINTS.ROOMS
        return { url: API_ENDPOINTS.ROOMS, params }
      },
      providesTags: ['Rooms'],
    }),

    createRoom: build.mutation<RoomDto, RoomForCreationDto>({
      query: (body) => ({
        url: API_ENDPOINTS.ROOMS,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Rooms'],
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

    updateRoom: build.mutation<RoomDto, { id: number; data: RoomForCreationDto }>({
      query: ({ id, data }) => ({
        url: API_ENDPOINTS.ROOM_BY_ID(id),
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Rooms'],
    }),

    deleteRoom: build.mutation<void, number>({
      query: (id) => ({
        url: API_ENDPOINTS.ROOM_BY_ID(id),
        method: 'DELETE',
      }),
      invalidatesTags: ['Rooms'],
    }),
    getDashboardStats: build.query<
      {
        totalCities: number
        totalHotels: number
        totalRooms: number
        averageStarRating: number
        totalAvailableRooms: number
      },
      void
    >({
      query: () => API_ENDPOINTS.ADMIN_DASHBOARD,
      providesTags: ['Admin'],
    }),
  }),
})

export const {
  useGetCitiesQuery,
  useCreateCityMutation,
  useGetAdminHotelsQuery,
  useCreateHotelMutation,
  useGetRoomsAdminQuery,
  useCreateRoomMutation,
  useUpdateCityMutation,
  useDeleteCityMutation,
  useUpdateHotelMutation,
  useDeleteHotelMutation,
  useUpdateRoomMutation,
  useDeleteRoomMutation,
  useGetDashboardStatsQuery,
} = adminApi
