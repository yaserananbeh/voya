import { Button, Box } from '@mui/material'
import { ErrorPage } from './ErrorPage'
import { useState } from 'react'

export function QuickErrorTest() {
  const [showError, setShowError] = useState(false)

  if (showError) {
    return (
      <ErrorPage error={new Error('Test error message')} resetError={() => setShowError(false)} />
    )
  }

  return (
    <Box sx={{ p: 2 }}>
      <Button variant="contained" color="error" onClick={() => setShowError(true)}>
        Test Error Page
      </Button>
    </Box>
  )
}
