# Feature 3: Search Results Page

> **TRUE Incremental Development**: Build the Search Results page one component at a time, adding translations, types, and API as you go.

**Navigation**: [← Back to Index](00-README.md) | [← Previous: Feature 2](04-Feature-02-Login-Auth.md) | [Next: Feature 4 →](06-Feature-04-Hotel-Details.md)

---

## 14. Feature 3: Search Results Page

> **TRUE Incremental Development**: Build the Search Results page one component at a time, adding translations, types, and API as you go. **NOT all at once!**

### 🎯 The Incremental Development Pattern

**How Real Developers Build Search Results Page**:

1. **Create minimal SearchResults page** (placeholder)
2. **Add route** → Test it works
3. **Build ResultsList component** (minimal first):
   - Create component (placeholder)
   - Add translation for "No results"
   - Test
   - Add Hotels API endpoint (only getHotels)
   - Add HotelDto type
   - Enhance component to display hotels
   - Add loading/error translations
   - Test
4. **Build HotelResultCard component**:
   - Create component
   - Add ONLY card translations (viewHotel, perNight)
   - Test
5. **Build PriceFilter component**:
   - Create component
   - Add ONLY price filter translations
   - Test
6. **Build StarRatingFilter component**:
   - Create component
   - Add ONLY star rating translations
   - Test
7. **Build AmenitiesFilter component**:
   - Create component (placeholder)
   - Add translation for heading
   - Test
   - Add Amenities API endpoint
   - Add FilterAmenityDto type
   - Enhance component
   - Add error translations
   - Test
8. **Build HotelTypeFilter component**:
   - Create component
   - Add ONLY hotel type translations
   - Test
9. **Build FilterContainer/FilterSection** (when filters need them)
10. **Build FiltersSidebar** (when all filters are ready)
11. **Build SelectedFiltersBar** (when filters are working)
12. **Update SearchResults page** to use all components

**Key Principle**: Each component is built, tested, and has its dependencies (translations, types, API) added **only when that component needs them**.

### What We'll Build (Incrementally)

- ✅ SearchResults page component (minimal → full)
- ✅ ResultsList component (build → add API → add types → add translations → test)
- ✅ HotelResultCard component (build → add translations → test)
- ✅ PriceFilter component (build → add translations → test)
- ✅ StarRatingFilter component (build → add translations → test)
- ✅ AmenitiesFilter component (build → add API → add types → add translations → test)
- ✅ HotelTypeFilter component (build → add translations → test)
- ✅ FilterContainer/FilterSection (when filters need them)
- ✅ FiltersSidebar (when all filters are ready)
- ✅ SelectedFiltersBar (when filters are working)

Let's start building incrementally!

### 14.1 Step 1: Create Minimal SearchResults Page

Start with the absolute minimum - just a placeholder page:

**src/pages/SearchResults/SearchResults.tsx**:

```typescript
import { Container, Typography } from '@mui/material'

export default function SearchResults() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4">Search Results</Typography>
      <Typography variant="body1">We'll build components incrementally</Typography>
    </Container>
  )
}
```

**src/pages/SearchResults/index.ts**:

```typescript
export { default } from './SearchResults'
```

### 14.2 Step 2: Add SearchResults Route

Update `src/routes/routes.tsx`:

```typescript
import { createBrowserRouter, Navigate } from 'react-router-dom'
import MainLayout from '@/layouts/MainLayout'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import SearchResults from '@/pages/SearchResults'
import { RedirectIfAuthenticated } from '@/components/auth'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Navigate to="/home" replace /> },
      { path: 'home', element: <Home /> },
      { path: 'search', element: <SearchResults /> },
      {
        path: 'login',
        element: (
          <RedirectIfAuthenticated>
            <Login />
          </RedirectIfAuthenticated>
        ),
      },
    ],
  },
])
```

**Test**: `pnpm dev` → Navigate to `/search` → Should see "Search Results" text.

### 14.3 Step 3: Build ResultsList Component (Minimal First)

Now let's build the first component - ResultsList. We'll start minimal, then add API, types, and translations incrementally.

**Create ResultsList component** (minimal placeholder):

**src/pages/SearchResults/components/ResultsList.tsx**:

```typescript
import { Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

export function ResultsList() {
  const { t } = useTranslation()

  return (
    <Typography variant="body1">
      {t('search.noResults', 'No hotels found')}
    </Typography>
  )
}
```

**Update SearchResults page**:

**src/pages/SearchResults/SearchResults.tsx**:

