import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthContextType } from '../types';
import { storage } from '../utils/storage';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = storage.get('user');
    if (storedUser) {
      setUser(storedUser);
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simple validation - in production, this would be a real API call
    const users = storage.get('users') || [];
    const existingUser = users.find((u: any) => u.email === email && u.password === password);
    
    if (existingUser) {
      const { password: _, ...userWithoutPassword } = existingUser;
      setUser(userWithoutPassword);
      storage.set('user', userWithoutPassword);
      setLoading(false);
      return true;
    }
    
    setLoading(false);
    return false;
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simple registration - in production, this would be a real API call
    const users = storage.get('users') || [];
    const existingUser = users.find((u: any) => u.email === email);
    
    if (existingUser) {
      setLoading(false);
      return false;
    }
    
    const newUser = {
      id: Date.now().toString(),
      email,
      password,
      name,
      createdAt: new Date().toISOString(),
    };
    
    users.push(newUser);
    storage.set('users', users);
    
    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    storage.set('user', userWithoutPassword);
    
    setLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    storage.remove('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};