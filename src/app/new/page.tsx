import CreateRequestForm from '@/components/CreateRequestForm';
import GoBackLink from '@/components/GoBackLink';
import styles from './page.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Add new Feedback - Frontend Mentor',
};

export default async function NewRequest() {
  return (
    <div className={styles.wrapper}>
      <header>
        <GoBackLink variant="plain" />
      </header>
      <main>
        <CreateRequestForm />
      </main>
    </div>
  );
}
