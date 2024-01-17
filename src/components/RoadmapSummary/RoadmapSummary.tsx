import Link from 'next/link';
import styles from './RoadmapSummary.module.css';
import { fetchAllRequests } from '@/db/queries/requests';

async function RoadmapSummary() {
  const requests = await fetchAllRequests();

  let plannedSize = 0;
  let inProgressSize = 0;
  let liveSize = 0;

  requests.forEach((request) => {
    if (request.status === 'Planned') plannedSize++;
    if (request.status === 'Progress') inProgressSize++;
    if (request.status === 'Live') liveSize++;
  });

  return (
    <article className={`${styles.roadmap} | box`}>
      <header className="flex">
        <h2>Roadmap</h2>
        <Link href="/roadmap">
          View <span className="visually-hidden">Roadmap</span>
        </Link>
      </header>

      <dl className={styles.roadmap__list}>
        <dt>Planned</dt>
        <dd>{plannedSize}</dd>

        <dt>In-Progress</dt>
        <dd>{inProgressSize}</dd>

        <dt>Live</dt>
        <dd>{liveSize}</dd>
      </dl>
    </article>
  );
}

export default RoadmapSummary;
