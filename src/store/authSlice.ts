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
    },
    logout: (state) => {
      state.token = null
      state.userType = null
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
