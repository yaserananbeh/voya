import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom', // Required for React Testing Library
    setupFiles: './setupTests.ts', // Tells Vitest to run the setup file below
  },
})
