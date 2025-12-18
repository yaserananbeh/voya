import { useCallback } from 'react'
import { useAppSelector, useAppDispatch } from './index'
import {
  selectSearchParams,
  selectSearchFilters,
  setSearchParams,
  setSearchFilters,
  clearSearchFilters,
} from '@/store/searchSlice'

export function useSearch() {
  const dispatch = useAppDispatch()
  const params = useAppSelector(selectSearchParams)
  const filters = useAppSelector(selectSearchFilters)

  const updateParams = useCallback(
    (newParams: Partial<typeof params>) => {
      dispatch(setSearchParams(newParams))
    },
    [dispatch],
  )

  const updateFilters = useCallback(
    (newFilters: Partial<typeof filters>) => {
      dispatch(setSearchFilters(newFilters))
    },
    [dispatch],
  )

  const clearFilters = useCallback(() => {
    dispatch(clearSearchFilters())
  }, [dispatch])

  return {
    params,
    filters,
    updateParams,
    updateFilters,
    clearFilters,
  }
}
