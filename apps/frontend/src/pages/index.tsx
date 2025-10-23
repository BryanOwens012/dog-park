import Head from 'next/head';
import SearchInterface from '../components/SearchInterface';

export default function Home() {
  const handleSearch = async (query: string) => {
    console.log('Searching for:', query);
    // TODO: Implement actual search functionality
    // This could integrate with an AI API or search service
  };

  return (
    <>
      <Head>
        <title>Perplexity - Ask Anything</title>
        <meta name="description" content="AI-powered search and discovery platform" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main>
        <SearchInterface onSearch={handleSearch} />
      </main>
    </>
  );
}
