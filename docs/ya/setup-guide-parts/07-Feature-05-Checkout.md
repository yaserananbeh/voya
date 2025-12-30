# Feature 5: Checkout Flow

> **TRUE Incremental Development**: Build the Checkout Flow one component at a time, adding translations, types, and API as you go.

**Navigation**: [← Back to Index](00-README.md) | [← Previous: Feature 4](06-Feature-04-Hotel-Details.md) | [Next: Feature 6 →](08-Feature-06-Admin-Dashboard.md)

---

## 16. Feature 5: Checkout Flow

> **TRUE Incremental Development**: Build the Checkout Flow one component at a time, adding translations, types, and API as you go. **NOT all at once!**

### 🎯 The Incremental Development Pattern

**How Real Developers Build Checkout Flow**:

1. **Create minimal Checkout page** (placeholder)
2. **Add route** → Test it works
3. **Build BookingSummary component**:
   - Create component
   - Add ONLY booking summary translations
   - Add price utils (calculateTotalCost, nightsBetween)
   - Test
4. **Build UserInfoForm component**:
   - Create component (minimal)
   - Add ONLY form translations
   - Add validation schema (bookingSchema)
   - Add validation translations
   - Enhance component
   - Test
5. **Build CheckoutActions component**:
   - Create component
   - Add ONLY actions translations
   - Test
6. **Update Checkout page** to use all components (still with mock data)
7. **Add checkoutStorage utils and CheckoutContext type** (when Checkout page needs to persist/load context from HotelRooms)
8. **Add checkout API** (createBooking mutation - when Checkout page needs to actually submit):
   - Add API endpoint
   - Add BookingRequest/BookingDetailsDto types
   - Test
9. **Update Checkout page** to use storage and API (replace mock data with real data)
10. **Build Confirmation page**:
    - Create page (minimal)
    - Add translations
    - Add getBookingById API endpoint
    - Enhance page
    - Test

**Key Principle**: Each component is built, tested, and has its dependencies (translations, types, API, utils) added **only when that component needs them**.

### What We'll Build (Incrementally)

- ✅ Checkout page component (minimal → full)
- ✅ BookingSummary component (build → add translations → add utils → test)
- ✅ UserInfoForm component (build → add translations → add validation → test)
- ✅ CheckoutActions component (build → add translations → test)
- ✅ Price utils (calculateTotalCost, nightsBetween)
- ✅ CheckoutStorage utils (save/load context)
- ✅ CheckoutContext type
- ✅ Checkout API endpoints (createBooking, getBookingById)
- ✅ Confirmation page (build → add API → add translations → test)

Let's start building incrementally!

### 16.1 Step 1: Create Minimal Checkout Page

Start with the absolute minimum - just a placeholder page:

**src/pages/Checkout/Checkout.tsx**:

```typescript
import { Container, Typography } from '@mui/material'

export default function Checkout() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4">Checkout</Typography>
      <Typography variant="body2">We'll build components incrementally</Typography>
    </Container>
  )
}
```

**src/pages/Checkout/index.ts**:

```typescript
export { default } from './Checkout'
```

### 16.2 Step 2: Add Checkout Route

Update `src/routes/routes.tsx`:

```typescript
import { createBrowserRouter, Navigate } from 'react-router-dom'
import MainLayout from '@/layouts/MainLayout'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import SearchResults from '@/pages/SearchResults'
import Hotel from '@/pages/Hotel'
import Checkout from '@/pages/Checkout'
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
      { path: 'checkout', element: <Checkout /> },
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

**Test**: `pnpm dev` → Navigate to `/checkout` → Should see "Checkout" text.

### 16.3 Step 3: Build BookingSummary Component

Now let's build the first component - BookingSummary. We'll start minimal, then add translations and utils.

**Create BookingSummary component** (minimal first):

**src/pages/Checkout/components/BookingSummary.tsx**:

```typescript
import { Card, CardContent, Typography, Box } from '@mui/material'
import { useTranslation } from 'react-i18next'

type BookingSummaryProps = {
  ctx: {
    hotelName: string
    roomType: string
    roomNumber: string
    pricePerNight: number
    checkInDate: string
    checkOutDate: string
  }
}

export function BookingSummary({ ctx }: BookingSummaryProps) {
  const { t } = useTranslation()

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {t('checkout.bookingSummary', 'Booking Summary')}
        </Typography>
        <Typography variant="body1">{ctx.hotelName}</Typography>
        <Typography variant="body2" color="text.secondary">
          {ctx.roomType} - Room #{ctx.roomNumber}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t('checkout.pricePerNight', 'Price per night')}: ${ctx.pricePerNight}
        </Typography>
      </CardContent>
    </Card>
  )
}
```

**Update Checkout page to use BookingSummary**:

**src/pages/Checkout/Checkout.tsx**:

```typescript
import { Container, Typography } from '@mui/material'
import { BookingSummary } from './components/BookingSummary'

