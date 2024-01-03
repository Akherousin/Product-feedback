'use server';

import slugify from 'slugify';
import { Comment, type Request } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { db } from '@/db';
import paths from '@/paths';

interface CreateCommentFormState {
  errors: {
    content?: string[];
    _form?: string[];
  };
}

const createCommentSchema = z.object({
  content: z
    .string()
    .min(10, { message: 'Your comment must contain at least 10 characters.' }),
});

export async function createComment(
  {
    requestId,
    replyingToId,
  }: { requestId: string; replyingToId?: string | null },
  formState: CreateCommentFormState,
  formData: FormData
): Promise<CreateCommentFormState> {
  const result = createCommentSchema.safeParse({
    content: formData.get('content'),
  });

  if (!result.success) {
    console.log(result.error.flatten().fieldErrors);
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  let comment: Comment;
  try {
    comment = await db.comment.create({
      data: {
        content: result.data.content,
        userId: '657d4f9f0f48518bd306766d',
        requestId,
        replyingToId: replyingToId || null,
      },
    });
  } catch (err) {
    if (err instanceof Error) {
      return {
        errors: {
          _form: [err.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ['Something went wrong...'],
        },
      };
    }
  }

  const request = await db.request.findFirst({
    where: {
      comments: {
        some: {
          requestId: requestId,
        },
      },
    },
  });

  if (!request) {
    return {
      errors: {
        _form: ['Failed to revalidate request'],
      },
    };
  }

  revalidatePath(paths.showRequestPage(request.slug));
  redirect(paths.showRequestPage(request.slug));
}
