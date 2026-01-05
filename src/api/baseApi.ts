import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { STORAGE_KEYS, API_TAG_TYPES, AUTH_HEADER_PREFIX } from '@/constants'

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL as string,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem(STORAGE_KEYS.TOKEN)
      if (token) {
        headers.set('Authorization', `${AUTH_HEADER_PREFIX} ${token}`)
      }
      return headers
    },
  }),
  tagTypes: API_TAG_TYPES,
  endpoints: () => ({}),
})
