# Foundation: Voya-Specific Setup

> **Voya-specific foundation** - Project Structure, Core Setup, State Management, Routing, Theme, i18n, API, Auth

This section covers the Voya-specific foundation setup: project structure, Redux, React Router, MUI Theme, i18n, API configuration, and authentication setup.

**Navigation**: [← Back to Index](00-README.md) | [← Previous: Common Setup](01-Foundation-Common-Setup.md) | [Next: Feature 1 →](03-Feature-01-Home-Page.md)

---

## 4. Project Structure

### 4.1 Create Directory Structure

**Step 1**: Create all directories at once (Linux/Mac/Git Bash)

**Step 1 (Recommended - Works reliably in Git Bash on Windows)**: Create directories one by one

```bash
# API directories
mkdir -p src/api/admin
mkdir -p src/api/auth
mkdir -p src/api/checkout
mkdir -p src/api/home
mkdir -p src/api/hotels
mkdir -p src/api/searchResults
mkdir -p src/api/upload

# Components directories
mkdir -p src/components/auth
mkdir -p src/components/common
mkdir -p src/components/error
mkdir -p src/components/filters
mkdir -p src/components/forms
mkdir -p src/components/layout
mkdir -p src/components/patterns

# Other directories
mkdir -p src/constants
mkdir -p src/hooks/tests
mkdir -p src/i18n/locales
mkdir -p src/layouts/AdminLayout
mkdir -p src/layouts/MainLayout
mkdir -p src/pages/Admin/Cities
mkdir -p src/pages/Admin/Hotels
mkdir -p src/pages/Admin/Rooms
mkdir -p src/pages/Admin/Dashboard
mkdir -p src/pages/Checkout/Confirmation
mkdir -p src/pages/Error
mkdir -p src/pages/Home
mkdir -p src/pages/Hotel
mkdir -p src/pages/Login
mkdir -p src/pages/NotFound
mkdir -p src/pages/SearchResults
mkdir -p src/providers
mkdir -p src/routes
mkdir -p src/store
mkdir -p src/styles
mkdir -p src/tests/msw
mkdir -p src/theme
mkdir -p src/types
mkdir -p src/utils/tests
```

**Step 2**: Verify directories were created

```bash
# Check the structure
tree src -d -L 3

# Or if tree is not available, use:
find src -type d | sort
```

### 4.2 Create Index Files

**Step 1**: Create all index files for easy imports

```bash
# Component index files
touch src/components/index.ts
touch src/components/auth/index.ts
touch src/components/common/index.ts
touch src/components/error/index.ts
touch src/components/filters/index.ts
touch src/components/forms/index.ts
touch src/components/layout/index.ts
touch src/components/patterns/index.ts

# Hooks and utilities
touch src/hooks/index.ts
touch src/utils/index.ts

# Constants and types
touch src/constants/index.ts
touch src/types/index.ts

# Store and theme
touch src/store/index.ts
touch src/theme/index.ts

# Layouts
touch src/layouts/AdminLayout/index.ts
touch src/layouts/MainLayout/index.ts

# Providers
touch src/providers/index.ts

# Pages - Main pages
touch src/pages/Home/index.ts
touch src/pages/Login/index.ts
touch src/pages/SearchResults/index.ts
touch src/pages/Hotel/index.ts
touch src/pages/Error/index.ts
touch src/pages/NotFound/index.ts

# Pages - Checkout
touch src/pages/Checkout/index.ts
touch src/pages/Checkout/Confirmation/index.ts

# Pages - Admin
touch src/pages/Admin/Cities/index.ts
touch src/pages/Admin/Hotels/index.ts
touch src/pages/Admin/Rooms/index.ts
touch src/pages/Admin/Dashboard/index.ts
```

**Step 2**: Verify index files were created

```bash
# Check that all index files exist
find src -name "index.ts" | sort

# Count them (should be 29 files)
find src -name "index.ts" | wc -l
```

**Note**: These index files are currently empty. You'll populate them with exports as you create the actual components, utilities, and types in later sections of this guide.

