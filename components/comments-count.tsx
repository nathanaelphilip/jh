import type {
  YoutubeCommentThreadSearch,
  YoutubeVideoSearchItem,
} from 'youtube.ts';

import { Badge } from './ui/badge';

type VideoId = YoutubeVideoSearchItem['id']['videoId'];

async function getComments(id: VideoId) {
  try {
    const maxResults = 100;

    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/commentThreads?videoId=${id}&part=id&maxResults=${maxResults}&key=${process.env.GOOGLE_API_KEY}`
    );

    const data: YoutubeCommentThreadSearch = await response.json();

    return data.items.length;
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

  return <Badge variant="outline">{count} Comments</Badge>;
}
