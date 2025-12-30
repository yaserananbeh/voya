# Feature 1: Home Page

> **TRUE Incremental Development**: Build the Home page one component at a time, adding translations, types, and API as you go.

**Navigation**: [← Back to Index](00-README.md) | [← Previous: Voya-Specific Setup](02-Foundation-Voya-Specific.md) | [Next: Feature 2 →](04-Feature-02-Login-Auth.md)

---

## 12. Feature 1: Home Page

> **TRUE Incremental Development**: This is how you'd build the Home page in real life - one component at a time, adding translations and types as you go. **NOT all at once!**

### 🎯 The Incremental Development Pattern

**How Real Developers Build Features**:

1. **Create minimal component** (placeholder)
2. **Add route** → Test it works
3. **Build first section** (HeroSection):
   - Create component
   - Add ONLY the translations it needs
   - Test
4. **Build second section** (SearchBar):
   - Create component
   - Add ONLY the translations it needs
   - Add SearchSlice (because search needs state)
   - Test
5. **Build third section** (FeaturedDeals):
   - Create component (placeholder)
   - Add translation key for heading
   - Test
   - Add API endpoint (only featured deals)
   - Add type (only FeaturedDealDto)
   - Enhance component to use API
   - Add remaining translations (error messages, etc.)
   - Test
6. **Continue with next sections** (same pattern)

**Key Principle**: Each component is built, tested, and has its dependencies (translations, types, API) added **only when that component needs them**. You don't add all translations upfront - you add them as you build each component.

### Realistic Development Flow

In real development, you'd build the Home page like this:

1. ✅ **Create minimal Home page** (just a placeholder)
2. ✅ **Add route** - verify it works
3. ✅ **Build HeroSection** → Add ONLY hero translations → Test
4. ✅ **Build SearchBar** → Add ONLY search translations → Add SearchSlice → Test
5. ✅ **Build FeaturedDealsSection** → Add API → Add types → Add translations → Test
6. ✅ **Build RecentHotelsSection** → Add API → Add types → Add translations → Test
7. ✅ **Build TrendingDestinationsSection** → Add API → Add types → Add translations → Test
8. ✅ **Add MainLayout** (when Home page needs header/footer)
9. ✅ **Polish and test**

Each step is independent - you build a component, add what it needs (translations, types, API), test it, then move to the next.

### What We'll Build (Incrementally)

- ✅ Home page component (minimal → full)
- ✅ HeroSection (build → add translations → test)
- ✅ HomeSearchBar (build → add translations → add SearchSlice → test)
- ✅ FeaturedDealsSection (build → add API → add types → add translations → test)
- ✅ RecentHotelsSection (build → add API → add types → add translations → test)
- ✅ TrendingDestinationsSection (build → add API → add types → add translations → test)
- ✅ MainLayout (when needed)
- ✅ Layout components (MainHeader, MainFooter) - when needed
- ✅ Common components (VoyaLoader, SafeImage) - when sections need them

Let's start building incrementally!

---

> **⚠️ Reorganization Note**: The sections below (12.1-12.6) contain Providers setup which should be part of the Foundation (Section 11). However, to maintain continuity, we're keeping them here. In a fully reorganized version, these would be in "11. Providers Setup" and this section would start directly with Home Page feature development.

---

### 12.1 Expand Theme for ThemeContext (Minimal Expansion)

> **Note**: This theme expansion is needed for Providers. In the ideal reorganization, this would be in Section 11 (Foundation), but we're keeping it here for now.

**Step 1**: Expand theme to support dark mode

Now that we're creating ThemeContext to manage theme mode (light/dark), we need to expand the theme to support both modes. We'll start with a minimal expansion - just enough for ThemeContext to work. We'll add custom variants and component overrides incrementally as we build components that need them.

```bash
# Update theme to support light/dark modes (minimal expansion)
cat > src/theme/index.ts << 'EOF'
import {
  createTheme,
  responsiveFontSizes,
  type ThemeOptions,
} from '@mui/material/styles'

const getThemeOptions = (
  mode: 'light' | 'dark',
  direction: 'ltr' | 'rtl' = 'ltr',
): ThemeOptions => ({
  direction,
  palette: {
    mode,
    primary: {
      main: '#003580',
      light: '#3366a6',
      dark: '#00224f',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#F9BC02',
      dark: '#c89600',
      contrastText: '#000000',
    },
    success: {
      main: '#00800D',
      dark: '#005c0a',
      contrastText: '#ffffff',
    },
    error: {
      main: '#D4111E',
      dark: '#a70d17',
      contrastText: '#ffffff',
    },
    warning: {
      main: '#F46A25',
      contrastText: '#ffffff',
    },
    text: {
      primary: mode === 'dark' ? '#E0E0E0' : '#262626',
      secondary: mode === 'dark' ? '#B0B0B0' : '#6B6B6B',
    },
    background: {
      default: mode === 'dark' ? '#121212' : '#F5F5F5',
      paper: mode === 'dark' ? '#1E1E1E' : '#ffffff',
    },
    divider: mode === 'dark' ? '#333333' : '#E6E6E6',
  },
  typography: {
    fontFamily: 'Inter, Roboto, sans-serif',
    button: { textTransform: 'none' },
  },
  spacing: 8,
  shape: {
    borderRadius: 8,
  },
})

export const createAppTheme = (
  mode: 'light' | 'dark' = 'light',
  direction: 'ltr' | 'rtl' = 'ltr',
) => {
  return responsiveFontSizes(createTheme(getThemeOptions(mode, direction)))
}

export const theme = createAppTheme('light')
EOF
```

**Step 2**: Verify the theme file was updated

```bash
# Check theme file
cat src/theme/index.ts
```

**Note**:

- This is a minimal theme expansion - just enough to support light/dark modes for ThemeContext
- We've added basic colors (primary, secondary, success, error, warning) and dark mode support
- We've added basic typography (font family and button text transform)
- **Custom variants** (primary, secondary, danger, soft buttons, price/label typography) will be added incrementally when we build components that use them
- **Component overrides** (Button styles, Card styles, etc.) will be added incrementally when we customize components
- **MUI type declarations** will be added when we add custom variants (see Appendix for reference)

### 12.2 Theme Context Provider

**Step 1**: Create ThemeContext

Now that we have the expanded theme configuration, we'll create the ThemeContext provider that manages theme state.

```bash
# Create providers directory if it doesn't exist
mkdir -p src/providers

# Create ThemeContext
cat > src/providers/ThemeContext.tsx << 'EOF'
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { createAppTheme } from '@/theme'

type ThemeMode = 'light' | 'dark'

interface ThemeContextType {
  mode: ThemeMode
  toggleMode: () => void
  theme: ReturnType<typeof createAppTheme>
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('theme-mode')
    return (saved as ThemeMode) || 'light'
  })

  useEffect(() => {
    localStorage.setItem('theme-mode', mode)
  }, [mode])

  const toggleMode = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  const theme = createAppTheme(mode)

  return (
    <ThemeContext.Provider value={{ mode, toggleMode, theme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useThemeMode() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useThemeMode must be used within ThemeProvider')
  }
  return context
}
EOF
```

**Step 2**: Verify the file was created

```bash
cat src/providers/ThemeContext.tsx
```

### 12.3 Notification Provider

**Step 1**: Create NotificationProvider

```bash
# Create NotificationProvider
cat > src/providers/NotificationProvider.tsx << 'EOF'
import { SnackbarProvider } from 'notistack'
import { type ReactNode } from 'react'

interface NotificationProviderProps {
  children: ReactNode
}

export function NotificationProvider({ children }: NotificationProviderProps) {
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      autoHideDuration={4000}
      dense
      preventDuplicate
    >
      {children}
    </SnackbarProvider>
  )
}
EOF
```

**Step 2**: Verify the file was created

```bash
cat src/providers/NotificationProvider.tsx
```

### 12.4 Loading Provider

**Step 1**: Create LoadingProvider

```bash
# Create LoadingProvider
cat > src/providers/LoadingProvider.tsx << 'EOF'
import { createContext, useContext, useState, useCallback } from 'react'
import type { ReactNode } from 'react'
import { CircularProgress, Box } from '@mui/material'

type LoadingContextValue = {
  isLoading: boolean
  setLoading: (loading: boolean) => void
  withLoading: <T>(fn: () => Promise<T>) => Promise<T>
}

const LoadingContext = createContext<LoadingContextValue | undefined>(undefined)

export function useLoading() {
  const context = useContext(LoadingContext)
  if (!context) {
    throw new Error('useLoading must be used within LoadingProvider')
  }
  return context
}

type LoadingProviderProps = {
  children: ReactNode
}

export function LoadingProvider({ children }: LoadingProviderProps) {
  const [isLoading, setIsLoading] = useState(false)

  const setLoading = useCallback((loading: boolean) => {
    setIsLoading(loading)
  }, [])

  const withLoading = useCallback(async <T,>(fn: () => Promise<T>): Promise<T> => {
    setIsLoading(true)
    try {
      return await fn()
    } finally {
      setIsLoading(false)
    }
  }, [])

  return (
    <LoadingContext.Provider value={{ isLoading, setLoading, withLoading }}>
      {children}
      {isLoading && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            bgcolor: 'rgba(0, 0, 0, 0.3)',
            zIndex: 9999,
          }}
        >
          <CircularProgress size={64} />
        </Box>
      )}
    </LoadingContext.Provider>
  )
}
EOF
```

**Step 2**: Verify the file was created

```bash
cat src/providers/LoadingProvider.tsx
```

### 12.5 Providers Setup (Minimal - Without useRTL)

**Step 1**: Create the minimal Providers component

At this stage, we'll create a basic Providers component that wraps the app with essential providers. We'll add `useRTL` hook in Section 14 after creating it.

**Note**: If you completed Section 9, you imported i18n config in `routes.tsx` for verification. Now we're moving it here to the Providers component for better architecture (single initialization point). You can remove the `import '@/i18n/config'` line from `routes.tsx` after this step.

```bash
# Create initial Providers component
cat > src/providers/index.tsx << 'EOF'
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { type ReactNode } from 'react'
import { Provider } from 'react-redux'
import { store } from '@/store'
import { ThemeProvider, useThemeMode } from './ThemeContext'
import { NotificationProvider } from './NotificationProvider'
import { LoadingProvider } from './LoadingProvider'
import '@/i18n/config' // i18n initialization - moved here from routes.tsx (Section 9)

function ThemeWrapper({ children }: { children: ReactNode }) {
  const { theme } = useThemeMode()
  // useRTL will be added in Section 14 after creating the hook

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  )
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <ThemeWrapper>
        <Provider store={store}>
          <NotificationProvider>
            <LoadingProvider>{children}</LoadingProvider>
          </NotificationProvider>
        </Provider>
      </ThemeWrapper>
    </ThemeProvider>
  )
}
EOF
```

