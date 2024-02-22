import ActionsSection from '@/components/ActionsSection/ActionsSection';
import SkeletonCardList from '@/components/SkeletonCardList';
import styles from './page.module.css';

export default function HomeLoading() {
  return (
    <>
      <ActionsSection suggestions={0} loading={true} />
      <section className={styles.list}>
        <SkeletonCardList size={3} />;
      </section>
    </>
  );
}
