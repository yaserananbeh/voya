import axios, { type AxiosError } from 'axios'
import { logger } from '@/utils/logger'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL as string,
})

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    logger.error('API Request Failed', {
      url: error.config?.url,
      status: error.response?.status,
      message: error.message,
    })
    return Promise.reject(error)
  },
)
