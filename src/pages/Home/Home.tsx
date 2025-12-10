import { PageContainer, PageHeader, Section } from '@/components'

export default function HomePage() {
  return (
    <PageContainer>
      <PageHeader
        title="Find your next stay"
        subtitle="Search deals on hotels, homes, and much more…"
      />
      <Section>{/* search bar */}</Section>
      <Section>{/* featured deals */}</Section>
    </PageContainer>
  )
}
