'use client';

import Image from 'next/image';
import styles from './CommentCard.module.css';
import { useRef, useState } from 'react';
import CreateCommentForm from '../CreateCommentForm';
import { type User, type Comment } from '@prisma/client';

interface CommentCardProps {
  addOptimisticComment: (...args: any[]) => void;
  commentId: string;
  comments: ({
    user: User;
    parent: {
      user: {
        username: string;
      };
    } | null;
  } & Comment)[];
}

function CommentCard({
  comments,
  commentId,
  addOptimisticComment,
}: CommentCardProps) {
  const [showForm, setShowForm] = useState(false);
  const comment = comments.find((c) => c.id === commentId);

  if (!comment) return null;

  const children = comments.filter((c) => c.replyingToId === commentId);
  const renderedChildren = children.map((child, index) => {
    return (
      <li
        key={child.id}
        className={index === children.length - 1 ? styles.last : undefined}
      >
        <CommentCard
          commentId={child.id}
          comments={comments}
          addOptimisticComment={addOptimisticComment}
        />
      </li>
    );
  });

  return (
    <article
      className={`${styles.comment}`}
      data-top-level={!Boolean(comment.replyingToId)}
    >
      <header className={styles.header}>
        <div className={styles.avatar}>
          <Image
            src={`/user-images/${comment.user.image}.jpg`}
            alt="User avatar."
            fill
            style={{
              objectFit: 'cover',
            }}
            sizes="100%"
          />
        </div>
        <div className={styles.author}>
          <p className="h4 color-heading">{comment.user.name}</p>
          <p className={styles.username}>@{comment.user.username}</p>
        </div>
        <button
          className={`${styles.button} | click-target-helper`}
          onClick={() => {
            setShowForm(!showForm);
          }}
        >
          Reply
        </button>
      </header>

      <p className={styles.content}>
        {comment.parent && (
          <span className={styles.replyTo}>
            @{comment.parent.user.username}
          </span>
        )}{' '}
        {comment.content}
      </p>

      {showForm && (
        <CreateCommentForm
          variant="reply"
          replyingToId={comment.id}
          parentUserName={comment.user.username}
          requestId={comment.requestId}
          hideForm={() => setShowForm(false)}
          addOptimisticComment={addOptimisticComment}
        />
      )}

      {renderedChildren.length > 0 && (
        <>
          <ul
            className={styles.replies}
            data-single-reply={renderedChildren.length === 1}
          >
            {renderedChildren}
          </ul>
          <div className={styles.decoration} />
        </>
      )}
    </article>
  );
}

export default CommentCard;
