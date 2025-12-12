import { baseApi } from '../baseApi'
import type {
  HotelDetailsDto,
  HotelPhotoDto,
  RoomAvailabilityResultDto,
  HotelSummaryDto,
  HotelAvailableRoomDto,
  HotelReviewDto,
} from '@/types/models'

export interface HotelListQueryDto {
  searchQuery?: string
  pageNumber?: number
  pageSize?: number
}

export const hotelApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getHotels: build.query<HotelSummaryDto[], HotelListQueryDto | void>({
      query: (params) => {
        if (!params) return '/hotels'
        return {
          url: '/hotels',
          params,
        }
      },
      providesTags: ['Hotel'],
    }),

    getHotel: build.query<HotelDetailsDto, number>({
      query: (hotelId) => `/hotels/${hotelId}`,
      providesTags: (_result, _error, hotelId) => [{ type: 'Hotel', id: hotelId }, 'Hotel'],
    }),

    getGallery: build.query<HotelPhotoDto[], number>({
      query: (hotelId) => `/hotels/${hotelId}/gallery`,
      providesTags: (_result, _error, hotelId) => [
        { type: 'Hotel', id: hotelId },
        'Hotel',
        'Photos',
      ],
    }),

    getAvailableRooms: build.query<HotelAvailableRoomDto[], number>({
      query: (hotelId) => `/hotels/${hotelId}/available-rooms`,
      providesTags: (_result, _error, hotelId) => [{ type: 'Rooms', id: hotelId }, 'Rooms'],
    }),

    getHotelReviews: build.query<HotelReviewDto[], number>({
      query: (hotelId) => `/hotels/${hotelId}/reviews`,
      providesTags: (_result, _error, hotelId) => [{ type: 'Hotel', id: hotelId }, 'Hotel'],
    }),
    getRooms: build.query<
      RoomAvailabilityResultDto[],
      { hotelId: number; checkInDate: string; checkOutDate: string }
    >({
      query: ({ hotelId, checkInDate, checkOutDate }) => ({
        url: `/hotels/${hotelId}/rooms`,
        params: { checkInDate, checkOutDate },
      }),
      providesTags: (_result, _error, { hotelId }) => [{ type: 'Rooms', id: hotelId }, 'Rooms'],
    }),
  }),
})

export const {
  useGetHotelsQuery,
  useGetHotelQuery,
  useGetGalleryQuery,
  useGetRoomsQuery,
  useGetAvailableRoomsQuery,
  useGetHotelReviewsQuery,
} = hotelApi
