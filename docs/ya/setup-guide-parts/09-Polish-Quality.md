# Polish & Quality

> **Final touches** - Error Handling, Testing, Code Quality Tools, Git Hooks

This section covers the final polish and quality improvements: error handling, testing setup, code quality tools, and git hooks.

**Navigation**: [← Back to Index](00-README.md) | [← Previous: Feature 6](08-Feature-06-Admin-Dashboard.md)

---

## 13. Components (Reference - Create When Needed)

> **Gradual Development Approach**: This section provides **component examples as reference**. You should **NOT** create all components at once. Instead, create them incrementally when you actually need them while building pages and features:
>
> - **Common Components** (VoyaLoader, SafeImage) → Create when you need them in pages
> - **Form Components** (FormField) → Create when implementing forms (Login, Admin forms, etc.)
> - **Layout Components** → Create when implementing layouts
> - **Other Components** → Create as needed for each feature

### 13.1 Common Components (Create When Needed)

> **Note**: Create these components when you actually need them in your pages, not upfront. They're shown here as reference.

**When to create**:

- `VoyaLoader` → Create when you need loading indicators in pages/components
- `SafeImage` → Create when you need image components with error handling

**src/components/common/VoyaLoader.tsx**:

```typescript
import { CircularProgress, Box } from '@mui/material'

type Size = 'small' | 'medium' | 'large'

interface Props {
  size?: Size
}

const sizeMap: Record<Size, number> = {
  small: 24,
  medium: 40,
  large: 60,
}

export function VoyaLoader({ size = 'medium' }: Props) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 2 }}>
      <CircularProgress size={sizeMap[size]} />
    </Box>
  )
}
```

**src/components/common/index.ts**:

```typescript
export * from './VoyaLoader'
export * from './SafeImage'
```

**src/components/index.ts** (update as you add components):

```typescript
// Common components
export * from './common/VoyaLoader'
export * from './common/SafeImage'

// Auth components
export * from './auth'

// Layout components (add as you create them)
// export * from './layout/PageContainer'
// export * from './layout/Section'
// export * from './layout/ThemeToggle'
// export { LanguageSwitcher } from './layout/LanguageSwitcher'

// Form components (add as you create them)
// export * from './forms'

// Filter components (add as you create them)
// export * from './filters'

// Pattern components (add as you create them)
// export * from './patterns'
```

**Note**: Update `src/components/index.ts` incrementally as you create components in each section.

**src/components/common/SafeImage.tsx**:

```typescript
import { useState } from 'react'
import { Box, Typography } from '@mui/material'
import ImageBrokenIcon from '@mui/icons-material/BrokenImage'

interface Props {
  src: string
  alt: string
  [key: string]: unknown
}

export function SafeImage({ src, alt, ...props }: Props) {
  const [error, setError] = useState(false)

  if (error) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'grey.200',
          minHeight: 200,
        }}
      >
        <ImageBrokenIcon sx={{ fontSize: 48, color: 'grey.400' }} />
        <Typography variant="caption" color="text.secondary">
          {alt}
        </Typography>
      </Box>
    )
  }

  return <img src={src} alt={alt} onError={() => setError(true)} {...props} />
}
```

### 13.2 Form Components (Create When Implementing Forms)

> **Note**: Create form components when you implement forms (Login form, Admin forms, etc.), not upfront. They're shown here as reference.

**When to create**:

- `FormField` → Create when implementing forms that use Formik (Login form in Section 11, Admin forms in Section 12, etc.)

**src/components/forms/FormField.tsx** (Reference - Create when needed):

```typescript
import { TextField } from '@mui/material'
import type { TextFieldProps } from '@mui/material'
import { useFormikContext } from 'formik'
import type { FormikErrors, FormikTouched, FormikValues } from 'formik'

type FormFieldProps = Omit<TextFieldProps, 'name' | 'value' | 'onChange' | 'error' | 'helperText'> & {
  name: string
}

function getErrorMessage(error: unknown): string {
  if (error === null || error === undefined) return ' '
  if (typeof error === 'string') return error
  if (typeof error === 'object' && 'message' in error && typeof error.message === 'string') {
    return error.message
  }
  return ' '
}

export function FormField({ name, ...props }: FormFieldProps) {
  const { values, touched, errors, handleChange, handleBlur } = useFormikContext<FormikValues>()

  const fieldTouched = touched[name as keyof FormikTouched<FormikValues>] as boolean | undefined
  const fieldError = errors[name as keyof FormikErrors<FormikValues>] as unknown
  const hasError = Boolean(fieldTouched && fieldError)

  const errorMessage = hasError ? getErrorMessage(fieldError) : ' '

  const fieldValue = (values[name as keyof FormikValues] as string | number | undefined) ?? ''

  return (
    <TextField
      name={name}
      value={fieldValue}
      onChange={handleChange}
      onBlur={handleBlur}
      error={hasError}
      helperText={errorMessage}
      fullWidth
      {...props}
    />
  )
}
```

