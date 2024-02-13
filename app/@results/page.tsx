import { Results } from '@/components/results';
import type { YoutubeSearchParams } from 'youtube.ts';
import { youtube } from '@/lib/youtube';

async function getVideos(
  q: string,
  order: YoutubeSearchParams['order'] = 'relevance'
) {
  return await youtube.videos.search({ q, order, maxResults: 25 });
}

export default async function Home(props: {
  searchParams: { q: string; order: YoutubeSearchParams['order'] };
}) {
  const data = await getVideos(props.searchParams.q, props.searchParams.order);
  return data ? <Results {...data} /> : null;
}
