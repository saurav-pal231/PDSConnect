import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'wouter';

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [, setLocation] = useLocation();

  useEffect(() => {
    const savedUser = localStorage.getItem('pds_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('pds_user', JSON.stringify(userData));
    
    // Redirect based on role
    switch (userData.role) {
      case 'shop':
        setLocation('/shop');
        break;
      case 'beneficiary':
        setLocation('/beneficiary');
        break;
      case 'admin':
        setLocation('/admin');
        break;
      default:
        setLocation('/login');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('pds_user');
    setLocation('/');
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}