---

## 14. Custom Hooks

> **Gradual Development Approach**: This section provides **hook examples as reference**. You should create hooks incrementally when you actually need them:
>
> - **useRTL** → Created in Section 12.5 (needed for Providers)
> - **useDebounce** → Create when implementing search/autocomplete features
> - **useLocalStorage** → Create when you need localStorage management beyond what's already in slices
> - **Other hooks** → Create as needed for each feature

### 14.1 useRTL Hook

> **Note**: This hook is created here because it's needed for the Providers component in Section 12.5. It's the only hook we create upfront.

**Step 1**: Create useRTL hook

This hook manages RTL (Right-to-Left) direction based on the current i18n language.

```bash
# Create useRTL hook
cat > src/hooks/useRTL.ts << 'EOF'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export function useRTL() {
  const { i18n } = useTranslation()

  useEffect(() => {
    const isRTL = i18n.language === 'ar'
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr'
    document.documentElement.lang = i18n.language
  }, [i18n.language])
}
EOF
```

**Step 2**: Verify the file was created

```bash
cat src/hooks/useRTL.ts
```

**Step 3**: Update Providers to use useRTL

Now that we've created the `useRTL` hook, let's update the Providers component to use it:

```bash
# Update Providers to include useRTL
cat > src/providers/index.tsx << 'EOF'
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { type ReactNode } from 'react'
import { Provider } from 'react-redux'
import { store } from '@/store'
import { ThemeProvider, useThemeMode } from './ThemeContext'
import { NotificationProvider } from './NotificationProvider'
import { LoadingProvider } from './LoadingProvider'
import '@/i18n/config'
import { useRTL } from '@/hooks/useRTL'

function ThemeWrapper({ children }: { children: ReactNode }) {
  const { theme } = useThemeMode()
  useRTL()

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

**Step 4**: Verify the update

```bash
cat src/providers/index.tsx
```

### 14.2 useDebounce (Create When Needed)

> **Note**: Create this hook when you implement search/autocomplete features that need debouncing, not upfront.

**When to create**: Create when implementing search functionality (Home page search, Admin search, etc.)

**src/hooks/useDebounce.ts** (Reference - Create when needed):

```typescript
import { useEffect, useState } from 'react'

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}
```

### 14.3 useLocalStorage (Create When Needed)

> **Note**: Create this hook only if you need localStorage management beyond what's already handled in slices (authSlice, searchSlice). Most localStorage needs are already covered by slices.

**When to create**: Create only if you have specific localStorage needs that aren't covered by existing slices.

**src/hooks/useLocalStorage.ts** (Reference - Create when needed):

```typescript
import { useState, useEffect, useCallback } from 'react'

type SetValue<T> = T | ((val: T) => T)

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? (JSON.parse(item) as T) : initialValue
    } catch {
      return initialValue
    }
  })

  const setValue = useCallback(
    (value: SetValue<T>) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value
        setStoredValue(valueToStore)
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      } catch {
        console.error(`Error saving to localStorage key "${key}"`)
      }
    },
    [key, storedValue],
  )

  return [storedValue, setValue] as const
}
```

---

## 15. Utilities

> **Gradual Development Approach**: This section provides **utility examples as reference**. You should create utilities incrementally when you actually need them:
>
> - **Logger** → Create when you need logging (ErrorBoundary enhancement, API error logging, etc.)
> - **Global Error Handlers** → Create when you want to catch unhandled errors globally
> - **Other utilities** → Create as needed for each feature

### 15.1 Logger (Create When Needed)

> **Note**: Create the logger utility when you need it (e.g., to enhance ErrorBoundary, log API errors, etc.), not upfront. ErrorBoundary currently uses console.error, which is fine for now.

**When to create**: Create when you want to enhance ErrorBoundary logging (Section 12.6) or add logging to API error handling.

**src/utils/logger.ts** (Reference - Create when needed):

```typescript
export const logger = {
  info: (message: string, data?: unknown) => {
    console.info(`[INFO] ${new Date().toISOString()}:`, message, data ?? '')
  },
  warn: (message: string, data?: unknown) => {
    console.warn(`[WARN] ${new Date().toISOString()}:`, message, data ?? '')
  },
  error: (message: string, error?: unknown) => {
    console.error(`[ERROR] ${new Date().toISOString()}:`, message, error ?? '')
  },
}
```

### 15.2 Global Error Handlers (Create When Needed)

> **Note**: Create global error handlers when you want to catch unhandled promise rejections and runtime errors globally. This is optional and can be added later.

**When to create**: Create when you want to add global error handling (after creating logger utility).

**src/utils/globalErrors.ts** (Reference - Create when needed):

```typescript
import { logger } from './logger'

