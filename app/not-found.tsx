import Link from 'next/link';
import type { Metadata } from 'next';

import css from './not-found.module.css';

export const metadata: Metadata = {
  title: 'Page not found',
  description: 'Sorry, the page you are looking for does not exist',
  metadataBase: new URL('https://08-zustand-seven-virid.vercel.app'),
  openGraph: {
    title: 'Page not found',
    description: 'Sorry, the page you are looking for does not exist',
    url: '/not-found',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub image',
      },
    ],
  },
};

const NotFound = () => {
  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>Sorry, the page you are looking for does not exist.</p>
      <Link href="/">Go back home</Link>
    </div>
  );
};

export default NotFound;