export default function Checkout() {
  // Mock context for now
  const mockCtx = {
    hotelName: 'Sample Hotel',
    roomType: 'Deluxe Room',
    roomNumber: '101',
    pricePerNight: 100,
    checkInDate: '2024-01-01',
    checkOutDate: '2024-01-03',
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4">Checkout</Typography>
      <BookingSummary ctx={mockCtx} />
    </Container>
  )
}
```

**Add ONLY booking summary translations** (incremental - only add these 2 keys):

**Update `src/i18n/locales/en.json`** (add ONLY these 2 keys):

```json
{
  "checkout": {
    "bookingSummary": "Booking Summary", // ← NEW: Add only this
    "pricePerNight": "Price per night" // ← NEW: Add only this
  }
}
```

**Update `src/i18n/locales/ar.json`** (add ONLY these 2 keys):

```json
{
  "checkout": {
    "bookingSummary": "ملخص الحجز", // ← NEW: Add only this
    "pricePerNight": "السعر لكل ليلة" // ← NEW: Add only this
  }
}
```

> **📝 Note**: You're adding ONLY 2 new translation keys (`bookingSummary` and `pricePerNight`) for the BookingSummary component. Don't add all checkout translations at once!

**Test**: Refresh → Should see "Booking Summary" heading and hotel details.

**Now add price calculation utils** (when BookingSummary needs to calculate total):

**Create price utils**:

**src/pages/Checkout/utils/price.ts**:

```typescript
export const nightsBetween = (checkIn: string, checkOut: string) => {
  const start = new Date(checkIn)
  const end = new Date(checkOut)
  const diffMs = end.getTime() - start.getTime()
  const nights = Math.ceil(diffMs / (1000 * 60 * 60 * 24))
  return Math.max(0, nights)
}

export const calculateTotalCost = (pricePerNight: number, checkIn: string, checkOut: string) =>
  nightsBetween(checkIn, checkOut) * pricePerNight
```

**Enhance BookingSummary to use price utils**:

**src/pages/Checkout/components/BookingSummary.tsx**:

```typescript
import { Card, CardContent, Typography, Box, Stack, Divider } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { calculateTotalCost, nightsBetween } from '../utils/price'

type BookingSummaryProps = {
  ctx: {
    hotelName: string
    roomType: string
    roomNumber: string
    pricePerNight: number
    checkInDate: string
    checkOutDate: string
  }
}

export function BookingSummary({ ctx }: BookingSummaryProps) {
  const { t } = useTranslation()
  const nights = nightsBetween(ctx.checkInDate, ctx.checkOutDate)
  const total = calculateTotalCost(ctx.pricePerNight, ctx.checkInDate, ctx.checkOutDate)

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {t('checkout.bookingSummary')}
        </Typography>
        <Stack spacing={2}>
          <Box>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {t('checkout.hotel', 'Hotel')}
            </Typography>
            <Typography variant="body1" fontWeight={600}>
              {ctx.hotelName}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {t('checkout.room', 'Room')}
            </Typography>
            <Typography variant="body1" fontWeight={600}>
              {ctx.roomType} - #{ctx.roomNumber}
            </Typography>
          </Box>
          <Divider />
          <Box>
            <Typography variant="body2" color="text.secondary">
              {t('checkout.nights', 'Nights')}: {nights}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t('checkout.pricePerNight')}: ${ctx.pricePerNight}
            </Typography>
          </Box>
          <Divider />
          <Box>
            <Typography variant="h6" color="primary">
              {t('checkout.total', 'Total')}: ${total}
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  )
}
```

**Add ONLY additional booking summary translations** (incremental - only add these 3 keys):

**Update `src/i18n/locales/en.json`** (add ONLY these 3 keys):

```json
{
  "checkout": {
    "bookingSummary": "Booking Summary",
    "pricePerNight": "Price per night",
    "hotel": "Hotel", // ← NEW: Add only this
    "room": "Room", // ← NEW: Add only this
    "nights": "Nights", // ← NEW: Add only this
    "total": "Total" // ← NEW: Add only this
  }
}
```

**Update `src/i18n/locales/ar.json`** (add ONLY these 3 keys):

```json
{
  "checkout": {
    "bookingSummary": "ملخص الحجز",
    "pricePerNight": "السعر لكل ليلة",
    "hotel": "الفندق", // ← NEW: Add only this
    "room": "الغرفة", // ← NEW: Add only this
    "nights": "الليالي", // ← NEW: Add only this
    "total": "الإجمالي" // ← NEW: Add only this
  }
}
```

> **📝 Note**: You're adding ONLY 4 more translation keys (`hotel`, `room`, `nights`, `total`) for the enhanced BookingSummary component. Don't add all checkout translations at once!

**Test**: Refresh → Should see calculated nights and total cost.

**✅ Step 3 Complete**: BookingSummary is working with translations and price utils!

### 16.4 Step 4: Build UserInfoForm Component

Same pattern - build component, add translations, add validation, test:

**Create UserInfoForm component** (minimal first):

**src/pages/Checkout/components/UserInfoForm.tsx**:

```typescript
import { TextField, Stack, Typography, Box } from '@mui/material'
import { useTranslation } from 'react-i18next'

export type UserInfoValues = {
  customerName: string
  paymentMethod: string
  specialRequests?: string
}

type UserInfoFormProps = {
  initialValues: UserInfoValues
  onSubmit: (values: UserInfoValues) => Promise<void>
  submitting: boolean
}

