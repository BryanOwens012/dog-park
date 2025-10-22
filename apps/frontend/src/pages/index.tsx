import Head from 'next/head'
import { useState } from 'react'
import { Search, Sparkles, Globe, BookOpen, Code, Lightbulb } from 'lucide-react'

export default function Home() {
  const [query, setQuery] = useState('')

  const suggestions = [
    {
      icon: <Globe className="w-5 h-5" />,
      title: "What's happening in the world today?",
      description: "Get the latest news and current events"
    },
    {
      icon: <Code className="w-5 h-5" />,
      title: "Explain quantum computing",
      description: "Learn about quantum mechanics and computing"
    },
    {
      icon: <BookOpen className="w-5 h-5" />,
      title: "Best books to read in 2024",
      description: "Discover trending and acclaimed literature"
    },
    {
      icon: <Lightbulb className="w-5 h-5" />,
      title: "Creative project ideas",
      description: "Find inspiration for your next project"
    }
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      // TODO: Implement search functionality
      console.log('Searching for:', query)
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion)
  }

  return (
    <>
      <Head>
        <title>Perplexity Clone</title>
        <meta name="description" content="AI-powered search and discovery" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <header style={{ padding: '20px 0', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <div className="container">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles className="w-8 h-8 gradient-text" />
                <h1 className="gradient-text" style={{ fontSize: '24px', fontWeight: 'bold' }}>
                  Perplexity
                </h1>
              </div>
              <nav style={{ display: 'flex', gap: '24px' }}>
                <a href="#" style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px' }}>
                  Discover
                </a>
                <a href="#" style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px' }}>
                  Library
                </a>
                <a href="#" style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px' }}>
                  Sign In
                </a>
              </nav>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 0' }}>
          <div className="container" style={{ maxWidth: '800px' }}>
            {/* Welcome Section */}
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <h2 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px', lineHeight: '1.2' }}>
                Where knowledge begins
              </h2>
              <p style={{ fontSize: '18px', color: 'rgba(255, 255, 255, 0.7)', maxWidth: '600px', margin: '0 auto' }}>
                Ask anything and get instant, accurate answers backed by the most up-to-date information.
              </p>
            </div>

            {/* Search Bar */}
            <form onSubmit={handleSearch} style={{ marginBottom: '48px' }}>
              <div className="search-container" style={{ display: 'flex', alignItems: 'center', padding: '16px 20px' }}>
                <Search className="w-5 h-5" style={{ color: 'rgba(255, 255, 255, 0.5)', marginRight: '12px' }} />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Ask anything..."
                  style={{
                    flex: 1,
                    background: 'none',
                    border: 'none',
                    outline: 'none',
                    color: '#ffffff',
                    fontSize: '16px',
                    placeholder: 'rgba(255, 255, 255, 0.5)'
                  }}
                />
                {query && (
                  <button
                    type="submit"
                    style={{
                      background: 'linear-gradient(135deg, #20b2aa, #48d1cc)',
                      color: 'white',
                      padding: '8px 16px',
                      borderRadius: '6px',
                      fontSize: '14px',
                      fontWeight: '500',
                      marginLeft: '12px'
                    }}
                  >
                    Search
                  </button>
                )}
              </div>
            </form>

            {/* Suggestions */}
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '24px', textAlign: 'center' }}>
                Try asking about...
              </h3>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                gap: '16px' 
              }}>
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="suggestion-card"
                    onClick={() => handleSuggestionClick(suggestion.title)}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                      <div style={{ color: '#20b2aa', marginTop: '2px' }}>
                        {suggestion.icon}
                      </div>
                      <div>
                        <h4 style={{ fontSize: '14px', fontWeight: '500', marginBottom: '4px' }}>
                          {suggestion.title}
                        </h4>
                        <p style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)' }}>
                          {suggestion.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer style={{ padding: '24px 0', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <div className="container">
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              fontSize: '14px',
              color: 'rgba(255, 255, 255, 0.5)'
            }}>
              <div>
                © 2024 Perplexity Clone. Built with Next.js.
              </div>
              <div style={{ display: 'flex', gap: '24px' }}>
                <a href="#" style={{ color: 'inherit' }}>Privacy</a>
                <a href="#" style={{ color: 'inherit' }}>Terms</a>
                <a href="#" style={{ color: 'inherit' }}>About</a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  )
}
