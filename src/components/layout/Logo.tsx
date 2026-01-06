import { Box } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff'
import { useTranslation } from 'react-i18next'
import { ROUTES } from '@/constants'

type LogoProps = {
  size?: 'small' | 'medium' | 'large'
}

export function Logo({ size = 'medium' }: LogoProps) {
  const { t } = useTranslation()

  const iconSizes = {
    small: 24,
    medium: 32,
    large: 40,
  }

  const textSizes = {
    small: '1rem',
    medium: '1.5rem',
    large: '2rem',
  }

  return (
    <Box
      component={RouterLink}
      to={ROUTES.HOME}
      aria-label={t('common.home') || 'Home'}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        textDecoration: 'none',
        '&:focus-visible': {
          outline: '3px solid',
          outlineColor: 'primary.main',
          outlineOffset: 2,
          borderRadius: 1,
        },
      }}
    >
      <FlightTakeoffIcon
        sx={{
          color: 'primary.main',
          fontSize: { xs: iconSizes.small, sm: iconSizes[size] },
        }}
        aria-hidden="true"
      />
      <Box
        component="span"
        sx={{
          fontSize: { xs: textSizes.small, sm: textSizes[size] },
          fontWeight: 700,
          background: (theme) =>
            `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        Voya
      </Box>
    </Box>
  )
}
