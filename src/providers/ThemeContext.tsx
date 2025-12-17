import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { createAppTheme } from '@/theme'
import type { Theme } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'
import '@/i18n/config'

type ThemeMode = 'light' | 'dark'

interface ThemeContextType {
  mode: ThemeMode
  toggleTheme: () => void
  theme: Theme
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

const THEME_STORAGE_KEY = 'voya-theme-mode'

export function ThemeProvider({ children }: { children: ReactNode }) {
  const { i18n } = useTranslation()
  const [mode, setMode] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode | null
    return saved === 'dark' || saved === 'light' ? saved : 'light'
  })

  const direction = i18n.language === 'ar' ? 'rtl' : 'ltr'
  const theme = createAppTheme(mode, direction)

  useEffect(() => {
    localStorage.setItem(THEME_STORAGE_KEY, mode)
  }, [mode])

  const toggleTheme = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme, theme }}>{children}</ThemeContext.Provider>
  )
}

export function useThemeMode() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useThemeMode must be used within a ThemeProvider')
  }
  return context
}
