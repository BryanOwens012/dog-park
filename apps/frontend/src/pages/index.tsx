import React, { useState } from 'react';
import Head from 'next/head';

export default function Home() {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Handle message submission
    console.log('Message submitted:', message);
    setMessage('');
  };

  return (
    <>
      <Head>
        <title>ChatGPT Clone</title>
        <meta name="description" content="A ChatGPT interface clone" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gray-900 text-white flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between p-4 border-b border-gray-700">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <span className="text-lg font-semibold">ChatGPT</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 text-sm border border-gray-600 rounded-lg hover:bg-gray-800 transition-colors">
              Log in
            </button>
            <button className="px-4 py-2 text-sm bg-white text-black rounded-lg hover:bg-gray-100 transition-colors">
              Sign up for free
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex flex-col items-center justify-center px-4">
          <div className="w-full max-w-3xl">
            {/* Welcome Message */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-semibold mb-4 text-gray-100">
                What can I help with?
              </h1>
            </div>

            {/* Chat Input */}
            <div className="relative">
              <form onSubmit={handleSubmit} className="relative">
                <div className="relative bg-gray-800 rounded-2xl border border-gray-700 focus-within:border-gray-600 transition-colors">
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Ask anything"
                    className="w-full bg-transparent text-white placeholder-gray-400 resize-none border-0 outline-none px-4 py-4 pr-16 text-base leading-6 min-h-[56px] max-h-48"
                    rows={1}
                    style={{
                      scrollbarWidth: 'none',
                      msOverflowStyle: 'none',
                    }}
                    onInput={(e) => {
                      const target = e.target as HTMLTextAreaElement;
                      target.style.height = 'auto';
                      target.style.height = Math.min(target.scrollHeight, 192) + 'px';
                    }}
                  />
                  
                  {/* Action Buttons */}
                  <div className="absolute bottom-3 left-3 flex items-center space-x-2">
                    <button
                      type="button"
                      className="p-2 text-gray-400 hover:text-gray-300 transition-colors"
                      title="Attach"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                      </svg>
                    </button>
                    
                    <button
                      type="button"
                      className="p-2 text-gray-400 hover:text-gray-300 transition-colors"
                      title="Search"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </button>
                  </div>

                  {/* Submit Button */}
                  <div className="absolute bottom-3 right-3">
                    <button
                      type="submit"
                      disabled={!message.trim()}
                      className="p-2 bg-white text-black rounded-lg hover:bg-gray-100 disabled:bg-gray-600 disabled:text-gray-400 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </button>
                  </div>

                  {/* Voice Button */}
                  <div className="absolute bottom-3 right-14">
                    <button
                      type="button"
                      className="p-2 text-gray-400 hover:text-gray-300 transition-colors"
                      title="Voice"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="p-4 text-center text-sm text-gray-400">
          <p>
            By messaging ChatGPT, you agree to our{' '}
            <a href="#" className="underline hover:text-gray-300">Terms</a>
            {' '}and have read our{' '}
            <a href="#" className="underline hover:text-gray-300">Privacy Policy</a>.
          </p>
        </footer>
      </div>
    </>
  );
}
