import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export type SearchParams = {
  // We’ll use this as the "searchQuery" for /api/hotels
  searchQuery?: string

  // Keep these if the rest of the app already uses them (Home flow etc.)
  city?: string
  checkInDate?: string
  checkOutDate?: string
  adults?: number
  children?: number
  rooms?: number
}

export type SearchFilters = {
  priceRange?: [number, number]
  stars?: number | null
  amenities?: string[]
  hotelTypes?: string[] // Boutique/Resort/Hotel/Lodge/Inn
}

export type SearchState = {
  params: SearchParams
  filters: SearchFilters
}

const initialState: SearchState = {
  params: {},
  filters: {},
}

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchParams(state, action: PayloadAction<Partial<SearchParams>>) {
      state.params = { ...state.params, ...action.payload }
    },

    setSearchFilters(state, action: PayloadAction<Partial<SearchFilters>>) {
      state.filters = { ...state.filters, ...action.payload }
    },

    clearSearchFilters(state) {
      state.filters = {}
    },

    hydrateSearchState(_state, action: PayloadAction<SearchState>) {
      return action.payload
    },
  },
})

export const { setSearchParams, setSearchFilters, clearSearchFilters, hydrateSearchState } =
  searchSlice.actions

export const searchReducer = searchSlice.reducer

export const selectSearchParams = (state: { search: SearchState }) => state.search.params
export const selectSearchFilters = (state: { search: SearchState }) => state.search.filters
export const selectSearchQuery = (state: { search: SearchState }) =>
  state.search.params.searchQuery ?? state.search.params.city ?? ''

export { initialState as searchInitialState }
