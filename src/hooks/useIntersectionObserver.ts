import { useEffect, useRef, useState } from 'react'

type UseIntersectionObserverOptions = {
  threshold?: number | number[]
  root?: Element | null
  rootMargin?: string
  enabled?: boolean
}

export function useIntersectionObserver(
  options: UseIntersectionObserverOptions = {},
): [React.RefObject<HTMLElement | null>, boolean] {
  const { threshold = 0, root = null, rootMargin = '0px', enabled = true } = options
  const elementRef = useRef<HTMLElement | null>(null)
  const [isIntersecting, setIsIntersecting] = useState(false)

  useEffect(() => {
    const element = elementRef.current
    if (!element || !enabled) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting)
      },
      { threshold, root, rootMargin },
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [threshold, root, rootMargin, enabled])

  return [elementRef, isIntersecting]
}
