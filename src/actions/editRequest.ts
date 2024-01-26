'use server';

import slugify from 'slugify';
import { type Request } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { RedirectType, redirect } from 'next/navigation';
import { z } from 'zod';
import { db } from '@/db';
import paths from '@/paths';

interface EditRequestFormState {
  errors: {
    title?: string[];
    description?: string[];
    _form?: string[];
  };
}

const categoryTypeSchema = z.enum([
  'ux',
  'ui',
  'enhancement',
  'bug',
  'feature',
]);

const statusTypeSchema = z.enum(['suggestion', 'planned', 'progress', 'live']);

const editRequestSchema = z.object({
  title: z.string().min(1, { message: 'Title cannot be empty' }),
  description: z.string().min(1, { message: 'You must provide a description' }),
  category: categoryTypeSchema,
  status: statusTypeSchema,
});

export async function editRequest(
  { requestId }: { requestId: string },
  formState: EditRequestFormState,
  formData: FormData
): Promise<EditRequestFormState> {
  const result = editRequestSchema.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
    category: formData.get('category'),
    status: formData.get('status'),
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  let request: Request;
  try {
    request = await db.request.update({
      where: { id: requestId },
      data: {
        title: result.data.title,
        slug: slugify(result.data.title),
        description: result.data.description,
        category: result.data.category,
        status: result.data.status,
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
  redirect(`${paths.showRequestPage(slugify(result.data.title))}?updated=true`);
}
