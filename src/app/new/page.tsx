import Button from '@/components/Button';
import CreateRequestForm from '@/components/CreateRequestForm';
import { type CSSProperties } from 'react';

export default async function NewRequest() {
  return (
    <>
      <header>
        <div className="container">
          <Button as="link" href="/" variant="plain">
            <ArrowLeftSvg />
            <span>Go Back</span>
          </Button>
        </div>
      </header>
      <main>
        <div className="container ">
          <CreateRequestForm />
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
