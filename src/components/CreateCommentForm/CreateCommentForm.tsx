'use client';

import { useFormState } from 'react-dom';
import * as actions from '@/actions';
import styles from './CreateCommentForm.module.css';
import Button from '@/components/Button';
import { type ChangeEvent, useRef, useState } from 'react';

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

const MAX_COMMENTS_LENGTH = 250;

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
  const [charactersLeft, setCharactersLeft] = useState(MAX_COMMENTS_LENGTH);
  const formRef = useRef<HTMLFormElement | null>(null);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCharactersLeft(MAX_COMMENTS_LENGTH - e.target.textLength);
  };

  return (
    <form
      className={`${styles.form} | ${variant === 'reply' ? '' : 'box'} column`}
      action={async (formData: FormData) => {
        const content = formData.get('content') as string;
        if (content?.length > 0) {
          addOptimisticComment({
            newComment: content,
            replyingToId: replyingToId || null,
            parentUserName: replyingToId ? parentUserName : null,
          });
        }
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
          onChange={handleChange}
          maxLength={MAX_COMMENTS_LENGTH}
          aria-invalid={Boolean(formState.errors.content)}
          aria-describedby="content-error-message content-characters-left"
        />
      </div>
      <p aria-live="assertive" id="content-error-message">
        {formState.errors.content && formState.errors.content.join(', ')}
      </p>
      <div className="flex">
        <p aria-live="polite" id="content-characters-left">
          {charactersLeft} {charactersLeft === 1 ? 'character' : 'characters'}{' '}
          left
        </p>
        <Button variant="purple">Post {variant}</Button>
      </div>
    </form>
  );
}

export default CreateCommentForm;
