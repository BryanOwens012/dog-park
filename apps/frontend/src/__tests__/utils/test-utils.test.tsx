import React from 'react'
import { render, RenderOptions } from '@testing-library/react'

// Custom render function for testing (if needed for providers in the future)
const customRender = (ui: React.ReactElement, options?: RenderOptions) => {
  return render(ui, options)
}

// Test utilities
export const createMockEvent = (overrides = {}) => ({
  preventDefault: jest.fn(),
  stopPropagation: jest.fn(),
  target: { value: '' },
  ...overrides,
})

export const createMockFormEvent = (value = '') => ({
  preventDefault: jest.fn(),
  currentTarget: {
    elements: {
      search: { value },
    },
  },
})

export const waitForNextTick = () => new Promise(resolve => setTimeout(resolve, 0))

describe('Test Utilities', () => {
  describe('createMockEvent', () => {
    it('creates a mock event with default properties', () => {
      const event = createMockEvent()
      
      expect(event.preventDefault).toBeInstanceOf(Function)
      expect(event.stopPropagation).toBeInstanceOf(Function)
      expect(event.target.value).toBe('')
    })

    it('allows overriding default properties', () => {
      const event = createMockEvent({
        target: { value: 'test value' },
        type: 'input',
      })
      
      expect(event.target.value).toBe('test value')
      expect(event.type).toBe('input')
    })

    it('preserves default methods when overriding', () => {
      const customPreventDefault = jest.fn()
      const event = createMockEvent({
        preventDefault: customPreventDefault,
        target: { value: 'custom' },
      })
      
      expect(event.preventDefault).toBe(customPreventDefault)
      expect(event.stopPropagation).toBeInstanceOf(Function)
      expect(event.target.value).toBe('custom')
    })
  })

  describe('createMockFormEvent', () => {
    it('creates a mock form event with default value', () => {
      const event = createMockFormEvent()
      
      expect(event.preventDefault).toBeInstanceOf(Function)
      expect(event.currentTarget.elements.search.value).toBe('')
    })

    it('creates a mock form event with custom value', () => {
      const event = createMockFormEvent('search query')
      
      expect(event.currentTarget.elements.search.value).toBe('search query')
    })
  })

  describe('waitForNextTick', () => {
    it('resolves after next tick', async () => {
      const startTime = Date.now()
      await waitForNextTick()
      const endTime = Date.now()
      
      expect(endTime - startTime).toBeGreaterThanOrEqual(0)
    })

    it('can be used in async test flows', async () => {
      let executed = false
      
      setTimeout(() => {
        executed = true
      }, 0)
      
      expect(executed).toBe(false)
      await waitForNextTick()
      expect(executed).toBe(true)
    })
  })

  describe('customRender', () => {
    it('renders components correctly', () => {
      const TestComponent = () => <div data-testid="test">Test Component</div>
      const { getByTestId } = customRender(<TestComponent />)
      
      expect(getByTestId('test')).toBeInTheDocument()
    })

    it('accepts render options', () => {
      const TestComponent = () => <div data-testid="test">Test Component</div>
      const { container } = customRender(<TestComponent />, {
        container: document.body.appendChild(document.createElement('div'))
      })
      
      expect(container).toBeInTheDocument()
    })
  })
})

// Export utilities for use in other tests
export { customRender }
export * from '@testing-library/react'
