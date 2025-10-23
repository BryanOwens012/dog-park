import React, { useState, useRef, useEffect } from 'react';
import styles from './ChatInterface.module.css';

interface Message {
  id: string;
  text: string;
  timestamp: Date;
  isUser: boolean;
}

interface ChatInterfaceProps {
  className?: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ className }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      timestamp: new Date(),
      isUser: true,
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm a demo response. This is where your chat functionality would integrate with your backend or AI service.",
        timestamp: new Date(),
        isUser: false,
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  return (
    <div className={`${styles.chatContainer} ${className || ''}`}>
      <div className={styles.chatHeader}>
        <h2>Chat</h2>
      </div>
      
      <div className={styles.messagesContainer}>
        {messages.length === 0 && (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>💬</div>
            <p>Start a conversation</p>
          </div>
        )}
        
        {messages.map((message) => (
          <div
            key={message.id}
            className={`${styles.messageWrapper} ${
              message.isUser ? styles.userMessage : styles.aiMessage
            }`}
          >
            <div className={styles.messageBubble}>
              <p className={styles.messageText}>{message.text}</p>
              <span className={styles.timestamp}>
                {message.timestamp.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className={`${styles.messageWrapper} ${styles.aiMessage}`}>
            <div className={styles.messageBubble}>
              <div className={styles.typingIndicator}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <form className={styles.inputContainer} onSubmit={handleSendMessage}>
        <div className={styles.inputWrapper}>
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className={styles.messageInput}
          />
          <button
            type="submit"
            disabled={!inputValue.trim()}
            className={styles.sendButton}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22,2 15,22 11,13 2,9"></polygon>
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatInterface;