export function UserInfoForm({ initialValues, onSubmit, submitting }: UserInfoFormProps) {
  const { t } = useTranslation()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    onSubmit({
      customerName: formData.get('customerName') as string,
      paymentMethod: formData.get('paymentMethod') as string,
      specialRequests: formData.get('specialRequests') as string,
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          {t('checkout.customerInfo', 'Customer Information')}
        </Typography>
      </Box>
      <Stack spacing={2}>
        <TextField
          name="customerName"
          label={t('checkout.fullName', 'Full Name')}
          defaultValue={initialValues.customerName}
          fullWidth
        />
        <TextField
          name="paymentMethod"
          label={t('checkout.paymentMethod', 'Payment Method')}
          defaultValue={initialValues.paymentMethod}
          fullWidth
        />
        <TextField
          name="specialRequests"
          label={t('checkout.specialRequests', 'Special Requests')}
          defaultValue={initialValues.specialRequests}
          multiline
          rows={3}
          fullWidth
        />
        <button type="submit" disabled={submitting}>
          {submitting ? t('checkout.submitting', 'Submitting...') : t('checkout.submit', 'Submit')}
        </button>
      </Stack>
    </form>
  )
}
```

**Update Checkout page**:

**src/pages/Checkout/Checkout.tsx**:

```typescript
import { Container, Typography } from '@mui/material'
import { BookingSummary } from './components/BookingSummary'
import { UserInfoForm, type UserInfoValues } from './components/UserInfoForm'

export default function Checkout() {
  const mockCtx = {
    hotelName: 'Sample Hotel',
    roomType: 'Deluxe Room',
    roomNumber: '101',
    pricePerNight: 100,
    checkInDate: '2024-01-01',
    checkOutDate: '2024-01-03',
  }

  const handleSubmit = async (values: UserInfoValues) => {
    console.log('Form submitted:', values)
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4">Checkout</Typography>
      <BookingSummary ctx={mockCtx} />
      <UserInfoForm
        initialValues={{ customerName: '', paymentMethod: '', specialRequests: '' }}
        onSubmit={handleSubmit}
        submitting={false}
      />
    </Container>
  )
}
```

**Add ONLY form translations** (incremental - only add these 5 keys):

**Update `src/i18n/locales/en.json`** (add ONLY these 5 keys):

```json
{
  "checkout": {
    // ... existing keys from Step 3 ...
    "customerInfo": "Customer Information", // ← NEW: Add only this
    "fullName": "Full Name", // ← NEW: Add only this
    "paymentMethod": "Payment Method", // ← NEW: Add only this
    "specialRequests": "Special Requests", // ← NEW: Add only this
    "submit": "Submit", // ← NEW: Add only this
    "submitting": "Submitting..." // ← NEW: Add only this
  }
}
```

**Update `src/i18n/locales/ar.json`** (add ONLY these 5 keys):

```json
{
  "checkout": {
    // ... existing keys from Step 3 ...
    "customerInfo": "معلومات العميل", // ← NEW: Add only this
    "fullName": "الاسم الكامل", // ← NEW: Add only this
    "paymentMethod": "طريقة الدفع", // ← NEW: Add only this
    "specialRequests": "طلبات خاصة", // ← NEW: Add only this
    "submit": "إرسال", // ← NEW: Add only this
    "submitting": "جاري الإرسال..." // ← NEW: Add only this
  }
}
```

> **📝 Note**: You're adding ONLY 6 new translation keys for the UserInfoForm component. Don't add all checkout translations at once!

**Test**: Refresh → Should see form with customer info fields.

**Now add validation schema** (when form needs validation):

**Create booking validation schema**:

**src/pages/Checkout/components/bookingSchema.ts**:

```typescript
import * as Yup from 'yup'

export const bookingSchema = Yup.object({
  customerName: Yup.string().trim().required('Customer name is required'),
  paymentMethod: Yup.string().trim().required('Payment method is required'),
  specialRequests: Yup.string()
    .trim()
    .max(500, 'Special requests must be less than 500 characters'),
})
```

**Note**: Install Yup if not already installed: `pnpm add yup`

**Enhance UserInfoForm to use Formik and validation**:

**src/pages/Checkout/components/UserInfoForm.tsx**:

```typescript
import {
  Button,
  MenuItem,
  Stack,
  TextField,
  Typography,
  Box,
  InputAdornment,
} from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'
import PaymentIcon from '@mui/icons-material/Payment'
import NotesIcon from '@mui/icons-material/Notes'
import { Form, Formik } from 'formik'
import { bookingSchema } from './bookingSchema'
import { useTranslation } from 'react-i18next'

export type UserInfoValues = {
  customerName: string
  paymentMethod: string
  specialRequests?: string
}

type UserInfoFormProps = {
  initialValues: UserInfoValues
  onSubmit: (values: UserInfoValues) => Promise<void>
  submitting: boolean
}

export function UserInfoForm({ initialValues, onSubmit, submitting }: UserInfoFormProps) {
  const { t } = useTranslation()

  return (
    <Formik<UserInfoValues>
      initialValues={initialValues}
      validationSchema={bookingSchema}
      onSubmit={async (values, helpers) => {
        try {
          await onSubmit(values)
        } catch (error: unknown) {
          if (error instanceof Error) {
            helpers.setStatus(error.message)
          } else {
            helpers.setStatus(t('checkout.unexpectedError', 'An unexpected error occurred'))
          }
        }
      }}
    >
      {({ values, handleChange, touched, errors, status }) => (
        <Form>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" fontWeight={700} gutterBottom>
              {t('checkout.customerInfo')}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t('checkout.fillDetails', 'Please fill in your details to complete the booking')}
            </Typography>
          </Box>

          <Stack spacing={3}>
            <TextField
              name="customerName"
              label={t('checkout.fullName')}
              value={values.customerName}
              onChange={handleChange}
              error={Boolean(touched.customerName && errors.customerName)}
              helperText={touched.customerName && errors.customerName ? errors.customerName : ' '}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon sx={{ color: 'text.secondary' }} />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              select
              name="paymentMethod"
              label={t('checkout.paymentMethod')}
              value={values.paymentMethod}
              onChange={handleChange}
              error={Boolean(touched.paymentMethod && errors.paymentMethod)}
              helperText={
                touched.paymentMethod && errors.paymentMethod ? errors.paymentMethod : ' '
              }
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PaymentIcon sx={{ color: 'text.secondary' }} />
                  </InputAdornment>
                ),
              }}
            >
              <MenuItem value="credit_card">{t('checkout.creditCard', 'Credit Card')}</MenuItem>
              <MenuItem value="debit_card">{t('checkout.debitCard', 'Debit Card')}</MenuItem>
              <MenuItem value="paypal">{t('checkout.paypal', 'PayPal')}</MenuItem>
            </TextField>

            <TextField
              name="specialRequests"
              label={t('checkout.specialRequests')}
              value={values.specialRequests || ''}
              onChange={handleChange}
              error={Boolean(touched.specialRequests && errors.specialRequests)}
              helperText={
                touched.specialRequests && errors.specialRequests ? errors.specialRequests : ' '
              }
              multiline
              rows={3}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <NotesIcon sx={{ color: 'text.secondary' }} />
                  </InputAdornment>
                ),
              }}
            />

            {status && (
              <Typography color="error" variant="body2">
                {status}
              </Typography>
            )}

            <Button type="submit" variant="contained" fullWidth disabled={submitting}>
              {submitting ? t('checkout.submitting') : t('checkout.submit')}
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  )
}
```

**Add ONLY additional form translations** (incremental - only add these 4 keys):

**Update `src/i18n/locales/en.json`** (add ONLY these 4 keys):

```json
{
  "checkout": {
    // ... existing keys from previous steps ...
    "fillDetails": "Please fill in your details to complete the booking", // ← NEW: Add only this
    "creditCard": "Credit Card", // ← NEW: Add only this
    "debitCard": "Debit Card", // ← NEW: Add only this
    "paypal": "PayPal", // ← NEW: Add only this
    "unexpectedError": "An unexpected error occurred" // ← NEW: Add only this
  }
}
```

**Update `src/i18n/locales/ar.json`** (add ONLY these 4 keys):

```json
{
  "checkout": {
    // ... existing keys from previous steps ...
    "fillDetails": "يرجى ملء التفاصيل لإكمال الحجز", // ← NEW: Add only this
    "creditCard": "بطاقة ائتمان", // ← NEW: Add only this
    "debitCard": "بطاقة خصم", // ← NEW: Add only this
    "paypal": "باي بال", // ← NEW: Add only this
    "unexpectedError": "حدث خطأ غير متوقع" // ← NEW: Add only this
  }
}
```

> **📝 Note**: You're adding ONLY 5 more translation keys for the enhanced UserInfoForm component. Don't add all checkout translations at once!

**Test**: Refresh → Should see form with validation (try submitting empty form → should show errors).

**✅ Step 4 Complete**: UserInfoForm is working with translations and validation!

### 16.5 Step 5: Build CheckoutActions Component

Simple component for displaying errors:

**Create CheckoutActions component**:

**src/pages/Checkout/components/CheckoutActions.tsx**:

```typescript
import { Alert, Stack } from '@mui/material'

