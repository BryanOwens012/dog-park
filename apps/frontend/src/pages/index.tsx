import Head from 'next/head'
import { useState } from 'react'

export default function Home() {
  const [query, setQuery] = useState('')

  return (
    <>
      <Head>
        <title>Perplexity Clone</title>
        <meta name="description" content="AI-powered search and discovery" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div style={{ 
        minHeight: '100vh', 
        backgroundColor: '#0f0f0f',
        color: '#ffffff',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}>
        {/* Header */}
        <header style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem 2rem',
          borderBottom: '1px solid #2a2a2a'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <h1 style={{ 
              fontSize: '1.5rem', 
              fontWeight: 'bold',
              margin: 0,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Perplexity
            </h1>
            <nav style={{ display: 'flex', gap: '1.5rem' }}>
              <a href="#" style={{ color: '#888', textDecoration: 'none', fontSize: '0.9rem' }}>Discover</a>
              <a href="#" style={{ color: '#888', textDecoration: 'none', fontSize: '0.9rem' }}>Library</a>
            </nav>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button style={{
              background: 'transparent',
              border: '1px solid #333',
              color: '#fff',
              padding: '0.5rem 1rem',
              borderRadius: '6px',
              fontSize: '0.9rem',
              cursor: 'pointer'
            }}>
              Sign up
            </button>
            <button style={{
              background: '#2563eb',
              border: 'none',
              color: '#fff',
              padding: '0.5rem 1rem',
              borderRadius: '6px',
              fontSize: '0.9rem',
              cursor: 'pointer'
            }}>
              Log in
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 'calc(100vh - 80px)',
          padding: '2rem'
        }}>
          <div style={{ maxWidth: '800px', width: '100%', textAlign: 'center' }}>
            <h2 style={{
              fontSize: '3rem',
              fontWeight: 'bold',
              marginBottom: '1rem',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Where knowledge begins
            </h2>
            
            <p style={{
              fontSize: '1.2rem',
              color: '#888',
              marginBottom: '3rem',
              lineHeight: '1.6'
            }}>
              Ask anything and get instant, accurate answers with complete sources and citations.
            </p>

            {/* Search Box */}
            <div style={{
              position: 'relative',
              marginBottom: '2rem'
            }}>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask anything..."
                style={{
                  width: '100%',
                  padding: '1rem 3rem 1rem 1.5rem',
                  fontSize: '1.1rem',
                  backgroundColor: '#1a1a1a',
                  border: '1px solid #333',
                  borderRadius: '12px',
                  color: '#fff',
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
                onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                onBlur={(e) => e.target.style.borderColor = '#333'}
              />
              <button style={{
                position: 'absolute',
                right: '0.5rem',
                top: '50%',
                transform: 'translateY(-50%)',
                background: '#2563eb',
                border: 'none',
                borderRadius: '8px',
                padding: '0.5rem 1rem',
                color: '#fff',
                cursor: 'pointer',
                fontSize: '0.9rem'
              }}>
                →
              </button>
            </div>

            {/* Quick Actions */}
            <div style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              {['Science', 'Technology', 'History', 'Culture'].map((topic) => (
                <button
                  key={topic}
                  style={{
                    background: 'transparent',
                    border: '1px solid #333',
                    color: '#888',
                    padding: '0.5rem 1rem',
                    borderRadius: '20px',
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.borderColor = '#2563eb'
                    e.target.style.color = '#fff'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.borderColor = '#333'
                    e.target.style.color = '#888'
                  }}
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
