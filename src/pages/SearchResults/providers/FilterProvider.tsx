import { createContext } from 'react'
import type { ReactNode } from 'react'

type FilterContextValue = {
  onClose?: () => void
}

export const FilterContext = createContext<FilterContextValue>({})

type FilterProviderProps = {
  children: ReactNode
  onClose?: () => void
}

export function FilterProvider({ children, onClose }: FilterProviderProps) {
  return <FilterContext.Provider value={{ onClose }}>{children}</FilterContext.Provider>
}
