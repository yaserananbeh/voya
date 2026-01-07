import { baseApi } from '@/api/baseApi'
import { API_ENDPOINTS } from '@/constants'

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<
      { authentication: string; userType: string },
      { userName: string; password: string }
    >({
      query: (body) => ({
        url: API_ENDPOINTS.AUTH_AUTHENTICATE,
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const { useLoginMutation } = authApi