export const setupGlobalErrorHandlers = () => {
  window.addEventListener('unhandledrejection', (event) => {
    logger.error('Unhandled Promise Rejection', event.reason)
  })

  window.addEventListener('error', (event) => {
    logger.error('Global Runtime Error', event.error)
  })
}
```

**Note**: When you create this utility, you'll need to call `setupGlobalErrorHandlers()` in `main.tsx` before rendering the app. For now, you can skip creating this utility and add it later when you want global error handling.

---

## 16. Error Handling

> **Gradual Development Approach**: Error handling components should be created when you implement routes with error handling, not upfront.

### 16.1 Route Error Component (Create When Implementing Routes with Error Handling)

> **Note**: Create this component when you implement routes with error handling (see Appendix: Complete Routes Configuration). For now, you can skip this and add it later when you expand your routes.

**When to create**: Create when implementing the complete routes configuration with error elements (see Appendix).

**src/pages/Error/RouteError.tsx** (Reference - Create when needed):

```typescript
import { useRouteError, isRouteErrorResponse } from 'react-router-dom'
import { Box, Typography, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export function RouteError() {
  const error = useRouteError()
  const navigate = useNavigate()

  let errorMessage = 'An unexpected error occurred'

  if (isRouteErrorResponse(error)) {
    errorMessage = error.statusText || error.data?.message || errorMessage
  } else if (error instanceof Error) {
    errorMessage = error.message
  }

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
        Oops!
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        {errorMessage}
      </Typography>
      <Button variant="contained" onClick={() => navigate('/home')}>
        Go Home
      </Button>
    </Box>
  )
}
```

---

## 17. Testing Setup

> **Gradual Development Approach**: Testing setup can be done incrementally. You can set up the basic testing infrastructure now, and add tests as you build features. Alternatively, you can skip this section and set up testing later when you're ready to write tests.

### 17.1 Test Setup File

**setupTests.ts**:

```typescript
import '@testing-library/jest-dom/vitest'
import { beforeAll, afterEach, afterAll } from 'vitest'
import { server } from './src/tests/msw/server'
import i18n from './src/i18n/config'

beforeAll(() => {
  server.listen()
  void i18n.changeLanguage('en')
})

afterEach(() => {
  server.resetHandlers()
  void i18n.changeLanguage('en')
})

afterAll(() => server.close())
```

### 17.2 MSW Setup

**src/tests/msw/server.ts**:

```typescript
import { setupServer } from 'msw/node'
import { handlers } from './handlers'

export const server = setupServer(...handlers)
```

**src/tests/msw/handlers.ts**:

```typescript
import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get('/api/hotels', () => {
    return HttpResponse.json([])
  }),
  // Add more handlers as needed
]
```

---

## 18. Code Quality Tools

### 18.1 .gitignore

**.gitignore**:

```
# Dependencies
node_modules
.pnp
.pnp.js

# Testing
coverage

# Production
dist
build

# Misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local

npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# Editor
.vscode
.idea
*.swp
*.swo
*~

# TypeScript
*.tsbuildinfo
```

---

## 19. Git Hooks

### 19.1 Initialize Husky

```bash
# Initialize Husky
pnpm exec husky init

# Create pre-commit hook
echo "pnpm typecheck
pnpm lint-staged" > .husky/pre-commit

# Make it executable
chmod +x .husky/pre-commit
```

---

## 20. Final Steps

### 20.1 Create Public Assets

```bash
# Create public directory
mkdir -p public

