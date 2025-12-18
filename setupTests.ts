import '@testing-library/jest-dom/vitest'

import { beforeAll, afterEach, afterAll } from 'vitest'
import { server } from './src/tests/msw/server'
import i18n from './src/i18n/config'

beforeAll(() => {
  server.listen()
  void i18n.changeLanguage('en')
})

afterEach(() => {
  server.resetHandlers()
  void i18n.changeLanguage('en')
})

afterAll(() => server.close())
