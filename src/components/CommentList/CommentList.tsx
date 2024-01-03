import { fetchCommentsByRequestId } from '@/db/queries/comments';
import CommentCard from '../CommentCard';
import styles from './CommentList.module.css';

interface CommentListProps {
  requestId: string;
}

async function CommentList({ requestId }: CommentListProps) {
  const comments = await fetchCommentsByRequestId(requestId);

  const topLevelComments = comments.filter(
    (comment) => comment.replyingToId === null
  );

  return (
    <div className={`${styles.comments__wrapper} | box`}>
      <h2 className={styles.title}>{comments.length} Comments</h2>
      <ul className={styles.comments}>
        {topLevelComments.map((comment) => (
          <li key={comment.id}>
            <CommentCard commentId={comment.id} comments={comments} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CommentList;