# Add favicon
# Place favicon.svg in public/
# You can create a simple SVG favicon or download one
```

### 20.1.1 Create Component Index Files

As you create components throughout the guide, make sure to export them from their respective index files:

**src/components/auth/index.ts** (created in Section 11):

```typescript
export { default as ProtectedRoute } from './ProtectedRoute'
export { default as AdminRoute } from './AdminRoute'
export { default as RedirectIfAuthenticated } from './RedirectIfAuthenticated'
```

**src/components/common/index.ts** (created in Section 13):

```typescript
export * from './VoyaLoader'
export * from './SafeImage'
```

**src/pages/Home/index.ts** (example - create for each page):

```typescript
export { default } from './Home'
```

**Note**: Each page and component directory should have an `index.ts` file that exports the main component. This allows clean imports like `import Home from '@/pages/Home'` instead of `import Home from '@/pages/Home/Home'`.

### 20.2 Create README

**README.md**:

```markdown
# Voya - Travel & Accommodation Booking Platform

A modern, full-featured travel and accommodation booking platform.

## Setup

1. Install dependencies: `pnpm install`
2. Create `.env` file from `.env.example`
3. Run dev server: `pnpm dev`

## Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm test` - Run tests
- `pnpm lint` - Run linter
```

### 20.3 Verify Setup

```bash
# Type check
pnpm typecheck

# Lint
pnpm lint

# Test
pnpm test

# Build
pnpm build

# Start dev server
pnpm dev
```

### 20.4 Implementation Checklist

Use this checklist to track your progress:

**Foundation (Sections 1-5)**

- [ ] Prerequisites installed (Node.js, pnpm, Git)
- [ ] Vite project created
- [ ] All dependencies installed
- [ ] Configuration files created (TypeScript, Vite, ESLint, Prettier)
- [ ] Project structure created
- [ ] CSS reset added
- [ ] Main entry point configured

**Core Features (Sections 6-9)**

- [ ] Redux store configured
- [ ] Auth and search slices created
- [ ] Redux hooks created
- [ ] Basic routing configured
- [ ] MUI theme configured
- [ ] i18n configured with translation files

**API & Auth (Sections 10-11)**

- [ ] Base API configured
- [ ] All API endpoints created (auth, hotels, home, checkout, admin, searchResults, upload)
- [ ] Types/models.ts created
- [ ] Auth components created (ProtectedRoute, AdminRoute, RedirectIfAuthenticated)
- [ ] useAuth hook created

**UI & Pages (Sections 12-13)**

- [ ] Providers configured (Theme, Notification, Loading, ErrorBoundary)
- [ ] All page components created
- [ ] Layout components created (MainLayout, AdminLayout)
- [ ] Common components created (VoyaLoader, SafeImage)
- [ ] Form components created
- [ ] Routes updated to final version with lazy loading

**Utilities & Polish (Sections 14-16)**

- [ ] Custom hooks created (useRTL, useDebounce, useLocalStorage)
- [ ] Utilities created (logger, global error handlers)
- [ ] Error handling components created (RouteError)
- [ ] All index.ts files updated with exports

**Testing & Quality (Sections 17-19)**

- [ ] Testing setup complete (Vitest, MSW)
- [ ] Git hooks configured (Husky, lint-staged)
- [ ] .gitignore configured

**Final Verification**

- [ ] `pnpm typecheck` passes
- [ ] `pnpm lint` passes
- [ ] `pnpm test` passes
- [ ] `pnpm build` succeeds
- [ ] `pnpm dev` starts without errors
- [ ] All pages accessible and functional

---

## 🎯 Next Steps

After completing this setup guide:

1. **Review the Codebase**: Look at the existing implementation to understand patterns and best practices
2. **Implement Pages**: Start with Home, then Login, then other pages. Reference existing implementations for guidance
3. **Add Components**: Build reusable components as needed. Check `src/components/` for examples
4. **Connect API Endpoints**: Ensure all API calls are properly integrated with error handling
5. **Add Translations**: Expand i18n files as you add features
6. **Testing**: Write tests for critical paths (authentication, booking flow, admin operations)
7. **Polish**: Add loading states, error handling, animations, and responsive design
8. **Deploy**: Set up deployment pipeline (Vercel, Netlify, or your preferred platform)

## 📚 Additional Resources

- **Project Structure**: See `docs/PROJECT_STRUCTURE.md` for detailed architecture
- **Routes Documentation**: See `docs/ROUTES.md` for routing details
- **RTK Query Guide**: See `docs/RTK_AND_RTK_QUERY_GUIDE.md` for state management patterns
- **Study Guide**: See `docs/ya/STUDY_GUIDE.md` for comprehensive technology explanations

## ⚠️ Important Notes

1. **Gradual Development**: TypeScript errors during setup are normal. They resolve as you complete each section.

2. **Backend API**: Ensure the backend API is running and accessible at the URL specified in `.env`

3. **Type Definitions**: The complete `types/models.ts` file is large. Consider copying it from the existing codebase rather than typing it manually.

4. **Component Exports**: Remember to update `index.ts` files as you create components for clean imports.

5. **Testing**: Some tests may fail initially. Fix them as you implement the corresponding features.

6. **Git Workflow**: Follow the project's Git branch strategy (see `docs/GIT_BRANCH_STRATEGY.md`)

---

## 📚 Appendix: Complete Routes Configuration (Reference)

> **Note**: This is a **reference section** showing the complete routes configuration. You should **NOT** implement this during initial setup. Instead, build your routes incrementally as described in Section 7 and throughout the guide. Use this as a reference when you're ready to implement the full routing structure.

### When to Use This Reference

This complete routes configuration should only be implemented **after** you have:

1. ✅ Created all page components (Section 12)
2. ✅ Created layout components (Section 12)
3. ✅ Created auth components (Section 11)
4. ✅ Created VoyaLoader component (Section 13)
5. ✅ Created RouteError component (Section 16)

### Complete Routes Configuration

**src/routes/routes.tsx** (Complete version - for reference):

```typescript
import { lazy, Suspense, type ReactNode } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { Box } from '@mui/material'

