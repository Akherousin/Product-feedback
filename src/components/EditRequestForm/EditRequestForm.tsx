'use client';

import { useFormState } from 'react-dom';
import * as actions from '@/actions';
import styles from './EditRequestForm.module.css';
import { type Category, type Status } from '@prisma/client';
import Select from '../Select';
import Button from '../Button';
import { useRef, useState } from 'react';
import paths from '@/paths';
import FormButton from '../FormButton';
import { useFocusOnInvalidInput } from '@/hooks/useFocusOnInvalidInput.hook';
import { usePathname, useRouter } from 'next/navigation';

const categoryOptions: {
  label: string;
  value: Category;
}[] = [
  { label: 'UI', value: 'ui' },
  { label: 'UX', value: 'ux' },
  { label: 'Enhancement', value: 'enhancement' },
  { label: 'Bug', value: 'bug' },
  { label: 'Feature', value: 'feature' },
];

const statusOptions: {
  label: string;
  value: Status;
}[] = [
  { label: 'Suggestion', value: 'suggestion' },
  { label: 'Planned', value: 'planned' },
  { label: 'Progress', value: 'progress' },
  { label: 'Live', value: 'live' },
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

  const deleteRequestAction = async () => await actions.deleteRequest(id);

  useFocusOnInvalidInput(formRef);

  return (
    <form
      className={`${styles.form} | box column`}
      action={action}
      ref={formRef}
    >
      <EditSvg />
      <h1 className="h1">Editing &apos;{title}&apos;</h1>
      <div className="field">
        <label className="h4 color-heading" htmlFor="title">
          {' '}
          Feedback Title
        </label>
        <p id="title-description">Add a short descriptive headline</p>
        <input
          type="text"
          id="title"
          name="title"
          defaultValue={title}
          aria-invalid={formState.errors.title ? true : undefined}
          aria-describedby="title-error-message title-description"
          className="input"
        />
        <p id="title-error-message" aria-live="assertive" className="error">
          {formState.errors.title && formState.errors.title.join(', ')}
        </p>
      </div>
      <div className="field">
        <label className="h4 color-heading" id="category-label">
          Category
        </label>
        <p id="category-description">Choose a category for your feedback</p>
        <Select
          initialValue={category}
          options={categoryOptions}
          name="category"
          labelledby="category-label"
          describedby="category-description"
          className="input"
        />
      </div>

      <div className="field">
        <label className="h4 color-heading" id="status-label">
          Update Status
        </label>
        <p id="status-description">Change feature state</p>
        <Select
          initialValue={status}
          options={statusOptions}
          name="status"
          labelledby="status-label"
          describedby="status-description"
          className="input"
        />
      </div>

      <div className="field">
        <label className="h4 color-heading" htmlFor="description">
          Feedback Detail
        </label>
        <p id="description-description">
          Include any specific comments on what should be improved, added, etc.
        </p>
        <textarea
          id="description"
          name="description"
          defaultValue={description}
          aria-invalid={formState.errors.description ? true : undefined}
          aria-describedby="description-error-message description-description"
          className="input"
        />
        <p
          id="description-error-message"
          aria-live="assertive"
          className="error"
        >
          {formState.errors.description &&
            formState.errors.description.join(', ')}
        </p>
      </div>
      <div className={styles.buttons}>
        <FormButton
          variant="purple"
          type="submit"
          announcerMessage="Saving changes..."
          invokedAction={action}
        >
          Save Changes
        </FormButton>
        <Button
          variant="grey"
          as="link"
          href={`${paths.showRequestPage(slug)}?updated=true`}
        >
          Cancel
        </Button>
        <FormButton
          variant="red"
          type="submit"
          formAction={deleteRequestAction}
          announcerMessage="Deleting request..."
          invokedAction={deleteRequestAction}
        >
          Delete
        </FormButton>
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
