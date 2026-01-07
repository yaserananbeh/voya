import { baseApi } from '@/api/baseApi'
import { API_ENDPOINTS } from '@/constants'
export type HomeSearchRequest = {
  checkInDate?: string
  checkOutDate?: string
  city?: string
  starRate?: number
  sort?: string
  numberOfRooms?: number
  adults?: number
  children?: number
}

export type SearchResultDto = {
  hotelId: number
  hotelName: string
  starRating: number
  latitude: number
  longitude: number
  roomPrice: number
  roomType: string | null
  cityName: string | null
  roomPhotoUrl: string | null
  discount: number
  amenities: { id: number; name: string; description: string | null }[] | null
}

export type FeaturedDealDto = {
  hotelId: number
  originalRoomPrice: number
  discount: number
  finalPrice: number
  cityName: string | null
  hotelName: string | null
  hotelStarRating: number
  title: string | null
  description: string | null
  roomPhotoUrl: string | null
}

export type RecentHotelResultDto = {
  hotelId: number
  hotelName: string | null
  starRating: number
  visitDate: string
  cityName: string | null
  thumbnailUrl: string | null
  priceLowerBound: number
  priceUpperBound: number
}

export type DestinationDto = {
  cityId: number
  cityName: string | null
  countryName: string | null
  description: string | null
  thumbnailUrl: string | null
}

export const homeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    homeSearch: build.query<SearchResultDto[], HomeSearchRequest>({
      query: (params) => ({
        url: API_ENDPOINTS.HOME_SEARCH,
        method: 'GET',
        params,
      }),
      providesTags: ['Home'],
    }),
    featuredDeals: build.query<FeaturedDealDto[], void>({
      query: () => ({
        url: API_ENDPOINTS.HOME_FEATURED_DEALS,
        method: 'GET',
      }),
      providesTags: ['Home'],
    }),
    recentHotels: build.query<RecentHotelResultDto[], { userId: number }>({
      query: ({ userId }) => ({
        url: API_ENDPOINTS.HOME_RECENT_HOTELS(userId),
        method: 'GET',
      }),
      providesTags: ['Home'],
    }),
    trendingDestinations: build.query<DestinationDto[], void>({
      query: () => ({
        url: API_ENDPOINTS.HOME_TRENDING_DESTINATIONS,
        method: 'GET',
      }),
      providesTags: ['Home'],
    }),
  }),
})

export const {
  useHomeSearchQuery,
  useFeaturedDealsQuery,
  useRecentHotelsQuery,
  useTrendingDestinationsQuery,
} = homeApi
