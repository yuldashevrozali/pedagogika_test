import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export type User = {
  id: string;
  username: string;
  phone: string;
  premium: boolean;
  accessToken: string | null;
  refreshToken: string | null;
} | null;

type AuthCtx = {
  user: User;
  login: (phone: string, password: string) => Promise<void>;
  signup: (username: string, phone: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setPremium: (v: boolean) => Promise<void>;
  loading: boolean;
};

const AuthContext = createContext<AuthCtx | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const raw = await AsyncStorage.getItem('user');
      if (raw) {
        const userData = JSON.parse(raw);
        setUser(userData);
        // Set axios default header if token exists
        if (userData.accessToken) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${userData.accessToken}`;
        }
      }
    })();
  }, []);

  const login = async (phone: string, password: string) => {
    setLoading(true);
    try {
      const loginData = {
        phone,
        password,
      };
      console.log('AuthContext login data being sent:', loginData);
      const response = await axios.post('https://pedagogika-backend.onrender.com/api/users/signin', loginData);

      const { user: userData, accessToken, refreshToken } = response.data;

      const userObj: User = {
        id: userData.id,
        username: userData.username,
        phone: userData.phone,
        premium: userData.premium || false,
        accessToken,
        refreshToken,
      };

      setUser(userObj);
      await AsyncStorage.setItem('user', JSON.stringify(userObj));

      // Set axios default header
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (username: string, phone: string, password: string) => {
    setLoading(true);
    try {
      const signupData = {
        username,
        phone,
        password,
      };
      console.log('AuthContext signup data being sent:', signupData);
      const response = await axios.post('https://pedagogika-backend.onrender.com/api/users/signup', signupData);

      // After successful signup, automatically login
      await login(phone, password);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem('user');
    // Clear axios default header
    delete axios.defaults.headers.common['Authorization'];
  };

  const setPremium = async (v: boolean) => {
    setUser((prev) => {
      const next = prev ? { ...prev, premium: v } : prev;
      if (next) {
        AsyncStorage.setItem('user', JSON.stringify(next));
      }
      return next;
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, setPremium, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};