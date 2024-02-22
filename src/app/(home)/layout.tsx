import paths from '@/paths';
import styles from './layout.module.css';
import Button from '@/components/Button';
import Sort from '@/components/Sort';
import Header from '@/components/Header';
import RoadmapSummary from '@/components/RoadmapSummary';
import Suggestions from '@/components/Suggestions';
import { fetchAllRequests } from '@/db/queries/requests';

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.layout}>
      <Header roadmap={<RoadmapSummary />} />
      <main>{children}</main>
    </div>
  );
}
