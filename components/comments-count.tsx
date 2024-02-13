import type {
  YoutubeCommentThreadSearch,
  YoutubeVideoSearchItem,
} from 'youtube.ts';

import { Badge } from './ui/badge';
import { youtube } from '@/lib/youtube';

type VideoId = YoutubeVideoSearchItem['id']['videoId'];

async function getComments(id: VideoId) {
  try {
    const comments = await youtube.videos.comments(
      `https://www.youtube.com/watch?v=${id}`
    );
    return comments.items.length;
  } catch {
    return 0;
  }
}

type CommentsCountProps = {
  id: VideoId;
};

export async function CommentsCount(props: CommentsCountProps) {
  const { id } = props;
  const count = await getComments(id);

  return <Badge>{count} Comments</Badge>;
}
