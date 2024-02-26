'use client';

import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './NavLink.module.css';
import paths from '@/paths';
import { AnimatePresence, motion } from 'framer-motion';
import { useId } from 'react';

type NavLinkProps = LinkProps &
  React.ComponentPropsWithoutRef<'a'> & {
    sharedLayout?: boolean;
  };

export function NavLink({
  href,
  className,
  children,
  sharedLayout,
  ...rest
}: NavLinkProps) {
  const pathname = usePathname();
  const isCurrent = pathname === href;

  return (
    <>
      <Link
        {...rest}
        href={isCurrent ? paths.home() : href}
        className={`${className ? className : ''} ${
          styles.navlink
        } | click-target-helper`}
        aria-current={isCurrent ? 'page' : undefined}
      >
        {children}
      </Link>

      {sharedLayout && isCurrent && (
        <motion.div
          layoutId={`nav-links-backdrop`}
          aria-hidden="true"
          className={styles.backdrop}
          data-id={`nav-links-backdrop`}
          initial={{ borderRadius: 10 }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: 0.35,
            }}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </>
  );
}

export default NavLink;
