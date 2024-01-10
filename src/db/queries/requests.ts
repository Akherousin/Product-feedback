import { db } from '..';
import { cache } from 'react';

export function fetchAllRequests() {
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
