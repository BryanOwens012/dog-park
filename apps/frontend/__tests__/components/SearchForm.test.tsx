import { render, screen, fireEvent } from '@testing-library/react'
import { useState } from 'react'

// Extract SearchForm component for testing
const SearchForm = ({ 
  onSearch, 
  onLuckySearch 
}: { 
  onSearch: (query: string) => void
  onLuckySearch: (query: string) => void 
}) => {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!searchQuery.trim()) return
    onSearch(searchQuery.trim())
  }

  const handleLuckySearch = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (!searchQuery.trim()) return
    onLuckySearch(searchQuery.trim())
  }

  return (
    <form onSubmit={handleSearch} role="form">
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-16 py-4 bg-gray-800 border border-gray-600 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
          placeholder="Search the web"
          aria-label="Search"
          autoComplete="off"
        />
      </div>
      <div className="flex space-x-4 mb-8">
        <button
          type="submit"
          className="bg-gray-800 hover:bg-gray-700 border border-gray-600 px-6 py-3 rounded text-sm text-gray-300 hover:text-white transition-colors"
        >
          Hoogle Search
        </button>
        <button
          type="button"
          onClick={handleLuckySearch}
          className="bg-gray-800 hover:bg-gray-700 border border-gray-600 px-6 py-3 rounded text-sm text-gray-300 hover:text-white transition-colors"
        >
          I'm Feeling Lucky
        </button>
      </div>
    </form>
  )
}

describe('SearchForm Component', () => {
  const mockOnSearch = jest.fn()
  const mockOnLuckySearch = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders search form elements', () => {
    render(<SearchForm onSearch={mockOnSearch} onLuckySearch={mockOnLuckySearch} />)
    
    expect(screen.getByPlaceholderText('Search the web')).toBeInTheDocument()
    expect(screen.getByText('Hoogle Search')).toBeInTheDocument()
    expect(screen.getByText("I'm Feeling Lucky")).toBeInTheDocument()
  })

  it('calls onSearch when form is submitted with valid query', () => {
    render(<SearchForm onSearch={mockOnSearch} onLuckySearch={mockOnLuckySearch} />)
    
    const input = screen.getByPlaceholderText('Search the web')
    const form = screen.getByRole('form')
    
    fireEvent.change(input, { target: { value: 'test query' } })
    fireEvent.submit(form)
    
    expect(mockOnSearch).toHaveBeenCalledWith('test query')
    expect(mockOnLuckySearch).not.toHaveBeenCalled()
  })

  it('calls onLuckySearch when lucky button is clicked with valid query', () => {
    render(<SearchForm onSearch={mockOnSearch} onLuckySearch={mockOnLuckySearch} />)
    
    const input = screen.getByPlaceholderText('Search the web')
    const luckyButton = screen.getByText("I'm Feeling Lucky")
    
    fireEvent.change(input, { target: { value: 'lucky query' } })
    fireEvent.click(luckyButton)
    
    expect(mockOnLuckySearch).toHaveBeenCalledWith('lucky query')
    expect(mockOnSearch).not.toHaveBeenCalled()
  })

  it('does not call callbacks with empty query', () => {
    render(<SearchForm onSearch={mockOnSearch} onLuckySearch={mockOnLuckySearch} />)
    
    const form = screen.getByRole('form')
    const luckyButton = screen.getByText("I'm Feeling Lucky")
    
    fireEvent.submit(form)
    fireEvent.click(luckyButton)
    
    expect(mockOnSearch).not.toHaveBeenCalled()
    expect(mockOnLuckySearch).not.toHaveBeenCalled()
  })

  it('trims whitespace from queries', () => {
    render(<SearchForm onSearch={mockOnSearch} onLuckySearch={mockOnLuckySearch} />)
    
    const input = screen.getByPlaceholderText('Search the web')
    const form = screen.getByRole('form')
    
    fireEvent.change(input, { target: { value: '  trimmed query  ' } })
    fireEvent.submit(form)
    
    expect(mockOnSearch).toHaveBeenCalledWith('trimmed query')
  })

  it('updates input value when typing', () => {
    render(<SearchForm onSearch={mockOnSearch} onLuckySearch={mockOnLuckySearch} />)
    
    const input = screen.getByPlaceholderText('Search the web')
    
    fireEvent.change(input, { target: { value: 'typing test' } })
    
    expect(input).toHaveValue('typing test')
  })

  it('handles multiple rapid submissions', () => {
    render(<SearchForm onSearch={mockOnSearch} onLuckySearch={mockOnLuckySearch} />)
    
    const input = screen.getByPlaceholderText('Search the web')
    const form = screen.getByRole('form')
    
    fireEvent.change(input, { target: { value: 'query 1' } })
    fireEvent.submit(form)
    
    fireEvent.change(input, { target: { value: 'query 2' } })
    fireEvent.submit(form)
    
    expect(mockOnSearch).toHaveBeenCalledTimes(2)
    expect(mockOnSearch).toHaveBeenNthCalledWith(1, 'query 1')
    expect(mockOnSearch).toHaveBeenNthCalledWith(2, 'query 2')
  })
})
