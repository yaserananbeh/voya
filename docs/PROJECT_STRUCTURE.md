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
├── dist
│   ├── _redirects
│   ├── assets
│   │   ├── Box-pUQRSzkw.js
│   │   ├── Button-DMmFr0di.js
│   │   ├── CircularProgress-CbYJ7RAA.js
│   │   ├── Container-CmlbRrUS.js
│   │   ├── LogoutBtn-Dy9IGXfk.js
│   │   ├── Paper-DTwKwhR4.js
│   │   ├── Typography-DDbyn4Yo.js
│   │   ├── index-2gZ9xIiA.js
│   │   ├── index-B1mt5Eu-.js
│   │   ├── index-B_ezJJYx.js
│   │   ├── index-BerZ4fUg.js
│   │   ├── index-Bh0YueAI.js
│   │   ├── index-C2Guv9dY.js
│   │   ├── index-CSsBpVWf.js
│   │   ├── index-Co4Bz83h.js
│   │   ├── index-CvpQWpgS.js
│   │   ├── index-Cxrey-oc.css
│   │   ├── index-D0fh3uF9.css
│   │   ├── index-Ditz1SoZ.js
│   │   ├── index-N-2ZbHV8.js
│   │   ├── index-StO2EN8l.js
│   │   ├── index-fzJwvD5u.js
│   │   ├── index-gVnBl6Yc.js
│   │   ├── index-tn0RQdqM.css
│   │   └── index.esm-DCSuFQeq.js
│   ├── index.html
│   └── vite.svg
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
│   └── vite.svg
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
│   │   ├── hotel
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
│   │   ├── index.ts
│   │   ├── layout
│   │   │   ├── LogoutBtn.tsx
│   │   │   ├── PageContainer.tsx
│   │   │   ├── PageHeader.tsx
│   │   │   └── Section.tsx
│   │   └── readme.md
│   ├── constants
│   │   ├── api.ts
│   │   ├── colors.ts
│   │   ├── index.ts
│   │   └── messages.ts
│   ├── hooks
│   │   ├── index.ts
│   │   └── tests
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
│   │   │   ├── hooks
│   │   │   ├── index.ts
│   │   │   ├── styles.module.css
│   │   │   ├── tests
│   │   │   └── utils
│   │   ├── Home
│   │   │   ├── Home.tsx
│   │   │   ├── components
│   │   │   │   ├── FeaturedDealsSection.tsx
│   │   │   │   ├── GuestRoomSelector.tsx
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
│   │   │   ├── hooks
│   │   │   ├── index.ts
│   │   │   ├── styles.module.css
│   │   │   ├── tests
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
│   │       ├── hooks
│   │       ├── index.ts
│   │       ├── styles.module.css
│   │       ├── tests
│   │       └── utils
│   ├── providers
│   │   ├── ErrorBoundary.tsx
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
