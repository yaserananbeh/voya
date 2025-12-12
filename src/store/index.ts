import { configureStore } from '@reduxjs/toolkit'
import { baseApi } from '@/api/baseApi'
import { searchReducer } from './searchSlice'
import { authReducer } from './authSlice'

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
