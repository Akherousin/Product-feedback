import CreateRequestForm from '@/components/CreateRequestForm';
import GoBackLink from '@/components/GoBackLink';
import styles from './page.module.css';

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
