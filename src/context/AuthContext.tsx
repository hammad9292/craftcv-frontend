import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  fullName: string;
  email: string;
  avatarUrl?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (fullName: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (updated: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('craftcv_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return null; }
    }
    // Prefill user by default
    const prefill = {
      fullName: 'Ahmad Khan',
      email: 'ahmad@example.com',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'
    };
    localStorage.setItem('craftcv_user', JSON.stringify(prefill));
    return prefill;
  });

  const isAuthenticated = user !== null;

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simply accept any non-empty credential for premium SaaS mockup play
    if (email && password) {
      const loggedUser = {
        fullName: email === 'ahmad@example.com' ? 'Ahmad Khan' : email.split('@')[0],
        email: email,
        avatarUrl: email === 'ahmad@example.com' 
          ? 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'
          : `https://api.dicebear.com/7.x/adventurer/svg?seed=${email}`
      };
      setUser(loggedUser);
      localStorage.setItem('craftcv_user', JSON.stringify(loggedUser));
      return true;
    }
    return false;
  };

  const signup = async (fullName: string, email: string, password: string): Promise<boolean> => {
    if (fullName && email && password) {
      const newUser = {
        fullName,
        email,
        avatarUrl: `https://api.dicebear.com/7.x/adventurer/svg?seed=${fullName}`
      };
      setUser(newUser);
      localStorage.setItem('craftcv_user', JSON.stringify(newUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('craftcv_user');
  };

  const updateUser = (updated: Partial<User>) => {
    if (user) {
      const next = { ...user, ...updated };
      setUser(next);
      localStorage.setItem('craftcv_user', JSON.stringify(next));
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, signup, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
