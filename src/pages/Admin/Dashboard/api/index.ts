import { baseApi } from '@/api/baseApi'
import type { DashboardStatsDto } from '@/pages/Admin/Dashboard/types'

const API_ENDPOINTS = {
  ADMIN_DASHBOARD: '/admin/dashboard',
} as const

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getDashboardStats: build.query<DashboardStatsDto, void>({
      query: () => API_ENDPOINTS.ADMIN_DASHBOARD,
      providesTags: ['Admin'],
    }),
  }),
})

export const { useGetDashboardStatsQuery } = dashboardApi
