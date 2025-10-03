import { useState, useEffect } from 'react';

interface AuthContext {
  isAdmin: boolean;
  loading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const useAuth = (): AuthContext => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const expiry = localStorage.getItem('adminExpiry');
    if (token === 'true' && expiry && new Date().getTime() < parseInt(expiry)) {
      setIsAdmin(true);
    }
    setLoading(false);
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    const adminUser = process.env.REACT_APP_ADMIN_USER;
    const adminPassword = process.env.REACT_APP_ADMIN_PASSWORD;

    if (username === adminUser && password === adminPassword) {
      localStorage.setItem('adminToken', 'true');
      localStorage.setItem('adminExpiry', (Date.now() + 24 * 60 * 60 * 1000).toString()); // 24h
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminExpiry');
    setIsAdmin(false);
  };

  return { isAdmin, loading, login, logout };
};
