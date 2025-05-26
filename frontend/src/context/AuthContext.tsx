import {
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
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }

    setIsLoading(false);
  }, []);

  const login = (data: LoginResponse) => {
    console.log("function login start");
    const { token, user } = data;
    console.log('🔥 login → user =', user);
    const [firstName, ...rest] = user.name.split(' ');
    const lastName = rest.join(' ') || '';


        const adaptedUser: User = {
        id: user.id,
        email: user.email,
        name: user.name,
        phone: user.phone,
        description: user.description,
        avatarUrl: user.avatarUrl || '',
        rating: user.rating ?? 0,
        role: user.role,
        createdAt: user.createdAt || new Date().toISOString(),
        firstName,
        lastName,
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
        isLoading
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
