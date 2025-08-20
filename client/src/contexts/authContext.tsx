import React, { useState, useEffect, type ReactNode } from 'react';
import type { User } from '../types/apiTypes';
import { AuthContext } from '../hooks/useAuth';
import useLogin from '../hooks/useLogin';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const { login: loginRequest, loading: loginLoading } = useLogin();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (token && userData) {
      setLoggedIn(true);
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const userData = await loginRequest(email, password);
    setLoggedIn(true);
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', userData.loggedUser.token);
    localStorage.setItem("userEmail", email);
  };

  const logout = () => {
    setLoggedIn(false);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const value = {
    loggedIn,
    user,
    login,
    logout,
    loading: loading || loginLoading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
