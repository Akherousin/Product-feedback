import Button from '@/components/Button';
import EditRequestForm from '@/components/EditRequestForm';
import { fetchRequest } from '@/db/queries/requests';
import paths from '@/paths';
import { notFound } from 'next/navigation';

interface EditRequestPageProps {
  params: {
    slug: string;
  };
}

export default async function EditRequestPage({
  params,
}: EditRequestPageProps) {
  const request = await fetchRequest(params.slug);
  if (!request) notFound();

  return (
    <>
      <header>
        <div className="container">
          <Button as="link" href={paths.home()} variant="plain">
            <ArrowLeftSvg />
            <span>Go Back</span>
          </Button>
        </div>
      </header>
      <main>
        <div className="container ">
          <EditRequestForm
            id={request.id}
            slug={request.slug}
            title={request.title}
            description={request.description}
            category={request.category}
            status={request.status}
          />
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
