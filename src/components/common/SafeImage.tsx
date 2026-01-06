import { useState, useEffect, useRef } from 'react'
import { Box, CardMedia, Skeleton } from '@mui/material'
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported'
import { UI } from '@/constants'

type SafeImageProps = {
  src?: string | null
  alt?: string
  height?: number | string
  width?: number | string
  component?: 'img' | 'div'
  sx?: object
  fallbackIcon?: boolean
}

export function SafeImage({
  src,
  alt = 'Image',
  height = 140,
  width = '100%',
  component = 'img',
  sx,
  fallbackIcon = true,
}: SafeImageProps) {
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const hasLoadedRef = useRef(false)
  const isMountedRef = useRef(true)

  useEffect(() => {
    isMountedRef.current = true
    return () => {
      isMountedRef.current = false
    }
  }, [])

  useEffect(() => {
    setHasError(false)
    setIsLoading(true)
    hasLoadedRef.current = false

    if (!src) {
      setHasError(true)
      setIsLoading(false)
      return
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = undefined
    }

    const img = new Image()
    let cancelled = false

    const handleImageLoad = () => {
      if (cancelled || !isMountedRef.current) return
      hasLoadedRef.current = true
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = undefined
      }
      setIsLoading(false)
      setHasError(false)
    }

    const handleImageError = () => {
      if (cancelled || !isMountedRef.current) return
      hasLoadedRef.current = false
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = undefined
      }
      setHasError(true)
      setIsLoading(false)
    }

    img.onload = handleImageLoad
    img.onerror = handleImageError

    img.src = src

    const checkCached = () => {
      if (cancelled || !isMountedRef.current) return
      if (img.complete) {
        if (img.naturalWidth === 0 || img.naturalHeight === 0) {
          handleImageError()
        } else {
          handleImageLoad()
        }
      }
    }

    requestAnimationFrame(() => {
      if (!cancelled && isMountedRef.current) {
        checkCached()
      }
    })

    timeoutRef.current = setTimeout(() => {
      if (cancelled || !isMountedRef.current) return
      if (!hasLoadedRef.current) {
        setIsLoading(false)
      }
      timeoutRef.current = undefined
    }, UI.IMAGE_LOAD_TIMEOUT)

    return () => {
      cancelled = true
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = undefined
      }
      img.onload = null
      img.onerror = null
    }
  }, [src])

  const handleLoad = () => {
    if (!hasLoadedRef.current) {
      hasLoadedRef.current = true
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = undefined
      }
      setIsLoading(false)
      setHasError(false)
    }
  }

  const handleError = () => {
    if (hasLoadedRef.current === false && isLoading) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = undefined
      }
      setHasError(true)
      setIsLoading(false)
    }
  }

  if (!src || hasError) {
    if (fallbackIcon) {
      return (
        <Box
          sx={{
            height,
            width,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'grey.200',
            color: 'grey.400',
            ...sx,
          }}
        >
          <ImageNotSupportedIcon sx={{ fontSize: 48 }} />
        </Box>
      )
    }
    return null
  }

  if (component === 'img') {
    return (
      <Box sx={{ position: 'relative', height, width, ...sx }}>
        {isLoading && (
          <Skeleton
            variant="rectangular"
            height={height}
            width={width}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: 1,
            }}
          />
        )}
        <CardMedia
          component="img"
          height={height}
          width={width}
          image={src}
          alt={alt}
          onError={handleError}
          onLoad={handleLoad}
          sx={{
            bgcolor: 'grey.200',
            position: 'relative',
            zIndex: 2,
            opacity: isLoading ? 0 : 1,
            transition: 'opacity 0.3s ease-in-out',
            ...sx,
          }}
        />
      </Box>
    )
  }

  return (
    <Box
      component="div"
      sx={{
        height,
        width,
        backgroundImage: `url(${src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        bgcolor: 'grey.200',
        ...sx,
      }}
    />
  )
}
