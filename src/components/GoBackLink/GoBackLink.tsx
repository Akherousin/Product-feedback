'use client';

import paths from '@/paths';
import Button from '../Button';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { useSessionStorage } from '@uidotdev/usehooks';

interface GoBackLinkProps {
  variant: 'dark-grey' | 'plain';
}

function GoBackLink({ variant }: GoBackLinkProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  let isFirstVisit = false;
  if (typeof window !== 'undefined') {
    isFirstVisit = sessionStorage.getItem('isFirstVisit') === null;
  }
  const goToHomePage = searchParams.get('updated') === 'true';

  return (
    <Button
      as="link"
      href="#"
      variant={variant}
      onClick={(e) => {
        e.preventDefault();
        alert(isFirstVisit);
        sessionStorage.setItem('isFirstVisit', 'false');
        if (isFirstVisit) return router.push(paths.home());
        if (goToHomePage) {
          return router.push(paths.home());
        } else {
          return router.back();
        }
      }}
    >
      <ArrowLeftSvg variant={variant} />
      <span data-is-first={isFirstVisit}>Go Back</span>
    </Button>
  );
}

function SuspensedGoBackLink({ ...delegated }: GoBackLinkProps) {
  return (
    <Suspense fallback={null}>
      <GoBackLink {...delegated} />
    </Suspense>
  );
}

function ArrowLeftSvg({ variant }: Pick<GoBackLinkProps, 'variant'>) {
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

export default SuspensedGoBackLink;
