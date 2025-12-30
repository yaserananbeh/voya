# Feature 4: Hotel Details Page

> **TRUE Incremental Development**: Build the Hotel Details page one component at a time, adding translations, types, and API as you go.

**Navigation**: [← Back to Index](00-README.md) | [← Previous: Feature 3](05-Feature-03-Search-Results.md) | [Next: Feature 5 →](07-Feature-05-Checkout.md)

---

## 15. Feature 4: Hotel Details Page

> **TRUE Incremental Development**: Build the Hotel Details page one component at a time, adding translations, types, and API as you go. **NOT all at once!**

### 🎯 The Incremental Development Pattern

**How Real Developers Build Hotel Details Page**:

1. **Create minimal Hotel page** (placeholder)
2. **Add route** → Test it works
3. **Build HotelGallery component**:
   - Create component
   - Add ONLY gallery translations
   - Test
4. **Build HotelAmenities component**:
   - Create component
   - Add ONLY amenities translations
   - Test
5. **Build HotelMap component**:
   - Create component
   - Add ONLY map translations
   - Add Leaflet CSS import (when map needs it)
   - Test
6. **Build HotelRooms component**:
   - Create component (placeholder)
   - Add translation for heading
   - Test
   - Add API endpoint (getHotelRooms)
   - Add HotelRoomDto type
   - Enhance component
   - Add remaining translations
   - Test
7. **Build HotelReviews component**:
   - Create component (placeholder)
   - Add translation for heading
   - Test
   - Add API endpoint (getHotelReviews)
   - Add HotelReviewDto type
   - Enhance component
   - Add remaining translations
   - Test
8. **Add getHotel API endpoint** (when page needs hotel name/description)
9. **Add getHotelGallery API endpoint** (when HotelGallery component needs it)
10. **Update Hotel page** to use all components and API

**Key Principle**: Each component is built, tested, and has its dependencies (translations, types, API) added **only when that component needs them**.

### What We'll Build (Incrementally)

- ✅ Hotel page component (minimal → full)
- ✅ HotelGallery component (build → add translations → test)
- ✅ HotelAmenities component (build → add translations → test)
- ✅ HotelMap component (build → add translations → add CSS → test)
- ✅ HotelRooms component (build → add API → add types → add translations → test)
- ✅ HotelReviews component (build → add API → add types → add translations → test)
- ✅ Hotel API endpoints (added incrementally as components need them)

Let's start building incrementally!

### 15.1 Step 1: Create Minimal Hotel Page

Start with the absolute minimum - just a placeholder page:

**src/pages/Hotel/Hotel.tsx**:

```typescript
import { Container, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'

export default function Hotel() {
  const { id } = useParams<{ id: string }>()

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4">Hotel Details</Typography>
      <Typography variant="body1">Hotel ID: {id}</Typography>
      <Typography variant="body2">We'll build components incrementally</Typography>
    </Container>
  )
}
```

**src/pages/Hotel/index.ts**:

```typescript
export { default } from './Hotel'
```

### 15.2 Step 2: Add Hotel Route

Update `src/routes/routes.tsx`:

```typescript
import { createBrowserRouter, Navigate } from 'react-router-dom'
import MainLayout from '@/layouts/MainLayout'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import SearchResults from '@/pages/SearchResults'
import Hotel from '@/pages/Hotel'
import { RedirectIfAuthenticated } from '@/components/auth'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Navigate to="/home" replace /> },
      { path: 'home', element: <Home /> },
      { path: 'search', element: <SearchResults /> },
      { path: 'hotel/:id', element: <Hotel /> },
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

**Test**: `pnpm dev` → Navigate to `/hotel/1` → Should see "Hotel Details" text.

### 15.3 Step 3: Build HotelGallery Component

Now let's build the first component - HotelGallery. We'll start minimal, then add translations.

**Create HotelGallery component** (minimal first):

**src/pages/Hotel/components/HotelGallery.tsx**:

```typescript
import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

type HotelGalleryProps = {
  images: string[]
}

