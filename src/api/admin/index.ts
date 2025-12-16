import { baseApi } from '../baseApi'
import type {
  CityForCreationDto,
  CityDto,
  HotelWithoutRoomsDto,
  HotelForCreationDto,
  RoomDto,
  RoomForCreationDto,
} from '../../types/models'

export interface PaginationQuery {
  searchQuery?: string
  name?: string
  pageNumber?: number
  pageSize?: number
}

// Cities
export const adminApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCities: build.query<CityDto[], PaginationQuery | void>({
      query: (params) => {
        if (!params) return '/cities'
        return { url: '/cities', params }
      },
      providesTags: ['Cities'],
    }),

    createCity: build.mutation<CityDto, CityForCreationDto>({
      query: (body) => ({
        url: '/cities',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Cities'],
    }),

    // Hotels (admin grid)
    getAdminHotels: build.query<HotelWithoutRoomsDto[], PaginationQuery | void>({
      query: (params) => {
        if (!params) return '/hotels'
        return { url: '/hotels', params }
      },
      providesTags: ['Hotel'],
    }),

    createHotel: build.mutation<HotelWithoutRoomsDto, HotelForCreationDto>({
      query: (body) => ({
        url: '/hotels',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Hotel'],
    }),

    // Rooms (admin grid)
    getRoomsAdmin: build.query<RoomDto[], PaginationQuery | void>({
      query: (params) => {
        if (!params) return '/rooms'
        return { url: '/rooms', params }
      },
      providesTags: ['Rooms'],
    }),

    createRoom: build.mutation<RoomDto, RoomForCreationDto>({
      query: (body) => ({
        url: '/rooms',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Rooms'],
    }),
    updateCity: build.mutation<CityDto, { id: number; data: CityForCreationDto }>({
      query: ({ id, data }) => ({
        url: `/cities/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Cities'],
    }),

    deleteCity: build.mutation<void, number>({
      query: (id) => ({
        url: `/cities/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Cities'],
    }),

    updateHotel: build.mutation<HotelWithoutRoomsDto, { id: number; data: HotelForCreationDto }>({
      query: ({ id, data }) => ({
        url: `/hotels/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Hotel'],
    }),

    deleteHotel: build.mutation<void, number>({
      query: (id) => ({
        url: `/hotels/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Hotel'],
    }),

    updateRoom: build.mutation<RoomDto, { id: number; data: RoomForCreationDto }>({
      query: ({ id, data }) => ({
        url: `/rooms/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Rooms'],
    }),

    deleteRoom: build.mutation<void, number>({
      query: (id) => ({
        url: `/rooms/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Rooms'],
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
} = adminApi
