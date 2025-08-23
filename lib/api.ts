import axios from 'axios';

export const nextServer = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + '/api',
  withCredentials: true,
});

// import type { NewNoteData, Note } from '../types/note.ts';

// axios.defaults.baseURL = 'https://notehub-public.goit.study/api';
// axios.defaults.headers.common['Authorization'] =
//   `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`;

// export interface NotesResponse {
//   notes: Note[];
//   totalPages: number;
// }

// export const fetchNotes = async (search: string, page: number, perPage: number, tag: string) => {
//   const params: Record<string, string | number> = {
//     page,
//     perPage,
//   };
//   const trimmedSearch = search.trim();
//   if (trimmedSearch) {
//     params.search = trimmedSearch;
//   }
//   if (tag !== 'All') {
//     params.tag = tag;
//   }

//   const res = await axios.get<NotesResponse>('/notes', { params });
//   return res.data;
// };

// export const fetchNoteById = async (noteId: string) => {
//   const res = await axios.get<Note>(`/notes/${noteId}`);
//   return res.data;
// };

// export const createNote = async (noteData: NewNoteData) => {
//   const res = await axios.post<Note>('/notes', noteData);
//   return res.data;
// };

// export const deleteNote = async (noteId: string) => {
//   const res = await axios.delete<Note>(`/notes/${noteId}`);
//   return res.data;
// };
