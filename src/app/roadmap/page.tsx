import Button from '@/components/Button';
import paths from '@/paths';
import styles from './page.module.css';
import TabList from '@/components/TabList';
import { fetchAllRequests } from '@/db/queries/requests';

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
            <Button as="link" href={paths.home()} variant="dark-grey">
              <ArrowLeftSvg />
              <span>Go Back</span>
            </Button>

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

function ArrowLeftSvg() {
  return (
    <svg
      width="7"
      height="10"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M6 9L2 5l4-4"
        stroke="#CDD2EE"
        strokeWidth="2"
        fill="none"
        fillRule="evenodd"
      />
    </svg>
  );
}
