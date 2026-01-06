import { Container, Typography } from '@mui/material'
import { PageContainer, Section } from '@/components/layout'
import { HomeSearchBar } from './components/HomeSearchBar'
import { FeaturedDealsSection } from './components/FeaturedDealsSection'
import { RecentHotelsSection } from './components/RecentHotelsSection'
import { TrendingDestinationsSection } from './components/TrendingDestinationsSection'
import { HeroSection } from './components/HeroSection'
import styles from './styles.module.css'
import { useTranslation } from 'react-i18next'
import { usePageTitle } from '@/hooks'

export default function Home() {
  const { t } = useTranslation()
  usePageTitle('pages.home')

  return (
    <PageContainer>
      <HeroSection />

      <Container maxWidth="lg">
        <Section className={styles.searchSection}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            {t('home.searchStays')}
          </Typography>
          <HomeSearchBar />
        </Section>

        <Section
          id="featured-deals"
          title={t('home.featuredDeals')}
          subtitle={t('home.featuredDealsSubtitle')}
          className={styles.section}
        >
          <FeaturedDealsSection />
        </Section>

        <Section
          title={t('home.recentHotels')}
          subtitle={t('home.recentHotelsSubtitle')}
          className={styles.section}
        >
          <RecentHotelsSection />
        </Section>

        <Section
          title={t('home.trendingDestinations')}
          subtitle={t('home.trendingDestinationsSubtitle')}
          className={styles.section}
        >
          <TrendingDestinationsSection />
        </Section>
      </Container>
    </PageContainer>
  )
}
