import { baseApi } from '@/api/baseApi'
import type { RoomDto, RoomForCreationDto } from '@/types'
import { API_ENDPOINTS } from '@/constants'

export interface PaginationQuery {
  searchQuery?: string
  name?: string
  pageNumber?: number
  pageSize?: number
}

export const roomsAdminApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
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
  }),
})

export const {
  useGetRoomsAdminQuery,
  useCreateRoomMutation,
  useUpdateRoomMutation,
  useDeleteRoomMutation,
} = roomsAdminApi
