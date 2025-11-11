import { useState, useEffect } from 'react';
import { authService } from '../services/auth';
import { AuthUser } from '../types';

export const useAuth = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
    setLoading(false);

    if (currentUser) {
      const refreshInterval = setInterval(() => {
        (async () => {
          try {
            const refreshedUser = await authService.refreshToken();
            setUser(refreshedUser);
          } catch (error) {
            console.error('Token refresh failed:', error);
            logout();
          }
        })();
      }, 30 * 60 * 1000);

      return () => clearInterval(refreshInterval);
    }
  }, []);

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return { user, loading, logout, setUser };
};
