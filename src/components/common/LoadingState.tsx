import { Box } from '@mui/material'
import { VoyaLoader } from './VoyaLoader'

type LoadingStateProps = {
  minHeight?: string | number
  size?: 'small' | 'medium' | 'large'
}

export function LoadingState({ minHeight = '300px', size = 'small' }: LoadingStateProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight,
      }}
    >
      <VoyaLoader size={size} />
    </Box>
  )
}
