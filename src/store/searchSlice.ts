import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export type SearchParams = {
  searchQuery?: string

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
  hotelTypes?: string[]
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

    clearSearchParams(state) {
      state.params = {}
    },

    hydrateSearchState(_state, action: PayloadAction<SearchState>) {
      return action.payload
    },
  },
})

export const {
  setSearchParams,
  setSearchFilters,
  clearSearchFilters,
  clearSearchParams,
  hydrateSearchState,
} = searchSlice.actions

export const searchReducer = searchSlice.reducer

export const selectSearchParams = (state: { search: SearchState }) => state.search.params
export const selectSearchFilters = (state: { search: SearchState }) => state.search.filters
export const selectSearchQuery = (state: { search: SearchState }) =>
  state.search.params.searchQuery ?? state.search.params.city ?? ''

export { initialState as searchInitialState }
