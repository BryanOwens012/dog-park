import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Home from '../../pages/index'

// Mock console.log to test search functionality
const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation(() => {})

describe('Home Page', () => {
  beforeEach(() => {
    mockConsoleLog.mockClear()
  })

  afterAll(() => {
    mockConsoleLog.mockRestore()
  })

  describe('Rendering', () => {
    it('renders the main heading', () => {
      render(<Home />)
      expect(screen.getByRole('heading', { name: /hoogle/i })).toBeInTheDocument()
    })

    it('renders the search form', () => {
      render(<Home />)
      expect(screen.getByRole('search')).toBeInTheDocument()
    })

    it('renders the search input with correct attributes', () => {
      render(<Home />)
      const searchInput = screen.getByRole('textbox', { name: /search query/i })
      
      expect(searchInput).toBeInTheDocument()
      expect(searchInput).toHaveAttribute('type', 'text')
      expect(searchInput).toHaveAttribute('placeholder', 'Search the web')
      expect(searchInput).toHaveAttribute('autoComplete', 'off')
      expect(searchInput).toHaveAttribute('spellCheck', 'false')
    })

    it('renders search buttons', () => {
      render(<Home />)
      expect(screen.getByRole('button', { name: /hoogle search/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /i'm feeling lucky/i })).toBeInTheDocument()
    })

    it('renders header navigation links', () => {
      render(<Home />)
      expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: /store/i })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: /gmail/i })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: /images/i })).toBeInTheDocument()
    })

    it('renders sign in button', () => {
      render(<Home />)
      expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument()
    })

    it('renders footer links', () => {
      render(<Home />)
      expect(screen.getByRole('link', { name: /advertising/i })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: /business/i })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: /privacy/i })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: /terms/i })).toBeInTheDocument()
    })

    it('renders environmental message', () => {
      render(<Home />)
      expect(screen.getByText(/applying ai towards science and the environment/i)).toBeInTheDocument()
    })
  })

  describe('Search Input Functionality', () => {
    it('updates search query when typing', async () => {
      const user = userEvent.setup()
      render(<Home />)
      
      const searchInput = screen.getByRole('textbox', { name: /search query/i })
      await user.type(searchInput, 'test query')
      
      expect(searchInput).toHaveValue('test query')
    })

    it('handles empty input', async () => {
      const user = userEvent.setup()
      render(<Home />)
      
      const searchInput = screen.getByRole('textbox', { name: /search query/i })
      await user.clear(searchInput)
      
      expect(searchInput).toHaveValue('')
    })

    it('handles special characters in input', async () => {
      const user = userEvent.setup()
      render(<Home />)
      
      const searchInput = screen.getByRole('textbox', { name: /search query/i })
      const specialQuery = '!@#$%^&*()_+-=[]{}|;:,.<>?'
      await user.type(searchInput, specialQuery)
      
      expect(searchInput).toHaveValue(specialQuery)
    })

    it('handles very long input', async () => {
      const user = userEvent.setup()
      render(<Home />)
      
      const searchInput = screen.getByRole('textbox', { name: /search query/i })
      const longQuery = 'a'.repeat(1000)
      await user.type(searchInput, longQuery)
      
      expect(searchInput).toHaveValue(longQuery)
    })
  })

  describe('Search Form Submission', () => {
    it('calls handleSearch when form is submitted with valid query', async () => {
      const user = userEvent.setup()
      render(<Home />)
      
      const searchInput = screen.getByRole('textbox', { name: /search query/i })
      const searchForm = screen.getByRole('search')
      
      await user.type(searchInput, 'test search')
      await user.click(screen.getByRole('button', { name: /hoogle search/i }))
      
      expect(mockConsoleLog).toHaveBeenCalledWith('Searching for:', 'test search')
    })

    it('prevents form submission with empty query', async () => {
      const user = userEvent.setup()
      render(<Home />)
      
      const searchForm = screen.getByRole('search')
      fireEvent.submit(searchForm)
      
      expect(mockConsoleLog).not.toHaveBeenCalled()
    })

    it('prevents form submission with whitespace-only query', async () => {
      const user = userEvent.setup()
      render(<Home />)
      
      const searchInput = screen.getByRole('textbox', { name: /search query/i })
      const searchForm = screen.getByRole('search')
      
      await user.type(searchInput, '   ')
      fireEvent.submit(searchForm)
      
      expect(mockConsoleLog).not.toHaveBeenCalled()
    })

    it('handles form submission via Enter key', async () => {
      const user = userEvent.setup()
      render(<Home />)
      
      const searchInput = screen.getByRole('textbox', { name: /search query/i })
      
      await user.type(searchInput, 'keyboard search')
      await user.keyboard('{Enter}')
      
      expect(mockConsoleLog).toHaveBeenCalledWith('Searching for:', 'keyboard search')
    })

    it('trims whitespace from search query', async () => {
      const user = userEvent.setup()
      render(<Home />)
      
      const searchInput = screen.getByRole('textbox', { name: /search query/i })
      const searchForm = screen.getByRole('search')
      
      await user.type(searchInput, '  trimmed query  ')
      fireEvent.submit(searchForm)
      
      expect(mockConsoleLog).toHaveBeenCalledWith('Searching for:', 'trimmed query')
    })
  })

  describe('Lucky Search Functionality', () => {
    it('calls handleLuckySearch when lucky button is clicked with valid query', async () => {
      const user = userEvent.setup()
      render(<Home />)
      
      const searchInput = screen.getByRole('textbox', { name: /search query/i })
      const luckyButton = screen.getByRole('button', { name: /i'm feeling lucky/i })
      
      await user.type(searchInput, 'lucky search')
      await user.click(luckyButton)
      
      expect(mockConsoleLog).toHaveBeenCalledWith('Feeling lucky with:', 'lucky search')
    })

    it('does not call handleLuckySearch with empty query', async () => {
      const user = userEvent.setup()
      render(<Home />)
      
      const luckyButton = screen.getByRole('button', { name: /i'm feeling lucky/i })
      await user.click(luckyButton)
      
      expect(mockConsoleLog).not.toHaveBeenCalled()
    })

    it('does not call handleLuckySearch with whitespace-only query', async () => {
      const user = userEvent.setup()
      render(<Home />)
      
      const searchInput = screen.getByRole('textbox', { name: /search query/i })
      const luckyButton = screen.getByRole('button', { name: /i'm feeling lucky/i })
      
      await user.type(searchInput, '   ')
      await user.click(luckyButton)
      
      expect(mockConsoleLog).not.toHaveBeenCalled()
    })
  })

  describe('Button States', () => {
    it('disables search buttons when query is empty', () => {
      render(<Home />)
      
      const searchButton = screen.getByRole('button', { name: /hoogle search/i })
      const luckyButton = screen.getByRole('button', { name: /i'm feeling lucky/i })
      
      expect(searchButton).toBeDisabled()
      expect(luckyButton).toBeDisabled()
    })

    it('enables search buttons when query has content', async () => {
      const user = userEvent.setup()
      render(<Home />)
      
      const searchInput = screen.getByRole('textbox', { name: /search query/i })
      const searchButton = screen.getByRole('button', { name: /hoogle search/i })
      const luckyButton = screen.getByRole('button', { name: /i'm feeling lucky/i })
      
      await user.type(searchInput, 'test')
      
      expect(searchButton).not.toBeDisabled()
      expect(luckyButton).not.toBeDisabled()
    })

    it('disables search buttons when query becomes empty after having content', async () => {
      const user = userEvent.setup()
      render(<Home />)
      
      const searchInput = screen.getByRole('textbox', { name: /search query/i })
      const searchButton = screen.getByRole('button', { name: /hoogle search/i })
      const luckyButton = screen.getByRole('button', { name: /i'm feeling lucky/i })
      
      await user.type(searchInput, 'test')
      expect(searchButton).not.toBeDisabled()
      expect(luckyButton).not.toBeDisabled()
      
      await user.clear(searchInput)
      expect(searchButton).toBeDisabled()
      expect(luckyButton).toBeDisabled()
    })

    it('disables search buttons when query contains only whitespace', async () => {
      const user = userEvent.setup()
      render(<Home />)
      
      const searchInput = screen.getByRole('textbox', { name: /search query/i })
      const searchButton = screen.getByRole('button', { name: /hoogle search/i })
      const luckyButton = screen.getByRole('button', { name: /i'm feeling lucky/i })
      
      await user.type(searchInput, '   ')
      
      expect(searchButton).toBeDisabled()
      expect(luckyButton).toBeDisabled()
    })
  })

  describe('Accessibility', () => {
    it('has proper ARIA labels', () => {
      render(<Home />)
      
      expect(screen.getByLabelText(/search query/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/voice search/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/search by image/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/toggle ai mode/i)).toBeInTheDocument()
    })

    it('has proper form role', () => {
      render(<Home />)
      expect(screen.getByRole('search')).toBeInTheDocument()
    })

    it('has proper button roles and types', () => {
      render(<Home />)
      
      const searchButton = screen.getByRole('button', { name: /hoogle search/i })
      const luckyButton = screen.getByRole('button', { name: /i'm feeling lucky/i })
      
      expect(searchButton).toHaveAttribute('type', 'submit')
      expect(luckyButton).toHaveAttribute('type', 'button')
    })

    it('has proper heading structure', () => {
      render(<Home />)
      const heading = screen.getByRole('heading', { name: /hoogle/i })
      expect(heading).toHaveClass('text-8xl')
    })
  })

  describe('SEO and Meta Tags', () => {
    it('renders proper page title', () => {
      render(<Home />)
      expect(document.title).toBe('Hoogle')
    })

    it('has proper meta description', () => {
      render(<Home />)
      const metaDescription = document.querySelector('meta[name="description"]')
      expect(metaDescription).toHaveAttribute('content', 'Hoogle Search - Your gateway to finding information')
    })

    it('has proper viewport meta tag', () => {
      render(<Home />)
      const viewportMeta = document.querySelector('meta[name="viewport"]')
      expect(viewportMeta).toHaveAttribute('content', 'width=device-width, initial-scale=1')
    })

    it('has proper robots meta tag', () => {
      render(<Home />)
      const robotsMeta = document.querySelector('meta[name="robots"]')
      expect(robotsMeta).toHaveAttribute('content', 'index, follow')
    })

    it('has proper Open Graph tags', () => {
      render(<Home />)
      const ogTitle = document.querySelector('meta[property="og:title"]')
      const ogDescription = document.querySelector('meta[property="og:description"]')
      const ogType = document.querySelector('meta[property="og:type"]')
      
      expect(ogTitle).toHaveAttribute('content', 'Hoogle')
      expect(ogDescription).toHaveAttribute('content', 'Hoogle Search - Your gateway to finding information')
      expect(ogType).toHaveAttribute('content', 'website')
    })
  })

  describe('Styling and Layout', () => {
    it('applies correct CSS classes to main elements', () => {
      render(<Home />)
      
      const mainContainer = screen.getByRole('main')
      expect(mainContainer).toHaveClass('flex', 'flex-col', 'items-center', 'justify-center')
      
      const heading = screen.getByRole('heading', { name: /hoogle/i })
      expect(heading).toHaveClass('text-8xl', 'font-normal', 'text-white')
    })

    it('has proper dark theme styling', () => {
      render(<Home />)
      
      const body = document.querySelector('.min-h-screen')
      expect(body).toHaveClass('bg-gray-900', 'text-white')
    })

    it('has proper responsive classes', () => {
      render(<Home />)
      
      const searchForm = screen.getByRole('search')
      expect(searchForm).toHaveClass('w-full', 'max-w-2xl')
    })
  })

  describe('Edge Cases and Error Handling', () => {
    it('handles rapid consecutive searches', async () => {
      const user = userEvent.setup()
      render(<Home />)
      
      const searchInput = screen.getByRole('textbox', { name: /search query/i })
      const searchButton = screen.getByRole('button', { name: /hoogle search/i })
      
      await user.type(searchInput, 'rapid search')
      
      // Simulate rapid clicks
      await user.click(searchButton)
      await user.click(searchButton)
      await user.click(searchButton)
      
      expect(mockConsoleLog).toHaveBeenCalledTimes(3)
      expect(mockConsoleLog).toHaveBeenCalledWith('Searching for:', 'rapid search')
    })

    it('handles search input changes during form submission', async () => {
      const user = userEvent.setup()
      render(<Home />)
      
      const searchInput = screen.getByRole('textbox', { name: /search query/i })
      const searchForm = screen.getByRole('search')
      
      await user.type(searchInput, 'initial query')
      
      // Start form submission and immediately change input
      fireEvent.submit(searchForm)
      await user.clear(searchInput)
      await user.type(searchInput, 'changed query')
      
      expect(mockConsoleLog).toHaveBeenCalledWith('Searching for:', 'initial query')
    })

    it('maintains component state after multiple interactions', async () => {
      const user = userEvent.setup()
      render(<Home />)
      
      const searchInput = screen.getByRole('textbox', { name: /search query/i })
      const searchButton = screen.getByRole('button', { name: /hoogle search/i })
      const luckyButton = screen.getByRole('button', { name: /i'm feeling lucky/i })
      
      // Multiple interactions
      await user.type(searchInput, 'first query')
      await user.click(searchButton)
      
      await user.clear(searchInput)
      await user.type(searchInput, 'second query')
      await user.click(luckyButton)
      
      await user.clear(searchInput)
      await user.type(searchInput, 'third query')
      fireEvent.submit(screen.getByRole('search'))
      
      expect(mockConsoleLog).toHaveBeenCalledTimes(3)
      expect(mockConsoleLog).toHaveBeenNthCalledWith(1, 'Searching for:', 'first query')
      expect(mockConsoleLog).toHaveBeenNthCalledWith(2, 'Feeling lucky with:', 'second query')
      expect(mockConsoleLog).toHaveBeenNthCalledWith(3, 'Searching for:', 'third query')
    })
  })
})
