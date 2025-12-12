import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export type SearchParams = {
  city: string
  checkInDate: string // YYYY-MM-DD
  checkOutDate: string
  adults: number
  children: number
  rooms: number
}

type SearchState = {
  params: Partial<SearchParams>
}

const initialState: SearchState = {
  params: {},
}

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchParams(state, action: PayloadAction<SearchParams>) {
      state.params = action.payload
    },
  },
})

export const { setSearchParams } = searchSlice.actions
export const searchReducer = searchSlice.reducer

export const selectSearchParams = (state: { search: SearchState }) => state.search.params
