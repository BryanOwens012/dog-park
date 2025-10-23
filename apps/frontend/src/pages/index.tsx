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

      <div className="min-h-screen bg-gray-900 text-white flex flex-col">
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
        <main className="flex-1 flex flex-col items-center justify-center px-4">
          <div className="w-full max-w-2xl">
            {/* Logo */}
            <div className="text-center mb-8">
              <h1 className="text-8xl font-normal text-white mb-8">Hoogle</h1>
            </div>

            {/* Search Form */}
            <form onSubmit={handleSearch} className="mb-8">
              <div className="relative">
                <div className="flex items-center bg-gray-800 rounded-full border border-gray-600 hover:border-gray-500 focus-within:border-blue-500 px-4 py-3">
                  <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none text-lg"
                    placeholder=""
                  />
                  <button type="button" className="ml-3 p-1 hover:bg-gray-700 rounded">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                  </button>
                  <button type="button" className="ml-2 p-1 hover:bg-gray-700 rounded">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </button>
                  <div className="ml-3 px-3 py-1 bg-gray-700 rounded text-sm text-gray-300">
                    AI Mode
                  </div>
                </div>
              </div>
            </form>

            {/* Search Buttons */}
            <div className="flex justify-center space-x-4 mb-8">
              <button
                type="submit"
                onClick={handleSearch}
                className="bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded text-sm border border-gray-600"
              >
                Hoogle Search
              </button>
              <button
                onClick={handleLuckySearch}
                className="bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded text-sm border border-gray-600"
              >
                I'm Feeling Lucky
              </button>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 border-t border-gray-700">
          <div className="px-6 py-3">
            <div className="flex items-center text-sm text-gray-400">
              <span className="text-green-400 mr-2">🌱</span>
              Applying AI towards science and the environment
            </div>
          </div>
          <div className="border-t border-gray-700 px-6 py-4">
            <div className="flex flex-col md:flex-row justify-between">
              <div className="flex space-x-6 mb-4 md:mb-0">
                <a href="#" className="text-gray-400 hover:text-white text-sm">Advertising</a>
                <a href="#" className="text-gray-400 hover:text-white text-sm">Business</a>
                <a href="#" className="text-gray-400 hover:text-white text-sm">How Search works</a>
              </div>
              <div className="flex space-x-6">
                <a href="#" className="text-gray-400 hover:text-white text-sm">Privacy</a>
                <a href="#" className="text-gray-400 hover:text-white text-sm">Terms</a>
                <a href="#" className="text-gray-400 hover:text-white text-sm">Settings</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
