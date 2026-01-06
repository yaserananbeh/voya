import { Box } from '@mui/material'
import { useTranslation } from 'react-i18next'

export function SkipLink() {
  const { t } = useTranslation()

  return (
    <Box
      component="a"
      href="#main-content"
      sx={{
        position: 'absolute',
        top: -40,
        left: 0,
        zIndex: 9999,
        padding: '8px 16px',
        backgroundColor: 'primary.main',
        color: 'primary.contrastText',
        textDecoration: 'none',
        borderRadius: '0 0 4px 0',
        fontWeight: 600,
        fontSize: '0.875rem',
        '&:focus': {
          top: 0,
          outline: '3px solid',
          outlineColor: 'primary.dark',
          outlineOffset: 2,
        },
      }}
    >
      {t('common.skipToContent') || 'Skip to main content'}
    </Box>
  )
}
