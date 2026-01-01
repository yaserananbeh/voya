# Exact Implementation Reference

> **Critical Reference**: This document provides **exact specifications** from the original Voya implementation. Use this when you need precise details that ensure identical results.

**Navigation**: [← Back to Index](00-README.md)

---

## 🔴 CRITICAL: API Response Formats

### Login API Response

**Endpoint**: `POST /auth/authenticate`

**Request Body**:

```json
{
  "userName": "string",
  "password": "string"
}
```

**Response Format** (EXACT):

```json
{
  "authentication": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "userType": "Admin" | "User"
}
```

**Critical Details**:

- Field name is `authentication` (NOT `token`)
- Field name is `userName` (NOT `username`) - camelCase with capital N
- `userType` values are **case-sensitive**: `"Admin"` (capital A) or `"User"` (capital U)
- No other fields are returned

**TypeScript Type**:

```typescript
type LoginResponse = {
  authentication: string
  userType: 'Admin' | 'User'
}
```

---

## 🔴 CRITICAL: Authentication Flow

### Exact Authentication Check Method

**In HotelRooms component** (booking flow), use **localStorage directly**:

```typescript
const token = localStorage.getItem('token')
if (!token) {
  // Not authenticated - redirect to login
}
```

**Why localStorage?** Because Redux state might not be initialized yet when component first renders.

**In other components**, use Redux selector:

```typescript
const isAuthenticated = useAppSelector(selectIsAuthenticated)
```

**The `selectIsAuthenticated` selector**:

```typescript
export const selectIsAuthenticated = (state: RootStatePartial): boolean =>
  Boolean(state?.auth?.token)
```

It checks if `state.auth.token` exists (truthy check).

---

## 🔴 CRITICAL: Admin Login Redirect - EXACT CODE

**Location**: `src/pages/Login/Login.tsx` (or LoginForm component)

**EXACT Implementation**:

```typescript
const formik = useFormik({
  initialValues: { userName: '', password: '' },
  validationSchema,
  onSubmit: async (values) => {
    try {
      const result = await login(values).unwrap()

      // Store in localStorage FIRST
      localStorage.setItem('token', result.authentication)
      localStorage.setItem('userType', result.userType)

      // Update Redux state
      dispatch(
        setCredentials({
          token: result.authentication,
          userType: result.userType,
        }),
      )

      showSuccess(t('auth.loginSuccess'))

      // EXACT redirect logic - case-sensitive check
      if (result.userType === 'Admin') {
        await navigate(from || '/admin/dashboard', { replace: true })
      } else {
        await navigate(from || '/home', { replace: true })
      }
    } catch (error) {
      console.error('Login failed:', error)
      showError(t('auth.loginFailed'))
    }
  },
})
```

**Critical Points**:

1. Check is **case-sensitive**: `result.userType === 'Admin'` (capital A)
2. Use `await navigate()` to ensure navigation completes
3. Store in localStorage BEFORE updating Redux
4. `from` is the original destination (from `location.state.from.pathname`)

**Verification Steps**:

1. Login as Admin user
2. Check browser console - should see no errors
3. Check localStorage - should have `token` and `userType: "Admin"`
4. Should redirect to `/admin/dashboard` (not `/home`)

---

## 🔴 CRITICAL: Booking Flow Authentication - EXACT CODE

**Location**: `src/pages/Hotel/components/HotelRooms.tsx`

**EXACT Implementation**:

