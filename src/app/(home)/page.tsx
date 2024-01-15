import RequestCard from '@/components/RequestCard';
import RequestList from '@/components/RequestList';
import { SortValues } from '@/components/Sort/Sort';
import { fetchAllRequests } from '@/db/queries/requests';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

export default async function Home({
  searchParams,
}: {
  searchParams: {
    sort: SortValues;
  };
}) {
  return (
    <>
      <div className="container column">
        <Suspense key={searchParams.sort} fallback={null}>
          <RequestList sortBy={searchParams.sort} />
        </Suspense>
      </div>
    </>
  );
}
