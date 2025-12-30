# Foundation: Common Setup

> **Common to all React/TypeScript projects** - Prerequisites, Initial Project Setup, Configuration Files

This section covers setup steps that are common to most React/TypeScript projects using Vite.

**Navigation**: [← Back to Index](00-README.md) | [Next: Voya-Specific Setup →](02-Foundation-Voya-Specific.md)

---

## 1. Prerequisites

### 1.1 Install Required Software

```bash
# Node.js (v18 or higher)
# Download from: https://nodejs.org/

# PNPM (recommended) or npm
npm install -g pnpm

# Git
# Download from: https://git-scm.com/

# Verify installations
node --version  # Should be v18+
pnpm --version  # Should be 8.0+
git --version   # Any recent version
```

### 1.2 Create Local Project Directory

```bash
# Create project directory
mkdir voya
cd voya

# Initialize git repository (optional, but recommended)
git init
```

---

## 2. Initial Project Setup

> **Important**: Follow these steps in order. Each step builds on the previous one. Copy and paste the commands exactly as shown.
>
> **Note on Gradual Development**: This guide follows a gradual development approach. You'll encounter TypeScript errors as you build because some files reference others that haven't been created yet. This is **expected and normal**. The errors will resolve as you complete each section. For example:
>
> - `ErrorBoundary` references `logger` before it's created (Section 15)
> - Routes reference pages before they're created (Section 12)
> - Components reference types before they're defined (Section 10.4)
>
> **Don't worry about these errors** - they're part of the incremental development process!

### 2.1 Create Vite React Project

**Step 1**: Use Vite CLI to scaffold React + TypeScript project

```bash
# Make sure you're in the voya directory
cd voya

# Use Vite CLI to scaffold React + TypeScript project
# The dot (.) means create files in current directory
pnpm create vite@latest . --template react-ts

# Or if you prefer npm:
# npm create vite@latest . --template react-ts
```

**What this does**: The `create vite` command will:

- Create `package.json` with proper scripts
- Set up TypeScript configuration files (`tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`)
- Create `vite.config.ts`
- Set up basic React structure with `src/main.tsx` and `src/App.tsx`
- Create `index.html` entry point
- Create `src/vite-env.d.ts` for Vite types

**Step 2**: Install initial dependencies

```bash
# Install all dependencies from package.json
pnpm install
```

**Step 3**: Verify the project was created correctly

```bash
# Check that key files exist
ls -la src/
ls -la index.html
ls -la vite.config.ts
```

You should see files like `src/main.tsx`, `src/App.tsx`, `src/App.css`, `src/index.css`, `src/vite-env.d.ts`, etc.

**Step 4**: Verify TypeScript configuration includes Vite types

```bash
# Check that tsconfig.app.json includes vite/client types
grep -q "vite/client" tsconfig.app.json && echo "✓ Vite types configured in tsconfig" || echo "⚠ Check tsconfig.app.json"
```

**Note**: The `vite-env.d.ts` file is optional. Your `tsconfig.app.json` should have `"types": ["vite/client"]` which provides the same type definitions. Vite may or may not create this file automatically - both are fine.

### 2.2 Clean Up Default Vite Template Files

