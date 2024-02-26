'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './Header.module.css';
import NavLink from '../NavLink';
import { useOnClickOutside } from '@/hooks/useOnClickOutside.hook';
import { useTrapFocus } from '@/hooks/useTrapFocus.hook';
import { useEscapeKey } from '@/hooks/useEscapeKey.hook';
import paths from '@/paths';
import Link from 'next/link';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';

interface HeaderProps {
  roadmap: React.ReactNode;
}

function Header({ roadmap }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);

  const closeMenu = () => {
    setIsOpen(false);
  };

  useOnClickOutside(menuRef, (e) => {
    const target = e.target;
    if (target !== btnRef.current && isOpen) {
      closeMenu();
    }
  });

  useEffect(() => {
    const main = document.querySelector('main');
    const body = document.querySelector('body');
    if (isOpen) {
      main?.setAttribute('inert', 'true');
      if (body) {
        body.dataset.menuIsOpen = 'true';
      }
    } else {
      main?.removeAttribute('inert');

      if (body) {
        delete body.dataset.menuIsOpen;
      }
    }

    return () => {
      main?.removeAttribute('inert');

      if (body) {
        delete body.dataset.menuIsOpen;
      }
    };
  }, [isOpen]);

  useTrapFocus(navRef, isOpen);
  useEscapeKey(navRef, () => {
    if (isOpen) {
      closeMenu();
    }
  });

  return (
    <header className={styles.header}>
      <hgroup>
        <h1 className="h2">Frontend&nbsp;mentor</h1>
        <Link href={paths.home()}>Feedback Board</Link>
      </hgroup>

      <nav className="box">
        <LayoutGroup>
          <ul className={styles.links}>
            <li>
              <NavLink href={paths.home()} sharedLayout>
                All
              </NavLink>
            </li>
            <li>
              <NavLink href={paths.homeFiltered('ui')} sharedLayout>
                UI
              </NavLink>
            </li>
            <li>
              <NavLink href={paths.homeFiltered('ux')} sharedLayout>
                UX
              </NavLink>
            </li>
            <li>
              <NavLink href={paths.homeFiltered('enhancement')} sharedLayout>
                Enhancement
              </NavLink>
            </li>
            <li>
              <NavLink href={paths.homeFiltered('bug')} sharedLayout>
                Bug
              </NavLink>
            </li>
            <li>
              <NavLink href={paths.homeFiltered('feature')} sharedLayout>
                Feature
              </NavLink>
            </li>
          </ul>
        </LayoutGroup>
      </nav>

      {roadmap}

      <nav ref={navRef} className={styles['nav--mobile']}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          ref={btnRef}
          aria-expanded={isOpen}
          aria-controls="menu"
          className={styles.btn}
        >
          {isOpen ? <CloseSvg /> : <MenuSvg />}
          <span className="visually-hidden">Menu</span>
        </button>
        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                className={styles.backdrop}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
              />
              <motion.div
                className={styles.menu}
                ref={menuRef}
                id="menu"
                initial={{
                  x: '100%',
                }}
                animate={{
                  x: 0,
                }}
                exit={{
                  x: '100%',
                }}
                transition={{
                  type: 'spring',
                  restDelta: 0.01,
                  stiffness: 400,
                  damping: 35,
                }}
              >
                <ul className={`${styles.links} | box`}>
                  <li>
                    <NavLink href={paths.home()} onClick={closeMenu}>
                      All
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      href={paths.homeFiltered('ui')}
                      onClick={closeMenu}
                    >
                      UI
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      href={paths.homeFiltered('ux')}
                      onClick={closeMenu}
                    >
                      UX
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      href={paths.homeFiltered('enhancement')}
                      onClick={closeMenu}
                    >
                      Enhancement
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      href={paths.homeFiltered('bug')}
                      onClick={closeMenu}
                    >
                      Bug
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      href={paths.homeFiltered('feature')}
                      onClick={closeMenu}
                    >
                      Feature
                    </NavLink>
                  </li>
                </ul>
                {roadmap}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}

function MenuSvg() {
  return (
    <svg
      width="20"
      height="17"
      viewBox="0 0 20 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable={false}
      aria-hidden="true"
    >
      <motion.rect
        layoutId="menu-top-rect"
        width="20"
        height="3"
        fill="white"
        initial={{ rotate: 45 }}
        animate={{
          rotate: 0,
        }}
      />
      <motion.rect
        layoutId="menu-top-rect"
        y="7"
        width="20"
        height="3"
        fill="white"
        initial={{
          rotate: 45,
        }}
        animate={{
          rotate: 0,
        }}
      />
      <motion.rect
        layoutId="menu-bottom-rect"
        y="14"
        width="20"
        height="3"
        fill="white"
        initial={{ rotate: -45 }}
        animate={{
          rotate: 0,
        }}
      />
    </svg>
  );
}

function CloseSvg() {
  return (
    <svg
      width="18"
      height="17"
      xmlns="http://www.w3.org/2000/svg"
      focusable={false}
      aria-hidden="true"
    >
      <motion.rect
        layoutId="menu-top-rect"
        animate={{
          rotate: 45,
        }}
        x="0"
        y="7"
        width="20"
        height="3"
        fill="#FFF"
      />

      <motion.rect
        layoutId="menu-bottom-rect"
        animate={{
          rotate: -45,
        }}
        x="0"
        y="7"
        width="20"
        height="3"
        fill="#FFF"
      />
    </svg>
  );
}

export default Header;
