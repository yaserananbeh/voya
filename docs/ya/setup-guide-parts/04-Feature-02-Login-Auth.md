# Feature 2: Login & Authentication

> **TRUE Incremental Development**: Build the Login page one component at a time, adding translations, types, and API as you go.

**Navigation**: [← Back to Index](00-README.md) | [← Previous: Feature 1](03-Feature-01-Home-Page.md) | [Next: Feature 3 →](05-Feature-03-Search-Results.md)

---

## 13. Feature 2: Login & Authentication

> **TRUE Incremental Development**: Build the Login feature one component at a time, adding translations, types, and API as you go. **NOT all at once!**

### 🎯 The Incremental Development Pattern

**How Real Developers Build Login Feature**:

1. **Create minimal Login page** (placeholder)
2. **Add route** → Test it works
3. **Build LoginForm component** (minimal - just fields):
   - Create form with username/password fields
   - Add ONLY the translations for form labels
   - Test
4. **Add form submission** (without API yet):
   - Add submit handler
   - Add validation
   - Add validation error translations
   - Test
5. **Add Auth API endpoint**:
   - Create login endpoint
   - Add Auth types (LoginRequestDto, LoginResponseDto)
   - Test API call
6. **Enhance LoginForm to use API**:
   - Connect form to API
   - Add loading state
   - Add success/error handling
   - Add success/error translations
   - Test
7. **Add Auth slice** (when form needs to store token):
   - Create authSlice
   - Store token after successful login
   - Test
8. **Add ProtectedRoute** (when you need to protect routes):
   - Create ProtectedRoute component
   - Test
9. **Add RedirectIfAuthenticated** (when login page needs it):
   - Create component
   - Wrap login route
   - Test
10. **Add useAuth hook** (when components need auth state):
    - Create hook
    - Test

**Key Principle**: Each piece is built, tested, and has its dependencies added **only when that piece needs them**.

### What We'll Build (Incrementally)

- ✅ Login page component (minimal → full)
- ✅ LoginForm component (minimal → with API → with auth slice)
- ✅ Auth API endpoint (only when form needs it)
- ✅ Auth types (only when API needs them)
- ✅ Auth translations (added incrementally as form needs them)
- ✅ Auth slice (only when form needs to store token)
- ✅ ProtectedRoute (only when routes need protection)
- ✅ RedirectIfAuthenticated (only when login page needs it)
- ✅ useAuth hook (only when components need auth state)

Let's start building incrementally!

### 13.1 Step 1: Create Minimal Login Page

Start with the absolute minimum - just a placeholder page:

**src/pages/Login/Login.tsx**:

```typescript
import { Container, Typography } from '@mui/material'

export default function Login() {
  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Typography variant="h4">Login Page</Typography>
      <Typography variant="body1">We'll build the form incrementally</Typography>
    </Container>
  )
}
```

**src/pages/Login/index.ts**:

```typescript
export { default } from './Login'
```

### 13.2 Step 2: Add Login Route

Update `src/routes/routes.tsx`:

```typescript
import { createBrowserRouter, Navigate } from 'react-router-dom'
import MainLayout from '@/layouts/MainLayout'
import Home from '@/pages/Home'
import Login from '@/pages/Login'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Navigate to="/home" replace /> },
      { path: 'home', element: <Home /> },
      { path: 'login', element: <Login /> },
    ],
  },
])
```

**Test**: `pnpm dev` → Navigate to `/login` → Should see "Login Page" text.

### 13.3 Step 3: Build LoginForm Component (Minimal)

Now let's add the form component. We'll start minimal - just the fields, then add functionality incrementally.

**Create LoginForm component** (minimal - just fields):

**src/pages/Login/LoginForm.tsx**:

```typescript
import { useState } from 'react'
import { Button, TextField, Box } from '@mui/material'
import { useTranslation } from 'react-i18next'

export function LoginForm() {
  const { t } = useTranslation()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', { username, password })
    // We'll add API call later
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <TextField
        label={t('auth.username')}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        fullWidth
        required
        sx={{ mb: 2 }}
      />
      <TextField
        label={t('auth.password')}
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        required
        sx={{ mb: 2 }}
      />
      <Button type="submit" variant="contained" fullWidth>
        {t('auth.loginButton', 'Login')}
      </Button>
    </Box>
  )
}
```