import { ProtectedRoute, AdminRoute, RedirectIfAuthenticated } from '@/components/auth'
import { VoyaLoader } from '@/components'
import { RouteError } from '@/pages/Error/RouteError'

// Lazy load all pages and layouts for code splitting
const Home = lazy(() => import('@/pages/Home'))
const Login = lazy(() => import('@/pages/Login'))
const SearchResults = lazy(() => import('@/pages/SearchResults'))
const Hotel = lazy(() => import('@/pages/Hotel'))
const Checkout = lazy(() => import('@/pages/Checkout'))
const Confirmation = lazy(() => import('@/pages/Checkout/Confirmation'))
const NotFound = lazy(() => import('@/pages/NotFound'))

const AdminLayout = lazy(() => import('@/layouts/AdminLayout'))
const MainLayout = lazy(() => import('@/layouts/MainLayout'))

const Dashboard = lazy(() => import('@/pages/Admin/Dashboard'))
const Cities = lazy(() => import('@/pages/Admin/Cities'))
const Hotels = lazy(() => import('@/pages/Admin/Hotels'))
const Rooms = lazy(() => import('@/pages/Admin/Rooms'))

// Suspense wrapper for lazy-loaded components
const SuspenseLayout = ({ children }: { children: ReactNode }) => (
  <Suspense
    fallback={
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <VoyaLoader size="medium" />
      </Box>
    }
  >
    {children}
  </Suspense>
)

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <SuspenseLayout>
        <MainLayout />
      </SuspenseLayout>
    ),
    errorElement: <RouteError />,
    children: [
      { index: true, element: <Navigate to="/home" replace /> },

      {
        path: 'login',
        element: (
          <RedirectIfAuthenticated>
            <Login />
          </RedirectIfAuthenticated>
        ),
      },

      { path: 'home', element: <Home /> },
      { path: 'search', element: <SearchResults /> },
      { path: 'hotel/:hotelId', element: <Hotel /> },

      {
        path: 'checkout',
        element: (
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        ),
      },

      {
        path: '/checkout/confirmation',
        element: (
          <ProtectedRoute>
            <Confirmation />
          </ProtectedRoute>
        ),
      },
    ],
  },

  {
    path: '/admin',
    element: (
      <ProtectedRoute>
        <AdminRoute>
          <SuspenseLayout>
            <AdminLayout />
          </SuspenseLayout>
        </AdminRoute>
      </ProtectedRoute>
    ),
    errorElement: <RouteError />,
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'cities', element: <Cities /> },
      { path: 'hotels', element: <Hotels /> },
      { path: 'rooms', element: <Rooms /> },
    ],
  },

  {
    path: '*',
    element: (
      <SuspenseLayout>
        <NotFound />
      </SuspenseLayout>
    ),
    errorElement: <RouteError />,
  },
])
```

**Key Features of This Configuration:**

- **Lazy Loading**: All pages and layouts are lazy-loaded for better performance
- **Code Splitting**: Each route is loaded only when needed
- **Protected Routes**: Checkout and admin routes require authentication
- **Admin Routes**: Admin section requires both authentication and admin role
- **Error Handling**: RouteError component handles routing errors
- **Loading States**: Suspense with VoyaLoader shows loading during code splitting
- **Layouts**: MainLayout for public routes, AdminLayout for admin routes

**Remember**: Build this incrementally, not all at once! Start with Section 7's minimal setup and add routes as you build features.

---

## 📚 Appendix: Complete API Endpoints Reference

> **Important**: This appendix provides **complete API endpoint implementations as reference**. You should **NOT** create all of these at once. Instead, create them incrementally when you actually need them in the corresponding sections:
>
> - **Auth API** → Create in Section 11 when implementing login
> - **Hotels API** → Create in Section 12 when implementing hotel pages
> - **Home API** → Create in Section 12 when implementing home page
> - **Checkout API** → Create in Section 12 when implementing checkout
> - **Admin API** → Create in Section 12 when implementing admin features
> - **Other APIs** → Create as needed for each feature

### Auth API

**src/api/auth/index.ts**:

```typescript
import { baseApi } from '@/api/baseApi'