**Step 1**: Remove default CSS files (we'll use our own reset.css and MUI)

```bash
# Remove the default App.css file
rm src/App.css

# Remove the default index.css file
rm src/index.css
```

**Step 2**: Verify files were removed

```bash
# Check that files are gone
ls src/*.css
# Should return: No such file or directory (or empty)
```

### 2.3 Update React and TypeScript Versions (Optional but Recommended)

**Step 1**: Update to specific versions if needed

```bash
# Update React and React-DOM to version 19.2.0
pnpm add react@^19.2.0 react-dom@^19.2.0

# Update TypeScript types
pnpm add -D @types/react@^19.2.5 @types/react-dom@^19.2.3

# Update TypeScript compiler
pnpm add -D typescript@~5.9.3

# Update Vite and React plugin
pnpm add -D vite@^7.2.4 @vitejs/plugin-react@^5.1.1
```

**Note**: If you're happy with the versions that Vite installed, you can skip this step.

### 2.4 Install Core Dependencies

**Step 1**: Install React Router

```bash
# Install React Router for navigation
pnpm add react-router-dom@^7.9.6
```

**Step 2**: Verify installation

```bash
# Check package.json to confirm it was added
cat package.json | grep react-router-dom
```

### 2.5 Install UI Dependencies

**Step 1**: Install Material-UI core packages

```bash
# Install Material-UI core and icons
pnpm add @mui/material@^7.3.5 @mui/icons-material@^7.3.5

# Install Emotion (required peer dependency for MUI)
pnpm add @emotion/react@^11.14.0 @emotion/styled@^11.14.1
```

**Step 2**: Install MUI X Components (Data Grid and Date Pickers)

```bash
# Install MUI X components
pnpm add @mui/x-data-grid@^8.19.0 @mui/x-date-pickers@^8.19.0
```

**Step 3**: Verify installation

```bash
# Check that MUI packages are in package.json
cat package.json | grep "@mui"
```

### 2.6 Install State Management

**Step 1**: Install Redux Toolkit and React-Redux

```bash
# Install Redux Toolkit for state management
pnpm add @reduxjs/toolkit@^2.11.1 react-redux@^9.2.0
```

**Step 2**: Verify installation

```bash
# Check package.json
cat package.json | grep redux
```

### 2.7 Install Form Handling

**Step 1**: Install Formik and Yup

```bash
# Install Formik for form management and Yup for validation
pnpm add formik@^2.4.9 yup@^1.7.1
```

**Step 2**: Verify installation

```bash
# Check package.json
cat package.json | grep -E "formik|yup"
```

### 2.8 Install Internationalization

**Step 1**: Install i18next packages

```bash
# Install i18next for internationalization
pnpm add i18next@^25.7.3 react-i18next@^16.5.0 i18next-browser-languagedetector@^8.2.0
```

**Step 2**: Verify installation

```bash
# Check package.json
cat package.json | grep i18next
```

### 2.9 Install Additional Libraries

**Step 1**: Install utility libraries

```bash
# Install date-fns for date manipulation and axios for HTTP requests
pnpm add date-fns@^4.1.0 axios@^1.13.2
```

**Step 2**: Install map libraries

```bash
# Install Leaflet for maps
pnpm add leaflet@^1.9.4 react-leaflet@^5.0.0

# Install TypeScript types for Leaflet
pnpm add -D @types/leaflet@^1.9.21
```

**Step 3**: Install image gallery

```bash
# Install react-image-gallery
pnpm add react-image-gallery@^1.4.0

# Install TypeScript types
pnpm add -D @types/react-image-gallery@^1.2.4
```

**Step 4**: Install notification libraries

```bash
# Install notification libraries
pnpm add notistack@^3.0.2 react-toastify@^11.0.5
```

**Step 5**: Verify all installations

```bash
# Check that all packages are installed
cat package.json | grep -E "date-fns|axios|leaflet|react-image-gallery|notistack|react-toastify"
```

### 2.10 Install Dev Dependencies

**Step 1**: Install testing libraries

```bash
# Install Vitest and Testing Library
pnpm add -D vitest@^4.0.13 @testing-library/react@^16.3.0 @testing-library/jest-dom@^6.9.1 @testing-library/user-event@^14.6.1 jsdom@^27.2.0 msw@^2.12.4
```

**Step 2**: Install linting and formatting tools

```bash
# Install ESLint core and TypeScript ESLint
pnpm add -D eslint@^9.39.1 @eslint/js@^9.39.1 @typescript-eslint/eslint-plugin@^8.47.0 @typescript-eslint/parser@^8.47.0 typescript-eslint@^8.46.4

# Install ESLint plugins and Prettier
pnpm add -D eslint-config-prettier@^10.1.8 eslint-plugin-react-hooks@^7.0.1 eslint-plugin-react-refresh@^0.4.24
pnpm add -D prettier@^3.6.2
```

**Note**: `@eslint/js` is required for the ESLint flat config format used in `eslint.config.js`.

**Step 3**: Install Git hooks

```bash
# Install Husky and lint-staged for Git hooks
pnpm add -D husky@^9.1.7 lint-staged@^16.2.7
```

**Step 4**: Install React Compiler

```bash
# Install Babel plugin for React Compiler
pnpm add -D babel-plugin-react-compiler@^1.0.0
```

**Step 5**: Install additional dev dependencies

```bash
# Install additional TypeScript types and tools
pnpm add -D @types/node@^24.10.1 globals@^16.5.0 openapi-typescript@^7.10.1
```

**Step 6**: Verify all dev dependencies

```bash
# Check devDependencies section
cat package.json | grep -A 20 '"devDependencies"'
```

### 2.11 Verify All Dependencies

**Step 1**: Run a final check

```bash
# Verify all packages are installed correctly
pnpm install

# Check for any missing peer dependencies
pnpm list --depth=0
```

**Step 2**: Test that the dev server still works

```bash
# Start the dev server to make sure everything is working
pnpm dev
```

**Note**: Press `Ctrl+C` to stop the dev server after verifying it starts without errors.

### 2.12 Complete Verification Checklist

**Before proceeding to Section 3, run these verification commands to ensure everything is set up correctly:**

**Step 1**: Verify Vite project files exist

```bash
# Check core Vite files
echo "=== Checking Vite files ==="
ls -la index.html && echo "✓ index.html exists"
ls -la vite.config.ts && echo "✓ vite.config.ts exists"
ls -la tsconfig.json && echo "✓ tsconfig.json exists"
ls -la tsconfig.app.json && echo "✓ tsconfig.app.json exists"
ls -la tsconfig.node.json && echo "✓ tsconfig.node.json exists"
ls -la src/main.tsx && echo "✓ src/main.tsx exists"
ls -la src/App.tsx && echo "✓ src/App.tsx exists"
ls -la src/vite-env.d.ts && echo "✓ src/vite-env.d.ts exists"
```

**Step 2**: Verify default CSS files were removed

```bash
echo "=== Checking CSS files were removed ==="
if [ ! -f "src/App.css" ] && [ ! -f "src/index.css" ]; then
  echo "✓ Default CSS files removed correctly"
else
  echo "✗ ERROR: Default CSS files still exist!"
  ls -la src/*.css 2>/dev/null || echo "  (No CSS files found - this is correct)"
fi
```

**Step 3**: Verify all production dependencies are installed

```bash
echo "=== Checking production dependencies ==="
REQUIRED_DEPS=(
  "react"
  "react-dom"
  "react-router-dom"
  "@mui/material"
  "@mui/icons-material"
  "@emotion/react"
  "@emotion/styled"
  "@mui/x-data-grid"
  "@mui/x-date-pickers"
  "@reduxjs/toolkit"
  "react-redux"
  "formik"
  "yup"
  "i18next"
  "react-i18next"
  "i18next-browser-languagedetector"
  "date-fns"
  "axios"
  "leaflet"
  "react-leaflet"
  "react-image-gallery"
  "notistack"
  "react-toastify"
)

MISSING=0
for dep in "${REQUIRED_DEPS[@]}"; do
  if pnpm list "$dep" --depth=0 >/dev/null 2>&1; then
    echo "✓ $dep installed"
  else
    echo "✗ $dep MISSING"
    MISSING=$((MISSING + 1))
  fi
done

if [ $MISSING -eq 0 ]; then
  echo "✓ All production dependencies installed"
else
  echo "✗ ERROR: $MISSING dependencies are missing!"
fi
```

**Step 4**: Verify all dev dependencies are installed

```bash
echo "=== Checking dev dependencies ==="
REQUIRED_DEV_DEPS=(
  "typescript"
  "@types/react"
  "@types/react-dom"
  "@types/node"
  "@types/leaflet"
  "@types/react-image-gallery"
  "vite"
  "@vitejs/plugin-react"
  "vitest"
  "@testing-library/react"
  "@testing-library/jest-dom"
  "@testing-library/user-event"
  "jsdom"
  "msw"
  "eslint"
  "@typescript-eslint/eslint-plugin"
  "@typescript-eslint/parser"
  "typescript-eslint"
  "eslint-config-prettier"
  "eslint-plugin-react-hooks"
  "eslint-plugin-react-refresh"
  "prettier"
  "husky"
  "lint-staged"
  "babel-plugin-react-compiler"
  "globals"
  "openapi-typescript"
)

MISSING_DEV=0
for dep in "${REQUIRED_DEV_DEPS[@]}"; do
  if pnpm list "$dep" --depth=0 >/dev/null 2>&1; then
    echo "✓ $dep installed"
  else
    echo "✗ $dep MISSING"
    MISSING_DEV=$((MISSING_DEV + 1))
  fi
done

if [ $MISSING_DEV -eq 0 ]; then
  echo "✓ All dev dependencies installed"
else
  echo "✗ ERROR: $MISSING_DEV dev dependencies are missing!"
fi
```

**Step 5**: Verify package.json structure

```bash
echo "=== Checking package.json structure ==="
if grep -q '"react":' package.json && grep -q '"react-dom":' package.json; then
  echo "✓ React dependencies in package.json"
else
  echo "✗ ERROR: React dependencies missing from package.json"
fi

if grep -q '"@mui/material":' package.json; then
  echo "✓ MUI dependencies in package.json"
else
  echo "✗ ERROR: MUI dependencies missing from package.json"
fi

if grep -q '"@reduxjs/toolkit":' package.json; then
  echo "✓ Redux dependencies in package.json"
else
  echo "✗ ERROR: Redux dependencies missing from package.json"
fi

if grep -q '"scripts"' package.json; then
  echo "✓ Scripts section in package.json"
else
  echo "✗ ERROR: Scripts section missing from package.json"
fi
```

**Step 6**: Verify node_modules exists and is populated

```bash
echo "=== Checking node_modules ==="
if [ -d "node_modules" ]; then
  MODULE_COUNT=$(find node_modules -maxdepth 1 -type d | wc -l)
  echo "✓ node_modules directory exists ($MODULE_COUNT packages)"

  if [ -d "node_modules/react" ] && [ -d "node_modules/@mui" ]; then
    echo "✓ Key packages installed in node_modules"
  else
    echo "✗ ERROR: Key packages missing from node_modules"
  fi
else
  echo "✗ ERROR: node_modules directory not found! Run 'pnpm install'"
fi
```

**Step 7**: Quick TypeScript check

```bash
echo "=== Checking TypeScript configuration ==="
if [ -f "tsconfig.json" ] && [ -f "tsconfig.app.json" ]; then
  echo "✓ TypeScript config files exist"

  # Try to run typecheck (may have errors, but should not crash)
  if pnpm typecheck 2>&1 | head -5; then
    echo "✓ TypeScript can parse configuration"
  else
    echo "⚠ TypeScript check completed (errors expected at this stage)"
  fi
else
  echo "✗ ERROR: TypeScript config files missing"
fi
```

**Step 8**: Verify git repository (if initialized)

```bash
echo "=== Checking git repository ==="
if [ -d ".git" ]; then
  echo "✓ Git repository initialized"
  git status --short || echo "  (Git status check)"
else
  echo "⚠ Git repository not initialized (optional)"
fi
```

**Step 9**: Final summary check

```bash
echo ""
echo "=== FINAL VERIFICATION SUMMARY ==="
echo ""
echo "Run this command to see all installed packages:"
echo "  pnpm list --depth=0"
echo ""
echo "Expected package count: ~50+ packages"
echo ""
echo "If all checks above passed (✓), you're ready for Section 3!"
echo "If any checks failed (✗), review the errors and fix them before proceeding."
```

**Quick One-Line Verification**:

```bash
# Check key files and directories exist
echo "Verifying setup..." && \
[ -f "package.json" ] && [ -f "vite.config.ts" ] && [ -f "src/main.tsx" ] && \
[ ! -f "src/App.css" ] && [ ! -f "src/index.css" ] && \
[ -d "node_modules" ] && \
echo "✓ Basic setup looks good!" || echo "✗ Some files are missing!"
```

**Manual Checklist** (if scripts don't work):

- [ ] `package.json` exists and contains all dependencies from sections 2.3-2.10
- [ ] `vite.config.ts` exists
- [ ] `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json` exist
- [ ] `src/main.tsx` exists
- [ ] `src/App.tsx` exists
- [ ] `src/App.css` does NOT exist (was removed)
- [ ] `src/index.css` does NOT exist (was removed)
- [ ] `node_modules` directory exists
- [ ] `pnpm dev` starts the dev server without errors
- [ ] All packages from sections 2.3-2.10 are listed in `package.json`

**If all verifications pass, you're ready to proceed to Section 3: Configuration Files!**

**What to expect at this stage:**

- ✅ All dependencies installed
- ✅ Vite project structure created
- ✅ Default CSS files removed
- ⚠️ TypeScript errors are normal (we'll fix them as we create files)
- ⚠️ `src/main.tsx` and `src/App.tsx` may have import errors (expected - we'll update them in Section 5)

**Troubleshooting Common Issues:**

1. **Missing `@eslint/js` error**: Make sure you installed it in Section 2.10 Step 2. Run `pnpm add -D @eslint/js@^9.39.1`

2. **Vite dev server won't start**:
   - Check that all dependencies are installed: `pnpm install`
   - Verify Node.js version: `node --version` (should be v18+)
   - Clear cache: `rm -rf node_modules .vite && pnpm install`

3. **TypeScript errors about missing types**: This is expected during gradual development. Types will be created in Section 10.4.

4. **Import path errors with `@/`**: Verify `tsconfig.app.json` has the path alias configured (Section 3.1) and `vite.config.ts` has the resolve alias (Section 3.2).

---

## 3. Configuration Files

### 3.1 TypeScript Configuration

**tsconfig.json** (root):

```json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" },
    { "path": "./tsconfig.test.json" }
  ]
}
```

**tsconfig.app.json**:

```json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "target": "ES2022",
    "useDefineForClassFields": true,
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "types": ["vite/client"],
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"],
  "exclude": ["src/**/*.test.ts", "src/**/*.test.tsx", "src/**/__tests__/*", "src/setupTests.ts"]
}
```

**Note**: `resolveJsonModule: true` is required to properly type JSON imports (e.g., translation files in Section 9). Without it, you'll get TypeScript/ESLint errors about unsafe assignment when importing JSON files.

**tsconfig.node.json**:

```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "types": ["node"]
  },
  "include": ["vite.config.ts"]
}
```

**tsconfig.test.json**:

```json
{
  "extends": "./tsconfig.app.json",
  "compilerOptions": {
    "types": ["vitest/globals", "@testing-library/jest-dom"]
  },
  "include": ["src/**/*.test.ts", "src/**/*.test.tsx", "setupTests.ts"]
}
```

### 3.2 Vite Configuration

**vite.config.ts**:

```typescript
/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'mui-vendor': ['@mui/material', '@mui/icons-material', '@mui/x-data-grid'],
          'redux-vendor': ['@reduxjs/toolkit', 'react-redux'],
          'form-vendor': ['formik', 'yup'],
          'i18n-vendor': ['react-i18next', 'i18next'],
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './setupTests.ts',
    css: false,
  },
})
```

### 3.3 ESLint Configuration

**eslint.config.js**:

```javascript
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import tseslint from 'typescript-eslint'
import prettier from 'eslint-config-prettier'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  {
    ignores: ['dist', 'node_modules', 'vitest.config.ts', 'setupTests.ts'],
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: globals.browser,
      parser: tseslint.parser,
      parserOptions: {
        project: [
          './tsconfig.json',
          './tsconfig.app.json',
          './tsconfig.node.json',
          './tsconfig.test.json',
        ],
        tsconfigRootDir: process.cwd(),
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      'react-hooks': reactHooks,
    },
    extends: [js.configs.recommended, ...tseslint.configs.recommendedTypeChecked, prettier],
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
  {
    files: ['**/*.test.ts', '**/*.test.tsx', '**/__tests__/**/*'],
    rules: {
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
    },
  },
])
```

**Note**: This ESLint configuration uses the flat config format with `defineConfig` helper for better TypeScript support. Make sure `@eslint/js` is installed (Section 2.10 Step 2). The `defineConfig` import from `eslint/config` is provided by ESLint and helps with type checking.

### 3.4 Prettier Configuration

**.prettierrc**:

```json
{
  "singleQuote": true,
  "semi": false,
  "printWidth": 100,
  "tabWidth": 2,
  "trailingComma": "all"
}
```

### 3.5 Environment Variables

**.env.example**:

```env
VITE_API_BASE_URL=https://travel-and-accommodation-booking-static.onrender.com
```

**.env** (create from .env.example):

```env
VITE_API_BASE_URL=https://travel-and-accommodation-booking-static.onrender.com
```

### 3.6 HTML Entry Point

**index.html**:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Voya - Travel & Accommodation Booking</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

### 3.7 Update package.json Scripts

**package.json** (complete scripts section):

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview",
    "format": "prettier . --write",
    "format:check": "prettier . --check",
    "test": "vitest run",
    "test:watch": "vitest",
    "prepare": "husky",
    "gen:api": "openapi-typescript http://localhost:5000/swagger.json -o src/types/api.ts",
    "typecheck": "tsc -p tsconfig.app.json --noEmit",
    "verify": "pnpm typecheck && pnpm lint && pnpm test && pnpm build",
    "verify:stage": "git add . && pnpm verify"
  },
  "lint-staged": {
    "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.{js,jsx,json,md,css}": ["prettier --write"]
  }
}
```

---
