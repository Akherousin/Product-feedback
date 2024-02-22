import styles from './ActionsSection.module.css';
import Button from '@/components/Button';
import Sort from '@/components/Sort';
import Suggestions from '@/components/Suggestions';
import paths from '@/paths';

function ActionsSection({
  suggestions,
  loading,
}: {
  suggestions: number;
  loading?: boolean;
}) {
  return (
    <section className={`${styles.actions} | box`}>
      <Suggestions size={suggestions} loading={loading} />

      <Sort />

      <Button variant="purple" as="link" href={paths.createRequest()}>
        + Add Feedback
      </Button>
    </section>
  );
}

export default ActionsSection;
