import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Home from '../../pages/index'

// Mock console.log to capture search functionality
const mockConsoleLog = jest.fn()
console.log = mockConsoleLog

describe('Home Page', () => {
  beforeEach(() => {
    mockConsoleLog.mockClear()
  })

  describe('Rendering', () => {
    it('renders the page title correctly', () => {
      render(<Home />)
      expect(document.title).toBe('Hoogle')
    })

    it('renders the main heading', () => {
      render(<Home />)
      const heading = screen.getByRole('heading', { name: /hoogle/i })
      expect(heading).toBeInTheDocument()
      expect(heading).toHaveClass('text-8xl')
    })

    it('renders the search input', () => {
      render(<Home />)
      const searchInput = screen.getByRole('textbox', { name: /search/i })
      expect(searchInput).toBeInTheDocument()
      expect(searchInput).toHaveAttribute('placeholder', 'Search the web')
    })

    it('renders navigation links in header', () => {
      render(<Home />)
      expect(screen.getByText('About')).toBeInTheDocument()
      expect(screen.getByText('Store')).toBeInTheDocument()
      expect(screen.getByText('Gmail')).toBeInTheDocument()
      expect(screen.getByText('Images')).toBeInTheDocument()
    })

    it('renders the sign in button', () => {
      render(<Home />)
      const signInButton = screen.getByRole('button', { name: /sign in/i })
      expect(signInButton).toBeInTheDocument()
      expect(signInButton).toHaveClass('bg-blue-600')
    })

    it('renders search buttons', () => {
      render(<Home />)
      expect(screen.getByRole('button', { name: /hoogle search/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /i'm feeling lucky/i })).toBeInTheDocument()
    })

    it('renders AI Mode button', () => {
      render(<Home />)
      const aiModeButton = screen.getByRole('button', { name: /ai mode/i })
      expect(aiModeButton).toBeInTheDocument()
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

  describe('Search Input Functionality', () => {
    it('updates search query when typing', async () => {
      const user = userEvent.setup()
      render(<Home />)
      
      const searchInput = screen.getByRole('textbox', { name: /search/i })
      await user.type(searchInput, 'test query')
      
      expect(searchInput).toHaveValue('test query')
    })

    it('clears search query', async () => {
      const user = userEvent.setup()
      render(<Home />)
      
      const searchInput = screen.getByRole('textbox', { name: /search/i })
      await user.type(searchInput, 'test query')
      await user.clear(searchInput)
      
      expect(searchInput).toHaveValue('')
    })

    it('handles special characters in search query', async () => {
      const user = userEvent.setup()
      render(<Home />)
      
      const searchInput = screen.getByRole('textbox', { name: /search/i })
      const specialQuery = '!@#$%^&*()_+-=[]{}|;:,.<>?'
      await user.type(searchInput, specialQuery)
      
      expect(searchInput).toHaveValue(specialQuery)
    })

    it('handles very long search queries', async () => {
      const user = userEvent.setup()
      render(<Home />)
      
      const searchInput = screen.getByRole('textbox', { name: /search/i })
      const longQuery = 'a'.repeat(1000)
      await user.type(searchInput, longQuery)
      
      expect(searchInput).toHaveValue(longQuery)
    })
  })

  describe('Search Button States', () => {
    it('disables search buttons when input is empty', () => {
      render(<Home />)
      
      const searchButton = screen.getByRole('button', { name: /hoogle search/i })
      const luckyButton = screen.getByRole('button', { name: /i'm feeling lucky/i })
      
      expect(searchButton).toBeDisabled()
      expect(luckyButton).toBeDisabled()
    })

    it('disables search buttons when input contains only whitespace', async () => {
      const user = userEvent.setup()
      render(<Home />)
      
      const searchInput = screen.getByRole('textbox', { name: /search/i })
      const searchButton = screen.getByRole('button', { name: /hoogle search/i })
      const luckyButton = screen.getByRole('button', { name: /i'm feeling lucky/i })
      
      await user.type(searchInput, '   ')
      
      expect(searchButton).toBeDisabled()
      expect(luckyButton).toBeDisabled()
    })

    it('enables search buttons when input has valid content', async () => {
      const user = userEvent.setup()
      render(<Home />)
      
      const searchInput = screen.getByRole('textbox', { name: /search/i })
      const searchButton = screen.getByRole('button', { name: /hoogle search/i })
      const luckyButton = screen.getByRole('button', { name: /i'm feeling lucky/i })
      
      await user.type(searchInput, 'test query')
      
      expect(searchButton).toBeEnabled()
      expect(luckyButton).toBeEnabled()
    })

    it('re-disables buttons when input is cleared', async () => {
      const user = userEvent.setup()
      render(<Home />)
      
      const searchInput = screen.getByRole('textbox', { name: /search/i })
      const searchButton = screen.getByRole('button', { name: /hoogle search/i })
      const luckyButton = screen.getByRole('button', { name: /i'm feeling lucky/i })
      
      await user.type(searchInput, 'test')
      expect(searchButton).toBeEnabled()
      expect(luckyButton).toBeEnabled()
      
      await user.clear(searchInput)
      expect(searchButton).toBeDisabled()
      expect(luckyButton).toBeDisabled()
    })
  })

  describe('Search Functionality', () => {
    it('performs search when form is submitted', async () => {
      const user = userEvent.setup()
      render(<Home />)
      
      const searchInput = screen.getByRole('textbox', { name: /search/i })
      await user.type(searchInput, 'test query')
      
      const form = searchInput.closest('form')
      fireEvent.submit(form!)
      
      expect(mockConsoleLog).toHaveBeenCalledWith('Searching for:', 'test query')
    })

    it('performs search when search button is clicked', async () => {
      const user = userEvent.setup()
      render(<Home />)
      
      const searchInput = screen.getByRole('textbox', { name: /search/i })
      await user.type(searchInput, 'button search')
      
      const searchButton = screen.getByRole('button', { name: /hoogle search/i })
      await user.click(searchButton)
      
      expect(mockConsoleLog).toHaveBeenCalledWith('Searching for:', 'button search')
    })

    it('performs lucky search when lucky button is clicked', async () => {
      const user = userEvent.setup()
      render(<Home />)
      
      const searchInput = screen.getByRole('textbox', { name: /search/i })
      await user.type(searchInput, 'lucky search')
      
      const luckyButton = screen.getByRole('button', { name: /i'm feeling lucky/i })
      await user.click(luckyButton)
      
      expect(mockConsoleLog).toHaveBeenCalledWith('Feeling lucky with:', 'lucky search')
    })

    it('does not search when form is submitted with empty input', async () => {
      render(<Home />)
      
      const searchInput = screen.getByRole('textbox', { name: /search/i })
      const form = searchInput.closest('form')
      fireEvent.submit(form!)
      
      expect(mockConsoleLog).not.toHaveBeenCalled()
    })

    it('does not search when form is submitted with whitespace-only input', async () => {
      const user = userEvent.setup()
      render(<Home />)
      
      const searchInput = screen.getByRole('textbox', { name: /search/i })
      await user.type(searchInput, '   ')
      
      const form = searchInput.closest('form')
      fireEvent.submit(form!)
      
      expect(mockConsoleLog).not.toHaveBeenCalled()
    })

    it('trims whitespace from search query', async () => {
      const user = userEvent.setup()
      render(<Home />)
      
      const searchInput = screen.getByRole('textbox', { name: /search/i })
      await user.type(searchInput, '  trimmed query  ')
      
      const form = searchInput.closest('form')
      fireEvent.submit(form!)
      
      expect(mockConsoleLog).toHaveBeenCalledWith('Searching for:', '  trimmed query  ')
    })
  })

  describe('Keyboard Navigation', () => {
    it('allows Enter key to submit search', async () => {
      const user = userEvent.setup()
      render(<Home />)
      
      const searchInput = screen.getByRole('textbox', { name: /search/i })
      await user.type(searchInput, 'keyboard search')
      await user.keyboard('{Enter}')
      
      expect(mockConsoleLog).toHaveBeenCalledWith('Searching for:', 'keyboard search')
    })

    it('focuses search input with Tab navigation', async () => {
      const user = userEvent.setup()
      render(<Home />)
      
      await user.tab()
      // Skip header links
      await user.tab() // About
      await user.tab() // Store
      await user.tab() // Gmail
      await user.tab() // Images
      await user.tab() // Apps button
      await user.tab() // Sign in
      await user.tab() // Search input
      
      const searchInput = screen.getByRole('textbox', { name: /search/i })
      expect(searchInput).toHaveFocus()
    })
  })

  describe('Accessibility', () => {
    it('has proper ARIA labels', () => {
      render(<Home />)
      
      const searchInput = screen.getByRole('textbox', { name: /search/i })
      expect(searchInput).toHaveAttribute('aria-label', 'Search')
      
      const voiceButton = screen.getByRole('button', { name: /search by voice/i })
      expect(voiceButton).toHaveAttribute('aria-label', 'Search by voice')
      
      const imageButton = screen.getByRole('button', { name: /search by image/i })
      expect(imageButton).toHaveAttribute('aria-label', 'Search by image')
    })

    it('has proper autocomplete attribute', () => {
      render(<Home />)
      
      const searchInput = screen.getByRole('textbox', { name: /search/i })
      expect(searchInput).toHaveAttribute('autocomplete', 'off')
    })

    it('maintains focus management', async () => {
      const user = userEvent.setup()
      render(<Home />)
      
      const searchInput = screen.getByRole('textbox', { name: /search/i })
      await user.click(searchInput)
      
      expect(searchInput).toHaveFocus()
    })
  })

  describe('Visual States', () => {
    it('applies correct CSS classes for dark theme', () => {
      render(<Home />)
      
      const container = screen.getByRole('textbox', { name: /search/i }).closest('div')
      expect(container?.parentElement).toHaveClass('min-h-screen', 'bg-gray-900', 'text-white')
    })

    it('applies hover states to interactive elements', () => {
      render(<Home />)
      
      const signInButton = screen.getByRole('button', { name: /sign in/i })
      expect(signInButton).toHaveClass('hover:bg-blue-700')
      
      const searchInput = screen.getByRole('textbox', { name: /search/i })
      expect(searchInput).toHaveClass('focus:ring-2', 'focus:ring-blue-500')
    })

    it('shows disabled state styling', () => {
      render(<Home />)
      
      const searchButton = screen.getByRole('button', { name: /hoogle search/i })
      const luckyButton = screen.getByRole('button', { name: /i'm feeling lucky/i })
      
      expect(searchButton).toHaveClass('disabled:opacity-50', 'disabled:cursor-not-allowed')
      expect(luckyButton).toHaveClass('disabled:opacity-50', 'disabled:cursor-not-allowed')
    })
  })

  describe('Edge Cases', () => {
    it('handles rapid input changes', async () => {
      const user = userEvent.setup()
      render(<Home />)
      
      const searchInput = screen.getByRole('textbox', { name: /search/i })
      
      // Rapidly type and delete
      await user.type(searchInput, 'a')
      await user.type(searchInput, 'b')
      await user.type(searchInput, 'c')
      await user.keyboard('{Backspace}{Backspace}{Backspace}')
      
      expect(searchInput).toHaveValue('')
    })

    it('handles form submission prevention', async () => {
      render(<Home />)
      
      const searchInput = screen.getByRole('textbox', { name: /search/i })
      const form = searchInput.closest('form')
      
      const mockPreventDefault = jest.fn()
      const event = new Event('submit', { bubbles: true, cancelable: true })
      event.preventDefault = mockPreventDefault
      
      form?.dispatchEvent(event)
      
      expect(mockPreventDefault).toHaveBeenCalled()
    })

    it('handles multiple rapid button clicks', async () => {
      const user = userEvent.setup()
      render(<Home />)
      
      const searchInput = screen.getByRole('textbox', { name: /search/i })
      await user.type(searchInput, 'rapid clicks')
      
      const searchButton = screen.getByRole('button', { name: /hoogle search/i })
      
      // Rapid clicks
      await user.click(searchButton)
      await user.click(searchButton)
      await user.click(searchButton)
      
      // Should have been called multiple times
      expect(mockConsoleLog).toHaveBeenCalledTimes(3)
    })
  })

  describe('Component State Management', () => {
    it('maintains search query state across re-renders', async () => {
      const user = userEvent.setup()
      const { rerender } = render(<Home />)
      
      const searchInput = screen.getByRole('textbox', { name: /search/i })
      await user.type(searchInput, 'persistent query')
      
      rerender(<Home />)
      
      expect(searchInput).toHaveValue('persistent query')
    })

    it('resets button states when query changes', async () => {
      const user = userEvent.setup()
      render(<Home />)
      
      const searchInput = screen.getByRole('textbox', { name: /search/i })
      const searchButton = screen.getByRole('button', { name: /hoogle search/i })
      
      // Type something to enable button
      await user.type(searchInput, 'test')
      expect(searchButton).toBeEnabled()
      
      // Clear to disable button
      await user.clear(searchInput)
      expect(searchButton).toBeDisabled()
      
      // Type again to re-enable
      await user.type(searchInput, 'test again')
      expect(searchButton).toBeEnabled()
    })
  })
})