---

## 5. Core Setup

### 5.1 CSS Reset

**Step 1**: Create the styles directory

```bash
# Create the styles directory inside src
mkdir -p src/styles
```

**Step 2**: Create the reset.css file

```bash
# Create the reset.css file
touch src/styles/reset.css
```

**Step 3**: Add the CSS reset content to the file

**Option A - Using a text editor**: Open `src/styles/reset.css` in your editor and paste the following content:

**Option B - Using terminal**:

```bash
# Create reset.css with Eric Meyer's CSS Reset
cat > src/styles/reset.css << 'EOF'
/* http://meyerweb.com/eric/tools/css/reset/
   v2.0 | 20110126
   License: none (public domain)
*/

html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}
body {
  line-height: 1;
}
ol,
ul {
  list-style: none;
}
blockquote,
q {
  quotes: none;
}
blockquote:before,
blockquote:after,
q:before,
q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
EOF
```

**Step 4**: Verify the file was created correctly

```bash
# Check that the file exists and has content
ls -la src/styles/reset.css
cat src/styles/reset.css | head -20
```

### 5.2 Main Entry Point (Initial Setup)

**Step 1**: Update main.tsx to import the CSS reset

At this stage, we'll start with a minimal setup - just importing the CSS reset and rendering the App component. We'll add more features (ErrorBoundary, Providers, etc.) incrementally as we create them in later sections.

```bash
# Update main.tsx with minimal setup
cat > src/main.tsx << 'EOF'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/styles/reset.css'
import App from '@/App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
EOF
```

**Step 2**: Verify the file was updated

```bash
# Check the updated content
cat src/main.tsx
```

**Step 3**: Test that the app runs

```bash
# Start the dev server to verify everything works
pnpm dev
```

Press `Ctrl+C` to stop the server after verifying it starts without errors.

**Note**: We'll update `main.tsx` again in later sections to add:

- ErrorBoundary (Section 16: Error Handling)
- Global error handlers (Section 15: Utilities)
- Providers (Section 12: Pages Implementation)

### 5.3 App Component (Initial Setup)

**Step 1**: Update App.tsx with a minimal placeholder

At this stage, we'll create a simple App component. We'll update it to use routing in Section 7 (Routing) once we create the routes.

```bash
# Update App.tsx with minimal setup
cat > src/App.tsx << 'EOF'
function App() {
  return (
    <div>
      <h1>Voya - Travel & Accommodation Booking</h1>
      <p>App is running! We'll add routing in Section 7.</p>
    </div>
  )
}

export default App
EOF
```

**Step 2**: Verify the file was updated

```bash
# Check the updated content
cat src/App.tsx
```

**Step 3**: Verify the app displays correctly

```bash
# If the dev server is running, check your browser
# You should see "Voya - Travel & Accommodation Booking" and the message
```

**Note**: We'll update `App.tsx` in Section 7 (Routing) to use `RouterProvider` once we create the routes configuration.

---

## 6. State Management

> **Gradual Development Approach**: In this section, we'll set up only the **minimal Redux store structure**. We'll add slices (authSlice, searchSlice) incrementally when we actually need them:
>
> - **Auth Slice**: Will be created in Section 11 (Authentication) when implementing login
> - **Search Slice**: Will be created in Section 12 (Pages Implementation) when implementing the Home page search functionality
> - **API Integration**: Will be added in Section 10 (API Integration)

### 6.1 Minimal Redux Store Setup

**Step 1**: Create the minimal store structure

At this stage, we'll create just the basic store configuration without any slices. This is the standard minimal setup when starting a new project.

```bash
# Create the minimal store
cat > src/store/index.ts << 'EOF'
import { configureStore } from '@reduxjs/toolkit'

// Minimal store setup - we'll add reducers as we create slices
export const store = configureStore({
  reducer: {
    // Reducers will be added here incrementally:
    // - auth: authReducer (added in Section 11)
    // - search: searchReducer (added in Section 12)
    // - api: baseApi.reducer (added in Section 10)
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
EOF
```

