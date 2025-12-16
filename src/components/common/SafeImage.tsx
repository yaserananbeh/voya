import { useState, useEffect, useRef } from 'react'
import { Box, CardMedia, Skeleton } from '@mui/material'
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported'

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

  useEffect(() => {
    setHasError(false)
    setIsLoading(true)

    if (!src) {
      setHasError(true)
      setIsLoading(false)
      return
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      setIsLoading((prevLoading) => {
        if (prevLoading) {
          setHasError(true)
          return false
        }
        return prevLoading
      })
    }, 8000)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [src])

  const handleLoad = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setIsLoading(false)
    setHasError(false)
  }

  const handleError = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setHasError(true)
    setIsLoading(false)
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
