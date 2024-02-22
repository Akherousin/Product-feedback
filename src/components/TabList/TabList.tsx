'use client';

import styles from './TabList.module.css';
import { useCallback, useEffect, useRef, useState } from 'react';

import RequestCard from '../RequestCard';
import { RequestWithCommentCount } from '@/db/queries/requests';

import { useRouter, usePathname } from 'next/navigation';

interface TabListProps {
  requests: RequestWithCommentCount[];
  defaultTab: number;
}

function TabList({ requests, defaultTab }: TabListProps) {
  const [selectedTab, setSelectedTab] = useState(defaultTab);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const pathname = usePathname();

  const setSearchParams = useCallback(
    (value: string) => {
      const params = new URLSearchParams();
      params.set('tab', value);
      router.replace(pathname + '?' + params.toString());
    },
    [pathname, router]
  );

  let plannedSize = 0;
  let inProgressSize = 0;
  let liveSize = 0;

  requests.forEach((request) => {
    if (request.status === 'planned') plannedSize++;
    if (request.status === 'progress') inProgressSize++;
    if (request.status === 'live') liveSize++;
  });

  useEffect(() => {
    const tablist = ref.current;

    const handleKeys = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        const nextSelectedTab = selectedTab <= 0 ? 2 : selectedTab - 1;
        setSelectedTab(nextSelectedTab);
        setSearchParams(String(nextSelectedTab));
      } else if (e.key === 'ArrowRight') {
        const nextSelectedTab = selectedTab >= 2 ? 0 : selectedTab + 1;
        setSelectedTab(nextSelectedTab);
        setSearchParams(String(nextSelectedTab));
      }

      setIsFirstRender(false);
    };

    if (tablist) {
      tablist.addEventListener('keydown', handleKeys);
    }

    return () => {
      tablist?.removeEventListener('keydown', handleKeys);
    };
  }, [ref, selectedTab, setSearchParams]);

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
        onClick={() => {
          setSelectedTab(0);
          setSearchParams('0');
        }}
        data-status="planned"
      >
        Planned({plannedSize})
      </button>
      <button
        className={styles.tab}
        role="tab"
        aria-controls="tabpanel"
        aria-selected={selectedTab === 1}
        tabIndex={selectedTab === 1 ? 0 : -1}
        onClick={() => {
          setSelectedTab(1);
          setSearchParams('1');
        }}
        data-status="progress"
      >
        In-Progress({inProgressSize})
      </button>
      <button
        className={styles.tab}
        role="tab"
        aria-controls="tabpanel"
        aria-selected={selectedTab === 2}
        tabIndex={selectedTab === 2 ? 0 : -1}
        onClick={() => {
          setSelectedTab(2);
          setSearchParams('2');
        }}
        data-status="live"
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
                return request.status === 'planned';
              } else if (selectedTab === 1) {
                return request.status === 'progress';
              } else if (selectedTab === 2) {
                return request.status === 'live';
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
                    status={filteredRequest.status}
                    category={filteredRequest.category}
                    slug={filteredRequest.slug}
                    comments={filteredRequest._count.comments}
                    level={3}
                    asLink={true}
                    decorated={true}
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
