import { Box, Typography, keyframes } from '@mui/material'
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff'

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
`

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
`

type VoyaLoaderProps = {
  size?: 'small' | 'medium' | 'large'
  fullScreen?: boolean
  message?: string
}

export function VoyaLoader({ size = 'medium', fullScreen = false, message }: VoyaLoaderProps) {
  const iconSizes = {
    small: 40,
    medium: 64,
    large: 96,
  }

  const iconSize = iconSizes[size]

  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
      }}
    >
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <FlightTakeoffIcon
          sx={{
            fontSize: iconSize,
            color: 'primary.main',
            animation: `${float} 2s ease-in-out infinite`,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            width: iconSize + 20,
            height: iconSize + 20,
            border: '3px solid',
            borderColor: 'primary.light',
            borderTopColor: 'primary.main',
            borderRadius: '50%',
            animation: `${rotate} 1s linear infinite`,
            opacity: 0.3,
          }}
        />
      </Box>
      <Typography
        variant={size === 'large' ? 'h5' : size === 'medium' ? 'h6' : 'body1'}
        sx={{
          background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          fontWeight: 700,
          animation: `${pulse} 2s ease-in-out infinite`,
        }}
      >
        Voya
      </Typography>
      {message && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {message}
        </Typography>
      )}
    </Box>
  )

  if (fullScreen) {
    return (
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'background.paper',
          zIndex: 9999,
        }}
      >
        {content}
      </Box>
    )
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '200px',
        py: 4,
      }}
    >
      {content}
    </Box>
  )
}