export function CheckoutActions({ error }: { error?: string | null }) {
  return <Stack sx={{ mt: 2 }}>{error ? <Alert severity="error">{error}</Alert> : null}</Stack>
}
```

**Update Checkout page**:

**src/pages/Checkout/Checkout.tsx**:

```typescript
// ... existing imports ...
import { CheckoutActions } from './components/CheckoutActions'

export default function Checkout() {
  // ... existing code ...
  const [uiError, setUiError] = useState<string | null>(null)

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4">Checkout</Typography>
      <BookingSummary ctx={mockCtx} />
      <UserInfoForm
        initialValues={{ customerName: '', paymentMethod: '', specialRequests: '' }}
        onSubmit={handleSubmit}
        submitting={false}
      />
      <CheckoutActions error={uiError} />
    </Container>
  )
}
```

**Test**: Refresh → Should see CheckoutActions component (no error displayed yet).

**✅ Step 5 Complete**: CheckoutActions is working!

### 16.6 Step 6: Update Checkout Page to Use All Components (With Mock Data)

Now let's connect all components together, but still using mock data. In real development, you'd build the UI first, then add persistence and API later.

**Update Checkout page** (use all components with mock data):

**src/pages/Checkout/Checkout.tsx**:

```typescript
import { Box, Typography, Container, Paper, Grid, alpha, useTheme } from '@mui/material'
import { useState } from 'react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'

import { BookingSummary } from './components/BookingSummary'
import { UserInfoForm, type UserInfoValues } from './components/UserInfoForm'
import { CheckoutActions } from './components/CheckoutActions'
import { useTranslation } from 'react-i18next'

export default function Checkout() {
  const { t } = useTranslation()
  const theme = useTheme()
  const [uiError, setUiError] = useState<string | null>(null)

  // Mock context for now - we'll replace this with real data in later steps
  const mockCtx = {
    hotelName: 'Sample Hotel',
    roomType: 'Deluxe Room',
    roomNumber: '101',
    pricePerNight: 100,
    checkInDate: '2024-01-01',
    checkOutDate: '2024-01-03',
  }

  const handleSubmit = async (values: UserInfoValues) => {
    setUiError(null)
    console.log('Form submitted:', values)
    // We'll add API call in later step
  }

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 200px)',
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
        py: { xs: 3, sm: 4, md: 5 },
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ mb: { xs: 3, sm: 4 } }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              mb: 1,
            }}
          >
            <Box
              sx={{
                p: 1.5,
                borderRadius: 2,
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.main} 100%)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ShoppingCartIcon sx={{ color: 'white', fontSize: 28 }} />
            </Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                fontSize: { xs: '1.75rem', sm: '2.25rem' },
              }}
            >
              {t('checkout.title', 'Checkout')}
            </Typography>
          </Box>
          <Typography variant="body1" color="text.secondary" sx={{ ml: 7 }}>
            {t('checkout.subtitle', 'Complete your booking details')}
          </Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 5 }}>
            <BookingSummary ctx={mockCtx} />
          </Grid>

          <Grid size={{ xs: 12, md: 7 }}>
            <Paper elevation={3} sx={{ p: { xs: 3, sm: 4 }, borderRadius: 3 }}>
              <UserInfoForm
                initialValues={{ customerName: '', paymentMethod: '', specialRequests: '' }}
                onSubmit={handleSubmit}
                submitting={false}
              />
              <CheckoutActions error={uiError} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
