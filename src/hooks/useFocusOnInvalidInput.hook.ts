import { MutableRefObject, useEffect } from 'react';

export function useFocusOnInvalidInput(
  ref: MutableRefObject<HTMLFormElement | null>
) {
  useEffect(() => {
    const invalidInput = ref.current?.querySelector(
      `[aria-invalid='true']`
    ) as HTMLElement;

    if (invalidInput) {
      invalidInput.focus();
    }
  });
}
