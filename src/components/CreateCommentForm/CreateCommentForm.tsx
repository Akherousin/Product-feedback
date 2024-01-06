'use client';

import { useFormState } from 'react-dom';
import * as actions from '@/actions';
import styles from './CreateCommentForm.module.css';
import Button from '@/components/Button';
import { useEffect, useRef } from 'react';

type CreateCommentFormProps = {
  requestId: string;
  parentUserName?: string;
  addOptimisticComment: (...args: any) => void;
  hideForm?: (...args: any) => void;
} & (
  | {
      variant: 'comment';
      replyingToId?: null;
    }
  | {
      variant: 'reply';
      replyingToId: string;
    }
);

function CreateCommentForm({
  requestId,
  variant = 'comment',
  replyingToId,
  parentUserName,
  addOptimisticComment,
  hideForm,
}: CreateCommentFormProps) {
  const [formState, action] = useFormState(
    actions.createComment.bind(null, {
      requestId,
      replyingToId,
    }),
    {
      errors: {},
    }
  );
  const formRef = useRef<HTMLFormElement | null>(null);

  return (
    <form
      className={`${styles.form} | ${variant === 'reply' ? '' : 'box'} column`}
      action={async (formData: FormData) => {
        const content = formData.get('content');
        addOptimisticComment({
          newComment: content,
          replyingToId: replyingToId || null,
          parentUserName: replyingToId ? parentUserName : null,
        });
        await action(formData);
        formRef.current?.reset();
        hideForm?.();
      }}
      ref={formRef}
    >
      {variant === 'comment' && <h2 className={styles.title}>Add Comment</h2>}
      <div className={styles.field}>
        <label className={styles.label} htmlFor="content" hidden>
          Add new {variant}
        </label>
        <textarea
          className={styles.input}
          id="content"
          name="content"
          placeholder={`Type your ${variant} here`}
        />
      </div>
      <div className="flex">
        <p>250 characters left</p>
        <Button variant="purple">Post {variant}</Button>
      </div>
    </form>
  );
}

export default CreateCommentForm;
