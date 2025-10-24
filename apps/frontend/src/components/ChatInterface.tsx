import React, { useState } from 'react';
import { PaperClipIcon, MagnifyingGlassIcon, MicrophoneIcon } from '@heroicons/react/24/outline';

export default function ChatInterface() {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle message submission here
    console.log('Message:', message);
    setMessage('');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <span className="text-sm font-bold">H</span>
          </div>
          <h1 className="text-xl font-semibold">Hoogle</h1>
        </div>
        <div className="flex items-center space-x-4">
          <button className="px-4 py-2 text-gray-300 hover:text-white transition-colors">
            Log in
          </button>
          <button className="px-4 py-2 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors">
            Sign up for free
          </button>
        </div>
      </header>

      {/* Main content area */}
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="max-w-3xl w-full">
          <h2 className="text-4xl font-semibold text-center mb-8">
            What can I help with?
          </h2>

          {/* Chat input form */}
          <form onSubmit={handleSubmit} className="relative">
            <div className="bg-gray-800 rounded-2xl border border-gray-700 focus-within:border-gray-600 transition-colors">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask anything"
                className="w-full bg-transparent text-white placeholder-gray-400 p-4 pr-32 resize-none focus:outline-none min-h-[60px] max-h-[200px]"
                rows={1}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
              />
              
              {/* Action buttons */}
              <div className="absolute bottom-3 right-3 flex items-center space-x-2">
                <button
                  type="button"
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                  title="Attach"
                >
                  <PaperClipIcon className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                  title="Search"
                >
                  <MagnifyingGlassIcon className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                  title="Voice"
                >
                  <MicrophoneIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          </form>

          {/* Footer text */}
          <p className="text-center text-gray-400 text-sm mt-6">
            By messaging Hoogle, you agree to our{' '}
            <a href="#" className="underline hover:text-gray-300">
              Terms
            </a>{' '}
            and have read our{' '}
            <a href="#" className="underline hover:text-gray-300">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
