'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './Header.module.css';
import NavLink from '../NavLink';
import { useOnClickOutside } from '@/hooks/useOnClickOutside.hook';
import { useTrapFocus } from '@/hooks/useTrapFocus.hook';
import { useEscapeKey } from '@/hooks/useEscapeKey.hook';

interface HeaderProps {
  roadmap: React.ReactNode;
}

function Header({ roadmap }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);

  useOnClickOutside(menuRef, (e) => {
    const target = e.target;
    if (target !== btnRef.current && isOpen) {
      setIsOpen(false);
    }
  });

  useEffect(() => {
    const main = document.querySelector('main');
    if (isOpen) {
      main?.setAttribute('inert', 'true');
    } else {
      main?.removeAttribute('inert');
    }
  }, [isOpen]);

  useTrapFocus(navRef, isOpen);
  useEscapeKey(navRef, () => {
    if (isOpen) {
      setIsOpen(false);
    }
  });

  return (
    <header className={styles.header}>
      <div className="container flex">
        <hgroup>
          <h1>Frontend mentor</h1>
          <p>Feedback Board</p>
        </hgroup>

        <nav ref={navRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            ref={btnRef}
            aria-expanded={isOpen}
            aria-controls="menu"
          >
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
            <span className="visually-hidden">Menu</span>
          </button>

          {isOpen && (
            <div className={`${styles.menu}`} ref={menuRef} id="menu">
              <ul className={`${styles.links} | box`}>
                <li>
                  <NavLink href="/">All</NavLink>
                </li>
                <li>
                  <NavLink href="/ui">UI</NavLink>
                </li>
                <li>
                  <NavLink href="/ux">UX</NavLink>
                </li>
                <li>
                  <NavLink href="/enhancement">Enhancement</NavLink>
                </li>
                <li>
                  <NavLink href="/bug">Bug</NavLink>
                </li>
                <li>
                  <NavLink href="/feature">Feature</NavLink>
                </li>
              </ul>

              {roadmap}
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
