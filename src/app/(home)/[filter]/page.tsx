import RequestList from '@/components/RequestList';
import { SortValues } from '@/components/Sort/Sort';
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
  const { filter } = params;

  return (
    <>
      <div className="container column">
        <Suspense key={searchParams.sort} fallback={null}>
          <RequestList sortBy={searchParams.sort} filter={filter} />
        </Suspense>
      </div>
    </>
  );
}
