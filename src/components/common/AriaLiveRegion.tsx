import { Box } from '@mui/material'

interface AriaLiveRegionProps {
  /** The message to announce to screen readers */
  message: string
  /** The politeness level: 'polite' (default) or 'assertive' */
  politeness?: 'polite' | 'assertive' | 'off'
  /** Whether the region is currently active */
  active?: boolean
}

/**
 * ARIA live region component for announcing dynamic content updates to screen readers
 * Use this for important updates like form submissions, errors, or status changes
 */
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
