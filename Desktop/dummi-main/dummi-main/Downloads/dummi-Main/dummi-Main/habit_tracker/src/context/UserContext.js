import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthToken(token);
      // Fetch user data if token exists
      fetchUserData();
    }
    setLoading(false);
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${API_URL}/auth/user`);
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
      logout(); // Clear invalid token
    }
  };

  const setAuthToken = (token) => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('token', token);
    } else {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
    }
  };

  const signup = async (username, email, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/signup`, {
        username,
        email,
        password
      });
      
      const { token, user } = response.data;
      setAuthToken(token);
      setUser(user);
      return user;
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.message || 'Signup failed';
      throw new Error(errorMessage);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password
      });
      
      const { token, user } = response.data;
      setAuthToken(token);
      setUser(user);
      return user;
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.message || 'Login failed';
      throw new Error(errorMessage);
    }
  };

  const logout = () => {
    setAuthToken(null);
    setUser(null);
  };

  const updateUserPreferences = async (preferences) => {
    try {
      const response = await axios.put(`${API_URL}/auth/preferences`, preferences);
      setUser(prev => ({ ...prev, ...response.data }));
    } catch (error) {
      throw new Error(error.response?.data?.error || error.message || 'Failed to update preferences');
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    logout,
    signup,
    updateUserPreferences
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
