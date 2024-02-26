import Button from '@/components/Button';
import EditRequestForm from '@/components/EditRequestForm';
import GoBackLink from '@/components/GoBackLink';
import { fetchRequest } from '@/db/queries/requests';
import styles from './page.module.css';
import { notFound } from 'next/navigation';

interface EditRequestPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: EditRequestPageProps) {
  const request = await fetchRequest(params.slug);

  return {
    title: `Edit ${request?.title} - Frontend Mentor`,
  };
}

export default async function EditRequestPage({
  params,
}: EditRequestPageProps) {
  const request = await fetchRequest(params.slug);
  if (!request) notFound();

  return (
    <div className={styles.wrapper}>
      <header>
        <GoBackLink variant="plain" />
      </header>
      <main>
        <EditRequestForm
          id={request.id}
          slug={request.slug}
          title={request.title}
          description={request.description}
          category={request.category}
          status={request.status}
        />
      </main>
    </div>
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
