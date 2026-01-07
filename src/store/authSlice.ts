import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { STORAGE_KEYS } from '@/constants'
import { USER } from '@/pages/Login/constants'

interface AuthState {
  token: string | null
  userType: string | null
}

const initialState: AuthState = {
  token: localStorage.getItem(STORAGE_KEYS.TOKEN),
  userType: localStorage.getItem(STORAGE_KEYS.USER_TYPE),
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

export const selectIsAdmin = (state: RootStatePartial): boolean =>
  state?.auth?.userType === USER.TYPES.ADMIN

export const authReducer = authSlice.reducer
