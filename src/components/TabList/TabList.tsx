'use client';

import styles from './TabList.module.css';
import { useEffect, useRef, useState } from 'react';

import RequestCard from '../RequestCard';
import { RequestWithCommentCount } from '@/db/queries/requests';

interface TabListProps {
  requests: RequestWithCommentCount[];
}

function TabList({ requests }: TabListProps) {
  const [selectedTab, setSelectedTab] = useState(0);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  let plannedSize = 0;
  let inProgressSize = 0;
  let liveSize = 0;

  requests.forEach((request) => {
    if (request.status === 'Planned') plannedSize++;
    if (request.status === 'Progress') inProgressSize++;
    if (request.status === 'Live') liveSize++;
  });

  useEffect(() => {
    const tablist = ref.current;

    const handleKeys = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        const nextSelectedTab = selectedTab <= 0 ? 2 : selectedTab - 1;
        setSelectedTab(nextSelectedTab);
      } else if (e.key === 'ArrowRight') {
        const nextSelectedTab = selectedTab >= 2 ? 0 : selectedTab + 1;
        setSelectedTab(nextSelectedTab);
      }

      setIsFirstRender(false);
    };

    if (tablist) {
      tablist.addEventListener('keydown', handleKeys);
    }

    return () => {
      tablist?.removeEventListener('keydown', handleKeys);
    };
  }, [ref, selectedTab]);

  useEffect(() => {
    if (ref && !isFirstRender) {
      const activeTab = ref.current?.querySelector(
        `[aria-selected='true']`
      ) as HTMLElement;

      activeTab?.focus();
    }
  }, [selectedTab, isFirstRender]);

  return (
    <div role="tablist" className={styles.tablist} ref={ref}>
      <button
        className={styles.tab}
        role="tab"
        aria-controls="tabpanel"
        aria-selected={selectedTab == 0}
        tabIndex={selectedTab === 0 ? 0 : -1}
        onClick={() => setSelectedTab(0)}
      >
        Planned({plannedSize})
      </button>
      <button
        className={styles.tab}
        role="tab"
        aria-controls="tabpanel"
        aria-selected={selectedTab === 1}
        tabIndex={selectedTab === 1 ? 0 : -1}
        onClick={() => setSelectedTab(1)}
      >
        In-Progress({inProgressSize})
      </button>
      <button
        className={styles.tab}
        role="tab"
        aria-controls="tabpanel"
        aria-selected={selectedTab === 2}
        tabIndex={selectedTab === 2 ? 0 : -1}
        onClick={() => setSelectedTab(2)}
      >
        Live({liveSize})
      </button>

      <div role="tabpanel" id="tabpanel" className={styles.tabpanel}>
        <h2 className={styles.tabpanel__title}>
          {selectedTab === 0 && 'Planned'}
          {selectedTab === 1 && 'In-Progress'}
          {selectedTab === 2 && 'Live'}
        </h2>
        <p className={styles.tabpanel__description}>
          {selectedTab === 0 && 'Ideas prioritized for research'}
          {selectedTab === 1 && 'Features currently being developed'}
          {selectedTab === 2 && 'Released features'}
        </p>

        <ul className={styles.tabpanel__list}>
          {requests
            .filter((request) => {
              if (selectedTab === 0) {
                return request.status === 'Planned';
              } else if (selectedTab === 1) {
                return request.status === 'Progress';
              } else if (selectedTab === 2) {
                return request.status === 'Live';
              }
            })
            .map((filteredRequest) => {
              return (
                <li key={filteredRequest.id}>
                  <RequestCard
                    id={filteredRequest.id}
                    title={filteredRequest.title}
                    description={filteredRequest.description}
                    upvotes={filteredRequest.upvotes}
                    category={filteredRequest.category}
                    slug={filteredRequest.slug}
                    comments={filteredRequest._count.comments}
                    level={3}
                  />
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
}

export default TabList;
