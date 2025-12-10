import { baseApi } from '../baseApi'
import type { LoginRequestDto, LoginResponseDto } from '../../types/models'

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<LoginResponseDto, LoginRequestDto>({
      query: (body) => ({
        url: '/auth/authenticate',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Auth'],
    }),
  }),
})

export const { useLoginMutation } = authApi
