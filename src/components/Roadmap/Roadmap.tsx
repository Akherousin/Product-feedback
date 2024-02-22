import { RequestWithCommentCount } from '@/db/queries/requests';
import RequestList from '../RequestList';
import styles from './Roadmap.module.css';

interface RoadmapProps {
  requests: RequestWithCommentCount[];
}

function Roadmap({ requests }: RoadmapProps) {
  const plannedRequests: RequestWithCommentCount[] = [];
  const inProgressRequests: RequestWithCommentCount[] = [];
  const liveRequests: RequestWithCommentCount[] = [];

  requests.forEach((request) => {
    if (request.status === 'planned') {
      plannedRequests.push(request);
    } else if (request.status === 'progress') {
      inProgressRequests.push(request);
    } else if (request.status === 'live') {
      liveRequests.push(request);
    }
  });

  return (
    <div className={styles.wrapper}>
      <div>
        <h2>Planned ({plannedRequests.length})</h2>
        <p>Ideas prioritized for research</p>
        <RequestList requests={plannedRequests} level={3} decorated={true} />
      </div>
      <div>
        <h2>In-Progress ({inProgressRequests.length})</h2>
        <p>Currently being developed</p>
        <RequestList requests={inProgressRequests} level={3} decorated={true} />
      </div>
      <div>
        <h2>Live ({liveRequests.length})</h2>
        <p>Released features</p>
        <RequestList requests={liveRequests} level={3} decorated={true} />
      </div>
    </div>
  );
}

export default Roadmap;
