import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Home from '../../src/pages/index'

// Mock Next.js Head component
jest.mock('next/head', () => {
  return function Head({ children }: { children: React.ReactNode }) {
    return <>{children}</>
  }
})

describe('Chat Flow Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.spyOn(console, 'log').mockImplementation(() => {})
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  describe('Complete User Journey', () => {
    it('allows user to complete a full chat interaction', async () => {
      const user = userEvent.setup()
      render(<Home />)

      // 1. User sees the initial state
      expect(screen.getByText('What can I help with?')).toBeInTheDocument()
      expect(screen.getByPlaceholderText('Ask anything')).toBeInTheDocument()
      expect(screen.queryByTitle('Send')).not.toBeInTheDocument()

      // 2. User types a message
      const textarea = screen.getByPlaceholderText('Ask anything')
      await user.type(textarea, 'Hello, how are you?')

      // 3. Send button appears
      expect(screen.getByTitle('Send')).toBeInTheDocument()

      // 4. User submits the message
      await user.click(screen.getByTitle('Send'))

      // 5. Message is logged and textarea is cleared
      expect(console.log).toHaveBeenCalledWith('Message:', 'Hello, how are you?')
      expect(textarea).toHaveValue('')
      expect(screen.queryByTitle('Send')).not.toBeInTheDocument()
    })

    it('handles multiple message submissions', async () => {
      const user = userEvent.setup()
      render(<Home />)

      const textarea = screen.getByPlaceholderText('Ask anything')

      // First message
      await user.type(textarea, 'First message')
      await user.click(screen.getByTitle('Send'))
      expect(console.log).toHaveBeenCalledWith('Message:', 'First message')

      // Second message
      await user.type(textarea, 'Second message')
      await user.keyboard('{Enter}')
      expect(console.log).toHaveBeenCalledWith('Message:', 'Second message')

      // Third message with special characters
      await user.type(textarea, 'Message with émojis! 🚀')
      await user.click(screen.getByTitle('Send'))
      expect(console.log).toHaveBeenCalledWith('Message:', 'Message with émojis! 🚀')

      expect(console.log).toHaveBeenCalledTimes(3)
    })

    it('handles keyboard navigation and shortcuts', async () => {
      const user = userEvent.setup()
      render(<Home />)

      const textarea = screen.getByPlaceholderText('Ask anything')

      // Focus textarea
      await user.click(textarea)
      expect(textarea).toHaveFocus()

      // Type and use Enter to submit
      await user.type(textarea, 'Keyboard test')
      await user.keyboard('{Enter}')

      expect(console.log).toHaveBeenCalledWith('Message:', 'Keyboard test')
      expect(textarea).toHaveValue('')

      // Test Shift+Enter for new line
      await user.type(textarea, 'Line 1')
      await user.keyboard('{Shift>}{Enter}{/Shift}')
      await user.type(textarea, 'Line 2')

      expect(textarea).toHaveValue('Line 1\nLine 2')
      expect(console.log).toHaveBeenCalledTimes(1) // Should not submit
    })
  })

  describe('Error Handling and Edge Cases', () => {
    it('gracefully handles rapid user interactions', async () => {
      const user = userEvent.setup()
      render(<Home />)

      const textarea = screen.getByPlaceholderText('Ask anything')

      // Rapid typing and submission
      await user.type(textarea, 'Quick message')
      await user.keyboard('{Enter}')
      
      // Immediately type another message
      await user.type(textarea, 'Another quick message')
      await user.keyboard('{Enter}')

      expect(console.log).toHaveBeenCalledTimes(2)
      expect(console.log).toHaveBeenNthCalledWith(1, 'Message:', 'Quick message')
      expect(console.log).toHaveBeenNthCalledWith(2, 'Message:', 'Another quick message')
    })

    it('maintains state consistency during interactions', async () => {
      const user = userEvent.setup()
      render(<Home />)

      const textarea = screen.getByPlaceholderText('Ask anything')

      // Type message
      await user.type(textarea, 'Test message')
      expect(screen.getByTitle('Send')).toBeInTheDocument()

      // Clear message manually
      await user.clear(textarea)
      expect(screen.queryByTitle('Send')).not.toBeInTheDocument()

      // Type again
      await user.type(textarea, 'New message')
      expect(screen.getByTitle('Send')).toBeInTheDocument()

      // Submit
      await user.click(screen.getByTitle('Send'))
      expect(textarea).toHaveValue('')
      expect(screen.queryByTitle('Send')).not.toBeInTheDocument()
    })
  })

  describe('UI State Management', () => {
    it('properly manages send button visibility', async () => {
      const user = userEvent.setup()
      render(<Home />)

      const textarea = screen.getByPlaceholderText('Ask anything')

      // Initially no send button
      expect(screen.queryByTitle('Send')).not.toBeInTheDocument()

      // Type whitespace only - no send button
      await user.type(textarea, '   ')
      expect(screen.queryByTitle('Send')).not.toBeInTheDocument()

      // Add actual content - send button appears
      await user.type(textarea, 'a')
      expect(screen.getByTitle('Send')).toBeInTheDocument()

      // Clear to whitespace only - send button disappears
      await user.clear(textarea)
      await user.type(textarea, '  ')
      expect(screen.queryByTitle('Send')).not.toBeInTheDocument()

      // Add content again - send button reappears
      await user.type(textarea, 'real content')
      expect(screen.getByTitle('Send')).toBeInTheDocument()
    })
  })
})
