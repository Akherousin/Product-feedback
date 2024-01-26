'use server';

import slugify from 'slugify';
import { type Request } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { db } from '@/db';
import paths from '@/paths';

interface CreateRequestFormState {
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

const createRequestSchema = z.object({
  title: z.string().min(1, { message: 'Title cannot be empty' }),
  description: z.string().min(1, { message: 'You must provide a description' }),
  category: categoryTypeSchema,
});

export async function createRequest(
  formState: CreateRequestFormState,
  formData: FormData
): Promise<CreateRequestFormState> {
  const result = createRequestSchema.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
    category: formData.get('category'),
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  let request: Request;
  try {
    request = await db.request.create({
      data: {
        title: result.data.title,
        slug: slugify(result.data.title),
        description: result.data.description,
        category: result.data.category,
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
