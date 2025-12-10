import { baseApi } from '../baseApi'
import type {
  CityWithoutHotelsDto,
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
    getCities: build.query<CityWithoutHotelsDto[], PaginationQuery | void>({
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
  }),
})

export const {
  useGetCitiesQuery,
  useCreateCityMutation,
  useGetAdminHotelsQuery,
  useCreateHotelMutation,
  useGetRoomsAdminQuery,
  useCreateRoomMutation,
} = adminApi
