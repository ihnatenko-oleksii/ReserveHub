import React, { createContext, useContext, useState, ReactNode } from 'react';
import { LoginResponse } from '../types/types';

interface AuthContextType {
  user: LoginResponse['user'] | null;
  login: (userData: LoginResponse['user']) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<LoginResponse['user'] | null>(null);

  const login = (userData: LoginResponse['user']) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
