'use client';

import Button from '../Button';
import { useRouter } from 'next/navigation';

function GoBackLink() {
  const router = useRouter();

  return (
    <Button as="link" href="#" variant="plain" onClick={() => router.back()}>
      <ArrowLeftSvg />
      <span>Go Back</span>
    </Button>
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

export default GoBackLink;
