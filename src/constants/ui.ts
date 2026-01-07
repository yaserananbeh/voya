export const UI = {
  NOTIFICATION: {
    MAX_SNACKS: 3,
    AUTO_HIDE_DURATION: {
      DEFAULT: 4000,
      SUCCESS: 3000,
      ERROR: 5000,
      WARNING: 4000,
      INFO: 4000,
    },
    ANCHOR_ORIGIN: {
      vertical: 'bottom' as const,
      horizontal: 'right' as const,
    },
  },

  IMAGE_LOAD_TIMEOUT: 8000,
} as const