**Step 2**: Verify the store was created

```bash
# Check the file
cat src/store/index.ts
```

**Step 3**: Test that the store works

```bash
# Start the dev server to verify there are no errors
pnpm dev
```

**Note**:

- The store is currently empty (no reducers). This is fine - we'll add them as needed.
- We'll update this file incrementally:
  - **Section 10**: Add `baseApi` reducer and middleware
  - **Section 11**: Add `authReducer` when creating authSlice
  - **Section 12**: Add `searchReducer` when creating searchSlice

### 6.2 Redux Hooks

**Step 1**: Create typed Redux hooks

Even though we don't have slices yet, we'll create the typed hooks now. They'll be ready to use when we add slices.

```bash
# Create hooks file
cat > src/hooks/index.ts << 'EOF'
import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux'
import type { RootState, AppDispatch } from '@/store'

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
EOF
```

**Step 2**: Verify the hooks were created

```bash
# Check the file
cat src/hooks/index.ts
```

**Note**: These hooks are typed and ready to use. We'll use them when we create slices in later sections.

---

**What's Next?**

- ✅ **Store structure created** - Ready for reducers
- ✅ **Typed hooks created** - Ready for use
- ⏳ **Slices will be added incrementally**:
  - Auth slice → Section 11 (Authentication)
  - Search slice → Section 12 (Pages Implementation - Home page)
  - API integration → Section 10 (API Integration)

---

## 7. Routing

> **Gradual Development Approach**: In this section, we'll set up only the **minimal routing configuration** - just enough to get routing working. We'll add routes incrementally as we create pages, layouts, and components in later sections. This matches how developers typically start: one route at a time, testing as they go.

### 7.1 Minimal Routes Setup

**Step 1**: Create routes directory and minimal router

At this stage, we'll create the absolute minimum - just one simple route to verify routing works. This is how developers typically start a new project.

```bash
# Create routes directory
mkdir -p src/routes

# Create minimal routes file
cat > src/routes/routes.tsx << 'EOF'
import { createBrowserRouter } from 'react-router-dom'

// Minimal router setup - we'll add routes incrementally as we build pages
export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <div>
        <h1>Voya - Travel & Accommodation Booking</h1>
        <p>Routing is working! We'll add more routes as we build pages.</p>
      </div>
    ),
  },
])
EOF
```

**Step 2**: Verify the routes file was created

```bash
# Check the file
cat src/routes/routes.tsx
```

**Step 3**: Update App.tsx to use the router

Now let's connect the router to our app:

```bash
# Update App.tsx to use routing
cat > src/App.tsx << 'EOF'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/routes'

function App() {
  return <RouterProvider router={router} />
}

export default App
EOF
```

**Step 4**: Test that routing works

```bash
# Start the dev server
pnpm dev
```

Open your browser and verify you see "Voya - Travel & Accommodation Booking" and the message. This confirms routing is working.

**Note**:

- This is the absolute minimum routing setup - just one route
- We'll add more routes incrementally:
  - **Section 12**: Add actual page routes when we create pages
  - **Section 11**: Add protected routes when we implement authentication
  - **Later**: Add lazy loading, error handling, and layouts as the app grows

---

**What's Next?**

- ✅ **Basic routing configured** - Router is working
- ⏳ **Routes will be added incrementally**:
  - Home route → Section 12 (when creating Home page)
  - Login route → Section 11 (when implementing authentication)
  - Other routes → As pages are created
  - Protected routes → Section 11 (when auth is ready)
  - Lazy loading → When app grows (optional optimization)
  - Error handling → Section 16 (when implementing error boundaries)

---

## 8. UI Framework & Theme

> **Gradual Development Approach**: In this section, we'll set up only the **absolute minimum theme configuration** - just enough to use MUI components. We'll expand the theme incrementally as we build features and need more customization. The ThemeContext provider will be created later in Section 12 when we set up the Providers component.

### 8.1 Minimal Theme Configuration