export function HotelGallery({ images }: HotelGalleryProps) {
  const { t } = useTranslation()

  if (!images || images.length === 0) {
    return (
      <Box>
        <Typography variant="h6" gutterBottom>
          {t('hotel.gallery', 'Gallery')}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t('hotel.noGalleryImages', 'No images available')}
        </Typography>
      </Box>
    )
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {t('hotel.gallery', 'Gallery')}
      </Typography>
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        {images.map((image, index) => (
          <Box
            key={index}
            component="img"
            src={image}
            alt={`Gallery image ${index + 1}`}
            sx={{ width: 200, height: 150, objectFit: 'cover', borderRadius: 1 }}
          />
        ))}
      </Box>
    </Box>
  )
}
```

**Update Hotel page to use HotelGallery**:

**src/pages/Hotel/Hotel.tsx**:

```typescript
import { Container, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import { HotelGallery } from './components/HotelGallery'

export default function Hotel() {
  const { id } = useParams<{ id: string }>()

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4">Hotel Details</Typography>
      <Typography variant="body1">Hotel ID: {id}</Typography>

      <HotelGallery images={[]} />
    </Container>
  )
}
```

**Add ONLY gallery translations** (incremental - only add these 2 keys):

**Update `src/i18n/locales/en.json`** (add ONLY these 2 keys):

```json
{
  "hotel": {
    "gallery": "Gallery", // ← NEW: Add only this
    "noGalleryImages": "No images available" // ← NEW: Add only this
  }
}
```

**Update `src/i18n/locales/ar.json`** (add ONLY these 2 keys):

```json
{
  "hotel": {
    "gallery": "المعرض", // ← NEW: Add only this
    "noGalleryImages": "لا توجد صور متاحة" // ← NEW: Add only this
  }
}
```

> **📝 Note**: You're adding ONLY 2 new translation keys (`gallery` and `noGalleryImages`) for the HotelGallery component. Don't add all hotel translations at once!

**Test**: Refresh → Should see "Gallery" heading and "No images available" message.

**✅ Step 3 Complete**: HotelGallery is working with translations!

### 15.4 Step 4: Build HotelAmenities Component

Same pattern - build component, add translations, test:

**Create HotelAmenities component**:

**src/pages/Hotel/components/HotelAmenities.tsx**:

```typescript
import { Box, Typography, Chip, Stack } from '@mui/material'
import { useTranslation } from 'react-i18next'

type HotelAmenitiesProps = {
  amenities?: Array<{ id: number; name: string; description?: string }>
}

export function HotelAmenities({ amenities }: HotelAmenitiesProps) {
  const { t } = useTranslation()

  if (!amenities || amenities.length === 0) {
    return (
      <Box>
        <Typography variant="h6" gutterBottom>
          {t('hotel.amenities', 'Amenities')}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t('hotel.noAmenities', 'No amenities listed')}
        </Typography>
      </Box>
    )
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {t('hotel.amenities', 'Amenities')}
      </Typography>
      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
        {amenities.map((amenity) => (
          <Chip key={amenity.id} label={amenity.name} size="small" />
        ))}
      </Stack>
    </Box>
  )
}
```

**Update Hotel page**:

**src/pages/Hotel/Hotel.tsx**:

```typescript
// ... existing imports ...
import { HotelAmenities } from './components/HotelAmenities'

export default function Hotel() {
  const { id } = useParams<{ id: string }>()

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4">Hotel Details</Typography>
      <Typography variant="body1">Hotel ID: {id}</Typography>

      <HotelGallery images={[]} />
      <HotelAmenities amenities={[]} />
    </Container>
  )
}
```

**Add ONLY amenities translations** (incremental - only add these 2 keys):

**Update `src/i18n/locales/en.json`** (add ONLY these 2 keys to existing hotel object):

```json
{
  "hotel": {
    // ... existing keys from Step 3 (gallery, noGalleryImages) ...
    "amenities": "Amenities", // ← NEW: Add only this
    "noAmenities": "No amenities listed" // ← NEW: Add only this
  }
}
```

**Update `src/i18n/locales/ar.json`** (add ONLY these 2 keys to existing hotel object):

```json
{
  "hotel": {
    // ... existing keys from Step 3 (gallery, noGalleryImages) ...
    "amenities": "المرافق", // ← NEW: Add only this
    "noAmenities": "لا توجد مرافق مدرجة" // ← NEW: Add only this
  }
}
```

> **📝 Note**: You're adding ONLY 2 new translation keys (`amenities` and `noAmenities`) for the HotelAmenities component. Don't add all hotel translations at once!

**Test**: Refresh → Should see "Amenities" heading and "No amenities listed" message.

**✅ Step 4 Complete**: HotelAmenities is working with translations!

### 15.5 Step 5: Build HotelMap Component

This component needs Leaflet for maps. We'll build it, add translations, then add the CSS import.

**Create HotelMap component**:

**src/pages/Hotel/components/HotelMap.tsx**:

```typescript
import { Box, Typography } from '@mui/material'
import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import L from 'leaflet'

