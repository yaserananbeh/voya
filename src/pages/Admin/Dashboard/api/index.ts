import { baseApi } from '@/api/baseApi'

const API_ENDPOINTS = {
  ADMIN_DASHBOARD: '/admin/dashboard',
} as const

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getDashboardStats: build.query<
      {
        totalCities: number
        totalHotels: number
        totalRooms: number
        averageStarRating: number
        totalAvailableRooms: number
      },
      void
    >({
      query: () => API_ENDPOINTS.ADMIN_DASHBOARD,
      providesTags: ['Admin'],
    }),
  }),
})

export const { useGetDashboardStatsQuery } = dashboardApi
