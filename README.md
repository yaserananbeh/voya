# 🏨 Voya - Travel & Accommodation Booking Platform

<div align="center">

![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-593D88?style=for-the-badge&logo=redux&logoColor=white)
![Material-UI](https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white)

A modern, full-featured travel and accommodation booking platform built with React, TypeScript, and Redux Toolkit.

[Features](#-features) • [Installation](#-installation) • [Documentation](#-documentation) • [Contributing](#-contributing)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [Project Structure](#-project-structure)
- [Available Scripts](#-available-scripts)
- [State Management](#-state-management)
- [Internationalization](#-internationalization)
- [Testing](#-testing)
- [API Integration](#-api-integration)
- [Documentation](#-documentation)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Overview

**Voya** is a comprehensive travel and accommodation booking platform that allows users to search, browse, and book hotels with ease. The platform includes both user-facing features for booking accommodations and an admin panel for managing cities, hotels, and rooms.

### Key Highlights

- ✨ **Modern Stack**: Built with React 19, TypeScript, and Redux Toolkit
- 🎨 **Beautiful UI**: Material-UI components with custom theming
- 🌍 **Internationalization**: Full support for English and Arabic (RTL)
- 🔒 **Type Safety**: End-to-end TypeScript coverage
- ⚡ **Performance**: Code splitting, lazy loading, and optimized caching
- 🧪 **Tested**: Unit tests with Vitest and React Testing Library
- 📱 **Responsive**: Mobile-first design approach

---

## ✨ Features

### 👤 User Features

#### 1. **Authentication**
- Secure login with username and password
- Role-based access (User/Admin)
- Protected routes and session management

#### 2. **Home Page**
- **Robust Search Functionality**
  - Search bar for hotels and cities
  - Interactive calendar for check-in/check-out dates
  - Guest and room selection controls
  - Default values (today/tomorrow, 1 adult, 1 room)

- **Featured Deals Section**
  - Showcases 3-5 hotels with special offers
  - Displays original and discounted prices
  - Hotel thumbnails and location information

- **Recently Visited Hotels**
  - Personalized display of last 3-5 visited hotels
  - Includes thumbnail, name, city, star rating, and pricing

- **Trending Destinations**
  - Curated list of popular cities
  - Visual thumbnails and city information

#### 3. **Search Results Page**
- **Comprehensive Filters**
  - Price range slider
  - Star rating filter
  - Amenities filter
  - Hotel type filter (luxury, budget, boutique)
  - Responsive sidebar (drawer on mobile)

- **Hotel Listings**
  - Infinite scroll pagination
  - Hotel cards with thumbnails, ratings, and prices
  - Brief descriptions
  - Direct navigation to hotel details

#### 4. **Hotel Details Page**
- **Visual Gallery**
  - High-quality hotel images
  - Fullscreen image viewer
  - Thumbnail navigation

- **Detailed Information**
  - Hotel name, star rating, and description
  - Guest reviews and ratings
  - Interactive map showing hotel location
  - Nearby attractions display

- **Room Availability & Selection**
  - List of available room types
  - Room images, descriptions, and prices
  - Capacity information (adults/children)
  - Room amenities
  - "Book Now" functionality

#### 5. **Checkout & Confirmation**
- **User Information & Payment**
  - Personal details form
  - Payment method selection
  - Booking summary display
  - Secure booking submission

- **Confirmation Page**
  - Booking confirmation number
  - Complete booking details
  - Hotel address and room information
  - Dates and total price
  - Payment method confirmation

### 🛠 Admin Features

#### 6. **Admin Dashboard**
- **Functional Left Navigation**
  - Collapsible sidebar with links to:
    - Dashboard (overview statistics)
    - Cities Management
    - Hotels Management
    - Rooms Management
  - Responsive mobile drawer

#### 7. **Admin Search Bar**
- Global search functionality
- Filters for all admin grids

#### 8. **Detailed Grids**

**Cities Grid:**
- Name, description
- Search and filter capabilities
- Create, update, and delete operations

**Hotels Grid:**
- Name, star rating, number of rooms
- Search and filter capabilities
- Create, update, and delete operations

**Rooms Grid:**
- Room number, availability status
- Adult and children capacity
- Search and filter capabilities
- Create, update, and delete operations

#### 9. **Entity Management Forms**
- **Create Button**: Opens modal form for creating new entities
- **Update Form**: Accessible by clicking on grid rows
- **Delete Confirmation**: Safe deletion with confirmation dialogs
- **Photo Upload**: Support for image uploads

---

## 🛠 Tech Stack

### Core Technologies

- **React 19.2.0** - UI library
- **TypeScript 5.9.3** - Type safety
- **Vite 7.2.4** - Build tool and dev server

### State Management

- **Redux Toolkit 2.11.1** - State management
- **RTK Query** - Data fetching and caching
- **React Redux 9.2.0** - React bindings

### UI Framework

- **Material-UI (MUI) 7.3.5** - Component library
- **MUI X Data Grid 8.19.0** - Advanced data tables (used in admin pages)
- **Emotion** - CSS-in-JS styling (used by MUI)

### Routing & Navigation

- **React Router DOM 7.9.6** - Client-side routing
- Lazy loading for code splitting

### Forms & Validation

- **Formik 2.4.9** - Form state management
- **Yup 1.7.1** - Schema validation

### Internationalization

- **i18next 25.7.3** - Internationalization framework
- **react-i18next 16.5.0** - React bindings
- **i18next-browser-languagedetector 8.2.0** - Language detection

### Maps & Media

- **Leaflet 1.9.4** - Interactive maps
- **react-leaflet 5.0.0** - React bindings
- **react-image-gallery 1.4.0** - Image galleries

### Utilities

- **notistack 3.0.2** - Toast notifications

### Development Tools

- **ESLint 9.39.1** - Code linting
- **Prettier 3.6.2** - Code formatting
- **Husky 9.1.7** - Git hooks
- **lint-staged 16.2.7** - Pre-commit linting
- **Vitest 4.0.13** - Unit testing
- **React Testing Library 16.3.0** - Component testing
- **MSW 2.12.4** - API mocking for tests

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **pnpm** (recommended) or npm/yarn - [Install pnpm](https://pnpm.io/installation)
- **Git** - [Download](https://git-scm.com/)

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Voya
```

### 2. Install Dependencies

Using pnpm (recommended):

```bash
pnpm install
```

Or using npm:

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` and add your configuration:

```env
VITE_API_BASE_URL=https://travel-and-accommodation-booking-static.onrender.com
```

### 4. Start Development Server

```bash
pnpm dev
```

The application will be available at `http://localhost:5173`

---

## ⚙️ Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_API_BASE_URL` | Base URL for the backend API | Yes |

Example:

```env
VITE_API_BASE_URL=https://travel-and-accommodation-booking-static.onrender.com
```

### API Configuration

The project uses RTK Query for API integration. All API endpoints are configured in:

- `src/api/baseApi.ts` - Base API configuration
- `src/api/*/index.ts` - Feature-specific endpoints

See [API Integration](#-api-integration) for more details.

---

## 💻 Usage

### Development

```bash
# Start development server
pnpm dev

# Run type checking
pnpm typecheck

# Run linter
pnpm lint

# Format code
pnpm format

# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch
```

### Building for Production

```bash
# Build the project
pnpm build

# Preview production build
pnpm preview
```

### Code Quality

```bash
# Run all checks (typecheck, lint, test, build)
pnpm verify

# Run checks on staged files
pnpm verify:stage
```

---

## 📁 Project Structure

```
Voya/
├── public/                 # Static assets
├── src/
│   ├── api/                # RTK Query API endpoints
│   │   ├── admin/         # Admin API endpoints
│   │   ├── auth/          # Authentication API
│   │   ├── baseApi.ts     # Base API configuration
│   │   ├── checkout/       # Booking API
│   │   ├── home/          # Home page API
│   │   ├── hotels/        # Hotels API
│   │   ├── searchResults/ # Search API
│   │   └── upload/        # Photo upload API
│   ├── assets/            # Images, fonts, icons
│   ├── components/        # Reusable components
│   │   ├── auth/         # Auth-related components
│   │   ├── common/       # Common components
│   │   └── layout/      # Layout components
│   ├── constants/        # App constants
│   ├── hooks/            # Custom React hooks
│   ├── i18n/            # Internationalization
│   │   └── locales/     # Translation files
│   ├── layouts/         # Page layouts
│   │   ├── AdminLayout/ # Admin layout
│   │   └── MainLayout/  # Main layout
│   ├── pages/           # Page components
│   │   ├── Admin/       # Admin pages
│   │   ├── Checkout/   # Checkout flow
│   │   ├── Home/       # Home page
│   │   ├── Hotel/      # Hotel details
│   │   ├── Login/      # Login page
│   │   ├── SearchResults/ # Search results
│   │   └── Error/      # Error pages
│   ├── providers/      # Context providers
│   ├── routes/         # Route configuration
│   ├── store/          # Redux store
│   │   ├── authSlice.ts    # Auth state
│   │   ├── searchSlice.ts  # Search state
│   │   └── index.ts        # Store configuration
│   ├── theme/          # MUI theme configuration
│   ├── types/           # TypeScript type definitions
│   ├── utils/           # Utility functions
│   ├── App.tsx          # Root component
│   └── main.tsx         # Entry point
├── docs/                # Documentation
├── .env.example         # Environment variables template
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript configuration
└── vite.config.ts       # Vite configuration
```

For detailed structure, see [PROJECT_STRUCTURE.md](./docs/PROJECT_STRUCTURE.md).

---

## 📜 Available Scripts

| Script | Description |
|--------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm preview` | Preview production build |
| `pnpm lint` | Run ESLint |
| `pnpm format` | Format code with Prettier |
| `pnpm format:check` | Check code formatting |
| `pnpm test` | Run tests |
| `pnpm test:watch` | Run tests in watch mode |
| `pnpm typecheck` | Run TypeScript type checking |
| `pnpm verify` | Run all checks (typecheck, lint, test, build) |
| `pnpm verify:stage` | Run checks on staged files |
| `pnpm gen:api` | Generate TypeScript types from OpenAPI spec |

---

## 🔄 State Management

This project uses **Redux Toolkit (RTK)** and **RTK Query** for state management.

### RTK Slices (Client State)

- **`authSlice`**: Authentication state (token, userType)
- **`searchSlice`**: Search parameters and filters

### RTK Query (Server State)

All API interactions are handled through RTK Query:

- **Automatic Caching**: Responses are cached automatically
- **Loading States**: Built-in `isLoading`, `isFetching` flags
- **Error Handling**: Automatic error state management
- **Cache Invalidation**: Tag-based cache invalidation system
- **Request Deduplication**: Multiple components requesting same data = one request

### Example Usage

```typescript
// Query (GET request)
const { data, isLoading, isError } = useGetHotelsQuery({ 
  pageNumber: 1, 
  pageSize: 10 
})

// Mutation (POST/PUT/DELETE)
const [createHotel, { isLoading }] = useCreateHotelMutation()
await createHotel(data).unwrap()
```

For comprehensive RTK/RTK Query documentation, see:
- [RTK & RTK Query Guide](./docs/RTK_AND_RTK_QUERY_GUIDE.md)
- [RTK Quick Reference](./docs/RTK_QUICK_REFERENCE.md)

---

## 🌍 Internationalization

The application supports multiple languages with full RTL (Right-to-Left) support.

### Supported Languages

- **English** (en) - Default
- **Arabic** (ar) - RTL support

### Language Switching

Users can switch languages using the language switcher in the header.

### Adding New Languages

1. Create a new translation file in `src/i18n/locales/`
2. Add the language to `src/i18n/config.ts`
3. Update the language switcher component

### Usage in Components

```typescript
import { useTranslation } from 'react-i18next'

function MyComponent() {
  const { t } = useTranslation()
  return <h1>{t('welcome.message')}</h1>
}
```

---

## 🧪 Testing

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch
```

### Test Structure

Tests are co-located with their components:

```
src/
  ├── pages/
  │   └── Home/
  │       └── tests/
  │           └── Home.test.tsx
  ├── hooks/
  │   └── tests/
  └── utils/
      └── tests/
```

### Testing Tools

- **Vitest**: Test runner
- **React Testing Library**: Component testing
- **MSW**: API mocking for tests
- **@testing-library/user-event**: User interaction simulation

### Example Test

```typescript
import { render, screen } from '@testing-library/react'
import { Home } from './Home'

test('renders home page', () => {
  render(<Home />)
  expect(screen.getByText('Welcome')).toBeInTheDocument()
})
```

---

## 🔌 API Integration

### Backend API

The project connects to a RESTful API using **RTK Query** with native `fetch` API (via `fetchBaseQuery`). The base URL is configured via `VITE_API_BASE_URL`.

**Backend URL**: `https://travel-and-accommodation-booking-static.onrender.com`

**Note**: This project uses RTK Query's `fetchBaseQuery` instead of axios for HTTP requests, providing automatic caching, request deduplication, and seamless Redux integration.

### API Endpoints

All API endpoints are defined using RTK Query's `injectEndpoints`:

#### Authentication
- `POST /auth/authenticate` - User login

#### Hotels
- `GET /hotels` - Get hotels list (with pagination)
- `GET /hotels/:id` - Get hotel details
- `GET /hotels/:id/gallery` - Get hotel gallery
- `GET /hotels/:id/rooms` - Get hotel rooms
- `GET /hotels/:id/reviews` - Get hotel reviews

#### Search
- `GET /hotels` - Get hotels list with search query parameters (used for search results page)
- `GET /home/search` - Search hotels with filters (used for home page search)
- `GET /search-results/amenities` - Get available amenities for filtering

#### Home Page
- `GET /home/featured-deals` - Get featured deals
- `GET /home/users/:userId/recent-hotels` - Get recently visited hotels
- `GET /home/destinations/trending` - Get trending destinations

#### Checkout
- `POST /bookings` - Create booking
- `GET /bookings/:id` - Get booking details

#### Upload
- `POST /photos` - Upload photo (used in admin for city, hotel, and room images)

#### Admin
- `GET /cities` - Get cities list
- `POST /cities` - Create city
- `PUT /cities/:id` - Update city
- `DELETE /cities/:id` - Delete city
- Similar endpoints for hotels and rooms

### Authentication

All authenticated requests automatically include the Bearer token in the Authorization header:

```typescript
// Configured in baseApi.ts
prepareHeaders: (headers) => {
  const token = localStorage.getItem('token')
  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }
  return headers
}
```

---

## 📚 Documentation

Comprehensive documentation is available in the `docs/` directory:

### Core Documentation

- [**PROJECT_STRUCTURE.md**](./docs/PROJECT_STRUCTURE.md) - Detailed project structure
- [**ROUTES.md**](./docs/ROUTES.md) - Application routing documentation
- [**CONTRIBUTING.md**](./docs/CONTRIBUTING.md) - Contribution guidelines

### Technical Guides

- [**RTK & RTK Query Guide**](./docs/RTK_AND_RTK_QUERY_GUIDE.md) - Complete RTK/RTK Query tutorial
- [**RTK Quick Reference**](./docs/RTK_QUICK_REFERENCE.md) - Quick reference cheat sheet
- [**API_CACHING_STRATEGY.md**](./docs/API_CACHING_STRATEGY.md) - Caching strategy
- [**STATE_MGMT_TRADEOFFS.md**](./docs/STATE_MGMT_TRADEOFFS.md) - State management decisions

### Design & Architecture

- [**UI_COMPONENTS_MUI_MAP.md**](./docs/UI_COMPONENTS_MUI_MAP.md) - MUI component mapping
- [**ASSETS_MANAGEMENT_STRATEGY.md**](./docs/ASSETS_MANAGEMENT_STRATEGY.md) - Asset management
- [**GIT_BRANCH_STRATEGY.md**](./docs/GIT_BRANCH_STRATEGY.md) - Git workflow

### Architecture Decision Records (ADR)

- [**ADR-006-error-logging.md**](./docs/adr/ADR-006-error-logging.md) - Error logging strategy
- [**ADR-007-rtk-query-vs-axios.md**](./docs/adr/ADR-007-rtk-query-vs-axios.md) - RTK Query decision

### Requirements

- [**REQUIREMENTS_COVERAGE.md**](./REQUIREMENTS_COVERAGE.md) - Project requirements coverage

---

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./docs/CONTRIBUTING.md) for guidelines.

### Quick Start for Contributors

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests and linting (`pnpm verify`)
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Code Style

- Follow ESLint and Prettier configurations
- Write TypeScript with proper types
- Add tests for new features
- Update documentation as needed

### Git Hooks

This project uses Husky and lint-staged to ensure code quality:

- **Pre-commit**: Runs ESLint and Prettier on staged files
- All code must pass linting before commit

---

## 🎨 UI/UX Features

### Material-UI Theme

The application uses a custom Material-UI theme with:

- Light and dark mode support
- Custom color palette
- Responsive typography
- Consistent spacing system

### Responsive Design

- Mobile-first approach
- Breakpoints: xs, sm, md, lg, xl
- Adaptive layouts for all screen sizes

### Accessibility

- ARIA labels where appropriate
- Keyboard navigation support
- Screen reader friendly
- Semantic HTML structure

---

## 🔒 Security

### Authentication

- JWT token-based authentication
- Tokens stored in localStorage
- Automatic token injection in API requests
- Protected routes for authenticated users

### Best Practices

- Environment variables for sensitive data
- No hardcoded API keys or secrets
- Input validation on all forms
- XSS protection through React's built-in escaping

---

## 🚀 Performance Optimizations

### Code Splitting

- Lazy loading for all routes
- Dynamic imports for heavy components
- Route-based code splitting

### Caching

- RTK Query automatic caching
- Request deduplication
- Smart cache invalidation

### Bundle Optimization

- Tree shaking
- Minification in production
- Optimized asset loading

---

## 🐛 Troubleshooting

### Common Issues

**Issue**: API requests failing
- **Solution**: Check `VITE_API_BASE_URL` in `.env` file

**Issue**: TypeScript errors
- **Solution**: Run `pnpm typecheck` to see detailed errors

**Issue**: Tests not running
- **Solution**: Ensure `setupTests.ts` is properly configured

**Issue**: Build fails
- **Solution**: Check for TypeScript errors and linting issues

---

## 📝 License

This project is private and proprietary. All rights reserved.

---

## 👥 Authors

- **Your Name** - *Initial work*

---

## 🙏 Acknowledgments

- Material-UI team for the excellent component library
- Redux Toolkit team for RTK and RTK Query
- All open-source contributors whose libraries made this project possible

---

## 📞 Support

For support, please open an issue in the repository or contact the development team.

---

<div align="center">

**Built with ❤️ using React, TypeScript, and Redux Toolkit**

[⬆ Back to Top](#-voya---travel--accommodation-booking-platform)

</div>
