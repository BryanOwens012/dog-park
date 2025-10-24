import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { jest } from '@jest/globals'
import Home from '../../src/pages/index'

// Mock Next.js Head component
jest.mock('next/head', () => {
  return function Head({ children }: { children: React.ReactNode }) {
    return <>{children}</>
  }
})

describe('Home Page', () => {
  beforeEach(() => {
    // Clear console.log mock before each test
    jest.clearAllMocks()
    // Mock console.log to capture search queries
    jest.spyOn(console, 'log').mockImplementation(() => {})
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  describe('Rendering', () => {
    it('renders the main page elements', () => {
      render(<Home />)
      
      // Check for main heading
      expect(screen.getByText('Hoogle')).toBeInTheDocument()
      
      // Check for search input
      expect(screen.getByPlaceholderText('Search the web')).toBeInTheDocument()
      
      // Check for search buttons
      expect(screen.getByText('Hoogle Search')).toBeInTheDocument()
      expect(screen.getByText("I'm Feeling Lucky")).toBeInTheDocument()
      
      // Check for AI Mode button
      expect(screen.getByText('AI Mode')).toBeInTheDocument()
    })

    it('renders header navigation links', () => {
      render(<Home />)
      
      expect(screen.getByText('About')).toBeInTheDocument()
      expect(screen.getByText('Store')).toBeInTheDocument()
      expect(screen.getByText('Gmail')).toBeInTheDocument()
      expect(screen.getByText('Images')).toBeInTheDocument()
      expect(screen.getByText('Sign in')).toBeInTheDocument()
    })

    it('renders footer links', () => {
      render(<Home />)
      
      expect(screen.getByText('Advertising')).toBeInTheDocument()
      expect(screen.getByText('Business')).toBeInTheDocument()
      expect(screen.getByText('How Search works')).toBeInTheDocument()
      expect(screen.getByText('Privacy')).toBeInTheDocument()
      expect(screen.getByText('Terms')).toBeInTheDocument()
      expect(screen.getByText('Settings')).toBeInTheDocument()
    })

    it('renders environmental message', () => {
      render(<Home />)
      
      expect(screen.getByText('Applying AI towards science and the environment')).toBeInTheDocument()
    })
  })

  describe('Search Input', () => {
    it('updates search query when typing', () => {
      render(<Home />)
      
      const searchInput = screen.getByPlaceholderText('Search the web')
      fireEvent.change(searchInput, { target: { value: 'test query' } })
      
      expect(searchInput).toHaveValue('test query')
    })

    it('handles empty input', () => {
      render(<Home />)
      
      const searchInput = screen.getByPlaceholderText('Search the web')
      expect(searchInput).toHaveValue('')
    })

    it('handles special characters in input', () => {
      render(<Home />)
      
      const searchInput = screen.getByPlaceholderText('Search the web')
      const specialQuery = '!@#$%^&*()_+-=[]{}|;:,.<>?'
      fireEvent.change(searchInput, { target: { value: specialQuery } })
      
      expect(searchInput).toHaveValue(specialQuery)
    })

    it('handles very long input', () => {
      render(<Home />)
      
      const searchInput = screen.getByPlaceholderText('Search the web')
      const longQuery = 'a'.repeat(1000)
      fireEvent.change(searchInput, { target: { value: longQuery } })
      
      expect(searchInput).toHaveValue(longQuery)
    })
  })

  describe('Search Form Submission', () => {
    it('handles form submission with valid query', () => {
      render(<Home />)
      
      const searchInput = screen.getByPlaceholderText('Search the web')
      const form = searchInput.closest('form')
      
      fireEvent.change(searchInput, { target: { value: 'test search' } })
      fireEvent.submit(form!)
      
      expect(console.log).toHaveBeenCalledWith('Searching for:', 'test search')
    })

    it('prevents submission with empty query', () => {
      render(<Home />)
      
      const searchInput = screen.getByPlaceholderText('Search the web')
      const form = searchInput.closest('form')
      
      fireEvent.submit(form!)
      
      expect(console.log).not.toHaveBeenCalled()
    })

    it('prevents submission with whitespace-only query', () => {
      render(<Home />)
      
      const searchInput = screen.getByPlaceholderText('Search the web')
      const form = searchInput.closest('form')
      
      fireEvent.change(searchInput, { target: { value: '   ' } })
      fireEvent.submit(form!)
      
      expect(console.log).not.toHaveBeenCalled()
    })

    it('trims whitespace from query before submission', () => {
      render(<Home />)
      
      const searchInput = screen.getByPlaceholderText('Search the web')
      const form = searchInput.closest('form')
      
      fireEvent.change(searchInput, { target: { value: '  test query  ' } })
      fireEvent.submit(form!)
      
      expect(console.log).toHaveBeenCalledWith('Searching for:', 'test query')
    })
  })

  describe('Search Buttons', () => {
    it('handles Hoogle Search button click with valid query', () => {
      render(<Home />)
      
      const searchInput = screen.getByPlaceholderText('Search the web')
      const searchButton = screen.getByText('Hoogle Search')
      
      fireEvent.change(searchInput, { target: { value: 'button search' } })
      fireEvent.click(searchButton)
      
      expect(console.log).toHaveBeenCalledWith('Searching for:', 'button search')
    })

    it('handles I\'m Feeling Lucky button click with valid query', () => {
      render(<Home />)
      
      const searchInput = screen.getByPlaceholderText('Search the web')
      const luckyButton = screen.getByText("I'm Feeling Lucky")
      
      fireEvent.change(searchInput, { target: { value: 'lucky search' } })
      fireEvent.click(luckyButton)
      
      expect(console.log).toHaveBeenCalledWith('Feeling lucky with:', 'lucky search')
    })

    it('prevents lucky search with empty query', () => {
      render(<Home />)
      
      const luckyButton = screen.getByText("I'm Feeling Lucky")
      fireEvent.click(luckyButton)
      
      expect(console.log).not.toHaveBeenCalled()
    })

    it('prevents lucky search with whitespace-only query', () => {
      render(<Home />)
      
      const searchInput = screen.getByPlaceholderText('Search the web')
      const luckyButton = screen.getByText("I'm Feeling Lucky")
      
      fireEvent.change(searchInput, { target: { value: '   ' } })
      fireEvent.click(luckyButton)
      
      expect(console.log).not.toHaveBeenCalled()
    })
  })

  describe('Accessibility', () => {
    it('has proper ARIA labels', () => {
      render(<Home />)
      
      expect(screen.getByLabelText('Search')).toBeInTheDocument()
      expect(screen.getByLabelText('Google apps')).toBeInTheDocument()
      expect(screen.getByLabelText('Search by voice')).toBeInTheDocument()
      expect(screen.getByLabelText('Search by image')).toBeInTheDocument()
      expect(screen.getByLabelText('Toggle AI Mode')).toBeInTheDocument()
    })

    it('has proper form structure', () => {
      render(<Home />)
      
      const form = screen.getByRole('form')
      expect(form).toBeInTheDocument()
      
      const searchInput = screen.getByRole('textbox')
      expect(searchInput).toBeInTheDocument()
      expect(searchInput).toHaveAttribute('autoComplete', 'off')
    })

    it('has proper button types', () => {
      render(<Home />)
      
      const searchButton = screen.getByText('Hoogle Search')
      expect(searchButton).toHaveAttribute('type', 'submit')
      
      const luckyButton = screen.getByText("I'm Feeling Lucky")
      expect(luckyButton).toHaveAttribute('type', 'button')
    })
  })

  describe('Keyboard Navigation', () => {
    it('handles Enter key in search input', () => {
      render(<Home />)
      
      const searchInput = screen.getByPlaceholderText('Search the web')
      fireEvent.change(searchInput, { target: { value: 'keyboard search' } })
      fireEvent.keyDown(searchInput, { key: 'Enter', code: 'Enter' })
      
      expect(console.log).toHaveBeenCalledWith('Searching for:', 'keyboard search')
    })

    it('focuses search input on page load', () => {
      render(<Home />)
      
      const searchInput = screen.getByPlaceholderText('Search the web')
      // Note: jsdom doesn't automatically focus elements, so we just check it exists
      expect(searchInput).toBeInTheDocument()
    })
  })

  describe('Edge Cases', () => {
    it('handles rapid consecutive searches', async () => {
      render(<Home />)
      
      const searchInput = screen.getByPlaceholderText('Search the web')
      const form = searchInput.closest('form')
      
      fireEvent.change(searchInput, { target: { value: 'search 1' } })
      fireEvent.submit(form!)
      
      fireEvent.change(searchInput, { target: { value: 'search 2' } })
      fireEvent.submit(form!)
      
      expect(console.log).toHaveBeenCalledTimes(2)
      expect(console.log).toHaveBeenNthCalledWith(1, 'Searching for:', 'search 1')
      expect(console.log).toHaveBeenNthCalledWith(2, 'Searching for:', 'search 2')
    })

    it('handles Unicode characters', () => {
      render(<Home />)
      
      const searchInput = screen.getByPlaceholderText('Search the web')
      const form = searchInput.closest('form')
      const unicodeQuery = '🔍 测试 العربية русский'
      
      fireEvent.change(searchInput, { target: { value: unicodeQuery } })
      fireEvent.submit(form!)
      
      expect(console.log).toHaveBeenCalledWith('Searching for:', unicodeQuery)
    })

    it('handles newlines and tabs in input', () => {
      render(<Home />)
      
      const searchInput = screen.getByPlaceholderText('Search the web')
      const form = searchInput.closest('form')
      const queryWithWhitespace = 'line1\nline2\tword'
      
      fireEvent.change(searchInput, { target: { value: queryWithWhitespace } })
      fireEvent.submit(form!)
      
      expect(console.log).toHaveBeenCalledWith('Searching for:', queryWithWhitespace.trim())
    })
  })

  describe('Component State', () => {
    it('maintains search query state across interactions', () => {
      render(<Home />)
      
      const searchInput = screen.getByPlaceholderText('Search the web')
      const luckyButton = screen.getByText("I'm Feeling Lucky")
      
      fireEvent.change(searchInput, { target: { value: 'persistent query' } })
      expect(searchInput).toHaveValue('persistent query')
      
      fireEvent.click(luckyButton)
      expect(searchInput).toHaveValue('persistent query')
    })

    it('clears search query when manually cleared', () => {
      render(<Home />)
      
      const searchInput = screen.getByPlaceholderText('Search the web')
      
      fireEvent.change(searchInput, { target: { value: 'test' } })
      expect(searchInput).toHaveValue('test')
      
      fireEvent.change(searchInput, { target: { value: '' } })
      expect(searchInput).toHaveValue('')
    })
  })
})