**Update Login page to use LoginForm**:

**src/pages/Login/Login.tsx**:

```typescript
import { Container, Typography, Box } from '@mui/material'
import { LoginForm } from './LoginForm'
import { useTranslation } from 'react-i18next'

export default function Login() {
  const { t } = useTranslation()

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          {t('auth.loginTitle')}
        </Typography>
      </Box>
      <LoginForm />
    </Container>
  )
}
```

**Add ONLY form translations** (incremental):

**Update `src/i18n/locales/en.json`** (add only these keys):

```json
{
  "auth": {
    "loginTitle": "Login to Voya",
    "username": "Username",
    "password": "Password",
    "loginButton": "Login"
  }
}
```

**Update `src/i18n/locales/ar.json`** (add only these keys):

```json
{
  "auth": {
    "loginTitle": "تسجيل الدخول إلى Voya",
    "username": "اسم المستخدم",
    "password": "كلمة المرور",
    "loginButton": "تسجيل الدخول"
  }
}
```

**Test**: Refresh page → Should see login form with translated labels → Submit form → Check console for log.

**✅ Step 3 Complete**: LoginForm is working with translations!

### 13.4 Step 4: Add Form Validation

Now let's add validation to the form:

**Update LoginForm** (add validation):

**src/pages/Login/LoginForm.tsx**:

```typescript
import { useState } from 'react'
import { Button, TextField, Box, Alert } from '@mui/material'
import { useTranslation } from 'react-i18next'

export function LoginForm() {
  const { t } = useTranslation()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({})

  const validate = () => {
    const newErrors: { username?: string; password?: string } = {}
    if (!username.trim()) {
      newErrors.username = t('auth.usernameRequired')
    }
    if (!password.trim()) {
      newErrors.password = t('auth.passwordRequired')
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) {
      console.log('Form submitted:', { username, password })
      // We'll add API call later
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <TextField
        label={t('auth.username')}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        fullWidth
        required
        error={!!errors.username}
        helperText={errors.username}
        sx={{ mb: 2 }}
      />
      <TextField
        label={t('auth.password')}
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        required
        error={!!errors.password}
        helperText={errors.password}
        sx={{ mb: 2 }}
      />
      <Button type="submit" variant="contained" fullWidth>
        {t('auth.loginButton')}
      </Button>
    </Box>
  )
}
```

**Add ONLY validation translations** (incremental):

**Update `src/i18n/locales/en.json`**:

```json
{
  "auth": {
    "loginTitle": "Login to Voya",
    "username": "Username",
    "password": "Password",
    "loginButton": "Login",
    "usernameRequired": "Username is required",
    "passwordRequired": "Password is required"
  }
}
```

**Update `src/i18n/locales/ar.json`**:

```json
{
  "auth": {
    "loginTitle": "تسجيل الدخول إلى Voya",
    "username": "اسم المستخدم",
    "password": "كلمة المرور",
    "loginButton": "تسجيل الدخول",
    "usernameRequired": "اسم المستخدم مطلوب",
    "passwordRequired": "كلمة المرور مطلوبة"
  }
}
```

**Test**: Refresh → Try submitting empty form → Should see validation errors → Fill form → Submit → Should see console log.

**✅ Step 4 Complete**: Form validation is working!

### 13.5 Step 5: Add Auth API Endpoint

Now let's add the API endpoint. The form needs to call the login API.

**Create Auth API** (minimal - just login endpoint):

**src/api/auth/index.ts**:

```typescript
import { baseApi } from '@/api/baseApi'

// Types for Auth API (we'll add these to types/models.ts next)
export type LoginRequestDto = {
  userName: string
  password: string
}

export type LoginResponseDto = {
  authentication: string
  userType: 'Admin' | 'User'
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponseDto, LoginRequestDto>({
      query: (credentials) => ({
        url: 'auth/authenticate',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Auth'],
    }),
  }),
})

export const { useLoginMutation } = authApi
```

**Update baseApi tagTypes**:

**src/api/baseApi.ts**:

```typescript
tagTypes: ['Auth', 'Home'], // Added Auth tag
```

**Add Auth types** (incremental):

**Update `src/types/models.ts`** (add only these types):

