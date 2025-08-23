'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes, NotesResponse } from '@/lib/api/api';
import NoteList from '@/components/NoteList/NoteList';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import css from './NotesPage.module.css';
import { useDebouncedCallback } from 'use-debounce';
import Link from 'next/link';

interface NotesClientProps {
  initialData: NotesResponse;
  initialSearch: string;
  initialPage: number;
  tag: string;
}

export default function NotesClient({
  initialData,
  initialSearch = '',
  initialPage = 1,
  tag = '',
}: NotesClientProps) {
  const [inputValue, setInputValue] = useState(initialSearch);
  const [search, setSearch] = useState(initialSearch);
  const [page, setPage] = useState(initialPage);
  const perPage = 12;

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, 1000);

  const handleInputChange = (value: string) => {
    setInputValue(value);
    debouncedSearch(value);
  };

  useEffect(() => {
    setInputValue(initialSearch);
    setSearch(initialSearch);
  }, [initialSearch]);

  const { data: response } = useQuery<NotesResponse>({
    queryKey: ['notes', search, page, tag],
    queryFn: () => fetchNotes(search, page, perPage, tag),
    initialData,
    placeholderData: previousData => previousData,
  });

  const hasNotes = response?.notes?.length > 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={inputValue} onSearchChange={handleInputChange} />
        {response?.totalPages > 1 && (
          <Pagination currentPage={page} totalPages={response.totalPages} onPageChange={setPage} />
        )}
        <Link href="/notes/action/create" className={css.button}>
          Create note +
        </Link>
      </header>
      {hasNotes ? <NoteList notes={response.notes} /> : <p>No notes found</p>}
    </div>
  );
}
