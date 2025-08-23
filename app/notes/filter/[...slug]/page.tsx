import { Metadata } from 'next';

import { fetchNotes } from '@/lib/api/api';
import NotesClient from './Notes.client';

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const filterTag = slug[0];
  const titleByTag = filterTag === 'All' ? 'All tags' : `Notes filter: ${filterTag}`;
  return {
    title: `${titleByTag}`,
    description: `Notes are filtered by tag ${filterTag}`,
    openGraph: {
      title: `${titleByTag}`,
      description: `Notes are filtered by tag ${filterTag}`,
      url: `https://08-zustand-seven-virid.vercel.app/notes/filter/${filterTag}`,
      siteName: 'NoteHub',
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: `${filterTag} tag`,
        },
      ],
    },
  };
}

export default async function NotesPage({ params }: Props) {
  const { slug } = await params;
  const tag = slug[0];
  const search = '';
  const page = 1;
  const perPage = 12;
  const initialData = await fetchNotes(search, page, perPage, tag);

  return (
    <NotesClient initialData={initialData} initialSearch={search} initialPage={page} tag={tag} />
  );
}
