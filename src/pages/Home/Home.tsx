import { Container, Typography } from '@mui/material'
import { PageContainer } from '@/components/layout/PageContainer'
import { Section } from '@/components/layout/Section'
import { HomeSearchBar } from './components/HomeSearchBar'
import { FeaturedDealsSection } from './components/FeaturedDealsSection'
import { RecentHotelsSection } from './components/RecentHotelsSection'
import { TrendingDestinationsSection } from './components/TrendingDestinationsSection'
import { HeroSection } from './components/HeroSection'
import styles from './styles.module.css'

export default function Home() {
  return (
    <PageContainer>
      <HeroSection />

      <Container maxWidth="lg">
        <Section className={styles.searchSection}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Search stays
          </Typography>
          <HomeSearchBar />
        </Section>

        <Section
          id="featured-deals"
          title="Featured deals"
          subtitle="Special offers tailored for you"
          className={styles.section}
        >
          <FeaturedDealsSection />
        </Section>

        <Section
          title="Your recently visited hotels"
          subtitle="Quick access to places you checked before"
          className={styles.section}
        >
          <RecentHotelsSection />
        </Section>

        <Section
          title="Trending destinations"
          subtitle="Popular cities travelers love right now"
          className={styles.section}
        >
          <TrendingDestinationsSection />
        </Section>
      </Container>
    </PageContainer>
  )
}
