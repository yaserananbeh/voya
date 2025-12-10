import { Button, Box, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export default function NotFoundPage() {
  const navigate = useNavigate()

  const goHome = () => {
    void navigate('/home')
  }

  const goBack = () => {
    void navigate(-1)
  }

  const reload = () => {
    window.location.reload()
  }

  return (
    <Box>
      <Typography variant="h4">404 – Page Not Found</Typography>

      <Button onClick={goHome}>Go Home</Button>
      <Button onClick={goBack}>Go Back</Button>
      <Button onClick={reload}>Reload</Button>
    </Box>
  )
}
