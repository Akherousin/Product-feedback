import { db } from '..';
import { cache } from 'react';
import { Request } from '@prisma/client';

export type RequestWithCommentCount = Request & {
  _count: {
    comments: number;
  };
};

export function fetchAllRequests(): Promise<RequestWithCommentCount[]> {
  return db.request.findMany({
    include: {
      _count: {
        select: {
          comments: true,
        },
      },
    },
  });
}

export const fetchRequest = cache((slug: string) => {
  return db.request.findFirst({
    where: { slug },
    include: {
      comments: true,
    },
  });
});
