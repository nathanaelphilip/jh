import { Badge } from './ui/badge';
import { CommentsCount } from './comments-count';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import type { YoutubeVideoSearchItem } from 'youtube.ts';

type ResultProps = YoutubeVideoSearchItem;

export async function Result(props: ResultProps) {
  const { snippet, id } = props;

  return (
    <article className="gap-4 border-b border-gray-100 pb-8 self-stretch">
      <Image
        src={snippet.thumbnails.high.url}
        width={snippet.thumbnails.high.width}
        height={snippet.thumbnails.high.height}
        alt={snippet.title}
        key={id.videoId}
        className="w-full h-auto block border-gray-200 border-8 mb-4"
      />
      <div className="grid gap-2 items-start">
        <div>
          <Suspense
            fallback={<Badge variant="secondary">Loading Comments</Badge>}
          >
            <CommentsCount id={id.videoId} />
          </Suspense>
        </div>
        <h2 className="text-md font-semibold text-gray-900">
          <Link
            target="_blank"
            href={`https://www.youtube.com/watch?v=${id.videoId}`}
          >
            {snippet.title}
          </Link>
        </h2>
        {snippet.description && (
          <p className="text-sm text-gray-600">{snippet.description}</p>
        )}
      </div>
    </article>
  );
}
