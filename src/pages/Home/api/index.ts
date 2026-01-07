import { baseApi } from '@/api/baseApi'
import type {
  HomeSearchRequest,
  SearchResultDto,
  FeaturedDealDto,
  RecentHotelResultDto,
  DestinationDto,
} from '@/pages/Home/types'

const API_ENDPOINTS = {
  HOME_SEARCH: '/home/search',
  HOME_FEATURED_DEALS: '/home/featured-deals',
  HOME_RECENT_HOTELS: (userId: number) => `/home/users/${userId}/recent-hotels`,
  HOME_TRENDING_DESTINATIONS: '/home/destinations/trending',
} as const

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
