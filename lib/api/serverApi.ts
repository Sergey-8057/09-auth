import { cookies } from 'next/headers';
import { nextServer } from './api';
import { User } from '@/types/user';
import type { NewNoteData, Note } from '@/types/note.ts';

async function cookieHeader(): Promise<string> {
  const cookieStore = await cookies();
  return cookieStore
    .getAll()
    .map(cookie => `${cookie.name}=${cookie.value}`)
    .join('; ');
}

export const checkServerSession = async () => {
  const res = await nextServer.get('/auth/session', {
    headers: { cookie: await cookieHeader() },
  });
  return res;
};

export const getServerMe = async (): Promise<User | null> => {
  try {
    const { data } = await nextServer.get<User>('/users/me', {
      headers: { cookie: await cookieHeader() },
    });
    return data;
  } catch {
    return null;
  }
};

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

export const serverFetchNotes = async (
  search: string,
  page: number,
  perPage: number,
  tag: string
) => {
  const params: Record<string, string | number> = {
    page,
    perPage,
  };
  const trimmedSearch = search.trim();
  if (trimmedSearch) {
    params.search = trimmedSearch;
  }
  if (tag !== 'All') {
    params.tag = tag;
  }

  const res = await nextServer.get<NotesResponse>('/notes', {
    params,
    headers: { cookie: await cookieHeader() },
  });
  return res.data;
};

export const serverFetchNoteById = async (noteId: string) => {
  const res = await nextServer.get<Note>(`/notes/${noteId}`);
  return res.data;
};
