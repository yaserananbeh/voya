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
│   │   └── baseApi.ts
│   ├── components
│   │   ├── ScrollToTop.tsx
│   │   ├── common
│   │   │   ├── CounterButton.tsx
│   │   │   ├── ErrorState.tsx
│   │   │   ├── GuestRoomRow.tsx
│   │   │   ├── GuestRoomSelector.tsx
│   │   │   ├── LoadingState.tsx
│   │   │   ├── SEO.tsx
│   │   │   ├── SafeImage.tsx
│   │   │   ├── SkipLink.tsx
│   │   │   ├── StarRatingDisplay.tsx
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
│   │   ├── index.ts
│   │   └── ui.ts
│   ├── hooks
│   │   ├── index.ts
│   │   ├── useNotification.ts
│   │   ├── usePageTitle.ts
│   │   ├── useRTL.ts
│   │   └── useRedux.ts
│   ├── i18n
│   │   ├── config.ts
│   │   └── locales
│   │       └── common
│   │           ├── ar.json
│   │           └── en.json
│   ├── layouts
│   │   └── MainLayout
│   │       ├── MainLayout.tsx
│   │       └── index.ts
│   ├── main.tsx
│   ├── pages
│   │   ├── Admin
│   │   │   ├── Cities
│   │   │   │   ├── Cities.tsx
│   │   │   │   ├── api
│   │   │   │   │   └── index.ts
│   │   │   │   ├── components
│   │   │   │   │   ├── CityForm.container.tsx
│   │   │   │   │   ├── CityForm.presentational.tsx
│   │   │   │   │   ├── CityForm.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── constants
│   │   │   │   │   └── index.ts
│   │   │   │   ├── index.ts
│   │   │   │   ├── locales
│   │   │   │   │   ├── ar.json
│   │   │   │   │   └── en.json
│   │   │   │   └── types
│   │   │   │       └── index.ts
│   │   │   ├── Dashboard
│   │   │   │   ├── Dashboard.tsx
│   │   │   │   ├── api
│   │   │   │   │   └── index.ts
│   │   │   │   ├── components
│   │   │   │   │   ├── QuickOverviewCard.tsx
│   │   │   │   │   ├── StatCard.tsx
│   │   │   │   │   ├── StatisticCard.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── index.ts
│   │   │   │   ├── locales
│   │   │   │   │   ├── ar.json
│   │   │   │   │   └── en.json
│   │   │   │   └── types
│   │   │   │       └── index.ts
│   │   │   ├── Hotels
│   │   │   │   ├── Hotels.tsx
│   │   │   │   ├── api
│   │   │   │   │   └── index.ts
│   │   │   │   ├── components
│   │   │   │   │   ├── HotelForm.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── constants
│   │   │   │   │   └── index.ts
│   │   │   │   ├── index.ts
│   │   │   │   ├── locales
│   │   │   │   │   ├── ar.json
│   │   │   │   │   └── en.json
│   │   │   │   └── types
│   │   │   │       └── index.ts
│   │   │   ├── Rooms
│   │   │   │   ├── Rooms.tsx
│   │   │   │   ├── api
│   │   │   │   │   └── index.ts
│   │   │   │   ├── components
│   │   │   │   │   ├── RoomForm.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── constants
│   │   │   │   │   └── index.ts
│   │   │   │   ├── index.ts
│   │   │   │   ├── locales
│   │   │   │   │   ├── ar.json
│   │   │   │   │   └── en.json
│   │   │   │   └── types
│   │   │   │       └── index.ts
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
│   │   │   ├── constants
│   │   │   │   └── index.ts
│   │   │   ├── index.ts
│   │   │   ├── layouts
│   │   │   │   └── AdminLayout
│   │   │   │       ├── AdminLayout.tsx
│   │   │   │       └── index.ts
│   │   │   ├── locales
│   │   │   │   ├── ar.json
│   │   │   │   └── en.json
│   │   │   ├── routes.tsx
│   │   │   └── utils
│   │   │       └── index.ts
│   │   ├── Checkout
│   │   │   ├── Checkout.tsx
│   │   │   ├── Confirmation
│   │   │   │   ├── Confirmation.tsx
│   │   │   │   ├── index.ts
│   │   │   │   ├── locales
│   │   │   │   │   ├── ar.json
│   │   │   │   │   └── en.json
│   │   │   │   └── styles
│   │   │   │       └── confirmation.module.css
│   │   │   ├── api
│   │   │   │   └── index.ts
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
│   │   │   ├── constants
│   │   │   │   └── index.ts
│   │   │   ├── index.ts
│   │   │   ├── locales
│   │   │   │   ├── ar.json
│   │   │   │   └── en.json
│   │   │   ├── routes.tsx
│   │   │   ├── tests
│   │   │   │   ├── Checkout.test.tsx
│   │   │   │   ├── Confirmation.test.tsx
│   │   │   │   └── UserInfoForm.test.tsx
│   │   │   ├── types
│   │   │   │   └── index.ts
│   │   │   └── utils
│   │   │       ├── checkoutStorage.ts
│   │   │       ├── index.ts
│   │   │       └── price.ts
│   │   ├── Error
│   │   │   ├── ErrorPage.tsx
│   │   │   ├── RouteError.tsx
│   │   │   ├── constants
│   │   │   │   └── index.ts
│   │   │   ├── index.ts
│   │   │   ├── locales
│   │   │   │   ├── ar.json
│   │   │   │   └── en.json
│   │   │   └── routes.tsx
│   │   ├── Forbidden
│   │   │   ├── Forbidden.tsx
│   │   │   ├── constants
│   │   │   │   └── index.ts
│   │   │   ├── index.ts
│   │   │   └── locales
│   │   │       ├── ar.json
│   │   │       └── en.json
│   │   ├── Home
│   │   │   ├── Home.tsx
│   │   │   ├── api
│   │   │   │   └── index.ts
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
│   │   │   ├── constants
│   │   │   │   └── index.ts
│   │   │   ├── index.ts
│   │   │   ├── locales
│   │   │   │   ├── ar.json
│   │   │   │   └── en.json
│   │   │   ├── routes.tsx
│   │   │   ├── tests
│   │   │   │   └── HomeSearchBar.test.tsx
│   │   │   └── types
│   │   │       └── index.ts
│   │   ├── Hotel
│   │   │   ├── Hotel.container.tsx
│   │   │   ├── Hotel.presentational.tsx
│   │   │   ├── Hotel.tsx
│   │   │   ├── api
│   │   │   │   └── index.ts
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
│   │   │   ├── constants
│   │   │   │   └── index.ts
│   │   │   ├── index.ts
│   │   │   ├── locales
│   │   │   │   ├── ar.json
│   │   │   │   └── en.json
│   │   │   ├── routes.tsx
│   │   │   ├── tests
│   │   │   │   └── Hotel.test.tsx
│   │   │   └── types
│   │   │       └── index.ts
│   │   ├── Login
│   │   │   ├── Login.tsx
│   │   │   ├── api
│   │   │   │   └── index.ts
│   │   │   ├── components
│   │   │   │   ├── AdminRoute.tsx
│   │   │   │   ├── ProtectedRoute.tsx
│   │   │   │   ├── RedirectIfAuthenticated.tsx
│   │   │   │   └── index.ts
│   │   │   ├── constants
│   │   │   │   └── index.ts
│   │   │   ├── index.ts
│   │   │   ├── locales
│   │   │   │   ├── ar.json
│   │   │   │   └── en.json
│   │   │   ├── routes.tsx
│   │   │   ├── store
│   │   │   │   ├── authSlice.ts
│   │   │   │   └── index.ts
│   │   │   ├── styles
│   │   │   │   └── styles.module.css
│   │   │   ├── tests
│   │   │   │   └── Login.test.tsx
│   │   │   └── types
│   │   │       └── index.ts
│   │   ├── NotFound
│   │   │   ├── NotFound.tsx
│   │   │   ├── constants
│   │   │   │   └── index.ts
│   │   │   ├── index.ts
│   │   │   └── locales
│   │   │       ├── ar.json
│   │   │       └── en.json
│   │   └── SearchResults
│   │       ├── SearchResults.tsx
│   │       ├── api
│   │       │   └── index.ts
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
│   │       ├── constants
│   │       │   └── index.ts
│   │       ├── hooks
│   │       │   ├── index.ts
│   │       │   ├── useAmenities.ts
│   │       │   └── useFilterContext.ts
│   │       ├── index.ts
│   │       ├── locales
│   │       │   ├── ar.json
│   │       │   └── en.json
│   │       ├── providers
│   │       │   ├── FilterProvider.tsx
│   │       │   └── index.ts
│   │       ├── routes.tsx
│   │       ├── store
│   │       │   ├── index.ts
│   │       │   └── searchSlice.ts
│   │       └── types
│   │           └── index.ts
│   ├── providers
│   │   ├── ErrorBoundary.tsx
│   │   ├── LoadingProvider.tsx
│   │   ├── NotificationProvider.tsx
│   │   ├── ThemeContext.tsx
│   │   ├── index.ts
│   │   └── index.tsx
│   ├── routes
│   │   ├── components
│   │   │   ├── SuspenseLayout.tsx
│   │   │   └── index.ts
│   │   ├── mainLayoutRoutes.tsx
│   │   └── routes.tsx
│   ├── store
│   │   └── index.ts
│   ├── styles
│   │   └── reset.css
│   ├── tests
│   │   └── msw
│   │       ├── handlers.ts
│   │       └── server.ts
│   ├── theme
│   │   └── index.ts
│   ├── types
│   │   ├── common.ts
│   │   ├── index.ts
│   │   └── mui.d.ts
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
```