export type LoginRequest = {
  username: string
  password: string
}

export type LoginResponse = {
  token: string
  userType: string
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: 'auth/authenticate',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Auth'],
    }),
  }),
})

export const { useLoginMutation } = authApi
```

**Note**: The actual API response uses `authentication` instead of `token`, and `userName` instead of `username`. You may need to adjust the LoginRequest and LoginResponse types to match your backend API. Check the backend API documentation or Swagger spec for exact field names.

### Hotels API

**src/api/hotels/index.ts**:

```typescript
import { baseApi } from '@/api/baseApi'

export type HotelAmenityDto = {
  id: number
  name: string
  description?: string
}

export type RoomAmenityDto = {
  id: number
  name: string
  description: string
}

export type HotelRoomDto = {
  roomId: number
  roomNumber: number
  roomPhotoUrl: string
  roomType: string
  capacityOfAdults: number
  capacityOfChildren: number
  amenities: RoomAmenityDto[]
  price: number
  availability: boolean
}

export type HotelDto = {
  id: number
  name: string
  hotelName?: string
  location: string
  description: string
  hotelType: 'Boutique' | 'Resort' | 'Hotel' | 'Lodge' | 'Inn' | (string & {})
  starRating: number
  latitude?: number
  longitude?: number
  rooms: HotelRoomDto[]
  imageUrl?: string
  availableRooms?: number
  cityId?: number
  amenities: HotelAmenityDto[]
}

export type GetHotelsQuery = {
  searchQuery?: string
  pageNumber: number
  pageSize: number
}

export type HotelGalleryPhotoDto = {
  id: number
  url: string
}

export type HotelReviewDto = {
  reviewId: number
  customerName: string
  rating: number
  description: string
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
    getHotel: builder.query<HotelDto, number>({
      query: (id) => `hotels/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Hotel', id }],
    }),
    getHotelGallery: builder.query<HotelGalleryPhotoDto[], number>({
      query: (id) => `hotels/${id}/gallery`,
    }),
    getHotelRooms: builder.query<HotelRoomDto[], number>({
      query: (id) => `hotels/${id}/rooms`,
    }),
    getHotelReviews: builder.query<HotelReviewDto[], number>({
      query: (id) => `hotels/${id}/reviews`,
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

### Home API

**src/api/home/index.ts**:

```typescript
import type { AmenityDto } from '@/types'
import { baseApi } from '../baseApi'

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

export const homeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    homeSearch: build.query<SearchResultDto[], HomeSearchRequest>({
      query: (params) => ({
        url: '/home/search',
        method: 'GET',
        params,
      }),
      providesTags: ['Home'],
    }),
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
    amenities: build.query<AmenityDto[], void>({
      query: () => ({
        url: '/search-results/amenities',
        method: 'GET',
      }),
      providesTags: ['Amenities'],
    }),
  }),
})

