import { Result } from './result';
import type { YoutubeVideoSearch } from 'youtube.ts';

type ResultsProps = YoutubeVideoSearch;

export function Results(props: ResultsProps) {
  const { items = [] } = props;

  return (
    <section className="grid grid-cols-3 gap-8 items-start">
      {items?.map((item) => (
        <Result key={item.id.videoId} {...item} />
      ))}
    </section>
  );
}
