import { cache } from 'react';
import { db } from '..';
import { type User, type Comment } from '@prisma/client';

export type CommentWithAuthorAndParent = Comment & {
  user: User;
  parent: {
    user: {
      username: string;
    };
  } | null;
};

export const fetchCommentsByRequestId = cache((requestId: string) => {
  return db.comment.findMany({
    where: { requestId },
    include: {
      user: {
        select: {
          id: true,
          image: true,
          name: true,
          username: true,
        },
      },
      parent: {
        select: {
          user: {
            select: {
              username: true,
            },
          },
        },
      },
    },
  });
});
