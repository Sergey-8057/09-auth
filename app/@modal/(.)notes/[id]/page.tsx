import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { serverFetchNoteById } from '@/lib/api/serverApi';
import NotePreview from './NotePreview.client';

interface NoteDetailsPageProps {
  params: Promise<{ id: string }>;
}

const NoteDetailsPage = async ({ params }: NoteDetailsPageProps) => {
  const { id } = await params;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => serverFetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreview />
    </HydrationBoundary>
  );
};

export default NoteDetailsPage;
