import Grid from '@mui/material/Grid'
import { FiltersSidebar } from './components/FiltersSidebar'
import { ResultsList } from './components/ResultsList'
import { SelectedFiltersBar } from './components/SelectedFiltersBar'

export default function SearchResults() {
  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 3 }}>
        <FiltersSidebar />
      </Grid>

      <Grid size={{ xs: 12, md: 9 }}>
        <SelectedFiltersBar />
        <ResultsList />
      </Grid>
    </Grid>
  )
}
