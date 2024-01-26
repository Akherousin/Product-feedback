'use client';

import { useFormState } from 'react-dom';
import * as actions from '@/actions';
import styles from './CreateRequestForm.module.css';
import { type Category } from '@prisma/client';
import Select from '../Select';
import Button from '../Button';
import FormButton from '../FormButton';
import paths from '@/paths';
import { useRef } from 'react';
import { useFocusOnInvalidInput } from '@/hooks/useFocusOnInvalidInput.hook';

const options: {
  label: string;
  value: Category;
}[] = [
  { label: 'UI', value: 'ui' },
  { label: 'UX', value: 'ux' },
  { label: 'Enhancement', value: 'enhancement' },
  { label: 'Bug', value: 'bug' },
  { label: 'Feature', value: 'feature' },
];

function CreateRequestForm() {
  const [formState, action] = useFormState(actions.createRequest, {
    errors: {},
  });
  const formRef = useRef<HTMLFormElement>(null);

  useFocusOnInvalidInput(formRef);

  return (
    <form
      className={`${styles.form} | box column`}
      action={action}
      ref={formRef}
    >
      <NewSvg />
      <h1 className={styles.title}>Create New Feedback</h1>
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
          options={options}
          className={styles.input}
          name="category"
          labelledby="category-label"
          describedby="category-description"
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
          aria-invalid={formState.errors.description ? true : undefined}
          aria-describedby="description-error-message description-description"
        />
        <p id="description-error-message" aria-live="assertive">
          {formState.errors.description &&
            formState.errors.description.join(', ')}
        </p>
      </div>
      <div className={`${styles.buttons} | column`}>
        <FormButton
          variant="purple"
          type="submit"
          announcerMessage="Adding feedback..."
          invokedAction={action}
        >
          Add Feedback
        </FormButton>
        <Button variant="grey" as="link" href={paths.home()}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

function NewSvg() {
  return (
    <svg
      width="56"
      height="56"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
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
        <circle fill="url(#a)" cx="28" cy="28" r="28" />
        <path
          fill="#FFF"
          fillRule="nonzero"
          d="M30.343 36v-5.834h5.686v-4.302h-5.686V20h-4.597v5.864H20v4.302h5.746V36z"
        />
      </g>
    </svg>
  );
}

export default CreateRequestForm;
