import { baseApi } from '@/api/baseApi'
import { API_ENDPOINTS } from '@/constants'

export type HotelAmenityDto = {
  id: number
  name: string
  description?: string
}

export type RoomAmenityDto = {
  id: number
  name: string
  description: string
}

export type HotelRoomDto = {
  roomId: number
  roomNumber: number
  roomPhotoUrl: string
  roomType: string
  capacityOfAdults: number
  capacityOfChildren: number
  amenities: RoomAmenityDto[]
  price: number
  availability: boolean
}

export type HotelDto = {
  id: number
  name: string
  hotelName?: string
  location: string
  description: string
  hotelType: 'Boutique' | 'Resort' | 'Hotel' | 'Lodge' | 'Inn' | (string & {})
  starRating: number
  latitude?: number
  longitude?: number
  rooms: HotelRoomDto[]
  imageUrl?: string
  availableRooms?: number
  cityId?: number
  amenities: HotelAmenityDto[]
}

export type GetHotelsQuery = {
  searchQuery?: string
  pageNumber: number
  pageSize: number
}
export type HotelGalleryPhotoDto = {
  id: number
  url: string
}

export type HotelReviewDto = {
  reviewId: number
  customerName: string
  rating: number
  description: string
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