```typescript
import { Container, Typography } from '@mui/material'
import { ResultsList } from './components/ResultsList'

export default function SearchResults() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Search Results
      </Typography>
      <ResultsList />
    </Container>
  )
}
```

**Add ONLY noResults translation** (incremental):

**Update `src/i18n/locales/en.json`** (add only this key):

```json
{
  "search": {
    "noResults": "No hotels found"
  }
}
```

**Update `src/i18n/locales/ar.json`** (add only this key):

```json
{
  "search": {
    "noResults": "لم يتم العثور على فنادق"
  }
}
```

**Test**: Refresh → Should see "No hotels found" text.

**Now add Hotels API endpoint** (only what ResultsList needs):

**Create Hotels API** (minimal - just getHotels for now):

**src/api/hotels/index.ts**:

```typescript
import { baseApi } from '@/api/baseApi'

// Type for Hotel (only what we need right now)
export type HotelDto = {
  id: number
  name: string
  location: string
  description: string
  hotelType: string
  starRating: number
  rooms: Array<{ price: number }>
  imageUrl?: string
  amenities: Array<{ id: number; name: string }>
}

export type GetHotelsQuery = {
  searchQuery?: string
  pageNumber: number
  pageSize: number
}

export const hotelsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getHotels: builder.query<HotelDto[], GetHotelsQuery>({
      query: ({ searchQuery, pageNumber, pageSize }) => ({
        url: 'hotels',
        params: {
          ...(searchQuery ? { searchQuery } : {}),
          pageNumber,
          pageSize,
        },
      }),
      providesTags: ['Hotel'],
    }),
  }),
})

export const { useGetHotelsQuery } = hotelsApi
```

**Update baseApi tagTypes**:

**src/api/baseApi.ts**:

```typescript
tagTypes: ['Auth', 'Home', 'Hotel'], // Added Hotel tag
```

**Add HotelDto to types** (incremental):

**Update `src/types/models.ts`** (add only this type for now):

```typescript
// ... existing types ...

export interface HotelDto {
  id: number
  name: string
  location: string
  description: string
  hotelType: string
  starRating: number
  rooms: Array<{ price: number }>
  imageUrl?: string
  amenities: Array<{ id: number; name: string }>
}
```

**Enhance ResultsList to use API**:

**src/pages/SearchResults/components/ResultsList.tsx**:

```typescript
import { Stack, Typography, Box } from '@mui/material'
import { useAppSelector } from '@/hooks'
import { selectSearchQuery, selectSearchParams } from '@/store/searchSlice'
import { useEffect, useState } from 'react'
import { useGetHotelsQuery, type HotelDto } from '@/api/hotels'
import { useTranslation } from 'react-i18next'
import { CircularProgress } from '@mui/material'

const PAGE_SIZE = 10

export function ResultsList() {
  const { t } = useTranslation()
  const searchQuery = useAppSelector(selectSearchQuery)
  const searchParams = useAppSelector(selectSearchParams)
  const [page, setPage] = useState(1)

  const { data, isLoading, isError } = useGetHotelsQuery({
    searchQuery: searchQuery || searchParams.city,
    pageNumber: page,
    pageSize: PAGE_SIZE,
  })

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    )
  }

  if (isError) {
    return <Typography color="error">{t('search.noResults')}</Typography>
  }

  if (!data || data.length === 0) {
    return <Typography>{t('search.noResults')}</Typography>
  }

  return (
    <Stack spacing={2}>
      {data.map((hotel) => (
        <Typography key={hotel.id} variant="h6">
          {hotel.name}
        </Typography>
      ))}
    </Stack>
  )
}
```

**Test**: Refresh → Should see hotels loading → Then display hotel names (or error/empty state).

**✅ Step 3 Complete**: ResultsList is working with API, types, and translations!

### 14.4 Step 4: Build HotelResultCard Component

Now let's build the card component to display hotels nicely:

**Create HotelResultCard component**:

**src/pages/SearchResults/components/HotelResultCard.tsx**:

```typescript
import { Card, CardContent, Typography, Box, Button, Rating } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import type { HotelDto } from '@/api/hotels'
import { useTranslation } from 'react-i18next'

interface HotelResultCardProps {
  hotel: HotelDto
}

export function HotelResultCard({ hotel }: HotelResultCardProps) {
  const { t } = useTranslation()
  const minPrice = Math.min(...(hotel.rooms?.map((r) => r.price) || [0]))

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{hotel.name}</Typography>
        <Typography variant="body2" color="text.secondary">
          {hotel.location}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, mb: 1 }}>
          <Rating value={hotel.starRating} readOnly size="small" />
        </Box>
        <Typography variant="h6" color="primary">
          ${minPrice} {t('search.perNight', '/night')}
        </Typography>
        <Button
          component={RouterLink}
          to={`/hotel/${hotel.id}`}
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
        >
          {t('search.viewHotel', 'View Hotel')}
        </Button>
      </CardContent>
    </Card>
  )
}
```

