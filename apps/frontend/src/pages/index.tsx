import { useState, useCallback } from 'react'
import Head from 'next/head'

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = useCallback((e: React.FormEvent) => {
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
        <meta name="description" content="Hoogle Search" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
        <main className="flex flex-col items-center justify-center flex-1 px-4" style={{ minHeight: 'calc(100vh - 200px)' }}>
          {/* Logo */}
          <div className="mb-8">
            <h1 className="text-8xl font-normal text-white tracking-tight">
              Hoogle
            </h1>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="w-full max-w-2xl mb-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={handleInputChange}
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

          {/* Buttons */}
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
              onClick={handleLuckySearch}
              className="bg-gray-800 hover:bg-gray-700 border border-gray-600 px-6 py-3 rounded text-sm text-gray-300 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!searchQuery.trim()}
            >
              I'm Feeling Lucky
            </button>
          </div>

          {/* AI Mode Button */}
          <div className="mb-8">
            <button className="bg-gray-800 hover:bg-gray-700 border border-gray-600 px-4 py-2 rounded-full text-sm text-gray-300 hover:text-white transition-colors flex items-center space-x-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"/>
              </svg>
              <span>AI Mode</span>
            </button>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 border-t border-gray-700">
          <div className="px-6 py-3">
            <div className="flex items-center text-sm text-gray-400">
              <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M11,16.5L18,9.5L16.59,8.09L11,13.67L7.91,10.59L6.5,12L11,16.5Z"/>
              </svg>
              Applying AI towards science and the environment
            </div>
          </div>
          <div className="border-t border-gray-700 px-6 py-3">
            <div className="flex justify-between items-center text-sm text-gray-400">
              <div className="flex space-x-6">
                <a href="#" className="hover:underline">Advertising</a>
                <a href="#" className="hover:underline">Business</a>
                <a href="#" className="hover:underline">How Search works</a>
              </div>
              <div className="flex space-x-6">
                <a href="#" className="hover:underline">Privacy</a>
                <a href="#" className="hover:underline">Terms</a>
                <a href="#" className="hover:underline">Settings</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
