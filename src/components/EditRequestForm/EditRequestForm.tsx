'use client';

import { useFormState } from 'react-dom';
import * as actions from '@/actions';
import styles from './EditRequestForm.module.css';
import { type Category, type Status } from '@prisma/client';
import Select from '../Select';
import Button from '../Button';
import { useRef, useState } from 'react';
import paths from '@/paths';

const categoryOptions: {
  label: string;
  value: Category;
}[] = [
  { label: 'UI', value: 'UI' },
  { label: 'UX', value: 'UX' },
  { label: 'Enhancement', value: 'Enhancement' },
  { label: 'Bug', value: 'Bug' },
  { label: 'Feature', value: 'Feature' },
];

const statusOptions: {
  label: string;
  value: Status;
}[] = [
  { label: 'Suggestion', value: 'Suggestion' },
  { label: 'Planned', value: 'Planned' },
  { label: 'Progress', value: 'Progress' },
  { label: 'Live', value: 'Live' },
];

interface EditRequestFormProps {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: Category;
  status: Status;
}

function EditRequestForm({
  id,
  title,
  slug,
  description,
  category,
  status,
}: EditRequestFormProps) {
  const [formState, action] = useFormState(
    actions.editRequest.bind(null, { requestId: id }),
    {
      errors: {},
    }
  );

  const formRef = useRef<HTMLFormElement>(null);

  // const handleCancelClick = () => {
  //   formRef.current?.reset();
  // };

  return (
    <form
      className={`${styles.form} | box column`}
      action={action}
      ref={formRef}
    >
      <EditSvg />
      <h1 className={styles.title}>Editing &apos;{title}&apos;</h1>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="title">
          {' '}
          Feedback Title
        </label>
        <p id="title-description" className={styles.description}>
          Add a short descriptive headline
        </p>
        <input
          type="text"
          id="title"
          name="title"
          className={styles.input}
          defaultValue={title}
          aria-invalid={formState.errors.title ? true : undefined}
          aria-describedby="title-error-message title-description"
        />
        <p id="title-error-message" aria-live="assertive">
          {formState.errors.title && formState.errors.title.join(', ')}
        </p>
      </div>
      <div className={styles.field}>
        <label className={styles.label} id="category-label">
          Category
        </label>
        <p className={styles.description} id="category-description">
          Choose a category for your feedback
        </p>
        <Select
          initialValue={category}
          options={categoryOptions}
          className={styles.input}
          name="category"
          labelledby="category-label"
          describedby="category-description"
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} id="status-label">
          Update Status
        </label>
        <p className={styles.description} id="status-description">
          Change feature state
        </p>
        <Select
          initialValue={status}
          options={statusOptions}
          className={styles.input}
          name="status"
          labelledby="status-label"
          describedby="status-description"
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="description">
          Feedback Detail
        </label>
        <p className={styles.description} id="description-description">
          Include any specific comments on what should be improved, added, etc.
        </p>
        <textarea
          className={styles.input}
          id="description"
          name="description"
          defaultValue={description}
          aria-invalid={formState.errors.description ? true : undefined}
          aria-describedby="description-error-message description-description"
        />
        <p id="description-error-message" aria-live="assertive">
          {formState.errors.description &&
            formState.errors.description.join(', ')}
        </p>
      </div>
      <div className={`${styles.buttons} | column`}>
        <Button variant="purple" type="submit">
          Save Changes
        </Button>
        <Button variant="grey" as="link" href={paths.showRequestPage(slug)}>
          Cancel
        </Button>
        <Button
          variant="red"
          type="button"
          onClick={() => actions.deleteRequest(id)}
        >
          Delete
        </Button>
      </div>
    </form>
  );
}

function EditSvg() {
  return (
    <svg
      width="40"
      height="40"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      aria-hidden="true"
    >
      <defs>
        <radialGradient
          cx="103.9%"
          cy="-10.387%"
          fx="103.9%"
          fy="-10.387%"
          r="166.816%"
          id="a"
        >
          <stop stopColor="#E84D70" offset="0%" />
          <stop stopColor="#A337F6" offset="53.089%" />
          <stop stopColor="#28A7ED" offset="100%" />
        </radialGradient>
      </defs>
      <g fill="none" fillRule="evenodd">
        <circle fill="url(#a)" cx="20" cy="20" r="20" />
        <path
          d="M19.512 15.367l4.975 4.53-3.8 5.54L11.226 29l4.485-4.1c.759.275 1.831.026 2.411-.594a1.958 1.958 0 00-.129-2.82c-.836-.745-2.199-.745-2.964.068-.57.607-.767 1.676-.44 2.381L11 28.713c.255-1.06.683-2.75 1.115-4.436l.137-.531c.658-2.563 1.287-4.964 1.287-4.964l5.973-3.415zM23.257 12L28 16.443l-2.584 2.606-4.89-4.583L23.257 12z"
          fill="#FFF"
          fillRule="nonzero"
        />
      </g>
    </svg>
  );
}

export default EditRequestForm;
