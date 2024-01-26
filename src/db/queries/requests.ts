import { db } from '..';
import { cache } from 'react';
import { Category, Request } from '@prisma/client';
import { SortValues } from '@/components/Sort/Sort';

export type RequestWithCommentCount = Request & {
  _count: {
    comments: number;
  };
};

export const fetchAllRequests = cache(
  (
    sortBy?: SortValues,
    filter?: Category
  ): Promise<RequestWithCommentCount[]> => {
    let sort;
    switch (sortBy) {
      case 'lu': {
        sort = {
          upvotes: 'asc' as const,
        };
        break;
      }
      case 'mu': {
        sort = {
          upvotes: 'desc' as const,
        };
        break;
      }
      case 'lc': {
        sort = {
          comments: {
            _count: 'asc' as const,
          },
        };
        break;
      }
      case 'mc': {
        sort = {
          comments: {
            _count: 'desc' as const,
          },
        };
        break;
      }
      default: {
        sort = {
          upvotes: 'desc' as const,
        };
        break;
      }
    }

    return db.request.findMany({
      where: {
        category: filter,
      },
      include: {
        _count: {
          select: {
            comments: true,
          },
        },
      },
      orderBy: sort,
    });
  }
);

export const fetchRequest = cache((slug: string) => {
  return db.request.findFirst({
    where: { slug },
    include: {
      comments: true,
    },
  });
});
