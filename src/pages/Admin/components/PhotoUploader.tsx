import { Box, Button, CircularProgress } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { useUploadPhotoMutation } from '@/api/upload'
import { useNotification } from '@/hooks'

interface PhotoUploaderProps {
  onUploadSuccess?: (url: string) => void
}

export default function PhotoUploader({ onUploadSuccess }: PhotoUploaderProps) {
  const [uploadPhoto, { isLoading }] = useUploadPhotoMutation()
  const { showSuccess, showError } = useNotification()

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      const result = await uploadPhoto(file).unwrap()
      showSuccess('Photo uploaded successfully!')
      if (onUploadSuccess) {
        onUploadSuccess(result.imageUrl)
      }
    } catch (error) {
      console.error('Upload failed', error)
      showError('Failed to upload photo. Please try again.')
    }
  }

  return (
    <Box sx={{ border: '1px dashed grey', p: 3, textAlign: 'center', borderRadius: 2 }}>
      <input
        accept="image/*"
        style={{ display: 'none' }}
        id="raised-button-file"
        type="file"
        onChange={(e) => void handleFileChange(e)}
        disabled={isLoading}
      />
      <label htmlFor="raised-button-file">
        <Button
          variant="outlined"
          component="span"
          startIcon={isLoading ? <CircularProgress size={20} /> : <CloudUploadIcon />}
          disabled={isLoading}
        >
          {isLoading ? 'Uploading...' : 'Upload Photo'}
        </Button>
      </label>
    </Box>
  )
}