**Add ONLY card translations** (incremental - only add these 2 new keys):

**Update `src/i18n/locales/en.json`** (add ONLY these 2 keys to existing search object):

```json
{
  "search": {
    // ... existing keys from Step 3 (noResults) ...
    "viewHotel": "View Hotel", // ← NEW: Add only this
    "perNight": "/night" // ← NEW: Add only this
  }
}
```

**Update `src/i18n/locales/ar.json`** (add ONLY these 2 keys to existing search object):

```json
{
  "search": {
    // ... existing keys from Step 3 (noResults) ...
    "viewHotel": "عرض الفندق", // ← NEW: Add only this
    "perNight": "/ليلة" // ← NEW: Add only this
  }
}
```

> **📝 Note**: You're adding ONLY 2 new translation keys (`viewHotel` and `perNight`) for the HotelResultCard component. The `noResults` key was already added in Step 3 for ResultsList. Don't add all search translations at once - add them one component at a time!

**Update ResultsList to use HotelResultCard**:

**src/pages/SearchResults/components/ResultsList.tsx**:

```typescript
// ... existing imports ...
import { HotelResultCard } from './HotelResultCard'

export function ResultsList() {
  // ... existing code ...

  return (
    <Stack spacing={2}>
      {data.map((hotel) => (
        <HotelResultCard key={hotel.id} hotel={hotel} />
      ))}
    </Stack>
  )
}
```

**Test**: Refresh → Should see hotel cards with "View Hotel" buttons.

**✅ Step 4 Complete**: HotelResultCard is working with translations!

### 14.5 Step 5: Build PriceFilter Component

Now let's add the first filter - PriceFilter. We'll build it, add translations, then test.

**Create PriceFilter component**:

**src/pages/SearchResults/components/PriceFilter.tsx**:

```typescript
import { Box, Typography, Slider } from '@mui/material'
import { useAppSelector, useAppDispatch } from '@/hooks'
import { selectSearchFilters, setSearchFilters } from '@/store/searchSlice'
import { useTranslation } from 'react-i18next'

const MIN_PRICE = 0
const MAX_PRICE = 1000

export function PriceFilter() {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const filters = useAppSelector(selectSearchFilters)
  const priceRange = filters.priceRange || [MIN_PRICE, MAX_PRICE]

  const handleChange = (_event: Event, newValue: number | number[]) => {
    const range = newValue as [number, number]
    dispatch(setSearchFilters({ priceRange: range }))
  }

  return (
    <Box>
      <Typography variant="subtitle2" gutterBottom>
        {t('search.priceRange', 'Price Range')}
      </Typography>
      <Slider
        value={priceRange}
        onChange={handleChange}
        min={MIN_PRICE}
        max={MAX_PRICE}
        valueLabelDisplay="auto"
        valueLabelFormat={(value) => `$${value}`}
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
        <Typography variant="caption">${priceRange[0]}</Typography>
        <Typography variant="caption">${priceRange[1]}</Typography>
      </Box>
    </Box>
  )
}
```

**Add ONLY price filter translation** (incremental - only add this 1 new key):

**Update `src/i18n/locales/en.json`** (add ONLY this 1 key to existing search object):

```json
{
  "search": {
    // ... existing keys from previous steps ...
    "priceRange": "Price Range" // ← NEW: Add only this
  }
}
```

**Update `src/i18n/locales/ar.json`** (add ONLY this 1 key to existing search object):

```json
{
  "search": {
    // ... existing keys from previous steps ...
    "priceRange": "نطاق السعر" // ← NEW: Add only this
  }
}
```

> **📝 Note**: You're adding ONLY 1 new translation key (`priceRange`) for the PriceFilter component. Don't add all filter translations at once - add them one component at a time!

**Test**: Create a test page or add PriceFilter to SearchResults page temporarily → Should see price slider.

**✅ Step 5 Complete**: PriceFilter is working with translations!

### 14.6 Step 6: Build StarRatingFilter Component

Same pattern - build component, add translations, test:

**Create StarRatingFilter component**:

**src/pages/SearchResults/components/StarRatingFilter.tsx**:

