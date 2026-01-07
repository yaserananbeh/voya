import { Container, type ContainerProps } from '@mui/material'
import type { PropsWithChildren } from 'react'

type PageContainerProps = PropsWithChildren<
  Pick<ContainerProps, 'maxWidth' | 'disableGutters' | 'sx'>
>

export const PageContainer = ({
  children,
  maxWidth = 'lg',
  disableGutters = false,
  sx,
}: PageContainerProps) => {
  return (
    <Container
      maxWidth={maxWidth}
      disableGutters={disableGutters}
      sx={{
        py: 4,
        ...(sx || {}),
      }}
    >
      {children}
    </Container>
  )
}
