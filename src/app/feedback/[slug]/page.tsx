import Button from '@/components/Button';
import paths from '@/paths';
import styles from './page.module.css';
import { fetchRequest } from '@/db/queries/requests';
import RequestCard from '@/components/RequestCard';
import { notFound } from 'next/navigation';
import CommentList from '@/components/CommentList/CommentList';
import GoBackLink from '@/components/GoBackLink/GoBackLink';

interface RequestPageProps {
  params: {
    slug: string;
  };
}

export default async function RequestPage({ params }: RequestPageProps) {
  const request = await fetchRequest(params.slug);
  if (!request) notFound();

  return (
    <>
      <header className={styles.header}>
        <div className="container flex">
          <GoBackLink />

          <Button
            variant="blue"
            as="link"
            href={paths.showEditPage(params.slug)}
          >
            Edit feedback
          </Button>
        </div>
      </header>
      <main>
        <div className="container">
          <RequestCard
            id={request.id}
            title={request.title}
            level={1}
            slug={request.slug}
            description={request.description}
            category={request.category}
            upvotes={request.upvotes}
            comments={request.comments.length}
          />
          <section>
            <CommentList requestId={request.id} />
          </section>
        </div>
      </main>
    </>
  );
}
