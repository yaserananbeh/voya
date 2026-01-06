import { useState } from 'react'
import Grid from '@mui/material/Grid'
import { useMediaQuery, useTheme, Drawer, IconButton, Box } from '@mui/material'
import FilterListIcon from '@mui/icons-material/FilterList'
import { FiltersSidebar } from './components/FiltersSidebar'
import { ResultsList } from './components/ResultsList'
import { SelectedFiltersBar } from './components/SelectedFiltersBar'
import { EditableSearchBar } from './components/EditableSearchBar'
import { usePageTitle } from '@/hooks'
import { SEO } from '@/components/common'
import { useTranslation } from 'react-i18next'

export default function SearchResults() {
  const { t } = useTranslation()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  usePageTitle('pages.search')

  const handleFiltersToggle = () => {
    setMobileFiltersOpen(!mobileFiltersOpen)
  }

  return (
    <>
      <SEO
        title={t('seo.search.title')}
        description={t('seo.search.description')}
        keywords={t('seo.search.keywords')}
      />
      {isMobile && (
        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton
            onClick={handleFiltersToggle}
            color="primary"
            sx={{ border: 1, borderColor: 'divider' }}
          >
            <FilterListIcon />
          </IconButton>
        </Box>
      )}

      <Drawer
        anchor="left"
        open={isMobile ? mobileFiltersOpen : false}
        onClose={handleFiltersToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 280,
            pt: 2,
          },
        }}
      >
        <FiltersSidebar onClose={isMobile ? handleFiltersToggle : undefined} />
      </Drawer>

      <Grid container spacing={2}>
        <Grid size={{ xs: 0, md: 3 }} sx={{ display: { xs: 'none', md: 'block' } }}>
          <FiltersSidebar />
        </Grid>

        <Grid size={{ xs: 12, md: 9 }}>
          <EditableSearchBar />
          <SelectedFiltersBar />
          <ResultsList />
        </Grid>
      </Grid>
    </>
  )
}
