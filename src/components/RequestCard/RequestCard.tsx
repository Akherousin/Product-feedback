import Link from 'next/link';
import NavLink from '../NavLink';
import styles from './RequestCard.module.css';
import { Category } from '@prisma/client';

interface RequestCardProps {
  title: string;
  description: string;
  category: Category;
  upvotes: number;
  comments: number;
}

function RequestCard({
  title,
  description,
  category,
  upvotes,
  comments,
}: RequestCardProps) {
  return (
    <article className={`${styles.request} | box`}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>
      <NavLink className={styles.category} href={`/${category.toLowerCase()}`}>
        {category}
      </NavLink>

      <button className={`${styles.upvotesButton} | pill`}>
        <ArrowUpSvg />
        {upvotes}{' '}
        <span className="visually-hidden">
          {upvotes === 1 ? 'upvote' : 'upvotes'}
        </span>
      </button>

      <Link href="/" className={`${styles.commentsLink}`}>
        <CommentSvg />
        {comments}{' '}
        <span className="visually-hidden">
          {comments === 1 ? 'comment' : 'comments'}
        </span>
      </Link>
    </article>
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

function CommentSvg() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="16"
      viewBox="0 0 18 16"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M2.62074 16H1.34534L2.24718 15.0895C2.73344 14.5986 3.0371 13.9601 3.11873 13.2674C1.03637 11.8878 0 9.88917 0 7.79388C0 3.92832 3.51913 0 9.0305 0C14.8692 0 18 3.61479 18 7.45522C18 11.321 14.8361 14.9333 9.0305 14.9333C8.0135 14.9333 6.95226 14.7963 6.00478 14.5448C5.10787 15.4735 3.89262 16 2.62074 16Z"
        fill="#CDD2EE"
      />
    </svg>
  );
}

export default RequestCard;
