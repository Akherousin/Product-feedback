import Button from '@/components/Button';
import paths from '@/paths';
import styles from './page.module.css';
import TabList from '@/components/TabList';
import { fetchAllRequests } from '@/db/queries/requests';
import GoBackLink from '@/components/GoBackLink';
import Roadmap from '@/components/Roadmap';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Roadmap - Frontend Mentor',
};

export default async function RoadmapPage({
  searchParams,
}: {
  searchParams: {
    tab: string;
  };
}) {
  const requests = await fetchAllRequests();
  const defaultTab = +searchParams.tab || 0;

  return (
    <div className={styles.wrapper}>
      <header className={`${styles.header} | flex`}>
        <div>
          <GoBackLink variant="dark-grey" />
          <h1 className={styles.title}>Roadmap</h1>
        </div>

        <Button as="link" href={paths.createRequest()} variant="purple">
          + Add Feedback
        </Button>
      </header>
      <main className={styles.main}>
        <Roadmap requests={requests} />
        <TabList requests={requests} defaultTab={defaultTab} />
      </main>
    </div>
  );
}
