import api from '../axiosInstance'

export interface PhotoResponse {
  id: number
  url: string | null
}

export const uploadPhoto = async (file: File): Promise<PhotoResponse> => {
  const formData = new FormData()
  formData.append('files', file)

  const response = await api.post<PhotoResponse>('/photos', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return response.data
}
