import React, { useState } from 'react';
import styles from './ChatInterface.module.css';

const ChatInterface: React.FC = () => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // UI only - no actual functionality needed
    console.log('Message submitted:', message);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className={styles.logoText}>ChatGPT</span>
          <svg className={styles.chevron} width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className={styles.authButtons}>
          <button className={styles.loginBtn}>Log in</button>
          <button className={styles.signupBtn}>Sign up for free</button>
          <button className={styles.helpBtn}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2"/>
              <path d="M7.5 7.5C7.5 6.12 8.62 5 10 5S12.5 6.12 12.5 7.5C12.5 8.88 11.38 10 10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="10" cy="14" r="1" fill="currentColor"/>
            </svg>
          </button>
        </div>
      </div>

      <div className={styles.main}>
        <div className={styles.content}>
          <h1 className={styles.title}>What can I help with?</h1>
          
          <form onSubmit={handleSubmit} className={styles.chatForm}>
            <div className={styles.inputContainer}>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask anything"
                className={styles.chatInput}
              />
              <div className={styles.inputActions}>
                <button type="button" className={styles.actionBtn}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M3 16L17 16L17 4L3 4L3 16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8 12L12 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8 8L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Attach</span>
                </button>
                <button type="button" className={styles.actionBtn}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="2"/>
                    <path d="M14 14L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Search</span>
                </button>
                <button type="button" className={styles.voiceBtn}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 2C8.34 2 7 3.34 7 5V10C7 11.66 8.34 13 10 13C11.66 13 13 11.66 13 10V5C13 3.34 11.66 2 10 2Z" stroke="currentColor" strokeWidth="2"/>
                    <path d="M17 10C17 13.87 13.87 17 10 17C6.13 17 3 13.87 3 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M10 17V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M6 21H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Voice</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className={styles.footer}>
        <p>
          By messaging ChatGPT, you agree to our{' '}
          <a href="#" className={styles.link}>Terms</a>{' '}
          and have read our{' '}
          <a href="#" className={styles.link}>Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
};

export default ChatInterface;
