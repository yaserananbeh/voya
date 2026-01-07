import { baseApi } from '@/api/baseApi'
import type { LoginRequestDto, LoginResponseDto } from '../types'

const API_ENDPOINTS = {
  AUTH_AUTHENTICATE: '/auth/authenticate',
} as const

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<LoginResponseDto, LoginRequestDto>({
      query: (body) => ({
        url: API_ENDPOINTS.AUTH_AUTHENTICATE,
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const { useLoginMutation } = authApi
