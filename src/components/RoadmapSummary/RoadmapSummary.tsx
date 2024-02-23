import Link from 'next/link';
import styles from './RoadmapSummary.module.css';
import { fetchAllRequests } from '@/db/queries/requests';
import paths from '@/paths';

async function RoadmapSummary() {
  const requests = await fetchAllRequests();

  let plannedSize = 0;
  let inProgressSize = 0;
  let liveSize = 0;

  requests.forEach((request) => {
    if (request.status === 'planned') plannedSize++;
    if (request.status === 'progress') inProgressSize++;
    if (request.status === 'live') liveSize++;
  });

  return (
    <article className={`${styles.roadmap} | box`}>
      <header className="flex">
        <h2 className="color-heading">Roadmap</h2>
        <Link
          href={paths.showRoadmapPage()}
          className={`${styles.link} | click-target-helper`}
        >
          View <span className="visually-hidden">Roadmap</span>
        </Link>
      </header>

      <dl className={styles.info}>
        <dt className={styles.status}>Planned</dt>
        <dd>{plannedSize}</dd>

        <dt className={styles.status}>In-Progress</dt>
        <dd>{inProgressSize}</dd>

        <dt className={styles.status}>Live</dt>
        <dd>{liveSize}</dd>
      </dl>
    </article>
  );
}

export default RoadmapSummary;
