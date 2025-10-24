import React from 'react'
import { render } from '@testing-library/react'
import Home from '../../pages/index'
import App from '../../pages/_app'

// Mock component for App tests
const MockComponent = () => <div>Mock Component</div>

describe('Component Snapshots', () => {
  describe('Home Page', () => {
    it('matches snapshot', () => {
      const { container } = render(<Home />)
      expect(container.firstChild).toMatchSnapshot()
    })

    it('matches snapshot with different viewport', () => {
      // Mock different viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 768,
      })
      
      const { container } = render(<Home />)
      expect(container.firstChild).toMatchSnapshot('home-tablet-viewport')
    })

    it('matches snapshot with mobile viewport', () => {
      // Mock mobile viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      })
      
      const { container } = render(<Home />)
      expect(container.firstChild).toMatchSnapshot('home-mobile-viewport')
    })
  })

  describe('App Component', () => {
    it('matches snapshot', () => {
      const { container } = render(
        <App Component={MockComponent} pageProps={{}} />
      )
      expect(container.firstChild).toMatchSnapshot()
    })

    it('matches snapshot with page props', () => {
      const pageProps = {
        title: 'Test Page',
        data: { id: 1, name: 'Test' },
      }
      
      const TestComponent = ({ title, data }: any) => (
        <div>
          <h1>{title}</h1>
          <p>{data.name}</p>
        </div>
      )
      
      const { container } = render(
        <App Component={TestComponent} pageProps={pageProps} />
      )
      expect(container.firstChild).toMatchSnapshot('app-with-props')
    })
  })

  describe('Component States', () => {
    it('matches snapshot of search form with empty state', () => {
      const { container } = render(<Home />)
      const searchForm = container.querySelector('form[role="search"]')
      expect(searchForm).toMatchSnapshot('search-form-empty')
    })

    it('matches snapshot of header section', () => {
      const { container } = render(<Home />)
      const header = container.querySelector('header')
      expect(header).toMatchSnapshot('header-section')
    })

    it('matches snapshot of footer section', () => {
      const { container } = render(<Home />)
      const footer = container.querySelector('footer')
      expect(footer).toMatchSnapshot('footer-section')
    })

    it('matches snapshot of main content area', () => {
      const { container } = render(<Home />)
      const main = container.querySelector('main')
      expect(main).toMatchSnapshot('main-content')
    })
  })

  describe('Responsive Design Snapshots', () => {
    const viewports = [
      { name: 'mobile', width: 375 },
      { name: 'tablet', width: 768 },
      { name: 'desktop', width: 1024 },
      { name: 'large-desktop', width: 1440 },
    ]

    viewports.forEach(({ name, width }) => {
      it(`matches snapshot for ${name} viewport (${width}px)`, () => {
        Object.defineProperty(window, 'innerWidth', {
          writable: true,
          configurable: true,
          value: width,
        })
        
        const { container } = render(<Home />)
        expect(container.firstChild).toMatchSnapshot(`home-${name}-${width}px`)
      })
    })
  })
})
