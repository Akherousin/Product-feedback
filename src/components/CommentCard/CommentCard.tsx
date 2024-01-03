'use client';

import Image from 'next/image';
import avatarImg from '@/assets/user-images/image-anne.jpg';
import styles from './CommentCard.module.css';
import { useState } from 'react';
import CreateCommentForm from '../CreateCommentForm';
import { type Comment } from '@prisma/client';

interface CommentCardProps {
  commentId: string;
  comments: ({
    user: {
      image: string | null;
      name: string;
      username: string;
    };
    parent: {
      user: {
        username: string;
      };
    } | null;
  } & Comment)[];
}

function CommentCard({ comments, commentId }: CommentCardProps) {
  const [showForm, setShowForm] = useState(false);
  const comment = comments.find((c) => c.id === commentId);

  if (!comment) return null;

  const children = comments.filter((c) => c.replyingToId === commentId);

  const renderedChildren = children.map((child) => {
    return (
      <li key={child.id}>
        <CommentCard commentId={child.id} comments={comments} />
      </li>
    );
  });

  return (
    <article className={`${styles.comment}`}>
      <header>
        <div className={styles.avatar}>
          <Image src={avatarImg} alt="" />
        </div>
        <div className={styles.authorInfo}>
          <p className={styles.author}>{comment.user.name}</p>
          <p>@{comment.user.username}</p>
        </div>
        <button className={styles.btn} onClick={() => setShowForm(!showForm)}>
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
          requestId={comment.requestId}
        />
      )}

      {renderedChildren.length > 0 && (
        <ul className={styles.replies}>{renderedChildren}</ul>
      )}
    </article>
  );
}

export default CommentCard;
