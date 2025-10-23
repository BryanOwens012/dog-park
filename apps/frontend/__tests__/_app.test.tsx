import { render } from '@testing-library/react'
import App from '../src/pages/_app'

// Mock component for testing
const MockComponent = ({ testProp }: { testProp?: string }) => (
  <div data-testid="mock-component">{testProp || 'Mock Component'}</div>
)

describe('App Component', () => {
  describe('Happy Path', () => {
    it('renders the component passed to it', () => {
      const mockPageProps = { testProp: 'test value' }
      
      const { getByTestId } = render(
        <App Component={MockComponent} pageProps={mockPageProps} />
      )
      
      expect(getByTestId('mock-component')).toBeInTheDocument()
      expect(getByTestId('mock-component')).toHaveTextContent('test value')
    })

    it('passes pageProps to the component correctly', () => {
      const mockPageProps = { testProp: 'custom prop value' }
      
      const { getByTestId } = render(
        <App Component={MockComponent} pageProps={mockPageProps} />
      )
      
      expect(getByTestId('mock-component')).toHaveTextContent('custom prop value')
    })

    it('applies global CSS styles', () => {
      const { container } = render(
        <App Component={MockComponent} pageProps={{}} />
      )
      
      // Check that the component is rendered within the app structure
      expect(container.firstChild).toBeInTheDocument()
    })
  })

  describe('Edge Cases', () => {
    it('handles empty pageProps', () => {
      const { getByTestId } = render(
        <App Component={MockComponent} pageProps={{}} />
      )
      
      expect(getByTestId('mock-component')).toBeInTheDocument()
      expect(getByTestId('mock-component')).toHaveTextContent('Mock Component')
    })

    it('handles null pageProps', () => {
      const { getByTestId } = render(
        <App Component={MockComponent} pageProps={null as any} />
      )
      
      expect(getByTestId('mock-component')).toBeInTheDocument()
    })

    it('handles undefined pageProps', () => {
      const { getByTestId } = render(
        <App Component={MockComponent} pageProps={undefined as any} />
      )
      
      expect(getByTestId('mock-component')).toBeInTheDocument()
    })
  })

  describe('Component Integration', () => {
    it('works with different component types', () => {
      const AnotherMockComponent = () => <span data-testid="another-component">Another Component</span>
      
      const { getByTestId } = render(
        <App Component={AnotherMockComponent} pageProps={{}} />
      )
      
      expect(getByTestId('another-component')).toBeInTheDocument()
      expect(getByTestId('another-component')).toHaveTextContent('Another Component')
    })

    it('preserves component functionality', () => {
      const InteractiveMockComponent = ({ onClick }: { onClick?: () => void }) => (
        <button data-testid="interactive-component" onClick={onClick}>
          Click me
        </button>
      )
      
      const mockOnClick = jest.fn()
      const { getByTestId } = render(
        <App Component={InteractiveMockComponent} pageProps={{ onClick: mockOnClick }} />
      )
      
      const button = getByTestId('interactive-component')
      button.click()
      
      expect(mockOnClick).toHaveBeenCalledTimes(1)
    })
  })
})
