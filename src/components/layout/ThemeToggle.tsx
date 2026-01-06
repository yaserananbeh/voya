import { IconButton, Tooltip } from '@mui/material'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import { useThemeMode } from '@/providers/ThemeContext'
import { useTranslation } from 'react-i18next'

export function ThemeToggle() {
  const { mode, toggleTheme } = useThemeMode()
  const { t } = useTranslation()

  return (
    <Tooltip
      title={mode === 'light' ? t('common.switchToDarkMode') : t('common.switchToLightMode')}
    >
      <IconButton
        onClick={toggleTheme}
        color="inherit"
        aria-label={
          mode === 'light'
            ? t('common.switchToDarkMode') || 'Switch to dark mode'
            : t('common.switchToLightMode') || 'Switch to light mode'
        }
        aria-pressed={mode === 'dark'}
      >
        {mode === 'light' ? (
          <DarkModeIcon aria-hidden="true" />
        ) : (
          <LightModeIcon aria-hidden="true" />
        )}
      </IconButton>
    </Tooltip>
  )
}
