import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Home from '../src/pages/index'

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
    // Mock console.log to test form submission
    jest.spyOn(console, 'log').mockImplementation(() => {})
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  describe('Happy Path - Rendering', () => {
    it('renders the main heading', () => {
      render(<Home />)
      expect(screen.getByText('What can I help with?')).toBeInTheDocument()
    })

    it('renders the header with logo and navigation', () => {
      render(<Home />)
      expect(screen.getByText('ChatGPT')).toBeInTheDocument()
      expect(screen.getByText('Log in')).toBeInTheDocument()
      expect(screen.getByText('Sign up for free')).toBeInTheDocument()
    })

    it('renders the message input textarea', () => {
      render(<Home />)
      expect(screen.getByPlaceholderText('Ask anything')).toBeInTheDocument()
    })

    it('renders all action buttons', () => {
      render(<Home />)
      expect(screen.getByTitle('Attach')).toBeInTheDocument()
      expect(screen.getByTitle('Search')).toBeInTheDocument()
      expect(screen.getByTitle('Voice')).toBeInTheDocument()
    })

    it('renders footer links', () => {
      render(<Home />)
      expect(screen.getByText('Terms')).toBeInTheDocument()
      expect(screen.getByText('Privacy Policy')).toBeInTheDocument()
    })
  })

  describe('Happy Path - User Interactions', () => {
    it('allows typing in the textarea', async () => {
      const user = userEvent.setup()
      render(<Home />)
      
      const textarea = screen.getByPlaceholderText('Ask anything')
      await user.type(textarea, 'Hello, world!')
      
      expect(textarea).toHaveValue('Hello, world!')
    })

    it('shows send button when message is entered', async () => {
      const user = userEvent.setup()
      render(<Home />)
      
      const textarea = screen.getByPlaceholderText('Ask anything')
      await user.type(textarea, 'Test message')
      
      expect(screen.getByTitle('Send')).toBeInTheDocument()
    })

    it('submits form when send button is clicked', async () => {
      const user = userEvent.setup()
      render(<Home />)
      
      const textarea = screen.getByPlaceholderText('Ask anything')
      await user.type(textarea, 'Test message')
      
      const sendButton = screen.getByTitle('Send')
      await user.click(sendButton)
      
      expect(console.log).toHaveBeenCalledWith('Message:', 'Test message')
      expect(textarea).toHaveValue('')
    })

    it('submits form when Enter key is pressed', async () => {
      const user = userEvent.setup()
      render(<Home />)
      
      const textarea = screen.getByPlaceholderText('Ask anything')
      await user.type(textarea, 'Test message')
      await user.keyboard('{Enter}')
      
      expect(console.log).toHaveBeenCalledWith('Message:', 'Test message')
      expect(textarea).toHaveValue('')
    })

    it('does not submit form when Shift+Enter is pressed', async () => {
      const user = userEvent.setup()
      render(<Home />)
      
      const textarea = screen.getByPlaceholderText('Ask anything')
      await user.type(textarea, 'Test message')
      await user.keyboard('{Shift>}{Enter}{/Shift}')
      
      expect(console.log).not.toHaveBeenCalled()
      expect(textarea).toHaveValue('Test message')
    })
  })

  describe('Edge Cases', () => {
    it('does not show send button for empty message', () => {
      render(<Home />)
      expect(screen.queryByTitle('Send')).not.toBeInTheDocument()
    })

    it('does not show send button for whitespace-only message', async () => {
      const user = userEvent.setup()
      render(<Home />)
      
      const textarea = screen.getByPlaceholderText('Ask anything')
      await user.type(textarea, '   ')
      
      expect(screen.queryByTitle('Send')).not.toBeInTheDocument()
    })

    it('handles very long messages', async () => {
      const user = userEvent.setup()
      render(<Home />)
      
      const longMessage = 'A'.repeat(1000)
      const textarea = screen.getByPlaceholderText('Ask anything')
      await user.type(textarea, longMessage)
      
      expect(textarea).toHaveValue(longMessage)
      expect(screen.getByTitle('Send')).toBeInTheDocument()
    })

    it('handles special characters in messages', async () => {
      const user = userEvent.setup()
      render(<Home />)
      
      const specialMessage = '!@#$%^&*()_+-=[]{}|;:,.<>?'
      const textarea = screen.getByPlaceholderText('Ask anything')
      await user.type(textarea, specialMessage)
      
      expect(textarea).toHaveValue(specialMessage)
    })

    it('handles multiline messages', async () => {
      const user = userEvent.setup()
      render(<Home />)
      
      const textarea = screen.getByPlaceholderText('Ask anything')
      await user.type(textarea, 'Line 1')
      await user.keyboard('{Shift>}{Enter}{/Shift}')
      await user.type(textarea, 'Line 2')
      
      expect(textarea).toHaveValue('Line 1\nLine 2')
    })
  })

  describe('Form Submission Edge Cases', () => {
    it('trims whitespace before checking if message should be submitted', async () => {
      const user = userEvent.setup()
      render(<Home />)
      
      const textarea = screen.getByPlaceholderText('Ask anything')
      await user.type(textarea, '  Test message  ')
      
      const sendButton = screen.getByTitle('Send')
      await user.click(sendButton)
      
      expect(console.log).toHaveBeenCalledWith('Message:', '  Test message  ')
      expect(textarea).toHaveValue('')
    })

    it('prevents default form submission behavior', async () => {
      const user = userEvent.setup()
      render(<Home />)
      
      const textarea = screen.getByPlaceholderText('Ask anything')
      await user.type(textarea, 'Test message')
      
      const form = textarea.closest('form')!
      const submitSpy = jest.fn()
      form.addEventListener('submit', submitSpy)
      
      await user.keyboard('{Enter}')
      
      expect(submitSpy).toHaveBeenCalled()
      expect(console.log).toHaveBeenCalledWith('Message:', 'Test message')
    })
  })

  describe('Accessibility', () => {
    it('has proper ARIA labels and titles', () => {
      render(<Home />)
      
      expect(screen.getByTitle('Attach')).toBeInTheDocument()
      expect(screen.getByTitle('Search')).toBeInTheDocument()
      expect(screen.getByTitle('Voice')).toBeInTheDocument()
    })

    it('has proper form structure', () => {
      render(<Home />)
      
      const textarea = screen.getByPlaceholderText('Ask anything')
      const form = textarea.closest('form')
      
      expect(form).toBeInTheDocument()
      expect(textarea).toHaveAttribute('placeholder', 'Ask anything')
    })

    it('maintains focus management', async () => {
      const user = userEvent.setup()
      render(<Home />)
      
      const textarea = screen.getByPlaceholderText('Ask anything')
      await user.click(textarea)
      
      expect(textarea).toHaveFocus()
    })
  })

  describe('Responsive Design Elements', () => {
    it('applies correct CSS classes for responsive design', () => {
      render(<Home />)
      
      const mainContainer = screen.getByText('What can I help with?').closest('div')
      expect(mainContainer).toHaveClass('max-w-3xl', 'w-full', 'text-center')
    })

    it('has proper mobile-friendly input styling', () => {
      render(<Home />)
      
      const textarea = screen.getByPlaceholderText('Ask anything')
      expect(textarea).toHaveClass('w-full', 'bg-transparent', 'text-white')
    })
  })

  describe('Button Interactions', () => {
    it('renders action buttons as clickable elements', () => {
      render(<Home />)
      
      const attachButton = screen.getByTitle('Attach')
      const searchButton = screen.getByTitle('Search')
      const voiceButton = screen.getByTitle('Voice')
      
      expect(attachButton).toBeInTheDocument()
      expect(searchButton).toBeInTheDocument()
      expect(voiceButton).toBeInTheDocument()
      
      // These buttons should be clickable (though they don't have functionality yet)
      expect(attachButton.tagName).toBe('BUTTON')
      expect(searchButton.tagName).toBe('BUTTON')
      expect(voiceButton.tagName).toBe('BUTTON')
    })

    it('header buttons are clickable', () => {
      render(<Home />)
      
      const loginButton = screen.getByText('Log in')
      const signupButton = screen.getByText('Sign up for free')
      
      expect(loginButton.tagName).toBe('BUTTON')
      expect(signupButton.tagName).toBe('BUTTON')
    })
  })
})
