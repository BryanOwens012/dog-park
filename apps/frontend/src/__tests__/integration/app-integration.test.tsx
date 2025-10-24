import React from 'react'
import { render, screen } from '@testing-library/react'
import App from '../../pages/_app'
import Home from '../../pages/index'
import { AppProps } from 'next/app'

describe('App Integration Tests', () => {
  describe('App with Home Page', () => {
    it('renders Home page through App component', () => {
      const appProps: AppProps = {
        Component: Home,
        pageProps: {},
        router: {} as any,
      }

      render(<App {...appProps} />)

      // Verify Home page content is rendered through App
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Welcome to Next.js Monorepo!')
      expect(screen.getByText('This is a basic Next.js application set up in a monorepo structure.')).toBeInTheDocument()
      expect(screen.getByRole('list')).toBeInTheDocument()
      expect(screen.getAllByRole('listitem')).toHaveLength(4)
    })

    it('passes pageProps correctly to Home component', () => {
      // Create a modified Home component that accepts props
      const HomeWithProps = (props: any) => (
        <div>
          <Home />
          {props.testProp && <div data-testid="test-prop">{props.testProp}</div>}
        </div>
      )

      const appProps: AppProps = {
        Component: HomeWithProps,
        pageProps: { testProp: 'integration-test' },
        router: {} as any,
      }

      render(<App {...appProps} />)

      expect(screen.getByTestId('test-prop')).toHaveTextContent('integration-test')
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Welcome to Next.js Monorepo!')
    })

    it('maintains proper HTML structure in full app', () => {
      const appProps: AppProps = {
        Component: Home,
        pageProps: {},
        router: {} as any,
      }

      render(<App {...appProps} />)

      // Verify complete HTML structure
      expect(screen.getByRole('main')).toBeInTheDocument()
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
      expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
      expect(screen.getByRole('list')).toBeInTheDocument()
    })

    it('preserves meta tags when rendered through App', () => {
      const appProps: AppProps = {
        Component: Home,
        pageProps: {},
        router: {} as any,
      }

      render(<App {...appProps} />)

      // Check that Head content is properly set
      expect(document.title).toBe('Next.js Monorepo App')
      
      const metaDescription = document.querySelector('meta[name="description"]')
      expect(metaDescription).toHaveAttribute('content', 'A basic Next.js app in a monorepo setup')
    })
  })

  describe('App Component Switching', () => {
    it('can switch between different page components', () => {
      const Page1 = () => <div data-testid="page1">Page 1</div>
      const Page2 = () => <div data-testid="page2">Page 2</div>

      const { rerender } = render(
        <App Component={Page1} pageProps={{}} router={{} as any} />
      )

      expect(screen.getByTestId('page1')).toBeInTheDocument()
      expect(screen.queryByTestId('page2')).not.toBeInTheDocument()

      rerender(
        <App Component={Page2} pageProps={{}} router={{} as any} />
      )

      expect(screen.queryByTestId('page1')).not.toBeInTheDocument()
      expect(screen.getByTestId('page2')).toBeInTheDocument()
    })

    it('handles page props changes correctly', () => {
      const DynamicPage = ({ message }: { message: string }) => (
        <div data-testid="dynamic-page">{message}</div>
      )

      const { rerender } = render(
        <App Component={DynamicPage} pageProps={{ message: 'First message' }} router={{} as any} />
      )

      expect(screen.getByTestId('dynamic-page')).toHaveTextContent('First message')

      rerender(
        <App Component={DynamicPage} pageProps={{ message: 'Second message' }} router={{} as any} />
      )

      expect(screen.getByTestId('dynamic-page')).toHaveTextContent('Second message')
    })
  })
})
