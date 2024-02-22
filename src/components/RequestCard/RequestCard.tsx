import Link from 'next/link';
import NavLink from '../NavLink';
import styles from './RequestCard.module.css';
import { Category, Status } from '@prisma/client';
import paths from '@/paths';
import UpvoteButton from '../UpvoteButton';

interface RequestCardProps {
  id: string;
  title: string;
  description: string;
  slug: string;
  category: Category;
  status: Status;
  upvotes: number;
  comments: number;
  level: 1 | 2 | 3;
  asLink: boolean;
  decorated?: boolean;
}

function RequestCard({
  id,
  title,
  description,
  slug,
  category,
  status,
  upvotes,
  comments,
  level,
  asLink,
  decorated,
}: RequestCardProps) {
  return (
    <article
      className={`${styles.request} | box`}
      data-decorated={decorated}
      data-status={status}
    >
      {decorated && (
        <p className={styles.status}>
          {status === 'progress' ? 'In Progress' : status}
        </p>
      )}
      {level === 1 && (
        <h1 className={`${styles.title} | h3`}>
          {asLink ? (
            <Link href={paths.showRequestPage(slug)} prefetch={true}>
              {title}
            </Link>
          ) : (
            title
          )}
        </h1>
      )}
      {level === 2 && (
        <h2 className={`${styles.title} | h3`}>
          {asLink ? (
            <Link href={paths.showRequestPage(slug)} prefetch={true}>
              {title}
            </Link>
          ) : (
            title
          )}
        </h2>
      )}
      {level === 3 && (
        <h3 className={`${styles.title} | h3`}>
          {asLink ? (
            <Link href={paths.showRequestPage(slug)} prefetch={true}>
              {title}
            </Link>
          ) : (
            title
          )}
        </h3>
      )}
      <p className={styles.description}>{description}</p>
      <NavLink className={styles.category} href={`/${category.toLowerCase()}`}>
        {category.length <= 2 ? category.toUpperCase() : category}
      </NavLink>

      <UpvoteButton initialUpvotes={upvotes} requestId={id} />

      <p className={`${styles.comments}`}>
        <CommentSvg />
        {comments}{' '}
        <span className="visually-hidden">
          {comments === 1 ? 'comment' : 'comments'}
        </span>
      </p>
    </article>
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