type HotelMapProps = {
  lat: number
  lng: number
}

export function HotelMap({ lat, lng }: HotelMapProps) {
  const { t } = useTranslation()
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return

    const map = L.map(mapRef.current).setView([lat, lng], 13)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(map)

    L.marker([lat, lng]).addTo(map)

    mapInstanceRef.current = map

    return () => {
      map.remove()
      mapInstanceRef.current = null
    }
  }, [lat, lng])

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {t('hotel.location', 'Location')}
      </Typography>
      <Box
        ref={mapRef}
        sx={{
          width: '100%',
          height: 400,
          borderRadius: 1,
          overflow: 'hidden',
        }}
      />
    </Box>
  )
}
```

**Add ONLY map translation** (incremental - only add this 1 key):

**Update `src/i18n/locales/en.json`** (add ONLY this 1 key):

```json
{
  "hotel": {
    // ... existing keys from previous steps ...
    "location": "Location" // ← NEW: Add only this
  }
}
```

**Update `src/i18n/locales/ar.json`** (add ONLY this 1 key):

```json
{
  "hotel": {
    // ... existing keys from previous steps ...
    "location": "الموقع" // ← NEW: Add only this
  }
}
```

> **📝 Note**: You're adding ONLY 1 new translation key (`location`) for the HotelMap component. Don't add all hotel translations at once!

**Add Leaflet CSS import** (when map component needs it):

**Update `src/main.tsx`** (add Leaflet CSS):

```typescript
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/styles/reset.css'
import 'leaflet/dist/leaflet.css' // ← NEW: Add Leaflet CSS for map component
import App from '@/App.tsx'
// ... rest of imports ...
```

**Note**: Leaflet CSS is needed for the map to display correctly. We add it when the map component is created.

**Test**: Refresh → Should see "Location" heading and map (or check console for Leaflet errors if CSS not loaded).

**✅ Step 5 Complete**: HotelMap is working with translations and Leaflet!

### 15.6 Step 6: Build HotelRooms Component

This component needs API, so we'll follow the pattern: build → add translation → test → add API → enhance → test.

**Create HotelRooms component** (minimal first):

**src/pages/Hotel/components/HotelRooms.tsx**:

```typescript
import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

type HotelRoomsProps = {
  hotelId: number
  hotelName: string
  cityName: string
  rooms?: Array<{ roomId: number; roomType: string; price: number }>
}

export function HotelRooms({ rooms }: HotelRoomsProps) {
  const { t } = useTranslation()

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {t('hotel.rooms', 'Rooms')}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {t('hotel.loadingRooms', 'Loading rooms...')}
      </Typography>
    </Box>
  )
}
```

**Update Hotel page**:

**src/pages/Hotel/Hotel.tsx**:

```typescript
// ... existing imports ...
import { HotelRooms } from './components/HotelRooms'

export default function Hotel() {
  const { id } = useParams<{ id: string }>()

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4">Hotel Details</Typography>
      <Typography variant="body1">Hotel ID: {id}</Typography>

      <HotelGallery images={[]} />
      <HotelAmenities amenities={[]} />
      <HotelRooms hotelId={Number(id)} hotelName="Hotel" cityName="City" />
    </Container>
  )
}
```

**Add rooms translations** (incremental - only add these 2 keys):

**Update `src/i18n/locales/en.json`** (add ONLY these 2 keys):

```json
{
  "hotel": {
    // ... existing keys from previous steps ...
    "rooms": "Rooms", // ← NEW: Add only this
    "loadingRooms": "Loading rooms..." // ← NEW: Add only this
  }
}
```

**Update `src/i18n/locales/ar.json`** (add ONLY these 2 keys):

```json
{
  "hotel": {
    // ... existing keys from previous steps ...
    "rooms": "الغرف", // ← NEW: Add only this
    "loadingRooms": "جاري تحميل الغرف..." // ← NEW: Add only this
  }
}
```

> **📝 Note**: You're adding ONLY 2 new translation keys (`rooms` and `loadingRooms`) for the HotelRooms component. Don't add all hotel translations at once!

**Test**: Refresh → Should see "Rooms" heading and "Loading rooms..." message.

**Now add HotelRooms API endpoint** (only what HotelRooms needs):

**Update Hotels API** (add getHotelRooms endpoint):

**src/api/hotels/index.ts** (add to existing file):

```typescript
// ... existing code ...

