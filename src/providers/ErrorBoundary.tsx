import { Component, type ReactNode } from 'react'
import { logger } from '@/utils/logger'
import { ErrorPage } from '@/pages/Error/ErrorPage'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: unknown, info: unknown) {
    logger.error('UI Crash (ErrorBoundary)', { error, info })
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }
      return <ErrorPage error={this.state.error} resetError={this.handleReset} />
    }
    return this.props.children
  }
}
