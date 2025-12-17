# RTK & RTK Query Quick Reference Cheat Sheet

## 🎯 RTK Slice Pattern

```typescript
// 1. Define state
interface MyState {
  value: string
}

// 2. Create slice
const mySlice = createSlice({
  name: 'myFeature',
  initialState: { value: '' },
  reducers: {
    setValue: (state, action: PayloadAction<string>) => {
      state.value = action.payload // Immer allows mutation!
    },
  },
})

// 3. Export
export const { setValue } = mySlice.actions
export const myReducer = mySlice.reducer

// 4. Use in component
const dispatch = useAppDispatch()
dispatch(setValue('new value'))
```

---

## 🔄 RTK Query Pattern

### Base API Setup

```typescript
export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  tagTypes: ['Item'],
  endpoints: () => ({}),
})
```

### Query (GET)

```typescript
getItems: builder.query<Item[], void>({
  query: () => 'items',
  providesTags: ['Item'],
})

// Usage
const { data, isLoading, isError } = useGetItemsQuery()
```

### Mutation (POST/PUT/DELETE)

```typescript
createItem: build.mutation<Item, ItemData>({
  query: (body) => ({ url: 'items', method: 'POST', body }),
  invalidatesTags: ['Item'],
})

// Usage
const [createItem, { isLoading }] = useCreateItemMutation()
await createItem(data).unwrap()
```

---

## 📊 State Management Decision Tree

```
Is it server data?
├─ YES → RTK Query
└─ NO → Is it complex state?
    ├─ YES → RTK Slice
    └─ NO → useState
```

---

## 🏷️ Cache Tags

```typescript
// Provide tag
providesTags: ['Item']

// Provide specific tag
providesTags: (_result, _error, id) => [{ type: 'Item', id }]

// Invalidate tag
invalidatesTags: ['Item']

// Invalidate specific
invalidatesTags: (_result, _error, { id }) => [{ type: 'Item', id }]
```

---

## ⚡ Common Hooks

### RTK Query

```typescript
// Query
const { data, isLoading, isFetching, isError, error, refetch } = useGetItemsQuery()

// Mutation
const [mutate, { isLoading, isError, error }] = useCreateItemMutation()
```

### RTK

```typescript
// Dispatch
const dispatch = useAppDispatch()

// Select
const value = useAppSelector(selectValue)
```

---

## 🎨 Loading States

```typescript
// Initial load
if (isLoading) return <Skeleton />

// Refetch indicator
{isFetching && <Spinner />}

// Error
if (isError) return <Error message={error} />
```

---

## 🔐 Auth Pattern (Your Project)

```typescript
// Base API
baseQuery: fetchBaseQuery({
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('token')
    if (token) headers.set('Authorization', `Bearer ${token}`)
    return headers
  },
})
```

---

## 📝 TypeScript Patterns

```typescript
// Typed hooks
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

// Typed selectors
export const selectValue = (state: RootState) => state.feature.value
```

---

## 🚀 Performance Tips

1. **Request Deduplication**: Multiple components = one request
2. **Conditional Fetching**: `skip: !id`
3. **Polling**: `pollingInterval: 30000`
4. **Background Refetch**: `refetchOnMountOrArgChange: false`

---

## ❓ Common Interview Answers

**Q: Why RTK Query over useEffect?**

- Automatic caching, loading states, cache invalidation, less boilerplate

**Q: RTK vs RTK Query?**

- RTK = client state, RTK Query = server state

**Q: How does caching work?**

- Tag-based invalidation system

**Q: isLoading vs isFetching?**

- isLoading = first fetch only, isFetching = every fetch
