import React, { createContext, useState, useEffect, ReactNode } from 'react';

import axios from 'axios';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
  fetchUser: () => Promise<User>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  // const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const isAuthenticated = !!user;

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedToken = localStorage.getItem('token');

    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
      axios.defaults.headers.common['Authorization'] = `Bearer ${savedToken}`;
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post<{ user: User; token: string }>(
        'https://e-commerce-api-v2.academlo.tech/api/v1/users/login',
        { email, password }
      );

      const userData = response.data.user;
      const token = response.data.token;

      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } catch (error) {
      console.error('Error en el login:', error);
      throw error; // opcional: puedes manejar el error aquí o pasarlo al componente que maneje el login
    }
  };

  const logout = () => {
    setUser(null);
    delete axios.defaults.headers.common['Authorization'];
  };

  // Traerse os datos dell usuario logeado
  const fetchUser = async () => {
    try {
      const response = await axios.get<User>(`https://e-commerce-api-v2.academlo.tech/api/v1/users/me`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, fetchUser  }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