```typescript
// ... existing types ...

export type UserType = 'Admin' | 'User'

export interface LoginRequestDto {
  userName: string
  password: string
}

export interface LoginResponseDto {
  authentication: string
  userType: UserType
}
```

**Test**: Check that API file compiles (no TypeScript errors).

**✅ Step 5 Complete**: Auth API endpoint is ready!

### 13.6 Step 6: Enhance LoginForm to Use API

Now let's connect the form to the API:

**Update LoginForm** (use API):

**src/pages/Login/LoginForm.tsx**:

```typescript
import { useState } from 'react'
import { Button, TextField, Box, Alert } from '@mui/material'
import { useLoginMutation } from '@/api/auth'
import { useTranslation } from 'react-i18next'
import type { LoginRequestDto } from '@/api/auth'

export function LoginForm() {
  const { t } = useTranslation()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({})
  const [login, { isLoading, error }] = useLoginMutation()

  const validate = () => {
    const newErrors: { username?: string; password?: string } = {}
    if (!username.trim()) {
      newErrors.username = t('auth.usernameRequired')
    }
    if (!password.trim()) {
      newErrors.password = t('auth.passwordRequired')
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    try {
      const result = await login({ userName: username, password } as LoginRequestDto).unwrap()
      console.log('Login successful:', result)
      // We'll add token storage next
    } catch (err) {
      console.error('Login failed:', err)
      // Error is handled by RTK Query
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {t('auth.loginFailed')}
        </Alert>
      )}
      <TextField
        label={t('auth.username')}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        fullWidth
        required
        error={!!errors.username}
        helperText={errors.username}
        disabled={isLoading}
        sx={{ mb: 2 }}
      />
      <TextField
        label={t('auth.password')}
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        required
        error={!!errors.password}
        helperText={errors.password}
        disabled={isLoading}
        sx={{ mb: 2 }}
      />
      <Button type="submit" variant="contained" fullWidth disabled={isLoading}>
        {isLoading ? t('common.loading', 'Loading...') : t('auth.loginButton')}
      </Button>
    </Box>
  )
}
```

**Add ONLY error/loading translations** (incremental):

**Update `src/i18n/locales/en.json`**:

```json
{
  "auth": {
    "loginTitle": "Login to Voya",
    "username": "Username",
    "password": "Password",
    "loginButton": "Login",
    "usernameRequired": "Username is required",
    "passwordRequired": "Password is required",
    "loginFailed": "Login failed. Please check your credentials."
  },
  "common": {
    "loading": "Loading..."
  }
}
```

**Update `src/i18n/locales/ar.json`**:

```json
{
  "auth": {
    "loginTitle": "تسجيل الدخول إلى Voya",
    "username": "اسم المستخدم",
    "password": "كلمة المرور",
    "loginButton": "تسجيل الدخول",
    "usernameRequired": "اسم المستخدم مطلوب",
    "passwordRequired": "كلمة المرور مطلوبة",
    "loginFailed": "فشل تسجيل الدخول. يرجى التحقق من بيانات الاعتماد."
  },
  "common": {
    "loading": "جاري التحميل..."
  }
}
```

**Test**: Refresh → Fill form → Submit → Should see loading state → Then success/error → Check console for result.

**✅ Step 6 Complete**: LoginForm is connected to API!

### 13.7 Step 7: Add Auth Slice (When Form Needs to Store Token)

Now that the form can login, we need to store the token. That's when we create the Auth slice.

**Create Auth Slice** (needed to store token):

**src/store/authSlice.ts**:

```typescript
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
  token: string | null
  userType: string | null
}

const initialState: AuthState = {
  token: localStorage.getItem('token'),
  userType: localStorage.getItem('userType'),
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ token: string; userType: string }>) => {
      state.token = action.payload.token
      state.userType = action.payload.userType
      localStorage.setItem('token', action.payload.token)
      localStorage.setItem('userType', action.payload.userType)
    },
    logout: (state) => {
      state.token = null
      state.userType = null
      localStorage.removeItem('token')
      localStorage.removeItem('userType')
    },
  },
})

export const { setCredentials, logout } = authSlice.actions

interface RootStatePartial {
  auth: AuthState
}

export const selectToken = (state: RootStatePartial): string | null => state?.auth?.token
export const selectUserType = (state: RootStatePartial): string | null =>
  state?.auth?.userType ?? null
export const selectIsAuthenticated = (state: RootStatePartial): boolean =>
  Boolean(state?.auth?.token)
export const selectIsAdmin = (state: RootStatePartial): boolean => state?.auth?.userType === 'Admin'

export const authReducer = authSlice.reducer
```

