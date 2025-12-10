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
│   ├── ASSETS_MANAGEMENT_STRATEGY.md
│   ├── CONTRIBUTING.md
│   ├── GIT_BRANCH_STRATEGY.md
│   ├── PROJECT_STRUCTURE.md
│   ├── ROUTES.md
│   ├── UI_COMPONENTS_MUI_MAP.md
│   ├── adr
│   │   └── ADR-006-error-logging.md
│   └── design.md
├── eslint.config.js
├── index.html
├── package.json
├── pnpm-lock.yaml
├── public
│   └── vite.svg
├── src
│   ├── App.tsx
│   ├── api
│   │   ├── admin
│   │   ├── auth
│   │   ├── axiosInstance.ts
│   │   ├── checkout
│   │   ├── home
│   │   ├── hotel
│   │   ├── index.ts
│   │   ├── search
│   │   └── upload
│   │       └── index.ts
│   ├── assets
│   │   ├── fonts
│   │   ├── icons
│   │   ├── images
│   │   ├── index.ts
│   │   └── react.svg
│   ├── components
│   │   ├── index.ts
│   │   ├── layout
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
│   │   ├── tests
│   │   └── usePhotoUpload.ts
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
│   │   │   ├── hooks
│   │   │   ├── index.ts
│   │   │   ├── styles.module.css
│   │   │   ├── tests
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
│   ├── styles
│   │   └── reset.css
│   ├── temp
│   │   ├── DemoOverrideTest.tsx
│   │   └── dev.ts
│   ├── theme
│   │   └── index.ts
│   ├── types
│   │   ├── index.ts
│   │   └── mui.d.ts
│   └── utils
│       ├── date.ts
│       ├── globalErrors.ts
│       ├── index.ts
│       ├── logger.ts
│       ├── responsive.ts
│       └── string.ts
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
`
