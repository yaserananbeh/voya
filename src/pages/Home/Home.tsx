import { Container } from '@mui/material'
import { PageContainer } from '@/components/layout/PageContainer'
import { PageHeader } from '@/components/layout/PageHeader'
import { Section } from '@/components/layout/Section'
import { HomeSearchBar } from './components/HomeSearchBar'
import { FeaturedDealsSection } from './components/FeaturedDealsSection'
import { RecentHotelsSection } from './components/RecentHotelsSection'
import { TrendingDestinationsSection } from './components/TrendingDestinationsSection'
import styles from './styles.module.css'

export default function Home() {
  const pageTitle = 'Find your next stay'

  return (
    <PageContainer>
      <PageHeader
        title={pageTitle}
        subtitle="Search hotels, compare prices, and book your perfect trip."
      />

      <Container maxWidth="lg">
        {/* SEARCH BAR */}
        <Section className={styles.searchSection}>
          <HomeSearchBar />
        </Section>

        {/* FEATURED DEALS */}
        <Section
          title="Featured deals"
          subtitle="Special offers tailored for you"
          className={styles.section}
        >
          <FeaturedDealsSection />
        </Section>

        {/* RECENTLY VISITED HOTELS */}
        <Section
          title="Your recently visited hotels"
          subtitle="Quick access to places you checked before"
          className={styles.section}
        >
          <RecentHotelsSection />
        </Section>

        {/* TRENDING DESTINATIONS */}
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