**Update store to include authReducer**:

**Update `src/store/index.ts`**:

```typescript
import { configureStore } from '@reduxjs/toolkit'
import { baseApi } from '@/api/baseApi'
import { authReducer } from './authSlice'
import { searchReducer } from './searchSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    search: searchReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
```

**Update LoginForm to use Auth Slice** (store token after login):

**Update `src/pages/Login/LoginForm.tsx`**:

```typescript
// ... existing imports ...
import { setCredentials } from '@/store/authSlice'
import { useAppDispatch } from '@/hooks'
import { useNavigate, useLocation } from 'react-router-dom'
import { useSnackbar } from 'notistack'

export function LoginForm() {
  // ... existing code ...
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const { enqueueSnackbar } = useSnackbar()

  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/home'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    try {
      const result = await login({ userName: username, password } as LoginRequestDto).unwrap()
      dispatch(setCredentials({ token: result.authentication, userType: result.userType }))
      enqueueSnackbar(t('auth.loginSuccess'), { variant: 'success' })
      navigate(from, { replace: true })
    } catch (err) {
      // Error is handled by RTK Query
    }
  }

  // ... rest of component ...
}
```

**Add success translation** (incremental):

**Update `src/i18n/locales/en.json`**:

```json
{
  "auth": {
    // ... existing keys ...
    "loginSuccess": "Login successful!"
  }
}
```

**Update `src/i18n/locales/ar.json`**:

```json
{
  "auth": {
    // ... existing keys ...
    "loginSuccess": "تم تسجيل الدخول بنجاح!"
  }
}
```

**Test**: Refresh → Login → Should store token → Should redirect to home → Check localStorage for token.

**✅ Step 7 Complete**: Auth slice is storing token after login!

### 13.8 Step 8: Add ProtectedRoute (When Routes Need Protection)

Now that we can login, we might want to protect certain routes. That's when we create ProtectedRoute.

**Create ProtectedRoute component**:

**src/components/auth/ProtectedRoute.tsx**:

```typescript
import { Navigate, useLocation } from 'react-router-dom'
import type { ReactElement } from 'react'

interface Props {
  children: ReactElement
}

export default function ProtectedRoute({ children }: Props): ReactElement {
  const token = localStorage.getItem('token')
  const location = useLocation()

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}
```

**src/components/auth/index.ts**:

```typescript
export { default as ProtectedRoute } from './ProtectedRoute'
```

**Test**: Wrap a route with ProtectedRoute → Try accessing without token → Should redirect to login.

**✅ Step 8 Complete**: ProtectedRoute is working!

### 13.9 Step 9: Add RedirectIfAuthenticated (When Login Page Needs It)

When a logged-in user tries to access the login page, we should redirect them. That's when we create RedirectIfAuthenticated.

**Create RedirectIfAuthenticated component**:

**src/components/auth/RedirectIfAuthenticated.tsx**:

```typescript
import { Navigate } from 'react-router-dom'
import type { ReactElement } from 'react'
import { useAppSelector } from '@/hooks'
import { selectIsAuthenticated } from '@/store/authSlice'

interface Props {
  children: ReactElement
}

export default function RedirectIfAuthenticated({ children }: Props): ReactElement {
  const isAuthenticated = useAppSelector(selectIsAuthenticated)

  if (isAuthenticated) {
    return <Navigate to="/home" replace />
  }

  return children
}
```

**Update auth components index**:

**src/components/auth/index.ts**:

```typescript
export { default as ProtectedRoute } from './ProtectedRoute'
export { default as RedirectIfAuthenticated } from './RedirectIfAuthenticated'
```

**Update Login route to use RedirectIfAuthenticated**:

**Update `src/routes/routes.tsx`**:

```typescript
import { createBrowserRouter, Navigate } from 'react-router-dom'
import MainLayout from '@/layouts/MainLayout'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import { RedirectIfAuthenticated } from '@/components/auth'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Navigate to="/home" replace /> },
      { path: 'home', element: <Home /> },
      {
        path: 'login',
        element: (
          <RedirectIfAuthenticated>
            <Login />
          </RedirectIfAuthenticated>
        ),
      },
    ],
  },
])
```

**Test**: Login → Try accessing `/login` → Should redirect to home.

**✅ Step 9 Complete**: RedirectIfAuthenticated is working!

### 13.10 Step 10: Add useAuth Hook (When Components Need Auth State)

When components need to check auth state or logout, we create the useAuth hook.

**Create useAuth hook**:

**src/hooks/useAuth.ts**:

```typescript
import { useCallback } from 'react'
import { useAppSelector, useAppDispatch } from './index'
import { selectToken, selectUserType, logout as logoutAction } from '@/store/authSlice'
import { useNavigate } from 'react-router-dom'

export function useAuth() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const token = useAppSelector(selectToken)
  const userType = useAppSelector(selectUserType)

  const isAuthenticated = Boolean(token)
  const isAdmin = userType === 'Admin'
  const isUser = userType === 'User'

  const logout = useCallback(() => {
    dispatch(logoutAction())
    localStorage.removeItem('token')
    localStorage.removeItem('userType')
    void navigate('/login', { replace: true })
  }, [dispatch, navigate])

  return {
    isAuthenticated,
    isAdmin,
    isUser,
    token,
    userType,
    logout,
  }
}
```

**Update hooks index**:

**src/hooks/index.ts**:

```typescript
import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux'
import type { RootState, AppDispatch } from '@/store'

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export * from './useAuth'
```

**Test**: Use `useAuth()` in a component → Should get auth state → Call `logout()` → Should clear token and redirect.

**✅ Step 10 Complete**: useAuth hook is working!

### 13.11 Step 11: Test Authentication Flow

**Verification Checklist**:

1. ✅ **Navigate to `/login`**: Should see login form
2. ✅ **Try logging in with invalid credentials**: Should show error message
3. ✅ **Login with valid credentials**: Should redirect to `/home` (or previous page)
4. ✅ **Check localStorage**: Should have `token` and `userType` stored
5. ✅ **Try accessing login when authenticated**: Should redirect to home
6. ✅ **Logout**: Should clear token and redirect to login
7. ✅ **Try accessing protected route**: Should work if authenticated

**Common Issues**:

- **API errors**: Check backend is running and `VITE_API_BASE_URL` is correct
- **Token not persisting**: Check localStorage is working
- **Redirect not working**: Check route configuration

---

## ✅ Feature 2 Complete: Login & Authentication

You've built the Login feature **incrementally**:

- ✅ Created minimal Login page
- ✅ Added LoginForm → Added form translations → Tested
- ✅ Added validation → Added validation translations → Tested
- ✅ Added Auth API → Added Auth types → Tested
- ✅ Enhanced LoginForm to use API → Added error translations → Tested
- ✅ Added Auth slice → Store token after login → Tested
- ✅ Added ProtectedRoute (when needed)
- ✅ Added RedirectIfAuthenticated (when needed)
- ✅ Added useAuth hook (when needed)

**Key Learning**: Each piece was built, tested, and had its dependencies added **only when needed**. This is realistic development!

