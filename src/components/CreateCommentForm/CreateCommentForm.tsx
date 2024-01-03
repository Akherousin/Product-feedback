'use client';

import { useFormState } from 'react-dom';
import * as actions from '@/actions';
import styles from './CreateCommentForm.module.css';
import Button from '@/components/Button';

type CreateCommentFormProps = { requestId: string } & (
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

  return (
    <form
      className={`${styles.form} | ${variant === 'reply' ? '' : 'box'} column`}
      action={action}
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