```typescript
export function HotelRooms({ hotelId, hotelName, cityName, rooms }: Props) {
  const navigate = useNavigate()
  const searchParams = useAppSelector(selectSearchParams)
  const { showWarning } = useNotification()

  const handleBook = (room: HotelRoomDto) => {
    // Step 1: Check if dates are selected
    if (!searchParams.checkInDate || !searchParams.checkOutDate) {
      showWarning(t('hotel.pleaseSelectDates'))
      return
    }

    // Step 2: Create checkout context
    const ctx: CheckoutContext = {
      hotelId,
      hotelName,
      roomId: room.roomId,
      roomNumber: String(room.roomNumber),
      roomType: room.roomType,
      cityName: cityName ?? undefined,
      pricePerNight: room.price,
      checkInDate: searchParams.checkInDate,
      checkOutDate: searchParams.checkOutDate,
      userId: 1, // Will be replaced with actual user ID later
    }

    // Step 3: Check authentication using localStorage (NOT Redux)
    const token = localStorage.getItem('token')
    if (!token) {
      // Step 4: Save context to sessionStorage
      saveCheckoutContext(ctx)

      // Step 5: Redirect to login with return path
      void navigate('/login', { state: { from: { pathname: '/checkout' } } })
      return
    }

    // Step 6: If authenticated, save context and navigate to checkout
    saveCheckoutContext(ctx)
    void navigate('/checkout', { state: { checkout: ctx } })
  }

  // ... rest of component
}
```

**Critical Points**:

1. Use `localStorage.getItem('token')` - NOT Redux selector
2. Save context BEFORE redirecting
3. Pass `from` state to login: `{ from: { pathname: '/checkout' } }`
4. After login, Checkout page automatically loads context from sessionStorage

**Complete Flow**:

1. User clicks "Book Now"
2. Check dates → If missing, show warning
3. Create checkout context
4. Check `localStorage.getItem('token')`
5. If no token:
   - Save context to sessionStorage
   - Navigate to `/login` with `from: { pathname: '/checkout' }`
6. After login:
   - Login redirects to `/checkout` (from `from` state)
   - Checkout page loads context from sessionStorage (via `loadCheckoutContext()`)

**Verification Steps**:

1. Logout (clear token)
2. Go to hotel page, click "Book Now"
3. Should redirect to login (not checkout)
4. Login
5. Should redirect to checkout with context loaded

---

## 🎨 EXACT Design Specifications

### Navbar/Header - EXACT Specifications

**Component**: `src/components/layout/MainHeader.tsx`

**EXACT Styling**:

```typescript
<AppBar
  position="sticky"
  color="default"
  elevation={1}
>
  <Toolbar>
    {/* Logo */}
    <Box
      component={RouterLink}
      to="/home"
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1, // 8px
        textDecoration: 'none',
        flexGrow: 1,
      }}
    >
      <FlightTakeoffIcon
        sx={{
          color: 'primary.main', // #003580
          fontSize: { xs: 24, sm: 32 }, // 24px mobile, 32px desktop
        }}
      />
      <Box
        component="span"
        sx={{
          fontSize: { xs: '1.25rem', sm: '1.5rem' }, // 20px mobile, 24px desktop
          fontWeight: 700,
          background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        Voya
      </Box>
    </Box>

    {/* Desktop Navigation */}
    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
      <LanguageSwitcher />
      <ThemeToggle />
      <Button component={RouterLink} to="/home" color="primary">
        {t('common.home')}
      </Button>
      <Button component={RouterLink} to="/search" color="primary">
        {t('common.search')}
      </Button>
      <LogoutBtn />
    </Box>

    {/* Mobile Menu */}
    {isMobile && (
      <>
        <LanguageSwitcher />
        <ThemeToggle />
        <IconButton color="primary" onClick={handleMenuOpen}>
          <MenuIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          {/* Menu items */}
        </Menu>
      </>
    )}
  </Toolbar>
</AppBar>
```

**Exact Values**:

