import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Home from '../../src/pages/index'

// Mock Next.js Head component
jest.mock('next/head', () => {
  return function Head({ children }: { children: React.ReactNode }) {
    return <>{children}</>
  }
})

describe('Search Integration Tests', () => {
  let consoleSpy: jest.SpyInstance

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {})
  })

  afterEach(() => {
    consoleSpy.mockRestore()
  })

  describe('Complete Search Flow', () => {
    it('completes full search workflow with keyboard', async () => {
      const user = userEvent.setup()
      render(<Home />)

      const searchInput = screen.getByPlaceholderText('Search the web')
      
      // Type search query
      await user.type(searchInput, 'integration test query')
      expect(searchInput).toHaveValue('integration test query')

      // Submit with Enter key
      await user.keyboard('{Enter}')
      
      expect(consoleSpy).toHaveBeenCalledWith('Searching for:', 'integration test query')
    })

    it('completes full search workflow with mouse', async () => {
      const user = userEvent.setup()
      render(<Home />)

      const searchInput = screen.getByPlaceholderText('Search the web')
      const searchButton = screen.getByText('Hoogle Search')
      
      // Type search query
      await user.type(searchInput, 'mouse click test')
      expect(searchInput).toHaveValue('mouse click test')

      // Click search button
      await user.click(searchButton)
      
      expect(consoleSpy).toHaveBeenCalledWith('Searching for:', 'mouse click test')
    })

    it('completes lucky search workflow', async () => {
      const user = userEvent.setup()
      render(<Home />)

      const searchInput = screen.getByPlaceholderText('Search the web')
      const luckyButton = screen.getByText("I'm Feeling Lucky")
      
      // Type search query
      await user.type(searchInput, 'lucky search test')
      expect(searchInput).toHaveValue('lucky search test')

      // Click lucky button
      await user.click(luckyButton)
      
      expect(consoleSpy).toHaveBeenCalledWith('Feeling lucky with:', 'lucky search test')
    })
  })

  describe('User Experience Flows', () => {
    it('handles user typing, clearing, and retyping', async () => {
      const user = userEvent.setup()
      render(<Home />)

      const searchInput = screen.getByPlaceholderText('Search the web')
      
      // Type initial query
      await user.type(searchInput, 'first query')
      expect(searchInput).toHaveValue('first query')

      // Clear and type new query
      await user.clear(searchInput)
      await user.type(searchInput, 'second query')
      expect(searchInput).toHaveValue('second query')

      // Submit final query
      await user.keyboard('{Enter}')
      
      expect(consoleSpy).toHaveBeenCalledWith('Searching for:', 'second query')
    })

    it('handles rapid typing and immediate submission', async () => {
      const user = userEvent.setup()
      render(<Home />)

      const searchInput = screen.getByPlaceholderText('Search the web')
      
      // Type quickly and submit immediately
      await user.type(searchInput, 'rapid typing{Enter}')
      
      expect(consoleSpy).toHaveBeenCalledWith('Searching for:', 'rapid typing')
    })

    it('handles tab navigation between elements', async () => {
      const user = userEvent.setup()
      render(<Home />)

      // Tab through interactive elements
      await user.tab()
      expect(screen.getByText('About')).toHaveFocus()

      await user.tab()
      expect(screen.getByText('Store')).toHaveFocus()

      // Continue tabbing to reach search input
      await user.tab() // Gmail
      await user.tab() // Images
      await user.tab() // Google apps button
      await user.tab() // Sign in
      await user.tab() // Search input
      
      const searchInput = screen.getByPlaceholderText('Search the web')
      expect(searchInput).toHaveFocus()
    })
  })

  describe('Error Handling Integration', () => {
    it('prevents submission of empty queries through multiple methods', async () => {
      const user = userEvent.setup()
      render(<Home />)

      const searchInput = screen.getByPlaceholderText('Search the web')
      const searchButton = screen.getByText('Hoogle Search')
      const luckyButton = screen.getByText("I'm Feeling Lucky")

      // Try submitting empty query with Enter
      await user.click(searchInput)
      await user.keyboard('{Enter}')
      expect(consoleSpy).not.toHaveBeenCalled()

      // Try submitting empty query with search button
      await user.click(searchButton)
      expect(consoleSpy).not.toHaveBeenCalled()

      // Try submitting empty query with lucky button
      await user.click(luckyButton)
      expect(consoleSpy).not.toHaveBeenCalled()
    })

    it('handles whitespace-only queries correctly', async () => {
      const user = userEvent.setup()
      render(<Home />)

      const searchInput = screen.getByPlaceholderText('Search the web')
      
      // Type only whitespace
      await user.type(searchInput, '   ')
      await user.keyboard('{Enter}')
      
      expect(consoleSpy).not.toHaveBeenCalled()
    })
  })

  describe('Accessibility Integration', () => {
    it('maintains focus management during interactions', async () => {
      const user = userEvent.setup()
      render(<Home />)

      const searchInput = screen.getByPlaceholderText('Search the web')
      
      // Focus search input
      await user.click(searchInput)
      expect(searchInput).toHaveFocus()

      // Type and submit - focus should remain
      await user.type(searchInput, 'focus test')
      await user.keyboard('{Enter}')
      
      expect(searchInput).toHaveFocus()
      expect(consoleSpy).toHaveBeenCalledWith('Searching for:', 'focus test')
    })

    it('supports screen reader navigation', async () => {
      render(<Home />)

      // Check for proper ARIA labels
      expect(screen.getByLabelText('Search')).toBeInTheDocument()
      expect(screen.getByLabelText('Google apps')).toBeInTheDocument()
      expect(screen.getByLabelText('Search by voice')).toBeInTheDocument()
      expect(screen.getByLabelText('Search by image')).toBeInTheDocument()

      // Check for proper form structure
      expect(screen.getByRole('form')).toBeInTheDocument()
      expect(screen.getByRole('textbox')).toBeInTheDocument()
    })
  })

  describe('Performance Integration', () => {
    it('handles multiple rapid interactions without issues', async () => {
      const user = userEvent.setup()
      render(<Home />)

      const searchInput = screen.getByPlaceholderText('Search the web')
      const searchButton = screen.getByText('Hoogle Search')

      // Perform multiple rapid interactions
      for (let i = 0; i < 5; i++) {
        await user.clear(searchInput)
        await user.type(searchInput, `query ${i}`)
        await user.click(searchButton)
      }

      expect(consoleSpy).toHaveBeenCalledTimes(5)
      expect(consoleSpy).toHaveBeenLastCalledWith('Searching for:', 'query 4')
    })

    it('handles long queries efficiently', async () => {
      const user = userEvent.setup()
      render(<Home />)

      const searchInput = screen.getByPlaceholderText('Search the web')
      const longQuery = 'a'.repeat(1000)

      await user.type(searchInput, longQuery)
      await user.keyboard('{Enter}')

      expect(consoleSpy).toHaveBeenCalledWith('Searching for:', longQuery)
    })
  })
})
