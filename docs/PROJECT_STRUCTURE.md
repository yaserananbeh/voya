```text
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
│   └── PROJECT_STRUCTURE.md
├── eslint.config.js
├── index.html
├── package.json
├── pnpm-lock.yaml
├── public
│   ├── _redirects
│   ├── favicon.svg
│   ├── robots.txt
│   └── sitemap.xml
├── scripts
│   └── generate-sitemap.js
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
│   │   └── searchResults
│   │       └── index.ts
│   ├── components
│   │   ├── ScrollToTop.tsx
│   │   ├── atomic
│   │   │   ├── buttons
│   │   │   │   ├── CounterButton.tsx
│   │   │   │   └── index.ts
│   │   │   ├── display
│   │   │   │   ├── GuestRoomRow.tsx
│   │   │   │   ├── StarRatingDisplay.tsx
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   ├── auth
│   │   │   ├── AdminRoute.tsx
│   │   │   ├── ProtectedRoute.tsx
│   │   │   ├── RedirectIfAuthenticated.tsx
│   │   │   └── index.ts
│   │   ├── common
│   │   │   ├── ErrorState.tsx
│   │   │   ├── GuestRoomSelector.tsx
│   │   │   ├── LoadingState.tsx
│   │   │   ├── SEO.tsx
│   │   │   ├── SafeImage.tsx
│   │   │   ├── SkipLink.tsx
│   │   │   ├── VoyaLoader.tsx
│   │   │   └── index.ts
│   │   ├── index.ts
│   │   ├── layout
│   │   │   ├── FooterBrand.tsx
│   │   │   ├── FooterContact.tsx
│   │   │   ├── FooterSection.tsx
│   │   │   ├── LanguageSwitcher.tsx
│   │   │   ├── Logo.tsx
│   │   │   ├── LogoutBtn.tsx
│   │   │   ├── MainFooter.tsx
│   │   │   ├── MainHeader.tsx
│   │   │   ├── NavigationLinks.tsx
│   │   │   ├── NavigationMenu.tsx
│   │   │   ├── ThemeToggle.tsx
│   │   │   └── index.ts
│   │   └── readme.md
│   ├── constants
│   │   ├── api.ts
│   │   ├── hotel.ts
│   │   ├── index.ts
│   │   ├── map.ts
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
│   │   ├── usePageTitle.ts
│   │   └── useRTL.ts
│   ├── i18n
│   │   ├── config.ts
│   │   └── locales
│   │       ├── ar.json
│   │       └── en.json
│   ├── layouts
│   │   └── MainLayout
│   │       ├── MainLayout.module.css
│   │       ├── MainLayout.tsx
│   │       └── index.ts
│   ├── main.tsx
│   ├── pages
│   │   ├── Admin
│   │   │   ├── Cities
│   │   │   │   ├── Cities.tsx
│   │   │   │   ├── assets
│   │   │   │   ├── components
│   │   │   │   │   ├── CityForm.container.tsx
│   │   │   │   │   ├── CityForm.presentational.tsx
│   │   │   │   │   ├── CityForm.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── configs
│   │   │   │   ├── constants
│   │   │   │   ├── forms
│   │   │   │   ├── hooks
│   │   │   │   ├── index.ts
│   │   │   │   ├── locales
│   │   │   │   ├── providers
│   │   │   │   ├── styles
│   │   │   │   │   └── styles.module.css
│   │   │   │   ├── tests
│   │   │   │   ├── types
│   │   │   │   └── utils
│   │   │   ├── Dashboard
│   │   │   │   ├── Dashboard.tsx
│   │   │   │   ├── assets
│   │   │   │   ├── components
│   │   │   │   │   ├── QuickOverviewCard.tsx
│   │   │   │   │   ├── StatCard.tsx
│   │   │   │   │   ├── StatisticCard.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── configs
│   │   │   │   ├── constants
│   │   │   │   ├── forms
│   │   │   │   ├── hooks
│   │   │   │   ├── index.ts
│   │   │   │   ├── locales
│   │   │   │   ├── providers
│   │   │   │   ├── styles
│   │   │   │   │   └── styles.module.css
│   │   │   │   ├── tests
│   │   │   │   ├── types
│   │   │   │   └── utils
│   │   │   ├── Hotels
│   │   │   │   ├── Hotels.tsx
│   │   │   │   ├── assets
│   │   │   │   ├── components
│   │   │   │   │   ├── HotelForm.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── configs
│   │   │   │   ├── constants
│   │   │   │   ├── forms
│   │   │   │   ├── hooks
│   │   │   │   ├── index.ts
│   │   │   │   ├── locales
│   │   │   │   ├── providers
│   │   │   │   ├── styles
│   │   │   │   │   └── styles.module.css
│   │   │   │   ├── tests
│   │   │   │   ├── types
│   │   │   │   └── utils
│   │   │   ├── Rooms
│   │   │   │   ├── Rooms.tsx
│   │   │   │   ├── assets
│   │   │   │   ├── components
│   │   │   │   │   ├── RoomForm.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── configs
│   │   │   │   ├── constants
│   │   │   │   ├── forms
│   │   │   │   ├── hooks
│   │   │   │   ├── index.ts
│   │   │   │   ├── locales
│   │   │   │   ├── providers
│   │   │   │   ├── styles
│   │   │   │   │   └── styles.module.css
│   │   │   │   ├── tests
│   │   │   │   ├── types
│   │   │   │   └── utils
│   │   │   ├── assets
│   │   │   ├── components
│   │   │   │   ├── AdminDataGrid.tsx
│   │   │   │   ├── AdminFormDialog.tsx
│   │   │   │   ├── DataGridActions.tsx
│   │   │   │   ├── DeleteConfirmDialog.tsx
│   │   │   │   ├── FormActions.tsx
│   │   │   │   ├── FormField.tsx
│   │   │   │   ├── PageHeader.tsx
│   │   │   │   ├── SearchBar.tsx
│   │   │   │   └── index.ts
│   │   │   ├── configs
│   │   │   ├── constants
│   │   │   ├── forms
│   │   │   ├── hooks
│   │   │   ├── index.ts
│   │   │   ├── layouts
│   │   │   │   └── AdminLayout
│   │   │   │       ├── AdminLayout.module.css
│   │   │   │       ├── AdminLayout.tsx
│   │   │   │       └── index.ts
│   │   │   ├── locales
│   │   │   ├── providers
│   │   │   ├── styles
│   │   │   │   └── styles.module.css
│   │   │   ├── tests
│   │   │   ├── types
│   │   │   └── utils
│   │   ├── Checkout
│   │   │   ├── Checkout.tsx
│   │   │   ├── Confirmation
│   │   │   │   ├── Confirmation.tsx
│   │   │   │   ├── assets
│   │   │   │   ├── components
│   │   │   │   ├── configs
│   │   │   │   ├── constants
│   │   │   │   ├── forms
│   │   │   │   ├── hooks
│   │   │   │   ├── index.ts
│   │   │   │   ├── locales
│   │   │   │   ├── providers
│   │   │   │   ├── styles
│   │   │   │   │   ├── confirmation.module.css
│   │   │   │   │   └── styles.module.css
│   │   │   │   ├── tests
│   │   │   │   ├── types
│   │   │   │   └── utils
│   │   │   ├── assets
│   │   │   ├── components
│   │   │   │   ├── BookingSummary.tsx
│   │   │   │   ├── CheckoutActions.tsx
│   │   │   │   ├── CheckoutHeader.tsx
│   │   │   │   ├── FormSelectField.tsx
│   │   │   │   ├── FormTextField.tsx
│   │   │   │   ├── PriceBreakdown.tsx
│   │   │   │   ├── SubmitButton.tsx
│   │   │   │   ├── SummarySection.tsx
│   │   │   │   ├── TotalPrice.tsx
│   │   │   │   ├── UserInfoForm.tsx
│   │   │   │   ├── bookingSchema.ts
│   │   │   │   └── index.ts
│   │   │   ├── configs
│   │   │   ├── constants
│   │   │   ├── forms
│   │   │   ├── hooks
│   │   │   ├── index.ts
│   │   │   ├── locales
│   │   │   ├── providers
│   │   │   ├── styles
│   │   │   │   └── styles.module.css
│   │   │   ├── tests
│   │   │   │   ├── Checkout.test.tsx
│   │   │   │   ├── Confirmation.test.tsx
│   │   │   │   └── UserInfoForm.test.tsx
│   │   │   ├── types
│   │   │   │   └── index.ts
│   │   │   └── utils
│   │   │       └── price.ts
│   │   ├── Error
│   │   │   ├── ErrorPage.tsx
│   │   │   ├── RouteError.tsx
│   │   │   ├── assets
│   │   │   ├── components
│   │   │   ├── configs
│   │   │   ├── constants
│   │   │   ├── forms
│   │   │   ├── hooks
│   │   │   ├── index.ts
│   │   │   ├── locales
│   │   │   ├── providers
│   │   │   ├── styles
│   │   │   ├── tests
│   │   │   ├── types
│   │   │   └── utils
│   │   ├── Forbidden
│   │   │   ├── Forbidden.tsx
│   │   │   ├── assets
│   │   │   ├── components
│   │   │   ├── configs
│   │   │   ├── constants
│   │   │   ├── forms
│   │   │   ├── hooks
│   │   │   ├── index.ts
│   │   │   ├── locales
│   │   │   ├── providers
│   │   │   ├── styles
│   │   │   ├── tests
│   │   │   ├── types
│   │   │   └── utils
│   │   ├── Home
│   │   │   ├── Home.tsx
│   │   │   ├── assets
│   │   │   ├── components
│   │   │   │   ├── DiscountBadge.tsx
│   │   │   │   ├── EmptyState.tsx
│   │   │   │   ├── FeaturedDealsSection.tsx
│   │   │   │   ├── HeroSection.tsx
│   │   │   │   ├── HomeSearchBar.tsx
│   │   │   │   ├── HomeSkeletonCard.tsx
│   │   │   │   ├── HotelCard.tsx
│   │   │   │   ├── PageContainer.tsx
│   │   │   │   ├── PriceDisplay.tsx
│   │   │   │   ├── RecentHotelsSection.tsx
│   │   │   │   ├── RecentHotelsSkeleton.tsx
│   │   │   │   ├── SearchActionButtons.tsx
│   │   │   │   ├── SearchCityField.tsx
│   │   │   │   ├── SearchDateField.tsx
│   │   │   │   ├── Section.tsx
│   │   │   │   ├── TrendingDestinationsSection.tsx
│   │   │   │   ├── ViewDetailsButton.tsx
│   │   │   │   └── index.ts
│   │   │   ├── configs
│   │   │   ├── constants
│   │   │   ├── forms
│   │   │   ├── hooks
│   │   │   ├── index.ts
│   │   │   ├── locales
│   │   │   ├── providers
│   │   │   ├── styles
│   │   │   ├── tests
│   │   │   │   └── HomeSearchBar.test.tsx
│   │   │   ├── types
│   │   │   └── utils
│   │   ├── Hotel
│   │   │   ├── Hotel.container.tsx
│   │   │   ├── Hotel.presentational.tsx
│   │   │   ├── Hotel.tsx
│   │   │   ├── assets
│   │   │   ├── components
│   │   │   │   ├── DateSelectionDialog.tsx
│   │   │   │   ├── HotelAmenities.tsx
│   │   │   │   ├── HotelGallery.tsx
│   │   │   │   ├── HotelMap.tsx
│   │   │   │   ├── HotelReviews.tsx
│   │   │   │   ├── HotelRooms.tsx
│   │   │   │   ├── RoomCardActions.tsx
│   │   │   │   ├── RoomCardImage.tsx
│   │   │   │   ├── RoomCardInfo.tsx
│   │   │   │   └── index.ts
│   │   │   ├── configs
│   │   │   ├── constants
│   │   │   ├── forms
│   │   │   ├── hooks
│   │   │   ├── index.ts
│   │   │   ├── locales
│   │   │   ├── providers
│   │   │   ├── styles
│   │   │   │   └── styles.module.css
│   │   │   ├── tests
│   │   │   │   └── Hotel.test.tsx
│   │   │   ├── types
│   │   │   └── utils
│   │   ├── Login
│   │   │   ├── Login.tsx
│   │   │   ├── assets
│   │   │   ├── components
│   │   │   ├── configs
│   │   │   ├── constants
│   │   │   ├── forms
│   │   │   ├── hooks
│   │   │   ├── index.ts
│   │   │   ├── locales
│   │   │   ├── providers
│   │   │   ├── styles
│   │   │   │   └── styles.module.css
│   │   │   ├── tests
│   │   │   │   └── Login.test.tsx
│   │   │   ├── types
│   │   │   └── utils
│   │   ├── NotFound
│   │   │   ├── NotFound.tsx
│   │   │   ├── assets
│   │   │   ├── components
│   │   │   ├── configs
│   │   │   ├── constants
│   │   │   ├── forms
│   │   │   ├── hooks
│   │   │   ├── index.ts
│   │   │   ├── locales
│   │   │   ├── providers
│   │   │   ├── styles
│   │   │   │   └── styles.module.css
│   │   │   ├── tests
│   │   │   ├── types
│   │   │   └── utils
│   │   └── SearchResults
│   │       ├── SearchResults.tsx
│   │       ├── assets
│   │       ├── components
│   │       │   ├── AmenitiesFilter.tsx
│   │       │   ├── EditableSearchBar.tsx
│   │       │   ├── FilterContainer.tsx
│   │       │   ├── FiltersSidebar.tsx
│   │       │   ├── HotelCardImage.tsx
│   │       │   ├── HotelCardInfo.tsx
│   │       │   ├── HotelCardPrice.tsx
│   │       │   ├── HotelResultCard.tsx
│   │       │   ├── HotelTypeFilter.tsx
│   │       │   ├── PriceFilter.tsx
│   │       │   ├── ResultsList.tsx
│   │       │   ├── SelectedFiltersBar.tsx
│   │       │   ├── StarRatingFilter.tsx
│   │       │   └── index.ts
│   │       ├── configs
│   │       ├── constants
│   │       ├── forms
│   │       ├── hooks
│   │       │   ├── index.ts
│   │       │   └── useAmenities.ts
│   │       ├── index.ts
│   │       ├── locales
│   │       ├── providers
│   │       ├── styles
│   │       │   └── styles.module.css
│   │       ├── tests
│   │       ├── types
│   │       └── utils
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
│   │   └── mui.d.ts
│   └── utils
│       ├── checkoutStorage.ts
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
```
