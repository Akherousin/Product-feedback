import { MutableRefObject, useEffect } from 'react';

export function useTrapFocus<T extends HTMLElement>(
  elementRef: MutableRefObject<T | null>,
  applyWhen: boolean
) {
  useEffect(() => {
    const element = elementRef.current;

    if (!element) return;
    if (!applyWhen) return;

    const focusableElements = element.querySelectorAll(
      'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[
      focusableElements.length - 1
    ] as HTMLElement;

    const handleFocus = (e: Event) => {
      const keyboardEvent = e as unknown as React.KeyboardEvent<T>;
      if (keyboardEvent.key === 'Tab' || keyboardEvent.keyCode === 9) {
        if (keyboardEvent.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            keyboardEvent.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            keyboardEvent.preventDefault();
          }
        }
      }
    };

    element.addEventListener('keydown', handleFocus);

    return () => {
      element.removeEventListener('keydown', handleFocus);
    };
  }, [elementRef, applyWhen]);
}
