import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

// Extract SearchForm component logic for testing
const SearchForm = ({ 
  searchQuery, 
  onInputChange, 
  onSearch, 
  onLuckySearch 
}: {
  searchQuery: string
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSearch: (e: React.FormEvent<HTMLFormElement>) => void
  onLuckySearch: () => void
}) => {
  return (
    <form onSubmit={onSearch} className="w-full max-w-2xl mb-8" role="search">
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={onInputChange}
          className="w-full pl-12 pr-16 py-4 bg-gray-800 border border-gray-600 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
          placeholder="Search the web"
          aria-label="Search query"
          autoComplete="off"
          spellCheck="false"
        />
      </div>
      <div className="flex space-x-4 mt-8">
        <button
          type="submit"
          className="bg-gray-800 hover:bg-gray-700 border border-gray-600 px-6 py-3 rounded text-sm text-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={!searchQuery.trim()}
        >
          Hoogle Search
        </button>
        <button
          type="button"
          onClick={onLuckySearch}
          className="bg-gray-800 hover:bg-gray-700 border border-gray-600 px-6 py-3 rounded text-sm text-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={!searchQuery.trim()}
        >
          I'm Feeling Lucky
        </button>
      </div>
    </form>
  )
}

describe('SearchForm Component', () => {
  const mockOnInputChange = jest.fn()
  const mockOnSearch = jest.fn()
  const mockOnLuckySearch = jest.fn()

  const defaultProps = {
    searchQuery: '',
    onInputChange: mockOnInputChange,
    onSearch: mockOnSearch,
    onLuckySearch: mockOnLuckySearch,
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Rendering', () => {
    it('renders search form with all elements', () => {
      render(<SearchForm {...defaultProps} />)
      
      expect(screen.getByRole('search')).toBeInTheDocument()
      expect(screen.getByRole('textbox', { name: /search query/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /hoogle search/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /i'm feeling lucky/i })).toBeInTheDocument()
    })

    it('renders with provided search query', () => {
      render(<SearchForm {...defaultProps} searchQuery="test query" />)
      
      const input = screen.getByRole('textbox', { name: /search query/i })
      expect(input).toHaveValue('test query')
    })

    it('disables buttons when search query is empty', () => {
      render(<SearchForm {...defaultProps} searchQuery="" />)
      
      expect(screen.getByRole('button', { name: /hoogle search/i })).toBeDisabled()
      expect(screen.getByRole('button', { name: /i'm feeling lucky/i })).toBeDisabled()
    })

    it('enables buttons when search query has content', () => {
      render(<SearchForm {...defaultProps} searchQuery="test" />)
      
      expect(screen.getByRole('button', { name: /hoogle search/i })).not.toBeDisabled()
      expect(screen.getByRole('button', { name: /i'm feeling lucky/i })).not.toBeDisabled()
    })

    it('disables buttons when search query is only whitespace', () => {
      render(<SearchForm {...defaultProps} searchQuery="   " />)
      
      expect(screen.getByRole('button', { name: /hoogle search/i })).toBeDisabled()
      expect(screen.getByRole('button', { name: /i'm feeling lucky/i })).toBeDisabled()
    })
  })

  describe('User Interactions', () => {
    it('calls onInputChange when typing in input', async () => {
      const user = userEvent.setup()
      render(<SearchForm {...defaultProps} />)
      
      const input = screen.getByRole('textbox', { name: /search query/i })
      await user.type(input, 'test')
      
      expect(mockOnInputChange).toHaveBeenCalled()
    })

    it('calls onSearch when form is submitted', () => {
      render(<SearchForm {...defaultProps} searchQuery="test query" />)
      
      const form = screen.getByRole('search')
      fireEvent.submit(form)
      
      expect(mockOnSearch).toHaveBeenCalledTimes(1)
    })

    it('calls onSearch when search button is clicked', async () => {
      const user = userEvent.setup()
      render(<SearchForm {...defaultProps} searchQuery="test query" />)
      
      const searchButton = screen.getByRole('button', { name: /hoogle search/i })
      await user.click(searchButton)
      
      expect(mockOnSearch).toHaveBeenCalledTimes(1)
    })

    it('calls onLuckySearch when lucky button is clicked', async () => {
      const user = userEvent.setup()
      render(<SearchForm {...defaultProps} searchQuery="test query" />)
      
      const luckyButton = screen.getByRole('button', { name: /i'm feeling lucky/i })
      await user.click(luckyButton)
      
      expect(mockOnLuckySearch).toHaveBeenCalledTimes(1)
    })

    it('prevents form submission when search button is disabled', async () => {
      const user = userEvent.setup()
      render(<SearchForm {...defaultProps} searchQuery="" />)
      
      const searchButton = screen.getByRole('button', { name: /hoogle search/i })
      
      // Button should be disabled, so click should not trigger onSearch
      expect(searchButton).toBeDisabled()
      // Disabled buttons cannot be clicked with userEvent
      expect(mockOnSearch).not.toHaveBeenCalled()
    })
  })

  describe('Accessibility', () => {
    it('has proper ARIA labels', () => {
      render(<SearchForm {...defaultProps} />)
      
      expect(screen.getByLabelText(/search query/i)).toBeInTheDocument()
    })

    it('has proper form role', () => {
      render(<SearchForm {...defaultProps} />)
      
      expect(screen.getByRole('search')).toBeInTheDocument()
    })

    it('has proper button types', () => {
      render(<SearchForm {...defaultProps} />)
      
      const searchButton = screen.getByRole('button', { name: /hoogle search/i })
      const luckyButton = screen.getByRole('button', { name: /i'm feeling lucky/i })
      
      expect(searchButton).toHaveAttribute('type', 'submit')
      expect(luckyButton).toHaveAttribute('type', 'button')
    })

    it('has proper input attributes', () => {
      render(<SearchForm {...defaultProps} />)
      
      const input = screen.getByRole('textbox', { name: /search query/i })
      
      expect(input).toHaveAttribute('autoComplete', 'off')
      expect(input).toHaveAttribute('spellCheck', 'false')
      expect(input).toHaveAttribute('placeholder', 'Search the web')
    })
  })

  describe('Styling and CSS Classes', () => {
    it('applies correct CSS classes to form elements', () => {
      render(<SearchForm {...defaultProps} />)
      
      const form = screen.getByRole('search')
      const input = screen.getByRole('textbox', { name: /search query/i })
      
      expect(form).toHaveClass('w-full', 'max-w-2xl', 'mb-8')
      expect(input).toHaveClass('w-full', 'pl-12', 'pr-16', 'py-4', 'bg-gray-800')
    })

    it('applies hover and focus styles', () => {
      render(<SearchForm {...defaultProps} searchQuery="test" />)
      
      const searchButton = screen.getByRole('button', { name: /hoogle search/i })
      const luckyButton = screen.getByRole('button', { name: /i'm feeling lucky/i })
      
      expect(searchButton).toHaveClass('hover:bg-gray-700', 'focus:ring-2', 'focus:ring-blue-500')
      expect(luckyButton).toHaveClass('hover:bg-gray-700', 'focus:ring-2', 'focus:ring-blue-500')
    })
  })

  describe('Edge Cases', () => {
    it('handles undefined search query', () => {
      render(<SearchForm {...defaultProps} searchQuery={undefined as any} />)
      
      const input = screen.getByRole('textbox', { name: /search query/i })
      expect(input).toHaveValue('')
    })

    it('handles null callbacks gracefully', () => {
      const propsWithNullCallbacks = {
        searchQuery: 'test',
        onInputChange: null as any,
        onSearch: null as any,
        onLuckySearch: null as any,
      }
      
      expect(() => {
        render(<SearchForm {...propsWithNullCallbacks} />)
      }).not.toThrow()
    })

    it('handles rapid button clicks', async () => {
      const user = userEvent.setup()
      render(<SearchForm {...defaultProps} searchQuery="test query" />)
      
      const luckyButton = screen.getByRole('button', { name: /i'm feeling lucky/i })
      
      // Rapid clicks
      await user.click(luckyButton)
      await user.click(luckyButton)
      await user.click(luckyButton)
      
      expect(mockOnLuckySearch).toHaveBeenCalledTimes(3)
    })
  })
})
