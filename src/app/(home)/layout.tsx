import paths from '@/paths';
import styles from './layout.module.css';
import Button from '@/components/Button';

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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

            <Button variant="purple" as="link" href={paths.createRequest()}>
              + Add Feedback
            </Button>
          </div>
        </div>

        <section className={styles.requests}>{children}</section>
      </main>
    </>
  );
}
