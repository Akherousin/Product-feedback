'use client';

import { useFormState } from 'react-dom';
import * as actions from '@/actions';
import styles from './CreateCommentForm.module.css';
import Button from '@/components/Button';
import { type ChangeEvent, useRef, useState, useEffect } from 'react';
import { useOnClickOutside } from '@/hooks/useOnClickOutside.hook';

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
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useOnClickOutside(formRef, () => {
    if (variant === 'reply') {
      hideForm?.();
    }
  });

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCharactersLeft(MAX_COMMENTS_LENGTH - e.target.textLength);
  };

  useEffect(() => {
    if (variant === 'reply') {
      textareaRef?.current?.focus();
    }
  }, [variant]);

  return (
    <form
      className={`${styles.form} ${variant === 'reply' ? styles.reply : ''} | ${
        variant === 'comment' ? 'box' : ''
      }`}
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
      {variant === 'comment' && <h2 className={styles.heading}>Add Comment</h2>}
      <div className={styles.field}>
        <label htmlFor="content" hidden>
          Add new {variant}
        </label>
        <textarea
          className={'input'}
          id="content"
          name="content"
          placeholder={`Type your ${variant} here`}
          onChange={handleChange}
          maxLength={MAX_COMMENTS_LENGTH}
          aria-invalid={Boolean(formState.errors.content)}
          aria-describedby="content-error-message content-characters-left"
          ref={textareaRef}
        />
      </div>
      <p
        aria-live="assertive"
        id="content-error-message"
        className={styles.error}
      >
        {formState.errors.content && formState.errors.content.join(', ')}
      </p>
      <div className="flex">
        <p
          aria-live="polite"
          id="content-characters-left"
          hidden={variant === 'reply' ? true : undefined}
        >
          {charactersLeft} {charactersLeft === 1 ? 'character' : 'characters'}{' '}
          left
        </p>
        <Button variant="purple">Post {variant}</Button>
      </div>
    </form>
  );
}

export default CreateCommentForm;
