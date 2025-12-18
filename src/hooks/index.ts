import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '@/store'

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export { useNotification } from './useNotification'
export { useRTL } from './useRTL'
export { useLocalStorage } from './useLocalStorage'
export { useDebounce } from './useDebounce'
export { useIntersectionObserver } from './useIntersectionObserver'
export { useAuth } from './useAuth'
export { useSearch } from './useSearch'
export { useBooking } from './useBooking'