// Add HotelRoomDto type (only what we need)
export type HotelRoomDto = {
  roomId: number
  roomNumber: number
  roomPhotoUrl: string
  roomType: string
  capacityOfAdults: number
  capacityOfChildren: number
  amenities: Array<{ id: number; name: string; description: string }>
  price: number
  availability: boolean
}

// Add to endpoints
export const hotelsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ... existing endpoints ...
    getHotelRooms: builder.query<HotelRoomDto[], number>({
      query: (id) => `hotels/${id}/rooms`,
      providesTags: ['Hotel'],
    }),
  }),
})

export const { useGetHotelsQuery, useGetHotelQuery, useGetHotelRoomsQuery } = hotelsApi
```

**Add HotelRoomDto to types** (incremental):

**Update `src/types/models.ts`** (add only this type):

```typescript
// ... existing types ...

export interface HotelRoomDto {
  roomId: number
  roomNumber: number
  roomPhotoUrl: string
  roomType: string
  capacityOfAdults: number
  capacityOfChildren: number
  amenities: Array<{ id: number; name: string; description: string }>
  price: number
  availability: boolean
}
```

**Enhance HotelRooms to use API**:

**src/pages/Hotel/components/HotelRooms.tsx**:

```typescript
import { Box, Typography, Card, CardContent, Button, Stack } from '@mui/material'
import { useGetHotelRoomsQuery } from '@/api/hotels'
import { useTranslation } from 'react-i18next'
import { CircularProgress, Alert } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { SafeImage } from '@/components/common/SafeImage'
import type { HotelRoomDto } from '@/api/hotels'

type HotelRoomsProps = {
  hotelId: number
  hotelName: string
  cityName: string
  rooms?: HotelRoomDto[]
}