```

**Add ONLY checkout page translations** (incremental - only add these 2 keys):

**Update `src/i18n/locales/en.json`** (add ONLY these 2 keys):

```json
{
  "checkout": {
    // ... existing keys from previous steps ...
    "title": "Checkout", // ← NEW: Add only this
    "subtitle": "Complete your booking details" // ← NEW: Add only this
  }
}
```

**Update `src/i18n/locales/ar.json`** (add ONLY these 2 keys):

```json
{
  "checkout": {
    // ... existing keys from previous steps ...
    "title": "الدفع", // ← NEW: Add only this
    "subtitle": "أكمل تفاصيل حجزك" // ← NEW: Add only this
  }
}
```

> **📝 Note**: You're adding ONLY 2 new translation keys for the Checkout page header. Don't add all checkout translations at once!

**Test**: Navigate to `/checkout` → Should see full checkout page with all components working (but with mock data).

**✅ Step 6 Complete**: Checkout page is displaying all components with mock data!

### 16.7 Step 7: Add CheckoutStorage Utils and CheckoutContext Type (When Checkout Needs to Load Context)

Now that the UI is working, we need to load checkout context when users navigate from HotelRooms. Let's add storage utils and type:

**Add CheckoutContext type** (when storage needs it):

**src/pages/Checkout/types.ts**:

```typescript
export type CheckoutContext = {
  hotelId: number
  hotelName: string
  roomId: number
  roomNumber: string
  roomType: string
  cityName?: string
  pricePerNight: number
  checkInDate: string
  checkOutDate: string
  userId: number
}
```

**Create checkoutStorage utils**:

**src/pages/Checkout/utils/checkoutStorage.ts**:

```typescript
import type { CheckoutContext } from '../types'

const KEY = 'voya.checkout.context'

export const saveCheckoutContext = (ctx: CheckoutContext) => {
  sessionStorage.setItem(KEY, JSON.stringify(ctx))
}

export const loadCheckoutContext = (): CheckoutContext | null => {
  const raw = sessionStorage.getItem(KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as CheckoutContext
  } catch {
    return null
  }
}
```

**Update Checkout page to use storage** (load context from navigation or storage):

**src/pages/Checkout/Checkout.tsx** (update to load context):

```typescript
import { Box, Typography, Container, Paper, Grid, alpha, useTheme } from '@mui/material'
import { useLocation } from 'react-router-dom'
import { useMemo, useState } from 'react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'

import type { CheckoutContext } from './types'
import { BookingSummary } from './components/BookingSummary'
import { UserInfoForm, type UserInfoValues } from './components/UserInfoForm'
import { CheckoutActions } from './components/CheckoutActions'
import { loadCheckoutContext, saveCheckoutContext } from './utils/checkoutStorage'
import { useTranslation } from 'react-i18next'

type LocationState = { checkout?: CheckoutContext }

export default function Checkout() {
  const { t } = useTranslation()
  const theme = useTheme()
  const location = useLocation()
  const [uiError, setUiError] = useState<string | null>(null)

  const ctx = useMemo<CheckoutContext | null>(() => {
    const state = (location.state as LocationState | null)?.checkout
    if (state) {
      saveCheckoutContext(state)
      return state
    }
    return loadCheckoutContext()
  }, [location.state])

  if (!ctx) {
    return <Typography variant="h6">{t('checkout.missingData', 'Missing checkout data')}</Typography>
  }

  const handleSubmit = async (values: UserInfoValues) => {
    setUiError(null)
    console.log('Form submitted:', values)
    // We'll add API call in next step
  }

  return (
    // ... existing JSX (same as Step 6, but use ctx instead of mockCtx) ...
    <BookingSummary ctx={ctx} />
    // ... rest of JSX ...
  )
}
```

**Add ONLY missing data translation** (incremental - only add this 1 key):

**Update `src/i18n/locales/en.json`** (add ONLY this 1 key):

```json
{
  "checkout": {
    // ... existing keys from previous steps ...
    "missingData": "Missing checkout data" // ← NEW: Add only this
  }
}
```

**Update `src/i18n/locales/ar.json`** (add ONLY this 1 key):

```json
{
  "checkout": {
    // ... existing keys from previous steps ...
    "missingData": "بيانات الدفع مفقودة" // ← NEW: Add only this
  }
}
```

> **📝 Note**: You're adding ONLY 1 new translation key (`missingData`) for the error state. Don't add all checkout translations at once!

**Test**: Navigate from HotelRooms "Book Now" button → Should load checkout context and display real data.

**✅ Step 7 Complete**: Checkout page is loading context from navigation/storage!

### 16.8 Step 8: Add Checkout API Endpoint (createBooking - When Checkout Needs to Submit)

Now let's add the API endpoint for creating bookings:

**Create checkout API**:

**src/api/checkout/index.ts**:

```typescript
import { baseApi } from '../baseApi'

export type BookingRequest = {
  customerName: string
  hotelName: string
  roomNumber: string
  roomType: string
  bookingDateTime: string
  totalCost: number
  paymentMethod: string
  specialRequests?: string
}

export type BookingDetailsDto = {
  customerName: string | null
  hotelName: string | null
  roomNumber: string | null
  roomType: string | null
  bookingDateTime: string
  totalCost: number
  paymentMethod: string | null
  bookingStatus: string | null
  confirmationNumber: string | null
}

