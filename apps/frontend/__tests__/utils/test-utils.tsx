import { render, RenderOptions } from '@testing-library/react'
import { ReactElement } from 'react'

// Custom render function that includes common providers
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => {
  return render(ui, {
    // Add any providers here if needed in the future
    // wrapper: ({ children }) => <Provider>{children}</Provider>,
    ...options,
  })
}

// Re-export everything
export * from '@testing-library/react'

// Override render method
export { customRender as render }

// Common test utilities
export const mockConsoleLog = () => {
  return jest.spyOn(console, 'log').mockImplementation(() => {})
}

export const mockConsoleError = () => {
  return jest.spyOn(console, 'error').mockImplementation(() => {})
}

export const createMockEvent = (overrides = {}) => ({
  preventDefault: jest.fn(),
  stopPropagation: jest.fn(),
  ...overrides,
})

export const createMockKeyboardEvent = (key: string, shiftKey = false) => ({
  key,
  shiftKey,
  preventDefault: jest.fn(),
  stopPropagation: jest.fn(),
})
