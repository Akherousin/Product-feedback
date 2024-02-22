'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './Header.module.css';
import NavLink from '../NavLink';
import { useOnClickOutside } from '@/hooks/useOnClickOutside.hook';
import { useTrapFocus } from '@/hooks/useTrapFocus.hook';
import { useEscapeKey } from '@/hooks/useEscapeKey.hook';
import paths from '@/paths';
import Link from 'next/link';

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
        <ul className={styles.links}>
          <li>
            <NavLink href={paths.home()}>All</NavLink>
          </li>
          <li>
            <NavLink href={paths.homeFiltered('ui')}>UI</NavLink>
          </li>
          <li>
            <NavLink href={paths.homeFiltered('ux')}>UX</NavLink>
          </li>
          <li>
            <NavLink href={paths.homeFiltered('enhancement')}>
              Enhancement
            </NavLink>
          </li>
          <li>
            <NavLink href={paths.homeFiltered('bug')}>Bug</NavLink>
          </li>
          <li>
            <NavLink href={paths.homeFiltered('feature')}>Feature</NavLink>
          </li>
        </ul>
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

        {isOpen && (
          <>
            <div className={styles.backdrop} />
            <div className={styles.menu} ref={menuRef} id="menu">
              <ul className={`${styles.links} | box`}>
                <li>
                  <NavLink href={paths.home()} onClick={closeMenu}>
                    All
                  </NavLink>
                </li>
                <li>
                  <NavLink href={paths.homeFiltered('ui')} onClick={closeMenu}>
                    UI
                  </NavLink>
                </li>
                <li>
                  <NavLink href={paths.homeFiltered('ux')} onClick={closeMenu}>
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
                  <NavLink href={paths.homeFiltered('bug')} onClick={closeMenu}>
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
            </div>
          </>
        )}
      </nav>
    </header>
  );
}

function MenuSvg() {
  return (
    <svg
      width="20"
      height="17"
      xmlns="http://www.w3.org/2000/svg"
      focusable={false}
      aria-hidden="true"
    >
      <g fill="#FFF" fillRule="evenodd">
        <path d="M0 0h20v3H0zM0 7h20v3H0zM0 14h20v3H0z" />
      </g>
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
      <path
        d="M15.01.368l2.122 2.122-6.01 6.01 6.01 6.01-2.122 2.122L9 10.622l-6.01 6.01L.868 14.51 6.88 8.5.87 2.49 2.988.368 9 6.38 15.01.37z"
        fill="#FFF"
        fillRule="evenodd"
      />
    </svg>
  );
}

export default Header;
