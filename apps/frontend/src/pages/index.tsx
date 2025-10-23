import React, { useState } from 'react';
import Head from 'next/head';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement search functionality
    console.log('Searching for:', searchQuery);
  };

  const handleLuckySearch = () => {
    // TODO: Implement "I'm Feeling Lucky" functionality
    console.log('Feeling lucky with:', searchQuery);
  };

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
            <a href="#" className="text-gray-300 hover:text-white text-sm">About</a>
            <a href="#" className="text-gray-300 hover:text-white text-sm">Store</a>
          </div>
          <div className="flex items-center space-x-4">
            <a href="#" className="text-gray-300 hover:text-white text-sm">Gmail</a>
            <a href="#" className="text-gray-300 hover:text-white text-sm">Images</a>
            <button className="p-2 hover:bg-gray-800 rounded">
              <svg className="w-6 h-6 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded text-sm font-medium">
              Sign in
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex flex-col items-center justify-center flex-1 px-4" style={{ minHeight: 'calc(100vh - 200px)' }}>
          {/* Logo */}
          <div className="mb-8">
            <h1 className="text-8xl font-normal text-white tracking-tight">Hoogle</h1>
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
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-16 py-4 bg-gray-800 border border-gray-600 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                placeholder=""
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-4 space-x-3">
                <button type="button" className="p-2 hover:bg-gray-700 rounded">
                  <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
                  </svg>
                </button>
                <button type="button" className="p-2 hover:bg-gray-700 rounded">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
                <button type="button" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm">
                  AI Mode
                </button>
              </div>
            </div>
          </form>

          {/* Search Buttons */}
          <div className="flex space-x-4 mb-8">
            <button
              type="submit"
              onClick={handleSearch}
              className="bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded text-sm border border-gray-600"
            >
              Hoogle Search
            </button>
            <button
              type="button"
              onClick={handleLuckySearch}
              className="bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded text-sm border border-gray-600"
            >
              I'm Feeling Lucky
            </button>
          </div>

          {/* Environmental Message */}
          <div className="flex items-center text-sm text-gray-400 mb-8">
            <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
            Applying AI towards science and the environment
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 border-t border-gray-700">
          <div className="px-6 py-4">
            <div className="flex justify-between items-center text-sm text-gray-400">
              <div className="flex space-x-6">
                <a href="#" className="hover:text-white">Advertising</a>
                <a href="#" className="hover:text-white">Business</a>
                <a href="#" className="hover:text-white">How Search works</a>
              </div>
              <div className="flex space-x-6">
                <a href="#" className="hover:text-white">Privacy</a>
                <a href="#" className="hover:text-white">Terms</a>
                <a href="#" className="hover:text-white">Settings</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
