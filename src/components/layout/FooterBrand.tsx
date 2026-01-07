import { Stack, Typography } from '@mui/material'
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff'
import { useTranslation } from 'react-i18next'
import { FooterButtons } from './FooterSection'
import { ROUTES } from '@/pages/Home/constants'
import { ROUTES as LOGIN_ROUTES } from '@/pages/Login/constants'

export function FooterBrand() {
  const { t } = useTranslation()

  return (
    <>
      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
        <FlightTakeoffIcon sx={{ fontSize: 32, color: 'primary.main' }} />
        <Typography
          component="span"
          variant="h5"
          fontWeight={700}
          sx={{
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Voya
        </Typography>
      </Stack>
      <Typography variant="body2" color="grey.400" sx={{ mb: 2 }}>
        {t('footer.tagline')}
      </Typography>
      <FooterButtons
        buttons={[
          { label: t('common.home'), to: ROUTES.HOME },
          { label: t('common.search'), to: ROUTES.SEARCH },
          { label: t('common.login'), to: LOGIN_ROUTES.LOGIN },
        ]}
      />
    </>
  )
}
