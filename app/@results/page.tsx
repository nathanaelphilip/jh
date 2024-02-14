import type { YoutubeSearchParams, YoutubeVideoSearch } from 'youtube.ts';

import { Results } from '@/components/results';

async function getVideos(
  q: string,
  order: YoutubeSearchParams['order'] = 'relevance'
) {
  const maxResults = 25;

  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/search?q=${q}&order=${order}&maxResults=${maxResults}&part=snippet&safeSearch=strict&type=video&key=${process.env.GOOGLE_API_KEY}`
  );

  const data: YoutubeVideoSearch = await response.json();

  console.log(data.items[0], 'wut');

  return data;
}

export default async function Home(props: {
  searchParams: { q: string; order: YoutubeSearchParams['order'] };
}) {
  const data = await getVideos(props.searchParams.q, props.searchParams.order);
  return data ? (
    <Results {...data} />
  ) : (
    <div>
      <h2 className="text-lg">No results</h2>
    </div>
  );
}
