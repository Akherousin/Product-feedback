import { RequestWithCommentCount } from '@/db/queries/requests';
import RequestCard from '@/components/RequestCard';
import { notFound } from 'next/navigation';
import styles from './RequestList.module.css';

interface RequestListProps {
  requests: RequestWithCommentCount[];
  level: 1 | 2 | 3;
  decorated?: boolean;
}

async function RequestList({ requests, level, decorated }: RequestListProps) {
  if (requests.length < 1) notFound();

  return (
    <ul className={styles.list}>
      {requests.map(
        ({
          id,
          title,
          category,
          upvotes,
          description,
          slug,
          status,
          _count,
        }) => {
          return (
            <li key={id}>
              <RequestCard
                id={id}
                title={title}
                level={level}
                slug={slug}
                status={status}
                category={category}
                upvotes={upvotes}
                description={description}
                comments={_count.comments}
                decorated={decorated}
                asLink={true}
              />
            </li>
          );
        }
      )}
    </ul>
  );
}

export default RequestList;
