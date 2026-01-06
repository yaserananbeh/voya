import { IconButton, Menu, MenuItem, Tooltip } from '@mui/material'
import LanguageIcon from '@mui/icons-material/Language'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const changeLanguage = (lng: string) => {
    void i18n.changeLanguage(lng)
    handleMenuClose()
  }

  const currentLanguage = i18n.language

  return (
    <>
      <Tooltip title={t('common.changeLanguage')}>
        <IconButton
          onClick={handleMenuOpen}
          color="inherit"
          aria-label={t('common.changeLanguage') || 'Change language'}
          aria-expanded={Boolean(anchorEl)}
          aria-haspopup="true"
        >
          <LanguageIcon aria-hidden="true" />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        role="menu"
        aria-label={t('common.selectLanguage') || 'Select language'}
      >
        <MenuItem
          onClick={() => changeLanguage('en')}
          selected={currentLanguage === 'en'}
          role="menuitemradio"
          aria-checked={currentLanguage === 'en'}
        >
          English
        </MenuItem>
        <MenuItem
          onClick={() => changeLanguage('ar')}
          selected={currentLanguage === 'ar'}
          role="menuitemradio"
          aria-checked={currentLanguage === 'ar'}
        >
          العربية
        </MenuItem>
      </Menu>
    </>
  )
}
