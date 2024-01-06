'use client';

import { type CommentWithAuthorAndParent } from '@/db/queries/comments';
import CommentCard from '../CommentCard';
import styles from './CommentList.module.css';
import { useOptimistic } from 'react';
import CreateCommentForm from '../CreateCommentForm';
import CURRENT_USER from '@/currentUser';

interface ClientCommentListProps {
  requestId: string;
  comments: CommentWithAuthorAndParent[];
}

interface AddOptimisticCommentAction {
  newComment: string;
  replyingToId: string;
  parentUserName: string;
}

function ClientCommentList({ comments, requestId }: ClientCommentListProps) {
  const [optimisticComments, addOptimisticComment] = useOptimistic<
    CommentWithAuthorAndParent[],
    AddOptimisticCommentAction
  >(comments, (state, { newComment, replyingToId, parentUserName }) => {
    return [
      ...state,
      {
        content: newComment,
        user: CURRENT_USER,
        userId: CURRENT_USER.id,
        id: crypto.randomUUID(),
        requestId,
        replyingToId,
        parent: parentUserName
          ? {
              user: {
                username: parentUserName,
              },
            }
          : null,
      },
    ];
  });

  const topLevelComments = optimisticComments.filter(
    (comment) => comment.replyingToId === null
  );

  return (
    <>
      <div className={`${styles.comments__wrapper} | box`}>
        <h2 className={styles.title}>{optimisticComments.length} Comments</h2>
        <ul className={styles.comments}>
          {topLevelComments.map((comment) => (
            <li key={comment.id}>
              <CommentCard
                commentId={comment.id}
                comments={optimisticComments}
                addOptimisticComment={addOptimisticComment}
              />
            </li>
          ))}
        </ul>
      </div>
      <CreateCommentForm
        variant="comment"
        requestId={requestId}
        addOptimisticComment={addOptimisticComment}
      />
    </>
  );
}

export default ClientCommentList;
