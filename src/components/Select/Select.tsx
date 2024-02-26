'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './Select.module.css';
import { useOnClickOutside } from '@/hooks/useOnClickOutside.hook';
import { motion, AnimatePresence } from 'framer-motion';

interface Option {
  label: string;
  value: string;
}

interface SelectProps {
  initialValue?: string;
  options: Option[];
  onChange?: (...args: any[]) => void;
  name?: string;
  labelledby?: string;
  describedby?: string;
  className?: string;
  wrapperClassName?: string;
  dropdownClassName?: string;
}

const Select = ({
  options,
  name,
  initialValue,
  labelledby,
  describedby,
  onChange,
  className,
  wrapperClassName,
  dropdownClassName,
}: SelectProps) => {
  const [selectedOptionId, setSelectedOptionId] = useState(
    initialValue
      ? options.findIndex((option) => option.value === initialValue)
      : 0
  );
  const [highlightedOptionIndex, setHighlightedOptionIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const { value: selectedValue, label: selectedLabel } =
    options[selectedOptionId];

  const toggleOpen = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  const selectOption = (index: number) => {
    setSelectedOptionId(index);
    closeDropdown();
  };

  const handleInput = (e: React.KeyboardEvent) => {
    e.stopPropagation();

    switch (e.key) {
      case 'Enter':
        e.preventDefault();
        handleEnterKey();
        break;
      case 'ArrowDown':
        e.preventDefault();
        handleArrowDownKey();
        break;
      case 'ArrowUp':
        e.preventDefault();
        handleArrowUpKey();
        break;
      case 'Tab':
        handleTabKey();
        break;
      case 'Escape':
        e.preventDefault();
        handleEscapeKey();
        break;
      default:
        break;
    }
  };

  const handleEnterKey = () => {
    if (isOpen) {
      // If the select dropdown is open
      const activeOption = options[highlightedOptionIndex];

      // Check if there's an active option and selects it
      activeOption && selectOption(highlightedOptionIndex);
    } else {
      // If the select dropdown is closed, open it
      toggleOpen();
    }
  };

  useEffect(() => {
    if (onChange) onChange(selectedValue);
  }, [selectedOptionId, onChange, selectedValue]);

  const handleArrowDownKey = () => {
    if (!isOpen) {
      setIsOpen(true);
    } else if (highlightedOptionIndex < options.length - 1) {
      setHighlightedOptionIndex(highlightedOptionIndex + 1);
    }
  };

  const handleArrowUpKey = () => {
    if (highlightedOptionIndex > 0) {
      setHighlightedOptionIndex(highlightedOptionIndex - 1);
    }
  };

  const handleTabKey = () => {
    if (isOpen) {
      setIsOpen(false);
      setHighlightedOptionIndex(selectedOptionId);
    }
  };

  const handleEscapeKey = () => {
    if (isOpen) {
      closeDropdown();
    }
  };

  useOnClickOutside(ref, closeDropdown);

  return (
    <>
      <input type="text" value={selectedValue} name={name} hidden readOnly />
      <div
        className={`${styles.wrapper} ${
          wrapperClassName ? wrapperClassName : ''
        }`}
        ref={ref}
      >
        <button
          type="button"
          className={`${className ? className : ''} | flex`}
          role="combobox"
          aria-haspopup="listbox"
          aria-controls="select-dropdown"
          aria-expanded={isOpen}
          aria-activedescendant={
            isOpen ? `option-${highlightedOptionIndex}` : undefined
          }
          aria-labelledby={labelledby}
          aria-describedby={describedby}
          onClick={toggleOpen}
          onKeyDown={handleInput}
        >
          {selectedLabel}
          <ArrowDownSvg />
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.ul
              role="listbox"
              className={`${styles.dropdown} ${
                dropdownClassName ? dropdownClassName : ''
              } | box`}
              id="select-dropdown"
              tabIndex={-1}
              style={{ overflow: 'hidden' }}
              initial={{
                height: 0,
                opacity: 0,
              }}
              animate={{
                height: 'auto',
                opacity: 1,
                transition: {
                  type: 'spring',
                  bounce: 0,
                  restDelta: 0.01,
                  duration: 0.25,
                },
              }}
              exit={{
                height: 0,
                opacity: 0,
                transition: {
                  type: 'spring',
                  duration: 0.4,
                },
              }}
            >
              {options.map(
                ({ value: optionValue, label: optionLabel }, index) => (
                  <li
                    key={optionValue}
                    role="option"
                    aria-selected={optionValue === selectedValue}
                    id={`option-${index}`}
                    className={styles.option}
                    data-active={index === highlightedOptionIndex}
                    onMouseOver={() => setHighlightedOptionIndex(index)}
                  >
                    <label className="flex">
                      <input
                        type="radio"
                        value={optionValue}
                        checked={selectedValue === optionValue}
                        onChange={() => {
                          selectOption(index);
                        }}
                        onClick={() => {
                          if (selectedValue === optionValue) {
                            selectOption(index);
                          }
                        }}
                        tabIndex={-1}
                      />
                      {optionLabel}
                      {optionValue === selectedValue ? <CheckSvg /> : null}
                    </label>
                  </li>
                )
              )}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

function ArrowDownSvg() {
  return (
    <svg
      width="10"
      height="7"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M1 1l4 4 4-4"
        stroke="#4661E6"
        strokeWidth="2"
        fill="none"
        fillRule="evenodd"
      />
    </svg>
  );
}

function CheckSvg() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="11">
      <path
        fill="none"
        stroke="#AD1FEA"
        strokeWidth="2"
        d="M1 5.233L4.522 9 12 1"
      />
    </svg>
  );
}

export default Select;
