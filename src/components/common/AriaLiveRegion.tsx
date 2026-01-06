import { Box } from '@mui/material'

interface AriaLiveRegionProps {
  message: string
  politeness?: 'polite' | 'assertive' | 'off'
  active?: boolean
}

export function AriaLiveRegion({
  message,
  politeness = 'polite',
  active = true,
}: AriaLiveRegionProps) {
  if (!active || !message) return null

  return (
    <Box
      component="div"
      role="status"
      aria-live={politeness}
      aria-atomic="true"
      sx={{
        position: 'absolute',
        left: '-10000px',
        width: '1px',
        height: '1px',
        overflow: 'hidden',
      }}
    >
      {message}
    </Box>
  )
}