export function HotelRooms({ hotelId, hotelName, cityName, rooms: propRooms }: HotelRoomsProps) {
  const { t } = useTranslation()
  const { data: apiRooms, isLoading, isError } = useGetHotelRoomsQuery(hotelId, {
    skip: !!propRooms,
  })

  const rooms = propRooms || apiRooms || []

  if (isLoading && !propRooms) {
    return (
      <Box>
        <Typography variant="h6" gutterBottom>
          {t('hotel.rooms')}
        </Typography>
        <CircularProgress />
      </Box>
    )
  }

  if (isError && !propRooms) {
    return (
      <Box>
        <Typography variant="h6" gutterBottom>
          {t('hotel.rooms')}
        </Typography>
        <Alert severity="error">{t('hotel.failedToLoadRooms', 'Failed to load rooms')}</Alert>
      </Box>
    )
  }

  if (rooms.length === 0) {
    return (
      <Box>
        <Typography variant="h6" gutterBottom>
          {t('hotel.rooms')}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t('hotel.noRooms', 'No rooms available')}
        </Typography>
      </Box>
    )
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {t('hotel.rooms')}
      </Typography>
      <Stack spacing={2}>
        {rooms.map((room) => (
          <Card key={room.roomId}>
            <CardContent>
              <SafeImage
                src={room.roomPhotoUrl}
                alt={room.roomType}
                height={200}
                width="100%"
              />
              <Typography variant="h6" sx={{ mt: 2 }}>
                {room.roomType}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {t('hotel.capacity', 'Capacity')}: {room.capacityOfAdults} {t('hotel.adults', 'adults')}
                {room.capacityOfChildren > 0 && `, ${room.capacityOfChildren} ${t('hotel.children', 'children')}`}
              </Typography>
              <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
                ${room.price} {t('hotel.perNight', '/night')}
              </Typography>
              <Button
                component={RouterLink}
                to={`/checkout?hotelId=${hotelId}&roomId=${room.roomId}`}
                variant="contained"
                fullWidth
                sx={{ mt: 2 }}
                disabled={!room.availability}
              >
                {room.availability ? t('hotel.bookNow', 'Book Now') : t('hotel.unavailable', 'Unavailable')}
              </Button>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  )
}
```

**Add ONLY rooms translations** (incremental - only add these 8 keys):

**Update `src/i18n/locales/en.json`** (add ONLY these 8 keys):

```json
{
  "hotel": {
    // ... existing keys from previous steps ...
    "failedToLoadRooms": "Failed to load rooms", // ← NEW: Add only this
    "noRooms": "No rooms available", // ← NEW: Add only this
    "capacity": "Capacity", // ← NEW: Add only this
    "adults": "adults", // ← NEW: Add only this
    "children": "children", // ← NEW: Add only this
    "perNight": "/night", // ← NEW: Add only this
    "bookNow": "Book Now", // ← NEW: Add only this
    "unavailable": "Unavailable" // ← NEW: Add only this
  }
}
```

**Update `src/i18n/locales/ar.json`** (add ONLY these 8 keys):

```json
{
  "hotel": {
    // ... existing keys from previous steps ...
    "failedToLoadRooms": "فشل تحميل الغرف", // ← NEW: Add only this
    "noRooms": "لا توجد غرف متاحة", // ← NEW: Add only this
    "capacity": "السعة", // ← NEW: Add only this
    "adults": "بالغين", // ← NEW: Add only this
    "children": "أطفال", // ← NEW: Add only this
    "perNight": "/ليلة", // ← NEW: Add only this
    "bookNow": "احجز الآن", // ← NEW: Add only this
    "unavailable": "غير متاح" // ← NEW: Add only this
  }
}
```

> **📝 Note**: You're adding ONLY 8 new translation keys for the HotelRooms component. Don't add all hotel translations at once!

**Test**: Refresh → Should see rooms loading → Then display rooms (or error/empty state).

**✅ Step 6 Complete**: HotelRooms is working with API, types, and translations!

### 15.7 Step 7: Build HotelReviews Component

Same pattern - build component, add translation, test, add API, enhance, test:

**Create HotelReviews component** (minimal first):

**src/pages/Hotel/components/HotelReviews.tsx**:

```typescript
import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

type HotelReviewsProps = {
  reviews?: Array<{ reviewId: number; customerName: string; rating: number; description: string }>
}

export function HotelReviews({ reviews }: HotelReviewsProps) {
  const { t } = useTranslation()

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {t('hotel.reviews', 'Reviews')}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {t('hotel.loadingReviews', 'Loading reviews...')}
      </Typography>
    </Box>
  )
}
```

**Update Hotel page**:

**src/pages/Hotel/Hotel.tsx**:

```typescript
// ... existing imports ...
import { HotelReviews } from './components/HotelReviews'

export default function Hotel() {
  const { id } = useParams<{ id: string }>()

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4">Hotel Details</Typography>
      <Typography variant="body1">Hotel ID: {id}</Typography>

      <HotelGallery images={[]} />
      <HotelAmenities amenities={[]} />
      <HotelRooms hotelId={Number(id)} hotelName="Hotel" cityName="City" />
      <HotelReviews />
    </Container>
  )
}
```

**Add reviews translations** (incremental - only add these 2 keys):

**Update `src/i18n/locales/en.json`** (add ONLY these 2 keys):

```json
{
  "hotel": {
    // ... existing keys from previous steps ...
    "reviews": "Reviews", // ← NEW: Add only this
    "loadingReviews": "Loading reviews..." // ← NEW: Add only this
  }
}
```

**Update `src/i18n/locales/ar.json`** (add ONLY these 2 keys):

```json
{
  "hotel": {
    // ... existing keys from previous steps ...
    "reviews": "التقييمات", // ← NEW: Add only this
    "loadingReviews": "جاري تحميل التقييمات..." // ← NEW: Add only this
  }
}
```

> **📝 Note**: You're adding ONLY 2 new translation keys (`reviews` and `loadingReviews`) for the HotelReviews component. Don't add all hotel translations at once!

**Test**: Refresh → Should see "Reviews" heading.

**Now add HotelReviews API endpoint**:

**Update Hotels API** (add getHotelReviews endpoint):

**src/api/hotels/index.ts** (add to existing file):

```typescript
// ... existing code ...

// Add HotelReviewDto type (only what we need)
export type HotelReviewDto = {
  reviewId: number
  customerName: string
  rating: number
  description: string
}

// Add to endpoints
export const hotelsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ... existing endpoints ...
    getHotelReviews: builder.query<HotelReviewDto[], number>({
      query: (id) => `hotels/${id}/reviews`,
      providesTags: ['Hotel'],
    }),
  }),
})

