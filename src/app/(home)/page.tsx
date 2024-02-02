import RequestList from '@/components/RequestList';
import { SortValues } from '@/components/Sort/Sort';
import { Suspense } from 'react';
import SkeletonCardList from '@/components/SkeletonCardList';
import { fetchAllRequests } from '@/db/queries/requests';

export default async function Home({
  searchParams,
}: {
  searchParams: {
    sort: SortValues;
  };
}) {
  const requests = (await fetchAllRequests(searchParams.sort)).filter(
    (request) => request.status === 'suggestion'
  );

  return (
    <>
      <div className="container column">
        <RequestList requests={requests} />
      </div>
    </>
  );
}