- Background: `color="default"` (white/theme default)
- Elevation: `1` (subtle shadow)
- Logo icon: `24px` mobile, `32px` desktop
- Logo text: `20px` mobile, `24px` desktop
- Logo gradient: `linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)`
- Breakpoint: Mobile menu at `sm` (600px) and below
- Button color: `color="primary"` (#003580)

---

### Hero Section - EXACT Specifications

**Component**: `src/pages/Home/components/HeroSection.tsx`

**EXACT Styling**:

```typescript
<Box
  sx={{
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 3, // 24px
    p: { xs: 4, md: 6 }, // 32px mobile, 48px desktop
    mb: 4, // 32px
    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.06), // 6% opacity primary
  }}
>
  {/* Background overlay */}
  <Box
    sx={{
      position: 'absolute',
      inset: 0,
      background:
        'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.35), transparent 35%), radial-gradient(circle at 80% 0%, rgba(255,255,255,0.3), transparent 30%), radial-gradient(circle at 40% 80%, rgba(255,255,255,0.25), transparent 35%)',
      pointerEvents: 'none',
    }}
  />

  <Stack spacing={3}>
    {/* Chip */}
    <Chip
      icon={<FlightTakeoffIcon />}
      label={t('home.heroChip')}
      color="primary"
      variant="outlined"
      sx={{ alignSelf: 'flex-start', fontWeight: 600 }}
    />

    {/* Title */}
    <Typography
      variant="h3"
      fontWeight={700}
      lineHeight={1.1}
      sx={{
        fontSize: { xs: '1.75rem', sm: '2.125rem', md: '3rem' },
      }}
    >
      {t('home.heroTitle')}
    </Typography>

    {/* Subtitle */}
    <Typography
      variant="h6"
      color="text.secondary"
      sx={{
        maxWidth: { xs: '100%', sm: '640px' },
        fontSize: { xs: '1rem', sm: '1.25rem' },
      }}
    >
      {t('home.heroSubtitle')}
    </Typography>

    {/* Buttons */}
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
      <Button variant="contained" size="large" component={RouterLink} to="/search">
        {t('home.startExploring')}
      </Button>
      <Button variant="text" size="large" onClick={scrollToFeatured}>
        {t('home.viewFeaturedDeals')}
      </Button>
    </Stack>
  </Stack>
</Box>
```

**Exact Values**:

- Background: `alpha(primary.main, 0.06)` - 6% opacity primary color
- Border radius: `24px` (borderRadius: 3)
- Padding: `32px` mobile, `48px` desktop
- Margin bottom: `32px`
- Title font size: `28px` mobile, `34px` tablet, `48px` desktop
- Subtitle font size: `16px` mobile, `20px` desktop
- Background overlay: Radial gradients with white at 35%, 30%, 25% opacity

---

### Search Bar - EXACT Specifications

**Component**: `src/pages/Home/components/HomeSearchBar.tsx`

**EXACT Styling**:

```typescript
<Paper
  elevation={3}
  sx={{
    p: 2, // 16px padding
    display: 'flex',
    flexDirection: { xs: 'column', md: 'row' },
    gap: 2, // 16px gap
    alignItems: 'center',
  }}
  component="form"
  onSubmit={formik.handleSubmit}
>
  {/* City Field */}
  <TextField
    name="city"
    label={t('home.whereGoing')}
    size="small"
    sx={{ flex: 2, minWidth: 180 }}
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <SearchIcon />
        </InputAdornment>
      ),
    }}
  />

  {/* Check-in Date */}
  <TextField
    name="checkInDate"
    label={t('home.checkIn')}
    type="date"
    size="small"
    InputLabelProps={{ shrink: true }}
    sx={{ flex: 1, minWidth: 150 }}
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <CalendarMonthIcon />
        </InputAdornment>
      ),
    }}
  />

  {/* Check-out Date */}
  <TextField
    name="checkOutDate"
    label={t('home.checkOut')}
    type="date"
    size="small"
    InputLabelProps={{ shrink: true }}
    sx={{ flex: 1, minWidth: 150 }}
  />

  {/* Guest/Room Selector */}
  <GuestRoomSelector {...props} />

  {/* Search Button */}
  <Box sx={{ flexShrink: 0 }}>
    <Button
      type="submit"
      variant="contained"
      color="primary"
      size="large"
      startIcon={<SearchIcon />}
    >
      {t('common.search')}
    </Button>
  </Box>
</Paper>
```

**Exact Values**:

- Elevation: `3` (Paper component)
- Padding: `16px` (p: 2)
- Gap: `16px` (gap: 2)
- City field: `flex: 2` (takes 2x space)
- Date fields: `flex: 1` each (equal space)
- Min widths: City `180px`, Dates `150px`
- Field size: `small`
- Icons: SearchIcon for city, CalendarMonthIcon for dates

---

### Footer - EXACT Specifications

**Component**: `src/components/layout/MainFooter.tsx`

**EXACT Styling**:

```typescript
<Box
  component="footer"
  sx={{
    mt: 8, // 64px top margin
    py: 5, // 40px vertical padding
    bgcolor: 'grey.900', // Dark background
    color: 'grey.100', // Light text
  }}
>
  <Container maxWidth="lg">
    <Stack spacing={4}>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={4}
        divider={
          <Divider
            orientation="vertical"
            flexItem
            sx={{ borderColor: 'grey.700' }}
          />
        }
      >
        {/* Company Info */}
        <Box sx={{ flex: 1 }}>
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
            <FlightTakeoffIcon sx={{ fontSize: 32, color: 'primary.main' }} />
            <Typography
              variant="h5"
              fontWeight={700}
              sx={{
                background: 'linear-gradient(135deg, #42a5f5 0%, #90caf9 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Voya
            </Typography>
          </Stack>
          <Typography variant="body2" color="grey.400" sx={{ mb: 2 }}>
            {t('footer.tagline')}
          </Typography>
          {/* Quick links buttons */}
        </Box>

        {/* Quick Links */}
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
            {t('footer.quickLinks')}
          </Typography>
          <Stack spacing={1}>
            <Link component={RouterLink} to="/home" color="inherit" underline="hover">
              {t('footer.browseHotels')}
            </Link>
            {/* More links */}
          </Stack>
        </Box>

        {/* Contact Info */}
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
            {t('footer.contactUs')}
          </Typography>
          <Stack spacing={1.5}>
            <Stack direction="row" spacing={1} alignItems="center">
              <EmailIcon fontSize="small" />
              <Typography variant="body2" color="grey.400">
                support@voya.com
              </Typography>
            </Stack>
            {/* More contact info */}
          </Stack>
        </Box>
      </Stack>

      <Divider sx={{ borderColor: 'grey.700' }} />

      {/* Copyright */}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="body2" color="grey.400">
          © {new Date().getFullYear()} Voya. {t('footer.copyright')}
        </Typography>
        {/* Privacy/Terms links */}
      </Stack>
    </Stack>
  </Container>
</Box>
```

**Exact Values**:

- Background: `grey.900` (dark)
- Text color: `grey.100` (light)
- Top margin: `64px` (mt: 8)
- Vertical padding: `40px` (py: 5)
- Logo icon: `32px`
- Logo gradient: `linear-gradient(135deg, #42a5f5 0%, #90caf9 100%)`
- Divider color: `grey.700`
- Section spacing: `32px` (spacing: 4)
- Link color: `inherit` (grey.100)
- Contact icons: `fontSize="small"`

---

## ✅ Verification Checklist

### Admin Login Redirect

- [ ] Login as Admin user
- [ ] Check browser console - no errors
- [ ] Check localStorage - has `token` and `userType: "Admin"`
- [ ] Redirects to `/admin/dashboard` (NOT `/home`)
- [ ] Can access admin routes

### Booking Flow Authentication

- [ ] Logout (clear token)
- [ ] Go to hotel page, click "Book Now"
- [ ] Redirects to login (NOT checkout)
- [ ] Login
- [ ] Redirects to checkout
- [ ] Checkout context is loaded (hotel, room, dates visible)

### Design Verification

- [ ] Navbar matches original (logo size, colors, layout)
- [ ] Hero section matches original (background, spacing, typography)
- [ ] Search bar matches original (layout, fields, button)
- [ ] Footer matches original (colors, layout, sections)

---

**Next**: Refer to this document when implementing features. Use exact values and code patterns shown here.
