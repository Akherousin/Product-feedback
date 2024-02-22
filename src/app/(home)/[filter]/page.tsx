import RequestList from '@/components/RequestList';
import styles from '../page.module.css';
import { SortValues } from '@/components/Sort/Sort';
import { fetchAllRequests } from '@/db/queries/requests';
import { Category } from '@prisma/client';
import ActionsSection from '@/components/ActionsSection/ActionsSection';

export default async function HomeFilter({
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
  const requests = await fetchAllRequests(sort, 'suggestion', filter);

  return (
    <>
      <ActionsSection suggestions={requests.length} />
      <section className={styles.list}>
        <RequestList requests={requests} level={2} />
      </section>
    </>
  );
}
