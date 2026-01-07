import { useContext } from 'react'
import { FilterContext } from '../providers'

export function useFilterContext() {
  return useContext(FilterContext)
}
