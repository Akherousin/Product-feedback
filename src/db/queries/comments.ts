import { cache } from 'react';
import { db } from '..';

export const fetchCommentsByRequestId = cache((requestId: string) => {
  return db.comment.findMany({
    where: { requestId },
    include: {
      user: {
        select: {
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
