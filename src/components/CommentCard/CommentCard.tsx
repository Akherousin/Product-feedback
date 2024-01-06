'use client';

import Image from 'next/image';
import avatarImg from '@/assets/user-images/image-anne.jpg';
import styles from './CommentCard.module.css';
import { useOptimistic, useState } from 'react';
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

const currentUser: User = {
  id: '657d4f9f0f48518bd306766d',
  name: 'Suzanne Chang',
  username: 'upbeat1811',
  image: null,
};

function CommentCard({
  comments,
  commentId,
  addOptimisticComment,
}: CommentCardProps) {
  const [showForm, setShowForm] = useState(false);
  const comment = comments.find((c) => c.id === commentId);

  if (!comment) return null;

  const children = comments.filter((c) => c.replyingToId === commentId);
  const renderedChildren = children.map((child) => {
    return (
      <li key={child.id}>
        <CommentCard
          commentId={child.id}
          comments={comments}
          addOptimisticComment={addOptimisticComment}
        />
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
          parentUserName={comment.parent?.user.username}
          requestId={comment.requestId}
          hideForm={() => setShowForm(false)}
          addOptimisticComment={addOptimisticComment}
        />
      )}

      <ul className={styles.replies}>{renderedChildren}</ul>
    </article>
  );
}

export default CommentCard;
