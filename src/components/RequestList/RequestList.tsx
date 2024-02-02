import { RequestWithCommentCount } from '@/db/queries/requests';
import { notFound } from 'next/navigation';
import RequestCard from '../RequestCard';

interface RequestListProps {
  requests: RequestWithCommentCount[];
}

async function RequestList({ requests }: RequestListProps) {
  if (requests.length < 1) notFound();

  return (
    <>
      {requests.map(
        ({ id, title, category, upvotes, description, slug, _count }) => {
          return (
            <RequestCard
              key={id}
              id={id}
              title={title}
              level={2}
              slug={slug}
              category={category}
              upvotes={upvotes}
              description={description}
              comments={_count.comments}
            />
          );
        }
      )}
    </>
  );
}

export default RequestList;