```typescript
import { Box, FormControlLabel, Checkbox, Typography } from '@mui/material'
import { useAppSelector, useAppDispatch } from '@/hooks'
import { selectSearchFilters, setSearchFilters } from '@/store/searchSlice'
import { useTranslation } from 'react-i18next'

const STAR_RATINGS = [5, 4, 3, 2, 1]

export function StarRatingFilter() {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const filters = useAppSelector(selectSearchFilters)
  const selectedStar = filters.stars

  const handleChange = (star: number) => {
    const newStar = selectedStar === star ? null : star
    dispatch(setSearchFilters({ stars: newStar }))
  }

  return (
    <Box>
      <Typography variant="subtitle2" gutterBottom>
        {t('search.starRating', 'Star Rating')}
      </Typography>
      {STAR_RATINGS.map((star) => (
        <FormControlLabel
          key={star}
          control={
            <Checkbox
              checked={selectedStar === star}
              onChange={() => handleChange(star)}
            />
          }
          label={`${star} ${t('hotel.starHotel', 'star hotel')}`}
        />
      ))}
    </Box>
  )
}
```

**Add ONLY star rating translations** (incremental - only add these 2 new keys):

**Update `src/i18n/locales/en.json`** (add ONLY these keys):

```json
{
  "search": {
    // ... existing keys from previous steps ...
    "starRating": "Star Rating" // ← NEW: Add only this
  },
  "hotel": {
    "starHotel": "star hotel" // ← NEW: Add only this (if hotel object doesn't exist, create it)
  }
}
```

**Update `src/i18n/locales/ar.json`** (add ONLY these keys):

```json
{
  "search": {
    // ... existing keys from previous steps ...
    "starRating": "التصنيف" // ← NEW: Add only this
  },
  "hotel": {
    "starHotel": "فندق" // ← NEW: Add only this (if hotel object doesn't exist, create it)
  }
}
```

> **📝 Note**: You're adding ONLY 2 new translation keys (`starRating` and `starHotel`) for the StarRatingFilter component. Don't add all filter translations at once!

**Test**: Add StarRatingFilter to page → Should see star rating checkboxes.

**✅ Step 6 Complete**: StarRatingFilter is working!

### 14.7 Step 7: Build AmenitiesFilter Component

This one needs API, so we'll follow the pattern: build → add translation → test → add API → enhance → test.

**Create AmenitiesFilter component** (minimal first):

**src/pages/SearchResults/components/AmenitiesFilter.tsx**:

```typescript
import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

export function AmenitiesFilter() {
  const { t } = useTranslation()

  return (
    <Box>
      <Typography variant="subtitle2" gutterBottom>
        {t('search.amenities', 'Amenities')}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Loading amenities...
      </Typography>
    </Box>
  )
}
```

**Add amenities translation** (incremental):

**Update `src/i18n/locales/en.json`**:

```json
{
  "search": {
    // ... existing keys ...
    "amenities": "Amenities"
  }
}
```

**Update `src/i18n/locales/ar.json`**:

```json
{
  "search": {
    // ... existing keys ...
    "amenities": "المرافق"
  }
}
```

**Test**: Add AmenitiesFilter to page → Should see "Amenities" heading.

**Now add Amenities API endpoint** (only what AmenitiesFilter needs):

**Create SearchResults API** (minimal - just amenities):

**src/api/searchResults/index.ts**:

```typescript
import { baseApi } from '@/api/baseApi'

// Type for FilterAmenity (only what we need)
export type FilterAmenityDto = {
  id: number
  name: string
  description?: string
}

export const searchResultsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAmenities: builder.query<FilterAmenityDto[], void>({
      query: () => 'search-results/amenities',
      providesTags: ['Amenities'],
    }),
  }),
})

export const { useGetAmenitiesQuery } = searchResultsApi
```

**Update baseApi tagTypes**:

**src/api/baseApi.ts**:

```typescript
tagTypes: ['Auth', 'Home', 'Hotel', 'Amenities'], // Added Amenities tag
```

**Add FilterAmenityDto to types** (incremental):

**Update `src/types/models.ts`** (add only this type):

```typescript
// ... existing types ...

export interface FilterAmenityDto {
  id: number
  name: string
  description?: string
}
```

**Enhance AmenitiesFilter to use API**:

**src/pages/SearchResults/components/AmenitiesFilter.tsx**:

