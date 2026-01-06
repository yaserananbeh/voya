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
│   │   ├── searchResults
│   │   │   └── index.ts
│   ├── components
│   │   ├── ScrollToTop.tsx
│   │   ├── admin
│   │   │   ├── AdminDataGrid.tsx
│   │   │   ├── AdminFormDialog.tsx
│   │   │   ├── DataGridActions.tsx
│   │   │   ├── PageHeader.tsx
│   │   │   ├── SearchBar.tsx
│   │   │   └── index.ts
│   │   ├── atomic
│   │   │   ├── buttons
│   │   │   │   ├── CounterButton.tsx
│   │   │   │   ├── SearchActionButtons.tsx
│   │   │   │   ├── SubmitButton.tsx
│   │   │   │   ├── ViewDetailsButton.tsx
│   │   │   │   └── index.ts
│   │   │   ├── cards
│   │   │   │   ├── HotelCardImage.tsx
│   │   │   │   ├── HotelCardInfo.tsx
│   │   │   │   ├── HotelCardPrice.tsx
│   │   │   │   ├── RoomCardActions.tsx
│   │   │   │   ├── RoomCardImage.tsx
│   │   │   │   ├── RoomCardInfo.tsx
│   │   │   │   └── index.ts
│   │   │   ├── display
│   │   │   │   ├── DiscountBadge.tsx
│   │   │   │   ├── GuestRoomRow.tsx
│   │   │   │   ├── PriceBreakdown.tsx
│   │   │   │   ├── PriceDisplay.tsx
│   │   │   │   ├── StarRatingDisplay.tsx
│   │   │   │   ├── SummarySection.tsx
│   │   │   │   ├── TotalPrice.tsx
│   │   │   │   └── index.ts
│   │   │   ├── fields
│   │   │   │   ├── FormSelectField.tsx
│   │   │   │   ├── FormTextField.tsx
│   │   │   │   ├── SearchCityField.tsx
│   │   │   │   ├── SearchDateField.tsx
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   ├── auth
│   │   │   ├── AdminRoute.tsx
│   │   │   ├── ProtectedRoute.tsx
│   │   │   ├── RedirectIfAuthenticated.tsx
│   │   │   └── index.ts
│   │   ├── checkout
│   │   │   ├── CheckoutHeader.tsx
│   │   │   └── index.ts
│   │   ├── common
│   │   │   ├── AriaLiveRegion.tsx
│   │   │   ├── DeleteConfirmDialog.tsx
│   │   │   ├── EmptyState.tsx
│   │   │   ├── ErrorState.tsx
│   │   │   ├── LoadingState.tsx
│   │   │   ├── SEO.tsx
│   │   │   ├── SafeImage.tsx
│   │   │   ├── SkipLink.tsx
│   │   │   ├── VoyaLoader.tsx
│   │   │   └── index.ts
│   │   ├── dashboard
│   │   │   ├── QuickOverviewCard.tsx
│   │   │   ├── StatCard.tsx
│   │   │   ├── StatisticCard.tsx
│   │   │   └── index.ts
│   │   ├── filters
│   │   │   ├── FilterContainer.tsx
│   │   │   └── index.ts
│   │   ├── forms
│   │   │   ├── FormActions.tsx
│   │   │   ├── FormField.tsx
│   │   │   └── index.ts
│   │   ├── hotel
│   │   │   ├── HotelCard.tsx
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
│   │   │   ├── PageContainer.tsx
│   │   │   ├── Section.tsx
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
│   │   │   │   │   └── CityForm.tsx
│   │   │   │   ├── index.ts
│   │   │   │   └── styles.module.css
│   │   │   ├── Dashboard
│   │   │   │   ├── Dashboard.tsx
│   │   │   │   ├── index.ts
│   │   │   │   └── styles.module.css
│   │   │   ├── Hotels
│   │   │   │   ├── Hotels.tsx
│   │   │   │   ├── components
│   │   │   │   │   └── HotelForm.tsx
│   │   │   │   ├── index.ts
│   │   │   │   └── styles.module.css
│   │   │   ├── Rooms
│   │   │   │   ├── Rooms.tsx
│   │   │   │   ├── components
│   │   │   │   │   └── RoomForm.tsx
│   │   │   │   ├── index.ts
│   │   │   │   └── styles.module.css
│   │   │   └── styles.module.css
│   │   ├── Checkout
│   │   │   ├── Checkout.tsx
│   │   │   ├── Confirmation
│   │   │   │   ├── Confirmation.tsx
│   │   │   │   ├── confirmation.module.css
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
│   │   ├── Forbidden
│   │   │   ├── Forbidden.tsx
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
│   │   │   └── tests
│   │   │       └── HomeSearchBar.test.tsx
│   │   ├── Hotel
│   │   │   ├── Hotel.container.tsx
│   │   │   ├── Hotel.presentational.tsx
│   │   │   ├── Hotel.tsx
│   │   │   ├── components
│   │   │   │   ├── DateSelectionDialog.tsx
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
│   │       │   ├── EditableSearchBar.tsx
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
