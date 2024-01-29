import Button from '@/components/Button';
import paths from '@/paths';
import styles from './page.module.css';
import { fetchRequest } from '@/db/queries/requests';
import RequestCard from '@/components/RequestCard';
import { notFound } from 'next/navigation';
import CommentList from '@/components/CommentList/CommentList';
import GoBackLink from '@/components/GoBackLink/GoBackLink';
import { Suspense } from 'react';
import SkeletonCommentList from '@/components/SkeletonCommentList';

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
          <GoBackLink variant="plain" />

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
            <Suspense fallback={null}>
              <CommentList requestId={request.id} />
            </Suspense>
            {/* <SkeletonCommentList /> */}
          </section>
        </div>
      </main>
    </>
  );
}

function ArrowLeftSvg() {
  return (
    <svg
      width="7"
      height="10"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M6 9L2 5l4-4"
        stroke="#4661E6"
        strokeWidth="2"
        fill="none"
        fillRule="evenodd"
      />
    </svg>
  );
}
