# 🏗️ Voya Project - Complete Setup Guide

> **Step-by-step guide to recreate the entire Voya project from scratch, following realistic development flow**

## ⚡ Quick Start Summary

This guide walks you through building the Voya project **exactly as you would in real life** - feature by feature, incrementally. Each feature is built completely (page, API, types, translations, components) before moving to the next.

### Key Points

1. **Realistic Development Flow**: This guide follows how developers actually build projects:
   - Start with minimal foundation (just enough to run)
   - Build **Home Page** feature completely (page + API + types + translations + components)
   - Build **Login Page** feature completely
   - Build **Search Results** feature completely
   - Continue feature by feature until complete

2. **Gradual Enhancement**: As you build each **component**, you'll:
   - Add translations incrementally (only what **that specific component** needs right now)
   - Add types incrementally (only what **that specific component** needs right now)
   - Add theme customizations incrementally (only when **that specific component** needs them)
   - Create supporting components incrementally (only when **that specific component** needs them)

   **Example**: When building Home page:
   - Build HeroSection → Add ONLY hero translations → Test
   - Build SearchBar → Add ONLY search bar translations → Test
   - Build FeaturedDeals → Add ONLY featured deals translations → Test
   - NOT: Add all Home translations at once

3. **Copy vs Build**:
   - **Long fixed files** (complete `types/models.ts`, complete translation files) → Copy from codebase when needed
   - **Feature-specific code** → Build incrementally following the guide
   - Clear markers indicate when to copy vs when to build

4. **Estimated Time**: Complete setup takes approximately 6-8 hours for an experienced developer, 12-16 hours for someone new to the stack.

5. **Prerequisites**: Node.js v18+, pnpm 8.0+, Git, and a code editor (VS Code recommended).

6. **Order Matters**: Follow sections in order. Each feature builds on previous ones.

### What You'll Build

- ✅ React 19 + TypeScript + Vite setup
- ✅ Redux Toolkit with RTK Query for state management
- ✅ Material-UI (MUI) theme system with dark mode
- ✅ React Router with lazy loading and protected routes
- ✅ i18n (English/Arabic) with RTL support
- ✅ Complete API integration layer
- ✅ Authentication & authorization system
- ✅ Admin dashboard with CRUD operations
- ✅ Testing setup (Vitest + MSW)
- ✅ Code quality tools (ESLint + Prettier + Husky)

### Troubleshooting

If you encounter issues:

1. Check the troubleshooting sections in each part
2. Verify all dependencies are installed: `pnpm install`
3. Check that Node.js version is v18+: `node --version`
4. Review the existing codebase for implementation patterns

---

## 📋 Guide Structure

This guide has been split into logical parts for easier navigation:

### Foundation Setup

1. **[Foundation: Common Setup](01-Foundation-Common-Setup.md)** - Prerequisites, Initial Project Setup, Configuration Files
   - Common to all React/TypeScript projects
   - Vite setup, dependencies, TypeScript, ESLint, Prettier

2. **[Foundation: Voya-Specific Setup](02-Foundation-Voya-Specific.md)** - Project Structure, Core Setup, State Management, Routing, Theme, i18n, API, Auth
   - Voya-specific foundation
   - Redux, React Router, MUI Theme, i18n setup

### Features (Build Incrementally)

3. **[Feature 1: Home Page](03-Feature-01-Home-Page.md)** - Home page with Hero, Search, Featured Deals, etc.

4. **[Feature 2: Login & Authentication](04-Feature-02-Login-Auth.md)** - Login page, Auth API, Protected routes

5. **[Feature 3: Search Results Page](05-Feature-03-Search-Results.md)** - Search results with filters

6. **[Feature 4: Hotel Details Page](06-Feature-04-Hotel-Details.md)** - Hotel page with Gallery, Map, Rooms, Reviews

7. **[Feature 5: Checkout Flow](07-Feature-05-Checkout.md)** - Checkout page and Confirmation page

8. **[Feature 6: Admin Dashboard](08-Feature-06-Admin-Dashboard.md)** - Admin layout, Dashboard, Cities, Hotels, Rooms management

### Polish & Quality

9. **[Polish & Quality](09-Polish-Quality.md)** - Error Handling, Testing, Code Quality Tools, Git Hooks

---

## ⚡ Quick Start

1. Start with [Foundation: Common Setup](01-Foundation-Common-Setup.md)
2. Then follow [Foundation: Voya-Specific Setup](02-Foundation-Voya-Specific.md)
3. Build features in order: Feature 1 → Feature 2 → Feature 3 → Feature 4 → Feature 5 → Feature 6
4. Finish with [Polish & Quality](09-Polish-Quality.md)

## 🎯 Development Philosophy

### How This Guide Works

This guide simulates **real-world development** where you build features incrementally, not all at once. Here's the approach:

#### **Foundation First (Minimal)**

- Set up just enough infrastructure to start building
- Minimal theme (basic colors)
- Minimal i18n (basic setup, empty translations)
- Minimal routing (one placeholder route)
- Minimal state management (empty store)

#### **Then Build Features One by One - Component by Component**

For each feature (Home, Login, Search, etc.), you'll build **one component at a time**:

1. **Create minimal page component** (placeholder)
2. **Add route** → Test
3. **Build first component** (e.g., HeroSection):
   - Create component
   - Add ONLY the translations this component needs
   - Add ONLY the types this component needs
   - Add API endpoint ONLY if this component needs it
   - Test
4. **Build second component** (e.g., SearchBar):
   - Create component
   - Add ONLY the translations this component needs
   - Add ONLY the types this component needs
   - Add state management (SearchSlice) ONLY if this component needs it
   - Test
5. **Continue with next component** (same pattern)

**Key Point**: You don't add "all Home translations" or "all Home types" at once. You add translations/types **for each component as you build it**.

#### **Copy vs Build Decision**

**Copy from Codebase** (when you see this marker):

- ✅ Complete `types/models.ts` file (280+ lines) - Copy when you need all types
- ✅ Complete translation files (`en.json`, `ar.json`) - Copy when you need all translations
- ✅ Complete theme configuration - Copy when you need all customizations
- ✅ MUI type declarations (`src/types/mui.d.ts`) - Copy when adding custom variants

**Build Incrementally** (follow the guide - component by component):

- ✅ Page components - Build step by step (minimal → enhance)
- ✅ API endpoints - Add one endpoint at a time (only when a component needs it)
- ✅ Translations - Add keys **for each component as you build it** (not all at once)
- ✅ Types - Add types **for each component as you build it** (not all at once)
- ✅ Components - Create when other components need them
- ✅ Theme customizations - Add when a specific component needs them

**Key Principle**: Each component is built, tested, and has its dependencies added **only when that component needs them**.
