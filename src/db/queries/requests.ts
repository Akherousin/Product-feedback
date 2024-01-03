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

export function fetchRequest(slug: string) {
  return db.request.findFirst({
    where: { slug },
    include: {
      comments: true,
    },
  });
}
