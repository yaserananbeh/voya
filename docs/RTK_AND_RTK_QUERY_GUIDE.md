# Complete Guide to Redux Toolkit (RTK) and RTK Query

## Table of Contents

1. [What is Redux Toolkit (RTK)?](#what-is-redux-toolkit-rtk)
2. [Why RTK Exists](#why-rtk-exists)
3. [Core RTK Concepts](#core-rtk-concepts)
4. [RTK in Your Project](#rtk-in-your-project)
5. [What is RTK Query?](#what-is-rtk-query)
6. [RTK Query Concepts](#rtk-query-concepts)
7. [RTK Query in Your Project](#rtk-query-in-your-project)
8. [Key Differences: RTK vs RTK Query](#key-differences-rtk-vs-rtk-query)
9. [Common Interview Questions](#common-interview-questions)
10. [Best Practices](#best-practices)

---

## What is Redux Toolkit (RTK)?

**Redux Toolkit (RTK)** is the official, opinionated, batteries-included toolset for efficient Redux development. It's built on top of Redux and simplifies common Redux patterns.

### Why RTK Exists

**Traditional Redux Problems:**

- Too much boilerplate code
- Complex setup (action types, action creators, reducers)
- Easy to make mistakes (mutating state)
- Difficult to handle async operations

**RTK Solutions:**

- ✅ Reduces boilerplate by ~70%
- ✅ Built-in Immer for safe state mutations
- ✅ Simplified store configuration
- ✅ Better TypeScript support
- ✅ DevTools integration out of the box

---

## Core RTK Concepts

### 1. **createSlice** - The Heart of RTK

A slice is a collection of Redux reducer logic and actions for a single feature.

```typescript
// Example from your authSlice.ts
const authSlice = createSlice({
  name: 'auth', // Namespace for actions
  initialState, // Initial state
  reducers: {
    // Action creators + reducers
    setCredentials: (state, action) => {
      // Immer allows direct mutation!
      state.token = action.payload.token
      state.userType = action.payload.userType
    },
    logout: (state) => {
      state.token = null
      state.userType = null
    },
  },
})
```

**Key Points:**

- `name`: Creates action types like `auth/setCredentials`
- `reducers`: Each key becomes an action creator automatically
- **Immer**: You can write "mutating" code, but it's actually immutable

### 2. **Actions and Action Creators**

RTK automatically generates action creators:

```typescript
// Generated automatically:
// authSlice.actions.setCredentials({ token: 'abc', userType: 'Admin' })
// Returns: { type: 'auth/setCredentials', payload: { token: 'abc', userType: 'Admin' } }

export const { setCredentials, logout } = authSlice.actions
```

**Usage in Components:**

```typescript
const dispatch = useAppDispatch()
dispatch(setCredentials({ token: 'abc', userType: 'Admin' }))
```

### 3. **Selectors**

Functions to extract specific pieces of state:

```typescript
// From your authSlice.ts
export const selectToken = (state: RootStatePartial): string | null => state?.auth?.token

export const selectIsAuthenticated = (state: RootStatePartial): boolean =>
  Boolean(state?.auth?.token)
```

**Usage:**

```typescript
const token = useAppSelector(selectToken)
const isAuth = useAppSelector(selectIsAuthenticated)
```

### 4. **configureStore**

Simplified store setup with good defaults:

```typescript
// From your store/index.ts
export const store = configureStore({
  reducer: {
    auth: authReducer,
    search: searchReducer,
    [baseApi.reducerPath]: baseApi.reducer, // RTK Query reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
})
```

**What it does automatically:**

- ✅ Enables Redux DevTools
- ✅ Adds thunk middleware
- ✅ Adds serializable check middleware
- ✅ Adds immutability check middleware

---

## RTK in Your Project

### Your Auth Slice (`src/store/authSlice.ts`)

```typescript
// 1. Define state shape
interface AuthState {
  token: string | null
  userType: string | null
}

// 2. Initial state (hydrated from localStorage)
const initialState: AuthState = {
  token: localStorage.getItem('token'),
  userType: localStorage.getItem('userType'),
}

// 3. Create slice with reducers
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ token: string; userType: string }>) => {
      state.token = action.payload.token
      state.userType = action.payload.userType
    },
    logout: (state) => {
      state.token = null
      state.userType = null
    },
  },
})

// 4. Export actions and reducer
export const { setCredentials, logout } = authSlice.actions
export const authReducer = authSlice.reducer
```

**How it's used:**

```typescript
// In Login.tsx
dispatch(
  setCredentials({
    token: result.authentication,
    userType: result.userType,
  }),
)
```

### Your Search Slice (`src/store/searchSlice.ts`)

```typescript
// Complex state with nested objects
export type SearchState = {
  params: SearchParams
  filters: SearchFilters
}

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchParams(state, action: PayloadAction<Partial<SearchParams>>) {
      // Merging partial updates
      state.params = { ...state.params, ...action.payload }
    },
    setSearchFilters(state, action: PayloadAction<Partial<SearchFilters>>) {
      state.filters = { ...state.filters, ...action.payload }
    },
  },
})
```

**Key Pattern:** Using `Partial<>` allows updating only specific fields.

---

## What is RTK Query?

**RTK Query** is a powerful data fetching and caching library built on top of RTK. It eliminates the need to write:

- Thunks for async operations
- Loading/error state management
- Caching logic
- Cache invalidation logic

### Why RTK Query?

**Without RTK Query:**

```typescript
// Manual async handling
const [loading, setLoading] = useState(false)
const [error, setError] = useState(null)
const [data, setData] = useState(null)

useEffect(() => {
  setLoading(true)
  fetch('/api/hotels')
    .then((res) => res.json())
    .then((data) => setData(data))
    .catch((err) => setError(err))
    .finally(() => setLoading(false))
}, [])
```

**With RTK Query:**

```typescript
// Automatic!
const { data, isLoading, isError } = useGetHotelsQuery({ pageNumber: 1, pageSize: 10 })
```

---

## RTK Query Concepts

### 1. **createApi** - The Base API

```typescript
// From your baseApi.ts
export const baseApi = createApi({
  reducerPath: 'api',                    // Where reducer lives in store
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    prepareHeaders: (headers) => {
      // Add auth token to every request
      const token = localStorage.getItem('token')
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: ['Auth', 'Home', 'Hotel', 'Rooms', 'Cities', ...],  // Cache tags
  endpoints: () => ({}),  // Empty - endpoints added via injectEndpoints
})
```

**Key Points:**

- `reducerPath`: Where the API reducer lives in Redux store
- `baseQuery`: Configures how requests are made (base URL, headers)
- `tagTypes`: Define cache tags for invalidation
- `endpoints`: Define your API endpoints

### 2. **injectEndpoints** - Adding Endpoints

```typescript
// From your hotels/index.ts
export const hotelsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Query = GET request (read data)
    getHotels: builder.query<HotelDto[], GetHotelsQuery>({
      query: ({ searchQuery, pageNumber, pageSize }) => ({
        url: 'hotels',
        params: { searchQuery, pageNumber, pageSize },
      }),
      providesTags: ['Hotel'], // Cache tag
    }),

    // Mutation = POST/PUT/DELETE (modify data)
    login: build.mutation<Response, Credentials>({
      query: (body) => ({
        url: '/auth/authenticate',
        method: 'POST',
        body,
      }),
    }),
  }),
})
```

### 3. **Queries vs Mutations**

| Feature           | Query                     | Mutation                  |
| ----------------- | ------------------------- | ------------------------- |
| **Purpose**       | Fetch/read data           | Create/update/delete data |
| **Caching**       | ✅ Automatic caching      | ❌ No caching             |
| **Refetching**    | ✅ Auto-refetch on mount  | Manual trigger only       |
| **Loading State** | `isLoading`, `isFetching` | `isLoading`               |
| **Hook Pattern**  | `useGetXQuery()`          | `useCreateXMutation()`    |

**Query Example:**

```typescript
// Automatically fetches on mount, caches result
const { data, isLoading, error } = useGetHotelsQuery({
  pageNumber: 1,
  pageSize: 10,
})
```

**Mutation Example:**

```typescript
// Returns a trigger function, doesn't run automatically
const [createHotel, { isLoading }] = useCreateHotelMutation()

// Call it manually
await createHotel({ name: 'New Hotel', cityId: 1 }).unwrap()
```

### 4. **Cache Tags** - Smart Cache Invalidation

Tags are like labels for cached data. When you invalidate a tag, all queries with that tag refetch.

```typescript
// Providing tags (marking data)
getHotels: builder.query({
  query: () => 'hotels',
  providesTags: ['Hotel'], // "This data is tagged as 'Hotel'"
})

// Invalidating tags (clearing cache)
createHotel: builder.mutation({
  query: (body) => ({ url: '/hotels', method: 'POST', body }),
  invalidatesTags: ['Hotel'], // "Invalidate all 'Hotel' queries"
})
```

**How it works:**

1. `getHotels` provides tag `['Hotel']`
2. User creates a hotel → `createHotel` invalidates `['Hotel']`
3. All queries with `providesTags: ['Hotel']` automatically refetch!

**Specific Tags:**

```typescript
// Tag specific items
getHotel: builder.query({
  query: (id) => `hotels/${id}`,
  providesTags: (_result, _error, id) => [{ type: 'Hotel', id }],
})

// Invalidate specific item
updateHotel: builder.mutation({
  invalidatesTags: (_result, _error, { id }) => [{ type: 'Hotel', id }],
})
```

### 5. **Query Parameters and Options**

```typescript
// Conditional fetching
const { data } = useGetHotelQuery(id, {
  skip: Number.isNaN(id), // Don't fetch if id is invalid
})

// Polling (refetch every X seconds)
const { data } = useGetHotelsQuery(params, {
  pollingInterval: 30000, // Refetch every 30 seconds
})

// Refetch on focus/window reconnect
const { data } = useGetHotelsQuery(params, {
  refetchOnFocus: true,
  refetchOnReconnect: true,
})
```

---

## RTK Query in Your Project

### 1. Base API Setup (`src/api/baseApi.ts`)

```typescript
export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    prepareHeaders: (headers) => {
      // Global auth header injection
      const token = localStorage.getItem('token')
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: ['Auth', 'Home', 'Hotel', 'Rooms', 'Cities', 'Amenities', 'Booking', 'Admin', 'Photos'],
  endpoints: () => ({}),
})
```

**Why this pattern?**

- Single base configuration
- All endpoints share auth headers
- Centralized tag management

### 2. Injected Endpoints Pattern

```typescript
// hotels/index.ts
export const hotelsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getHotels: builder.query<HotelDto[], GetHotelsQuery>({
      query: ({ searchQuery, pageNumber, pageSize }) => ({
        url: 'hotels',
        params: { searchQuery, pageNumber, pageSize },
      }),
      providesTags: ['Hotel'],
    }),
  }),
})

export const { useGetHotelsQuery } = hotelsApi
```

**Benefits:**

- ✅ Code splitting (each feature has its own file)
- ✅ Type safety
- ✅ Easy to find related endpoints

### 3. Admin API Example (`src/api/admin/index.ts`)

```typescript
export const adminApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Query
    getCities: build.query<CityDto[], PaginationQuery | void>({
      query: (params) => ({
        url: '/cities',
        params: params || {},
      }),
      providesTags: ['Cities'],
    }),

    // Mutation - Create
    createCity: build.mutation<CityDto, CityForCreationDto>({
      query: (body) => ({
        url: '/cities',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Cities'], // Refetch cities list
    }),

    // Mutation - Update
    updateCity: build.mutation<CityDto, { id: number; data: CityForCreationDto }>({
      query: ({ id, data }) => ({
        url: `/cities/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Cities'],
    }),

    // Mutation - Delete
    deleteCity: build.mutation<void, number>({
      query: (id) => ({
        url: `/cities/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Cities'],
    }),
  }),
})
```

### 4. Using Hooks in Components

**Query Example:**

```typescript
// In Home.tsx
const { data, isLoading, isError } = useFeaturedDealsQuery()

if (isLoading) return <Skeleton />
if (isError) return <Alert>Error loading deals</Alert>
return <DealsList deals={data} />
```

**Mutation Example:**

```typescript
// In Cities.tsx
const [createCity, { isLoading }] = useCreateCityMutation()
const { showSuccess, showError } = useNotification()

const handleSubmit = async (data: CityForCreationDto) => {
  try {
    await createCity(data).unwrap() // .unwrap() throws on error
    showSuccess('City created!')
  } catch (error) {
    showError('Failed to create city')
  }
}
```

### 5. Store Integration

```typescript
// store/index.ts
export const store = configureStore({
  reducer: {
    auth: authReducer, // RTK slice
    search: searchReducer, // RTK slice
    [baseApi.reducerPath]: baseApi.reducer, // RTK Query reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware), // Required!
})
```

**Why middleware is required:**

- Handles caching
- Manages request deduplication
- Handles cache invalidation

---

## Key Differences: RTK vs RTK Query

| Aspect             | RTK (Slices)                           | RTK Query                     |
| ------------------ | -------------------------------------- | ----------------------------- |
| **Purpose**        | Client-side state                      | Server state / API calls      |
| **State Type**     | UI state, form state, app state        | Cached API responses          |
| **Updates**        | Synchronous actions                    | Async queries/mutations       |
| **Caching**        | Manual                                 | Automatic                     |
| **Loading States** | Manual                                 | Built-in                      |
| **When to Use**    | Auth state, search filters, UI toggles | API data, server interactions |

**In Your Project:**

- **RTK Slices**: `authSlice` (token, userType), `searchSlice` (filters, params)
- **RTK Query**: All API calls (hotels, cities, bookings, etc.)

---

## Common Interview Questions

### Q1: Why use RTK Query instead of useEffect + fetch?

**Answer:**

- ✅ Automatic caching (no duplicate requests)
- ✅ Built-in loading/error states
- ✅ Automatic refetching on mount/focus
- ✅ Cache invalidation system
- ✅ Request deduplication
- ✅ Optimistic updates support
- ✅ Less boilerplate

**Example:**

```typescript
// Without RTK Query - manual state management
const [data, setData] = useState(null)
const [loading, setLoading] = useState(false)
const [error, setError] = useState(null)

useEffect(() => {
  setLoading(true)
  fetch('/api/hotels')
    .then((res) => res.json())
    .then(setData)
    .catch(setError)
    .finally(() => setLoading(false))
}, [])

// With RTK Query - one line!
const { data, isLoading, isError } = useGetHotelsQuery()
```

### Q2: How does cache invalidation work?

**Answer:**
RTK Query uses a tag-based cache invalidation system:

1. **Provide tags** when fetching data:

```typescript
getHotels: builder.query({
  query: () => 'hotels',
  providesTags: ['Hotel'], // Tag this data
})
```

2. **Invalidate tags** when data changes:

```typescript
createHotel: builder.mutation({
  query: (body) => ({ url: '/hotels', method: 'POST', body }),
  invalidatesTags: ['Hotel'], // Invalidate all Hotel queries
})
```

3. **Automatic refetch**: All queries with `providesTags: ['Hotel']` refetch automatically.

**In your project:**

```typescript
// When you create a city, all city queries refetch
createCity: build.mutation({
  invalidatesTags: ['Cities'],
})
```

### Q3: What's the difference between `isLoading` and `isFetching`?

**Answer:**

- **`isLoading`**: `true` only on the **first** fetch (no cached data)
- **`isFetching`**: `true` on **every** fetch (including refetches)

```typescript
const { data, isLoading, isFetching } = useGetHotelsQuery()

// First render: isLoading=true, isFetching=true
// After data cached, refetch: isLoading=false, isFetching=true
```

**Use cases:**

- `isLoading`: Show skeleton/placeholder on initial load
- `isFetching`: Show subtle loading indicator during refetches

### Q4: How do you handle authentication with RTK Query?

**Answer:**
Use `prepareHeaders` in `fetchBaseQuery`:

```typescript
baseQuery: fetchBaseQuery({
  baseUrl: API_URL,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('token')
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }
    return headers
  },
})
```

**In your project:**

- Token is read from localStorage on every request
- Automatically added to all API calls
- No need to manually add headers in each endpoint

### Q5: When should you use RTK slices vs RTK Query?

**Answer:**

**Use RTK Slices for:**

- ✅ Client-side only state (UI toggles, form state)
- ✅ State that doesn't come from server
- ✅ State that needs complex synchronous logic

**Use RTK Query for:**

- ✅ All server/API interactions
- ✅ Data that needs caching
- ✅ Data that needs automatic refetching

**Your project examples:**

- **RTK Slice**: `authSlice` (token in memory), `searchSlice` (filters)
- **RTK Query**: All API endpoints (hotels, cities, bookings)

### Q6: How do you handle errors in RTK Query?

**Answer:**
Multiple ways:

```typescript
// 1. Check isError flag
const { data, isError, error } = useGetHotelsQuery()
if (isError) {
  // error object contains details
  console.error(error)
}

// 2. Try-catch with mutations
const [createHotel] = useCreateHotelMutation()
try {
  await createHotel(data).unwrap() // .unwrap() throws on error
} catch (error) {
  // Handle error
}

// 3. Transform response
getHotels: builder.query({
  query: () => 'hotels',
  transformResponse: (response) => {
    // Transform before caching
    return response.data
  },
  transformErrorResponse: (error) => {
    // Customize error format
    return { message: error.data?.message || 'Unknown error' }
  },
})
```

### Q7: What is `injectEndpoints` and why use it?

**Answer:**
`injectEndpoints` allows splitting API definitions across multiple files while sharing the same base configuration.

**Benefits:**

- ✅ Code splitting (each feature has its own file)
- ✅ Better organization
- ✅ Shared base configuration (auth, base URL)
- ✅ Type safety across all endpoints

**Your project structure:**

```
api/
  baseApi.ts          // Base configuration
  auth/index.ts      // Auth endpoints
  hotels/index.ts    // Hotel endpoints
  admin/index.ts     // Admin endpoints
```

All use `baseApi.injectEndpoints()` to add endpoints.

### Q8: How do you handle pagination with RTK Query?

**Answer:**
Pass pagination params in query:

```typescript
// Define query type
type GetHotelsQuery = {
  pageNumber: number
  pageSize: number
  searchQuery?: string
}

// Endpoint
getHotels: builder.query<HotelDto[], GetHotelsQuery>({
  query: ({ searchQuery, pageNumber, pageSize }) => ({
    url: 'hotels',
    params: { searchQuery, pageNumber, pageSize },
  }),
})

// Usage
const { data } = useGetHotelsQuery({
  pageNumber: 1,
  pageSize: 10,
})
```

**In your project:**

- Each page has its own cache entry
- Changing pageNumber creates new cache entry
- Previous pages remain cached

### Q9: What are the performance benefits of RTK Query?

**Answer:**

1. **Request Deduplication**: Multiple components requesting same data = one request
2. **Automatic Caching**: Data cached by query parameters
3. **Background Refetching**: Can refetch in background without showing loading
4. **Optimistic Updates**: Update UI before server responds
5. **Pagination Caching**: Previous pages stay cached

**Example:**

```typescript
// Component A and B both call:
useGetHotelsQuery({ pageNumber: 1, pageSize: 10 })

// Only ONE request is made!
// Both components get the same cached data
```

### Q10: How do you test RTK Query?

**Answer:**

```typescript
import { renderHook, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '@/store'
import { useGetHotelsQuery } from '@/api/hotels'

test('fetches hotels', async () => {
  const { result } = renderHook(() => useGetHotelsQuery({ pageNumber: 1, pageSize: 10 }), {
    wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
  })

  expect(result.current.isLoading).toBe(true)

  await waitFor(() => expect(result.current.isLoading).toBe(false))

  expect(result.current.data).toBeDefined()
})
```

---

## Best Practices

### 1. **Organize by Feature**

```
api/
  hotels/
    index.ts    // All hotel endpoints
  admin/
    index.ts    // All admin endpoints
```

### 2. **Use Specific Tags**

```typescript
// Good: Specific invalidation
providesTags: (_result, _error, id) => [{ type: 'Hotel', id }]
invalidatesTags: (_result, _error, { id }) => [{ type: 'Hotel', id }]

// Avoid: Too broad
providesTags: ['Hotel'] // Invalidates ALL hotels
```

### 3. **Type Everything**

```typescript
// Always type query params and responses
builder.query<ResponseType, QueryParamsType>({
  query: (params: QueryParamsType) => ({ ... }),
})
```

### 4. **Handle Loading States Properly**

```typescript
// Show skeleton on initial load
if (isLoading) return <Skeleton />

// Show subtle indicator on refetch
{isFetching && <CircularProgress size={20} />}
```

### 5. **Use `.unwrap()` for Mutations**

```typescript
// Good: Proper error handling
try {
  await createHotel(data).unwrap()
  showSuccess('Created!')
} catch (error) {
  showError('Failed!')
}

// Avoid: Not handling errors
createHotel(data) // Errors are swallowed
```

### 6. **Conditional Fetching**

```typescript
// Don't fetch if data not ready
const { data } = useGetHotelQuery(id, {
  skip: !id || Number.isNaN(id),
})
```

### 7. **Separate Client and Server State**

- **RTK Slices**: Client state (auth, UI, filters)
- **RTK Query**: Server state (API data)

---

## Quick Reference: Your Project Patterns

### Pattern 1: Query with Params

```typescript
// Definition
getHotels: builder.query<HotelDto[], GetHotelsQuery>({
  query: ({ searchQuery, pageNumber, pageSize }) => ({
    url: 'hotels',
    params: { searchQuery, pageNumber, pageSize },
  }),
})

// Usage
const { data } = useGetHotelsQuery({ pageNumber: 1, pageSize: 10 })
```

### Pattern 2: Mutation with Invalidation

```typescript
// Definition
createCity: build.mutation<CityDto, CityForCreationDto>({
  query: (body) => ({ url: '/cities', method: 'POST', body }),
  invalidatesTags: ['Cities'],
})

// Usage
const [createCity] = useCreateCityMutation()
await createCity(data).unwrap()
// Cities list automatically refetches!
```

### Pattern 3: Typed Hooks

```typescript
// In hooks/index.ts
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

// Usage - fully typed!
const token = useAppSelector(selectToken)
const dispatch = useAppDispatch()
```

---

## Summary

**RTK (Redux Toolkit):**

- ✅ Simplifies Redux with `createSlice`
- ✅ Automatic action creators
- ✅ Immer for safe mutations
- ✅ Use for client-side state

**RTK Query:**

- ✅ Automatic caching and refetching
- ✅ Built-in loading/error states
- ✅ Tag-based cache invalidation
- ✅ Use for all API calls

**Your Project:**

- RTK: `authSlice`, `searchSlice` (client state)
- RTK Query: All API endpoints (server state)
- Pattern: `baseApi` + `injectEndpoints` for organization

---

## Interview Tips

1. **Explain the "why"**: Always explain why you chose RTK/RTK Query
2. **Show patterns**: Reference your actual code structure
3. **Discuss trade-offs**: Know when NOT to use RTK Query (simple local state)
4. **Performance**: Mention caching, deduplication, optimistic updates
5. **TypeScript**: Emphasize type safety throughout

Good luck with your interview! 🚀