```typescript
import { Box, FormControlLabel, Checkbox, Typography, Alert } from '@mui/material'
import { useAppSelector, useAppDispatch } from '@/hooks'
import { selectSearchFilters, setSearchFilters } from '@/store/searchSlice'
import { useGetAmenitiesQuery } from '@/api/searchResults'
import { useTranslation } from 'react-i18next'
import { CircularProgress } from '@mui/material'

export function AmenitiesFilter() {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const filters = useAppSelector(selectSearchFilters)
  const { data: amenities, isLoading, isError } = useGetAmenitiesQuery()
  const selectedAmenities = filters.amenities || []

  const handleChange = (amenityName: string) => {
    const newAmenities = selectedAmenities.includes(amenityName)
      ? selectedAmenities.filter((name) => name !== amenityName)
      : [...selectedAmenities, amenityName]
    dispatch(setSearchFilters({ amenities: newAmenities.length > 0 ? newAmenities : undefined }))
  }

  if (isLoading) {
    return (
      <Box>
        <Typography variant="subtitle2" gutterBottom>
          {t('search.amenities')}
        </Typography>
        <CircularProgress size="small" />
      </Box>
    )
  }

  if (isError) {
    return (
      <Box>
        <Typography variant="subtitle2" gutterBottom>
          {t('search.amenities')}
        </Typography>
        <Alert severity="error">{t('search.failedToLoadAmenities', 'Failed to load amenities')}</Alert>
      </Box>
    )
  }

  return (
    <Box>
      <Typography variant="subtitle2" gutterBottom>
        {t('search.amenities')}
      </Typography>
      {amenities?.map((amenity) => (
        <FormControlLabel
          key={amenity.id}
          control={
            <Checkbox
              checked={selectedAmenities.includes(amenity.name)}
              onChange={() => handleChange(amenity.name)}
            />
          }
          label={amenity.name}
        />
      ))}
    </Box>
  )
}
```

**Add ONLY error translation** (incremental):

**Update `src/i18n/locales/en.json`**:

```json
{
  "search": {
    // ... existing keys ...
    "failedToLoadAmenities": "Failed to load amenities"
  }
}
```

**Update `src/i18n/locales/ar.json`**:

```json
{
  "search": {
    // ... existing keys ...
    "failedToLoadAmenities": "فشل تحميل المرافق"
  }
}
```

**Test**: Refresh → Should see amenities loading → Then display amenities (or error).

**✅ Step 7 Complete**: AmenitiesFilter is working with API, types, and translations!

### 14.8 Step 8: Build HotelTypeFilter Component

Same pattern - build component, add translations, test:

**Create HotelTypeFilter component**:

**src/pages/SearchResults/components/HotelTypeFilter.tsx**:

```typescript
import { Box, FormControlLabel, Checkbox, Typography } from '@mui/material'
import { useAppSelector, useAppDispatch } from '@/hooks'
import { selectSearchFilters, setSearchFilters } from '@/store/searchSlice'
import { useTranslation } from 'react-i18next'

const HOTEL_TYPES = ['Hotel', 'Resort', 'Boutique', 'Lodge', 'Inn']

export function HotelTypeFilter() {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const filters = useAppSelector(selectSearchFilters)
  const selectedTypes = filters.hotelTypes || []

  const handleChange = (type: string) => {
    const newTypes = selectedTypes.includes(type)
      ? selectedTypes.filter((t) => t !== type)
      : [...selectedTypes, type]
    dispatch(setSearchFilters({ hotelTypes: newTypes.length > 0 ? newTypes : undefined }))
  }

  return (
    <Box>
      <Typography variant="subtitle2" gutterBottom>
        {t('search.hotelType', 'Hotel Type')}
      </Typography>
      {HOTEL_TYPES.map((type) => (
        <FormControlLabel
          key={type}
          control={
            <Checkbox
              checked={selectedTypes.includes(type)}
              onChange={() => handleChange(type)}
            />
          }
          label={type}
        />
      ))}
    </Box>
  )
}
```

**Add ONLY hotel type translation** (incremental - only add this 1 new key):

**Update `src/i18n/locales/en.json`** (add ONLY this 1 key to existing search object):

```json
{
  "search": {
    // ... existing keys from previous steps ...
    "hotelType": "Hotel Type" // ← NEW: Add only this
  }
}
```

**Update `src/i18n/locales/ar.json`** (add ONLY this 1 key to existing search object):

```json
{
  "search": {
    // ... existing keys from previous steps ...
    "hotelType": "نوع الفندق" // ← NEW: Add only this
  }
}
```

> **📝 Note**: You're adding ONLY 1 new translation key (`hotelType`) for the HotelTypeFilter component. Don't add all filter translations at once!

**Test**: Add HotelTypeFilter to page → Should see hotel type checkboxes.

**✅ Step 8 Complete**: HotelTypeFilter is working!

### 14.9 Step 9: Build FilterContainer and FilterSection Components