**Next**: Move to [Feature 3: Search Results Page](#14-feature-3-search-results-page)

---

> **⚠️ OLD APPROACH - DO NOT FOLLOW**: The sections below show the OLD approach where everything is created at once. They are kept for reference only. **DO NOT follow them**.

### 13.2 OLD APPROACH: Create Auth API Endpoints (Reference Only - DO NOT FOLLOW)

**src/api/auth/index.ts**:

```typescript
import { baseApi } from '@/api/baseApi'
import type { LoginRequestDto, LoginResponseDto } from '@/types'

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponseDto, LoginRequestDto>({
      query: (credentials) => ({
        url: 'auth/authenticate',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Auth'],
    }),
  }),
})

export const { useLoginMutation } = authApi
```

**Update baseApi tagTypes** (if not already done):

Update `src/api/baseApi.ts`:

```typescript
tagTypes: ['Auth', 'Home'], // Make sure Auth is included
```

### 13.3 Step 3: Add Auth Types

Add Auth types to `src/types/models.ts` (if not already added):

```typescript
export type UserType = 'Admin' | 'User'

export interface LoginRequestDto {
  userName: string
  password: string
}

export interface LoginResponseDto {
  authentication: string
  userType: UserType
}
```

### 13.4 Step 4: Add Auth Translations

Add Auth translations to `en.json` and `ar.json`:

**Add to `src/i18n/locales/en.json`**:

```json
{
  "auth": {
    "loginTitle": "Login to Voya",
    "username": "Username",
    "password": "Password",
    "usernameRequired": "Username is required",
    "passwordRequired": "Password is required",
    "loginSuccess": "Login successful!",
    "loginFailed": "Login failed. Please check your credentials."
  }
}
```

**Add to `src/i18n/locales/ar.json`**:

```json
{
  "auth": {
    "loginTitle": "تسجيل الدخول إلى Voya",
    "username": "اسم المستخدم",
    "password": "كلمة المرور",
    "usernameRequired": "اسم المستخدم مطلوب",
    "passwordRequired": "كلمة المرور مطلوبة",
    "loginSuccess": "تم تسجيل الدخول بنجاح!",
    "loginFailed": "فشل تسجيل الدخول. يرجى التحقق من بيانات الاعتماد."
  }
}
```

### 13.5 Step 5: Create Login Page Component

**src/pages/Login/Login.tsx**:

```typescript
import { Container, Typography, Box } from '@mui/material'
import { LoginForm } from './LoginForm'
import { useTranslation } from 'react-i18next'

export default function Login() {
  const { t } = useTranslation()

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          {t('auth.loginTitle')}
        </Typography>
      </Box>
      <LoginForm />
    </Container>
  )
}
```

**src/pages/Login/index.ts**:

```typescript
export { default } from './Login'
```

### 13.6 Step 6: Create Login Form Component

**src/pages/Login/LoginForm.tsx**:

```typescript
import { useState } from 'react'
import { Button, TextField, Box, Alert } from '@mui/material'
import { useLoginMutation } from '@/api/auth'
import { setCredentials } from '@/store/authSlice'
import { useAppDispatch } from '@/hooks'
import { useNavigate, useLocation } from 'react-router-dom'
import type { LoginRequestDto } from '@/types'
import { useTranslation } from 'react-i18next'
import { useSnackbar } from 'notistack'

export function LoginForm() {
  const { t } = useTranslation()
  const { enqueueSnackbar } = useSnackbar()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [login, { isLoading, error }] = useLoginMutation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/home'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const result = await login({ userName: username, password } as LoginRequestDto).unwrap()
      dispatch(setCredentials({ token: result.authentication, userType: result.userType }))
      enqueueSnackbar(t('auth.loginSuccess'), { variant: 'success' })
      navigate(from, { replace: true })
    } catch (err) {
      enqueueSnackbar(t('auth.loginFailed'), { variant: 'error' })
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {t('auth.loginFailed')}
        </Alert>
      )}
      <TextField
        label={t('auth.username')}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        fullWidth
        required
        sx={{ mb: 2 }}
        autoComplete="username"
      />
      <TextField
        label={t('auth.password')}
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        required
        sx={{ mb: 2 }}
        autoComplete="current-password"
      />
      <Button type="submit" variant="contained" fullWidth disabled={isLoading}>
        {isLoading ? t('common.loading') : t('common.login')}
      </Button>
    </Box>
  )
}
```

### 13.7 Step 7: Create Auth Components

#### 7.1 ProtectedRoute Component

**src/components/auth/ProtectedRoute.tsx**:

```typescript
import { Navigate, useLocation } from 'react-router-dom'
import type { ReactElement } from 'react'

interface Props {
  children: ReactElement
}

export default function ProtectedRoute({ children }: Props): ReactElement {
  const token = localStorage.getItem('token')
  const location = useLocation()

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}
```

#### 7.2 AdminRoute Component

**src/components/auth/AdminRoute.tsx**:

```typescript
import { Navigate } from 'react-router-dom'
import type { ReactElement } from 'react'
import { useAppSelector } from '@/hooks'
import { selectUserType } from '@/store/authSlice'

interface Props {
  children: ReactElement
}

export default function AdminRoute({ children }: Props): ReactElement {
  const userType = useAppSelector(selectUserType)

  if (userType !== 'Admin') {
    return <Navigate to="/home" replace />
  }

  return children
}
```

#### 7.3 RedirectIfAuthenticated Component

**src/components/auth/RedirectIfAuthenticated.tsx**:

```typescript
import { Navigate } from 'react-router-dom'
import type { ReactElement } from 'react'
import { useAppSelector } from '@/hooks'
import { selectIsAuthenticated } from '@/store/authSlice'

interface Props {
  children: ReactElement
}

export default function RedirectIfAuthenticated({ children }: Props): ReactElement {
  const isAuthenticated = useAppSelector(selectIsAuthenticated)

  if (isAuthenticated) {
    return <Navigate to="/home" replace />
  }

  return children
}
```

**Update auth components index.ts**:

**src/components/auth/index.ts**:

```typescript
export { default as ProtectedRoute } from './ProtectedRoute'
export { default as AdminRoute } from './AdminRoute'
export { default as RedirectIfAuthenticated } from './RedirectIfAuthenticated'
```

**Update main components index.ts**:

**src/components/index.ts**:

```typescript
// Common components
export * from './common'

// Layout components
export * from './layout'

// Auth components
export * from './auth'
```

### 13.8 Step 8: Create useAuth Hook

**src/hooks/useAuth.ts**:

```typescript
import { useCallback } from 'react'
import { useAppSelector, useAppDispatch } from './index'
import { selectToken, selectUserType, logout as logoutAction } from '@/store/authSlice'
import { useNavigate } from 'react-router-dom'

export function useAuth() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const token = useAppSelector(selectToken)
  const userType = useAppSelector(selectUserType)

  const isAuthenticated = Boolean(token)
  const isAdmin = userType === 'Admin'
  const isUser = userType === 'User'

  const logout = useCallback(() => {
    dispatch(logoutAction())
    localStorage.removeItem('token')
    localStorage.removeItem('userType')
    void navigate('/login', { replace: true })
  }, [dispatch, navigate])

  return {
    isAuthenticated,
    isAdmin,
    isUser,
    token,
    userType,
    logout,
  }
}
```

**Update hooks index.ts**:

**src/hooks/index.ts**:

```typescript
import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux'
import type { RootState, AppDispatch } from '@/store'

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export * from './useAuth'
```

### 13.9 Step 9: Add Login Route

Update `src/routes/routes.tsx` to include the Login route:

```typescript
import { createBrowserRouter, Navigate } from 'react-router-dom'
import MainLayout from '@/layouts/MainLayout'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import { RedirectIfAuthenticated } from '@/components/auth'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Navigate to="/home" replace /> },
      { path: 'home', element: <Home /> },
      {
        path: 'login',
        element: (
          <RedirectIfAuthenticated>
            <Login />
          </RedirectIfAuthenticated>
        ),
      },
    ],
  },
])
```

### 13.10 Step 10: Test Authentication Flow

**Verification Checklist**:

1. ✅ **Navigate to `/login`**: Should see login form
2. ✅ **Try logging in with invalid credentials**: Should show error message
3. ✅ **Login with valid credentials**: Should redirect to `/home` (or previous page)
4. ✅ **Check localStorage**: Should have `token` and `userType` stored
5. ✅ **Try accessing protected route**: Should work if authenticated
6. ✅ **Logout**: Should clear token and redirect to login
7. ✅ **Try accessing login when authenticated**: Should redirect to home

**Common Issues**:

- **API errors**: Check backend is running and `VITE_API_BASE_URL` is correct
- **Token not persisting**: Check localStorage is working
- **Redirect not working**: Check route configuration

---

## ✅ Feature 2 Complete: Login & Authentication

Congratulations! You've built the complete Login & Authentication feature with:

- ✅ Login page component
- ✅ Auth API endpoints
- ✅ Auth slice
- ✅ Auth types
- ✅ Auth translations
- ✅ Auth components (ProtectedRoute, AdminRoute, RedirectIfAuthenticated)
- ✅ useAuth hook
- ✅ Login route with protection

**Next**: Move to [Feature 3: Search Results Page](#14-feature-3-search-results-page)

---
