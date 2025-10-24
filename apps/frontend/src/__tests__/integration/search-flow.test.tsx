import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Home from '../../pages/index'

// Mock console.log to test search functionality
const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation(() => {})

describe('Search Flow Integration Tests', () => {
  beforeEach(() => {
    mockConsoleLog.mockClear()
  })

  afterAll(() => {
    mockConsoleLog.mockRestore()
  })

  describe('Complete Search Workflow', () => {
    it('completes a full search workflow from input to submission', async () => {
      const user = userEvent.setup()
      render(<Home />)

      // 1. Verify initial state
      const searchInput = screen.getByRole('textbox', { name: /search query/i })
      const searchButton = screen.getByRole('button', { name: /hoogle search/i })
      const luckyButton = screen.getByRole('button', { name: /i'm feeling lucky/i })

      expect(searchInput).toHaveValue('')
      expect(searchButton).toBeDisabled()
      expect(luckyButton).toBeDisabled()

      // 2. Type search query
      await user.type(searchInput, 'integration test query')
      expect(searchInput).toHaveValue('integration test query')
      expect(searchButton).not.toBeDisabled()
      expect(luckyButton).not.toBeDisabled()

      // 3. Submit search
      await user.click(searchButton)
      expect(mockConsoleLog).toHaveBeenCalledWith('Searching for:', 'integration test query')

      // 4. Verify state after search
      expect(searchInput).toHaveValue('integration test query')
      expect(searchButton).not.toBeDisabled()
      expect(luckyButton).not.toBeDisabled()
    })

    it('completes a full lucky search workflow', async () => {
      const user = userEvent.setup()
      render(<Home />)

      const searchInput = screen.getByRole('textbox', { name: /search query/i })
      const luckyButton = screen.getByRole('button', { name: /i'm feeling lucky/i })

      // Type and submit lucky search
      await user.type(searchInput, 'lucky integration test')
      await user.click(luckyButton)

      expect(mockConsoleLog).toHaveBeenCalledWith('Feeling lucky with:', 'lucky integration test')
    })

    it('handles multiple search operations in sequence', async () => {
      const user = userEvent.setup()
      render(<Home />)

      const searchInput = screen.getByRole('textbox', { name: /search query/i })
      const searchButton = screen.getByRole('button', { name: /hoogle search/i })
      const luckyButton = screen.getByRole('button', { name: /i'm feeling lucky/i })

      // First search
      await user.type(searchInput, 'first search')
      await user.click(searchButton)
      expect(mockConsoleLog).toHaveBeenCalledWith('Searching for:', 'first search')

      // Modify query and do lucky search
      await user.clear(searchInput)
      await user.type(searchInput, 'second search')
      await user.click(luckyButton)
      expect(mockConsoleLog).toHaveBeenCalledWith('Feeling lucky with:', 'second search')

      // Third search via form submission
      await user.clear(searchInput)
      await user.type(searchInput, 'third search')
      fireEvent.submit(screen.getByRole('search'))
      expect(mockConsoleLog).toHaveBeenCalledWith('Searching for:', 'third search')

      expect(mockConsoleLog).toHaveBeenCalledTimes(3)
    })
  })

  describe('User Interaction Patterns', () => {
    it('handles keyboard navigation and shortcuts', async () => {
      const user = userEvent.setup()
      render(<Home />)

      const searchInput = screen.getByRole('textbox', { name: /search query/i })

      // Focus input and type
      await user.click(searchInput)
      await user.type(searchInput, 'keyboard test')

      // Submit via Enter key
      await user.keyboard('{Enter}')
      expect(mockConsoleLog).toHaveBeenCalledWith('Searching for:', 'keyboard test')
    })

    it('handles tab navigation between interactive elements', async () => {
      const user = userEvent.setup()
      render(<Home />)

      // Tab through interactive elements
      await user.tab()
      expect(screen.getByRole('link', { name: /about/i })).toHaveFocus()

      await user.tab()
      expect(screen.getByRole('link', { name: /store/i })).toHaveFocus()

      // Continue tabbing to reach search input
      await user.tab() // Gmail
      await user.tab() // Images
      await user.tab() // Menu button
      await user.tab() // Sign in
      await user.tab() // Search input
      expect(screen.getByRole('textbox', { name: /search query/i })).toHaveFocus()
    })

    it('maintains focus management during interactions', async () => {
      const user = userEvent.setup()
      render(<Home />)

      const searchInput = screen.getByRole('textbox', { name: /search query/i })
      const searchButton = screen.getByRole('button', { name: /hoogle search/i })

      // Focus input, type, and click button
      await user.click(searchInput)
      await user.type(searchInput, 'focus test')
      await user.click(searchButton)

      // Input should still be focusable after search
      await user.click(searchInput)
      expect(searchInput).toHaveFocus()
    })
  })

  describe('Error Recovery and Edge Cases', () => {
    it('recovers from empty search attempts', async () => {
      const user = userEvent.setup()
      render(<Home />)

      const searchInput = screen.getByRole('textbox', { name: /search query/i })
      const searchButton = screen.getByRole('button', { name: /hoogle search/i })

      // Try to search with empty input
      await user.click(searchButton) // Should not work since button is disabled
      expect(mockConsoleLog).not.toHaveBeenCalled()

      // Add content and try again
      await user.type(searchInput, 'recovery test')
      await user.click(searchButton)
      expect(mockConsoleLog).toHaveBeenCalledWith('Searching for:', 'recovery test')
    })

    it('handles rapid user interactions gracefully', async () => {
      const user = userEvent.setup()
      render(<Home />)

      const searchInput = screen.getByRole('textbox', { name: /search query/i })
      const searchButton = screen.getByRole('button', { name: /hoogle search/i })
      const luckyButton = screen.getByRole('button', { name: /i'm feeling lucky/i })

      // Rapid typing and clicking
      await user.type(searchInput, 'rapid')
      await user.click(searchButton)
      await user.type(searchInput, ' test')
      await user.click(luckyButton)
      await user.clear(searchInput)
      await user.type(searchInput, 'final test')
      fireEvent.submit(screen.getByRole('search'))

      // Should handle all interactions
      expect(mockConsoleLog).toHaveBeenCalledTimes(3)
    })

    it('maintains component stability during stress testing', async () => {
      const user = userEvent.setup()
      render(<Home />)

      const searchInput = screen.getByRole('textbox', { name: /search query/i })
      const searchButton = screen.getByRole('button', { name: /hoogle search/i })

      // Perform many operations
      for (let i = 0; i < 10; i++) {
        await user.clear(searchInput)
        await user.type(searchInput, `stress test ${i}`)
        await user.click(searchButton)
      }

      expect(mockConsoleLog).toHaveBeenCalledTimes(10)
      expect(searchInput).toBeInTheDocument()
      expect(searchButton).toBeInTheDocument()
    })
  })

  describe('Accessibility Integration', () => {
    it('maintains accessibility during complete user flows', async () => {
      const user = userEvent.setup()
      render(<Home />)

      // Verify ARIA labels are present throughout interaction
      const searchInput = screen.getByLabelText(/search query/i)
      expect(searchInput).toBeInTheDocument()

      await user.type(searchInput, 'accessibility test')
      
      // Verify buttons have proper labels
      const searchButton = screen.getByRole('button', { name: /hoogle search/i })
      const luckyButton = screen.getByRole('button', { name: /i'm feeling lucky/i })
      
      expect(searchButton).toHaveAttribute('type', 'submit')
      expect(luckyButton).toHaveAttribute('type', 'button')

      await user.click(searchButton)
      expect(mockConsoleLog).toHaveBeenCalledWith('Searching for:', 'accessibility test')
    })

    it('supports screen reader navigation patterns', async () => {
      render(<Home />)

      // Verify semantic structure
      expect(screen.getByRole('search')).toBeInTheDocument()
      expect(screen.getByRole('main')).toBeInTheDocument()
      expect(screen.getByRole('heading', { name: /hoogle/i })).toBeInTheDocument()

      // Verify form structure
      const form = screen.getByRole('search')
      const input = screen.getByRole('textbox', { name: /search query/i })
      const submitButton = screen.getByRole('button', { name: /hoogle search/i })

      expect(form).toContainElement(input)
      expect(form).toContainElement(submitButton)
    })
  })

  describe('Performance and Responsiveness', () => {
    it('handles large input values efficiently', async () => {
      const user = userEvent.setup()
      render(<Home />)

      const searchInput = screen.getByRole('textbox', { name: /search query/i })
      const largeInput = 'a'.repeat(1000)

      const startTime = performance.now()
      await user.type(searchInput, largeInput)
      const endTime = performance.now()

      expect(searchInput).toHaveValue(largeInput)
      // Should complete within reasonable time (less than 5 seconds)
      expect(endTime - startTime).toBeLessThan(5000)
    })

    it('maintains responsiveness during rapid state changes', async () => {
      const user = userEvent.setup()
      render(<Home />)

      const searchInput = screen.getByRole('textbox', { name: /search query/i })
      const searchButton = screen.getByRole('button', { name: /hoogle search/i })

      // Rapid state changes
      for (let i = 0; i < 50; i++) {
        await user.type(searchInput, 'a')
        await user.clear(searchInput)
      }

      // Component should still be responsive
      await user.type(searchInput, 'final test')
      expect(searchInput).toHaveValue('final test')
      expect(searchButton).not.toBeDisabled()
    })
  })
})