Now that we have filters, we need container components to organize them:

**Create FilterContainer component**:

**src/components/filters/FilterContainer.tsx**:

```typescript
import { Box, Typography, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import type { ReactNode } from 'react'

interface FilterContainerProps {
  title: string
  children: ReactNode
  onClose?: () => void
}

export function FilterContainer({ title, children, onClose }: FilterContainerProps) {
  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6">{title}</Typography>
        {onClose && (
          <IconButton size="small" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        )}
      </Box>
      {children}
    </Box>
  )
}
```

**Create FilterSection component**:

**src/components/filters/FilterSection.tsx**:

```typescript
import { Box } from '@mui/material'
import type { ReactNode } from 'react'

interface FilterSectionProps {
  children: ReactNode
  showDivider?: boolean
}

export function FilterSection({ children, showDivider = true }: FilterSectionProps) {
  return (
    <Box
      sx={{
        pb: 2,
        mb: 2,
        ...(showDivider && {
          borderBottom: 1,
          borderColor: 'divider',
        }),
      }}
    >
      {children}
    </Box>
  )
}
```

**src/components/filters/index.ts**:

```typescript
export * from './FilterContainer'
export * from './FilterSection'
```

**✅ Step 9 Complete**: FilterContainer and FilterSection are ready!

### 14.10 Step 10: Build FiltersSidebar Component

Now that all filters are ready, let's create the sidebar that contains them:

**Create FiltersSidebar component**:

**src/pages/SearchResults/components/FiltersSidebar.tsx**:

```typescript
import { Box } from '@mui/material'
import { PriceFilter } from './PriceFilter'
import { StarRatingFilter } from './StarRatingFilter'
import { AmenitiesFilter } from './AmenitiesFilter'
import { HotelTypeFilter } from './HotelTypeFilter'
import { useTranslation } from 'react-i18next'
import { FilterContainer, FilterSection } from '@/components/filters'

type FiltersSidebarProps = {
  onClose?: () => void
}

export function FiltersSidebar({ onClose }: FiltersSidebarProps) {
  const { t } = useTranslation()

  return (
    <Box
      sx={{
        position: { xs: 'static', md: 'sticky' },
        top: { md: 80 },
        maxHeight: { xs: 'none', md: 'calc(100vh - 100px)' },
        overflowY: { xs: 'visible', md: 'auto' },
      }}
    >
      <FilterContainer title={t('search.filters', 'Filters')} onClose={onClose}>
        <FilterSection>
          <PriceFilter />
        </FilterSection>

        <FilterSection>
          <StarRatingFilter />
        </FilterSection>

        <FilterSection>
          <AmenitiesFilter />
        </FilterSection>

        <FilterSection showDivider={false}>
          <HotelTypeFilter />
        </FilterSection>
      </FilterContainer>
    </Box>
  )
}
```

**Add filters translation** (incremental - only add this 1 new key):

**Update `src/i18n/locales/en.json`** (add ONLY this 1 key to existing search object):

```json
{
  "search": {
    // ... existing keys from previous steps ...
    "filters": "Filters" // ← NEW: Add only this (for FiltersSidebar title)
  }
}
```

**Update `src/i18n/locales/ar.json`** (add ONLY this 1 key to existing search object):

```json
{
  "search": {
    // ... existing keys from previous steps ...
    "filters": "المرشحات" // ← NEW: Add only this (for FiltersSidebar title)
  }
}
```

> **📝 Note**: You're adding ONLY 1 new translation key (`filters`) for the FiltersSidebar component title. Don't add all sidebar translations at once!

**✅ Step 10 Complete**: FiltersSidebar is ready!

### 14.11 Step 11: Build SelectedFiltersBar Component

Now let's create the component that shows applied filters:

**Create SelectedFiltersBar component**:

**src/pages/SearchResults/components/SelectedFiltersBar.tsx**:

