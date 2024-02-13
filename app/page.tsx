import { Search } from '@/components/search';
import type { YoutubeSearchParams } from 'youtube.ts';

export default async function Home(props: {
  searchParams: { q: string; order: YoutubeSearchParams['order'] };
}) {
  return (
    <div className="sticky top-8">
      <Search order={props.searchParams.order} q={props.searchParams.q} />
    </div>
  );
}
