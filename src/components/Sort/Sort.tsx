'use client';

import { ChangeEvent } from 'react';
import Select from '../Select';
import styles from './Sort.module.css';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

export type SortValues = 'mu' | 'lu' | 'mc' | 'lc';

const options: { label: string; value: SortValues }[] = [
  { label: 'Most Upvotes', value: 'mu' },
  { label: 'Least Upvotes', value: 'lu' },
  { label: 'Most Comments', value: 'mc' },
  { label: 'Least Comments', value: 'lc' },
];

function Sort() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);
    const sortBy = e.target.value;

    if (sortBy) {
      params.set('sort', sortBy);
    } else {
      params.delete('sort');
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className={styles.sort}>
      <label id="sort-label">Sort by : &nbsp;</label>
      <Select
        options={options}
        initialValue={searchParams.get('sort')?.toString()}
        labelledby="sort-label"
        className={styles.combobox}
        wrapperClassName={styles.comboboxWrapper}
        dropdownClassName={styles.dropdown}
        onChange={handleChange}
      />
    </div>
  );
}

function SuspensedSort() {
  return (
    <Suspense fallback={null}>
      <Sort />
    </Suspense>
  );
}

export default SuspensedSort;
