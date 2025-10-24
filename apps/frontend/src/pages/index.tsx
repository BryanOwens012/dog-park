import Head from 'next/head'
import ChatInterface from '../components/ChatInterface'

export default function Home() {
  return (
    <>
      <Head>
        <title>Hoogle - AI Assistant</title>
        <meta name="description" content="Hoogle AI Assistant - Ask anything" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ChatInterface />
    </>
  )
}
