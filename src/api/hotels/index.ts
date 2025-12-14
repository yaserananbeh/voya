import { baseApi } from '@/api/baseApi'

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
    // (Search Results)
    getHotels: builder.query<HotelDto[], GetHotelsQuery>({
      query: ({ searchQuery, pageNumber, pageSize }) => ({
        url: 'hotels',
        params: {
          ...(searchQuery ? { searchQuery } : {}),
          pageNumber,
          pageSize,
        },
      }),
      providesTags: ['Hotel'],
    }),

    // 2. Get Single (Details Page) - MOVED HERE
    getHotel: builder.query<HotelDto, number>({
      query: (id) => `hotels/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Hotel', id }],
    }),
    getHotelGallery: builder.query<HotelGalleryPhotoDto[], number>({
      query: (id) => `hotels/${id}/gallery`,
    }),

    getHotelRooms: builder.query<HotelRoomDto[], number>({
      query: (id) => `hotels/${id}/rooms`,
    }),

    getHotelReviews: builder.query<HotelReviewDto[], number>({
      query: (id) => `hotels/${id}/reviews`,
    }),
  }),
})

// Export both hooks from the same file
export const {
  useGetHotelsQuery,
  useGetHotelQuery,
  useGetHotelGalleryQuery,
  useGetHotelRoomsQuery,
  useGetHotelReviewsQuery,
} = hotelsApi
