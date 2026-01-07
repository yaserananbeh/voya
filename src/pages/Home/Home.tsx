import { Container, Typography } from '@mui/material'
import { PageContainer, Section } from './components'
import { HomeSearchBar } from './components/HomeSearchBar'
import { FeaturedDealsSection } from './components/FeaturedDealsSection'
import { RecentHotelsSection } from './components/RecentHotelsSection'
import { TrendingDestinationsSection } from './components/TrendingDestinationsSection'
import { HeroSection } from './components/HeroSection'
import { useTranslation } from 'react-i18next'
import { usePageTitle } from '@/hooks'
import { SEO } from '@/components/common'

export default function Home() {
  const { t } = useTranslation()
  usePageTitle('pages.home')

  return (
    <>
      <SEO
        title={t('seo.home.title')}
        description={t('seo.home.description')}
        keywords={t('seo.home.keywords')}
      />

      <PageContainer>
        <HeroSection />

        <Container maxWidth="lg">
          <Section sx={{ mb: 4 }}>
            <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
              {t('home.searchStays')}
            </Typography>
            <HomeSearchBar />
          </Section>

          <Section
            id="featured-deals"
            title={t('home.featuredDeals')}
            subtitle={t('home.featuredDealsSubtitle')}
            sx={{ mt: 4, mb: 4 }}
          >
            <FeaturedDealsSection />
          </Section>

          <Section
            title={t('home.recentHotels')}
            subtitle={t('home.recentHotelsSubtitle')}
            sx={{ mt: 4, mb: 4 }}
          >
            <RecentHotelsSection />
          </Section>

          <Section
            title={t('home.trendingDestinations')}
            subtitle={t('home.trendingDestinationsSubtitle')}
            sx={{ mt: 4, mb: 4 }}
          >
            <TrendingDestinationsSection />
          </Section>
        </Container>
      </PageContainer>
    </>
  )
}
