import styles from './page.module.css';
import RequestList from '@/components/RequestList';
import { SortValues } from '@/components/Sort/Sort';
import { fetchAllRequests } from '@/db/queries/requests';
import ActionsSection from '@/components/ActionsSection/ActionsSection';
import SkeletonCardList from '@/components/SkeletonCardList';

export default async function Home({
  searchParams,
}: {
  searchParams: {
    sort: SortValues;
  };
}) {
  const requests = await fetchAllRequests(searchParams.sort, 'suggestion');

  return (
    <>
      <ActionsSection suggestions={requests.length} />
      <section className={styles.list}>
        <RequestList requests={requests} level={2} />
      </section>
    </>
  );
}
