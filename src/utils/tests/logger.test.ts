import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { logger } from '@/utils/logger'

describe('logger', () => {
  let infoSpy: ReturnType<typeof vi.spyOn>
  let warnSpy: ReturnType<typeof vi.spyOn>
  let errorSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    infoSpy = vi.spyOn(console, 'info').mockImplementation(() => {})
    warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('logs info messages correctly', () => {
    logger.info('Test Info', { id: 1 })

    expect(infoSpy).toHaveBeenCalledWith(expect.stringContaining('[INFO]'), 'Test Info', { id: 1 })
  })

  it('logs warning messages correctly', () => {
    logger.warn('Test Warn')

    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('[WARN]'), 'Test Warn', '')
  })

  it('logs error messages correctly', () => {
    const errorObj = new Error('Test Error')
    logger.error('Test Err', errorObj)

    expect(errorSpy).toHaveBeenCalledWith(expect.stringContaining('[ERROR]'), 'Test Err', errorObj)
  })
})
