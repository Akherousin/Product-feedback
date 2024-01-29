import styles from './SkeletonCardList.module.css';

function SkeletonCardList({ size }: { size: number }) {
  const renderedList = Array.from({ length: size }).map((_, index) => {
    return (
      <article
        className={`${styles.request} | box`}
        key={index}
        aria-hidden={true}
      >
        <span className={styles.title}></span>
        <span className={styles.description}></span>
        <span className={styles['description--2']}></span>
        <span className={styles.category}></span>
        <span className={styles.upvotesButton}></span>
        <span className={`${styles.commentsLink}`}></span>
      </article>
    );
  });

  return renderedList;
}

export default SkeletonCardList;
