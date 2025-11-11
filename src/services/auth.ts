import { AuthUser } from '../types';

const MOCK_CREDENTIALS = {
  email: 'demo@starwars.com',
  password: 'demo123'
};

const generateMockToken = (): string => {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = btoa(JSON.stringify({
    email: MOCK_CREDENTIALS.email,
    exp: Date.now() + 3600000
  }));
  const signature = btoa('mock-signature');
  return `${header}.${payload}.${signature}`;
};

export const authService = {
  login(email: string, password: string): Promise<AuthUser> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === MOCK_CREDENTIALS.email && password === MOCK_CREDENTIALS.password) {
          const user: AuthUser = {
            email,
            token: generateMockToken(),
            refreshToken: generateMockToken()
          };
          localStorage.setItem('auth_user', JSON.stringify(user));
          resolve(user);
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 500);
    });
  },

  logout(): void {
    localStorage.removeItem('auth_user');
  },

  getCurrentUser(): AuthUser | null {
    const userStr = localStorage.getItem('auth_user');
    if (!userStr) return null;
    return JSON.parse(userStr);
  },

  refreshToken(): Promise<AuthUser> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const currentUser = this.getCurrentUser();
        if (currentUser) {
          const updatedUser: AuthUser = {
            ...currentUser,
            token: generateMockToken(),
            refreshToken: generateMockToken()
          };
          localStorage.setItem('auth_user', JSON.stringify(updatedUser));
          resolve(updatedUser);
        } else {
          reject(new Error('No user to refresh'));
        }
      }, 300);
    });
  }
};
