import { type MutableRefObject } from 'react';
import { useEffect } from 'react';

export function useOnClickOutside<T extends Element>(
  ref: MutableRefObject<T | null>,
  callback: (e: Event, ...args: any[]) => any
) {
  useEffect(() => {
    const handleEvent = (e: MouseEvent) => {
      if (ref?.current && !ref.current.contains(e.target as Node)) {
        callback(e);
      }
    };

    window.addEventListener('click', handleEvent, true);

    return () => {
      window.removeEventListener('click', handleEvent, true);
    };
  }, [ref, callback]);
}
