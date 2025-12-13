import { baseApi } from '@/api/baseApi'

export type HotelAmenityDto = {
  id: number
  name: string
  description?: string
}

export type HotelRoomDto = {
  id: number
  name: string
  type: string
  price: number
  available: boolean
  maxOccupancy: number
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

export const hotelsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 1. Get List (Search Results)
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
  }),
})

// Export both hooks from the same file
export const { useGetHotelsQuery, useGetHotelQuery } = hotelsApi
