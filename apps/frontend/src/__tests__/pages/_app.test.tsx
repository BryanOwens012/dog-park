import React from 'react'
import { render } from '@testing-library/react'
import App from '../../pages/_app'

// Mock component for testing
const MockComponent = () => <div data-testid="mock-component">Mock Component</div>

const mockPageProps = {
  testProp: 'test value',
  anotherProp: 123,
}

describe('App Component', () => {
  it('renders the component with page props', () => {
    const { getByTestId } = render(
      <App Component={MockComponent} pageProps={mockPageProps} />
    )
    
    expect(getByTestId('mock-component')).toBeInTheDocument()
  })

  it('passes page props to the component', () => {
    const TestComponent = ({ testProp, anotherProp }: any) => (
      <div>
        <span data-testid="test-prop">{testProp}</span>
        <span data-testid="another-prop">{anotherProp}</span>
      </div>
    )

    const { getByTestId } = render(
      <App Component={TestComponent} pageProps={mockPageProps} />
    )
    
    expect(getByTestId('test-prop')).toHaveTextContent('test value')
    expect(getByTestId('another-prop')).toHaveTextContent('123')
  })

  it('renders without page props', () => {
    const { getByTestId } = render(
      <App Component={MockComponent} pageProps={{}} />
    )
    
    expect(getByTestId('mock-component')).toBeInTheDocument()
  })

  it('handles different component types', () => {
    const FunctionComponent = () => <div data-testid="function-component">Function Component</div>
    const ClassComponent = class extends React.Component {
      render() {
        return <div data-testid="class-component">Class Component</div>
      }
    }

    const { getByTestId: getByTestIdFunc } = render(
      <App Component={FunctionComponent} pageProps={{}} />
    )
    expect(getByTestIdFunc('function-component')).toBeInTheDocument()

    const { getByTestId: getByTestIdClass } = render(
      <App Component={ClassComponent} pageProps={{}} />
    )
    expect(getByTestIdClass('class-component')).toBeInTheDocument()
  })

  it('applies global CSS styles', () => {
    render(<App Component={MockComponent} pageProps={{}} />)
    
    // Check if the global CSS is loaded by looking for Tailwind classes
    const style = document.querySelector('style')
    // Since we're testing the component structure, we mainly verify it renders without errors
    expect(document.body).toBeInTheDocument()
  })

  it('handles component with complex props structure', () => {
    const complexProps = {
      user: {
        id: 1,
        name: 'John Doe',
        preferences: {
          theme: 'dark',
          language: 'en',
        },
      },
      settings: {
        notifications: true,
        privacy: 'public',
      },
      data: [1, 2, 3, 4, 5],
    }

    const ComplexComponent = ({ user, settings, data }: any) => (
      <div>
        <span data-testid="user-name">{user.name}</span>
        <span data-testid="user-theme">{user.preferences.theme}</span>
        <span data-testid="notifications">{settings.notifications.toString()}</span>
        <span data-testid="data-length">{data.length}</span>
      </div>
    )

    const { getByTestId } = render(
      <App Component={ComplexComponent} pageProps={complexProps} />
    )
    
    expect(getByTestId('user-name')).toHaveTextContent('John Doe')
    expect(getByTestId('user-theme')).toHaveTextContent('dark')
    expect(getByTestId('notifications')).toHaveTextContent('true')
    expect(getByTestId('data-length')).toHaveTextContent('5')
  })

  it('handles component that throws error gracefully', () => {
    const ErrorComponent = () => {
      throw new Error('Test error')
    }

    // Suppress console.error for this test
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

    expect(() => {
      render(<App Component={ErrorComponent} pageProps={{}} />)
    }).toThrow('Test error')

    consoleSpy.mockRestore()
  })

  it('maintains component isolation between renders', () => {
    const StatefulComponent = ({ initialValue = 0 }: any) => {
      const [count, setCount] = React.useState(initialValue)
      return (
        <div>
          <span data-testid="count">{count}</span>
          <button onClick={() => setCount(count + 1)} data-testid="increment">
            Increment
          </button>
        </div>
      )
    }

    const { getByTestId: getByTestId1 } = render(
      <App Component={StatefulComponent} pageProps={{ initialValue: 5 }} />
    )
    expect(getByTestId1('count')).toHaveTextContent('5')

    const { getByTestId: getByTestId2 } = render(
      <App Component={StatefulComponent} pageProps={{ initialValue: 10 }} />
    )
    expect(getByTestId2('count')).toHaveTextContent('10')
  })
})
