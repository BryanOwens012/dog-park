import React, { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'

// Custom render function that can be extended with providers
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { ...options })

export * from '@testing-library/react'
export { customRender as render }

// Common test data and helpers
export const mockAppProps = {
  router: {
    route: '/',
    pathname: '/',
    query: {},
    asPath: '/',
    push: jest.fn(),
    pop: jest.fn(),
    reload: jest.fn(),
    back: jest.fn(),
    prefetch: jest.fn().mockResolvedValue(undefined),
    beforePopState: jest.fn(),
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    },
    isFallback: false,
  },
}

// Helper to create mock components for testing
export const createMockComponent = (name: string, testId?: string) => {
  return function MockComponent(props: any) {
    return (
      <div data-testid={testId || `mock-${name.toLowerCase()}`}>
        {name} Component
        {props.children && <div>{props.children}</div>}
      </div>
    )
  }
}

// Helper to suppress console errors during error boundary tests
export const suppressConsoleError = (callback: () => void) => {
  const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
  try {
    callback()
  } finally {
    consoleSpy.mockRestore()
  }
}