type CreateBookingResponse =
  | BookingDetailsDto
  | { bookingId?: number; id?: number; [key: string]: unknown }

export const checkoutApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBooking: builder.mutation<BookingDetailsDto, BookingRequest>({
      query: (body) => ({
        url: '/bookings',
        method: 'POST',
        body,
      }),
      transformResponse: (res: CreateBookingResponse): BookingDetailsDto => {
        if (typeof res === 'object' && res !== null) {
          return {
            customerName: 'customerName' in res ? (res.customerName as string | null) : null,
            hotelName: 'hotelName' in res ? (res.hotelName as string | null) : null,
            roomNumber: 'roomNumber' in res ? (res.roomNumber as string | null) : null,
            roomType: 'roomType' in res ? (res.roomType as string | null) : null,
            bookingDateTime:
              'bookingDateTime' in res ? (res.bookingDateTime as string) : new Date().toISOString(),
            totalCost: 'totalCost' in res ? (res.totalCost as number) : 0,
            paymentMethod: 'paymentMethod' in res ? (res.paymentMethod as string | null) : null,
            bookingStatus:
              'bookingStatus' in res ? (res.bookingStatus as string | null) : 'Confirmed',
            confirmationNumber:
              'confirmationNumber' in res ? (res.confirmationNumber as string | null) : null,
          }
        }
        throw new Error('Invalid booking response shape')
      },
    }),
  }),
})

export const { useCreateBookingMutation } = checkoutApi
```

**Add types to models** (incremental):

**Update `src/types/models.ts`** (add only these types):

```typescript
// ... existing types ...

export interface BookingRequest {
  customerName: string
  hotelName: string
  roomNumber: string
  roomType: string
  bookingDateTime: string
  totalCost: number
  paymentMethod: string
  specialRequests?: string
}

export interface BookingDetailsDto {
  customerName: string | null
  hotelName: string | null
  roomNumber: string | null
  roomType: string | null
  bookingDateTime: string
  totalCost: number
  paymentMethod: string | null
  bookingStatus: string | null
  confirmationNumber: string | null
}
```

**Test**: The API endpoint is ready. We'll use it in the next step.

**✅ Step 8 Complete**: Checkout API endpoint is ready!

### 16.9 Step 9: Update Checkout Page to Use API (Replace Mock Submit with Real API)

Now let's connect everything together:

**Update Checkout page** (use API and all components):

**src/pages/Checkout/Checkout.tsx**:

```typescript
import { Box, Typography, Container, Paper, Grid, alpha, useTheme } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import { useMemo, useState } from 'react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'

import type { CheckoutContext } from './types'
import { BookingSummary } from './components/BookingSummary'
import { UserInfoForm, type UserInfoValues } from './components/UserInfoForm'
import { CheckoutActions } from './components/CheckoutActions'
import { calculateTotalCost } from './utils/price'
import { loadCheckoutContext, saveCheckoutContext } from './utils/checkoutStorage'
import { useCreateBookingMutation } from '@/api/checkout'
import { useNotification } from '@/hooks'
import { useTranslation } from 'react-i18next'

type LocationState = { checkout?: CheckoutContext }

export default function Checkout() {
  const { t } = useTranslation()
  const theme = useTheme()
  const location = useLocation()
  const navigate = useNavigate()
  const [uiError, setUiError] = useState<string | null>(null)

  const [createBooking, { isLoading }] = useCreateBookingMutation()
  const { showSuccess, showError } = useNotification()

  const ctx = useMemo<CheckoutContext | null>(() => {
    const state = (location.state as LocationState | null)?.checkout
    if (state) {
      saveCheckoutContext(state)
      return state
    }
    return loadCheckoutContext()
  }, [location.state])

  if (!ctx) {
    return <Typography variant="h6">{t('checkout.missingData', 'Missing checkout data')}</Typography>
  }

  const handleSubmit = async (values: UserInfoValues) => {
    setUiError(null)

    try {
      const totalCost = calculateTotalCost(ctx.pricePerNight, ctx.checkInDate, ctx.checkOutDate)

      const bookingDetails = await createBooking({
        customerName: values.customerName,
        hotelName: ctx.hotelName,
        roomNumber: ctx.roomNumber,
        roomType: ctx.roomType,
        bookingDateTime: new Date().toISOString(),
        totalCost,
        paymentMethod: values.paymentMethod,
        specialRequests: values.specialRequests || undefined,
      }).unwrap()

      showSuccess(t('checkout.bookingConfirmed', 'Booking confirmed!'))
      void navigate('/checkout/confirmation', {
        replace: true,
        state: { booking: bookingDetails },
      })
    } catch (error) {
      console.error('Booking failed:', error)
      showError(t('checkout.bookingFailed', 'Booking failed. Please try again.'))
    }
  }

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 200px)',
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
        py: { xs: 3, sm: 4, md: 5 },
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ mb: { xs: 3, sm: 4 } }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              mb: 1,
            }}
          >
            <Box
              sx={{
                p: 1.5,
                borderRadius: 2,
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.main} 100%)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ShoppingCartIcon sx={{ color: 'white', fontSize: 28 }} />
            </Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                fontSize: { xs: '1.75rem', sm: '2.25rem' },
              }}
            >
              {t('checkout.title', 'Checkout')}
            </Typography>
          </Box>
          <Typography variant="body1" color="text.secondary" sx={{ ml: 7 }}>
            {t('checkout.subtitle', 'Complete your booking details')}
          </Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 5 }}>
            <BookingSummary ctx={ctx} />
          </Grid>

          <Grid size={{ xs: 12, md: 7 }}>
            <Paper elevation={3} sx={{ p: { xs: 3, sm: 4 }, borderRadius: 3 }}>
              <UserInfoForm
                initialValues={{ customerName: '', paymentMethod: '', specialRequests: '' }}
                onSubmit={handleSubmit}
                submitting={isLoading}
              />
              <CheckoutActions error={uiError} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
