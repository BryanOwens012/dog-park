import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Next.js Monorepo App</title>
        <meta name="description" content="A basic Next.js app in a monorepo setup" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
        <h1>Welcome to Next.js Monorepo!</h1>
        <p>This is a basic Next.js application set up in a monorepo structure.</p>
        <div style={{ marginTop: '2rem' }}>
          <h2>Features:</h2>
          <ul>
            <li>Next.js 14</li>
            <li>TypeScript support</li>
            <li>Monorepo with npm workspaces</li>
            <li>ESLint configuration</li>
          </ul>
        </div>
      </main>
    </>
  )
}
