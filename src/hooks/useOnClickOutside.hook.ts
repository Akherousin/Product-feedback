import { type MutableRefObject } from 'react';
import { useEffect } from 'react';

export function useOnClickOutside<T extends Element>(
  ref: MutableRefObject<T | null>,
  callback: (...args: any[]) => any
) {
  useEffect(() => {
    const handleEvent = (e: MouseEvent) => {
      if (ref?.current && !ref.current.contains(e.target as Node)) {
        callback();
      }
    };

    window.addEventListener('click', handleEvent);

    return () => {
      window.removeEventListener('click', handleEvent);
    };
  }, [ref, callback]);
}