export const {
  useHomeSearchQuery,
  useFeaturedDealsQuery,
  useRecentHotelsQuery,
  useTrendingDestinationsQuery,
  useAmenitiesQuery,
} = homeApi
```

### Checkout API

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
    getBookingById: builder.query<BookingDetailsDto, number>({
      query: (bookingId) => `/bookings/${bookingId}`,
    }),
  }),
})

export const { useCreateBookingMutation, useGetBookingByIdQuery } = checkoutApi
```

### Search Results API

**src/api/searchResults/index.ts**:

```typescript
import { baseApi } from '@/api/baseApi'

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

### Upload API

**src/api/upload/index.ts**:

```typescript
import { baseApi } from '../baseApi'
import type { PhotoDto } from '@/types'

export const uploadApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    uploadPhoto: build.mutation<PhotoDto, File>({
      query: (file) => {
        const formData = new FormData()
        formData.append('file', file)

        return {
          url: '/photos',
          method: 'POST',
          body: formData,
        }
      },
      invalidatesTags: ['Photos', 'Hotel', 'Rooms'],
    }),
  }),
})

export const { useUploadPhotoMutation } = uploadApi
```

### Admin API (Create Incrementally)

> **Important**: The Admin API should be created **incrementally**, not all at once. Start with Cities API (which uses types already defined), then add Hotels API (after adding Hotel types), then Rooms API (after adding Room types), and finally Dashboard API.

#### Step 1: Cities API (Start Here)

**Prerequisites**: CityDto and CityForCreationDto are already defined in Section 10.2 minimal types.

**src/api/admin/index.ts** (Initial - Cities only):

```typescript
import { baseApi } from '../baseApi'
import type { CityForCreationDto, CityDto } from '../../types/models'

export interface PaginationQuery {
  searchQuery?: string
  name?: string
  pageNumber?: number
  pageSize?: number
}

export const adminApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCities: build.query<CityDto[], PaginationQuery | void>({
      query: (params) => {
        if (!params) return '/cities'
        return { url: '/cities', params }
      },
      providesTags: ['Cities'],
    }),

    createCity: build.mutation<CityDto, CityForCreationDto>({
      query: (body) => ({
        url: '/cities',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Cities'],
    }),

    updateCity: build.mutation<CityDto, { id: number; data: CityForCreationDto }>({
      query: ({ id, data }) => ({
        url: `/cities/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Cities'],
    }),

    deleteCity: build.mutation<void, number>({
      query: (id) => ({
        url: `/cities/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Cities'],
    }),
  }),
})

export const {
  useGetCitiesQuery,
  useCreateCityMutation,
  useUpdateCityMutation,
  useDeleteCityMutation,
} = adminApi
```

**Step 2**: Update baseApi tagTypes to include 'Cities':

```typescript
// src/api/baseApi.ts
tagTypes: ['Auth', 'Cities'], // Added Cities tag
```

#### Step 2: Hotels API (Add After Creating Hotel Types)

**Prerequisites**: Add these types to `src/types/models.ts` before creating Hotels API:

```typescript
export interface HotelWithoutRoomsDto {
  id: number
  name: string
  location: string
  description: string
  hotelType: string
  starRating: number
  latitude?: number
  longitude?: number
  imageUrl?: string
  cityId?: number
  amenities: AmenityDto[]
}

export interface HotelForCreationDto {
  name: string
  location: string
  description: string
  hotelType: string
  starRating: number
  latitude?: number
  longitude?: number
  cityId?: number
  amenityIds?: number[]
}
```

**Then add to adminApi**:

```typescript
// Add to existing adminApi endpoints
getAdminHotels: build.query<HotelWithoutRoomsDto[], PaginationQuery | void>({
  query: (params) => {
    if (!params) return '/hotels'
    return { url: '/hotels', params }
  },
  providesTags: ['Hotel'],
}),

createHotel: build.mutation<HotelWithoutRoomsDto, HotelForCreationDto>({
  query: (body) => ({
    url: '/hotels',
    method: 'POST',
    body,
  }),
  invalidatesTags: ['Hotel'],
}),

updateHotel: build.mutation<HotelWithoutRoomsDto, { id: number; data: HotelForCreationDto }>({
  query: ({ id, data }) => ({
    url: `/hotels/${id}`,
    method: 'PUT',
    body: data,
  }),
  invalidatesTags: ['Hotel'],
}),

