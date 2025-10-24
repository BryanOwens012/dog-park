import { useState, useCallback } from 'react'
import Head from 'next/head'

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!searchQuery.trim()) return
    // Search functionality would go here
    console.log('Searching for:', searchQuery)
  }, [searchQuery])

  const handleLuckySearch = useCallback(() => {
    if (!searchQuery.trim()) return
    // "I'm Feeling Lucky" functionality would go here
    console.log('Feeling lucky with:', searchQuery)
  }, [searchQuery])

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }, [])

  return (
    <>
      <Head>
        <title>Hoogle</title>
        <meta name="description" content="Hoogle Search - Your gateway to finding information" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Hoogle" />
        <meta property="og:description" content="Hoogle Search - Your gateway to finding information" />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gray-900 text-white">
        {/* Header */}
        <header className="flex justify-between items-center p-4">
          <div className="flex space-x-6">
            <a href="#" className="text-sm hover:underline">About</a>
            <a href="#" className="text-sm hover:underline">Store</a>
          </div>
          <div className="flex items-center space-x-4">
            <a href="#" className="text-sm hover:underline">Gmail</a>
            <a href="#" className="text-sm hover:underline">Images</a>
            <button className="p-2 hover:bg-gray-800 rounded">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM16,6c0,1.1 0.9,2 2,2s2,-0.9 2,-2 -0.9,-2 -2,-2 -2,0.9 -2,2zM12,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2z"/>
              </svg>
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-md text-sm font-medium">
              Sign in
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex flex-col items-center justify-center flex-1 px-4 min-h-[calc(100vh-200px)]">
          {/* Logo */}
          <div className="mb-8">
            <h1 className="text-8xl font-normal text-white tracking-tight">
              Hoogle
            </h1>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="w-full max-w-2xl mb-8" role="search">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg 
                  className="h-5 w-5 text-gray-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={handleInputChange}
                className="w-full pl-12 pr-16 py-4 bg-gray-800 border border-gray-600 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                placeholder="Search the web"
                aria-label="Search query"
                autoComplete="off"
                spellCheck="false"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-4 space-x-3">
                <button 
                  type="button" 
                  className="p-2 hover:bg-gray-700 rounded transition-colors"
                  aria-label="Voice search"
                >
                  <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"/>
                  </svg>
                </button>
                <button 
                  type="button" 
                  className="p-2 hover:bg-gray-700 rounded transition-colors"
                  aria-label="Search by image"
                >
                  <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </button>
                <button 
                  type="button" 
                  className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm transition-colors"
                  aria-label="Toggle AI mode"
                >
                  AI Mode
                </button>
              </div>
            </div>
          </form>

          {/* Search Buttons */}
          <div className="flex space-x-4">
            <button
              type="submit"
              className="bg-gray-800 hover:bg-gray-700 border border-gray-600 px-6 py-3 rounded text-sm text-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={!searchQuery.trim()}
            >
              Hoogle Search
            </button>
            <button
              type="button"
              onClick={handleLuckySearch}
              className="bg-gray-800 hover:bg-gray-700 border border-gray-600 px-6 py-3 rounded text-sm text-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={!searchQuery.trim()}
            >
              I'm Feeling Lucky
            </button>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 border-t border-gray-700">
          <div className="px-6 py-3">
            <div className="flex items-center text-sm text-gray-400">
              <span className="mr-2">🌱</span>
              <span>Applying AI towards science and the environment</span>
            </div>
          </div>
          <div className="border-t border-gray-700 px-6 py-3">
            <div className="flex justify-between">
              <div className="flex space-x-6">
                <a href="#" className="text-sm text-gray-400 hover:underline">Advertising</a>
                <a href="#" className="text-sm text-gray-400 hover:underline">Business</a>
                <a href="#" className="text-sm text-gray-400 hover:underline">How Search works</a>
              </div>
              <div className="flex space-x-6">
                <a href="#" className="text-sm text-gray-400 hover:underline">Privacy</a>
                <a href="#" className="text-sm text-gray-400 hover:underline">Terms</a>
                <a href="#" className="text-sm text-gray-400 hover:underline">Settings</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
