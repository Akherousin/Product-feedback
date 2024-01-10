'use server';

import { type Request } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { db } from '@/db';
import paths from '@/paths';

export async function deleteRequest(requestId: string) {
  let request: Request;
  try {
    await db.comment.updateMany({
      where: {
        requestId,
      },
      data: {
        replyingToId: null,
      },
    });

    request = await db.request.delete({
      where: {
        id: requestId,
      },
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        errors: {
          _form: [err.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ['Something went wrong'],
        },
      };
    }
  }

  revalidatePath(paths.home());
  redirect(paths.home());
}
