import styles from './page.module.css';
import Button from '@/components/Button';
import RequestCard from '@/components/RequestCard';
import { db } from '@/db';
import { fetchAllRequests } from '@/db/queries/requests';

export default async function Home() {
  const requests = await fetchAllRequests();

  return (
    <>
      <header className={styles.header}>
        <div className="container flex">
          <hgroup>
            <h1>Frontend mentor</h1>
            <p>Feedback Board</p>
          </hgroup>

          <nav>
            <button>
              <svg width="20" height="17" xmlns="http://www.w3.org/2000/svg">
                <g fill="#FFF" fillRule="evenodd">
                  <path d="M0 0h20v3H0zM0 7h20v3H0zM0 14h20v3H0z" />
                </g>
              </svg>
            </button>
          </nav>
        </div>
      </header>

      <main>
        <div className={`${styles.actions}`}>
          <div className="container flex">
            <p>Sort by: Most Upvotes</p>

            <Button variant="purple" as="link" href="/new">
              + Add Feedback
            </Button>
          </div>
        </div>

        <section className={styles.requests}>
          <div className="container column">
            {requests.map(
              ({ id, title, category, upvotes, description, _count }) => {
                return (
                  <RequestCard
                    key={id}
                    title={title}
                    category={category}
                    upvotes={upvotes}
                    description={description}
                    comments={_count.comments}
                  />
                );
              }
            )}
          </div>
        </section>
      </main>
    </>
  );
}

function PlusSvg() {
  return (
    <svg width="9" height="9" xmlns="http://www.w3.org/2000/svg">
      <text
        transform="translate(-24 -20)"
        fill="#F2F4FE"
        fillRule="evenodd"
        fontFamily="Jost-Bold, Jost"
        fontSize="14"
        fontWeight="bold"
        aria-hidden="false"
        focusable="false"
      >
        <tspan x="24" y="27.5">
          +
        </tspan>
      </text>
    </svg>
  );
}
