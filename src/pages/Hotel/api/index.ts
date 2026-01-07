import { baseApi } from '@/api/baseApi'
import type {
  HotelAmenityDto,
  RoomAmenityDto,
  HotelRoomDto,
  HotelDto,
  GetHotelsQuery,
  HotelGalleryPhotoDto,
  HotelReviewDto,
} from '../types'

const API_ENDPOINTS = {
  HOTELS: '/hotels',
  HOTEL_BY_ID: (id: number) => `/hotels/${id}`,
  HOTEL_GALLERY: (id: number) => `/hotels/${id}/gallery`,
  HOTEL_ROOMS: (id: number) => `/hotels/${id}/rooms`,
  HOTEL_REVIEWS: (id: number) => `/hotels/${id}/reviews`,
} as const

export type {
  HotelAmenityDto,
  RoomAmenityDto,
  HotelRoomDto,
  HotelDto,
  GetHotelsQuery,
  HotelGalleryPhotoDto,
  HotelReviewDto,
}
export const hotelsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getHotels: builder.query<HotelDto[], GetHotelsQuery>({
      query: ({ searchQuery, pageNumber, pageSize }) => ({
        url: API_ENDPOINTS.HOTELS,
        params: {
          ...(searchQuery ? { searchQuery } : {}),
          pageNumber,
          pageSize,
        },
      }),
      providesTags: ['Hotel'],
    }),

    getHotel: builder.query<HotelDto, number>({
      query: (id) => API_ENDPOINTS.HOTEL_BY_ID(id),
      providesTags: (_result, _error, id) => [{ type: 'Hotel', id }],
    }),
    getHotelGallery: builder.query<HotelGalleryPhotoDto[], number>({
      query: (id) => API_ENDPOINTS.HOTEL_GALLERY(id),
    }),

    getHotelRooms: builder.query<HotelRoomDto[], number>({
      query: (id) => API_ENDPOINTS.HOTEL_ROOMS(id),
    }),

    getHotelReviews: builder.query<HotelReviewDto[], number>({
      query: (id) => API_ENDPOINTS.HOTEL_REVIEWS(id),
    }),
  }),
})

export const {
  useGetHotelsQuery,
  useGetHotelQuery,
  useGetHotelGalleryQuery,
  useGetHotelRoomsQuery,
  useGetHotelReviewsQuery,
} = hotelsApi
