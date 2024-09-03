/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(['jwt']);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log('Checking auth with JWT:', cookies.jwt);

        const response = await axios.get('http://localhost:3001/protected-route', {
          withCredentials: true,
        });

        console.log('Auth check response:', response.data);
        setUser(response.data.user);
      } catch (error) {
        console.error('User is not authenticated:', error);
        setUser(null);
      }
    };
    checkAuth();
  }, [cookies.jwt]);

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        'http://localhost:3001/login',
        { email, password },
        { withCredentials: true }
      );
      setUser(response.data.user);
      setCookie('jwt', response.data.token, { path: '/' });
      console.log('logged in', response.data);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const logout = async () => {
    try {
      await axios.post('http://localhost:3001/logout', {}, { withCredentials: true });
      setUser(null);
      removeCookie('jwt', { path: '/' });
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
