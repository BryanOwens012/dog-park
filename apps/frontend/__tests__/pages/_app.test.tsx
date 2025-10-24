import { render } from '@testing-library/react'
import App from '../../src/pages/_app'
import type { AppProps } from 'next/app'

// Mock component for testing
const MockComponent = () => <div data-testid="mock-component">Mock Component</div>

describe('App Component', () => {
  const mockAppProps: AppProps = {
    Component: MockComponent,
    pageProps: {},
    router: {} as any,
  }

  it('renders the component with pageProps', () => {
    const { getByTestId } = render(<App {...mockAppProps} />)
    
    expect(getByTestId('mock-component')).toBeInTheDocument()
  })

  it('passes pageProps to the component', () => {
    const testProps = { testProp: 'test value' }
    const propsWithTestData: AppProps = {
      ...mockAppProps,
      pageProps: testProps,
    }

    // Create a component that uses props
    const PropsComponent = ({ testProp }: { testProp: string }) => (
      <div data-testid="props-component">{testProp}</div>
    )

    const appPropsWithPropsComponent: AppProps = {
      ...propsWithTestData,
      Component: PropsComponent,
    }

    const { getByTestId } = render(<App {...appPropsWithPropsComponent} />)
    
    expect(getByTestId('props-component')).toHaveTextContent('test value')
  })

  it('applies global CSS styles', () => {
    render(<App {...mockAppProps} />)
    
    // Check that the component renders without throwing
    // Global CSS is imported in _app.tsx and should be available
    expect(document.head.querySelector('style')).toBeTruthy()
  })

  it('handles different component types', () => {
    const AnotherComponent = () => <span data-testid="another-component">Another</span>
    
    const appPropsWithDifferentComponent: AppProps = {
      ...mockAppProps,
      Component: AnotherComponent,
    }

    const { getByTestId } = render(<App {...appPropsWithDifferentComponent} />)
    
    expect(getByTestId('another-component')).toBeInTheDocument()
  })

  it('handles empty pageProps', () => {
    const EmptyPropsComponent = (props: any) => (
      <div data-testid="empty-props">{Object.keys(props).length}</div>
    )

    const appPropsWithEmptyProps: AppProps = {
      ...mockAppProps,
      Component: EmptyPropsComponent,
      pageProps: {},
    }

    const { getByTestId } = render(<App {...appPropsWithEmptyProps} />)
    
    expect(getByTestId('empty-props')).toHaveTextContent('0')
  })
})