**Step 2**: Verify the Providers file was created

```bash
cat src/providers/index.tsx
```

**Step 2.1** (Optional): Clean up routes.tsx

If you completed Section 9, you added i18n import and a HomeRoute component in `routes.tsx` for verification. Now that i18n is initialized in Providers, you can simplify `routes.tsx` by removing the i18n import and the HomeRoute component. However, you can also keep it as-is since it will be updated when you create actual pages in later steps.

**Step 3**: Update main.tsx to use Providers

Now that we've created the Providers component, let's wrap the App with it in `main.tsx`:

```bash
# Update main.tsx to include Providers
cat > src/main.tsx << 'EOF'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/styles/reset.css'
import App from '@/App.tsx'
import { Providers } from '@/providers/index.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Providers>
      <App />
    </Providers>
  </StrictMode>,
)
EOF
```

**Step 3**: Verify the update

```bash
# Check the updated content
cat src/main.tsx
```

**Step 2**: Verify the Providers file was created

```bash
cat src/providers/index.tsx
```

**Note**:

- This is the minimal provider setup needed to run the app
- We'll add `useRTL` hook in Section 14.1 after creating it
- ErrorBoundary will be added in Section 12.5

### 12.6 Error Boundary

**Step 1**: Create ErrorBoundary component

```bash
# Create ErrorBoundary
cat > src/providers/ErrorBoundary.tsx << 'EOF'
import { Component, type ReactNode } from 'react'
import { Box, Typography, Button } from '@mui/material'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: { componentStack: string }) {
    // Log error to console for now
    // We'll enhance this with logger in Section 15
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            p: 3,
          }}
        >
          <Typography variant="h4" gutterBottom>
            Something went wrong
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            {this.state.error?.message || 'An unexpected error occurred'}
          </Typography>
          <Button
            variant="contained"
            onClick={() => {
              this.setState({ hasError: false, error: null })
              window.location.href = '/home'
            }}
          >
            Go Home
          </Button>
        </Box>
      )
    }

    return this.props.children
  }
}
EOF
```

**Step 2**: Verify the file was created

```bash
cat src/providers/ErrorBoundary.tsx
```

**Step 3**: Update main.tsx to include ErrorBoundary

Now that we've created the ErrorBoundary component, let's wrap the App with it in `main.tsx`:

```bash
# Update main.tsx to include ErrorBoundary
cat > src/main.tsx << 'EOF'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/styles/reset.css'
import App from '@/App.tsx'
import { ErrorBoundary } from '@/providers/ErrorBoundary.tsx'
import { Providers } from '@/providers/index.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <Providers>
        <App />
      </Providers>
    </ErrorBoundary>
  </StrictMode>,
)
EOF
```

**Step 4**: Verify the update

```bash
# Check the updated content
cat src/main.tsx
```

**Note**:

- This is a minimal ErrorBoundary that logs errors to console. We'll enhance it to use the logger utility in Section 15 when we create it.
- We'll update the Providers component in Section 14.1 to add the `useRTL` hook after creating it.
- **Important**: During gradual development, we build components with minimal dependencies first, then enhance them as we add more utilities.

---

## 🏠 Now Let's Build Feature 1: Home Page

> **Realistic Development**: Now that we have the foundation (Providers, Theme, i18n, API base), let's build our **first complete feature** - the Home Page. We'll build everything this feature needs, step by step, exactly as you would in real development.

### Home Page Feature Overview

The Home page needs:

- ✅ MainLayout (with header and footer)
- ✅ Home page component
- ✅ Home API endpoints (featured deals, recent hotels, trending destinations, search)
- ✅ SearchSlice (for search state management)
- ✅ Home types (FeaturedDealDto, RecentHotelDto, DestinationDto, etc.)
- ✅ Home translations (all keys for home page sections)
- ✅ Home components (HeroSection, SearchBar, FeaturedDealsSection, etc.)
- ✅ Layout components (MainHeader, MainFooter, PageContainer, Section)
- ✅ Common components (VoyaLoader, SafeImage) - needed by Home sections
- ✅ Theme customizations (if components need custom variants)

### Development Steps for Home Page

Follow these steps in order:

1. **Create MainLayout** (Home page needs it)
2. **Create Home page component** (minimal placeholder first)
3. **Add Home route** to routes.tsx
4. **Create Home API endpoints** (src/api/home/index.ts)
5. **Add Home types** to types/models.ts (incremental)
6. **Add Home translations** to en.json and ar.json (incremental)
7. **Create SearchSlice** (for search functionality)
8. **Create layout components** (MainHeader, MainFooter, PageContainer, Section)
9. **Create common components** (VoyaLoader, SafeImage)
10. **Create Home components** (HeroSection, HomeSearchBar, FeaturedDealsSection, etc.)
11. **Test the Home page**

Let's start building!

### 12.7 Step 1: Create Minimal Home Page

Start with the absolute minimum - just a placeholder page:

**src/pages/Home/Home.tsx**:

```typescript
import { Container, Typography } from '@mui/material'

export default function Home() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4">Home Page</Typography>
      <Typography variant="body1">We'll build sections incrementally</Typography>
    </Container>
  )
}
```

**src/pages/Home/index.ts**:

```typescript
export { default } from './Home'
```

### 12.8 Step 2: Add Home Route

Update `src/routes/routes.tsx`:

```typescript
import { createBrowserRouter, Navigate } from 'react-router-dom'
import Home from '@/pages/Home'

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <div>
        <Home />
      </div>
    ),
  },
  {
    path: '/home',
    element: <Home />,
  },
])
```

**Test**: `pnpm dev` → Navigate to `/home` → Should see "Home Page" text.

### 12.9 Step 3: Build HeroSection Component

Now let's add the first real component - HeroSection. We'll build it, add its translations, then test.

**Create HeroSection component**:

**src/pages/Home/components/HeroSection.tsx**:

```typescript
import { Box, Typography, Container } from '@mui/material'
import { useTranslation } from 'react-i18next'

export function HeroSection() {
  const { t } = useTranslation()

  return (
    <Box
      sx={{
        bgcolor: 'primary.main',
        color: 'primary.contrastText',
        py: 8,
        mb: 4,
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="h2" component="h1" gutterBottom align="center">
          {t('home.heroTitle')}
        </Typography>
        <Typography variant="h6" align="center" sx={{ opacity: 0.9 }}>
          {t('home.heroSubtitle')}
        </Typography>
      </Container>
    </Box>
  )
}
```

**Update Home page to use HeroSection**:

**src/pages/Home/Home.tsx**:

```typescript
import { Container } from '@mui/material'
import { HeroSection } from './components/HeroSection'

export default function Home() {
  return (
    <>
      <HeroSection />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        {/* More sections coming... */}
      </Container>
    </>
  )
}
```

**Add ONLY hero translations** (incremental):

**Update `src/i18n/locales/en.json`** (add only these keys):

```json
{
  "home": {
    "heroTitle": "Discover stays that fit how you travel.",
    "heroSubtitle": "Search trusted stays, compare deals, and book in minutes—so you can focus on the trip, not the planning."
  }
}
```

**Update `src/i18n/locales/ar.json`** (add only these keys):

```json
{
  "home": {
    "heroTitle": "اكتشف أماكن الإقامة التي تناسب طريقة سفرك.",
    "heroSubtitle": "ابحث عن أماكن إقامة موثوقة، قارن العروض، واحجز في دقائق—حتى تتمكن من التركيز على الرحلة، وليس التخطيط."
  }
}
```

**Test**: Refresh page → Should see hero section with translated text.

**✅ Step 3 Complete**: HeroSection is working with translations!

### 12.10 Step 4: Build HomeSearchBar Component

Now let's add the search bar. This needs SearchSlice for state management.

**Create HomeSearchBar component**:

**src/pages/Home/components/HomeSearchBar.tsx**:

```typescript
import { useState } from 'react'
import { Box, TextField, Button, Grid } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '@/hooks'
import { setSearchParams } from '@/store/searchSlice'
import { useTranslation } from 'react-i18next'
import { format } from 'date-fns'

export function HomeSearchBar() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [city, setCity] = useState('')
  const [checkIn, setCheckIn] = useState<Date | null>(null)
  const [checkOut, setCheckOut] = useState<Date | null>(null)

  const handleSearch = () => {
    if (!city || !checkIn || !checkOut) {
      return
    }

    dispatch(
      setSearchParams({
        searchQuery: city,
        checkInDate: format(checkIn, 'yyyy-MM-dd'),
        checkOutDate: format(checkOut, 'yyyy-MM-dd'),
        adults: 2,
        children: 0,
        rooms: 1,
      }),
    )

    navigate('/search')
  }

  return (
    <Box component="form" onSubmit={(e) => { e.preventDefault(); handleSearch() }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={4}>
          <TextField
            label={t('home.whereGoing')}
            value={city}
            onChange={(e) => setCity(e.target.value)}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <DatePicker
            label={t('home.checkIn')}
            value={checkIn}
            onChange={(date) => setCheckIn(date)}
            slotProps={{ textField: { fullWidth: true, required: true } }}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <DatePicker
            label={t('home.checkOut')}
            value={checkOut}
            onChange={(date) => setCheckOut(date)}
            minDate={checkIn || undefined}
            slotProps={{ textField: { fullWidth: true, required: true } }}
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={!city || !checkIn || !checkOut}
            sx={{ height: '56px' }}
          >
            {t('common.search')}
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}
```

**Create SearchSlice** (needed by search bar):

**src/store/searchSlice.ts**:

```typescript
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export type SearchParams = {
  searchQuery?: string
  city?: string
  checkInDate?: string
  checkOutDate?: string
  adults?: number
  children?: number
  rooms?: number
}

export type SearchFilters = {
  priceRange?: [number, number]
  stars?: number | null
  amenities?: string[]
  hotelTypes?: string[]
}

export type SearchState = {
  params: SearchParams
  filters: SearchFilters
}

const initialState: SearchState = {
  params: {},
  filters: {},
}

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchParams(state, action: PayloadAction<Partial<SearchParams>>) {
      state.params = { ...state.params, ...action.payload }
    },
    setSearchFilters(state, action: PayloadAction<Partial<SearchFilters>>) {
      state.filters = { ...state.filters, ...action.payload }
    },
    clearSearchFilters(state) {
      state.filters = {}
    },
  },
})

export const { setSearchParams, setSearchFilters, clearSearchFilters } = searchSlice.actions
export const searchReducer = searchSlice.reducer

export const selectSearchParams = (state: { search: SearchState }) => state.search.params
export const selectSearchFilters = (state: { search: SearchState }) => state.search.filters
export const selectSearchQuery = (state: { search: SearchState }) =>
  state.search.params.searchQuery ?? state.search.params.city ?? ''
```

**Update store to include searchReducer**:

**src/store/index.ts**:

```typescript
import { configureStore } from '@reduxjs/toolkit'
import { baseApi } from '@/api/baseApi'
import { authReducer } from './authSlice'
import { searchReducer } from './searchSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    search: searchReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
```

**Add ONLY search bar translations** (incremental):

**Update `src/i18n/locales/en.json`** (add to existing home object):

```json
{
  "home": {
    "heroTitle": "Discover stays that fit how you travel.",
    "heroSubtitle": "Search trusted stays, compare deals, and book in minutes—so you can focus on the trip, not the planning.",
    "whereGoing": "Where are you going?",
    "checkIn": "Check-in",
    "checkOut": "Check-out"
  },
  "common": {
    "search": "Search"
  }
}
```

**Update `src/i18n/locales/ar.json`** (add to existing home object):

```json
{
  "home": {
    "heroTitle": "اكتشف أماكن الإقامة التي تناسب طريقة سفرك.",
    "heroSubtitle": "ابحث عن أماكن إقامة موثوقة، قارن العروض، واحجز في دقائق—حتى تتمكن من التركيز على الرحلة، وليس التخطيط.",
    "whereGoing": "إلى أين أنت ذاهب؟",
    "checkIn": "تاريخ الوصول",
    "checkOut": "تاريخ المغادرة"
  },
  "common": {
    "search": "بحث"
  }
}
```

**Update Home page to include search bar**:

**src/pages/Home/Home.tsx**:

```typescript
import { Container, Typography } from '@mui/material'
import { HeroSection } from './components/HeroSection'
import { HomeSearchBar } from './components/HomeSearchBar'
import { useTranslation } from 'react-i18next'

export default function Home() {
  const { t } = useTranslation()

  return (
    <>
      <HeroSection />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          {t('home.searchStays', 'Search stays')}
        </Typography>
        <HomeSearchBar />
      </Container>
    </>
  )
}
```

**Add searchStays translation**:

**Update `src/i18n/locales/en.json`**:

```json
{
  "home": {
    "heroTitle": "Discover stays that fit how you travel.",
    "heroSubtitle": "Search trusted stays, compare deals, and book in minutes—so you can focus on the trip, not the planning.",
    "whereGoing": "Where are you going?",
    "checkIn": "Check-in",
    "checkOut": "Check-out",
    "searchStays": "Search stays"
  }
}
```

**Update `src/i18n/locales/ar.json`**:

```json
{
  "home": {
    "heroTitle": "اكتشف أماكن الإقامة التي تناسب طريقة سفرك.",
    "heroSubtitle": "ابحث عن أماكن إقامة موثوقة، قارن العروض، واحجز في دقائق—حتى تتمكن من التركيز على الرحلة، وليس التخطيط.",
    "whereGoing": "إلى أين أنت ذاهب؟",
    "checkIn": "تاريخ الوصول",
    "checkOut": "تاريخ المغادرة",
    "searchStays": "ابحث عن أماكن الإقامة"
  }
}
```

**Test**: Refresh page → Should see search bar → Enter city and dates → Click search → Should navigate to `/search`.

**✅ Step 4 Complete**: SearchBar is working with SearchSlice and translations!

### 12.11 Step 5: Build FeaturedDealsSection Component

Now let's add the Featured Deals section. This needs API, types, and translations.

**Create FeaturedDealsSection component** (minimal at first):

**src/pages/Home/components/FeaturedDealsSection.tsx**:

```typescript
import { Typography } from '@mui/material'

export function FeaturedDealsSection() {
  return (
    <Typography variant="body1">
      Featured Deals - we'll add API and display next
    </Typography>
  )
}
```

**Update Home page**:

**src/pages/Home/Home.tsx**:

```typescript
import { Container, Typography } from '@mui/material'
import { HeroSection } from './components/HeroSection'
import { HomeSearchBar } from './components/HomeSearchBar'
import { FeaturedDealsSection } from './components/FeaturedDealsSection'
import { useTranslation } from 'react-i18next'

export default function Home() {
  const { t } = useTranslation()

  return (
    <>
      <HeroSection />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          {t('home.searchStays')}
        </Typography>
        <HomeSearchBar />

        <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
          {t('home.featuredDeals')}
        </Typography>
        <FeaturedDealsSection />
      </Container>
    </>
  )
}
```

**Add featuredDeals translation**:

**Update `src/i18n/locales/en.json`**:

```json
{
  "home": {
    "heroTitle": "Discover stays that fit how you travel.",
    "heroSubtitle": "Search trusted stays, compare deals, and book in minutes—so you can focus on the trip, not the planning.",
    "whereGoing": "Where are you going?",
    "checkIn": "Check-in",
    "checkOut": "Check-out",
    "searchStays": "Search stays",
    "featuredDeals": "Featured deals"
  }
}
```

**Update `src/i18n/locales/ar.json`**:

```json
{
  "home": {
    "heroTitle": "اكتشف أماكن الإقامة التي تناسب طريقة سفرك.",
    "heroSubtitle": "ابحث عن أماكن إقامة موثوقة، قارن العروض، واحجز في دقائق—حتى تتمكن من التركيز على الرحلة، وليس التخطيط.",
    "whereGoing": "إلى أين أنت ذاهب؟",
    "checkIn": "تاريخ الوصول",
    "checkOut": "تاريخ المغادرة",
    "searchStays": "ابحث عن أماكن الإقامة",
    "featuredDeals": "عروض مميزة"
  }
}
```

**Test**: Refresh → Should see "Featured deals" heading and placeholder text.

**Now add API endpoint** (only what FeaturedDeals needs):

**Create Home API** (minimal - just featured deals for now):

**src/api/home/index.ts**:

```typescript
import { baseApi } from '@/api/baseApi'

// Type for FeaturedDeal (only what we need right now)
export type FeaturedDealDto = {
  hotelId: number
  originalRoomPrice: number
  discount: number
  finalPrice: number
  cityName: string | null
  hotelName: string | null
  hotelStarRating: number
  title: string | null
  description: string | null
  roomPhotoUrl: string | null
}

export const homeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    featuredDeals: build.query<FeaturedDealDto[], void>({
      query: () => ({
        url: '/home/featured-deals',
        method: 'GET',
      }),
      providesTags: ['Home'],
    }),
  }),
})

export const { useFeaturedDealsQuery } = homeApi
```

**Update baseApi tagTypes**:

**src/api/baseApi.ts**:

```typescript
tagTypes: ['Auth', 'Home'], // Added Home tag
```

**Add FeaturedDealDto to types** (incremental):

**Update `src/types/models.ts`** (add only this type):

```typescript
// ... existing types ...

export interface FeaturedDealDto {
  hotelId: number
  originalRoomPrice: number
  discount: number
  finalPrice: number
  cityName: string | null
  hotelName: string | null
  hotelStarRating: number
  title: string | null
  description: string | null
  roomPhotoUrl: string | null
}
```

**Now enhance FeaturedDealsSection to use API**:

**src/pages/Home/components/FeaturedDealsSection.tsx**:

```typescript
import {
  Alert,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  CardActions,
  Rating,
} from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { useFeaturedDealsQuery } from '@/api/home'
import { useTranslation } from 'react-i18next'
import { CircularProgress } from '@mui/material'

export function FeaturedDealsSection() {
  const { t } = useTranslation()
  const { data, isLoading, isError } = useFeaturedDealsQuery()

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    )
  }

  if (isError) {
    return <Alert severity="error">{t('home.featuredDealsError')}</Alert>
  }

  if (!data || data.length === 0) {
    return <Typography>{t('home.noFeaturedDeals')}</Typography>
  }

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 3 }}>
      {data.map((deal) => (
        <Card key={deal.hotelId}>
          <Box
            component="img"
            src={deal.roomPhotoUrl || ''}
            alt={deal.hotelName || 'Hotel'}
            sx={{ width: '100%', height: 140, objectFit: 'cover' }}
          />
          <CardContent>
            <Typography variant="h6">{deal.hotelName}</Typography>
            <Typography variant="body2" color="text.secondary">
              {deal.cityName}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, mb: 1 }}>
              <Rating value={deal.hotelStarRating} readOnly size="small" />
              <Typography variant="body2" sx={{ ml: 1 }}>
                {deal.hotelStarRating} {t('hotel.starHotel', 'star hotel')}
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ mt: 1 }}>
              <strong>${deal.finalPrice.toFixed(2)}</strong>{' '}
              <Typography
                component="span"
                variant="body2"
                color="text.secondary"
                sx={{ textDecoration: 'line-through', ml: 1 }}
              >
                ${deal.originalRoomPrice.toFixed(2)}
              </Typography>
            </Typography>
          </CardContent>
          <CardActions>
            <Button component={RouterLink} to={`/hotel/${deal.hotelId}`} variant="contained" fullWidth>
              {t('common.viewDetails', 'View Details')}
            </Button>
          </CardActions>
        </Card>
      ))}
    </Box>
  )
}
```

**Add ONLY featured deals translations** (incremental):

**Update `src/i18n/locales/en.json`**:

```json
{
  "home": {
    "heroTitle": "Discover stays that fit how you travel.",
    "heroSubtitle": "Search trusted stays, compare deals, and book in minutes—so you can focus on the trip, not the planning.",
    "whereGoing": "Where are you going?",
    "checkIn": "Check-in",
    "checkOut": "Check-out",
    "searchStays": "Search stays",
    "featuredDeals": "Featured deals",
    "featuredDealsError": "Couldn't load featured deals. Please try again later.",
    "noFeaturedDeals": "No featured deals at the moment."
  },
  "common": {
    "search": "Search",
    "viewDetails": "View Details"
  },
  "hotel": {
    "starHotel": "star hotel"
  }
}
```

**Update `src/i18n/locales/ar.json`**:

```json
{
  "home": {
    "heroTitle": "اكتشف أماكن الإقامة التي تناسب طريقة سفرك.",
    "heroSubtitle": "ابحث عن أماكن إقامة موثوقة، قارن العروض، واحجز في دقائق—حتى تتمكن من التركيز على الرحلة، وليس التخطيط.",
    "whereGoing": "إلى أين أنت ذاهب؟",
    "checkIn": "تاريخ الوصول",
    "checkOut": "تاريخ المغادرة",
    "searchStays": "ابحث عن أماكن الإقامة",
    "featuredDeals": "عروض مميزة",
    "featuredDealsError": "تعذر تحميل العروض المميزة. يرجى المحاولة مرة أخرى لاحقاً.",
    "noFeaturedDeals": "لا توجد عروض مميزة في الوقت الحالي."
  },
  "common": {
    "search": "بحث",
    "viewDetails": "عرض التفاصيل"
  },
  "hotel": {
    "starHotel": "فندق"
  }
}
```

**Test**: Refresh → Should see featured deals loading → Then display deals (or error/empty state).

**✅ Step 5 Complete**: FeaturedDealsSection is working with API, types, and translations!

**Note**: We're building incrementally! We added:

- Component first (placeholder)
- Then API endpoint
- Then types
- Then translations
- Then enhanced component
- Tested

This is how real development works!

### 12.12 Step 6: Build RecentHotelsSection Component

Following the same incremental pattern - build component, add API, add types, add translations, test.

**Create RecentHotelsSection component** (minimal first):

**src/pages/Home/components/RecentHotelsSection.tsx**:

```typescript
import { Typography } from '@mui/material'

export function RecentHotelsSection() {
  return (
    <Typography variant="body1">
      Recent Hotels - we'll add API and display next
    </Typography>
  )
}
```

**Update Home page**:

**src/pages/Home/Home.tsx**:

```typescript
// ... existing imports ...
import { RecentHotelsSection } from './components/RecentHotelsSection'

export default function Home() {
  const { t } = useTranslation()

  return (
    <>
      <HeroSection />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        {/* ... existing sections ... */}

        <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
          {t('home.recentHotels')}
        </Typography>
        <RecentHotelsSection />
      </Container>
    </>
  )
}
```

**Add recentHotels translation** (incremental):

**Update `src/i18n/locales/en.json`** (add to home object):

```json
{
  "home": {
    // ... existing keys ...
    "recentHotels": "Your recently visited hotels"
  }
}
```

**Update `src/i18n/locales/ar.json`** (add to home object):

```json
{
  "home": {
    // ... existing keys ...
    "recentHotels": "فنادقك التي زرتها مؤخراً"
  }
}
```

**Test**: Refresh → Should see "Your recently visited hotels" heading.

**Now add API endpoint** (expand Home API):

**Update `src/api/home/index.ts`** (add to existing file):

```typescript
// ... existing FeaturedDealDto and featuredDeals endpoint ...

// Add RecentHotel type (only what we need)
export type RecentHotelResultDto = {
  hotelId: number
  hotelName: string | null
  starRating: number
  visitDate: string
  cityName: string | null
  thumbnailUrl: string | null
  priceLowerBound: number
  priceUpperBound: number
}

// Add to endpoints
export const homeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    featuredDeals: build.query<FeaturedDealDto[], void>({
      // ... existing ...
    }),
    recentHotels: build.query<RecentHotelResultDto[], { userId: number }>({
      query: ({ userId }) => ({
        url: `/home/users/${userId}/recent-hotels`,
        method: 'GET',
      }),
      providesTags: ['Home'],
    }),
  }),
})

export const { useFeaturedDealsQuery, useRecentHotelsQuery } = homeApi
```

**Add RecentHotelResultDto to types** (incremental):

**Update `src/types/models.ts`** (add only this type):

```typescript
// ... existing types ...

export interface RecentHotelResultDto {
  hotelId: number
  hotelName: string | null
  starRating: number
  visitDate: string
  cityName: string | null
  thumbnailUrl: string | null
  priceLowerBound: number
  priceUpperBound: number
}
```

**Enhance RecentHotelsSection to use API**:

**src/pages/Home/components/RecentHotelsSection.tsx**:

```typescript
import {
  Alert,
  Box,
  Card,
  CardContent,
  Rating,
  Typography,
  Button,
  CardActions,
} from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { useRecentHotelsQuery } from '@/api/home'
import { useTranslation } from 'react-i18next'
import { CircularProgress } from '@mui/material'
import { formatDistanceToNow } from 'date-fns'

const MOCK_USER_ID = 1

export function RecentHotelsSection() {
  const { t } = useTranslation()
  const { data, isLoading, isError } = useRecentHotelsQuery({
    userId: MOCK_USER_ID,
  })

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    )
  }

  if (isError) {
    return <Alert severity="error">{t('home.recentHotelsError')}</Alert>
  }

  if (!data || data.length === 0) {
    return (
      <Typography variant="body2" color="text.secondary">
        {t('home.noRecentHotels')}
      </Typography>
    )
  }

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 3 }}>
      {data.map((hotel) => (
        <Card key={hotel.hotelId}>
          <Box
            component="img"
            src={hotel.thumbnailUrl || ''}
            alt={hotel.hotelName || 'Hotel'}
            sx={{ width: '100%', height: 140, objectFit: 'cover' }}
          />
          <CardContent>
            <Typography variant="h6">{hotel.hotelName}</Typography>
            <Typography variant="body2" color="text.secondary">
              {hotel.cityName}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, mb: 1 }}>
              <Rating value={hotel.starRating} readOnly size="small" />
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {t('home.visited', 'Visited')}{' '}
              {formatDistanceToNow(new Date(hotel.visitDate), { addSuffix: true })}
            </Typography>
            <Typography variant="body2">
              ${hotel.priceLowerBound} - ${hotel.priceUpperBound} / night
            </Typography>
          </CardContent>
          <CardActions>
            <Button component={RouterLink} to={`/hotel/${hotel.hotelId}`} variant="contained" fullWidth>
              {t('common.viewDetails')}
            </Button>
          </CardActions>
        </Card>
      ))}
    </Box>
  )
}
```

**Add ONLY recent hotels translations** (incremental):

**Update `src/i18n/locales/en.json`**:

```json
{
  "home": {
    // ... existing keys ...
    "recentHotels": "Your recently visited hotels",
    "recentHotelsError": "Couldn't load your recent hotels right now.",
    "noRecentHotels": "You don't have any recently visited hotels yet.",
    "visited": "Visited"
  }
}
```

**Update `src/i18n/locales/ar.json`**:

```json
{
  "home": {
    // ... existing keys ...
    "recentHotels": "فنادقك التي زرتها مؤخراً",
    "recentHotelsError": "تعذر تحميل فنادقك الأخيرة في الوقت الحالي.",
    "noRecentHotels": "ليس لديك أي فنادق زرتها مؤخراً بعد.",
    "visited": "تمت الزيارة"
  }
}
```

**Test**: Refresh → Should see recent hotels loading → Then display (or error/empty state).

**✅ Step 6 Complete**: RecentHotelsSection is working!

### 12.13 Step 7: Build TrendingDestinationsSection Component

Same pattern - build incrementally.

**Create TrendingDestinationsSection** (minimal first):

**src/pages/Home/components/TrendingDestinationsSection.tsx**:

```typescript
import { Typography } from '@mui/material'

export function TrendingDestinationsSection() {
  return (
    <Typography variant="body1">
      Trending Destinations - we'll add API and display next
    </Typography>
  )
}
```

**Update Home page** → Add translation → Test → Add API → Add type → Enhance component → Add more translations → Test.

**Follow the same pattern**:

1. Component placeholder
2. Add translation key
3. Test
4. Add API endpoint
5. Add type
6. Enhance component
7. Add remaining translations
8. Test

> **📋 Complete Implementation**: For the full TrendingDestinationsSection implementation, see the codebase at `src/pages/Home/components/TrendingDestinationsSection.tsx`. Follow the same incremental pattern:
>
> - Create placeholder
> - Add `trendingDestinations` translation
> - Add API endpoint (`trendingDestinations` query)
> - Add `DestinationDto` type
> - Enhance component to display destinations
> - Add error/empty state translations
> - Test

**✅ Step 7 Complete**: TrendingDestinationsSection is working!

### 12.14 Step 8: Add MainLayout When Needed

Once the Home page is working, you'll want to add a header and footer. That's when you create MainLayout.

**Create MainLayout** (when Home page needs header/footer):

**src/layouts/MainLayout/MainLayout.tsx**:

```typescript
import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
// We'll create MainHeader and MainFooter when we need them

export default function MainLayout() {
  return (
    <>
      {/* MainHeader will be added here when we create it */}
      <Box
        component="main"
        sx={{
          minHeight: 'calc(100vh - 64px)',
          pt: 2,
        }}
      >
        <Outlet />
      </Box>
      {/* MainFooter will be added here when we create it */}
    </>
  )
}
```

**Update routes to use MainLayout**:

```typescript
import { createBrowserRouter, Navigate } from 'react-router-dom'
import MainLayout from '@/layouts/MainLayout'
import Home from '@/pages/Home'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Navigate to="/home" replace /> },
      { path: 'home', element: <Home /> },
    ],
  },
])
```

**Then create MainHeader and MainFooter incrementally** as you need them (following the same pattern - build, add translations, test).

---

## ✅ Feature 1 Complete: Home Page

You've built the Home page **incrementally**:

- ✅ Created minimal Home page
- ✅ Added HeroSection → Added hero translations → Tested
- ✅ Added SearchBar → Added search translations → Added SearchSlice → Tested
- ✅ Added FeaturedDealsSection → Added API → Added types → Added translations → Tested
- ✅ Added RecentHotelsSection → Added API → Added types → Added translations → Tested
- ✅ Added TrendingDestinationsSection (following same pattern)
- ✅ Added MainLayout when needed

**Key Learning**: Each component was built, tested, and had its translations/types added **only when needed**. This is realistic development!