```

**Add ONLY checkout page translations** (incremental - only add these 4 keys):

**Update `src/i18n/locales/en.json`** (add ONLY these 4 keys):

```json
{
  "checkout": {
    // ... existing keys from previous steps ...
    "title": "Checkout", // ← NEW: Add only this
    "subtitle": "Complete your booking details", // ← NEW: Add only this
    "missingData": "Missing checkout data", // ← NEW: Add only this
    "bookingConfirmed": "Booking confirmed!", // ← NEW: Add only this
    "bookingFailed": "Booking failed. Please try again." // ← NEW: Add only this
  }
}
```

**Update `src/i18n/locales/ar.json`** (add ONLY these 4 keys):

```json
{
  "checkout": {
    // ... existing keys from previous steps ...
    "title": "الدفع", // ← NEW: Add only this
    "subtitle": "أكمل تفاصيل حجزك", // ← NEW: Add only this
    "missingData": "بيانات الدفع مفقودة", // ← NEW: Add only this
    "bookingConfirmed": "تم تأكيد الحجز!", // ← NEW: Add only this
    "bookingFailed": "فشل الحجز. يرجى المحاولة مرة أخرى." // ← NEW: Add only this
  }
}
```

> **📝 Note**: You're adding ONLY 5 new translation keys for the Checkout page. Don't add all checkout translations at once!

**Test**: Navigate to `/checkout` → Should see full checkout page with booking summary and form. Submit form → Should create booking and navigate to confirmation.

**✅ Step 9 Complete**: Checkout page is fully functional!

### 16.10 Step 10: Build Confirmation Page

Now let's build the confirmation page that shows after booking:

**Create minimal Confirmation page**:

**src/pages/Checkout/Confirmation/Confirmation.tsx**:

```typescript
import { Container, Typography } from '@mui/material'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

type LocationState = { booking?: { confirmationNumber?: string | null } }

export default function Confirmation() {
  const { t } = useTranslation()
  const location = useLocation()
  const booking = (location.state as LocationState | null)?.booking

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4">{t('confirmation.title', 'Booking Confirmed')}</Typography>
      {booking?.confirmationNumber && (
        <Typography variant="body1">
          {t('confirmation.confirmationNumber', 'Confirmation Number')}: {booking.confirmationNumber}
        </Typography>
      )}
    </Container>
  )
}
```

**src/pages/Checkout/Confirmation/index.ts**:

```typescript
export { default } from './Confirmation'
```

**Add Confirmation route**:

**Update `src/routes/routes.tsx`**:

```typescript
// ... existing imports ...
import Confirmation from '@/pages/Checkout/Confirmation'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      // ... existing routes ...
      { path: 'checkout', element: <Checkout /> },
      { path: 'checkout/confirmation', element: <Confirmation /> },
      // ... rest of routes ...
    ],
  },
])
```

**Add ONLY confirmation translations** (incremental - only add these 2 keys):

**Update `src/i18n/locales/en.json`** (add ONLY these 2 keys):

```json
{
  "confirmation": {
    "title": "Booking Confirmed", // ← NEW: Add only this
    "confirmationNumber": "Confirmation Number" // ← NEW: Add only this
  }
}
```

**Update `src/i18n/locales/ar.json`** (add ONLY these 2 keys):

```json
{
  "confirmation": {
    "title": "تم تأكيد الحجز", // ← NEW: Add only this
    "confirmationNumber": "رقم التأكيد" // ← NEW: Add only this
  }
}
```

> **📝 Note**: You're adding ONLY 2 new translation keys for the Confirmation page. Don't add all confirmation translations at once!

**Test**: Complete a booking → Should navigate to confirmation page.

**Now add getBookingById API endpoint** (when confirmation needs to load booking by ID):

**Update checkout API** (add getBookingById endpoint):

**src/api/checkout/index.ts** (add to existing file):

```typescript
// ... existing code ...

export const checkoutApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ... existing createBooking endpoint ...
    getBookingById: builder.query<BookingDetailsDto, number>({
      query: (bookingId) => `/bookings/${bookingId}`,
    }),
  }),
})

export const { useCreateBookingMutation, useGetBookingByIdQuery } = checkoutApi
```

**Enhance Confirmation page to use API and display full booking details**:

**src/pages/Checkout/Confirmation/Confirmation.tsx**:

```typescript
import {
  Card,
  CardContent,
  Stack,
  Typography,
  Box,
  Button,
  Chip,
  Divider,
  Paper,
  Container,
} from '@mui/material'
import { useParams, useLocation } from 'react-router-dom'
import { useGetBookingByIdQuery, type BookingDetailsDto } from '@/api/checkout'
import { useTranslation } from 'react-i18next'
import { VoyaLoader } from '@/components/common/VoyaLoader'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { useNavigate } from 'react-router-dom'

type LocationState = { booking?: BookingDetailsDto }

