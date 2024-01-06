import { cache } from 'react';
import { db } from '..';
import { type Comment } from '@prisma/client';

export type CommentWithAuthorAndParent = Comment & {
  user: { id: string; image: string | null; name: string; username: string };
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
