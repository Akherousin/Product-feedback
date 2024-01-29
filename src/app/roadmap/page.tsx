import Button from '@/components/Button';
import paths from '@/paths';
import styles from './page.module.css';
import TabList from '@/components/TabList';
import { fetchAllRequests } from '@/db/queries/requests';
import GoBackLink from '@/components/GoBackLink';

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
    <>
      <header className={styles.header}>
        <div className="container flex">
          <div>
            <GoBackLink variant="dark-grey" />
            <h1 className={styles.title}>Roadmap</h1>
          </div>

          <Button as="link" href={paths.createRequest()} variant="purple">
            + Add Feedback
          </Button>
        </div>
      </header>
      <main className="container">
        <TabList requests={requests} defaultTab={defaultTab} />
      </main>
    </>
  );
}
