# Unused Code Classification Report

This report identifies unused files, folders, and code in the Voya project.

## 🔴 Category 1: Completely Unused Files (Safe to Delete)

### Temporary/Development Files

- **`src/temp/DemoOverrideTest.tsx`** - Test component for MUI overrides, not imported anywhere
- **`src/temp/dev.ts`** - Development test file with console.log, not imported anywhere
- **`src/pages/Error/QuickErrorTest.tsx`** - Error testing component, not imported anywhere

### Unused Page Component

- **`src/pages/Admin/Admin.tsx`** - Empty component that just returns `<div>Admin</div>`, not used in routes (routes use Dashboard, Cities, Hotels, Rooms directly)

### Empty Directories (No files inside)

- **`src/mocks/`** - Empty directory
- **`src/assets/fonts/`** - Empty directory
- **`src/assets/icons/`** - Empty directory
- **`src/assets/images/`** - Empty directory
- **`src/pages/Admin/Dashboard/components/`** - Empty directory
- **`src/pages/Admin/Dashboard/hooks/`** - Empty directory
- **`src/pages/Admin/Dashboard/utils/`** - Empty directory
- **`src/pages/Admin/Dashboard/tests/`** - Empty directory
- **`src/pages/Admin/Cities/hooks/`** - Empty directory
- **`src/pages/Admin/Cities/tests/`** - Empty directory
- **`src/pages/Admin/Cities/utils/`** - Empty directory
- **`src/pages/Admin/Hotels/hooks/`** - Empty directory
- **`src/pages/Admin/Hotels/tests/`** - Empty directory
- **`src/pages/Admin/Hotels/utils/`** - Empty directory
- **`src/pages/Admin/Rooms/hooks/`** - Empty directory
- **`src/pages/Admin/Rooms/tests/`** - Empty directory
- **`src/pages/Admin/Rooms/utils/`** - Empty directory
- **`src/pages/Checkout/Confirmation/components/`** - Empty directory
- **`src/pages/Checkout/Confirmation/hooks/`** - Empty directory
- **`src/pages/Checkout/Confirmation/utils/`** - Empty directory
- **`src/pages/Checkout/Confirmation/tests/`** - Empty directory
- **`src/pages/Checkout/hooks/`** - Empty directory
- **`src/pages/Home/hooks/`** - Empty directory
- **`src/pages/Home/utils/`** - Empty directory
- **`src/pages/Hotel/hooks/`** - Empty directory
- **`src/pages/Hotel/utils/`** - Empty directory
- **`src/pages/Login/components/`** - Empty directory
- **`src/pages/Login/hooks/`** - Empty directory
- **`src/pages/Login/utils/`** - Empty directory
- **`src/pages/NotFound/components/`** - Empty directory
- **`src/pages/NotFound/hooks/`** - Empty directory
- **`src/pages/NotFound/utils/`** - Empty directory
- **`src/pages/NotFound/tests/`** - Empty directory
- **`src/pages/SearchResults/utils/`** - Empty directory
- **`src/pages/SearchResults/tests/`** - Empty directory

### Unused Asset Files

- **`src/assets/react.svg`** - Not imported anywhere in the codebase
- **`src/assets/index.ts`** - Empty file (no exports)

## 🟡 Category 2: Unused Code Within Files (Functions/Components Not Used)

### Hooks (Exported but Never Imported)

- **`src/hooks/useLocalStorage.ts`** - Exported in `hooks/index.ts` but never imported/used
- **`src/hooks/useDebounce.ts`** - Exported in `hooks/index.ts` but never imported/used
- **`src/hooks/useAuth.ts`** - Exported in `hooks/index.ts` but never imported/used
- **`src/hooks/useSearch.ts`** - Exported in `hooks/index.ts` but never imported/used
- **`src/hooks/useBooking.ts`** - Exported in `hooks/index.ts` but never imported/used
- **`src/hooks/useRTLButton.ts`** - Never imported/used (useRTL is used instead)
- **`src/hooks/useIntersectionObserver.ts`** - Exported in `hooks/index.ts` but never imported/used

### Components (Exported but Never Imported)

