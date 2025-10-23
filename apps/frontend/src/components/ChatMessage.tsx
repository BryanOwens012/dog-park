import styles from '../styles/chat.module.css'

interface Message {
  id: string
  content: string
  role: 'user' | 'assistant'
  timestamp: Date
}

interface ChatMessageProps {
  message: Message
}

export default function ChatMessage({ message }: ChatMessageProps) {
  return (
    <div className={`${styles.messageWrapper} ${styles[message.role]}`}>
      <div className={styles.messageContent}>
        <div className={styles.messageAvatar}>
          {message.role === 'user' ? '👤' : '🤖'}
        </div>
        <div className={styles.messageText}>
          {message.content}
        </div>
      </div>
    </div>
  )
}
