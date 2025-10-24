import { render, screen } from '@testing-library/react'
import Home from '../../pages/index'

describe('Home Page', () => {
  describe('Happy Path', () => {
    it('renders the main heading', () => {
      render(<Home />)
      
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Welcome to Next.js Monorepo!')
    })

    it('renders the description paragraph', () => {
      render(<Home />)
      
      expect(screen.getByText('This is a basic Next.js application set up in a monorepo structure.')).toBeInTheDocument()
    })

    it('renders the features section', () => {
      render(<Home />)
      
      expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Features:')
    })

    it('renders all feature list items', () => {
      render(<Home />)
      
      const features = [
        'Next.js 14',
        'TypeScript support',
        'Monorepo with npm workspaces',
        'ESLint configuration'
      ]

      features.forEach(feature => {
        expect(screen.getByText(feature)).toBeInTheDocument()
      })
    })

    it('renders the features as a list', () => {
      render(<Home />)
      
      const list = screen.getByRole('list')
      expect(list).toBeInTheDocument()
      
      const listItems = screen.getAllByRole('listitem')
      expect(listItems).toHaveLength(4)
    })
  })

  describe('HTML Structure and Semantics', () => {
    it('has proper HTML structure with main element', () => {
      render(<Home />)
      
      const main = screen.getByRole('main')
      expect(main).toBeInTheDocument()
    })

    it('contains proper heading hierarchy', () => {
      render(<Home />)
      
      const h1 = screen.getByRole('heading', { level: 1 })
      const h2 = screen.getByRole('heading', { level: 2 })
      
      expect(h1).toBeInTheDocument()
      expect(h2).toBeInTheDocument()
    })

    it('has accessible list structure', () => {
      render(<Home />)
      
      const list = screen.getByRole('list')
      const listItems = screen.getAllByRole('listitem')
      
      expect(list).toBeInTheDocument()
      expect(listItems).toHaveLength(4)
    })
  })

  describe('Head Meta Tags', () => {
    it('sets the correct page title', () => {
      render(<Home />)
      
      // Note: In a real test environment, you might need to check document.title
      // or use a more sophisticated approach to test Head content
      expect(document.title).toBe('Next.js Monorepo App')
    })

    it('includes meta description', () => {
      render(<Home />)
      
      const metaDescription = document.querySelector('meta[name="description"]')
      expect(metaDescription).toHaveAttribute('content', 'A basic Next.js app in a monorepo setup')
    })

    it('includes viewport meta tag', () => {
      render(<Home />)
      
      const metaViewport = document.querySelector('meta[name="viewport"]')
      expect(metaViewport).toHaveAttribute('content', 'width=device-width, initial-scale=1')
    })

    it('includes favicon link', () => {
      render(<Home />)
      
      const favicon = document.querySelector('link[rel="icon"]')
      expect(favicon).toHaveAttribute('href', '/favicon.ico')
    })
  })

  describe('Styling and Layout', () => {
    it('applies correct inline styles to main element', () => {
      render(<Home />)
      
      const main = screen.getByRole('main')
      expect(main).toHaveStyle({
        padding: '2rem',
        fontFamily: 'system-ui, sans-serif'
      })
    })

    it('applies correct inline styles to features div', () => {
      render(<Home />)
      
      const featuresDiv = screen.getByRole('heading', { level: 2 }).parentElement
      expect(featuresDiv).toHaveStyle({
        marginTop: '2rem'
      })
    })
  })

  describe('Content Validation', () => {
    it('displays the exact welcome message', () => {
      render(<Home />)
      
      expect(screen.getByText('Welcome to Next.js Monorepo!')).toBeInTheDocument()
    })

    it('displays the exact description text', () => {
      render(<Home />)
      
      expect(screen.getByText('This is a basic Next.js application set up in a monorepo structure.')).toBeInTheDocument()
    })

    it('displays all technology features correctly', () => {
      render(<Home />)
      
      const expectedFeatures = [
        'Next.js 14',
        'TypeScript support', 
        'Monorepo with npm workspaces',
        'ESLint configuration'
      ]

      expectedFeatures.forEach(feature => {
        expect(screen.getByText(feature)).toBeInTheDocument()
      })
    })
  })

  describe('Component Rendering', () => {
    it('renders without crashing', () => {
      expect(() => render(<Home />)).not.toThrow()
    })

    it('renders all expected elements', () => {
      render(<Home />)
      
      // Check for all major elements
      expect(screen.getByRole('main')).toBeInTheDocument()
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
      expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
      expect(screen.getByRole('list')).toBeInTheDocument()
      expect(screen.getAllByRole('listitem')).toHaveLength(4)
    })

    it('has no accessibility violations for basic structure', () => {
      render(<Home />)
      
      // Basic accessibility checks
      expect(screen.getByRole('main')).toBeInTheDocument()
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
      expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
    })
  })

  describe('Edge Cases', () => {
    it('handles multiple renders without issues', () => {
      const { rerender } = render(<Home />)
      
      expect(screen.getByText('Welcome to Next.js Monorepo!')).toBeInTheDocument()
      
      rerender(<Home />)
      
      expect(screen.getByText('Welcome to Next.js Monorepo!')).toBeInTheDocument()
    })

    it('maintains consistent content across renders', () => {
      const { rerender } = render(<Home />)
      
      const initialFeatures = screen.getAllByRole('listitem')
      expect(initialFeatures).toHaveLength(4)
      
      rerender(<Home />)
      
      const rerenderedFeatures = screen.getAllByRole('listitem')
      expect(rerenderedFeatures).toHaveLength(4)
    })
  })
})
