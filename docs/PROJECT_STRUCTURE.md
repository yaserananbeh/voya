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
├── docs
│   ├── CONTRIBUTING.md
│   ├── Helpful_commands_Dev.md
│   ├── PROJECT_STRUCTURE.md
│   └── REQUIREMENTS_COVERAGE.md
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
│   ├── components
│   │   ├── ScrollToTop.tsx
│   │   ├── auth
│   │   │   ├── AdminRoute.tsx
│   │   │   ├── ProtectedRoute.tsx
│   │   │   ├── RedirectIfAuthenticated.tsx
│   │   │   └── index.ts
│   │   ├── common
│   │   │   ├── SafeImage.tsx
│   │   │   ├── VoyaLoader.tsx
│   │   │   └── index.ts
│   │   ├── filters
│   │   │   ├── FilterContainer.tsx
│   │   │   └── index.ts
│   │   ├── forms
│   │   │   ├── FormActions.tsx
│   │   │   ├── FormField.tsx
│   │   │   └── index.ts
│   │   ├── index.ts
│   │   ├── layout
│   │   │   ├── LanguageSwitcher.tsx
│   │   │   ├── LogoutBtn.tsx
│   │   │   ├── MainFooter.tsx
│   │   │   ├── MainHeader.tsx
│   │   │   ├── PageContainer.tsx
│   │   │   ├── Section.tsx
│   │   │   ├── ThemeToggle.tsx
│   │   │   └── index.ts
│   │   └── readme.md
│   ├── constants
│   │   ├── api.ts
│   │   ├── colors.ts
│   │   ├── hotel.ts
│   │   ├── index.ts
│   │   ├── map.ts
│   │   ├── messages.ts
│   │   ├── pagination.ts
│   │   ├── payment.ts
│   │   ├── routes.ts
│   │   ├── storage.ts
│   │   ├── ui.ts
│   │   ├── user.ts
│   │   └── validation.ts
│   ├── hooks
│   │   ├── index.ts
│   │   ├── useNotification.ts
│   │   └── useRTL.ts
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
│   │   │   ├── Cities
│   │   │   │   ├── Cities.tsx
│   │   │   │   ├── components
│   │   │   │   │   ├── CityForm.container.tsx
│   │   │   │   │   ├── CityForm.presentational.tsx
│   │   │   │   │   ├── CityForm.tsx
│   │   │   │   │   └── DeleteConfirmDialog.tsx
│   │   │   │   ├── ducks
│   │   │   │   │   └── readme.md
│   │   │   │   ├── index.ts
│   │   │   │   └── styles.module.css
│   │   │   ├── Dashboard
│   │   │   │   ├── Dashboard.tsx
│   │   │   │   ├── ducks
│   │   │   │   │   └── readme.md
│   │   │   │   ├── index.ts
│   │   │   │   └── styles.module.css
│   │   │   ├── Hotels
│   │   │   │   ├── Hotels.tsx
│   │   │   │   ├── components
│   │   │   │   │   ├── DeleteConfirmDialog.tsx
│   │   │   │   │   └── HotelForm.tsx
│   │   │   │   ├── ducks
│   │   │   │   │   └── readme.md
│   │   │   │   ├── index.ts
│   │   │   │   └── styles.module.css
│   │   │   ├── Rooms
│   │   │   │   ├── Rooms.tsx
│   │   │   │   ├── components
│   │   │   │   │   ├── DeleteConfirmDialog.tsx
│   │   │   │   │   └── RoomForm.tsx
│   │   │   │   ├── ducks
│   │   │   │   │   └── readme.md
│   │   │   │   ├── index.ts
│   │   │   │   └── styles.module.css
│   │   │   ├── ducks
│   │   │   │   └── readme.md
│   │   │   └── styles.module.css
│   │   ├── Checkout
│   │   │   ├── Checkout.tsx
│   │   │   ├── Confirmation
│   │   │   │   ├── Confirmation.tsx
│   │   │   │   ├── confirmation.module.css
│   │   │   │   ├── ducks
│   │   │   │   │   └── readme.md
│   │   │   │   ├── index.ts
│   │   │   │   └── styles.module.css
│   │   │   ├── components
│   │   │   │   ├── BookingSummary.tsx
│   │   │   │   ├── CheckoutActions.tsx
│   │   │   │   ├── UserInfoForm.tsx
│   │   │   │   └── bookingSchema.ts
│   │   │   ├── index.ts
│   │   │   ├── styles.module.css
│   │   │   ├── tests
│   │   │   │   ├── Checkout.test.tsx
│   │   │   │   ├── Confirmation.test.tsx
│   │   │   │   └── UserInfoForm.test.tsx
│   │   │   ├── types.ts
│   │   │   └── utils
│   │   │       ├── checkoutStorage.ts
│   │   │       └── price.ts
│   │   ├── Error
│   │   │   ├── ErrorPage.tsx
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
│   │   │   ├── index.ts
│   │   │   ├── styles.module.css
│   │   │   └── tests
│   │   │       └── HomeSearchBar.test.tsx
│   │   ├── Hotel
│   │   │   ├── Hotel.container.tsx
│   │   │   ├── Hotel.presentational.tsx
│   │   │   ├── Hotel.tsx
│   │   │   ├── components
│   │   │   │   ├── HotelAmenities.tsx
│   │   │   │   ├── HotelGallery.tsx
│   │   │   │   ├── HotelMap.tsx
│   │   │   │   ├── HotelReviews.tsx
│   │   │   │   └── HotelRooms.tsx
│   │   │   ├── index.ts
│   │   │   ├── styles.module.css
│   │   │   └── tests
│   │   │       └── Hotel.test.tsx
│   │   ├── Login
│   │   │   ├── Login.tsx
│   │   │   ├── index.ts
│   │   │   ├── styles.module.css
│   │   │   └── tests
│   │   │       └── Login.test.tsx
│   │   ├── NotFound
│   │   │   ├── NotFound.tsx
│   │   │   ├── index.ts
│   │   │   └── styles.module.css
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
│   │       └── styles.module.css
│   ├── providers
│   │   ├── ErrorBoundary.tsx
│   │   ├── LoadingProvider.tsx
│   │   ├── NotificationProvider.tsx
│   │   ├── ThemeContext.tsx
│   │   ├── index.ts
│   │   └── index.tsx
│   ├── routes
│   │   └── routes.tsx
│   ├── store
│   │   ├── authSlice.ts
│   │   ├── index.ts
│   │   └── searchSlice.ts
│   ├── styles
│   │   └── reset.css
│   ├── tests
│   │   └── msw
│   │       ├── handlers.ts
│   │       └── server.ts
│   ├── theme
│   │   └── index.ts
│   ├── types
│   │   ├── index.ts
│   │   ├── models.ts
│   │   ├── mui.d.ts
│   │   └── swagger.json
│   └── utils
│       ├── date.ts
│       ├── globalErrors.ts
│       ├── index.ts
│       ├── logger.ts
│       └── tests
│           └── logger.test.ts
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── tsconfig.test.json
└── vite.config.ts
`
