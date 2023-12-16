import { db } from '..';

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