- **`src/components/common/AppCard.tsx`** - Exported in `components/common/index.ts` but never imported/used
- **`src/components/common/ReusableCard.tsx`** - Exported in `components/common/index.ts` but never imported/used
- **`src/components/common/AppButton.tsx`** - Exported in `components/common/index.ts` but never imported/used
- **`src/components/hoc/withLoading.tsx`** - Exported in `components/hoc/index.ts` but never imported/used
- **`src/components/error/withErrorBoundary.tsx`** - Exported in `components/error/index.ts` but never imported/used (ComponentErrorBoundary is only used internally)
- **`src/components/patterns/PropsGetters.tsx`** - Exported in `components/patterns/index.ts` but never imported/used
  - `useFormFieldProps` - Never used
  - `useFilterProps` - Never used

### Utility Functions (Exported but Never Imported)

- **`src/utils/price.ts`** - Exported in `utils/index.ts` but never imported/used
  - `formatPrice()` - Never used
  - `calculateDiscount()` - Never used
  - `calculateTotalPrice()` - Never used
- **`src/utils/responsive.ts`** - Exported in `utils/index.ts` but never imported/used
  - `pxToRem()` - Never used
- **`src/utils/string.ts`** - Exported in `utils/index.ts` but never imported/used
  - `capitalize()` - Never used
- **`src/utils/validation.ts`** - Exported in `utils/index.ts` but never imported/used
  - `isValidEmail()` - Never used
  - `isValidPhoneNumber()` - Never used
  - `isValidUrl()` - Never used
  - `isPositiveNumber()` - Never used
  - `isNonNegativeNumber()` - Never used
- **`src/utils/recentHotelsStorage.ts`** - Never imported/used
  - `loadRecentHotels()` - Never used
  - `addRecentHotel()` - Never used
  - `RecentHotel` type - Never used

### Unused Functions Within Used Files

- **`src/pages/Checkout/utils/checkoutStorage.ts`**
  - `clearCheckoutContext()` - Exported but never called

### Unused Date Utilities

- **`src/utils/date.ts`**
  - `formatDate()` - Exported but never used
  - Only `startOfToday()`, `addDays()`, `formatDateForApi()`, and `formatDistanceToNow()` are used

## 🟢 Category 3: Potentially Unused Dependencies

### NPM Packages (Check if actually used)

- **`react-toastify`** - Installed but no imports found (project uses `notistack` instead)
- **`@tanstack/react-query`** - Installed but no imports found (project uses RTK Query instead)
- **`@tanstack/react-query-devtools`** - Dev dependency, but react-query itself isn't used

## 📝 Category 4: Documentation Files (May Be Outdated)

These markdown files exist but may contain outdated information:

- **`src/components/readme.md`** - Simple one-line file: "shared reusable UI components"
- **`src/pages/Admin/ducks/readme.md`** - Pattern documentation
- **`src/pages/Admin/Cities/ducks/readme.md`** - Pattern documentation
- **`src/pages/Admin/Dashboard/ducks/readme.md`** - Pattern documentation
- **`src/pages/Admin/Hotels/ducks/readme.md`** - Pattern documentation
- **`src/pages/Admin/Rooms/ducks/readme.md`** - Pattern documentation
- **`src/pages/Checkout/Confirmation/ducks/readme.md`** - Pattern documentation

## 📊 Summary Statistics

- **Total Unused Files**: ~10 files
- **Total Empty Directories**: ~30 directories
- **Total Unused Functions/Components**: ~25+ items
- **Total Unused Hooks**: 7 hooks
- **Total Unused Utilities**: 5 utility files with multiple functions
- **Potentially Unused Dependencies**: 2-3 packages

## 🎯 Recommendations

### High Priority (Safe to Delete)

1. Delete `src/temp/` directory entirely
2. Delete `src/pages/Admin/Admin.tsx`
3. Delete `src/pages/Error/QuickErrorTest.tsx`
4. Delete all empty directories listed above
5. Delete `src/assets/react.svg` and empty `src/assets/index.ts`

### Medium Priority (Review Before Deleting)

1. Review and potentially remove unused hooks if not needed for future features
2. Review and potentially remove unused utility functions
3. Review and potentially remove unused components
4. Remove unused dependencies: `react-toastify`, `@tanstack/react-query`, `@tanstack/react-query-devtools`

### Low Priority (Keep for Now)

1. Documentation files - Keep if they serve as reference
2. Empty directory structure - Keep if planning to add files there soon

## ⚠️ Notes

- Some unused code might be planned for future features
- Some empty directories might be placeholders for future structure
- Always test thoroughly after removing code
- Consider using tools like `depcheck` or `unimported` to verify dependencies
