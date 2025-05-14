import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import { LoginResponse, User } from '../types/types';

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (data: LoginResponse) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (data: LoginResponse) => {
    const { token, user } = data;

    // Трансформуємо fullName → firstName + lastName, якщо треба
    const [firstName, ...rest] = user.fullName.split(' ');
    const lastName = rest.join(' ') || '';

    const adaptedUser: User = {
      id: user.id,
      email: user.email,
      role: user.role,
      avatarUrl: user.avatarUrl,
      firstName,
      lastName,
      createdAt: new Date().toISOString(), // тимчасово
    };

    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(adaptedUser));
    setUser(adaptedUser);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        isAuthenticated: !!user && !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
