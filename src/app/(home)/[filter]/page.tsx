import RequestList from '@/components/RequestList';
import SkeletonCardList from '@/components/SkeletonCardList';
import { SortValues } from '@/components/Sort/Sort';
import { fetchAllRequests } from '@/db/queries/requests';
import { Category } from '@prisma/client';
import { Suspense } from 'react';

export default async function Home({
  params,
  searchParams,
}: {
  params: {
    filter: Category;
  };
  searchParams: {
    sort: SortValues;
  };
}) {
  const { sort } = searchParams;
  const { filter } = params;
  const requests = (await fetchAllRequests(sort, filter)).filter(
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
