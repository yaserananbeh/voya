import { Alert, Box, Card, CardContent, Typography } from '@mui/material'
import { useTrendingDestinationsQuery } from '@/api/home'
import { SafeImage } from '@/components/common/SafeImage'
import { VoyaLoader } from '@/components'
import styles from '../styles.module.css'
import { useTranslation } from 'react-i18next'

export function TrendingDestinationsSection() {
  const { t } = useTranslation()
  const { data, isLoading, isError } = useTrendingDestinationsQuery()

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '300px',
        }}
      >
        <VoyaLoader size="small" />
      </Box>
    )
  }

  if (isError) {
    return <Alert severity="error">{t('home.trendingDestinationsError')}</Alert>
  }

  if (!data || data.length === 0) {
    return (
      <Typography variant="body2" color="text.secondary">
        {t('home.noTrendingDestinations')}
      </Typography>
    )
  }

  return (
    <Box className={styles.cardsGrid}>
      {data.map((dest) => (
        <Card key={dest.cityId}>
          <SafeImage src={dest.thumbnailUrl} alt={dest.cityName ?? 'Destination'} height={140} />
          <CardContent>
            <Typography variant="h6">
              {dest.cityName}, {dest.countryName}
            </Typography>
            {dest.description && (
              <Typography variant="body2" color="text.secondary">
                {dest.description}
              </Typography>
            )}
          </CardContent>
        </Card>
      ))}
    </Box>
  )
}