export default function Confirmation() {
  const { t } = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()
  const { bookingId } = useParams()

  const bookingFromState = (location.state as LocationState | null)?.booking
  const id = bookingId ? Number(bookingId) : null

  const {
    data: bookingFromApi,
    isLoading,
    isError,
  } = useGetBookingByIdQuery(id!, {
    skip: !id || !Number.isFinite(id),
  })

  const data = bookingFromState || bookingFromApi

  if (isLoading && !bookingFromState) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 'calc(100vh - 200px)',
        }}
      >
        <VoyaLoader size="medium" />
      </Box>
    )
  }

  if ((isError || !data) && !bookingFromState) {
    return <Typography variant="h6">{t('confirmation.failedToLoadBooking', 'Failed to load booking')}</Typography>
  }

  if (!data) {
    return <Typography variant="h6">{t('confirmation.failedToLoadBooking')}</Typography>
  }

  return (
    <Container maxWidth="md" sx={{ py: { xs: 3, sm: 4 } }}>
      <Paper elevation={3} sx={{ p: { xs: 3, sm: 4 }, borderRadius: 3, textAlign: 'center', mb: 3 }}>
        <CheckCircleIcon sx={{ fontSize: 60, color: 'success.main', mb: 2 }} />
        <Typography variant="h4" gutterBottom>
          {t('confirmation.title')}
        </Typography>
        {data.confirmationNumber && (
          <Typography variant="h6" color="primary">
            {t('confirmation.confirmationNumber')}: {data.confirmationNumber}
          </Typography>
        )}
      </Paper>

      <Card>
        <CardContent>
          <Stack spacing={2}>
            <Box>
              <Typography variant="body2" color="text.secondary">
                {t('confirmation.customerName', 'Customer Name')}
              </Typography>
              <Typography variant="body1">{data.customerName}</Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">
                {t('confirmation.hotelName', 'Hotel')}
              </Typography>
              <Typography variant="body1">{data.hotelName}</Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">
                {t('confirmation.room', 'Room')}
              </Typography>
              <Typography variant="body1">
                {data.roomType} - #{data.roomNumber}
              </Typography>
            </Box>
            <Divider />
            <Box>
              <Typography variant="body2" color="text.secondary">
                {t('confirmation.totalCost', 'Total Cost')}
              </Typography>
              <Typography variant="h6" color="primary">
                ${data.totalCost}
              </Typography>
            </Box>
            <Button variant="contained" fullWidth onClick={() => navigate('/home')}>
              {t('confirmation.backToHome', 'Back to Home')}
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  )
}
```

**Add ONLY additional confirmation translations** (incremental - only add these 5 keys):

**Update `src/i18n/locales/en.json`** (add ONLY these 5 keys):

```json
{
  "confirmation": {
    "title": "Booking Confirmed",
    "confirmationNumber": "Confirmation Number",
    "failedToLoadBooking": "Failed to load booking", // ← NEW: Add only this
    "customerName": "Customer Name", // ← NEW: Add only this
    "hotelName": "Hotel", // ← NEW: Add only this
    "room": "Room", // ← NEW: Add only this
    "totalCost": "Total Cost", // ← NEW: Add only this
    "backToHome": "Back to Home" // ← NEW: Add only this
  }
}
```

**Update `src/i18n/locales/ar.json`** (add ONLY these 5 keys):

```json
{
  "confirmation": {
    "title": "تم تأكيد الحجز",
    "confirmationNumber": "رقم التأكيد",
    "failedToLoadBooking": "فشل تحميل الحجز", // ← NEW: Add only this
    "customerName": "اسم العميل", // ← NEW: Add only this
    "hotelName": "الفندق", // ← NEW: Add only this
    "room": "الغرفة", // ← NEW: Add only this
    "totalCost": "التكلفة الإجمالية", // ← NEW: Add only this
    "backToHome": "العودة إلى الصفحة الرئيسية" // ← NEW: Add only this
  }
}
```

> **📝 Note**: You're adding ONLY 6 more translation keys for the enhanced Confirmation page. Don't add all confirmation translations at once!

**Test**: Complete a booking → Should see full confirmation page with booking details.

**✅ Step 10 Complete**: Confirmation page is working with API and translations!

### 16.11 Step 11: Test the Complete Checkout Flow

**Verification Checklist**:

1. ✅ **Navigate to `/checkout`**: Should see checkout page (or "Missing checkout data" if no context)
2. ✅ **Check BookingSummary**: Should display hotel, room, dates, and calculated total
3. ✅ **Check UserInfoForm**: Should display form with validation
4. ✅ **Test form validation**: Try submitting empty form → Should show errors
5. ✅ **Test booking submission**: Fill form and submit → Should create booking
6. ✅ **Check navigation**: After booking → Should navigate to confirmation page
7. ✅ **Check confirmation page**: Should display booking details
8. ✅ **Test error states**: Try invalid booking ID → Should show error message
9. ✅ **Test loading states**: Should show loaders while fetching data

**Common Issues**:

- **Missing checkout data**: Check that checkout context is passed from HotelRooms component
- **API errors**: Check backend is running and endpoints are correct
- **Validation errors**: Check Yup schema is correct
- **TypeScript errors**: Check all types are added to `types/models.ts`

---

## ✅ Feature 5 Complete: Checkout Flow

You've built the Checkout Flow **incrementally**:

- ✅ Created minimal Checkout page
- ✅ Added BookingSummary → Added translations → Added price utils → Tested
- ✅ Added UserInfoForm → Added translations → Added validation schema → Tested
- ✅ Added CheckoutActions → Tested
- ✅ Updated Checkout page to use all components (with mock data)
- ✅ Added checkoutStorage utils and CheckoutContext type (when Checkout needed to load context)
- ✅ Added checkout API (createBooking) → Added types → Tested
- ✅ Updated Checkout page to use storage and API (replaced mock data with real data)
- ✅ Built Confirmation page → Added API (getBookingById) → Added translations → Tested

**Key Learning**: Each component was built, tested, and had its translations/types/utils added **only when needed**. This is realistic development!

**Next**: Move to [Feature 6: Admin Dashboard](#17-feature-6-admin-dashboard)

---
