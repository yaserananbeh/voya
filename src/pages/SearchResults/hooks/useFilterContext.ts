import { useContext } from 'react'
import { FilterContext } from '@/pages/SearchResults/providers'

export function useFilterContext() {
  return useContext(FilterContext)
}
