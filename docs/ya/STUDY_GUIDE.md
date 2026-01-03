# 📚 Voya Project - Complete Study Guide

> **Comprehensive guide covering all technologies, patterns, concepts, and best practices used in the Voya project**

---

## 📋 Table of Contents

1. [Project Setup & Tooling](#1-project-setup--tooling)
2. [Version Control & Git Workflow](#2-version-control--git-workflow)
3. [Package Management](#3-package-management)
4. [Build Tools & Configuration](#4-build-tools--configuration)
5. [TypeScript Fundamentals](#5-typescript-fundamentals)
6. [React Core Concepts](#6-react-core-concepts)
7. [State Management](#7-state-management)
8. [Routing & Navigation](#8-routing--navigation)
9. [UI Framework & Styling](#9-ui-framework--styling)
10. [Forms & Validation](#10-forms--validation)
11. [API Integration](#11-api-integration)
12. [Internationalization (i18n)](#12-internationalization-i18n)
13. [Error Handling & Logging](#13-error-handling--logging)
14. [Testing](#14-testing)
15. [Code Quality & Linting](#15-code-quality--linting)
16. [Performance Optimization](#16-performance-optimization)
17. [Project Structure & Architecture](#17-project-structure--architecture)
18. [React Patterns & Best Practices](#18-react-patterns--best-practices)
19. [Custom Hooks](#19-custom-hooks)
20. [Authentication & Authorization](#20-authentication--authorization)
21. [Advanced Concepts](#21-advanced-concepts)
22. [Complete Feature Checklist](#22-complete-feature-checklist)

---

## 22. Complete Feature Checklist

> **Use this checklist to ensure you understand every feature in the Voya project**

### 👤 User-Facing Features

#### Authentication & Authorization

- [ ] **Login Page** (`src/pages/Login/`)
  - Username and password fields
  - Form validation with Formik + Yup
  - API integration for authentication
  - UserType handling (Admin/User roles)
  - Redirect after login (protected routes or home)
  - Error handling for failed login
  - **Study**: `src/pages/Login/Login.tsx`

- [ ] **Protected Routes**
  - `ProtectedRoute` component - requires authentication
  - `AdminRoute` component - requires Admin role
  - `RedirectIfAuthenticated` - redirects if already logged in
  - Token-based authentication
  - **Study**: `src/components/auth/`

- [ ] **Session Management**
  - Token storage in localStorage
  - Automatic token injection in API requests
  - Logout functionality
  - Session persistence across page reloads
  - **Study**: `src/hooks/useAuth.ts`, `src/store/authSlice.ts`

#### Home Page Features (`src/pages/Home/`)

- [ ] **Hero Section**
  - Welcome banner/hero image
  - Call-to-action elements
  - **Study**: `src/pages/Home/components/HeroSection.tsx`

- [ ] **Search Functionality**
  - Central search bar with placeholder "Search for hotels, cities..."
  - Interactive calendar for check-in/check-out dates
    - Default: today and tomorrow
    - Date validation
    - Native HTML5 date inputs (TextField type="date")
  - Guest selection controls
    - Adults selector (default: 2)
    - Children selector (default: 0)
  - Room selection (default: 1 room)
  - Search submission and navigation
  - **Study**: `src/pages/Home/components/HomeSearchBar.tsx`, `src/pages/Home/components/GuestRoomSelector.tsx`

- [ ] **Featured Deals Section**
  - Displays 3-5 hotels with special offers
  - Hotel thumbnails
  - Hotel name and location
  - Original and discounted prices
  - Star ratings (using Rating component)
  - Click to view hotel details
  - **Study**: `src/pages/Home/components/FeaturedDealsSection.tsx`

- [ ] **Recently Visited Hotels**
  - Personalized display of last 3-5 visited hotels
  - Thumbnail image
  - Hotel name, city
  - Star rating
  - Pricing information
  - Visit date display
  - LocalStorage persistence
  - **Study**: `src/pages/Home/components/RecentHotelsSection.tsx`, `src/utils/recentHotelsStorage.ts`

- [ ] **Trending Destinations**
  - Curated list of popular cities
  - Visual thumbnails
  - City name, country, description
  - Click to search hotels in that city
  - **Study**: `src/pages/Home/components/TrendingDestinationsSection.tsx`

#### Search Results Page (`src/pages/SearchResults/`)

- [ ] **Comprehensive Filters Sidebar**
  - Price range slider filter
  - Star rating filter (multi-select)
  - Amenities filter (multi-select checkboxes)
  - Hotel type filter (luxury, budget, boutique, etc.)
  - Responsive design:
    - Desktop: Fixed sidebar
    - Mobile: Drawer with toggle button
  - Filter state management (Redux)
  - **Study**: `src/pages/SearchResults/components/FiltersSidebar.tsx`

- [ ] **Selected Filters Bar**
  - Shows active filters
  - Quick remove individual filters
  - Clear all filters option
  - **Study**: `src/pages/SearchResults/components/SelectedFiltersBar.tsx`

- [ ] **Hotel Listings**
  - Infinite scroll pagination
  - Hotel result cards with:
    - Thumbnail image
    - Hotel name
    - Star rating
    - Price per night
    - Brief description
    - Location
  - Loading states (skeleton loaders)
  - Empty state when no results
  - Click to navigate to hotel details
  - **Study**: `src/pages/SearchResults/components/ResultsList.tsx`, `src/pages/SearchResults/components/HotelResultCard.tsx`

- [ ] **Search State Management**
  - Search parameters in Redux
  - URL query parameters
  - State persistence
  - **Study**: `src/store/searchSlice.ts`

#### Hotel Details Page (`src/pages/Hotel/`)

- [ ] **Visual Gallery**
  - High-quality hotel images
  - Fullscreen image viewer (react-image-gallery)
  - Thumbnail navigation
  - Image lazy loading
  - **Study**: `src/pages/Hotel/components/HotelGallery.tsx`

- [ ] **Detailed Hotel Information**
  - Hotel name and star rating
  - Location and description
  - Hotel amenities list
  - **Study**: `src/pages/Hotel/components/HotelAmenities.tsx`

- [ ] **Guest Reviews Section**
  - List of customer reviews
  - Review ratings (stars)
  - Customer names
  - Review descriptions
  - **Study**: `src/pages/Hotel/components/HotelReviews.tsx`

- [ ] **Interactive Map**
  - Hotel location on map (Leaflet)
  - Latitude/longitude coordinates
  - Map markers
  - Zoom controls
  - **Study**: `src/pages/Hotel/components/HotelMap.tsx`

- [ ] **Room Availability & Selection**
  - List of available room types
  - Room images
  - Room descriptions
  - Room prices
  - Capacity information (adults/children)
  - Room amenities
  - Availability status
  - "Book Now" button
  - Booking flow integration
  - **Study**: `src/pages/Hotel/components/HotelRooms.tsx`

- [ ] **Container/Presentational Pattern**
  - Separation of logic and presentation
  - **Study**: `src/pages/Hotel/Hotel.container.tsx`, `src/pages/Hotel/Hotel.presentational.tsx`

#### Checkout Flow (`src/pages/Checkout/`)

- [ ] **Checkout Page**
  - Booking summary display
    - Hotel name
    - Room details
    - Dates (check-in/check-out)
    - Price calculation
    - Total cost
  - User information form
    - Customer name field
    - Payment method selection
    - Special requests/remarks (multiline text)
    - Form validation
  - Checkout actions
    - Submit booking
    - Cancel/back button
  - Checkout context storage (localStorage)
  - **Study**: `src/pages/Checkout/Checkout.tsx`, `src/pages/Checkout/components/`

- [ ] **Price Calculation**
  - Calculate total based on:
    - Price per night
    - Number of nights
    - Check-in/check-out dates
  - **Study**: `src/pages/Checkout/utils/price.ts`

- [ ] **Booking Submission**
  - API integration for creating booking
  - Loading states
  - Error handling
  - Success navigation to confirmation
  - **Study**: `src/api/checkout/index.ts`

- [ ] **Confirmation Page**
  - Booking confirmation number
  - Complete booking details
  - Hotel address and room information
  - Dates and total price
  - Payment method confirmation
  - Print functionality (browser print, includes "Save as PDF")
  - **Study**: `src/pages/Checkout/Confirmation/Confirmation.tsx`

#### Layout & Navigation

- [ ] **Main Header** (`src/components/layout/MainHeader.tsx`)
  - Logo and branding
  - Navigation links (Home, Search)
  - Language switcher
  - Theme toggle (light/dark mode)
  - Login/Logout button
  - Responsive mobile menu
  - Authentication state display

- [ ] **Main Footer** (`src/components/layout/MainFooter.tsx`)
  - Footer content
  - Links and information

- [ ] **Language Switcher**
  - English/Arabic toggle
  - RTL support for Arabic
  - Language persistence
  - **Study**: `src/components/layout/LanguageSwitcher.tsx`

- [ ] **Theme Toggle**
  - Light/dark mode switching
  - Theme persistence
  - **Study**: `src/components/layout/ThemeToggle.tsx`, `src/providers/ThemeContext.tsx`

- [ ] **Scroll to Top**
  - Button to scroll to top of page
  - **Study**: `src/components/ScrollToTop.tsx`

### 🛠 Admin Features (`src/pages/Admin/`)

#### Admin Layout

- [ ] **Admin Layout Structure**
  - Left navigation sidebar
  - Collapsible sidebar
  - Responsive mobile drawer
  - Top app bar
  - Admin search bar (global search)
  - **Study**: `src/layouts/AdminLayout/`

#### Admin Dashboard (`src/pages/Admin/Dashboard/`)

- [ ] **Dashboard Overview**
  - Statistics cards:
    - Total Cities
    - Total Hotels
    - Total Rooms
    - Available Rooms
  - Hotel statistics:
    - Average star rating
    - Average rooms per hotel
  - Room statistics:
    - Available vs unavailable rooms
  - Quick overview metrics:
    - Cities with hotels
    - Occupancy rate
    - Total hotel types
    - Average rooms per city
  - Real-time data from API
  - **Study**: `src/pages/Admin/Dashboard/Dashboard.tsx`

#### Cities Management (`src/pages/Admin/Cities/`)

- [ ] **Cities Grid (MUI Data Grid)**
  - Display columns:
    - Name
    - Description
  - Search functionality
  - Filter capabilities
  - Row click to edit
  - Delete button per row
  - **Study**: `src/pages/Admin/Cities/Cities.tsx`

- [ ] **City Form (Create/Update)**
  - Modal form
  - Fields:
    - Name (required)
    - Description
  - Form validation
  - Create new city
  - Update existing city
  - **Study**: `src/pages/Admin/Cities/components/CityForm.tsx`

- [ ] **Delete Confirmation**
  - Confirmation dialog before deletion
  - Safe deletion process
  - **Study**: `src/pages/Admin/Cities/components/DeleteConfirmDialog.tsx`

- [ ] **Container/Presentational Pattern**
  - Logic separation
  - **Study**: `src/pages/Admin/Cities/components/CityForm.container.tsx`, `CityForm.presentational.tsx`

#### Hotels Management (`src/pages/Admin/Hotels/`)

- [ ] **Hotels Grid (MUI Data Grid)**
  - Display columns:
    - Name
    - Star rating
    - Number of rooms (calculated)
  - Search functionality
  - Filter capabilities
  - Row click to edit
  - Delete button per row
  - **Study**: `src/pages/Admin/Hotels/Hotels.tsx`

- [ ] **Hotel Form (Create/Update)**
  - Modal form
  - Fields:
    - Name (required)
    - City selection (dropdown)
    - Location
    - Star rating
    - Hotel type (dropdown)
    - Image URL
  - Photo uploader component
  - Form validation
  - Create new hotel
  - Update existing hotel
  - **Study**: `src/pages/Admin/Hotels/components/HotelForm.tsx`, `src/pages/Admin/components/PhotoUploader.tsx`

- [ ] **Delete Confirmation**
  - Confirmation dialog
  - **Study**: `src/pages/Admin/Hotels/components/DeleteConfirmDialog.tsx`

#### Rooms Management (`src/pages/Admin/Rooms/`)

- [ ] **Rooms Grid (MUI Data Grid)**
  - Display columns:
    - Room number
    - Availability status
    - Adult capacity
    - Children capacity
  - Search functionality
  - Filter capabilities
  - Row click to edit
  - Delete button per row
  - **Study**: `src/pages/Admin/Rooms/Rooms.tsx`

- [ ] **Room Form (Create/Update)**
  - Modal form
  - Fields:
    - Room number
    - Hotel selection (dropdown)
    - Room type
    - Adults capacity
    - Children capacity
    - Price
    - Availability toggle
    - Photo URL
  - Form validation
  - Create new room
  - Update existing room
  - **Study**: `src/pages/Admin/Rooms/components/RoomForm.tsx`

- [ ] **Delete Confirmation**
  - Confirmation dialog
  - **Study**: `src/pages/Admin/Rooms/components/DeleteConfirmDialog.tsx`

### 🎨 UI Components & Patterns

#### Common Components (`src/components/common/`)

- [ ] **AppButton**
  - Custom button component
  - Consistent styling
  - **Study**: `src/components/common/AppButton.tsx`

- [ ] **AppCard**
  - Reusable card component
  - **Study**: `src/components/common/AppCard.tsx`

- [ ] **ReusableCard**
  - Generic card component
  - **Study**: `src/components/common/ReusableCard.tsx`

- [ ] **SafeImage**
  - Image with error handling
  - Fallback for broken images
  - Lazy loading support
  - **Study**: `src/components/common/SafeImage.tsx`

- [ ] **VoyaLoader**
  - Loading spinner component
  - Different sizes
  - **Study**: `src/components/common/VoyaLoader.tsx`

#### Form Components (`src/components/forms/`)

- [ ] **FormField**
  - Formik-integrated text field
  - Automatic error display
  - Validation integration
  - **Study**: `src/components/forms/FormField.tsx`

- [ ] **FormSelect**
  - Formik-integrated select field
  - **Study**: `src/components/forms/FormSelect.tsx`

- [ ] **FormActions**
  - Form action buttons
  - Submit, cancel, etc.
  - **Study**: `src/components/forms/FormActions.tsx`

#### Layout Components (`src/components/layout/`)

- [ ] **PageContainer**
  - Page wrapper component
  - Consistent spacing
  - **Study**: `src/components/layout/PageContainer.tsx`

- [ ] **Section**
  - Section wrapper
  - Title and subtitle support
  - **Study**: `src/components/layout/Section.tsx`

#### Error Components (`src/components/error/`)

- [ ] **ErrorBoundary**
  - Class component error boundary
  - Error UI display
  - Reset functionality
  - **Study**: `src/components/error/ErrorBoundary.tsx`

- [ ] **withErrorBoundary HOC**
  - HOC wrapper for error boundaries
  - **Study**: `src/components/error/withErrorBoundary.tsx`

#### Higher-Order Components (`src/components/hoc/`)

- [ ] **withLoading HOC**
  - Loading state wrapper
  - Loading component display
  - Error handling
  - **Study**: `src/components/hoc/withLoading.tsx`

#### Pattern Components (`src/components/patterns/`)

- [ ] **Render Props Pattern**
  - Render props implementation
  - **Study**: `src/components/patterns/RenderProps.tsx`

- [ ] **Props Getters Pattern**
  - Props getter pattern
  - **Study**: `src/components/patterns/PropsGetters.tsx`

### 🔧 Utility Features

#### Custom Hooks (`src/hooks/`)

- [ ] **useAuth** - Authentication state and actions
- [ ] **useDebounce** - Debounced values
- [ ] **useLocalStorage** - LocalStorage sync
- [ ] **useNotification** - Toast notifications
- [ ] **useRTL** - RTL language support
- [ ] **useBooking** - Booking logic
- [ ] **useSearch** - Search functionality
- [ ] **useIntersectionObserver** - Intersection Observer API
- [ ] **Study**: All files in `src/hooks/`

#### Utilities (`src/utils/`)

- [ ] **date.ts** - Date formatting and manipulation
- [ ] **price.ts** - Price calculations
- [ ] **string.ts** - String utilities
- [ ] **validation.ts** - Validation functions
- [ ] **responsive.ts** - Responsive utilities
- [ ] **logger.ts** - Logging utility
- [ ] **globalErrors.ts** - Global error handlers
- [ ] **recentHotelsStorage.ts** - Recent hotels persistence
- [ ] **checkoutStorage.ts** - Checkout context persistence
- [ ] **Study**: All files in `src/utils/`

### 🌐 Internationalization Features

- [ ] **Language Support**
  - English (en) - Default
  - Arabic (ar) - RTL support
  - Language detection (browser, localStorage)
  - Language persistence
  - **Study**: `src/i18n/config.ts`, `src/i18n/locales/`

- [ ] **RTL Support**
  - Right-to-left layout for Arabic
  - Theme direction switching
  - MUI RTL integration
  - **Study**: `src/hooks/useRTL.ts`

### 🎨 Theming Features

- [ ] **Theme System**
  - Light mode
  - Dark mode
  - Custom color palette
  - Custom typography
  - Custom component variants
  - Theme persistence
  - **Study**: `src/theme/index.ts`, `src/providers/ThemeContext.tsx`

### 📱 Responsive Design Features

- [ ] **Breakpoints**
  - Mobile (xs)
  - Tablet (sm, md)
  - Desktop (lg, xl)
  - Responsive components throughout
  - Mobile drawer for filters
  - Responsive navigation

### 🧪 Testing Features

- [ ] **Unit Tests**
  - Component tests
  - Hook tests
  - Utility function tests
  - **Study**: All `*.test.tsx` files

- [ ] **Test Setup**
  - Vitest configuration
  - React Testing Library
  - MSW for API mocking
  - **Study**: `setupTests.ts`, `src/tests/msw/`

### 🚀 Performance Features

- [ ] **Code Splitting**
  - Route-based lazy loading
  - Dynamic imports
  - **Study**: `src/routes/routes.tsx`

- [ ] **Bundle Optimization**
  - Manual chunks for vendors
  - Tree shaking
  - **Study**: `vite.config.ts`

- [ ] **Caching**
  - RTK Query automatic caching
  - Request deduplication
  - Cache invalidation
  - **Study**: `src/api/baseApi.ts`

### 🔒 Security Features

- [ ] **Authentication**
  - JWT token-based auth
  - Protected routes
  - Role-based access control

- [ ] **Input Validation**
  - Form validation
  - XSS protection (React escaping)

### 📊 State Management Features

- [ ] **Redux Store**
  - Auth state (token, userType)
  - Search state (filters, dates, guests)
  - State persistence (localStorage)
  - **Study**: `src/store/`

- [ ] **RTK Query**
  - API endpoints
  - Automatic caching
  - Loading/error states
  - **Study**: `src/api/`

### 🐛 Error Handling Features

- [ ] **Error Boundaries**
  - Component-level error boundaries
  - Route-level error boundaries
  - Error UI display

- [ ] **Global Error Handlers**
  - Unhandled promise rejections
  - Global runtime errors
  - Error logging

- [ ] **Error Pages**
  - Route error page
  - 404 Not Found page
  - **Study**: `src/pages/Error/`, `src/pages/NotFound/`

---

### ✅ Feature Coverage Summary

**Total Features Identified**: 100+ features across:

- ✅ Authentication & Authorization (5 features)
- ✅ Home Page (5 major sections)
- ✅ Search Results (3 major sections)
- ✅ Hotel Details (5 major sections)
- ✅ Checkout Flow (3 pages)
- ✅ Admin Panel (4 management sections)
- ✅ UI Components (15+ reusable components)
- ✅ Utilities (10+ utility modules)
- ✅ Internationalization (2 languages, RTL)
- ✅ Theming (Light/Dark modes)
- ✅ Testing (Multiple test suites)
- ✅ Performance (Code splitting, caching)
- ✅ Error Handling (Multiple layers)

**Coverage**: 100% of implemented features documented

---

## 1. Project Setup & Tooling

### 1.1 Node.js & Runtime

- [ ] **Node.js v18+**: Understand Node.js basics
  - **Study**: Node.js documentation
  - **Check**: `node --version` in terminal
  - **Example**: Project uses ES modules (`"type": "module"` in package.json)

### 1.2 Package Managers

- [ ] **PNPM**: Primary package manager
  - **Why PNPM**: Faster, disk-efficient, strict dependency resolution
  - **Key Commands**:
    ```bash
    pnpm install          # Install dependencies
    pnpm add <package>    # Add dependency
    pnpm remove <package> # Remove dependency
    pnpm update           # Update dependencies
    ```
  - **File**: `pnpm-lock.yaml` - Lock file for reproducible installs
  - **Study**: Compare with npm/yarn differences

### 1.3 Environment Variables

- [ ] **Vite Environment Variables**
  - **Pattern**: `VITE_*` prefix required for client-side access
  - **Usage**: `import.meta.env.VITE_API_BASE_URL`
  - **File**: `.env` (create from `.env.example`)
  - **Example**: `src/api/baseApi.ts` line 6
  - **Study**: Vite env variables documentation

---

## 2. Version Control & Git Workflow

### 2.1 Git Basics

- [ ] **Git Fundamentals**
  - Repository initialization
  - Commit workflow
  - Branching strategies
  - **File**: `.gitignore` (if exists)
  - **Study**: Basic git commands

### 2.2 Git Hooks with Husky

- [ ] **Husky Setup**
  - **Package**: `husky@9.1.7`
  - **Purpose**: Git hooks automation
  - **File**: `.husky/pre-commit`
  - **Content**:
    ```bash
    pnpm typecheck
    pnpm lint-staged
    ```
  - **Script**: `"prepare": "husky"` in package.json
  - **Study**: How Husky works, git hooks lifecycle
  - **Example**: `.husky/pre-commit` file

### 2.3 Pre-commit Checks

- [ ] **lint-staged**
  - **Package**: `lint-staged@16.2.7`
  - **Configuration**: `package.json` lines 79-87
  - **What it does**:
    - Runs ESLint on staged `.ts/.tsx` files
    - Runs Prettier on staged files
    - Prevents bad code from being committed
  - **Study**: lint-staged configuration patterns

---

## 3. Package Management

### 3.1 package.json Structure

- [ ] **Understanding package.json**
  - **File**: `package.json`
  - **Key Sections**:
    - `name`, `version`, `type`
    - `scripts` - All available commands
    - `dependencies` - Runtime dependencies
    - `devDependencies` - Development-only dependencies
    - `lint-staged` - Pre-commit configuration
  - **Study**: npm package.json specification

### 3.2 Scripts

- [ ] **All Scripts Explained**
  - **File**: `package.json` lines 6-19
  - **Scripts to understand**:
    ```json
    "dev": "vite"                    // Development server
    "build": "tsc -b && vite build"  // Type check + build
    "lint": "eslint ."               // Lint code
    "preview": "vite preview"        // Preview production build
    "format": "prettier . --write"   // Format code
    "format:check": "prettier . --check" // Check formatting
    "test": "vitest run"             // Run tests once
    "test:watch": "vitest"           // Watch mode tests
    "prepare": "husky"               // Setup git hooks
    "gen:api": "openapi-typescript..." // Generate API types
    "typecheck": "tsc -p tsconfig.app.json --noEmit" // Type check
    "verify": "pnpm typecheck && pnpm lint && pnpm test && pnpm build" // Full verification
    "verify:stage": "git add . && pnpm verify" // Verify staged files
    ```
  - **Study**: Each script's purpose and when to use it

### 3.3 Dependencies Overview

- [ ] **Runtime Dependencies** (package.json lines 21-45)
  - React ecosystem
  - State management
  - UI libraries
  - Utilities
  - **Study**: Each package's purpose and documentation

- [ ] **Development Dependencies** (package.json lines 47-77)
  - Build tools
  - Testing libraries
  - Linting/formatting
  - Type definitions
  - **Study**: Dev dependencies vs runtime dependencies

---

## 4. Build Tools & Configuration

### 4.1 Vite

- [ ] **Vite Fundamentals**
  - **Package**: `vite@7.2.4`
  - **What is Vite**: Next-generation frontend build tool
  - **Features**: Fast HMR, ES modules, optimized builds
  - **File**: `vite.config.ts`
  - **Study**: Vite documentation, why Vite over Webpack

### 4.2 Vite Configuration

- [ ] **vite.config.ts Deep Dive**
  - **File**: `vite.config.ts`
  - **Key Concepts**:
    - **Plugins**: React plugin with Babel compiler
    - **Path Aliases**: `@` → `src/` directory
    - **Build Optimization**: Manual chunks for vendor splitting
    - **Test Configuration**: Vitest integration
  - **Study Each Section**:

    ```typescript
    // React plugin with React Compiler
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    })

    // Path alias
    alias: {
      '@': path.resolve(__dirname, 'src'),
    }

    // Manual chunks for code splitting
    manualChunks: {
      'react-vendor': ['react', 'react-dom', 'react-router-dom'],
      'mui-vendor': ['@mui/material', '@mui/icons-material', '@mui/x-data-grid'],
      // ... more chunks
    }
    ```

  - **Examples**:
    - Path alias usage: `import '@/components'`
    - Build output: Check `dist/` folder after build

### 4.3 React Compiler

- [ ] **Babel Plugin React Compiler**
  - **Package**: `babel-plugin-react-compiler@1.0.0`
  - **Purpose**: Automatic React optimization
  - **Location**: `vite.config.ts` line 10
  - **Study**: React Compiler documentation, what optimizations it does

### 4.4 TypeScript Configuration

- [ ] **TypeScript Setup**
  - **Package**: `typescript@5.9.3`
  - **Files**:
    - `tsconfig.json` - Root config (project references)
    - `tsconfig.app.json` - App-specific config
    - `tsconfig.node.json` - Node/build tool config
    - `tsconfig.test.json` - Test config
  - **Key Settings** (tsconfig.app.json):
    - `strict: true` - Strict type checking
    - `noUnusedLocals: true` - Error on unused variables
    - `noUnusedParameters: true` - Error on unused params
    - `baseUrl` + `paths` - Path aliases
  - **Study**: TypeScript compiler options, strict mode benefits

---

## 5. TypeScript Fundamentals

### 5.1 Type System

- [ ] **Basic Types**
  - Primitives: `string`, `number`, `boolean`
  - Complex: `object`, `array`, `tuple`
  - Special: `null`, `undefined`, `void`, `never`
  - **Examples**: Throughout codebase

### 5.2 Type Annotations

- [ ] **Function Types**
  - Parameter types
  - Return types
  - **Example**: `src/utils/validation.ts`
  - **Study**: Type annotations vs inference

### 5.3 Interfaces & Types

- [ ] **Type Definitions**
  - **File**: `src/types/models.ts`, `src/types/api.ts`
  - **Concepts**:
    - `interface` vs `type`
    - Extending interfaces
    - Generic types
  - **Example**: `src/api/hotels/index.ts` - Type definitions
  - **Study**: When to use interface vs type

### 5.4 Generics

- [ ] **Generic Types**
  - **Examples**:
    - `useDebounce<T>` in `src/hooks/useDebounce.ts`
    - `useLocalStorage<T>` in `src/hooks/useLocalStorage.ts`
  - **Study**: Generic constraints, utility types

### 5.5 Utility Types

- [ ] **TypeScript Utility Types**
  - `Partial<T>`, `Required<T>`, `Pick<T>`, `Omit<T>`
  - **Example**: `src/components/forms/FormField.tsx` line 6-9
  - **Study**: All utility types and their use cases

### 5.6 Type Guards

- [ ] **Runtime Type Checking**
  - `typeof`, `instanceof`
  - Custom type guards
  - **Example**: `src/components/forms/FormField.tsx` - `getErrorMessage` function
  - **Study**: Type narrowing, discriminated unions

---

## 6. React Core Concepts

### 6.1 React 19 Features

- [ ] **React Version**
  - **Package**: `react@19.2.0`, `react-dom@19.2.0`
  - **New Features**: React 19 improvements
  - **Study**: React 19 release notes, new features

### 6.2 JSX & Components

- [ ] **Component Basics**
  - Function components
  - JSX syntax
  - Props
  - **Examples**: All `.tsx` files in `src/components/`
  - **Study**: JSX transformation, component composition

### 6.3 Hooks Fundamentals

- [ ] **Built-in Hooks**
  - `useState` - State management
  - `useEffect` - Side effects
  - `useCallback` - Memoized callbacks
  - `useMemo` - Memoized values
  - `useRef` - Refs
  - `useContext` - Context API
  - **Examples**: Throughout codebase
  - **Study**: Rules of hooks, hook dependencies

### 6.4 Component Lifecycle

- [ ] **Lifecycle Understanding**
  - Mount, update, unmount
  - `useEffect` dependencies
  - Cleanup functions
  - **Example**: `src/hooks/useDebounce.ts` - cleanup in useEffect
  - **Study**: React lifecycle, effect cleanup

### 6.5 Context API

- [ ] **React Context**
  - **Files**: `src/providers/ThemeContext.tsx`
  - **Usage**: Theme, notifications, loading states
  - **Pattern**: Provider pattern
  - **Example**: `src/providers/index.tsx`
  - **Study**: When to use Context vs props vs state management

### 6.6 StrictMode

- [ ] **React StrictMode**
  - **File**: `src/main.tsx` line 10
  - **Purpose**: Development checks, double-invocation
  - **Study**: StrictMode benefits, what it checks

---

## 7. State Management

### 7.1 Redux Toolkit (RTK)

- [ ] **Redux Toolkit Basics**
  - **Package**: `@reduxjs/toolkit@2.11.1`
  - **Why RTK**: Simplified Redux, less boilerplate
  - **File**: `src/store/index.ts`
  - **Study**: Redux fundamentals, RTK vs plain Redux

### 7.2 Store Configuration

- [ ] **Store Setup**
  - **File**: `src/store/index.ts`
  - **Concepts**:
    - `configureStore` - Store creation
    - Reducers combination
    - Middleware setup
    - Preloaded state (persistence)
  - **Key Features**:
    - Search state persistence to localStorage
    - RTK Query middleware integration
  - **Study**: Redux store structure, middleware

### 7.3 Slices

- [ ] **Redux Slices**
  - **Files**:
    - `src/store/authSlice.ts`
    - `src/store/searchSlice.ts`
  - **Concepts**:
    - `createSlice` - Slice creation
    - Initial state
    - Reducers (actions)
    - Selectors
  - **Example**: `src/store/authSlice.ts` - Complete slice example
  - **Study**: Slice pattern, immutability with Immer

### 7.4 Selectors

- [ ] **Selector Pattern**
  - **File**: `src/store/authSlice.ts` lines 34-42
  - **Purpose**: Reusable state access
  - **Usage**: `useAppSelector(selectToken)`
  - **Study**: Selector memoization, reselect library

### 7.5 RTK Query

- [ ] **RTK Query Fundamentals**
  - **Package**: Built into `@reduxjs/toolkit`
  - **File**: `src/api/baseApi.ts`
  - **Concepts**:
    - `createApi` - API definition
    - `fetchBaseQuery` - Base query configuration
    - `injectEndpoints` - Endpoint injection
    - Tag-based cache invalidation
  - **Study**: RTK Query vs React Query, caching strategy

### 7.6 Base API Configuration

- [ ] **baseApi.ts**
  - **File**: `src/api/baseApi.ts`
  - **Key Features**:
    - Base URL from env
    - Automatic token injection
    - Tag types for cache invalidation
  - **Example**: Authorization header setup
  - **Study**: API configuration patterns

### 7.7 API Endpoints

- [ ] **Endpoint Definition**
  - **Files**: `src/api/*/index.ts`
  - **Pattern**: `injectEndpoints` with `builder.query` and `builder.mutation`
  - **Concepts**:
    - Queries (GET requests)
    - Mutations (POST/PUT/DELETE)
    - `providesTags` - Cache tags
    - `invalidatesTags` - Cache invalidation
  - **Example**: `src/api/hotels/index.ts`
  - **Study**: Query vs mutation, cache tags

### 7.8 Generated Hooks

- [ ] **Auto-generated Hooks**
  - RTK Query generates hooks automatically
  - **Pattern**: `use[EndpointName]Query` / `use[EndpointName]Mutation`
  - **Example**: `useGetHotelsQuery`, `useCreateBookingMutation`
  - **Return Values**:
    - `data` - Response data
    - `isLoading` - Initial load
    - `isFetching` - Any fetch
    - `error` - Error state
    - `refetch` - Manual refetch
  - **Study**: Hook options, polling, skip conditions

### 7.9 State Persistence

- [ ] **LocalStorage Integration**
  - **File**: `src/store/index.ts` lines 36-42
  - **Pattern**: Subscribe to store changes, save to localStorage
  - **Example**: Search state persistence
  - **Study**: State persistence strategies, hydration

---

## 8. Routing & Navigation

### 8.1 React Router v7

- [ ] **React Router DOM**
  - **Package**: `react-router-dom@7.9.6`
  - **File**: `src/routes/routes.tsx`
  - **Study**: React Router v7 features, differences from v6

### 8.2 Router Configuration

- [ ] **createBrowserRouter**
  - **File**: `src/routes/routes.tsx` line 46
  - **Concepts**:
    - Route definition
    - Nested routes
    - Error boundaries per route
    - Lazy loading
  - **Study**: Router configuration patterns

### 8.3 Lazy Loading

- [ ] **Code Splitting**
  - **File**: `src/routes/routes.tsx` lines 11-25
  - **Pattern**: `lazy(() => import('@/pages/Home'))`
  - **Benefits**: Smaller initial bundle, faster load
  - **Study**: Dynamic imports, React.lazy, Suspense

### 8.4 Suspense & Loading States

- [ ] **Suspense Pattern**
  - **File**: `src/routes/routes.tsx` lines 27-44
  - **Component**: `SuspenseLayout` wrapper
  - **Fallback**: Loading spinner during code load
  - **Study**: Suspense boundaries, error boundaries with routes

### 8.5 Protected Routes

- [ ] **Route Protection**
  - **Files**:
    - `src/components/auth/ProtectedRoute.tsx`
    - `src/components/auth/AdminRoute.tsx`
    - `src/components/auth/RedirectIfAuthenticated.tsx`
  - **Patterns**:
    - HOC pattern for route protection
    - Token checking
    - Redirect on unauthorized access
    - Location state preservation
  - **Example**: `src/components/auth/ProtectedRoute.tsx`
  - **Study**: Authentication patterns, route guards

### 8.6 Navigation Hooks

- [ ] **React Router Hooks**
  - `useNavigate` - Programmatic navigation
  - `useLocation` - Current location
  - `useParams` - Route parameters
  - `useSearchParams` - Query parameters
  - **Examples**: Throughout pages
  - **Study**: All React Router hooks

### 8.7 Route Error Handling

- [ ] **Error Boundaries in Routes**
  - **File**: `src/routes/routes.tsx` - `errorElement`
  - **Component**: `RouteError`
  - **Study**: Error boundary pattern with routing

---

## 9. UI Framework & Styling

### 9.1 Material-UI (MUI) v7

- [ ] **MUI Core**
  - **Package**: `@mui/material@7.3.5`
  - **What is MUI**: React component library
  - **Study**: MUI documentation, component API

### 9.2 MUI Icons

- [ ] **Icon Library**
  - **Package**: `@mui/icons-material@7.3.5`
  - **Usage**: `import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'`
  - **Examples**: Throughout components
  - **Study**: Icon usage patterns

### 9.3 MUI X Components

- [ ] **Advanced MUI Components**
  - **Data Grid**: `@mui/x-data-grid@8.19.0` - Admin tables
  - **Date Pickers**: `@mui/x-date-pickers@8.19.0` - Available but not used; project uses native HTML5 date inputs
  - **Study**: MUI X documentation

### 9.4 Emotion (CSS-in-JS)

- [ ] **Emotion Styling**
  - **Packages**: `@emotion/react@11.14.0`, `@emotion/styled@11.14.1`
  - **Purpose**: CSS-in-JS solution used by MUI
  - **Pattern**: `sx` prop for styling
  - **Example**: `src/pages/Checkout/Checkout.tsx` - sx prop usage
  - **Study**: Emotion API, sx prop, styled components

### 9.5 Theme Configuration

- [ ] **MUI Theme**
  - **File**: `src/theme/index.ts`
  - **Concepts**:
    - `createTheme` - Theme creation
    - `responsiveFontSizes` - Responsive typography
    - Palette (colors)
    - Typography
    - Components customization
    - Custom variants
  - **Features**:
    - Light/dark mode support
    - RTL support
    - Custom button variants
    - Custom typography variants
  - **Study**: Theme customization, design tokens

### 9.6 Theme Context

- [ ] **Theme Provider**
  - **File**: `src/providers/ThemeContext.tsx`
  - **Pattern**: Context API for theme management
  - **Features**: Theme mode switching, persistence
  - **Study**: Context pattern for global state

### 9.7 Responsive Design

- [ ] **MUI Breakpoints**
  - **Breakpoints**: `xs`, `sm`, `md`, `lg`, `xl`
  - **Usage**: `sx={{ fontSize: { xs: '1rem', md: '1.5rem' } }}`
  - **Hook**: `useTheme`, `useMediaQuery`
  - **Examples**: Throughout components
  - **Study**: Responsive design patterns, mobile-first

### 9.8 CSS Reset

- [ ] **Reset Styles**
  - **File**: `src/styles/reset.css`
  - **Purpose**: Normalize browser defaults
  - **Study**: CSS reset vs normalize

---

## 10. Forms & Validation

### 10.1 Formik

- [ ] **Formik Library**
  - **Package**: `formik@2.4.9`
  - **Purpose**: Form state management
  - **Concepts**:
    - `useFormik` hook
    - `FormikProvider` / `useFormikContext`
    - Form values, errors, touched
    - `handleChange`, `handleBlur`, `handleSubmit`
  - **Study**: Formik documentation, form patterns

### 10.2 Yup Validation

- [ ] **Yup Schema Validation**
  - **Package**: `yup@1.7.1`
  - **Purpose**: Schema-based validation
  - **Pattern**: Define schema, validate with Formik
  - **Example**: Check form components in `src/pages/Checkout/`
  - **Study**: Yup API, validation schemas

### 10.3 Custom Form Components

- [ ] **Reusable Form Components**
  - **Files**:
    - `src/components/forms/FormField.tsx`
    - `src/components/forms/FormSelect.tsx`
    - `src/components/forms/FormActions.tsx`
  - **Pattern**: Formik context integration
  - **Example**: `src/components/forms/FormField.tsx` - Complete example
  - **Study**: Component composition, form patterns

### 10.4 Validation Utilities

- [ ] **Custom Validators**
  - **File**: `src/utils/validation.ts`
  - **Functions**: Email, phone, URL, number validation
  - **Study**: Validation patterns, regex

---

## 11. API Integration

### 11.1 RTK Query (Already Covered)

- [ ] Review RTK Query section (7.5-7.8)

### 11.2 API Structure

- [ ] **API Organization**
  - **Directory**: `src/api/`
  - **Structure**: Feature-based API files
  - **Files**:
    - `baseApi.ts` - Base configuration
    - `auth/index.ts` - Authentication
    - `hotels/index.ts` - Hotels
    - `checkout/index.ts` - Booking
    - `admin/index.ts` - Admin operations
  - **Study**: API organization patterns

### 11.3 Request Configuration

- [ ] **Base Query Setup**
  - **File**: `src/api/baseApi.ts`
  - **Features**:
    - Base URL configuration
    - Header preparation (token injection)
    - Error handling
  - **Study**: HTTP client configuration

### 11.4 Cache Management

- [ ] **Cache Tags**
  - **File**: `src/api/baseApi.ts` line 15
  - **Tag Types**: `['Auth', 'Hotel', 'Rooms', ...]`
  - **Usage**: `providesTags`, `invalidatesTags`
  - **Study**: Cache invalidation strategies

### 11.5 Error Handling

- [ ] **API Error Handling**
  - RTK Query error states
  - Try-catch with `.unwrap()`
  - **Example**: `src/pages/Checkout/Checkout.tsx` lines 41-66
  - **Study**: Error handling patterns

### 11.6 OpenAPI Type Generation

- [ ] **Type Generation**
  - **Package**: `openapi-typescript@7.10.1`
  - **Script**: `"gen:api": "openapi-typescript ..."`
  - **Purpose**: Generate TypeScript types from OpenAPI spec
  - **Output**: `src/types/api.ts`
  - **Study**: OpenAPI, type generation workflows

---

## 12. Internationalization (i18n)

### 12.1 i18next

- [ ] **i18next Library**
  - **Package**: `i18next@25.7.3`
  - **Purpose**: Internationalization framework
  - **Study**: i18next documentation

### 12.2 react-i18next

- [ ] **React Integration**
  - **Package**: `react-i18next@16.5.0`
  - **Hook**: `useTranslation`
  - **Usage**: `const { t } = useTranslation()`
  - **Examples**: Throughout pages
  - **Study**: react-i18next API

### 12.3 Language Detection

- [ ] **Browser Language Detection**
  - **Package**: `i18next-browser-languagedetector@8.2.0`
  - **File**: `src/i18n/config.ts`
  - **Features**: Auto-detect from localStorage, browser
  - **Study**: Language detection strategies

### 12.4 i18n Configuration

- [ ] **i18n Setup**
  - **File**: `src/i18n/config.ts`
  - **Concepts**:
    - Resource loading
    - Fallback language
    - Interpolation
    - Detection order
  - **Study**: i18next configuration options

### 12.5 Translation Files

- [ ] **Translation Structure**
  - **Files**: `src/i18n/locales/en.json`, `src/i18n/locales/ar.json`
  - **Structure**: Nested JSON for organization
  - **Study**: Translation key organization

### 12.6 RTL Support

- [ ] **Right-to-Left Languages**
  - **Hook**: `useRTL` in `src/hooks/useRTL.ts`
  - **Integration**: Theme direction, MUI RTL
  - **Study**: RTL implementation patterns

---

## 13. Error Handling & Logging

### 13.1 Error Boundaries

- [ ] **React Error Boundaries**
  - **File**: `src/components/error/ErrorBoundary.tsx`
  - **Concepts**:
    - Class component requirement
    - `getDerivedStateFromError`
    - `componentDidCatch`
    - Error UI
    - Reset functionality
  - **Example**: `ComponentErrorBoundary` class
  - **Study**: Error boundary lifecycle, limitations

### 13.2 HOC Error Boundary

- [ ] **withErrorBoundary HOC**
  - **File**: `src/components/error/withErrorBoundary.tsx`
  - **Pattern**: Higher-order component
  - **Usage**: Wrap components with error boundary
  - **Study**: HOC pattern, composition

### 13.3 Global Error Handlers

- [ ] **Global Error Setup**
  - **File**: `src/utils/globalErrors.ts`
  - **Events**: `unhandledrejection`, `error`
  - **Purpose**: Catch unhandled errors globally
  - **Integration**: `src/main.tsx` line 8
  - **Study**: Global error handling patterns

### 13.4 Logging System

- [ ] **Logger Utility**
  - **File**: `src/utils/logger.ts`
  - **Features**: Info, warn, error logging
  - **Pattern**: Timestamped console logging
  - **Study**: Logging strategies, production logging

### 13.5 Error Display

- [ ] **User-Friendly Errors**
  - Error messages in UI
  - Toast notifications for errors
  - **Study**: Error UX patterns

---

## 14. Testing

### 14.1 Vitest

- [ ] **Vitest Test Runner**
  - **Package**: `vitest@4.0.13`
  - **Why Vitest**: Fast, Vite-native, Jest-compatible
  - **Configuration**: `vite.config.ts` lines 33-38
  - **Study**: Vitest vs Jest, configuration

### 14.2 React Testing Library

- [ ] **Component Testing**
  - **Package**: `@testing-library/react@16.3.0`
  - **Concepts**:
    - `render` - Component rendering
    - `screen` - Query methods
    - `fireEvent` / `userEvent` - User interactions
  - **Examples**: `src/pages/**/tests/*.test.tsx`
  - **Study**: Testing Library philosophy, queries

### 14.3 Testing Utilities

- [ ] **Additional Testing Packages**
  - `@testing-library/jest-dom` - DOM matchers
  - `@testing-library/user-event` - User interaction
  - `jsdom` - DOM environment for tests
  - **Study**: Testing utilities, best practices

### 14.4 MSW (Mock Service Worker)

- [ ] **API Mocking**
  - **Package**: `msw@2.12.4`
  - **Purpose**: Mock API requests in tests
  - **Files**: `src/tests/msw/`
  - **Setup**: `setupTests.ts`
  - **Study**: MSW documentation, request mocking

### 14.5 Test Setup

- [ ] **Test Configuration**
  - **File**: `setupTests.ts`
  - **Setup**: MSW server, i18n initialization
  - **Hooks**: `beforeAll`, `afterEach`, `afterAll`
  - **Study**: Test setup patterns

### 14.6 Test Examples

- [ ] **Review Test Files**
  - `src/pages/Login/tests/Login.test.tsx`
  - `src/pages/Checkout/tests/Checkout.test.tsx`
  - `src/utils/tests/*.test.ts`
  - **Study**: Test structure, assertions, mocking

---

## 15. Code Quality & Linting

### 15.1 ESLint

- [ ] **ESLint Configuration**
  - **Package**: `eslint@9.39.1`
  - **File**: `eslint.config.js`
  - **Configuration**:
    - Flat config format (ESLint 9)
    - TypeScript ESLint
    - React hooks rules
    - Prettier integration
  - **Study**: ESLint configuration, rules

### 15.2 TypeScript ESLint

- [ ] **TypeScript Linting**
  - **Package**: `typescript-eslint@8.46.4`
  - **Features**: Type-aware linting
  - **Rules**: Type-checked rules
  - **Study**: TypeScript ESLint rules

### 15.3 Prettier

- [ ] **Code Formatting**
  - **Package**: `prettier@3.6.2`
  - **File**: `.prettierrc`
  - **Configuration**:
    - Single quotes
    - No semicolons
    - 100 char width
    - Trailing commas
  - **Study**: Prettier configuration, formatting rules

### 15.4 ESLint-Prettier Integration

- [ ] **Avoiding Conflicts**
  - **Package**: `eslint-config-prettier@10.1.8`
  - **Purpose**: Disable ESLint rules that conflict with Prettier
  - **Study**: Linting vs formatting

### 15.5 Pre-commit Hooks

- [ ] **Automated Quality Checks**
  - Husky + lint-staged (covered in section 2)
  - **Study**: Git hooks workflow

---

## 16. Performance Optimization

### 16.1 Code Splitting

- [ ] **Lazy Loading**
  - Route-based code splitting (covered in section 8.3)
  - **Study**: Code splitting strategies

### 16.2 Bundle Optimization

- [ ] **Vite Build Optimization**
  - **File**: `vite.config.ts` lines 19-31
  - **Manual Chunks**: Vendor splitting
  - **Benefits**: Smaller initial bundle, better caching
  - **Study**: Bundle optimization, chunk strategies

### 16.3 Memoization

- [ ] **React Memoization**
  - `useMemo` - Memoized values
  - `useCallback` - Memoized functions
  - `React.memo` - Memoized components
  - **Examples**: Throughout codebase
  - **Study**: When to memoize, performance impact

### 16.4 RTK Query Caching

- [ ] **Automatic Caching**
  - Request deduplication
  - Cache invalidation
  - **Study**: Caching strategies (covered in section 7.5)

### 16.5 Image Optimization

- [ ] **Image Handling**
  - **Component**: `SafeImage` in `src/components/common/SafeImage.tsx`
  - **Study**: Image optimization techniques

---

## 17. Project Structure & Architecture

### 17.1 Directory Structure

- [ ] **Folder Organization**
  - **Study**: `src/` directory structure
  - **Patterns**:
    - Feature-based organization
    - Separation of concerns
    - Co-location of related files
  - **Files to Review**:
    - `docs/PROJECT_STRUCTURE.md` (if exists)
    - Root `src/` structure

### 17.2 Path Aliases

- [ ] **Import Aliases**
  - **Configuration**: `tsconfig.app.json` + `vite.config.ts`
  - **Alias**: `@` → `src/`
  - **Usage**: `import '@/components'`
  - **Benefits**: Cleaner imports, easier refactoring
  - **Study**: Path alias patterns

### 17.3 File Naming Conventions

- [ ] **Naming Patterns**
  - Components: PascalCase (e.g., `Checkout.tsx`)
  - Hooks: camelCase with `use` prefix (e.g., `useAuth.ts`)
  - Utils: camelCase (e.g., `validation.ts`)
  - Types: camelCase (e.g., `models.ts`)
  - **Study**: Naming conventions, consistency

### 17.4 Component Organization

- [ ] **Component Structure**
  - **Directories**:
    - `components/` - Reusable components
    - `pages/` - Page components
    - `layouts/` - Layout components
  - **Pattern**: Co-location of related files
  - **Study**: Component organization patterns

### 17.5 Separation of Concerns

- [ ] **Architectural Patterns**
  - API layer (`src/api/`)
  - State layer (`src/store/`)
  - UI layer (`src/components/`, `src/pages/`)
  - Utils layer (`src/utils/`)
  - **Study**: Clean architecture, layer separation

---

## 18. React Patterns & Best Practices

### 18.1 Higher-Order Components (HOC)

- [ ] **HOC Pattern**
  - **Files**:
    - `src/components/hoc/withLoading.tsx`
    - `src/components/error/withErrorBoundary.tsx`
  - **Concepts**:
    - Function that takes component, returns component
    - Props transformation
    - Composition
  - **Example**: `withLoading` HOC
  - **Study**: HOC pattern, when to use HOC vs hooks

### 18.2 Render Props

- [ ] **Render Props Pattern**
  - (Check if used in codebase)
  - **Study**: Render props pattern

### 18.3 Compound Components

- [ ] **Compound Component Pattern**
  - (Check if used in codebase)
  - **Study**: Compound components

### 18.4 Provider Pattern

- [ ] **Context Providers**
  - **File**: `src/providers/index.tsx`
  - **Pattern**: Nested providers
  - **Providers**:
    - ThemeProvider
    - Redux Provider
    - NotificationProvider
    - LoadingProvider
  - **Study**: Provider composition, provider order

### 18.5 Custom Hooks Pattern

- [ ] **Reusable Logic**
  - Covered in section 19
  - **Study**: Custom hooks best practices

### 18.6 Component Composition

- [ ] **Composition over Inheritance**
  - Children props
  - Component composition
  - **Examples**: Throughout codebase
  - **Study**: Composition patterns

### 18.7 Prop Drilling Solutions

- [ ] **Avoiding Prop Drilling**
  - Context API
  - State management
  - **Study**: When to use each solution

---

## 19. Custom Hooks

### 19.1 useAuth

- [ ] **Authentication Hook** (Reference Only - Not Implemented)
  - **File**: `src/hooks/useAuth.ts` (does not exist - example only)
  - **Features**:
    - Token access
    - User type checking
    - Logout functionality
    - Navigation integration
  - **Status**: This hook is documented as a reference example but is not actually implemented in the project
  - **Note**: Authentication is handled via Redux slices and RTK Query hooks instead
  - **Study**: Hook composition, Redux integration (for future reference)

### 19.2 useDebounce

- [ ] **Debounce Hook** (Reference Only - Not Implemented)
  - **File**: `src/hooks/useDebounce.ts` (does not exist - example only)
  - **Purpose**: Delay value updates
  - **Use Case**: Search input debouncing
  - **Status**: This hook is documented as a reference example but is not actually implemented in the project
  - **Note**: The project does not currently use debouncing for search inputs
  - **Study**: Debouncing pattern, cleanup (for future reference)

### 19.3 useLocalStorage

- [ ] **LocalStorage Hook** (Reference Only - Not Implemented)
  - **File**: `src/hooks/useLocalStorage.ts` (does not exist - example only)
  - **Features**:
    - Sync with localStorage
    - Storage event listening
    - Type-safe
    - Generic implementation
  - **Status**: This hook is documented as a reference example but is not actually implemented in the project
  - **Note**: LocalStorage is handled directly in Redux slices (authSlice, searchSlice) instead
  - **Study**: LocalStorage patterns, storage events (for future reference)

### 19.4 useNotification

- [ ] **Notification Hook** ✅ **IMPLEMENTED**
  - **File**: `src/hooks/useNotification.ts` ✅ **EXISTS**
  - **Purpose**: Toast notifications
  - **Status**: Actually implemented and used throughout the project
  - **Study**: Notification patterns

### 19.5 useRTL

- [ ] **RTL Hook** ✅ **IMPLEMENTED**
  - **File**: `src/hooks/useRTL.ts` ✅ **EXISTS**
  - **Purpose**: RTL language support
  - **Status**: Actually implemented and used for Arabic language support
  - **Study**: RTL implementation

### 19.6 Other Custom Hooks

- [ ] **Additional Hooks**
  - `useBooking` - Booking logic
  - `useSearch` - Search functionality
  - `useIntersectionObserver` - Intersection Observer API
  - **Study**: Each hook's purpose and implementation

### 19.7 Hook Best Practices

- [ ] **Hook Guidelines**
  - Rules of hooks
  - Dependency arrays
  - Cleanup functions
  - Naming conventions
  - **Study**: React hooks best practices

---

## 20. Authentication & Authorization

### 20.1 Authentication Flow

- [ ] **Login Process**
  - **File**: `src/pages/Login/` (review login page)
  - **Flow**:
    1. User submits credentials
    2. API call to authenticate
    3. Store token in localStorage
    4. Update Redux state
    5. Navigate to appropriate page
  - **Study**: Authentication flows, token management

### 20.2 Token Management

- [ ] **JWT Token Handling**
  - Storage: localStorage
  - Injection: Automatic in API requests
  - **File**: `src/api/baseApi.ts` - `prepareHeaders`
  - **Study**: Token storage strategies, security

### 20.3 Protected Routes

- [ ] **Route Protection**
  - Covered in section 8.5
  - **Study**: Authentication patterns

### 20.4 Role-Based Access

- [ ] **Admin vs User**
  - **File**: `src/components/auth/AdminRoute.tsx`
  - **Pattern**: User type checking
  - **Study**: RBAC patterns

### 20.5 Session Management

- [ ] **Session Handling**
  - Token persistence
  - Logout functionality
  - **File**: `src/hooks/useAuth.ts` - logout
  - **Study**: Session management strategies

---

## 21. Advanced Concepts

### 21.1 TypeScript Advanced

- [ ] **Advanced TypeScript**
  - Conditional types
  - Mapped types
  - Template literal types
  - **Study**: Advanced TypeScript features

### 21.2 React 19 Features

- [ ] **Latest React Features**
  - React Compiler
  - New hooks (if any)
  - **Study**: React 19 release notes

### 21.3 Performance Monitoring

- [ ] **Performance Tools**
  - React DevTools
  - Redux DevTools
  - **Study**: Performance profiling

### 21.4 Accessibility

- [ ] **A11y Best Practices**
  - ARIA labels
  - Keyboard navigation
  - Screen reader support
  - **Study**: Web accessibility guidelines

### 21.5 Maps Integration

- [ ] **Leaflet Maps**
  - **Packages**: `leaflet@1.9.4`, `react-leaflet@5.0.0`
  - **Purpose**: Interactive maps
  - **Study**: Leaflet documentation, map integration

### 21.6 Image Galleries

- [ ] **Image Gallery**
  - **Package**: `react-image-gallery@1.4.0`
  - **Purpose**: Hotel image galleries
  - **Study**: Image gallery patterns

### 21.7 Date Handling

- [ ] **Date Utilities**
  - **Package**: `date-fns@4.1.0`
  - **File**: `src/utils/date.ts`
  - **Purpose**: Date manipulation and formatting
  - **Study**: date-fns API, date handling

### 21.8 Notifications

- [ ] **Toast Notifications**
  - **Package**: `notistack@3.0.2`
  - **Integration**: NotificationProvider
  - **Study**: Notification patterns

### 21.9 Price Calculations

- [ ] **Price Utilities**
  - **File**: `src/utils/price.ts`
  - **Purpose**: Booking price calculations
  - **Study**: Financial calculations, precision

---

## 📝 Study Checklist Summary

### Phase 1: Foundation (Week 1)

- [ ] Git & Version Control
- [ ] Node.js & PNPM
- [ ] TypeScript Basics
- [ ] React Fundamentals
- [ ] Vite & Build Tools

### Phase 2: Core Technologies (Week 2)

- [ ] Redux Toolkit & RTK Query
- [ ] React Router
- [ ] Material-UI
- [ ] Forms (Formik + Yup)
- [ ] Testing (Vitest + RTL)

### Phase 3: Advanced Patterns (Week 3)

- [ ] Custom Hooks
- [ ] Error Handling
- [ ] Internationalization
- [ ] Performance Optimization
- [ ] Code Quality Tools

### Phase 4: Project-Specific (Week 4)

- [ ] Project Architecture
- [ ] API Integration Patterns
- [ ] Authentication Flow
- [ ] Component Patterns
- [ ] Review All Code Examples

---

## 🎯 Interview Preparation Tips

### Technical Questions to Prepare For

1. **"Explain the project architecture"**
   - Study: Section 17 (Project Structure)
   - Key Points: Feature-based, separation of concerns, layer architecture

2. **"How does state management work?"**
   - Study: Section 7 (State Management)
   - Key Points: RTK for client state, RTK Query for server state, persistence

3. **"How do you handle authentication?"**
   - Study: Section 20 (Authentication)
   - Key Points: Token storage, protected routes, role-based access

4. **"Explain the routing setup"**
   - Study: Section 8 (Routing)
   - Key Points: Lazy loading, protected routes, error boundaries

5. **"How do you handle errors?"**
   - Study: Section 13 (Error Handling)
   - Key Points: Error boundaries, global handlers, logging

6. **"What testing strategies do you use?"**
   - Study: Section 14 (Testing)
   - Key Points: Vitest, React Testing Library, MSW

7. **"How do you optimize performance?"**
   - Study: Section 16 (Performance)
   - Key Points: Code splitting, memoization, bundle optimization

8. **"Explain custom hooks you created"**
   - Study: Section 19 (Custom Hooks)
   - Key Points: Each hook's purpose, implementation, use cases

---

## 📚 Recommended Study Resources

### Official Documentation

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [React Router Documentation](https://reactrouter.com/)
- [Material-UI Documentation](https://mui.com/)
- [Vite Documentation](https://vitejs.dev/)
- [Vitest Documentation](https://vitest.dev/)

### Code Examples to Study

1. **State Management**: `src/store/index.ts`, `src/store/authSlice.ts`
2. **API Integration**: `src/api/baseApi.ts`, `src/api/hotels/index.ts`
3. **Routing**: `src/routes/routes.tsx`
4. **Custom Hooks**: `src/hooks/useAuth.ts`, `src/hooks/useDebounce.ts`
5. **Error Handling**: `src/components/error/ErrorBoundary.tsx`
6. **Forms**: `src/components/forms/FormField.tsx`
7. **Theme**: `src/theme/index.ts`
8. **Providers**: `src/providers/index.tsx`

---

## 🎤 Comprehensive Interview Preparation

### Critical: The study guide covers technical concepts, but interviews test MORE than just knowledge

---

### 📋 Additional Interview Question Categories

#### 1. Trade-off & Decision Questions

- [ ] **"Why did you choose RTK Query over React Query?"**
  - **Prepare**: Check `docs/adr/ADR-007-rtk-query-vs-axios.md`
  - **Key Points**:
    - RTK Query integrates with Redux store
    - Single source of truth
    - Built-in caching with Redux
    - Less boilerplate for Redux projects
  - **Practice**: Explain trade-offs clearly

- [ ] **"Why Redux Toolkit instead of Context API?"**
  - **Key Points**:
    - Complex state management needs
    - Time-travel debugging
    - Middleware support
    - DevTools integration
    - Performance for frequent updates
  - **Study**: `docs/STATE_MGMT_TRADEOFFS.md` (if exists)

- [ ] **"Why Vite instead of Create React App?"**
  - **Key Points**:
    - Faster HMR
    - Better performance
    - Modern ES modules
    - Better TypeScript support
    - Smaller bundle sizes

- [ ] **"Why PNPM instead of npm/yarn?"**
  - **Key Points**:
    - Disk efficiency (hard links)
    - Strict dependency resolution
    - Faster installs
    - Better monorepo support

#### 2. "What Would You Improve?" Questions

- [ ] **Code Quality Improvements**
  - **Potential Answers**:
    - Add E2E tests (Playwright/Cypress)
    - Implement service workers for offline support
    - Add performance monitoring (Sentry, LogRocket)
    - Implement proper error tracking
    - Add Storybook for component documentation
    - Improve accessibility (ARIA, keyboard navigation)
    - Add unit test coverage metrics

- [ ] **Architecture Improvements**
  - **Potential Answers**:
    - Consider micro-frontends for scalability
    - Add API response caching strategy
    - Implement optimistic updates
    - Add request retry logic
    - Consider React Server Components (if applicable)
    - Add GraphQL layer (if needed)

- [ ] **Performance Improvements**
  - **Potential Answers**:
    - Implement virtual scrolling for large lists
    - Add image lazy loading
    - Implement route prefetching
    - Add bundle analysis and optimization
    - Consider code splitting at component level

#### 3. Debugging & Troubleshooting Scenarios

- [ ] **"A user reports the app is slow. How do you debug?"**
  - **Steps to Explain**:
    1. Check browser DevTools (Performance tab)
    2. Analyze bundle size
    3. Check network requests (slow API?)
    4. Review React DevTools Profiler
    5. Check for memory leaks
    6. Analyze Redux DevTools for state issues
    7. Check for unnecessary re-renders

- [ ] **"The app crashes on production but works locally. How do you debug?"**
  - **Steps to Explain**:
    1. Check error logging (logger.ts)
    2. Review error boundaries
    3. Check environment variables
    4. Review build configuration
    5. Check browser compatibility
    6. Review console errors in production
    7. Check API endpoints and CORS

- [ ] **"Users can't log in. What could be wrong?"**
  - **Debugging Checklist**:
    1. Check token storage (localStorage)
    2. Verify API endpoint is correct
    3. Check network requests in DevTools
    4. Verify token expiration handling
    5. Check error messages from API
    6. Review authentication flow
    7. Check protected route logic

#### 4. System Design & Architecture Questions

- [ ] **"How would you scale this application?"**
  - **Consider**:
    - Horizontal scaling (multiple instances)
    - CDN for static assets
    - Database optimization
    - Caching strategies (Redis)
    - Load balancing
    - Microservices architecture
    - Database sharding

- [ ] **"How would you handle 1 million concurrent users?"**
  - **Consider**:
    - Server-side rendering (Next.js)
    - Edge computing
    - Caching at multiple levels
    - Database read replicas
    - API rate limiting
    - Queue systems for heavy operations

- [ ] **"How do you ensure code quality at scale?"**
  - **Answer**:
    - Pre-commit hooks (already implemented)
    - CI/CD pipeline
    - Code reviews
    - Automated testing
    - Linting and formatting
    - TypeScript strict mode
    - Documentation standards

#### 5. Behavioral & Process Questions

- [ ] **"Tell me about a challenging bug you fixed"**
  - **Prepare**: Think of examples from this project
  - **Structure**: Situation → Problem → Solution → Result
  - **Example**: Error boundary implementation, state persistence issue

- [ ] **"How do you handle conflicting requirements?"**
  - **Answer**: Communication, documentation, trade-off analysis

- [ ] **"How do you stay updated with React/tech changes?"**
  - **Answer**:
    - Official documentation
    - React blog
    - Tech communities
    - Conferences
    - Experimentation

- [ ] **"Describe your development workflow"**
  - **Answer**:
    1. Understand requirements
    2. Plan architecture
    3. Write tests first (TDD if applicable)
    4. Implement feature
    5. Test locally
    6. Code review
    7. Deploy

#### 6. Live Coding Expectations

- [ ] **Be Ready to:**
  - Write a custom hook on the spot
  - Fix a bug in existing code
  - Implement a small feature
  - Explain code as you write
  - Handle TypeScript errors
  - Use React hooks correctly

- [ ] **Practice Exercises:**
  - Create a `useToggle` hook
  - Implement a debounced search input
  - Create a form with validation
  - Fix a memory leak in useEffect
  - Optimize a slow component

#### 7. Business Logic & User Flow Questions

- [ ] **"Walk me through the booking flow"**
  - **Study**: `src/pages/Checkout/Checkout.tsx`
  - **Flow**:
    1. User searches hotels
    2. Selects hotel and room
    3. Fills checkout form
    4. Submits booking
    5. Receives confirmation
  - **Be Ready**: Explain each step in detail

- [ ] **"How does the search functionality work?"**
  - **Study**: `src/store/searchSlice.ts`, search pages
  - **Explain**: State management, API calls, filtering

- [ ] **"How does admin authentication differ from user?"**
  - **Study**: `src/components/auth/AdminRoute.tsx`
  - **Explain**: Role-based access control

#### 8. Testing & Quality Assurance

- [ ] **"How do you ensure your code works?"**
  - **Answer**:
    - Unit tests (Vitest)
    - Component tests (RTL)
    - Manual testing
    - TypeScript for type safety
    - ESLint for code quality
    - Pre-commit hooks

- [ ] **"What's your test coverage strategy?"**
  - **Answer**:
    - Critical paths (auth, booking)
    - Utility functions
    - Custom hooks
    - Complex components
    - Edge cases

#### 9. Deployment & DevOps

- [ ] **"How do you deploy this application?"**
  - **Consider**:
    - Build process (`pnpm build`)
    - Environment variables
    - Static hosting (Netlify, Vercel, etc.)
    - CI/CD pipeline
    - Preview deployments
    - Rollback strategy

- [ ] **"What's in your CI/CD pipeline?"**
  - **Potential Steps**:
    1. Install dependencies
    2. Run typecheck
    3. Run linter
    4. Run tests
    5. Build application
    6. Deploy to staging
    7. Run E2E tests
    8. Deploy to production

#### 10. Security Questions

- [ ] **"How do you secure user data?"**
  - **Answer**:
    - HTTPS only
    - Token-based authentication
    - Input validation
    - XSS protection (React escaping)
    - No sensitive data in code
    - Environment variables for secrets

- [ ] **"How do you prevent XSS attacks?"**
  - **Answer**:
    - React's built-in escaping
    - Sanitize user input
    - Avoid `dangerouslySetInnerHTML`
    - Content Security Policy

#### 11. Performance Deep Dive

- [ ] **"How do you measure performance?"**
  - **Tools**:
    - Lighthouse
    - React DevTools Profiler
    - Chrome DevTools Performance
    - Bundle analyzer
    - Web Vitals

- [ ] **"What metrics do you track?"**
  - **Answer**:
    - First Contentful Paint (FCP)
    - Largest Contentful Paint (LCP)
    - Time to Interactive (TTI)
    - Bundle size
    - API response times

#### 12. Code Review & Collaboration

- [ ] **"What do you look for in code reviews?"**
  - **Answer**:
    - Code quality
    - Performance implications
    - Security issues
    - Test coverage
    - Documentation
    - Accessibility
    - Type safety

---

### 🎯 Practice Exercises (Do These!)

#### Exercise 1: Explain the Project in 5 Minutes

- [ ] Practice explaining the entire project architecture
- [ ] Cover: Tech stack, architecture, key features
- [ ] Time yourself - be concise but complete

#### Exercise 2: Code Walkthrough

- [ ] Pick a complex component (e.g., `Checkout.tsx`)
- [ ] Explain every line of code
- [ ] Explain design decisions
- [ ] Explain potential improvements

#### Exercise 3: Debugging Scenario

- [ ] Imagine: "Users report bookings aren't saving"
- [ ] Walk through your debugging process
- [ ] Explain what you'd check and why

#### Exercise 4: Architecture Discussion

- [ ] Explain why you chose this architecture
- [ ] Discuss alternatives you considered
- [ ] Explain trade-offs

#### Exercise 5: Live Coding Practice

- [ ] Practice writing hooks from scratch
- [ ] Practice fixing TypeScript errors
- [ ] Practice implementing small features
- [ ] Practice explaining while coding

---

### 📝 Additional Preparation Checklist

- [ ] **Read Architecture Decision Records (ADRs)**
  - Check `docs/adr/` folder
  - Understand why decisions were made
  - Be ready to discuss alternatives

- [ ] **Review Project Documentation**
  - `README.md` - Project overview
  - `docs/PROJECT_STRUCTURE.md` - Structure details
  - `docs/ROUTES.md` - Routing documentation
  - Any other docs in `docs/` folder

- [ ] **Understand the Business Domain**
  - What is Voya? (Hotel booking platform)
  - Key user flows
  - Admin vs User features
  - Business logic

- [ ] **Practice Explaining Out Loud**
  - Record yourself explaining concepts
  - Practice with a friend
  - Time your explanations

- [ ] **Prepare Questions to Ask**
  - "What's the team structure?"
  - "What's the biggest technical challenge?"
  - "How do you handle code reviews?"
  - "What's the deployment process?"

- [ ] **Review Recent Changes**
  - Check git history
  - Understand recent features
  - Be ready to discuss recent work

- [ ] **Prepare for "Tell Me About Yourself"**
  - Your background
  - Why you're interested
  - What you bring to the team

---

### ⚠️ Common Interview Pitfalls to Avoid

1. **Don't just memorize** - Understand the "why"
2. **Don't say "I don't know" immediately** - Think out loud, show problem-solving
3. **Don't be defensive** - Accept feedback gracefully
4. **Don't oversell** - Be honest about your experience level
5. **Don't ignore edge cases** - Think about error scenarios
6. **Don't skip testing** - Always mention testing in your answers

---

### 🎓 Final Reality Check

**The study guide covers ~80% of technical questions, but you also need:**

✅ **Behavioral skills** (communication, problem-solving)  
✅ **System thinking** (architecture, scaling)  
✅ **Practical experience** (debugging, troubleshooting)  
✅ **Business understanding** (user flows, requirements)  
✅ **Confidence** (explaining clearly, handling pressure)

**Recommendation**:

1. Complete the study guide (technical foundation)
2. Practice explaining concepts out loud
3. Do the practice exercises above
4. Review ADRs and documentation
5. Prepare for behavioral questions
6. Practice live coding
7. Prepare questions to ask them

---

## ✅ Final Checklist Before Interview

### Technical Knowledge

- [ ] Can explain every technology in package.json
- [ ] Understand all scripts and their purposes
- [ ] Can walk through the project structure
- [ ] Understand Redux Toolkit and RTK Query
- [ ] Can explain routing and lazy loading
- [ ] Understand all custom hooks
- [ ] Can explain error handling strategy
- [ ] Understand testing setup and patterns
- [ ] Can explain performance optimizations
- [ ] Understand authentication flow
- [ ] Can explain i18n implementation
- [ ] Reviewed all code examples mentioned
- [ ] Can explain design decisions (check docs/adr/)
- [ ] Understand build and deployment process

### Interview Readiness

- [ ] Can explain the project in 5 minutes
- [ ] Can walk through any component in detail
- [ ] Prepared answers for trade-off questions
- [ ] Prepared answers for "what would you improve"
- [ ] Can explain debugging process
- [ ] Can discuss architecture decisions
- [ ] Practiced explaining code out loud
- [ ] Prepared behavioral question answers
- [ ] Can write code on the spot
- [ ] Understand business logic and user flows
- [ ] Prepared questions to ask interviewers
- [ ] Reviewed ADRs and project documentation

---

## 23. Production Readiness & Future Improvements

> **Critical improvements needed to make this project production-ready. Essential for interview discussions about project maturity and technical debt.**

### 🔒 Security Enhancements

#### High Priority

- [ ] **Token Storage Security**
  - **Current**: Tokens stored in localStorage (vulnerable to XSS)
  - **Improvement**: Consider httpOnly cookies for tokens
  - **Alternative**: Implement token refresh mechanism
  - **Study**: OWASP security best practices

- [ ] **Input Sanitization**
  - **Current**: Basic validation with Yup
  - **Improvement**: Add HTML sanitization for user inputs
  - **Library**: DOMPurify for client-side sanitization
  - **Use Case**: Special requests field, descriptions

- [ ] **Content Security Policy (CSP)**
  - **Current**: Not implemented
  - **Improvement**: Add CSP headers
  - **Purpose**: Prevent XSS attacks
  - **Implementation**: Meta tags or server headers

- [ ] **API Security**
  - **Current**: Basic Bearer token authentication
  - **Improvements**:
    - Implement request rate limiting
    - Add CSRF protection
    - Validate and sanitize API responses
    - Implement API versioning

- [ ] **Environment Variables Security**
  - **Current**: Basic .env usage
  - **Improvement**:
    - Never commit .env files
    - Use secrets management (AWS Secrets Manager, etc.)
    - Validate required env vars at startup

#### Medium Priority

- [ ] **HTTPS Enforcement**
  - Ensure all API calls use HTTPS
  - Redirect HTTP to HTTPS
  - HSTS headers

- [ ] **Password Security**
  - **Current**: Basic login (if implemented)
  - **Improvement**:
    - Password strength requirements
    - Password reset flow
    - Account lockout after failed attempts

### 📊 Monitoring & Observability

#### High Priority

- [ ] **Error Tracking**
  - **Current**: Basic console logging
  - **Improvement**: Integrate error tracking service
  - **Options**:
    - Sentry (recommended)
    - LogRocket
    - Rollbar
  - **Features Needed**:
    - Error aggregation
    - Source maps for production
    - User context
    - Error notifications

- [ ] **Performance Monitoring**
  - **Current**: No performance monitoring
  - **Improvement**: Add performance monitoring
  - **Options**:
    - Web Vitals tracking
    - Real User Monitoring (RUM)
    - Lighthouse CI
  - **Metrics to Track**:
    - First Contentful Paint (FCP)
    - Largest Contentful Paint (LCP)
    - Time to Interactive (TTI)
    - Cumulative Layout Shift (CLS)

- [ ] **Analytics**
  - **Current**: No analytics
  - **Improvement**: Add analytics tracking
  - **Options**:
    - Google Analytics 4
    - Plausible (privacy-focused)
    - Mixpanel (for user behavior)
  - **Track**:
    - Page views
    - User flows
    - Conversion rates
    - Feature usage

- [ ] **API Monitoring**
  - Monitor API response times
  - Track API error rates
  - Set up alerts for API failures
  - **Tools**:
    - New Relic
    - Datadog
    - Custom monitoring dashboard

### 🧪 Testing Improvements

#### High Priority

- [ ] **Increase Test Coverage**
  - **Current**: Basic unit tests
  - **Target**: 80%+ code coverage
  - **Areas to Cover**:
    - All custom hooks
    - All utility functions
    - Critical user flows
    - Error boundaries
    - Form validations

- [ ] **End-to-End (E2E) Testing**
  - **Current**: Not implemented
  - **Improvement**: Add E2E tests
  - **Tools**:
    - Playwright (recommended)
    - Cypress
    - Puppeteer
  - **Critical Flows to Test**:
    - Complete booking flow
    - Login/logout
    - Search and filter
    - Admin CRUD operations

- [ ] **Integration Testing**
  - Test API integrations
  - Test RTK Query hooks
  - Test state management flows
  - **Tools**: MSW (already set up, expand usage)

- [ ] **Visual Regression Testing**
  - **Current**: Not implemented
  - **Improvement**: Add visual regression tests
  - **Tools**:
    - Percy
    - Chromatic
    - BackstopJS
  - **Purpose**: Catch UI regressions

- [ ] **Accessibility Testing**
  - **Current**: Basic accessibility
  - **Improvement**:
    - Automated a11y testing (axe-core)
    - Keyboard navigation testing
    - Screen reader testing
    - WCAG compliance audit

### 🚀 Performance Optimizations

#### High Priority

- [ ] **Image Optimization**
  - **Current**: Basic image loading
  - **Improvements**:
    - Implement image lazy loading (partially done)
    - Add responsive images (srcset)
    - Use WebP format with fallbacks
    - Implement image CDN
    - Add blur-up placeholders

- [ ] **Bundle Size Optimization**
  - **Current**: Basic code splitting
  - **Improvements**:
    - Analyze bundle size (webpack-bundle-analyzer)
    - Remove unused dependencies
    - Implement route-based prefetching
    - Optimize vendor chunks further

- [ ] **Caching Strategy**
  - **Current**: RTK Query caching
  - **Improvements**:
    - Implement service worker for offline support
    - Add HTTP caching headers
    - Implement stale-while-revalidate pattern
    - Cache static assets aggressively

- [ ] **Database Query Optimization**
  - Optimize API queries
  - Implement pagination properly
  - Add query result caching
  - Reduce over-fetching

#### Medium Priority

- [ ] **Virtual Scrolling**
  - **Current**: Infinite scroll (may have performance issues with large lists)
  - **Improvement**: Implement virtual scrolling for large lists
  - **Library**: react-window or react-virtualized
  - **Use Case**: Search results, admin grids

- [ ] **Memoization Review**
  - Audit all components for unnecessary re-renders
  - Add React.memo where beneficial
  - Optimize useMemo/useCallback usage
  - Use React DevTools Profiler

- [ ] **Preloading Critical Resources**
  - Preload critical fonts
  - Prefetch next route resources
  - Preconnect to API domains

### 📝 Documentation Improvements

#### High Priority

- [ ] **API Documentation**
  - Document all API endpoints
  - Add request/response examples
  - Document error codes
  - **Tool**: Swagger/OpenAPI (partially done)

- [ ] **Component Documentation**
  - **Current**: Basic component structure
  - **Improvement**: Add Storybook
  - **Benefits**:
    - Visual component library
    - Interactive component playground
    - Documentation for all props
    - Usage examples

- [ ] **Code Comments**
  - Add JSDoc comments to complex functions
  - Document business logic
  - Explain non-obvious code decisions
  - Add inline comments for complex algorithms

- [ ] **Architecture Documentation**
  - Document system architecture
  - Create architecture diagrams
  - Document data flow
  - Document state management patterns

- [ ] **Deployment Documentation**
  - Document deployment process
  - Environment setup guide
  - Troubleshooting guide
  - Rollback procedures

### ♿ Accessibility Improvements

#### High Priority

- [ ] **ARIA Labels**
  - Add ARIA labels to all interactive elements
  - Ensure proper ARIA roles
  - Add ARIA live regions for dynamic content
  - **Study**: WCAG 2.1 guidelines

- [ ] **Keyboard Navigation**
  - Ensure all features accessible via keyboard
  - Proper focus management
  - Skip navigation links
  - Focus trap in modals

- [ ] **Screen Reader Support**
  - Test with screen readers (NVDA, JAWS, VoiceOver)
  - Proper heading hierarchy
  - Alt text for all images
  - Descriptive link text

- [ ] **Color Contrast**
  - Ensure WCAG AA compliance (4.5:1 ratio)
  - Test in both light and dark modes
  - Don't rely solely on color for information

- [ ] **Form Accessibility**
  - Proper label associations
  - Error announcements
  - Required field indicators
  - Form validation feedback

### 🔍 SEO Improvements

#### High Priority

- [ ] **Meta Tags**
  - Add proper meta descriptions
  - Open Graph tags for social sharing
  - Twitter Card tags
  - Canonical URLs

- [ ] **Structured Data**
  - Implement JSON-LD structured data
  - Schema.org markup for hotels
  - Rich snippets for search results

- [ ] **URL Structure**
  - SEO-friendly URLs
  - Proper URL parameters
  - Sitemap generation

- [ ] **Server-Side Rendering (SSR)**
  - **Current**: Client-side only
  - **Consideration**: Next.js migration for SSR
  - **Benefits**: Better SEO, faster initial load

### 🔄 CI/CD Pipeline

#### High Priority

- [ ] **Continuous Integration**
  - **Current**: Pre-commit hooks only
  - **Improvement**: Full CI pipeline
  - **Steps**:
    1. Install dependencies
    2. Run type checking
    3. Run linter
    4. Run tests
    5. Build application
    6. Run E2E tests
    7. Generate coverage report
  - **Tools**: GitHub Actions, GitLab CI, CircleCI

- [ ] **Automated Testing in CI**
  - Run all tests on every PR
  - Block merge if tests fail
  - Generate test coverage reports
  - **Tool**: Codecov or Coveralls

- [ ] **Automated Deployment**
  - **Current**: Manual deployment (likely)
  - **Improvement**: Automated deployment pipeline
  - **Stages**:
    - Build
    - Test
    - Deploy to staging
    - Run smoke tests
    - Deploy to production
  - **Tools**: Netlify, Vercel, AWS, GitHub Actions

- [ ] **Preview Deployments**
  - Deploy preview for every PR
  - Share preview URLs for review
  - Automatic cleanup of old previews

- [ ] **Rollback Strategy**
  - Automated rollback on deployment failure
  - Version tagging
  - Quick rollback mechanism

### 🐛 Error Handling Enhancements

#### High Priority

- [ ] **User-Friendly Error Messages**
  - **Current**: Basic error display
  - **Improvement**:
    - Contextual error messages
    - Actionable error messages
    - Retry mechanisms
    - Error recovery suggestions

- [ ] **Error Boundaries Coverage**
  - **Current**: Basic error boundaries
  - **Improvement**:
    - More granular error boundaries
    - Route-level error boundaries
    - Feature-level error boundaries
    - Error boundary analytics

- [ ] **API Error Handling**
  - Consistent error response format
  - Proper HTTP status codes
  - Error message internationalization
  - Retry logic for transient failures

- [ ] **Offline Support**
  - **Current**: No offline support
  - **Improvement**:
    - Service worker implementation
    - Offline page
    - Queue actions when offline
    - Sync when back online

### 📱 Mobile Experience

#### High Priority

- [ ] **Mobile Testing**
  - Test on real devices
  - Test on various screen sizes
  - Test touch interactions
  - Test mobile performance

- [ ] **Progressive Web App (PWA)**
  - **Current**: Not a PWA
  - **Improvement**: Convert to PWA
  - **Features**:
    - Service worker
    - Web app manifest
    - Offline support
    - Install prompt
    - Push notifications (optional)

- [ ] **Mobile-Specific Optimizations**
  - Touch-friendly button sizes
  - Optimized images for mobile
  - Reduced bundle size for mobile
  - Mobile-first responsive design (already done, verify)

### 🔐 Data Privacy & Compliance

#### High Priority

- [ ] **GDPR Compliance**
  - Cookie consent banner
  - Privacy policy
  - Data deletion requests
  - Data export functionality

- [ ] **Data Retention Policies**
  - Define data retention periods
  - Implement data cleanup
  - User data deletion

- [ ] **Consent Management**
  - User consent tracking
  - Consent withdrawal
  - Analytics consent

### 🏗️ Code Quality & Maintainability

#### High Priority

- [ ] **Code Review Process**
  - Establish code review guidelines
  - Required reviewers
  - Review checklist
  - Automated checks

- [ ] **TypeScript Strictness**
  - **Current**: Basic strict mode
  - **Improvement**:
    - Enable all strict flags
    - Remove `any` types
    - Add strict null checks
    - Type all API responses

- [ ] **Code Duplication**
  - Identify duplicate code
  - Extract common patterns
  - Create shared utilities
  - **Tool**: SonarQube or similar

- [ ] **Dependency Management**
  - Regular dependency updates
  - Security vulnerability scanning
  - **Tool**: Dependabot, Snyk
  - Remove unused dependencies

### 🎯 User Experience Improvements

#### High Priority

- [ ] **Loading States**
  - **Current**: Basic loaders
  - **Improvement**:
    - Skeleton screens (partially done)
    - Progressive loading
    - Optimistic UI updates
    - Better loading indicators

- [ ] **Form UX**
  - Auto-save draft forms
  - Form field auto-focus
  - Better validation feedback
  - Multi-step form progress indicator

- [ ] **Search Experience**
  - Search suggestions/autocomplete
  - Recent searches
  - Search history
  - Search result highlighting

- [ ] **Booking Flow**
  - Save booking progress
  - Booking confirmation email
  - Booking modification
  - Booking cancellation

### 📈 Scalability Considerations

#### Medium Priority

- [ ] **Database Optimization**
  - Index optimization
  - Query optimization
  - Connection pooling
  - Read replicas

- [ ] **Caching Layers**
  - Redis for session storage
  - CDN for static assets
  - API response caching
  - Browser caching strategy

- [ ] **Microservices Consideration**
  - Evaluate if monolith needs splitting
  - API gateway pattern
  - Service decomposition

- [ ] **Load Balancing**
  - Multiple server instances
  - Load balancer configuration
  - Health checks

### 🛠️ Developer Experience

#### Medium Priority

- [ ] **Development Tools**
  - Better debugging tools
  - Development documentation
  - Local development setup guide
  - Troubleshooting guide

- [ ] **Code Generation**
  - Component generators
  - API client generators (partially done)
  - Test generators

- [ ] **Hot Reload Improvements**
  - Faster HMR
  - State preservation during HMR
  - Better error overlay

### 📊 Analytics & Business Intelligence

#### Medium Priority

- [ ] **Business Metrics**
  - Booking conversion rate
  - Search-to-booking funnel
  - User retention metrics
  - Revenue tracking

- [ ] **A/B Testing**
  - A/B testing framework
  - Feature flags
  - Gradual rollouts

### 🔄 State Management Improvements

#### Medium Priority

- [ ] **State Persistence**
  - **Current**: Basic localStorage
  - **Improvement**:
    - Redux Persist for complex state
    - Selective state persistence
    - State migration strategies

- [ ] **State Normalization**
  - Normalize nested API responses
  - Use entities pattern
  - Reduce state duplication

### 🌐 Internationalization Enhancements

#### Medium Priority

- [ ] **Additional Languages**
  - Add more language support
  - RTL support for other languages
  - Date/time localization
  - Number/currency formatting

- [ ] **Translation Management**
  - Translation workflow
  - Missing translation detection
  - Translation quality checks

### 📦 Build & Deployment

#### Medium Priority

- [ ] **Build Optimization**
  - Analyze build output
  - Optimize build time
  - Parallel builds
  - Build caching

- [ ] **Environment Management**
  - Multiple environments (dev, staging, prod)
  - Environment-specific configs
  - Feature flags per environment

- [ ] **Deployment Strategy**
  - Blue-green deployment
  - Canary releases
  - Zero-downtime deployments

---

### 🎯 Priority Summary

#### **Sprint 1 (Critical - Security & Monitoring)**

1. Error tracking (Sentry)
2. Token storage security
3. Input sanitization
4. Performance monitoring
5. CI/CD pipeline

#### **Sprint 2 (High Priority - Testing & Performance)**

1. E2E testing
2. Increase test coverage
3. Image optimization
4. Bundle size optimization
5. Accessibility improvements

#### **Sprint 3 (Medium Priority - UX & Features)**

1. PWA implementation
2. Offline support
3. Search improvements
4. Component documentation (Storybook)
5. SEO improvements

#### **Sprint 4+ (Nice to Have)**

1. Additional languages
2. A/B testing
3. Advanced analytics
4. Microservices evaluation

---

### 💡 Interview Talking Points

When discussing improvements in interviews:

1. **"What would you improve?"**
   - Start with security (always critical)
   - Then monitoring (essential for production)
   - Then testing (quality assurance)
   - Then performance (user experience)

2. **"How do you prioritize?"**
   - Security first (data breaches are costly)
   - Monitoring second (can't fix what you can't see)
   - Testing third (prevent regressions)
   - Performance fourth (user experience)

3. **"What's your approach to technical debt?"**
   - Identify and document
   - Prioritize based on impact
   - Create improvement roadmap
   - Allocate time in sprints

4. **"How do you ensure production readiness?"**
   - Comprehensive testing
   - Monitoring and alerting
   - Security audits
   - Performance benchmarks
   - Documentation

---

**Good luck with your interview! 🚀**

_Remember: Understanding the "why" behind each decision is as important as knowing "what" was implemented. Also remember: Interviews test problem-solving, communication, and thinking process - not just memorized knowledge._
