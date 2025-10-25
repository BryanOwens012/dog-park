import React, { useState } from 'react';
import styles from './SearchInterface.module.css';

interface SearchInterfaceProps {
  onSearch?: (query: string) => void;
}

export default function SearchInterface({ onSearch }: SearchInterfaceProps) {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setIsLoading(true);
    if (onSearch) {
      await onSearch(query);
    }
    setIsLoading(false);
  };

  const suggestions = [
    'What will Comet do for you?',
    'How does AI assistance work?',
    'Compare different AI models',
    'Latest technology trends'
  ];

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <div className={styles.logoSection}>
          <div className={styles.logo}>
            <span className={styles.logoIcon}>⚡</span>
            <span className={styles.logoText}>perplexity</span>
          </div>
        </div>
        
        <div className={styles.searchSection}>
          <form onSubmit={handleSubmit} className={styles.searchForm}>
            <div className={styles.searchInputContainer}>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask anything..."
                className={styles.searchInput}
                disabled={isLoading}
              />
              <button 
                type="submit" 
                className={styles.searchButton}
                disabled={isLoading || !query.trim()}
              >
                {isLoading ? (
                  <div className={styles.spinner} />
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </button>
            </div>
          </form>
          
          <div className={styles.suggestions}>
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                className={styles.suggestionButton}
                onClick={() => setQuery(suggestion)}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
