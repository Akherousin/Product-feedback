'use client';

import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './NavLink.module.css';

type NavLinkProps = LinkProps & React.ComponentPropsWithoutRef<'a'>;

export function NavLink({ href, className, children, ...rest }: NavLinkProps) {
  const pathname = usePathname();
  const isCurrent = pathname === href;

  return (
    <Link
      {...rest}
      href={href}
      className={`${className ? className : ''} ${
        styles.navlink
      } | click-target-helper`}
      aria-current={isCurrent ? 'page' : undefined}
    >
      {children}
    </Link>
  );
}

export default NavLink;
