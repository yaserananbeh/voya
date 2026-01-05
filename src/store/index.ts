import { configureStore } from '@reduxjs/toolkit'
import { baseApi } from '@/api/baseApi'
import { searchReducer, type SearchState } from './searchSlice'
import { authReducer } from './authSlice'
import { STORAGE_KEYS } from '@/constants'

function loadSearchState(): SearchState | undefined {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SEARCH_STATE)
    if (!raw) return undefined
    return JSON.parse(raw) as SearchState
  } catch {
    return undefined
  }
}

const persistedSearch = loadSearchState()

export const store = configureStore({
  reducer: {
    auth: authReducer,
    search: searchReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },

  ...(persistedSearch && {
    preloadedState: {
      search: persistedSearch,
    },
  }),

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
})

store.subscribe(() => {
  try {
    localStorage.setItem(STORAGE_KEYS.SEARCH_STATE, JSON.stringify(store.getState().search))
  } catch {
    // Silent fail if localStorage is unavailable -eg, private browsing mode
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