**Next**: Move to [Feature 2: Login & Authentication](#13-feature-2-login--authentication)

---

> **⚠️ OLD APPROACH - DO NOT FOLLOW**: The sections below (12.10-12.16) show the OLD approach where everything is created at once. This is NOT how real development works.
>
> **✅ NEW INCREMENTAL APPROACH**: Follow steps 12.7-12.14 above, which show the TRUE incremental development pattern:
>
> - Build component → Add translations → Test
> - Add API → Add types → Enhance component → Test
> - Move to next component
>
> The sections below are kept for reference only. **DO NOT follow them** - they violate the incremental development principle.

---

### 12.10 OLD APPROACH: Create Home API Endpoints (Reference Only - DO NOT FOLLOW)

> **⚠️ This is the OLD "all at once" approach. Follow the incremental steps 12.7-12.14 instead.**

Now let's create the Home API endpoints. The Home page needs:

- Featured deals
- Recent hotels
- Trending destinations
- Search functionality

**src/api/home/index.ts** (OLD - creates everything at once):

```typescript
import { baseApi } from '@/api/baseApi'

// Types for Home API (we'll add these to types/models.ts in next step)
export type FeaturedDealDto = {
  hotelId: number
  originalRoomPrice: number
  discount: number
  finalPrice: number
  cityName: string | null
  hotelName: string | null
  hotelStarRating: number
  title: string | null
  description: string | null
  roomPhotoUrl: string | null
}

export type RecentHotelResultDto = {
  hotelId: number
  hotelName: string | null
  starRating: number
  visitDate: string
  cityName: string | null
  thumbnailUrl: string | null
  priceLowerBound: number
  priceUpperBound: number
}

export type DestinationDto = {
  cityId: number
  cityName: string | null
  countryName: string | null
  description: string | null
  thumbnailUrl: string | null
}

export type HomeSearchRequest = {
  checkInDate?: string
  checkOutDate?: string
  city?: string
  starRate?: number
  sort?: string
  numberOfRooms?: number
  adults?: number
  children?: number
}

export type SearchResultDto = {
  hotelId: number
  hotelName: string
  starRating: number
  latitude: number
  longitude: number
  roomPrice: number
  roomType: string | null
  cityName: string | null
  roomPhotoUrl: string | null
  discount: number
  amenities: { id: number; name: string; description: string | null }[] | null
}

export const homeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    featuredDeals: build.query<FeaturedDealDto[], void>({
      query: () => ({
        url: '/home/featured-deals',
        method: 'GET',
      }),
      providesTags: ['Home'],
    }),
    recentHotels: build.query<RecentHotelResultDto[], { userId: number }>({
      query: ({ userId }) => ({
        url: `/home/users/${userId}/recent-hotels`,
        method: 'GET',
      }),
      providesTags: ['Home'],
    }),
    trendingDestinations: build.query<DestinationDto[], void>({
      query: () => ({
        url: '/home/destinations/trending',
        method: 'GET',
      }),
      providesTags: ['Home'],
    }),
    homeSearch: build.query<SearchResultDto[], HomeSearchRequest>({
      query: (params) => ({
        url: '/home/search',
        method: 'GET',
        params,
      }),
      providesTags: ['Home'],
    }),
  }),
})

export const {
  useFeaturedDealsQuery,
  useRecentHotelsQuery,
  useTrendingDestinationsQuery,
  useHomeSearchQuery,
} = homeApi
```

**Update baseApi tagTypes**:

Update `src/api/baseApi.ts` to include 'Home' tag:

```typescript
tagTypes: ['Auth', 'Home'], // Added Home tag
```

### 12.11 OLD APPROACH: Add Home Types (Reference Only - DO NOT FOLLOW)

> **⚠️ This is the OLD "all at once" approach. In the new incremental approach (steps 12.7-12.14), types are added one at a time as each component needs them.**

Add the Home-related types to `src/types/models.ts`. You can either:

**Option A - Add incrementally** (OLD - still adds all types at once):

Add these types to your existing `types/models.ts`:

```typescript
// Add these to your existing types/models.ts file

export interface FeaturedDealDto {
  hotelId: number
  originalRoomPrice: number
  discount: number
  finalPrice: number
  cityName: string | null
  hotelName: string | null
  hotelStarRating: number
  title: string | null
  description: string | null
  roomPhotoUrl: string | null
}

export interface RecentHotelResultDto {
  hotelId: number
  hotelName: string | null
  starRating: number
  visitDate: string
  cityName: string | null
  thumbnailUrl: string | null
  priceLowerBound: number
  priceUpperBound: number
}

export interface DestinationDto {
  cityId: number
  cityName: string | null
  countryName: string | null
  description: string | null
  thumbnailUrl: string | null
}

export interface HomeSearchRequest {
  checkInDate?: string
  checkOutDate?: string
  city?: string
  starRate?: number
  sort?: string
  numberOfRooms?: number
  adults?: number
  children?: number
}

export interface SearchResultDto {
  hotelId: number
  hotelName: string
  starRating: number
  latitude: number
  longitude: number
  roomPrice: number
  roomType: string | null
  cityName: string | null
  roomPhotoUrl: string | null
  discount: number
  amenities: { id: number; name: string; description: string | null }[] | null
}
```

**Option B - Copy complete file** (faster):

> **📋 Copy Complete File**: At this point, you can copy the complete `types/models.ts` from the codebase (280+ lines). This includes all DTOs you'll need.

### 12.12 OLD APPROACH: Add Home Translations (Reference Only - DO NOT FOLLOW)

> **⚠️ This is the OLD "all at once" approach. In the new incremental approach (steps 12.7-12.14), translations are added one component at a time.**

Add Home page translations incrementally to your translation files (OLD - still adds all translations at once):

**Add to `src/i18n/locales/en.json`** (add to existing file):

```json
{
  "common": {
    // ... existing common keys ...
  },
  "home": {
    "heroTitle": "Discover stays that fit how you travel.",
    "heroSubtitle": "Search trusted stays, compare deals, and book in minutes—so you can focus on the trip, not the planning.",
    "heroChip": "Find your next stay",
    "startExploring": "Start exploring",
    "viewFeaturedDeals": "View featured deals",
    "searchStays": "Search stays",
    "whereGoing": "Where are you going?",
    "checkIn": "Check-in",
    "checkOut": "Check-out",
    "cityRequired": "City is required",
    "checkInRequired": "Check-in is required",
    "checkOutRequired": "Check-out is required",
    "checkOutAfterCheckIn": "Check-out must be after check-in",
    "featuredDeals": "Featured deals",
    "featuredDealsSubtitle": "Special offers tailored for you",
    "featuredDealsError": "Couldn't load featured deals. Please try again later.",
    "noFeaturedDeals": "No featured deals at the moment.",
    "recentHotels": "Your recently visited hotels",
    "recentHotelsSubtitle": "Quick access to places you checked before",
    "recentHotelsError": "Couldn't load your recent hotels right now.",
    "noRecentHotels": "You don't have any recently visited hotels yet.",
    "trendingDestinations": "Trending destinations",
    "trendingDestinationsSubtitle": "Popular cities travelers love right now",
    "trendingDestinationsError": "Unable to load trending destinations at the moment.",
    "noTrendingDestinations": "No trending destinations right now. Check back later!"
  }
}
```

**Add to `src/i18n/locales/ar.json`** (add Arabic translations):

```json
{
  "common": {
    // ... existing common keys ...
  },
  "home": {
    "heroTitle": "اكتشف أماكن الإقامة التي تناسب طريقة سفرك.",
    "heroSubtitle": "ابحث عن أماكن إقامة موثوقة، قارن العروض، واحجز في دقائق—حتى تتمكن من التركيز على الرحلة، وليس التخطيط.",
    "heroChip": "ابحث عن إقامتك القادمة",
    "startExploring": "ابدأ الاستكشاف",
    "viewFeaturedDeals": "عرض العروض المميزة",
    "searchStays": "ابحث عن أماكن الإقامة",
    "whereGoing": "إلى أين أنت ذاهب؟",
    "checkIn": "تاريخ الوصول",
    "checkOut": "تاريخ المغادرة",
    "cityRequired": "المدينة مطلوبة",
    "checkInRequired": "تاريخ الوصول مطلوب",
    "checkOutRequired": "تاريخ المغادرة مطلوب",
    "checkOutAfterCheckIn": "يجب أن يكون تاريخ المغادرة بعد تاريخ الوصول",
    "featuredDeals": "عروض مميزة",
    "featuredDealsSubtitle": "عروض خاصة مصممة لك",
    "featuredDealsError": "تعذر تحميل العروض المميزة. يرجى المحاولة مرة أخرى لاحقاً.",
    "noFeaturedDeals": "لا توجد عروض مميزة في الوقت الحالي.",
    "recentHotels": "فنادقك التي زرتها مؤخراً",
    "recentHotelsSubtitle": "وصول سريع إلى الأماكن التي فحصتها من قبل",
    "recentHotelsError": "تعذر تحميل فنادقك الأخيرة في الوقت الحالي.",
    "noRecentHotels": "ليس لديك أي فنادق زرتها مؤخراً بعد.",
    "trendingDestinations": "الوجهات الرائجة",
    "trendingDestinationsSubtitle": "المدن الشعبية التي يحبها المسافرون الآن",
    "trendingDestinationsError": "تعذر تحميل الوجهات الرائجة في الوقت الحالي.",
    "noTrendingDestinations": "لا توجد وجهات رائجة في الوقت الحالي. تحقق مرة أخرى لاحقاً!"
  }
}
```

> **📋 Copy Complete Translation Files**: Alternatively, you can copy the complete translation files from the codebase.

### 12.13 Step 7: Create SearchSlice

Now let's create the SearchSlice for managing search state. This is needed by the Home page search functionality.

**src/store/searchSlice.ts**:

```typescript
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface SearchState {
  searchQuery?: string
  checkInDate?: string
  checkOutDate?: string
  adults?: number
  children?: number
  rooms?: number
  priceRange?: [number, number]
  starRating?: number[]
  amenities?: number[]
  hotelType?: string[]
}

const initialState: SearchState = {
  searchQuery: undefined,
  checkInDate: undefined,
  checkOutDate: undefined,
  adults: 2,
  children: 0,
  rooms: 1,
  priceRange: undefined,
  starRating: undefined,
  amenities: undefined,
  hotelType: undefined,
}

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchParams: (state, action: PayloadAction<Partial<SearchState>>) => {
      return { ...state, ...action.payload }
    },
    clearSearchParams: () => initialState,
  },
})

export const { setSearchParams, clearSearchParams } = searchSlice.actions
export const searchReducer = searchSlice.reducer

export const selectSearchParams = (state: { search: SearchState }): SearchState => state.search
```

**Update store to include searchReducer**:

Update `src/store/index.ts`:

```typescript
import { configureStore } from '@reduxjs/toolkit'
import { baseApi } from '@/api/baseApi'
import { authReducer } from './authSlice'
import { searchReducer, type SearchState } from './searchSlice'

const STORAGE_KEY = 'lastSearch'

function loadSearchState(): SearchState | undefined {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return undefined
    return JSON.parse(raw) as SearchState
  } catch {
    return undefined
  }
}

const persistedSearch = loadSearchState()

export const store = configureStore({
  reducer: {
    auth: authReducer,
    search: searchReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  ...(persistedSearch && {
    preloadedState: {
      search: persistedSearch,
    },
  }),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
})

// Persist search state to localStorage
store.subscribe(() => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store.getState().search))
  } catch {
    // Handle error silently
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
```

**Note**: The search state is automatically persisted to localStorage, so users can return to the search page and see their previous search parameters.

---

> **📋 Important Note**:
>
> Steps 12.7-12.14 above demonstrate the **TRUE incremental development pattern** where each component is built, tested, and has its dependencies added one at a time.
>
> **The sections below (12.14-12.17) contain the OLD "all at once" approach** where everything is created upfront. They are kept for reference but **DO NOT follow them** - they violate the incremental development principle you requested.
>
> **✅ Follow the incremental steps 12.7-12.14 instead**, which show:
>
> - Build component → Add translations → Test
> - Add API → Add types → Enhance component → Test
> - Move to next component

---

### 12.14 OLD APPROACH: Create Layout Components (Reference Only - DO NOT FOLLOW)

> **⚠️ This is the OLD "all at once" approach. In the new incremental approach, layout components are created when Home page actually needs them (after all sections are built).**

The Home page needs layout components. Let's create them:

#### 8.1 ScrollToTop Component

**src/components/ScrollToTop.tsx**:

```typescript
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}
```

#### 8.2 PageContainer Component

**src/components/layout/PageContainer.tsx**:

```typescript
import { Box, type BoxProps } from '@mui/material'

export function PageContainer({ children, ...props }: BoxProps) {
  return (
    <Box
      component="main"
      sx={{
        minHeight: 'calc(100vh - 64px)',
        pt: 2,
        pb: 4,
      }}
      {...props}
    >
      {children}
    </Box>
  )
}
```

#### 8.3 Section Component

**src/components/layout/Section.tsx**:

```typescript
import { Box, Typography, type BoxProps } from '@mui/material'

interface SectionProps extends BoxProps {
  title?: string
  subtitle?: string
}

export function Section({ title, subtitle, children, ...props }: SectionProps) {
  return (
    <Box component="section" sx={{ mb: 4 }} {...props}>
      {title && (
        <Typography variant="h4" gutterBottom>
          {title}
        </Typography>
      )}
      {subtitle && (
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          {subtitle}
        </Typography>
      )}
      {children}
    </Box>
  )
}
```

#### 8.4 MainHeader Component

**src/components/layout/MainHeader.tsx**:

```typescript
import { useState } from 'react'
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu'
import LogoutIcon from '@mui/icons-material/Logout'
import LoginIcon from '@mui/icons-material/Login'
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff'
import { useAppSelector, useAppDispatch } from '@/hooks'
import { selectIsAuthenticated, logout } from '@/store/authSlice'
import { LogoutBtn } from '@/components/layout'
import { ThemeToggle } from './ThemeToggle'
import { LanguageSwitcher } from './LanguageSwitcher'
import { useTranslation } from 'react-i18next'

export default function MainHeader() {
  const { t } = useTranslation()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleAuthClick = () => {
    if (isAuthenticated) {
      localStorage.removeItem('token')
      localStorage.removeItem('userType')
      dispatch(logout())
      void navigate('/home', { replace: true })
    } else {
      void navigate('/login')
    }
    handleMenuClose()
  }

  return (
    <AppBar position="sticky" color="default" elevation={1}>
      <Toolbar>
        <Box
          component={RouterLink}
          to="/home"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            textDecoration: 'none',
            flexGrow: 1,
          }}
        >
          <FlightTakeoffIcon
            sx={{
              color: 'primary.main',
              fontSize: { xs: 24, sm: 32 },
            }}
          />
          <Box
            component="span"
            sx={{
              fontSize: { xs: '1.25rem', sm: '1.5rem' },
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
        {isMobile ? (
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
              <MenuItem component={RouterLink} to="/home" onClick={handleMenuClose}>
                {t('common.home')}
              </MenuItem>
              <MenuItem component={RouterLink} to="/search" onClick={handleMenuClose}>
                {t('common.search')}
              </MenuItem>
              <MenuItem onClick={handleAuthClick}>
                {isAuthenticated ? (
                  <>
                    <LogoutIcon sx={{ mr: 1 }} />
                    {t('common.logout')}
                  </>
                ) : (
                  <>
                    <LoginIcon sx={{ mr: 1 }} />
                    {t('common.login')}
                  </>
                )}
              </MenuItem>
            </Menu>
          </>
        ) : (
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
        )}
      </Toolbar>
    </AppBar>
  )
}
```

**Note**: MainHeader uses `ThemeToggle` and `LanguageSwitcher` components. We'll create simplified versions for now (or you can create them - see Feature 2 for full implementations).

#### 8.5 MainFooter Component

**src/components/layout/MainFooter.tsx**:

```typescript
import { Box, Container, Typography, Link, Grid } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export function MainFooter() {
  const { t } = useTranslation()

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'background.paper',
        borderTop: 1,
        borderColor: 'divider',
        py: 4,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Voya
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t('footer.tagline', 'Discover your perfect stay. Book with confidence and travel with ease.')}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              {t('footer.quickLinks', 'Quick Links')}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link component={RouterLink} to="/home" color="text.secondary">
                {t('footer.browseHotels', 'Browse Hotels')}
              </Link>
              <Link component={RouterLink} to="/search" color="text.secondary">
                {t('footer.searchStays', 'Search Stays')}
              </Link>
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ mt: 4, pt: 2, borderTop: 1, borderColor: 'divider', textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} Voya. {t('footer.copyright', 'All rights reserved.')}
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}
```

**Update layout index.ts**:

**src/components/layout/index.ts**:

```typescript
export { default as MainHeader } from './MainHeader'
export { MainFooter } from './MainFooter'
export { PageContainer } from './PageContainer'
export { Section } from './Section'
// We'll add other components as we create them
// export { default as LogoutBtn } from './LogoutBtn'
// export { LanguageSwitcher } from './LanguageSwitcher'
// export { ThemeToggle } from './ThemeToggle'
```

**Add footer translations** (add to `en.json` and `ar.json`):

```json
{
  "footer": {
    "tagline": "Discover your perfect stay. Book with confidence and travel with ease.",
    "quickLinks": "Quick Links",
    "browseHotels": "Browse Hotels",
    "searchStays": "Search Stays",
    "signIn": "Sign In",
    "contactUs": "Contact Us",
    "copyright": "All rights reserved.",
    "privacyPolicy": "Privacy Policy",
    "termsOfService": "Terms of Service"
  }
}
```

### 12.15 Step 9: Create Common Components

The Home page sections need common components. Let's create them:

#### 9.1 VoyaLoader Component

**src/components/common/VoyaLoader.tsx**:

```typescript
import { Box, Typography, keyframes } from '@mui/material'
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff'

const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`

type VoyaLoaderProps = {
  size?: 'small' | 'medium' | 'large'
  fullScreen?: boolean
  message?: string
}

export function VoyaLoader({ size = 'medium', fullScreen = false, message }: VoyaLoaderProps) {
  const iconSizes = {
    small: 40,
    medium: 64,
    large: 96,
  }

  const iconSize = iconSizes[size]

  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
      }}
    >
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <FlightTakeoffIcon
          sx={{
            fontSize: iconSize,
            color: 'primary.main',
            animation: `${float} 2s ease-in-out infinite`,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            width: iconSize + 20,
            height: iconSize + 20,
            border: '3px solid',
            borderColor: 'primary.light',
            borderTopColor: 'primary.main',
            borderRadius: '50%',
            animation: `${rotate} 1s linear infinite`,
            opacity: 0.3,
          }}
        />
      </Box>
      <Typography
        variant={size === 'large' ? 'h5' : size === 'medium' ? 'h6' : 'body1'}
        sx={{
          background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          fontWeight: 700,
          animation: `${pulse} 2s ease-in-out infinite`,
        }}
      >
        Voya
      </Typography>
      {message && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {message}
        </Typography>
      )}
    </Box>
  )

  if (fullScreen) {
    return (
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'background.paper',
          zIndex: 9999,
        }}
      >
        {content}
      </Box>
    )
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '200px',
        py: 4,
      }}
    >
      {content}
    </Box>
  )
}
```

#### 9.2 SafeImage Component

**src/components/common/SafeImage.tsx**:

```typescript
import { useState, useEffect, useRef } from 'react'
import { Box, CardMedia, Skeleton } from '@mui/material'
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported'

