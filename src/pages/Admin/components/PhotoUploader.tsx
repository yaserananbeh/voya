import { usePhotoUpload } from '@/hooks/usePhotoUpload'
import type { PhotoResponse } from '@/api/upload'

const PhotoUploader = () => {
  const { upload, uploading, error } = usePhotoUpload()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    void (async () => {
      if (!e.target.files) return

      const file = e.target.files[0]
      const result: PhotoResponse = await upload(file)

      console.log('Uploaded photo:', result)
    })()
  }

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleChange} />

      {uploading && <p>Uploading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  )
}

export default PhotoUploader
