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
      <IconButton onClick={toggleTheme} color="inherit" aria-label="toggle theme">
        {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
      </IconButton>
    </Tooltip>
  )
}
