import { fetchCommentsByRequestId } from '@/db/queries/comments';

import ClientCommentList from './ClientCommentList';

interface CommentListProps {
  requestId: string;
}

async function CommentList({ requestId }: CommentListProps) {
  const comments = await fetchCommentsByRequestId(requestId);

  return <ClientCommentList comments={comments} requestId={requestId} />;
}

export default CommentList;
