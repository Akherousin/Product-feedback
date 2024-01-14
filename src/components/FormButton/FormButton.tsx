'use client';

import { useFormStatus } from 'react-dom';
import Button from '../Button';
import type { ButtonProps } from '../Button/Button';
import Spinner from '../Spinner';

type FormButtonProps = {
  announcerMessage: string;
  invokedAction:
    | ((formData: FormData) => void | Promise<{
        errors: {
          _form: string[];
        };
      }>)
    | null;
} & ButtonProps;

function FormButton({
  announcerMessage,
  invokedAction,
  ...delegated
}: FormButtonProps) {
  const { pending, action } = useFormStatus();

  return (
    <>
      <Button {...delegated} aria-disabled={pending}>
        {pending && invokedAction === action ? <Spinner /> : delegated.children}
      </Button>
      <p className="visually-hidden" aria-live="assertive">
        {pending && invokedAction === action ? announcerMessage : null}
      </p>
    </>
  );
}

export default FormButton;
