# 🏗️ Voya Project - Complete Setup Guide

> **Step-by-step guide to recreate the entire Voya project from scratch**

---

## 📋 Table of Contents

1. [Prerequisites](#1-prerequisites)
2. [Initial Project Setup](#2-initial-project-setup)
3. [Configuration Files](#3-configuration-files)
4. [Project Structure](#4-project-structure)
5. [Core Setup](#5-core-setup)
6. [State Management](#6-state-management)
7. [Routing](#7-routing)
8. [UI Framework & Theme](#8-ui-framework--theme)
9. [Internationalization](#9-internationalization)
10. [API Integration](#10-api-integration)
11. [Authentication](#11-authentication)
12. [Pages Implementation](#12-pages-implementation)
13. [Components](#13-components)
14. [Custom Hooks](#14-custom-hooks)
15. [Utilities](#15-utilities)
16. [Error Handling](#16-error-handling)
17. [Testing Setup](#17-testing-setup)
18. [Code Quality Tools](#18-code-quality-tools)
19. [Git Hooks](#19-git-hooks)
20. [Final Steps](#20-final-steps)

---

## 1. Prerequisites

### 1.1 Install Required Software

```bash
# Node.js (v18 or higher)
# Download from: https://nodejs.org/

# PNPM (recommended) or npm
npm install -g pnpm

# Git
# Download from: https://git-scm.com/

# Verify installations
node --version  # Should be v18+
pnpm --version  # Should be 8.0+
git --version   # Any recent version
```

### 1.2 Create GitHub Repository

```bash
# Create new repository on GitHub
# Then clone it locally:
git clone <your-repo-url>
cd voya
```

---

## 2. Initial Project Setup

### 2.1 Initialize Project

```bash
# Initialize package.json
pnpm init

# Update package.json with these fields:
```

**package.json** (initial structure):

```json
{
  "name": "voya",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview"
  }
}
```

### 2.2 Install Core Dependencies

```bash
# React and TypeScript
pnpm add react@^19.2.0 react-dom@^19.2.0
pnpm add -D typescript@~5.9.3 @types/react@^19.2.5 @types/react-dom@^19.2.3

# Vite and React plugin
pnpm add -D vite@^7.2.4 @vitejs/plugin-react@^5.1.1

# React Router
pnpm add react-router-dom@^7.9.6
```

### 2.3 Install UI Dependencies

```bash
# Material-UI
pnpm add @mui/material@^7.3.5 @mui/icons-material@^7.3.5
pnpm add @emotion/react@^11.14.0 @emotion/styled@^11.14.1

# MUI X Components
pnpm add @mui/x-data-grid@^8.19.0 @mui/x-date-pickers@^8.19.0
```

### 2.4 Install State Management

```bash
# Redux Toolkit
pnpm add @reduxjs/toolkit@^2.11.1 react-redux@^9.2.0
```

### 2.5 Install Form Handling

```bash
# Formik and Yup
pnpm add formik@^2.4.9 yup@^1.7.1
```

### 2.6 Install Internationalization

```bash
# i18next
pnpm add i18next@^25.7.3 react-i18next@^16.5.0 i18next-browser-languagedetector@^8.2.0
```

### 2.7 Install Additional Libraries

```bash
# Utilities
pnpm add date-fns@^4.1.0 axios@^1.13.2

# Maps
pnpm add leaflet@^1.9.4 react-leaflet@^5.0.0
pnpm add -D @types/leaflet@^1.9.21

# Image Gallery
pnpm add react-image-gallery@^1.4.0
pnpm add -D @types/react-image-gallery@^1.2.4

# Notifications
pnpm add notistack@^3.0.2 react-toastify@^11.0.5
```

### 2.8 Install Dev Dependencies

```bash
# Testing
pnpm add -D vitest@^4.0.13 @testing-library/react@^16.3.0 @testing-library/jest-dom@^6.9.1 @testing-library/user-event@^14.6.1 jsdom@^27.2.0 msw@^2.12.4

# Linting and Formatting
pnpm add -D eslint@^9.39.1 @typescript-eslint/eslint-plugin@^8.47.0 @typescript-eslint/parser@^8.47.0 typescript-eslint@^8.46.4
pnpm add -D eslint-config-prettier@^10.1.8 eslint-plugin-react-hooks@^7.0.1 eslint-plugin-react-refresh@^0.4.24
pnpm add -D prettier@^3.6.2

# Git Hooks
pnpm add -D husky@^9.1.7 lint-staged@^16.2.7

# React Compiler
pnpm add -D babel-plugin-react-compiler@^1.0.0

# Additional
pnpm add -D @types/node@^24.10.1 globals@^16.5.0 openapi-typescript@^7.10.1
```

---

## 3. Configuration Files

### 3.1 TypeScript Configuration

**tsconfig.json** (root):

```json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" },
    { "path": "./tsconfig.test.json" }
  ]
}
```

**tsconfig.app.json**:

```json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "target": "ES2022",
    "useDefineForClassFields": true,
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "types": ["vite/client"],
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"],
  "exclude": ["src/**/*.test.ts", "src/**/*.test.tsx", "src/**/__tests__/*", "src/setupTests.ts"]
}
```

**tsconfig.node.json**:

```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "types": ["node"]
  },
  "include": ["vite.config.ts"]
}
```

**tsconfig.test.json**:

```json
{
  "extends": "./tsconfig.app.json",
  "compilerOptions": {
    "types": ["vitest/globals", "@testing-library/jest-dom"]
  },
  "include": ["src/**/*.test.ts", "src/**/*.test.tsx", "setupTests.ts"]
}
```

### 3.2 Vite Configuration

**vite.config.ts**:

```typescript
/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'mui-vendor': ['@mui/material', '@mui/icons-material', '@mui/x-data-grid'],
          'redux-vendor': ['@reduxjs/toolkit', 'react-redux'],
          'form-vendor': ['formik', 'yup'],
          'i18n-vendor': ['react-i18next', 'i18next'],
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './setupTests.ts',
    css: false,
  },
})
```

### 3.3 ESLint Configuration

**eslint.config.js**:

```javascript
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import tseslint from 'typescript-eslint'
import prettier from 'eslint-config-prettier'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  {
    ignores: ['dist', 'node_modules', 'vitest.config.ts', 'setupTests.ts'],
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: globals.browser,
      parser: tseslint.parser,
      parserOptions: {
        project: [
          './tsconfig.json',
          './tsconfig.app.json',
          './tsconfig.node.json',
          './tsconfig.test.json',
        ],
        tsconfigRootDir: process.cwd(),
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      'react-hooks': reactHooks,
    },
    extends: [js.configs.recommended, ...tseslint.configs.recommendedTypeChecked, prettier],
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
  {
    files: ['**/*.test.ts', '**/*.test.tsx', '**/__tests__/**/*'],
    rules: {
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
    },
  },
])
```

### 3.4 Prettier Configuration

**.prettierrc**:

```json
{
  "singleQuote": true,
  "semi": false,
  "printWidth": 100,
  "tabWidth": 2,
  "trailingComma": "all"
}
```

### 3.5 Environment Variables

**.env.example**:

```env
VITE_API_BASE_URL=https://travel-and-accommodation-booking-static.onrender.com
```

**.env** (create from .env.example):

```env
VITE_API_BASE_URL=https://travel-and-accommodation-booking-static.onrender.com
```

### 3.6 HTML Entry Point

**index.html**:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Voya - Travel & Accommodation Booking</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

### 3.7 Update package.json Scripts

**package.json** (complete scripts section):

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview",
    "format": "prettier . --write",
    "format:check": "prettier . --check",
    "test": "vitest run",
    "test:watch": "vitest",
    "prepare": "husky",
    "gen:api": "openapi-typescript http://localhost:5000/swagger.json -o src/types/api.ts",
    "typecheck": "tsc -p tsconfig.app.json --noEmit",
    "verify": "pnpm typecheck && pnpm lint && pnpm test && pnpm build",
    "verify:stage": "git add . && pnpm verify"
  },
  "lint-staged": {
    "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.{js,jsx,json,md,css}": ["prettier --write"]
  }
}
```

---

## 4. Project Structure

### 4.1 Create Directory Structure

```bash
mkdir -p src/{api/{admin,auth,checkout,home,hotels,searchResults,upload},assets/{fonts,icons,images},components/{auth,common,error,filters,forms,hoc,layout,patterns},constants,hooks/{tests},i18n/locales,layouts/{AdminLayout,MainLayout},pages/{Admin/{Cities,Hotels,Rooms,Dashboard},Checkout/Confirmation,Error,Home,Hotel,Login,NotFound,SearchResults},providers,routes,store,styles,theme,types,utils/{tests}}
```

### 4.2 Create Index Files

```bash
# Create index files for easy imports
touch src/components/index.ts
touch src/components/common/index.ts
touch src/components/forms/index.ts
touch src/components/auth/index.ts
touch src/components/error/index.ts
touch src/components/hoc/index.ts
touch src/components/layout/index.ts
touch src/components/patterns/index.ts
touch src/constants/index.ts
touch src/hooks/index.ts
touch src/pages/Home/index.ts
touch src/pages/Login/index.ts
touch src/pages/SearchResults/index.ts
touch src/pages/Hotel/index.ts
touch src/pages/Checkout/index.ts
touch src/pages/Admin/index.ts
touch src/providers/index.ts
touch src/utils/index.ts
touch src/types/index.ts
```

---

## 5. Core Setup

### 5.1 CSS Reset

**src/styles/reset.css**:

```css
/* Basic CSS reset - copy from existing project or use normalize.css */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  height: 100%;
}

body {
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell',
    'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

### 5.2 Main Entry Point

**src/main.tsx**:

```typescript
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/styles/reset.css'
import App from '@/App.tsx'
import { ErrorBoundary } from '@/providers/ErrorBoundary.tsx'
import { setupGlobalErrorHandlers } from '@/utils/globalErrors'
import { Providers } from '@/providers/index.tsx'

setupGlobalErrorHandlers()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <Providers>
        <App />
      </Providers>
    </ErrorBoundary>
  </StrictMode>,
)
```

### 5.3 App Component

**src/App.tsx**:

```typescript
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/routes'

function App() {
  return <RouterProvider router={router} />
}

export default App
```

---

## 6. State Management

### 6.1 Redux Store Setup

**src/store/index.ts**:

```typescript
import { configureStore } from '@reduxjs/toolkit'
import { baseApi } from '@/api/baseApi'
import { searchReducer, type SearchState } from './searchSlice'
import { authReducer } from './authSlice'

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

### 6.2 Auth Slice

**src/store/authSlice.ts**:

```typescript
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
  token: string | null
  userType: string | null
}

const initialState: AuthState = {
  token: localStorage.getItem('token'),
  userType: localStorage.getItem('userType'),
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ token: string; userType: string }>) => {
      state.token = action.payload.token
      state.userType = action.payload.userType
    },
    logout: (state) => {
      state.token = null
      state.userType = null
    },
  },
})

export const { setCredentials, logout } = authSlice.actions

interface RootStatePartial {
  auth: AuthState
}

export const selectToken = (state: RootStatePartial): string | null => state?.auth?.token
export const selectUserType = (state: RootStatePartial): string | null =>
  state?.auth?.userType ?? null
export const selectIsAuthenticated = (state: RootStatePartial): boolean =>
  Boolean(state?.auth?.token)
export const selectIsAdmin = (state: RootStatePartial): boolean => state?.auth?.userType === 'Admin'

export const authReducer = authSlice.reducer
```

### 6.3 Search Slice

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

### 6.4 Redux Hooks

**src/hooks/index.ts**:

```typescript
import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux'
import type { RootState, AppDispatch } from '@/store'

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
```

---

## 7. Routing

### 7.1 Routes Configuration

**src/routes/routes.tsx**:

```typescript
import { lazy, Suspense, type ReactNode } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { Box } from '@mui/material'
import ProtectedRoute from '@/components/auth/ProtectedRoute'
import AdminRoute from '@/components/auth/AdminRoute'
import RedirectIfAuthenticated from '@/components/auth/RedirectIfAuthenticated'
import { VoyaLoader } from '@/components'
import { RouteError } from '@/pages/Error/RouteError'

// Lazy load pages
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

---

## 8. UI Framework & Theme

### 8.1 Theme Configuration

**src/theme/index.ts**:

```typescript
import '@/types/mui.d.ts'
import {
  createTheme,
  responsiveFontSizes,
  type Shadows,
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
    h1: { fontSize: '2.25rem', fontWeight: 700, lineHeight: 1.2 },
    h2: { fontSize: '1.875rem', fontWeight: 700, lineHeight: 1.25 },
    h3: { fontSize: '1.5rem', fontWeight: 600, lineHeight: 1.3 },
    h4: { fontSize: '1.25rem', fontWeight: 600, lineHeight: 1.35 },
    h5: { fontSize: '1.125rem', fontWeight: 500, lineHeight: 1.4 },
    h6: { fontSize: '1rem', fontWeight: 500, lineHeight: 1.4 },
    body1: { fontSize: '1rem', fontWeight: 400, lineHeight: 1.6 },
    body2: { fontSize: '0.875rem', fontWeight: 400, lineHeight: 1.6 },
    button: { textTransform: 'none', fontWeight: 600, fontSize: '0.95rem' },
  },
  spacing: 8,
  shape: {
    borderRadius: 8,
  },
  shadows: [
    'none',
    mode === 'dark' ? '0px 1px 3px rgba(0, 0, 0, 0.3)' : '0px 1px 3px rgba(0, 0, 0, 0.12)',
    // ... more shadows
    ...Array.from({ length: 20 }, () => 'none'),
  ] as Shadows,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 20px',
        },
      },
      defaultProps: {
        disableElevation: true,
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
})

export const createAppTheme = (
  mode: 'light' | 'dark' = 'light',
  direction: 'ltr' | 'rtl' = 'ltr',
) => {
  return responsiveFontSizes(createTheme(getThemeOptions(mode, direction)))
}

export const theme = createAppTheme('light')
```

### 8.2 MUI Type Declarations

**src/types/mui.d.ts**:

```typescript
import '@mui/material/styles'

declare module '@mui/material/styles' {
  interface TypographyVariants {
    price: React.CSSProperties
    label: React.CSSProperties
  }

  interface TypographyVariantsOptions {
    price?: React.CSSProperties
    label?: React.CSSProperties
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    price: true
    label: true
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    primary: true
    secondary: true
    danger: true
    soft: true
  }
}
```

### 8.3 Theme Context

**src/providers/ThemeContext.tsx**:

```typescript
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
```

---

## 9. Internationalization

### 9.1 i18n Configuration

**src/i18n/config.ts**:

```typescript
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import enTranslations from './locales/en.json'
import arTranslations from './locales/ar.json'

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslations,
      },
      ar: {
        translation: arTranslations,
      },
    },
    fallbackLng: 'en',
    defaultNS: 'translation',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'voya-language',
    },
  })

export default i18n
```

### 9.2 Translation Files

**src/i18n/locales/en.json**:

```json
{
  "common": {
    "home": "Home",
    "search": "Search",
    "login": "Login",
    "logout": "Logout"
  },
  "home": {
    "searchStays": "Search for your perfect stay",
    "featuredDeals": "Featured Deals",
    "recentHotels": "Recently Visited",
    "trendingDestinations": "Trending Destinations"
  }
}
```

**src/i18n/locales/ar.json**:

```json
{
  "common": {
    "home": "الرئيسية",
    "search": "بحث",
    "login": "تسجيل الدخول",
    "logout": "تسجيل الخروج"
  },
  "home": {
    "searchStays": "ابحث عن إقامتك المثالية",
    "featuredDeals": "عروض مميزة",
    "recentHotels": "زيارات حديثة",
    "trendingDestinations": "الوجهات الرائجة"
  }
}
```

---

## 10. API Integration

### 10.1 Base API Configuration

**src/api/baseApi.ts**:

```typescript
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL as string,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token')
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: ['Auth', 'Home', 'Hotel', 'Rooms', 'Cities', 'Amenities', 'Booking', 'Admin', 'Photos'],
  endpoints: () => ({}),
})
```

### 10.2 API Endpoints

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

**src/api/hotels/index.ts**:

```typescript
import { baseApi } from '@/api/baseApi'

export type HotelDto = {
  id: number
  name: string
  location: string
  description: string
  hotelType: string
  starRating: number
  latitude?: number
  longitude?: number
  imageUrl?: string
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
    getHotel: builder.query<HotelDto, number>({
      query: (id) => `hotels/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Hotel', id }],
    }),
  }),
})

export const { useGetHotelsQuery, useGetHotelQuery } = hotelsApi
```

_(Continue with other API endpoints following the same pattern)_

---

## 11. Authentication

### 11.1 Protected Route Component

**src/components/auth/ProtectedRoute.tsx**:

```typescript
import { Navigate, useLocation } from 'react-router-dom'
import type { ReactElement } from 'react'

interface Props {
  children: ReactElement
}

export default function ProtectedRoute({ children }: Props): ReactElement {
  const token = localStorage.getItem('token')
  const location = useLocation()

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}
```

### 11.2 Admin Route Component

**src/components/auth/AdminRoute.tsx**:

```typescript
import { Navigate } from 'react-router-dom'
import type { ReactElement } from 'react'
import { useAppSelector } from '@/hooks'
import { selectUserType } from '@/store/authSlice'

interface Props {
  children: ReactElement
}

export default function AdminRoute({ children }: Props): ReactElement {
  const userType = useAppSelector(selectUserType)

  if (userType !== 'Admin') {
    return <Navigate to="/home" replace />
  }

  return children
}
```

### 11.3 Redirect If Authenticated

**src/components/auth/RedirectIfAuthenticated.tsx**:

```typescript
import { Navigate } from 'react-router-dom'
import type { ReactElement } from 'react'
import { useAppSelector } from '@/hooks'
import { selectIsAuthenticated } from '@/store/authSlice'

interface Props {
  children: ReactElement
}

export default function RedirectIfAuthenticated({ children }: Props): ReactElement {
  const isAuthenticated = useAppSelector(selectIsAuthenticated)

  if (isAuthenticated) {
    return <Navigate to="/home" replace />
  }

  return children
}
```

### 11.4 useAuth Hook

**src/hooks/useAuth.ts**:

```typescript
import { useCallback } from 'react'
import { useAppSelector, useAppDispatch } from './index'
import { selectToken, selectUserType, logout as logoutAction } from '@/store/authSlice'
import { useNavigate } from 'react-router-dom'

export function useAuth() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const token = useAppSelector(selectToken)
  const userType = useAppSelector(selectUserType)

  const isAuthenticated = Boolean(token)
  const isAdmin = userType === 'Admin'
  const isUser = userType === 'User'

  const logout = useCallback(() => {
    dispatch(logoutAction())
    localStorage.removeItem('token')
    localStorage.removeItem('userType')
    void navigate('/login', { replace: true })
  }, [dispatch, navigate])

  return {
    isAuthenticated,
    isAdmin,
    isUser,
    token,
    userType,
    logout,
  }
}
```

---

## 12. Pages Implementation

### 12.1 Providers Setup

**src/providers/index.tsx**:

```typescript
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
```

### 12.2 Error Boundary

**src/providers/ErrorBoundary.tsx**:

```typescript
import { Component, type ReactNode, type ErrorInfo } from 'react'
import { Box, Button, Typography, Stack } from '@mui/material'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import { logger } from '@/utils/logger'

type ErrorBoundaryProps = {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: ErrorInfo) => void
}

type ErrorBoundaryState = {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    logger.error('Error Boundary caught an error', { error, errorInfo })
    this.props.onError?.(error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '400px',
            p: 3,
            textAlign: 'center',
          }}
        >
          <ErrorOutlineIcon sx={{ fontSize: 64, color: 'error.main', mb: 2 }} />
          <Typography variant="h5" gutterBottom>
            Something went wrong
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            {this.state.error?.message || 'An unexpected error occurred'}
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button variant="contained" onClick={() => window.location.reload()}>
              Reload Page
            </Button>
          </Stack>
        </Box>
      )
    }

    return this.props.children
  }
}
```

### 12.3 Basic Page Structure

**src/pages/Home/Home.tsx** (example):

```typescript
import { Container } from '@mui/material'
import { PageContainer } from '@/components/layout/PageContainer'
import { HomeSearchBar } from './components/HomeSearchBar'
import { FeaturedDealsSection } from './components/FeaturedDealsSection'
import { useTranslation } from 'react-i18next'

export default function Home() {
  const { t } = useTranslation()

  return (
    <PageContainer>
      <Container maxWidth="lg">
        <HomeSearchBar />
        <FeaturedDealsSection />
      </Container>
    </PageContainer>
  )
}
```

**src/pages/Home/index.ts**:

```typescript
export { default } from './Home'
```

_(Repeat this pattern for all pages)_

---

## 13. Components

### 13.1 Common Components

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

### 13.2 Form Components

**src/components/forms/FormField.tsx**:

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

### 14.1 useDebounce

**src/hooks/useDebounce.ts**:

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

### 14.2 useLocalStorage

**src/hooks/useLocalStorage.ts**:

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

### 15.1 Logger

**src/utils/logger.ts**:

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

### 15.2 Global Error Handlers

**src/utils/globalErrors.ts**:

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

---

## 16. Error Handling

### 16.1 Route Error Component

**src/pages/Error/RouteError.tsx**:

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
```

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

- [ ] All configuration files created
- [ ] Project structure set up
- [ ] State management implemented
- [ ] Routing configured
- [ ] Theme and i18n set up
- [ ] API integration complete
- [ ] Authentication flow working
- [ ] All pages implemented
- [ ] Components created
- [ ] Custom hooks implemented
- [ ] Utilities added
- [ ] Error handling in place
- [ ] Testing setup complete
- [ ] Git hooks configured
- [ ] Documentation written

---

## 🎯 Next Steps

1. **Implement Pages**: Start with Home, then Login, then other pages
2. **Add Components**: Build reusable components as needed
3. **API Integration**: Connect all API endpoints
4. **Testing**: Write tests for critical paths
5. **Polish**: Add loading states, error handling, animations
6. **Deploy**: Set up deployment pipeline

---

**Good luck building! 🚀**

_This guide provides the foundation. Refer to the existing codebase for complete implementations of each feature._
