'use client';

import { ReactNode } from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const router = useRouter();
  useEffect(() => {
    router.refresh();
  }, [router]);
  return <>{children}</>;
}
