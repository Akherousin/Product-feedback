import RequestList from '@/components/RequestList';
import { SortValues } from '@/components/Sort/Sort';
import { Suspense } from 'react';
import SkeletonCardList from '@/components/SkeletonCardList';

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
        <Suspense
          key={searchParams.sort}
          fallback={<SkeletonCardList size={3} />}
        >
          <RequestList sortBy={searchParams.sort} />
        </Suspense>
      </div>
    </>
  );
}
