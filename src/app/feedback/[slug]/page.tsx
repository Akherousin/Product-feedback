import Button from '@/components/Button';
import paths from '@/paths';
import styles from './page.module.css';
import { fetchRequest } from '@/db/queries/requests';
import RequestCard from '@/components/RequestCard';
import { notFound } from 'next/navigation';
import CommentList from '@/components/CommentList/CommentList';
import GoBackLink from '@/components/GoBackLink/GoBackLink';
import { Suspense } from 'react';

interface RequestPageProps {
  params: {
    slug: string;
  };
}

export default async function RequestPage({ params }: RequestPageProps) {
  const request = await fetchRequest(params.slug);
  if (!request) notFound();

  return (
    <div className={styles.wrapper}>
      <header className={`${styles.header} | flex`}>
        <GoBackLink variant="plain" />

        <Button variant="blue" as="link" href={paths.showEditPage(params.slug)}>
          Edit feedback
        </Button>
      </header>
      <main>
        <RequestCard
          id={request.id}
          title={request.title}
          level={1}
          slug={request.slug}
          status={request.status}
          description={request.description}
          category={request.category}
          upvotes={request.upvotes}
          comments={request.comments.length}
          asLink={false}
        />
        <section className={styles.comments}>
          <Suspense fallback={null}>
            <CommentList requestId={request.id} />
          </Suspense>
        </section>
      </main>
    </div>
  );
}
