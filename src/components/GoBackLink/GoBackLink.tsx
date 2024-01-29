'use client';

import paths from '@/paths';
import Button from '../Button';
import { useRouter, useSearchParams } from 'next/navigation';

interface GoBackLinkProps {
  variant: 'dark-grey' | 'plain';
}

function GoBackLink({ variant }: GoBackLinkProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const goToHomePage = searchParams.get('updated') === 'true';

  return (
    <Button
      as="link"
      href="#"
      variant={variant}
      onClick={(e) => {
        e.preventDefault();
        if (goToHomePage) {
          router.push(paths.home());
        } else {
          router.back();
        }
      }}
    >
      <ArrowLeftSvg variant={variant} />
      <span>Go Back</span>
    </Button>
  );
}

function ArrowLeftSvg({ variant }: GoBackLinkProps) {
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
        stroke={variant === 'plain' ? '#4661E6' : '#CDD2EE'}
        strokeWidth="2"
        fill="none"
        fillRule="evenodd"
      />
    </svg>
  );
}

export default GoBackLink;
