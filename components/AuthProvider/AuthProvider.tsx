'use client';

import { useEffect, useState } from 'react';
import { checkSession, getMe, logout } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import Loading from '@/app/loading';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [checking, setChecking] = useState(true);

  const setUser = useAuthStore(state => state.setUser);
  const clearIsAuthenticated = useAuthStore(state => state.clearIsAuthenticated);

  useEffect(() => {
    let canceled = false;

    const verify = async () => {
      try {
        const session = await checkSession();
        if (canceled) return;

        if (!session) {
          clearIsAuthenticated();
          return;
        }

        const user = await getMe();
        if (canceled) return;

        if (user) {
          setUser(user);
        } else {
          clearIsAuthenticated();
        }
      } catch {
        if (!canceled) {
          clearIsAuthenticated();
          await logout();
        }
      } finally {
        if (!canceled) {
          setChecking(false);
        }
      }
    };

    verify();

    return () => {
      canceled = true;
    };
  }, [setUser, clearIsAuthenticated]);

  if (checking) {
    return <Loading />;
  }

  return <>{children}</>;
}
