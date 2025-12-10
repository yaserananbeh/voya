import { baseApi } from '@/api/baseApi'

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<
      { authentication: string; userType: string },
      { userName: string; password: string }
    >({
      query: (body) => ({
        url: '/auth/authenticate',
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const { useLoginMutation } = authApi
