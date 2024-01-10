import RequestCard from '@/components/RequestCard';
import { fetchAllRequests } from '@/db/queries/requests';
import { notFound } from 'next/navigation';

export default async function Home() {
  const requests = await fetchAllRequests();

  if (requests.length < 1) notFound();

  return (
    <>
      <div className="container column">
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
      </div>
    </>
  );
}
