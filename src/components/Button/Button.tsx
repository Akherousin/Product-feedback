import Link, { LinkProps } from 'next/link';
import styles from './Button.module.css';

type ButtonProps = {
  children: React.ReactNode;
  variant: 'purple' | 'blue' | 'grey' | 'dark-grey' | 'red' | 'plain';
} & (
  | ({
      as?: 'button';
    } & React.ButtonHTMLAttributes<HTMLButtonElement>)
  | ({ as: 'link' } & LinkProps)
);

function Button({ variant, children, as = 'button', ...rest }: ButtonProps) {
  if (as === 'link') {
    return (
      <Link
        className={styles.button}
        data-variant={variant}
        {...(rest as LinkProps)}
      >
        {children}
      </Link>
    );
  } else {
    return (
      <button
        className={styles.button}
        data-variant={variant}
        {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {children}
      </button>
    );
  }
}

export default Button;
