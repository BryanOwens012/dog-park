import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import ChatInterface from '@/components/ChatInterface'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <main className={`${styles.main} ${inter.className}`}>
        <div className={styles.header}>
          <h1 className={styles.title}>Chat Interface Demo</h1>
          <p className={styles.subtitle}>
            A Google-inspired chat interface built with Next.js and React
          </p>
        </div>

        <div className={styles.chatWrapper}>
          <ChatInterface />
        </div>
      </main>
    </>
  )
}
