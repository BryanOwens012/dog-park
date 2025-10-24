import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

// Extract SearchForm component for isolated testing
const SearchForm = ({ 
  searchQuery, 
  onInputChange, 
  onSearch, 
  onLuckySearch 
}: {
  searchQuery: string
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSearch: (e: React.FormEvent) => void
  onLuckySearch: () => void
}) => {
  return (
    <div>
      <form onSubmit={onSearch} className="w-full max-w-2xl mb-8">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={onInputChange}
            className="w-full pl-12 pr-16 py-4 bg-gray-800 border border-gray-600 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
            placeholder="Search the web"
            aria-label="Search"
            autoComplete="off"
          />
          <div className="absolute inset-y-0 right-0 flex items-center space-x-3 pr-4">
            <button 
              type="button" 
              className="p-2 hover:bg-gray-700 rounded transition-colors"
              aria-label="Search by voice"
            >
              <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"/>
              </svg>
            </button>
            <button 
              type="button" 
              className="p-2 hover:bg-gray-700 rounded transition-colors"
              aria-label="Search by image"
            >
              <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
              </svg>
            </button>
          </div>
        </div>
      </form>

      <div className="flex space-x-4 mb-8">
        <button
          type="submit"
          className="bg-gray-800 hover:bg-gray-700 border border-gray-600 px-6 py-3 rounded text-sm text-gray-300 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!searchQuery.trim()}
        >
          Hoogle Search
        </button>
        <button
          type="button"
          onClick={onLuckySearch}
          className="bg-gray-800 hover:bg-gray-700 border border-gray-600 px-6 py-3 rounded text-sm text-gray-300 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!searchQuery.trim()}
        >
          I'm Feeling Lucky
        </button>
      </div>
    </div>
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

  describe('Input Handling', () => {
    it('calls onInputChange when typing', async () => {
      const user = userEvent.setup()
      render(<SearchForm {...defaultProps} />)
      
      const input = screen.getByRole('textbox')
      await user.type(input, 'test')
      
      expect(mockOnInputChange).toHaveBeenCalledTimes(4) // One for each character
    })

    it('displays the current search query', () => {
      render(<SearchForm {...defaultProps} searchQuery="current query" />)
      
      const input = screen.getByRole('textbox')
      expect(input).toHaveValue('current query')
    })

    it('has correct input attributes', () => {
      render(<SearchForm {...defaultProps} />)
      
      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('type', 'text')
      expect(input).toHaveAttribute('placeholder', 'Search the web')
      expect(input).toHaveAttribute('aria-label', 'Search')
      expect(input).toHaveAttribute('autocomplete', 'off')
    })
  })

  describe('Form Submission', () => {
    it('calls onSearch when form is submitted', () => {
      render(<SearchForm {...defaultProps} searchQuery="test query" />)
      
      const form = screen.getByRole('textbox').closest('form')
      fireEvent.submit(form!)
      
      expect(mockOnSearch).toHaveBeenCalledTimes(1)
    })

    it('prevents default form submission', () => {
      render(<SearchForm {...defaultProps} searchQuery="test query" />)
      
      const form = screen.getByRole('textbox').closest('form')
      const event = new Event('submit', { bubbles: true, cancelable: true })
      const preventDefaultSpy = jest.spyOn(event, 'preventDefault')
      
      form?.dispatchEvent(event)
      
      expect(preventDefaultSpy).toHaveBeenCalled()
    })
  })

  describe('Button States', () => {
    it('disables buttons when search query is empty', () => {
      render(<SearchForm {...defaultProps} searchQuery="" />)
      
      const searchButton = screen.getByRole('button', { name: /hoogle search/i })
      const luckyButton = screen.getByRole('button', { name: /i'm feeling lucky/i })
      
      expect(searchButton).toBeDisabled()
      expect(luckyButton).toBeDisabled()
    })

    it('disables buttons when search query is only whitespace', () => {
      render(<SearchForm {...defaultProps} searchQuery="   " />)
      
      const searchButton = screen.getByRole('button', { name: /hoogle search/i })
      const luckyButton = screen.getByRole('button', { name: /i'm feeling lucky/i })
      
      expect(searchButton).toBeDisabled()
      expect(luckyButton).toBeDisabled()
    })

    it('enables buttons when search query has content', () => {
      render(<SearchForm {...defaultProps} searchQuery="valid query" />)
      
      const searchButton = screen.getByRole('button', { name: /hoogle search/i })
      const luckyButton = screen.getByRole('button', { name: /i'm feeling lucky/i })
      
      expect(searchButton).toBeEnabled()
      expect(luckyButton).toBeEnabled()
    })
  })

  describe('Lucky Search', () => {
    it('calls onLuckySearch when lucky button is clicked', async () => {
      const user = userEvent.setup()
      render(<SearchForm {...defaultProps} searchQuery="lucky query" />)
      
      const luckyButton = screen.getByRole('button', { name: /i'm feeling lucky/i })
      await user.click(luckyButton)
      
      expect(mockOnLuckySearch).toHaveBeenCalledTimes(1)
    })

    it('does not call onLuckySearch when button is disabled', async () => {
      const user = userEvent.setup()
      render(<SearchForm {...defaultProps} searchQuery="" />)
      
      const luckyButton = screen.getByRole('button', { name: /i'm feeling lucky/i })
      
      // Try to click disabled button
      await user.click(luckyButton)
      
      expect(mockOnLuckySearch).not.toHaveBeenCalled()
    })
  })

  describe('Voice and Image Search Buttons', () => {
    it('renders voice search button with correct attributes', () => {
      render(<SearchForm {...defaultProps} />)
      
      const voiceButton = screen.getByRole('button', { name: /search by voice/i })
      expect(voiceButton).toBeInTheDocument()
      expect(voiceButton).toHaveAttribute('type', 'button')
      expect(voiceButton).toHaveAttribute('aria-label', 'Search by voice')
    })

    it('renders image search button with correct attributes', () => {
      render(<SearchForm {...defaultProps} />)
      
      const imageButton = screen.getByRole('button', { name: /search by image/i })
      expect(imageButton).toBeInTheDocument()
      expect(imageButton).toHaveAttribute('type', 'button')
      expect(imageButton).toHaveAttribute('aria-label', 'Search by image')
    })

    it('voice and image buttons do not trigger form submission', async () => {
      const user = userEvent.setup()
      render(<SearchForm {...defaultProps} searchQuery="test" />)
      
      const voiceButton = screen.getByRole('button', { name: /search by voice/i })
      const imageButton = screen.getByRole('button', { name: /search by image/i })
      
      await user.click(voiceButton)
      await user.click(imageButton)
      
      expect(mockOnSearch).not.toHaveBeenCalled()
    })
  })

  describe('CSS Classes and Styling', () => {
    it('applies correct CSS classes to input', () => {
      render(<SearchForm {...defaultProps} />)
      
      const input = screen.getByRole('textbox')
      expect(input).toHaveClass(
        'w-full',
        'pl-12',
        'pr-16',
        'py-4',
        'bg-gray-800',
        'border',
        'border-gray-600',
        'rounded-full',
        'text-white',
        'placeholder-gray-400',
        'focus:outline-none',
        'focus:ring-2',
        'focus:ring-blue-500',
        'focus:border-transparent',
        'text-lg'
      )
    })

    it('applies correct CSS classes to buttons', () => {
      render(<SearchForm {...defaultProps} />)
      
      const searchButton = screen.getByRole('button', { name: /hoogle search/i })
      const luckyButton = screen.getByRole('button', { name: /i'm feeling lucky/i })
      
      const expectedClasses = [
        'bg-gray-800',
        'hover:bg-gray-700',
        'border',
        'border-gray-600',
        'px-6',
        'py-3',
        'rounded',
        'text-sm',
        'text-gray-300',
        'hover:text-white',
        'transition-colors',
        'disabled:opacity-50',
        'disabled:cursor-not-allowed'
      ]
      
      expectedClasses.forEach(className => {
        expect(searchButton).toHaveClass(className)
        expect(luckyButton).toHaveClass(className)
      })
    })
  })

  describe('Accessibility Features', () => {
    it('has proper form structure', () => {
      render(<SearchForm {...defaultProps} />)
      
      const form = screen.getByRole('textbox').closest('form')
      expect(form).toBeInTheDocument()
    })

    it('maintains proper tab order', async () => {
      const user = userEvent.setup()
      render(<SearchForm {...defaultProps} />)
      
      // Tab through elements
      await user.tab()
      expect(screen.getByRole('textbox')).toHaveFocus()
      
      await user.tab()
      expect(screen.getByRole('button', { name: /search by voice/i })).toHaveFocus()
      
      await user.tab()
      expect(screen.getByRole('button', { name: /search by image/i })).toHaveFocus()
    })

    it('supports keyboard navigation', async () => {
      const user = userEvent.setup()
      render(<SearchForm {...defaultProps} searchQuery="test" />)
      
      const input = screen.getByRole('textbox')
      await user.click(input)
      await user.keyboard('{Enter}')
      
      expect(mockOnSearch).toHaveBeenCalled()
    })
  })
})
