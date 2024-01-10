'use client';

import { useOptimistic, useState } from 'react';
import styles from './UpvoteButton.module.css';
import { decrementUpvotes, incrementUpvotes } from '@/actions';
import CURRENT_USER from '@/currentUser';

interface UpvoteButtonProps {
  requestId: string;
  initialUpvotes: number;
}

function UpvoteButton({ initialUpvotes, requestId }: UpvoteButtonProps) {
  const [upvotes, setUpvotes] = useState(initialUpvotes);

  const hasBeenUpvoted = CURRENT_USER.likedRequests.includes(requestId);

  return (
    <button
      className={`${styles.upvotesButton} | pill`}
      onClick={async () => {
        if (!hasBeenUpvoted) {
          setUpvotes(upvotes + 1);
          CURRENT_USER.likedRequests.push(requestId);
          await incrementUpvotes(requestId);
        } else {
          setUpvotes(upvotes - 1);
          CURRENT_USER.likedRequests = CURRENT_USER.likedRequests.filter(
            (req) => req !== requestId
          );
          await decrementUpvotes(requestId);
        }
      }}
    >
      <ArrowUpSvg />
      {upvotes}{' '}
      <span className="visually-hidden">
        {upvotes === 1 ? 'upvote' : 'upvotes'}
      </span>
    </button>
  );
}

function ArrowUpSvg() {
  return (
    <svg
      width="10"
      height="7"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M1 6l4-4 4 4"
        stroke="#4661E6"
        strokeWidth="2"
        fill="none"
        fillRule="evenodd"
      />
    </svg>
  );
}

export default UpvoteButton;
