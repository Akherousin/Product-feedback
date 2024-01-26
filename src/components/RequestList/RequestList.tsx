import { fetchAllRequests } from '@/db/queries/requests';
import { notFound } from 'next/navigation';
import RequestCard from '../RequestCard';
import { SortValues } from '../Sort/Sort';
import { Category } from '@prisma/client';

interface RequestListProps {
  sortBy: SortValues;
  filter?: Category;
}

async function RequestList({ sortBy, filter }: RequestListProps) {
  const requests = await fetchAllRequests(sortBy, filter);

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