type SafeImageProps = {
  src?: string | null
  alt?: string
  height?: number | string
  width?: number | string
  component?: 'img' | 'div'
  sx?: object
  fallbackIcon?: boolean
}

export function SafeImage({
  src,
  alt = 'Image',
  height = 140,
  width = '100%',
  component = 'img',
  sx,
  fallbackIcon = true,
}: SafeImageProps) {
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => {
    setHasError(false)
    setIsLoading(true)

    if (!src) {
      setHasError(true)
      setIsLoading(false)
      return
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      setIsLoading((prevLoading) => {
        if (prevLoading) {
          setHasError(true)
          return false
        }
        return prevLoading
      })
    }, 8000)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [src])

  const handleLoad = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setIsLoading(false)
    setHasError(false)
  }

  const handleError = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setHasError(true)
    setIsLoading(false)
  }

  if (!src || hasError) {
    if (fallbackIcon) {
      return (
        <Box
          sx={{
            height,
            width,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'grey.200',
            color: 'grey.400',
            ...sx,
          }}
        >
          <ImageNotSupportedIcon sx={{ fontSize: 48 }} />
        </Box>
      )
    }
    return null
  }

  if (component === 'img') {
    return (
      <Box sx={{ position: 'relative', height, width, ...sx }}>
        {isLoading && (
          <Skeleton
            variant="rectangular"
            height={height}
            width={width}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: 1,
            }}
          />
        )}
        <CardMedia
          component="img"
          height={height}
          width={width}
          image={src}
          alt={alt}
          onError={handleError}
          onLoad={handleLoad}
          sx={{
            bgcolor: 'grey.200',
            position: 'relative',
            zIndex: 2,
            opacity: isLoading ? 0 : 1,
            transition: 'opacity 0.3s ease-in-out',
            ...sx,
          }}
        />
      </Box>
    )
  }

  return (
    <Box
      component="div"
      sx={{
        height,
        width,
        backgroundImage: `url(${src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        bgcolor: 'grey.200',
        ...sx,
      }}
    />
  )
}
```

**Update common components index.ts**:

**src/components/common/index.ts**:

```typescript
export * from './VoyaLoader'
export * from './SafeImage'
```

**Update main components index.ts**:

**src/components/index.ts**:

```typescript
// Common components
export * from './common'

// Layout components
export * from './layout'

// Auth components (will be added in Feature 2)
// export * from './auth'
```

### 12.16 Step 10: Create Home Page Components

Now let's create the Home page section components. We'll build them incrementally:

#### 10.1 HeroSection Component

**src/pages/Home/components/HeroSection.tsx**:

```typescript
import { Box, Typography, Container } from '@mui/material'
import { useTranslation } from 'react-i18next'

export function HeroSection() {
  const { t } = useTranslation()

  return (
    <Box
      sx={{
        bgcolor: 'primary.main',
        color: 'primary.contrastText',
        py: 8,
        mb: 4,
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="h2" component="h1" gutterBottom align="center">
          {t('home.heroTitle')}
        </Typography>
        <Typography variant="h6" align="center" sx={{ opacity: 0.9 }}>
          {t('home.heroSubtitle')}
        </Typography>
      </Container>
    </Box>
  )
}
```

#### 10.2 HomeSearchBar Component

**src/pages/Home/components/HomeSearchBar.tsx**:

```typescript
import { useState } from 'react'
import { Box, TextField, Button, Grid } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '@/hooks'
import { setSearchParams } from '@/store/searchSlice'
import { useTranslation } from 'react-i18next'
import { format } from 'date-fns'

export function HomeSearchBar() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [city, setCity] = useState('')
  const [checkIn, setCheckIn] = useState<Date | null>(null)
  const [checkOut, setCheckOut] = useState<Date | null>(null)

  const handleSearch = () => {
    if (!city || !checkIn || !checkOut) {
      return
    }

    dispatch(
      setSearchParams({
        searchQuery: city,
        checkInDate: format(checkIn, 'yyyy-MM-dd'),
        checkOutDate: format(checkOut, 'yyyy-MM-dd'),
        adults: 2,
        children: 0,
        rooms: 1,
      }),
    )

    navigate('/search')
  }

  return (
    <Box component="form" onSubmit={(e) => { e.preventDefault(); handleSearch() }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={4}>
          <TextField
            label={t('home.whereGoing')}
            value={city}
            onChange={(e) => setCity(e.target.value)}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <DatePicker
            label={t('home.checkIn')}
            value={checkIn}
            onChange={(date) => setCheckIn(date)}
            slotProps={{ textField: { fullWidth: true, required: true } }}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <DatePicker
            label={t('home.checkOut')}
            value={checkOut}
            onChange={(date) => setCheckOut(date)}
            minDate={checkIn || undefined}
            slotProps={{ textField: { fullWidth: true, required: true } }}
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={!city || !checkIn || !checkOut}
            sx={{ height: '56px' }}
          >
            {t('common.search')}
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}
```

#### 10.3 FeaturedDealsSection Component

**src/pages/Home/components/FeaturedDealsSection.tsx**:

```typescript
import {
  Alert,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  CardActions,
  Rating,
} from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { useFeaturedDealsQuery } from '@/api/home'
import { SafeImage } from '@/components/common/SafeImage'
import { VoyaLoader } from '@/components'
import styles from '../styles.module.css'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { useTranslation } from 'react-i18next'

export function FeaturedDealsSection() {
  const { t } = useTranslation()
  const { data, isLoading, isError } = useFeaturedDealsQuery()

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '300px',
        }}
      >
        <VoyaLoader size="small" />
      </Box>
    )
  }

  if (isError) {
    return <Alert severity="error">{t('home.featuredDealsError')}</Alert>
  }

  if (!data || data.length === 0) {
    return <Typography>{t('home.noFeaturedDeals')}</Typography>
  }

  return (
    <Box className={styles.cardsGrid}>
      {data.map((deal) => (
        <Card key={deal.hotelId} sx={{ display: 'flex', flexDirection: 'column' }}>
          <SafeImage
            src={deal.roomPhotoUrl}
            alt={deal.hotelName ?? 'Featured hotel'}
            height={140}
          />
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography variant="h6">{deal.hotelName}</Typography>
            <Typography variant="body2" color="text.secondary">
              {deal.cityName}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, mb: 1 }}>
              <Rating value={deal.hotelStarRating} readOnly size="small" max={5} />
              <Typography variant="body2" sx={{ ml: 1 }}>
                {deal.hotelStarRating} {t('hotel.starHotel', 'star hotel')}
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ mt: 1 }}>
              <strong>${deal.finalPrice.toFixed(2)}</strong>{' '}
              <Typography
                component="span"
                variant="body2"
                color="text.secondary"
                sx={{ textDecoration: 'line-through', ml: 1 }}
              >
                ${deal.originalRoomPrice.toFixed(2)}
              </Typography>{' '}
              <Typography component="span" color="success.main" variant="body2">
                -{Math.round(deal.discount * 100)}%
              </Typography>
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              component={RouterLink}
              to={`/hotel/${deal.hotelId}`}
              variant="contained"
              fullWidth
              startIcon={<VisibilityIcon />}
            >
              {t('common.viewDetails')}
            </Button>
          </CardActions>
        </Card>
      ))}
    </Box>
  )
}
```

**Note**: This component uses `styles.module.css`. Create a minimal CSS file:

**src/pages/Home/styles.module.css**:

```css
.cardsGrid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
  margin-top: 24px;
}

.searchSection {
  margin-bottom: 48px;
}

.section {
  margin-bottom: 48px;
}
```

#### 10.4 RecentHotelsSection Component

**src/pages/Home/components/RecentHotelsSection.tsx**:

```typescript
import {
  Alert,
  Box,
  Card,
  CardContent,
  Rating,
  Typography,
  Button,
  CardActions,
} from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { useRecentHotelsQuery } from '@/api/home'
import { SafeImage } from '@/components/common/SafeImage'
import { VoyaLoader } from '@/components'
import styles from '../styles.module.css'
import { formatDistanceToNow } from 'date-fns'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { useTranslation } from 'react-i18next'

const MOCK_USER_ID = 1

export function RecentHotelsSection() {
  const { t } = useTranslation()
  const { data, isLoading, isError } = useRecentHotelsQuery({
    userId: MOCK_USER_ID,
  })

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '300px',
        }}
      >
        <VoyaLoader size="small" />
      </Box>
    )
  }

  if (isError) {
    return <Alert severity="error">{t('home.recentHotelsError')}</Alert>
  }

  if (!data || data.length === 0) {
    return (
      <Typography variant="body2" color="text.secondary">
        {t('home.noRecentHotels')}
      </Typography>
    )
  }

  return (
    <Box className={styles.cardsGrid}>
      {data.map((hotel) => (
        <Card key={hotel.hotelId}>
          <SafeImage
            src={hotel.thumbnailUrl}
            alt={hotel.hotelName ?? 'Hotel'}
            height={140}
          />
          <CardContent>
            <Typography variant="h6">{hotel.hotelName}</Typography>
            <Typography variant="body2" color="text.secondary">
              {hotel.cityName}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, mb: 1 }}>
              <Rating value={hotel.starRating} readOnly size="small" />
            </Box>
            <Typography variant="body2" color="text.secondary">
              {t('home.visited', 'Visited')}{' '}
              {formatDistanceToNow(new Date(hotel.visitDate), { addSuffix: true })}
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              ${hotel.priceLowerBound} - ${hotel.priceUpperBound} / night
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              component={RouterLink}
              to={`/hotel/${hotel.hotelId}`}
              variant="contained"
              fullWidth
              startIcon={<VisibilityIcon />}
            >
              {t('common.viewDetails')}
            </Button>
          </CardActions>
        </Card>
      ))}
    </Box>
  )
}
```

#### 10.5 TrendingDestinationsSection Component

**src/pages/Home/components/TrendingDestinationsSection.tsx**:

```typescript
import { Alert, Box, Card, CardContent, Typography } from '@mui/material'
import { useTrendingDestinationsQuery } from '@/api/home'
import { SafeImage } from '@/components/common/SafeImage'
import { VoyaLoader } from '@/components'
import styles from '../styles.module.css'
import { useTranslation } from 'react-i18next'

export function TrendingDestinationsSection() {
  const { t } = useTranslation()
  const { data, isLoading, isError } = useTrendingDestinationsQuery()

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '300px',
        }}
      >
        <VoyaLoader size="small" />
      </Box>
    )
  }

  if (isError) {
    return <Alert severity="error">{t('home.trendingDestinationsError')}</Alert>
  }

  if (!data || data.length === 0) {
    return (
      <Typography variant="body2" color="text.secondary">
        {t('home.noTrendingDestinations')}
      </Typography>
    )
  }

  return (
    <Box className={styles.cardsGrid}>
      {data.map((dest) => (
        <Card key={dest.cityId}>
          <SafeImage src={dest.thumbnailUrl} alt={dest.cityName ?? 'Destination'} height={140} />
          <CardContent>
            <Typography variant="h6">
              {dest.cityName}, {dest.countryName}
            </Typography>
            {dest.description && (
              <Typography variant="body2" color="text.secondary">
                {dest.description}
              </Typography>
            )}
          </CardContent>
        </Card>
      ))}
    </Box>
  )
}
```

#### 10.6 Update Home Page to Use All Components

**src/pages/Home/Home.tsx**:

```typescript
import { Container, Typography } from '@mui/material'
import { PageContainer, Section } from '@/components/layout'
import { HomeSearchBar } from './components/HomeSearchBar'
import { FeaturedDealsSection } from './components/FeaturedDealsSection'
import { RecentHotelsSection } from './components/RecentHotelsSection'
import { TrendingDestinationsSection } from './components/TrendingDestinationsSection'
import { HeroSection } from './components/HeroSection'
import styles from './styles.module.css'
import { useTranslation } from 'react-i18next'

export default function Home() {
  const { t } = useTranslation()

  return (
    <PageContainer>
      <HeroSection />

      <Container maxWidth="lg">
        <Section className={styles.searchSection}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            {t('home.searchStays')}
          </Typography>
          <HomeSearchBar />
        </Section>

        <Section
          id="featured-deals"
          title={t('home.featuredDeals')}
          subtitle={t('home.featuredDealsSubtitle')}
          className={styles.section}
        >
          <FeaturedDealsSection />
        </Section>

        <Section
          title={t('home.recentHotels')}
          subtitle={t('home.recentHotelsSubtitle')}
          className={styles.section}
        >
          <RecentHotelsSection />
        </Section>

        <Section
          title={t('home.trendingDestinations')}
          subtitle={t('home.trendingDestinationsSubtitle')}
          className={styles.section}
        >
          <TrendingDestinationsSection />
        </Section>
      </Container>
    </PageContainer>
  )
}
```

### 12.17 Step 11: Test the Home Page

**Verification Checklist**:

1. ✅ **Start dev server**: `pnpm dev`
2. ✅ **Navigate to `/home`**: Should see Home page with all sections
3. ✅ **Check Hero Section**: Should display hero title and subtitle
4. ✅ **Check Search Bar**: Should allow entering city and dates
5. ✅ **Check Featured Deals**: Should load and display featured deals (or show error/empty state)
6. ✅ **Check Recent Hotels**: Should load and display recent hotels (or show error/empty state)
7. ✅ **Check Trending Destinations**: Should load and display destinations (or show error/empty state)
8. ✅ **Test Search**: Enter search criteria and click search - should navigate to `/search`
9. ✅ **Check Responsive**: Test on mobile and desktop
10. ✅ **Check Translations**: Switch language (if LanguageSwitcher is implemented) - text should change

**Common Issues**:

- **API errors**: Make sure backend is running and `VITE_API_BASE_URL` is correct in `.env`
- **Missing translations**: Add any missing translation keys to `en.json` and `ar.json`
- **Type errors**: Make sure all types are added to `types/models.ts`
- **Component errors**: Check that all components are exported from their index files

---

## ✅ Feature 1 Complete: Home Page

Congratulations! You've built the complete Home Page feature with:

- ✅ Home page component
- ✅ Home API endpoints
- ✅ SearchSlice for state management
- ✅ Home types
- ✅ Home translations
- ✅ Layout components (MainLayout, MainHeader, MainFooter)
- ✅ Common components (VoyaLoader, SafeImage)
- ✅ Home section components (Hero, SearchBar, FeaturedDeals, RecentHotels, TrendingDestinations)

**Next**: Move to [Feature 2: Login & Authentication](#13-feature-2-login--authentication)

---

> **Note**: This section shows how to create the search slice. You should create it **when you implement the Home page search functionality**, not upfront. For now, you can skip this section and come back to it when building the Home page.

**When to create**: Create this when implementing the Home page (Section 12.9 or later) that needs search state management.

**Step 1**: Create the search slice

When implementing the Home page with search functionality, you'll need to create the search slice to manage search state and persist it to localStorage.

```bash
# Create searchSlice
cat > src/store/searchSlice.ts << 'EOF'
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface SearchState {
  searchQuery?: string
  checkInDate?: string
  checkOutDate?: string
  adults?: number
  children?: number
  rooms?: number
  priceRange?: [number, number]
  starRating?: number[]
  amenities?: number[]
  hotelType?: string[]
}

const initialState: SearchState = {
  searchQuery: undefined,
  checkInDate: undefined,
  checkOutDate: undefined,
  adults: 2,
  children: 0,
  rooms: 1,
  priceRange: undefined,
  starRating: undefined,
  amenities: undefined,
  hotelType: undefined,
}

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchParams: (state, action: PayloadAction<Partial<SearchState>>) => {
      return { ...state, ...action.payload }
    },
    clearSearchParams: () => initialState,
  },
})

export const { setSearchParams, clearSearchParams } = searchSlice.actions
export const searchReducer = searchSlice.reducer

export const selectSearchParams = (state: { search: SearchState }): SearchState => state.search
EOF
```

**Step 2**: Update the store to include searchReducer with persistence

Now we need to add the search reducer to our store and set up localStorage persistence:

```bash
# Update store to include searchReducer with persistence
cat > src/store/index.ts << 'EOF'
import { configureStore } from '@reduxjs/toolkit'
import { baseApi } from '@/api/baseApi'
import { authReducer } from './authSlice'
import { searchReducer, type SearchState } from './searchSlice'

const STORAGE_KEY = 'lastSearch'

function loadSearchState(): SearchState | undefined {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return undefined
    return JSON.parse(raw) as SearchState
  } catch {
    return undefined
  }
}

const persistedSearch = loadSearchState()

export const store = configureStore({
  reducer: {
    auth: authReducer,
    search: searchReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  ...(persistedSearch && {
    preloadedState: {
      search: persistedSearch,
    },
  }),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
})

// Persist search state to localStorage
store.subscribe(() => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store.getState().search))
  } catch {
    // Handle error silently
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
EOF
```

**Step 3**: Verify the files were created

```bash
# Check searchSlice
cat src/store/searchSlice.ts

# Check updated store
cat src/store/index.ts
```

**Note**:

- **Skip this section for now** - Create SearchSlice when you implement the Home page with search functionality
- The search slice manages search parameters (dates, guests, filters, etc.)
- Search state is automatically persisted to localStorage
- This allows users to return to the search page and see their previous search parameters
- **When to create**: Create this when implementing the Home page that needs search state management

---

**What's Next After Section 12?**

At this point, you have:

- ✅ Base API configured
- ✅ Minimal types defined
- ✅ Auth slice and API created
- ✅ Providers set up (Theme, Notification, Loading, ErrorBoundary)
- ✅ Basic routing configured

**Next Steps (Implement Gradually)**:

1. **Implement Pages One at a Time**:
   - Start with **Login Page** (use auth components from Section 11, create Login page component)
   - Then **Home Page** (create Home API endpoint when needed, create SearchSlice when needed, create Home components incrementally)
   - Then **Hotel Page** (create Hotels API endpoint when needed, create Hotel components incrementally)
   - Continue with other pages incrementally

2. **For Each Page, Follow This Pattern**:
   - Create the page component (minimal at first - just a placeholder)
   - Add route for the page (update routes.tsx)
   - Test the route works
   - Create API endpoints needed for that page (if not already created - see Appendix for reference)
   - Add types needed for that page (expand types/models.ts incrementally)
   - Create components needed for that page (create components incrementally as you build the page)
   - Integrate everything and test

3. **Expand Theme Incrementally**:
   - Add custom button variants when you use them in components
   - Add custom typography variants when you use them
   - Add component overrides when you customize MUI components
   - Add MUI type declarations when you add custom variants (see Appendix for reference)

4. **Create Components/Hooks/Utilities When Needed**:
   - Don't create all components upfront (Section 13 is reference only)
   - Create VoyaLoader when you need loading indicators
   - Create FormField when you implement forms
   - Create hooks/utilities when you actually need them (Sections 14-15 are reference only)

**Reference**: See Appendix sections for complete implementations. Use them as reference, but build incrementally.

### 12.8 Example: Implementing Login Page Gradually

This section demonstrates the gradual development approach by showing how to implement the Login page step-by-step. Use this as a pattern for implementing other pages.

**Step 1**: Create minimal Login page component

Start with the absolute minimum - just a placeholder page:

```bash
# Create Login page directory
mkdir -p src/pages/Login

# Create minimal Login page
cat > src/pages/Login/Login.tsx << 'EOF'
import { Container, Typography } from '@mui/material'

export default function Login() {
  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Login Page
      </Typography>
      <Typography variant="body1">
        Login page placeholder - we'll add the form next.
      </Typography>
    </Container>
  )
}
EOF

# Create index file
cat > src/pages/Login/index.ts << 'EOF'
export { default } from './Login'
EOF
```

**Step 2**: Add route for Login page

Update routes to include the Login page:

```bash
# Update routes to include Login page
cat > src/routes/routes.tsx << 'EOF'
import { createBrowserRouter } from 'react-router-dom'
import Login from '@/pages/Login'

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <div>
        <h1>Voya - Travel & Accommodation Booking</h1>
        <p>Home page coming soon.</p>
      </div>
    ),
  },
  {
    path: '/login',
    element: <Login />,
  },
])
EOF
```

**Step 3**: Verify the route works

```bash
# Start dev server
pnpm dev
```

Navigate to `/login` and verify you see the Login page placeholder.

**Step 4**: Add Login form (incremental)

Now add the actual login form. We already have:

- Auth API (Section 11.2) ✅
- Auth components (Section 11.3-11.5) ✅
- Types (LoginRequestDto, LoginResponseDto) ✅

Create the Login form component:

```bash
# Create Login form component
cat > src/pages/Login/LoginForm.tsx << 'EOF'
import { useState } from 'react'
import { Button, TextField, Box, Typography } from '@mui/material'
import { useLoginMutation } from '@/api/auth'
import { setCredentials } from '@/store/authSlice'
import { useAppDispatch } from '@/hooks'
import { useNavigate } from 'react-router-dom'
import type { LoginRequestDto } from '@/types'

export function LoginForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [login, { isLoading }] = useLoginMutation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const result = await login({ userName: username, password } as LoginRequestDto).unwrap()
      dispatch(setCredentials({ token: result.authentication, userType: result.userType }))
      navigate('/home')
    } catch (error) {
      console.error('Login failed:', error)
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <TextField
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        fullWidth
        required
        sx={{ mb: 2 }}
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        required
        sx={{ mb: 2 }}
      />
      <Button type="submit" variant="contained" fullWidth disabled={isLoading}>
        {isLoading ? 'Logging in...' : 'Login'}
      </Button>
    </Box>
  )
}
EOF
```

**Step 5**: Update Login page to use the form

```bash
# Update Login page to include form
cat > src/pages/Login/Login.tsx << 'EOF'
import { Container, Typography } from '@mui/material'
import { LoginForm } from './LoginForm'

export default function Login() {
  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <LoginForm />
    </Container>
  )
}
EOF
```

**Step 6**: Test the Login page

```bash
# Start dev server
pnpm dev
```

Navigate to `/login`, enter credentials, and verify login works.

**Note**: This example shows the gradual approach:

1. ✅ Start with minimal page (placeholder)
2. ✅ Add route
3. ✅ Test route works
4. ✅ Add form component incrementally
5. ✅ Integrate with existing API and state
6. ✅ Test functionality

**Follow this same pattern for other pages**:

- Home page → Create placeholder → Add route → Add search bar → Add API → Add components incrementally
- Hotel page → Create placeholder → Add route → Add API → Add components incrementally
- etc.

---
