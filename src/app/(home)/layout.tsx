import paths from '@/paths';
import styles from './layout.module.css';
import Button from '@/components/Button';
import Sort from '@/components/Sort';
import Header from '@/components/Header';
import RoadmapSummary from '@/components/RoadmapSummary';

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header roadmap={<RoadmapSummary />} />
      <main>
        <div className={`${styles.actions}`}>
          <div className="container flex">
            <Sort />

            <Button variant="purple" as="link" href={paths.createRequest()}>
              + Add Feedback
            </Button>
          </div>
        </div>

        <section className={styles.requests}>{children}</section>
      </main>
    </>
  );
}
