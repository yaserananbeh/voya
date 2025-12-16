import { baseApi } from '../baseApi'
import type { PhotoDto } from '@/types/models'

export const uploadApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    uploadPhoto: build.mutation<PhotoDto, File>({
      query: (file) => {
        const formData = new FormData()
        formData.append('file', file)

        return {
          url: '/photos',
          method: 'POST',
          body: formData,
        }
      },
      invalidatesTags: ['Photos', 'Hotel', 'Rooms'],
    }),
  }),
})

export const { useUploadPhotoMutation } = uploadApi
