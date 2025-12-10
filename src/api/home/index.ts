import { baseApi } from '../baseApi'
import type {
  SearchQueryDto,
  SearchResultDto,
  FeaturedDealDto,
  DestinationDto,
  RecentHotelResultDto,
  AmenityDto,
} from '@/types/models'

export const homeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    search: build.query<SearchResultDto[], SearchQueryDto>({
      query: (params) => ({
        url: '/home/search',
        params,
      }),
      providesTags: ['Home'],
    }),

    featuredDeals: build.query<FeaturedDealDto[], void>({
      query: () => '/home/featured-deals',
      providesTags: ['Home'],
    }),

    trendingDestinations: build.query<DestinationDto[], void>({
      query: () => '/home/destinations/trending',
      providesTags: ['Home'],
    }),

    recentHotels: build.query<RecentHotelResultDto[], number>({
      query: (userId) => `/home/users/${userId}/recent-hotels`,
      providesTags: ['Home'],
    }),

    amenities: build.query<AmenityDto[], void>({
      query: () => '/search-results/amenities',
      providesTags: ['Amenities'],
    }),
  }),
})

export const {
  useSearchQuery,
  useFeaturedDealsQuery,
  useTrendingDestinationsQuery,
  useRecentHotelsQuery,
  useAmenitiesQuery,
} = homeApi
