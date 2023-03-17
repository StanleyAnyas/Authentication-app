import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [authState, setAuthState] = useState({ isAuthenticated: false, user: null });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      authenticate(token);
    }
  }, []);

  const authenticate = (token) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios.get('/api/user')
      .then(response => {
        setAuthState({ isAuthenticated: true, user: response.data });
      })
      .catch(error => {
        console.error(error);
      });
  };

  const signin = (username, password) => {
    return axios.post('/api/signin', { username, password })
      .then(response => {
        localStorage.setItem('token', response.data.token);
        authenticate(response.data.token);
      });
  };

  const signup = (username, password) => {
    return axios.post('/api/signup', { username, password });
  };

  const signout = () => {
    localStorage.removeItem('token');
    setAuthState({ isAuthenticated: false, user: null });
  };

  return (
    <AuthContext.Provider value={{ authState, signin, signup, signout, authenticate }}>
      {props.children}
    </AuthContext.Provider>
  );
};
