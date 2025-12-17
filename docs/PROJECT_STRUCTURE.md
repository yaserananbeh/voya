`text
Voya
├── .editorconfig
├── .env
├── .env.example
├── .husky
│   ├── _
│   │   ├── applypatch-msg
│   │   ├── commit-msg
│   │   ├── h
│   │   ├── husky.sh
│   │   ├── post-applypatch
│   │   ├── post-checkout
│   │   ├── post-commit
│   │   ├── post-merge
│   │   ├── post-rewrite
│   │   ├── pre-applypatch
│   │   ├── pre-auto-gc
│   │   ├── pre-commit
│   │   ├── pre-merge-commit
│   │   ├── pre-push
│   │   ├── pre-rebase
│   │   └── prepare-commit-msg
│   └── pre-commit
├── .nvmrc
├── .prettierignore
├── .prettierrc
├── .vscode
│   ├── extensions.json
│   └── settings.json
├── README.md
├── REQUIREMENTS_COVERAGE.md
├── docs
│   ├── API_CACHING_STRATEGY.md
│   ├── ASSETS_MANAGEMENT_STRATEGY.md
│   ├── CONTRIBUTING.md
│   ├── GIT_BRANCH_STRATEGY.md
│   ├── PROJECT_STRUCTURE.md
│   ├── ROUTES.md
│   ├── RTK Query vs React Query vs Axios.md
│   ├── STATE_MGMT_TRADEOFFS.md
│   ├── UI_COMPONENTS_MUI_MAP.md
│   ├── adr
│   │   ├── ADR-006-error-logging.md
│   │   └── ADR-007-rtk-query-vs-axios.md
│   └── design.md
├── eslint.config.js
├── index.html
├── package.json
├── pnpm-lock.yaml
├── public
│   ├── _redirects
│   └── favicon.svg
├── setupTests.ts
├── src
│   ├── App.tsx
│   ├── api
│   │   ├── admin
│   │   │   └── index.ts
│   │   ├── auth
│   │   │   └── index.ts
│   │   ├── baseApi.ts
│   │   ├── checkout
│   │   │   └── index.ts
│   │   ├── home
│   │   │   └── index.ts
│   │   ├── hotels
│   │   │   └── index.ts
│   │   ├── searchResults
│   │   │   └── index.ts
│   │   └── upload
│   │       └── index.ts
│   ├── assets
│   │   ├── fonts
│   │   ├── icons
│   │   ├── images
│   │   ├── index.ts
│   │   └── react.svg
│   ├── components
│   │   ├── auth
│   │   │   ├── AdminRoute.tsx
│   │   │   ├── ProtectedRoute.tsx
│   │   │   └── RedirectIfAuthenticated.tsx
│   │   ├── common
│   │   │   ├── SafeImage.tsx
│   │   │   └── VoyaLoader.tsx
│   │   ├── index.ts
│   │   ├── layout
│   │   │   ├── LanguageSwitcher.tsx
│   │   │   ├── LogoutBtn.tsx
│   │   │   ├── MainFooter.tsx
│   │   │   ├── MainHeader.tsx
│   │   │   ├── PageContainer.tsx
│   │   │   ├── Section.tsx
│   │   │   └── ThemeToggle.tsx
│   │   └── readme.md
│   ├── constants
│   │   ├── api.ts
│   │   ├── colors.ts
│   │   ├── index.ts
│   │   └── messages.ts
│   ├── hooks
│   │   ├── index.ts
│   │   ├── tests
│   │   ├── useNotification.ts
│   │   ├── useRTL.ts
│   │   └── useRTLButton.ts
│   ├── i18n
│   │   ├── config.ts
│   │   └── locales
│   │       ├── ar.json
│   │       └── en.json
│   ├── layouts
│   │   ├── AdminLayout
│   │   │   ├── AdminLayout.module.css
│   │   │   ├── AdminLayout.tsx
│   │   │   └── index.ts
│   │   └── MainLayout
│   │       ├── MainLayout.module.css
│   │       ├── MainLayout.tsx
│   │       └── index.ts
│   ├── main.tsx
│   ├── pages
│   │   ├── Admin
│   │   │   ├── Admin.tsx
│   │   │   ├── Cities
│   │   │   │   ├── Cities.tsx
│   │   │   │   ├── components
│   │   │   │   │   ├── CityForm.tsx
│   │   │   │   │   └── DeleteConfirmDialog.tsx
│   │   │   │   ├── ducks
│   │   │   │   │   └── readme.md
│   │   │   │   ├── hooks
│   │   │   │   ├── index.ts
│   │   │   │   ├── styles.module.css
│   │   │   │   ├── tests
│   │   │   │   └── utils
│   │   │   ├── Dashboard
│   │   │   │   ├── Dashboard.tsx
│   │   │   │   ├── components
│   │   │   │   ├── ducks
│   │   │   │   │   └── readme.md
│   │   │   │   ├── hooks
│   │   │   │   ├── index.ts
│   │   │   │   ├── styles.module.css
│   │   │   │   ├── tests
│   │   │   │   └── utils
│   │   │   ├── Hotels
│   │   │   │   ├── Hotels.tsx
│   │   │   │   ├── components
│   │   │   │   │   ├── DeleteConfirmDialog.tsx
│   │   │   │   │   └── HotelForm.tsx
│   │   │   │   ├── ducks
│   │   │   │   │   └── readme.md
│   │   │   │   ├── hooks
│   │   │   │   ├── index.ts
│   │   │   │   ├── styles.module.css
│   │   │   │   ├── tests
│   │   │   │   └── utils
│   │   │   ├── Rooms
│   │   │   │   ├── Rooms.tsx
│   │   │   │   ├── components
│   │   │   │   │   ├── DeleteConfirmDialog.tsx
│   │   │   │   │   └── RoomForm.tsx
│   │   │   │   ├── ducks
│   │   │   │   │   └── readme.md
│   │   │   │   ├── hooks
│   │   │   │   ├── index.ts
│   │   │   │   ├── styles.module.css
│   │   │   │   ├── tests
│   │   │   │   └── utils
│   │   │   ├── components
│   │   │   │   └── PhotoUploader.tsx
│   │   │   ├── ducks
│   │   │   │   └── readme.md
│   │   │   ├── hooks
│   │   │   ├── index.ts
│   │   │   ├── styles.module.css
│   │   │   ├── tests
│   │   │   └── utils
│   │   ├── Checkout
│   │   │   ├── Checkout.tsx
│   │   │   ├── Confirmation
│   │   │   │   ├── Confirmation.tsx
│   │   │   │   ├── components
│   │   │   │   ├── ducks
│   │   │   │   │   └── readme.md
│   │   │   │   ├── hooks
│   │   │   │   ├── index.ts
│   │   │   │   ├── styles.module.css
│   │   │   │   ├── tests
│   │   │   │   └── utils
│   │   │   ├── components
│   │   │   │   ├── BookingSummary.tsx
│   │   │   │   ├── CheckoutActions.tsx
│   │   │   │   ├── UserInfoForm.tsx
│   │   │   │   └── bookingSchema.ts
│   │   │   ├── hooks
│   │   │   ├── index.ts
│   │   │   ├── styles.module.css
│   │   │   ├── tests
│   │   │   │   ├── Checkout.test.tsx
│   │   │   │   └── Confirmation.test.tsx
│   │   │   ├── types.ts
│   │   │   └── utils
│   │   │       ├── checkoutStorage.ts
│   │   │       └── price.ts
│   │   ├── Error
│   │   │   ├── ErrorPage.tsx
│   │   │   ├── QuickErrorTest.tsx
│   │   │   ├── RouteError.tsx
│   │   │   └── index.ts
│   │   ├── Home
│   │   │   ├── Home.tsx
│   │   │   ├── components
│   │   │   │   ├── FeaturedDealsSection.tsx
│   │   │   │   ├── GuestRoomSelector.tsx
│   │   │   │   ├── HeroSection.tsx
│   │   │   │   ├── HomeSearchBar.tsx
│   │   │   │   ├── HomeSkeletonCard.tsx
│   │   │   │   ├── RecentHotelsSection.tsx
│   │   │   │   ├── RecentHotelsSkeleton.tsx
│   │   │   │   └── TrendingDestinationsSection.tsx
│   │   │   ├── hooks
│   │   │   ├── index.ts
│   │   │   ├── styles.module.css
│   │   │   ├── tests
│   │   │   │   └── HomeSearchBar.test.tsx
│   │   │   └── utils
│   │   ├── Hotel
│   │   │   ├── Hotel.tsx
│   │   │   ├── components
│   │   │   │   ├── HotelAmenities.tsx
│   │   │   │   ├── HotelGallery.tsx
│   │   │   │   ├── HotelMap.tsx
│   │   │   │   ├── HotelReviews.tsx
│   │   │   │   └── HotelRooms.tsx
│   │   │   ├── hooks
│   │   │   ├── index.ts
│   │   │   ├── styles.module.css
│   │   │   ├── tests
│   │   │   │   └── Hotel.test.tsx
│   │   │   └── utils
│   │   ├── Login
│   │   │   ├── Login.tsx
│   │   │   ├── components
│   │   │   ├── hooks
│   │   │   ├── index.ts
│   │   │   ├── styles.module.css
│   │   │   ├── tests
│   │   │   └── utils
│   │   ├── NotFound
│   │   │   ├── NotFound.tsx
│   │   │   ├── components
│   │   │   ├── hooks
│   │   │   ├── index.ts
│   │   │   ├── styles.module.css
│   │   │   ├── tests
│   │   │   └── utils
│   │   └── SearchResults
│   │       ├── SearchResults.tsx
│   │       ├── components
│   │       │   ├── AmenitiesFilter.tsx
│   │       │   ├── FiltersSidebar.tsx
│   │       │   ├── HotelResultCard.tsx
│   │       │   ├── HotelTypeFilter.tsx
│   │       │   ├── PriceFilter.tsx
│   │       │   ├── ResultsList.tsx
│   │       │   ├── SelectedFiltersBar.tsx
│   │       │   └── StarRatingFilter.tsx
│   │       ├── hooks
│   │       │   └── useAmenities.ts
│   │       ├── index.ts
│   │       ├── styles.module.css
│   │       ├── tests
│   │       └── utils
│   ├── providers
│   │   ├── ErrorBoundary.tsx
│   │   ├── NotificationProvider.tsx
│   │   ├── ThemeContext.tsx
│   │   └── index.tsx
│   ├── routes
│   │   └── routes.tsx
│   ├── store
│   │   ├── authSlice.ts
│   │   ├── index.ts
│   │   └── searchSlice.ts
│   ├── styles
│   │   └── reset.css
│   ├── temp
│   │   ├── DemoOverrideTest.tsx
│   │   └── dev.ts
│   ├── tests
│   │   └── msw
│   │       ├── handlers.ts
│   │       └── server.ts
│   ├── theme
│   │   └── index.ts
│   ├── types
│   │   ├── api.ts
│   │   ├── index.ts
│   │   ├── models.ts
│   │   ├── mui.d.ts
│   │   └── swagger.json
│   └── utils
│       ├── date.ts
│       ├── globalErrors.ts
│       ├── index.ts
│       ├── logger.ts
│       ├── recentHotelsStorage.ts
│       ├── responsive.ts
│       ├── string.ts
│       └── tests
│           ├── date.test.ts
│           ├── logger.test.ts
│           ├── responsive.test.ts
│           └── string.test.ts
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── tsconfig.test.json
└── vite.config.ts
`
