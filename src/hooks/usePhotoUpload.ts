import { useState, useCallback } from 'react'
import { uploadPhoto, type PhotoResponse } from '@/api/upload'

interface UsePhotoUploadReturn {
  upload: (file: File) => Promise<PhotoResponse>
  uploading: boolean
  error: string | null
  reset: () => void
}

export const usePhotoUpload = (): UsePhotoUploadReturn => {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const upload = useCallback(async (file: File): Promise<PhotoResponse> => {
    setUploading(true)
    setError(null)

    try {
      const result = await uploadPhoto(file)
      return result
    } catch (err: unknown) {
      let message = 'Failed to upload photo'

      if (
        typeof err === 'object' &&
        err !== null &&
        'response' in err &&
        typeof (err as { response?: { data?: { detail?: unknown } } }).response?.data?.detail ===
          'string'
      ) {
        message = (err as { response: { data: { detail: string } } }).response.data.detail
      }

      setError(message)
      throw err
    } finally {
      setUploading(false)
    }
  }, [])

  const reset = (): void => {
    setUploading(false)
    setError(null)
  }

  return { upload, uploading, error, reset }
}
