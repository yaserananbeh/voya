import { Box, Container, Stack, Typography, Divider, Link } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { ROUTES } from '@/constants'
import { FooterSection, FooterLinks } from './FooterSection'
import { FooterBrand } from './FooterBrand'
import { FooterContact } from './FooterContact'

export function MainFooter() {
  const { t } = useTranslation()

  return (
    <Box
      component="footer"
      sx={{
        mt: 8,
        py: 5,
        bgcolor: 'grey.900',
        color: 'grey.100',
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={4}>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={4}
            divider={<Divider orientation="vertical" flexItem sx={{ borderColor: 'grey.700' }} />}
          >
            <Box sx={{ flex: 1 }}>
              <FooterBrand />
            </Box>

            <FooterSection title={t('footer.quickLinks')}>
              <FooterLinks
                links={[
                  { label: t('footer.browseHotels'), to: ROUTES.HOME },
                  { label: t('footer.searchStays'), to: ROUTES.SEARCH },
                  { label: t('footer.signIn'), to: ROUTES.LOGIN },
                ]}
              />
            </FooterSection>

            <FooterSection title={t('footer.contactUs')}>
              <FooterContact />
            </FooterSection>
          </Stack>

          <Divider sx={{ borderColor: 'grey.700' }} />

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="body2" color="grey.400">
              © {new Date().getFullYear()} Voya. {t('footer.copyright')}
            </Typography>
            <Stack direction="row" spacing={2}>
              <Link href="#" color="inherit" underline="hover" variant="body2">
                {t('footer.privacyPolicy')}
              </Link>
              <Link href="#" color="inherit" underline="hover" variant="body2">
                {t('footer.termsOfService')}
              </Link>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}
