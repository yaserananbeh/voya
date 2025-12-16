import { useTranslation } from 'react-i18next'

export function useRTLButton() {
  const { i18n } = useTranslation()
  const isRTL = i18n.language === 'ar'

  return {
    isRTL,
    buttonSx: {
      flexDirection: isRTL ? 'row-reverse' : 'row',
    },
  }
}
