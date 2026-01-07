import { useContext } from 'react'
import { FilterContext } from '../components/FilterContainer'

export function useFilterContext() {
  return useContext(FilterContext)
}
