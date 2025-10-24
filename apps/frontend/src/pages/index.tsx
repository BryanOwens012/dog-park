import { useState } from 'react'
import Head from 'next/head'

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!searchQuery.trim()) return
    // Search functionality would go here
    console.log('Searching for:', searchQuery.trim())
  }

  const handleLuckySearch = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (!searchQuery.trim()) return
    // "I'm Feeling Lucky" functionality would go here
    console.log('Feeling lucky with:', searchQuery.trim())
  }

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
            <button className="p-2 hover:bg-gray-800 rounded" aria-label="Google apps">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
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
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-16 py-4 bg-gray-800 border border-gray-600 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                placeholder="Search the web"
                aria-label="Search"
                autoComplete="off"
              />
              <div className="absolute inset-y-0 right-0 flex items-center space-x-3 pr-4">
                <button type="button" className="p-2 hover:bg-gray-700 rounded" aria-label="Search by voice">
                  <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1L13.5 2.5L16.17 5.17C15.24 5.06 14.32 5 13.38 5C10.38 5 7.7 6.11 5.73 7.89L7.1 9.26C8.46 8.05 10.33 7.38 12.38 7.38C13.32 7.38 14.24 7.44 15.17 7.56L12.5 10.23L14 11.73L21 9ZM12 15C10.33 15 8.7 14.62 7.26 13.96L5.89 15.33C7.7 16.11 9.8 16.5 12 16.5C14.2 16.5 16.3 16.11 18.11 15.33L16.74 13.96C15.3 14.62 13.67 15 12 15Z"/>
                  </svg>
                </button>
                <button type="button" className="p-2 hover:bg-gray-700 rounded" aria-label="Search by image">
                  <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M9 2C6.24 2 4 4.24 4 7S6.24 12 9 12 14 9.76 14 7 11.76 2 9 2ZM9 10C7.34 10 6 8.66 6 7S7.34 4 9 4 12 5.34 12 7 10.66 10 9 10ZM9 13C6.33 13 1 14.34 1 17V20H17V17C17 14.34 11.67 13 9 13ZM3 18V17C3 16.36 6.67 15 9 15S15 16.36 15 17V18H3ZM16.76 5.36L18.18 6.78C19.15 5.81 20.61 5.81 21.58 6.78L23 8.2L21.58 9.62C20.61 10.59 19.15 10.59 18.18 9.62L16.76 8.2C15.79 7.23 15.79 5.77 16.76 4.8L18.18 3.38L19.6 4.8C20.57 5.77 20.57 7.23 19.6 8.2L18.18 6.78Z"/>
                  </svg>
                </button>
              </div>
            </div>
          </form>

          {/* Buttons */}
          <div className="flex space-x-4 mb-8">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault()
                if (!searchQuery.trim()) return
                console.log('Searching for:', searchQuery.trim())
              }}
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

          {/* AI Mode Button */}
          <div className="mb-8">
            <button className="bg-gray-800 hover:bg-gray-700 border border-gray-600 px-4 py-2 rounded-full text-sm text-gray-300 hover:text-white transition-colors flex items-center space-x-2" aria-label="Toggle AI Mode">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
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
              <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
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