```typescript
import { Box, Chip, Button, Typography } from '@mui/material'
import { useAppSelector, useAppDispatch } from '@/hooks'
import { selectSearchFilters, clearSearchFilters } from '@/store/searchSlice'
import { useTranslation } from 'react-i18next'

export function SelectedFiltersBar() {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const filters = useAppSelector(selectSearchFilters)

  const hasFilters =
    filters.priceRange ||
    filters.stars ||
    filters.amenities?.length ||
    filters.hotelTypes?.length

  if (!hasFilters) return null

  return (
    <Box sx={{ mb: 2, display: 'flex', flexWrap: 'wrap', gap: 1, alignItems: 'center' }}>
      <Typography variant="body2" sx={{ mr: 1 }}>
        {t('search.appliedFilters', 'Applied Filters')}:
      </Typography>
      {filters.stars && (
        <Chip label={`${filters.stars} ${t('hotel.starHotel', 'star')}`} size="small" />
      )}
      {filters.hotelTypes?.map((type) => (
        <Chip key={type} label={type} size="small" />
      ))}
      {filters.priceRange && (
        <Chip
          label={`$${filters.priceRange[0]} - $${filters.priceRange[1]}`}
          size="small"
        />
      )}
      <Button size="small" onClick={() => dispatch(clearSearchFilters())}>
        {t('search.clearFilters', 'Clear Filters')}
      </Button>
    </Box>
  )
}
```

**Add ONLY selected filters translations** (incremental - only add these 2 new keys):

**Update `src/i18n/locales/en.json`** (add ONLY these 2 keys to existing search object):

```json
{
  "search": {
    // ... existing keys from previous steps ...
    "appliedFilters": "Applied Filters", // ← NEW: Add only this
    "clearFilters": "Clear Filters" // ← NEW: Add only this
  }
}
```

**Update `src/i18n/locales/ar.json`** (add ONLY these 2 keys to existing search object):

```json
{
  "search": {
    // ... existing keys from previous steps ...
    "appliedFilters": "المرشحات المطبقة", // ← NEW: Add only this
    "clearFilters": "مسح المرشحات" // ← NEW: Add only this
  }
}
```

> **📝 Note**: You're adding ONLY 2 new translation keys (`appliedFilters` and `clearFilters`) for the SelectedFiltersBar component. Don't add all filter bar translations at once!

**✅ Step 11 Complete**: SelectedFiltersBar is working!

### 14.12 Step 12: Update SearchResults Page to Use All Components

Now let's put it all together:

**Update SearchResults page**:

**src/pages/SearchResults/SearchResults.tsx**:

```typescript
import { useState } from 'react'
import Grid from '@mui/material/Grid'
import { useMediaQuery, useTheme, Drawer, IconButton, Box } from '@mui/material'
import FilterListIcon from '@mui/icons-material/FilterList'
import { FiltersSidebar } from './components/FiltersSidebar'
import { ResultsList } from './components/ResultsList'
import { SelectedFiltersBar } from './components/SelectedFiltersBar'

export default function SearchResults() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const handleFiltersToggle = () => {
    setMobileFiltersOpen(!mobileFiltersOpen)
  }

  return (
    <>
      {isMobile && (
        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-end', px: 2, pt: 2 }}>
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

      <Grid container spacing={2} sx={{ px: { xs: 2, md: 0 } }}>
        <Grid size={{ xs: 0, md: 3 }} sx={{ display: { xs: 'none', md: 'block' } }}>
          <FiltersSidebar />
        </Grid>

        <Grid size={{ xs: 12, md: 9 }}>
          <SelectedFiltersBar />
          <ResultsList />
        </Grid>
      </Grid>
    </>
  )
}
```

**Note**: If using MUI v5, use `item` and `xs/md` props instead of `size`.

### 14.13 Step 13: Enhance ResultsList with Filtering and Infinite Scroll

Now let's enhance ResultsList to filter hotels and add infinite scroll:

**Update ResultsList** (add filtering and infinite scroll):

**src/pages/SearchResults/components/ResultsList.tsx**:

