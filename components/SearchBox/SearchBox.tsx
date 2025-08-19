'use client';

import css from './SearchBox.module.css';

interface SearchBoxProps {
  value: string;
  onSearchChange: (value: string) => void;
}

export default function SearchBox({ value, onSearchChange }: SearchBoxProps) {
  return (
    <input
      className={css.input}
      value={value}
      onChange={e => onSearchChange(e.target.value)}
      type="text"
      placeholder="Search notes"
    />
  );
}