deleteHotel: build.mutation<void, number>({
  query: (id) => ({
    url: `/hotels/${id}`,
    method: 'DELETE',
  }),
  invalidatesTags: ['Hotel'],
}),
```

**Update exports**:

```typescript
export const {
  useGetCitiesQuery,
  useCreateCityMutation,
  useUpdateCityMutation,
  useDeleteCityMutation,
  useGetAdminHotelsQuery,
  useCreateHotelMutation,
  useUpdateHotelMutation,
  useDeleteHotelMutation,
} = adminApi
```

**Update baseApi tagTypes**:

```typescript
tagTypes: ['Auth', 'Cities', 'Hotel'], // Added Hotel tag
```

#### Step 3: Rooms API (Add After Creating Room Types)

**Prerequisites**: Add these types to `src/types/models.ts` before creating Rooms API:

```typescript
export interface RoomDto {
  id: number
  roomNumber: number
  roomPhotoUrl: string
  roomType: string
  capacityOfAdults: number
  capacityOfChildren: number
  price: number
  availability: boolean
  hotelId: number
  amenities: AmenityDto[]
}

export interface RoomForCreationDto {
  roomNumber: number
  roomPhotoUrl: string
  roomType: string
  capacityOfAdults: number
  capacityOfChildren: number
  price: number
  availability: boolean
  hotelId: number
  amenityIds?: number[]
}
```

**Then add to adminApi**:

```typescript
// Add to existing adminApi endpoints
getRoomsAdmin: build.query<RoomDto[], PaginationQuery | void>({
  query: (params) => {
    if (!params) return '/rooms'
    return { url: '/rooms', params }
  },
  providesTags: ['Rooms'],
}),

createRoom: build.mutation<RoomDto, RoomForCreationDto>({
  query: (body) => ({
    url: '/rooms',
    method: 'POST',
    body,
  }),
  invalidatesTags: ['Rooms'],
}),

updateRoom: build.mutation<RoomDto, { id: number; data: RoomForCreationDto }>({
  query: ({ id, data }) => ({
    url: `/rooms/${id}`,
    method: 'PUT',
    body: data,
  }),
  invalidatesTags: ['Rooms'],
}),

deleteRoom: build.mutation<void, number>({
  query: (id) => ({
    url: `/rooms/${id}`,
    method: 'DELETE',
  }),
  invalidatesTags: ['Rooms'],
}),
```

**Update exports**:

```typescript
export const {
  useGetCitiesQuery,
  useCreateCityMutation,
  useUpdateCityMutation,
  useDeleteCityMutation,
  useGetAdminHotelsQuery,
  useCreateHotelMutation,
  useUpdateHotelMutation,
  useDeleteHotelMutation,
  useGetRoomsAdminQuery,
  useCreateRoomMutation,
  useUpdateRoomMutation,
  useDeleteRoomMutation,
} = adminApi
```

**Update baseApi tagTypes**:

```typescript
tagTypes: ['Auth', 'Cities', 'Hotel', 'Rooms'], // Added Rooms tag
```

#### Step 4: Dashboard API (Add Last)

**Add to adminApi**:

```typescript
// Add to existing adminApi endpoints
getDashboardStats: build.query<
  {
    totalCities: number
    totalHotels: number
    totalRooms: number
    averageStarRating: number
    totalAvailableRooms: number
  },
  void
>({
  query: () => '/admin/dashboard',
  providesTags: ['Admin'],
}),
```

**Update exports**:

```typescript
export const {
  useGetCitiesQuery,
  useCreateCityMutation,
  useUpdateCityMutation,
  useDeleteCityMutation,
  useGetAdminHotelsQuery,
  useCreateHotelMutation,
  useUpdateHotelMutation,
  useDeleteHotelMutation,
  useGetRoomsAdminQuery,
  useCreateRoomMutation,
  useUpdateRoomMutation,
  useDeleteRoomMutation,
  useGetDashboardStatsQuery,
} = adminApi
```

**Update baseApi tagTypes**:

```typescript
tagTypes: ['Auth', 'Cities', 'Hotel', 'Rooms', 'Admin'], // Added Admin tag
```

**Note**:

- Create Admin API incrementally: Cities → Hotels → Rooms → Dashboard
- Add required types to `types/models.ts` before creating each API section
- Update `baseApi.tagTypes` after each addition
- This ensures the app doesn't break due to missing types

---

**Good luck building! 🚀**

_This guide provides the foundation. Refer to the existing codebase for complete implementations of each feature. If you encounter issues, check the troubleshooting section or review the existing code for patterns._
