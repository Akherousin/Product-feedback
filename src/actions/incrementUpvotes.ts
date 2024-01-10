'use server';

import { db } from '@/db';
import paths from '@/paths';
import { revalidatePath } from 'next/cache';

export async function incrementUpvotes(requestId: string) {
  await db.request.update({
    where: {
      id: requestId,
    },
    data: {
      upvotes: {
        increment: 1,
      },
    },
  });

  revalidatePath(paths.home());
}
