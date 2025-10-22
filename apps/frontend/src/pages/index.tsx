import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <>
      <Head>
        <title>Frontend App</title>
        <meta name="description" content="A Next.js app in a monorepo" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.center}>
          <h1 className={styles.title}>
            Welcome to <span className={styles.highlight}>Frontend App</span>
          </h1>
          <p className={styles.description}>
            A Next.js application running in a monorepo setup
          </p>
        </div>
      </main>
    </>
  )
}