export const {
  useGetHotelsQuery,
  useGetHotelQuery,
  useGetHotelRoomsQuery,
  useGetHotelReviewsQuery,
} = hotelsApi
```

**Add HotelReviewDto to types** (incremental):

**Update `src/types/models.ts`** (add only this type):

```typescript
// ... existing types ...

export interface HotelReviewDto {
  reviewId: number
  customerName: string
  rating: number
  description: string
}
```

**Enhance HotelReviews to use API**:

**src/pages/Hotel/components/HotelReviews.tsx**:

```typescript
import { Box, Typography, Card, CardContent, Rating, Stack } from '@mui/material'
import { useGetHotelReviewsQuery } from '@/api/hotels'
import { useTranslation } from 'react-i18next'
import { CircularProgress, Alert } from '@mui/material'
import { useParams } from 'react-router-dom'
import type { HotelReviewDto } from '@/api/hotels'

type HotelReviewsProps = {
  reviews?: HotelReviewDto[]
}

export function HotelReviews({ reviews: propReviews }: HotelReviewsProps) {
  const { t } = useTranslation()
  const { id } = useParams<{ id: string }>()
  const { data: apiReviews, isLoading, isError } = useGetHotelReviewsQuery(Number(id), {
    skip: !!propReviews || !id,
  })

  const reviews = propReviews || apiReviews || []

  if (isLoading && !propReviews) {
    return (
      <Box>
        <Typography variant="h6" gutterBottom>
          {t('hotel.reviews')}
        </Typography>
        <CircularProgress />
      </Box>
    )
  }

  if (isError && !propReviews) {
    return (
      <Box>
        <Typography variant="h6" gutterBottom>
          {t('hotel.reviews')}
        </Typography>
        <Alert severity="error">{t('hotel.failedToLoadReviews', 'Failed to load reviews')}</Alert>
      </Box>
    )
  }

  if (reviews.length === 0) {
    return (
      <Box>
        <Typography variant="h6" gutterBottom>
          {t('hotel.reviews')}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t('hotel.noReviews', 'No reviews yet')}
        </Typography>
      </Box>
    )
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {t('hotel.reviews')}
      </Typography>
      <Stack spacing={2}>
        {reviews.map((review) => (
          <Card key={review.reviewId}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="subtitle1">{review.customerName}</Typography>
                <Rating value={review.rating} readOnly size="small" />
              </Box>
              <Typography variant="body2">{review.description}</Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  )
}
```

**Add ONLY reviews translations** (incremental - only add these 2 keys):

**Update `src/i18n/locales/en.json`** (add ONLY these 2 keys):

```json
{
  "hotel": {
    // ... existing keys from previous steps ...
    "failedToLoadReviews": "Failed to load reviews", // ← NEW: Add only this
    "noReviews": "No reviews yet" // ← NEW: Add only this
  }
}
```

**Update `src/i18n/locales/ar.json`** (add ONLY these 2 keys):

```json
{
  "hotel": {
    // ... existing keys from previous steps ...
    "failedToLoadReviews": "فشل تحميل التقييمات", // ← NEW: Add only this
    "noReviews": "لا توجد تقييمات بعد" // ← NEW: Add only this
  }
}
```

> **📝 Note**: You're adding ONLY 2 new translation keys (`failedToLoadReviews` and `noReviews`) for the HotelReviews component. Don't add all hotel translations at once!

**Test**: Refresh → Should see reviews loading → Then display reviews (or error/empty state).

**✅ Step 7 Complete**: HotelReviews is working with API, types, and translations!

### 15.8 Step 8: Add getHotel API Endpoint (When Page Needs Hotel Info)

Now that we have components displaying hotel info, we need to fetch the hotel data. Let's add the getHotel endpoint first:

**Update Hotels API** (add getHotel endpoint - only what we need now):

**src/api/hotels/index.ts** (add to existing file):

```typescript
// ... existing code ...

// Add to endpoints
export const hotelsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ... existing endpoints ...
    getHotel: builder.query<HotelDto, number>({
      query: (id) => `hotels/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Hotel', id }],
    }),
  }),
})

export const {
  useGetHotelsQuery,
  useGetHotelQuery,
  useGetHotelRoomsQuery,
  useGetHotelReviewsQuery,
} = hotelsApi
```

**Note**: HotelDto was already added in Feature 3 (Search Results), so we don't need to add it again. We're adding ONLY the getHotel endpoint now - getHotelGallery will come in the next step when the gallery component needs it.

**Update Hotel page to use getHotel** (display hotel name and basic info):

**src/pages/Hotel/Hotel.tsx**:

```typescript
import { Container, Typography, Stack, Rating, Box } from '@mui/material'
import { useParams } from 'react-router-dom'
import { useGetHotelQuery } from '@/api/hotels'
import { HotelGallery } from './components/HotelGallery'
import { HotelAmenities } from './components/HotelAmenities'
import { HotelMap } from './components/HotelMap'
import { HotelRooms } from './components/HotelRooms'
import { HotelReviews } from './components/HotelReviews'
import { VoyaLoader } from '@/components'
import { useTranslation } from 'react-i18next'

export default function Hotel() {
  const { id } = useParams<{ id: string }>()
  const { t } = useTranslation()
  const hotelId = Number(id)

  const { data: hotel, isLoading, isError } = useGetHotelQuery(hotelId, {
    skip: !id,
  })

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 'calc(100vh - 200px)',
        }}
      >
        <VoyaLoader />
      </Box>
    )
  }

  if (isError || !hotel) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography color="error">{t('hotel.failedToLoadHotel', 'Failed to load hotel')}</Typography>
      </Container>
    )
  }

  return (
    <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 }, mt: 4 }}>
      <Stack spacing={{ xs: 2, sm: 4 }}>
        <div>
          <Typography variant="h4">{hotel.hotelName ?? hotel.name}</Typography>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1}
            alignItems={{ xs: 'flex-start', sm: 'center' }}
            sx={{ mt: 1 }}
          >
            <Rating value={hotel.starRating} readOnly size="small" />
            <Typography color="text.secondary" variant="body2">
              {hotel.location}
            </Typography>
          </Stack>
        </div>

        <HotelGallery images={hotel.imageUrl ? [hotel.imageUrl] : []} />
        <Typography>{hotel.description}</Typography>
        <HotelAmenities amenities={hotel.amenities} />

        {hotel.latitude !== undefined && hotel.longitude !== undefined && (
          <HotelMap lat={hotel.latitude} lng={hotel.longitude} />
        )}

        <HotelRooms
          hotelId={hotel.id}
          hotelName={hotel.hotelName ?? hotel.name}
          cityName={hotel.location}
        />

        <HotelReviews />
      </Stack>
    </Container>
  )
}
```

**Add ONLY hotel page translation** (incremental - only add this 1 key):

**Update `src/i18n/locales/en.json`** (add ONLY this 1 key):

```json
{
  "hotel": {
    // ... existing keys from previous steps ...
    "failedToLoadHotel": "Failed to load hotel" // ← NEW: Add only this
  }
}
```

**Update `src/i18n/locales/ar.json`** (add ONLY this 1 key):

```json
{
  "hotel": {
    // ... existing keys from previous steps ...
    "failedToLoadHotel": "فشل تحميل الفندق" // ← NEW: Add only this
  }
}
```

> **📝 Note**: You're adding ONLY 1 new translation key (`failedToLoadHotel`) for the Hotel page error state. Don't add all hotel translations at once!

**Test**: Navigate to `/hotel/1` → Should see hotel name, rating, location, description, and all components working.

**✅ Step 8 Complete**: Hotel page is displaying hotel info from API!

### 15.9 Step 9: Add getHotelGallery API Endpoint (When Gallery Needs It)

Now that the HotelGallery component is working, we can enhance it to fetch gallery images from the API:

**Update Hotels API** (add getHotelGallery endpoint):

**src/api/hotels/index.ts** (add to existing file):

```typescript
// ... existing code ...

// Add HotelGalleryPhotoDto type (only what we need)
export type HotelGalleryPhotoDto = {
  id: number
  url: string
}

// Add to endpoints
export const hotelsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ... existing endpoints ...
    getHotelGallery: builder.query<HotelGalleryPhotoDto[], number>({
      query: (id) => `hotels/${id}/gallery`,
      providesTags: ['Hotel'],
    }),
  }),
})

export const {
  useGetHotelsQuery,
  useGetHotelQuery,
  useGetHotelGalleryQuery,
  useGetHotelRoomsQuery,
  useGetHotelReviewsQuery,
} = hotelsApi
```

**Add HotelGalleryPhotoDto to types** (incremental):

**Update `src/types/models.ts`** (add only this type):

```typescript
// ... existing types ...

export interface HotelGalleryPhotoDto {
  id: number
  url: string
}
```

**Update Hotel page to use getHotelGallery**:

**src/pages/Hotel/Hotel.tsx** (update to use gallery API):

```typescript
// ... existing imports ...
import { useGetHotelGalleryQuery } from '@/api/hotels'

export default function Hotel() {
  // ... existing code ...
  const { data: gallery } = useGetHotelGalleryQuery(hotelId, {
    skip: !id,
  })

  // ... existing code ...

  const galleryImages = gallery?.map((photo) => photo.url) || (hotel.imageUrl ? [hotel.imageUrl] : [])

  return (
    // ... existing JSX ...
    <HotelGallery images={galleryImages} />
    // ... rest of JSX ...
  )
}
```

**Test**: Refresh → Should see gallery images loading from API (or fallback to hotel.imageUrl).

**✅ Step 9 Complete**: HotelGallery is now using API!

### 15.10 Step 10: Test the Complete Hotel Details Page

The Hotel page is now complete! After Step 8, the page displays hotel info from `getHotel`. After Step 9, the gallery loads from `getHotelGallery`. All components are working together.

**Test**: Navigate to `/hotel/1` → Should see:

- ✅ Hotel name and rating (from getHotel API)
- ✅ Gallery images (from getHotelGallery API, with fallback to hotel.imageUrl)
- ✅ Description (from getHotel API)
- ✅ Amenities (from getHotel API)
- ✅ Map (if coordinates available, from getHotel API)
- ✅ Rooms (from getHotelRooms API, added in Step 6)
- ✅ Reviews (from getHotelReviews API, added in Step 7)

**✅ Step 10 Complete**: Hotel page is fully functional!

### 15.10 Step 10: Add react-image-gallery CSS (When Gallery Needs It)

If you want to enhance the gallery with react-image-gallery, add the CSS:

**Update `src/main.tsx`** (add react-image-gallery CSS):

```typescript
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/styles/reset.css'
import 'leaflet/dist/leaflet.css'
import 'react-image-gallery/styles/css/image-gallery.css' // ← NEW: Add react-image-gallery CSS
import App from '@/App.tsx'
// ... rest of imports ...
```

**Note**: This CSS is only needed if you enhance HotelGallery to use react-image-gallery component. Add it when you need it.

### 15.11 Step 11: Test the Hotel Details Page

**Verification Checklist**:

1. ✅ **Navigate to `/hotel/:id`**: Should see hotel details page
2. ✅ **Check hotel info**: Should display name, rating, location
3. ✅ **Check gallery**: Should display images (or "No images available")
4. ✅ **Check amenities**: Should display amenities as chips (or "No amenities listed")
5. ✅ **Check map**: Should display map with marker (if coordinates available)
6. ✅ **Check rooms**: Should load and display rooms
7. ✅ **Check reviews**: Should load and display reviews
8. ✅ **Test room booking**: Click "Book Now" → Should navigate to checkout
9. ✅ **Test error states**: Try invalid hotel ID → Should show error message
10. ✅ **Test loading states**: Should show loaders while fetching data

**Common Issues**:

- **Map not displaying**: Check Leaflet CSS is imported
- **API errors**: Check backend is running and endpoints are correct
- **Images not loading**: Check image URLs are valid
- **TypeScript errors**: Check all types are added to `types/models.ts`

---

## ✅ Feature 4 Complete: Hotel Details Page

You've built the Hotel Details page **incrementally**:

- ✅ Created minimal Hotel page
- ✅ Added HotelGallery → Added translations → Tested
- ✅ Added HotelAmenities → Added translations → Tested
- ✅ Added HotelMap → Added translations → Added Leaflet CSS → Tested
- ✅ Added HotelRooms → Added API → Added types → Added translations → Tested
- ✅ Added HotelReviews → Added API → Added types → Added translations → Tested
- ✅ Added getHotel API endpoint (when page needed hotel info) → Tested
- ✅ Added getHotelGallery API endpoint (when gallery needed it) → Tested
- ✅ Updated Hotel page to use all components and API

**Key Learning**: Each component was built, tested, and had its translations/types added **only when needed**. This is realistic development!

**Next**: Move to [Feature 5: Checkout Flow](#16-feature-5-checkout-flow)

---
