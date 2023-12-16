'use client';

import { useFormState } from 'react-dom';
import * as actions from '@/actions';
import styles from './CreateRequestForm.module.css';
import { type Category } from '@prisma/client';
import Select from '../Select';
import Button from '../Button';

const options: {
  label: string;
  value: Category;
}[] = [
  { label: 'UI', value: 'UI' },
  { label: 'UX', value: 'UX' },
  { label: 'Enhancement', value: 'Enhancement' },
  { label: 'Bug', value: 'Bug' },
  { label: 'Feature', value: 'Feature' },
];

function CreateRequestForm() {
  const [formState, action] = useFormState(actions.createRequest, {
    errors: {},
  });

  return (
    <form className={`${styles.form} | box column`} action={action}>
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
          aria-describedby="title-description"
          className={styles.input}
        />
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
          aria-describedby="description-description"
          name="description"
        />
      </div>
      <div className={`${styles.buttons} | column`}>
        <Button variant="purple" type="submit">
          Add Feedback
        </Button>
        <Button variant="grey" type="button">
          Cancel
        </Button>
      </div>
    </form>
  );
}

export default CreateRequestForm;