```typescript
import { Stack, Typography, Box } from '@mui/material'
import { useAppSelector } from '@/hooks'
import { selectSearchQuery, selectSearchFilters, selectSearchParams } from '@/store/searchSlice'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useGetHotelsQuery, type HotelDto } from '@/api/hotels'
import { HotelResultCard } from './HotelResultCard'
import { useTranslation } from 'react-i18next'
import { CircularProgress } from '@mui/material'

const PAGE_SIZE = 10

function hotelMatchesFilters(hotel: HotelDto, filters: ReturnType<typeof selectSearchFilters>) {
  if (filters.stars != null && hotel.starRating !== filters.stars) return false

  if (filters.hotelTypes?.length && !filters.hotelTypes.includes(hotel.hotelType)) return false

  const hotelAmenityNames = (hotel.amenities ?? []).map((a) => a.name)
  if (filters.amenities?.length && !filters.amenities.every((name) => hotelAmenityNames.includes(name))) {
    return false
  }

  if (filters.priceRange) {
    const [min, max] = filters.priceRange
    const roomPrices = (hotel.rooms ?? []).map((r) => r.price)
    const anyInRange = roomPrices.some((p) => typeof p === 'number' && p >= min && p <= max)
    if (!anyInRange) return false
  }

  return true
}

export function ResultsList() {
  const { t } = useTranslation()
  const searchQuery = useAppSelector(selectSearchQuery)
  const filters = useAppSelector(selectSearchFilters)
  const searchParams = useAppSelector(selectSearchParams)

  const [page, setPage] = useState(1)
  const [allHotels, setAllHotels] = useState<HotelDto[]>([])
  const [hasMore, setHasMore] = useState(true)

  const { data, isLoading, isError, isFetching } = useGetHotelsQuery({
    searchQuery: searchQuery || searchParams.city,
    pageNumber: page,
    pageSize: PAGE_SIZE,
  })

  useEffect(() => {
    setPage(1)
    setAllHotels([])
    setHasMore(true)
  }, [searchQuery])

  useEffect(() => {
    if (!data) return
    setAllHotels((prev) => {
      const merged = [...prev, ...data]
      const map = new Map<number, HotelDto>()
      for (const h of merged) map.set(h.id, h)
      return Array.from(map.values())
    })
    if (data.length < PAGE_SIZE) setHasMore(false)
  }, [data])

  const filteredHotels = useMemo(() => {
    return allHotels.filter((h) => hotelMatchesFilters(h, filters))
  }, [allHotels, filters])

  const sentinelRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    const el = sentinelRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0]
        if (!first?.isIntersecting) return
        if (isFetching || isLoading) return
        if (!hasMore) return
        setPage((p) => p + 1)
      },
      { rootMargin: '250px' },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [hasMore, isFetching, isLoading])

  if (isLoading && allHotels.length === 0) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 'calc(100vh - 200px)',
        }}
      >
        <CircularProgress />
      </Box>
    )
  }

  if (isError) {
    return <Typography color="error">{t('search.noResults')}</Typography>
  }

  if (filteredHotels.length === 0) {
    return <Typography>{t('search.noResults')}</Typography>
  }

  return (
    <Stack spacing={2}>
      {filteredHotels.map((hotel) => (
        <HotelResultCard key={hotel.id} hotel={hotel} />
      ))}
      {hasMore && (
        <Box ref={sentinelRef} sx={{ height: 20 }}>
          {isFetching && <CircularProgress size="small" />}
        </Box>
      )}
    </Stack>
  )
}
```

**✅ Step 13 Complete**: ResultsList now filters hotels and has infinite scroll!

### 14.14 Step 14: Test the Search Results Page

**Verification Checklist**:

1. ✅ **Navigate to `/search`**: Should see Search Results page
2. ✅ **Check filters sidebar**: Should display all filter options (desktop) or drawer (mobile)
3. ✅ **Test price filter**: Adjust slider - results should filter
4. ✅ **Test star rating filter**: Select stars - results should filter
5. ✅ **Test amenities filter**: Select amenities - results should filter
6. ✅ **Test hotel type filter**: Select types - results should filter
7. ✅ **Check selected filters bar**: Should show applied filters
8. ✅ **Test clear filters**: Should clear all filters
9. ✅ **Check infinite scroll**: Should load more results as you scroll
10. ✅ **Test hotel cards**: Click "View Hotel" - should navigate to hotel page
11. ✅ **Test mobile filters**: Open drawer on mobile - filters should work

**Common Issues**:

- **No results**: Check search query is set in SearchSlice (from Home page search)
- **Filters not working**: Check SearchSlice selectors and filter logic
- **API errors**: Check backend is running and endpoints are correct
- **Infinite scroll not working**: Check IntersectionObserver setup

---

## ✅ Feature 3 Complete: Search Results Page

You've built the Search Results page **incrementally**:

- ✅ Created minimal SearchResults page
- ✅ Added ResultsList → Added API → Added types → Added translations → Tested
- ✅ Added HotelResultCard → Added translations → Tested
- ✅ Added PriceFilter → Added translations → Tested
- ✅ Added StarRatingFilter → Added translations → Tested
- ✅ Added AmenitiesFilter → Added API → Added types → Added translations → Tested
- ✅ Added HotelTypeFilter → Added translations → Tested
- ✅ Added FilterContainer/FilterSection (when filters needed them)
- ✅ Added FiltersSidebar (when all filters were ready)
- ✅ Added SelectedFiltersBar (when filters were working)
- ✅ Enhanced ResultsList with filtering and infinite scroll

**Key Learning**: Each component was built, tested, and had its translations/types added **only when needed**. This is realistic development!

**Next**: Move to [Feature 4: Hotel Details Page](#15-feature-4-hotel-details-page)

---
