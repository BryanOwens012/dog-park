import React from 'react'
import { render, screen } from '@testing-library/react'
import App from '../../pages/_app'
import { AppProps } from 'next/app'

// Mock component for testing
const MockComponent = ({ testProp }: { testProp?: string }) => (
  <div data-testid="mock-component">
    Mock Component {testProp && `with prop: ${testProp}`}
  </div>
)

describe('App Component', () => {
  const defaultProps: AppProps = {
    Component: MockComponent,
    pageProps: {},
    router: {} as any,
  }

  describe('Happy Path', () => {
    it('renders the provided Component with pageProps', () => {
      const pageProps = { testProp: 'test-value' }
      render(<App {...defaultProps} pageProps={pageProps} />)
      
      expect(screen.getByTestId('mock-component')).toBeInTheDocument()
      expect(screen.getByText('Mock Component with prop: test-value')).toBeInTheDocument()
    })

    it('renders without any pageProps', () => {
      render(<App {...defaultProps} />)
      
      expect(screen.getByTestId('mock-component')).toBeInTheDocument()
      expect(screen.getByText('Mock Component')).toBeInTheDocument()
    })

    it('passes through all pageProps to the Component', () => {
      const complexPageProps = {
        title: 'Test Title',
        data: { id: 1, name: 'Test' },
        isActive: true,
      }
      
      const TestComponent = (props: any) => (
        <div data-testid="test-component">
          <span data-testid="title">{props.title}</span>
          <span data-testid="data">{JSON.stringify(props.data)}</span>
          <span data-testid="active">{props.isActive.toString()}</span>
        </div>
      )

      render(<App Component={TestComponent} pageProps={complexPageProps} router={{} as any} />)
      
      expect(screen.getByTestId('title')).toHaveTextContent('Test Title')
      expect(screen.getByTestId('data')).toHaveTextContent('{"id":1,"name":"Test"}')
      expect(screen.getByTestId('active')).toHaveTextContent('true')
    })
  })

  describe('Edge Cases', () => {
    it('handles empty pageProps object', () => {
      render(<App {...defaultProps} pageProps={{}} />)
      
      expect(screen.getByTestId('mock-component')).toBeInTheDocument()
    })

    it('handles null pageProps', () => {
      render(<App {...defaultProps} pageProps={null as any} />)
      
      expect(screen.getByTestId('mock-component')).toBeInTheDocument()
    })

    it('handles undefined pageProps', () => {
      render(<App {...defaultProps} pageProps={undefined as any} />)
      
      expect(screen.getByTestId('mock-component')).toBeInTheDocument()
    })

    it('renders different components correctly', () => {
      const AnotherComponent = () => <div data-testid="another-component">Another Component</div>
      
      render(<App Component={AnotherComponent} pageProps={{}} router={{} as any} />)
      
      expect(screen.getByTestId('another-component')).toBeInTheDocument()
      expect(screen.queryByTestId('mock-component')).not.toBeInTheDocument()
    })
  })

  describe('Component Integration', () => {
    it('maintains component state and behavior', () => {
      const StatefulComponent = ({ initialCount = 0 }: { initialCount?: number }) => {
        const [count, setCount] = React.useState(initialCount)
        return (
          <div>
            <span data-testid="count">{count}</span>
            <button onClick={() => setCount(c => c + 1)} data-testid="increment">
              Increment
            </button>
          </div>
        )
      }

      render(<App Component={StatefulComponent} pageProps={{ initialCount: 5 }} router={{} as any} />)
      
      expect(screen.getByTestId('count')).toHaveTextContent('5')
    })

    it('preserves component props and functionality', () => {
      const PropsComponent = ({ message, onClick }: { message: string; onClick: () => void }) => (
        <button onClick={onClick} data-testid="props-button">
          {message}
        </button>
      )

      const mockOnClick = jest.fn()
      render(
        <App 
          Component={PropsComponent} 
          pageProps={{ message: 'Click me', onClick: mockOnClick }} 
          router={{} as any} 
        />
      )
      
      const button = screen.getByTestId('props-button')
      expect(button).toHaveTextContent('Click me')
    })
  })

  describe('Error Handling', () => {
    it('handles component render errors gracefully', () => {
      const ErrorComponent = () => {
        throw new Error('Component error')
      }

      // Suppress console.error for this test
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
      
      expect(() => {
        render(<App Component={ErrorComponent} pageProps={{}} router={{} as any} />)
      }).toThrow('Component error')

      consoleSpy.mockRestore()
    })
  })
})