**Step 1**: Create the theme file

At this stage, we'll create the absolute minimum theme - just primary color. This is how developers typically start: minimal setup, expand as needed.

```bash
# Create theme directory
mkdir -p src/theme

# Create minimal theme file
cat > src/theme/index.ts << 'EOF'
import { createTheme } from '@mui/material/styles'

// Minimal theme - we'll expand this as we build features
export const theme = createTheme({
  palette: {
    primary: {
      main: '#003580',
    },
  },
})
EOF
```

**Step 2**: Verify the theme file was created

```bash
# Check the file
cat src/theme/index.ts
```

**Step 3**: Connect theme to the app and verify it works

Now let's connect the theme to the app so we can verify it's working. Since we already have routing set up (Section 7), we'll wrap the RouterProvider with MUI's ThemeProvider. We'll use MUI's ThemeProvider directly for now (we'll create our custom ThemeContext in Section 12).

```bash
# Update App.tsx to wrap RouterProvider with ThemeProvider
cat > src/App.tsx << 'EOF'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/routes'
import { theme } from './theme'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App
EOF
```

**Step 4**: Update routes to include a test component that uses the theme

Let's update the route to include a MUI component so we can verify the theme is working:

```bash
# Update routes to include theme verification
cat > src/routes/routes.tsx << 'EOF'
import { createBrowserRouter } from 'react-router-dom'
import { Button, Container, Typography } from '@mui/material'

// Minimal router setup - we'll add routes incrementally as we build pages
export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Container maxWidth="sm" sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Voya - Travel & Accommodation Booking
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Theme is working! The button below uses the primary color from our theme.
        </Typography>
        <Button variant="contained" color="primary">
          Test Theme Button
        </Button>
      </Container>
    ),
  },
])
EOF
```

**Step 5**: Verify the theme is working

```bash
# Start the dev server
pnpm dev
```

**Verification Checklist**:

1. ✅ **App loads without errors** - Check browser console (should be no errors)
2. ✅ **Button is visible** - You should see a "Test Theme Button" on the page
3. ✅ **Button uses theme color** - The button should have a blue background (#003580) - this confirms the theme is applied
4. ✅ **Typography styles work** - Text should be styled with MUI typography (proper font sizes, spacing)
5. ✅ **CssBaseline is applied** - MUI's default styles should be active (no browser default margins/padding)

**What to look for in the browser**:

- The button should have a **blue background** (primary color: #003580)
- The button text should be **white** (contrast text)
- The layout should be **centered** with proper spacing
- The heading should be larger and bold (h4 typography variant)
- The page should have **no default browser margins** (CssBaseline applied)

**Note**:

- This is the absolute minimum theme - just primary color
- We've connected it to verify it works, but we'll replace this with ThemeContext in Section 12
- We'll expand the theme incrementally:
  - **As you build components**: Add more colors (secondary, error, etc.) when you need them
  - **When customizing components**: Add component overrides when you customize MUI components
  - **When implementing dark mode**: Add dark mode support (Section 12)
  - **When implementing RTL**: Add RTL support (Section 14)
- The ThemeContext provider will be created in Section 12 when we set up providers
- When we create ThemeContext, we'll also expand the theme to include custom variants and add MUI type declarations (Section 12.1)

---

**What's Next?**

- ✅ **Minimal theme created** - MUI components will work
- ⏳ **Theme will be expanded in Section 12**:
  - Full theme configuration with custom variants → Section 12.1 (when creating ThemeContext)
  - MUI type declarations → Section 12.1 (when expanding theme)
  - Dark mode support → Section 12.1 (when creating ThemeContext)
  - RTL support → Section 14 (when implementing RTL)

---

## 9. Internationalization

> **Gradual Development Approach**: In this section, we'll set up only the **minimal i18n configuration** with basic translation files. We'll expand translations incrementally as we build pages and components.

### 9.1 Minimal i18n Configuration

**Step 1**: Create i18n directory structure

```bash
# Create i18n directories
mkdir -p src/i18n/locales

# Create config file
touch src/i18n/config.ts
```

**Step 2**: Create minimal i18n configuration

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

**Step 3**: Create minimal translation files

We'll start with very basic translations. These will be expanded as we build features.

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

**Step 4**: Connect i18n to the app and verify it works

Now let's connect i18n to the app so we can verify it's working. We'll import the i18n config in the routes file and use a translation string to test it. Later in Section 12, we'll move this import to the Providers component for better architecture.

```bash
# Update routes to import i18n config and use translations
cat > src/routes/routes.tsx << 'EOF'
import { createBrowserRouter } from 'react-router-dom'
import { Button, Container, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import '@/i18n/config' // Import i18n config to initialize it

// Component to test translations
function HomeRoute() {
  const { t } = useTranslation()

  return (
    <Container maxWidth="sm" sx={{ mt: 4, textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Voya - Travel & Accommodation Booking
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        {t('home.searchStays')}
      </Typography>
      <Button variant="contained" color="primary">
        {t('common.search')}
      </Button>
    </Container>
  )
}

// Minimal router setup - we'll add routes incrementally as we build pages
export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeRoute />,
  },
])
EOF
```

**Step 5**: Verify i18n is working

```bash
# Start the dev server
pnpm dev
```

**Verification Checklist**:

1. ✅ **App loads without errors** - Check browser console (should be no errors)
2. ✅ **Translation text is visible** - You should see "Search for your perfect stay" (English) on the page
3. ✅ **Button text is translated** - The button should show "Search" (English)
4. ✅ **Language detection works** - i18n should detect your browser language automatically
5. ✅ **Manual language switch works** (optional test):
   - Open browser console
   - Run: `localStorage.setItem('voya-language', 'ar')`
   - Refresh the page
   - Text should change to Arabic: "ابحث عن إقامتك المثالية" and "بحث"

**What to look for in the browser**:

- The main text should display: **"Search for your perfect stay"** (English) or **"ابحث عن إقامتك المثالية"** (Arabic)
- The button should display: **"Search"** (English) or **"بحث"** (Arabic)
- If your browser language is Arabic, it should automatically show Arabic translations
- If your browser language is English (or other), it should show English translations

**Note**:

- We've imported i18n config directly in routes.tsx for verification. In Section 12, we'll move this import to the Providers component for better architecture (single initialization point).
- These are minimal translation files to get started. As you implement pages and components, you'll need to add more translation keys.
- The complete translation files in the codebase are much larger and include translations for all pages, forms, error messages, etc.
- You can expand these files incrementally as you build features.
- The i18n config import will be moved to Providers component in Section 12 for better organization.

**Troubleshooting**:

- **ESLint error "Unsafe assignment of an error typed value" when importing JSON files**: Make sure `tsconfig.app.json` includes `"resolveJsonModule": true` (Section 3.1). This is required for TypeScript to properly type JSON imports.
- **Translation not showing**: Make sure you imported `'@/i18n/config'` before using `useTranslation()` hook.
- **Language not changing**: Check browser console for errors. Verify that `localStorage.getItem('voya-language')` returns the expected language code ('en' or 'ar').

---

## 10. API Integration

> **Gradual Development Approach**: In this section, we'll set up only the **base API configuration**. We'll create specific API endpoints incrementally as we build features that need them. The base API setup is needed early because it provides the foundation for all API calls.

### 10.1 Base API Configuration

**Step 1**: Create the base API file

```bash
# Create API directory
mkdir -p src/api

# Create baseApi file
touch src/api/baseApi.ts
```

**Step 2**: Add base API configuration

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
  tagTypes: [], // Will be expanded as we create endpoints that need caching
  endpoints: () => ({}),
})
```

**Step 3**: Verify the baseApi file was created

```bash
# Check the file
cat src/api/baseApi.ts
```

**Note**:

- This is the base API configuration. It provides the foundation for all API calls.
- `tagTypes` starts empty - we'll add tags incrementally as we create endpoints that need caching (e.g., `'Auth'` when we create auth endpoints in Section 11).
- We'll create specific API endpoints incrementally as we build features:
  - Auth API → Section 11 (when implementing login)
  - Hotels API → Section 12 (when implementing pages)
  - Other APIs → As needed

**Step 4**: Update store to include baseApi

Now that we've created `baseApi`, let's update the store to include it. At this point, we only have the baseApi reducer - we'll add authReducer in Section 11 and searchReducer in Section 12.

```bash
# Update store/index.ts to include baseApi
cat > src/store/index.ts << 'EOF'
import { configureStore } from '@reduxjs/toolkit'
import { baseApi } from '@/api/baseApi'

// Store setup - we'll add more reducers as we create slices
export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    // More reducers will be added here:
    // - auth: authReducer (added in Section 11)
    // - search: searchReducer (added in Section 12)
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
EOF
```

**Step 5**: Verify the update

```bash
# Check the updated content
cat src/store/index.ts
```

**Note**:

- We're only adding `baseApi` reducer and middleware at this stage
- `authReducer` will be added in Section 11 (Authentication)
- `searchReducer` will be added in Section 12 (Pages Implementation)
- Search state persistence will be added in Section 12 when we create the searchSlice

**What's Next?**

- ✅ **Base API configured** - Foundation for all API calls is ready
- ⏳ **API endpoints will be created incrementally**:
  - **Auth API** → Section 11 (when implementing login)
  - **Hotels API** → Section 12 (when implementing hotel pages)
  - **Home API** → Section 12 (when implementing home page)
  - **Checkout API** → Section 12 (when implementing checkout)
  - **Admin API** → Section 12 (when implementing admin features)
  - **Other APIs** → As needed for each feature

**Note**: Complete API endpoint implementations are provided in the **Appendix: Complete API Endpoints Reference** at the end of this guide. Create them incrementally when you actually need them, not all at once.

### 10.2 Types Setup

**Important**: We need to set up the types/models.ts file which contains the DTOs (Data Transfer Objects) used throughout the application. We'll start with minimal types and expand them incrementally as we build features.

**Step 1**: Create the types/models.ts file

```bash
# Create types directory if it doesn't exist
mkdir -p src/types

# Create models.ts file
touch src/types/models.ts
```

**Step 2**: Add minimal type definitions

Following the gradual development approach, we'll start with only the essential types needed at this stage. We'll expand types incrementally as we build features that need them.

```bash
# Create minimal types/models.ts
cat > src/types/models.ts << 'EOF'
// Minimal types - we'll expand these incrementally as we build features

export type UserType = 'Admin' | 'User'

export interface LoginRequestDto {
  userName: string
  password: string
}

export interface LoginResponseDto {
  authentication: string
  userType: UserType
}

export interface AmenityDto {
  id: number
  name: string
  description?: string | null
}

export interface CityDto {
  id: number
  name: string
  country: string
  description?: string | null
}

export interface CityForCreationDto {
  name: string
  country: string
  description?: string | null
}

export interface PhotoDto {
  id: number
  url: string
}
EOF
```

**Step 2.1**: Verify the types file was created

```bash
# Check the file
cat src/types/models.ts
```

**Step 3**: Update types/index.ts

```typescript
// src/types/index.ts
export * from './models'
```

**Note**:

- These are the minimal types needed at this stage. We've included only the essential types that are used by the base API configuration or will be needed soon.
- Types will be expanded incrementally as we build features:
  - **Section 11 (Authentication)**: LoginRequestDto and LoginResponseDto are already defined (used by auth API)
  - **Section 12 (Pages Implementation)**: We'll add HotelDto, RoomDto, search-related types, and admin types when implementing pages and admin features
  - **As needed**: Add other types (booking, search results, etc.) when implementing the corresponding features
- The complete `types/models.ts` file in the codebase is large (280+ lines) because it includes all types. We're building it gradually, which helps understand each type's purpose and usage.

---

**What's Next?**

- ✅ **Base API configured** - Ready for endpoint creation
- ✅ **Minimal types defined** - Ready for expansion
- ⏳ **API endpoints will be created incrementally** in the sections where they're needed:
  - Auth API → Section 11 (Authentication)
  - Hotels, Home, Checkout, Admin APIs → Section 12 (Pages Implementation)
- 📚 **Complete API implementations** → See Appendix: Complete API Endpoints Reference

---

## 11. Authentication

> **Gradual Development**: In this section, we'll create the **authSlice** (which we need for authentication) and then build the auth components that use it.

### 11.1 Auth Slice

**Step 1**: Create the auth slice

Now that we're implementing authentication, we need to create the auth slice to manage authentication state.

```bash
# Create authSlice
cat > src/store/authSlice.ts << 'EOF'
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
      // Sync with localStorage
      localStorage.setItem('token', action.payload.token)
      localStorage.setItem('userType', action.payload.userType)
    },
    logout: (state) => {
      state.token = null
      state.userType = null
      // Clear localStorage
      localStorage.removeItem('token')
      localStorage.removeItem('userType')
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
EOF
```

**Step 2**: Update the store to include authReducer

Now we need to add the auth reducer to our store. If you've already completed Section 10, your store will have baseApi. If not, that's fine - we'll add it in Section 10.

```bash
# Update store to include authReducer
cat > src/store/index.ts << 'EOF'
import { configureStore } from '@reduxjs/toolkit'
import { baseApi } from '@/api/baseApi'
import { authReducer } from './authSlice'

// Store setup - we'll add more reducers as we create slices
export const store = configureStore({
  reducer: {
    auth: authReducer,
    [baseApi.reducerPath]: baseApi.reducer,
    // More reducers will be added here:
    // - search: searchReducer (added in Section 12)
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
EOF
```

**Note**: If you haven't completed Section 10 yet, you can temporarily remove the `baseApi` import and reducer. The store will work with just `authReducer` for now.

**Step 3**: Verify the files were created

```bash
# Check authSlice
cat src/store/authSlice.ts

# Check updated store
cat src/store/index.ts
```

**Note**:

- The auth slice manages authentication state (token and userType)
- It automatically syncs with localStorage
- We'll use this in the auth components below

### 11.2 Auth API Endpoint

Now that we have the auth slice, we need to create the Auth API endpoint to handle login. This is the first API endpoint we're creating, following the gradual development approach.

**Step 1**: Create the Auth API directory and file

```bash
# Create auth API directory
mkdir -p src/api/auth

# Create auth API file
touch src/api/auth/index.ts
```

**Step 2**: Add Auth API endpoint

```bash
# Create Auth API endpoint
cat > src/api/auth/index.ts << 'EOF'
import { baseApi } from '@/api/baseApi'
import type { LoginRequestDto, LoginResponseDto } from '@/types'

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponseDto, LoginRequestDto>({
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
EOF
```

**Step 3**: Update baseApi to include 'Auth' tag type

Now that we're using the 'Auth' tag, we need to add it to baseApi:

```bash
# Update baseApi to include Auth tag
cat > src/api/baseApi.ts << 'EOF'
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
  tagTypes: ['Auth'], // Added Auth tag for auth endpoints
  endpoints: () => ({}),
})
EOF
```

**Step 4**: Verify the Auth API was created

```bash
# Check the file
cat src/api/auth/index.ts

# Check baseApi was updated
cat src/api/baseApi.ts
```

**Note**:

- This is the first API endpoint we're creating. We're doing it now because we need it for authentication.
- We added 'Auth' to tagTypes in baseApi because the login endpoint uses it for cache invalidation.
- The Auth API uses the types we defined in Section 10.2 (LoginRequestDto, LoginResponseDto).
- We'll create other API endpoints incrementally in Section 12 when we implement the pages that need them.

### 11.3 Protected Route Component

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

### 11.4 Admin Route Component

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

### 11.5 Redirect If Authenticated

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

### 11.6 useAuth Hook

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
