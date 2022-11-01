import React, { useState, useContext, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import { userService } from '../services';

function useProvidedAuth() {
  const userItem = JSON.parse(localStorage.getItem('user'));
  const tokenItem = JSON.parse(localStorage.getItem('token'));
  const isLoggingIn = JSON.parse(localStorage.getItem('isLoggingIn')) ?? false;

  const toast = useToast();
  const [user, setUser] = useState(userItem);
  const [accessToken, setAccessToken] = useState(tokenItem);
  const [isAuth, setIsAuth] = useState(isLoggingIn);

  const navigate = useNavigate();

  const login = async (userObject) => {
    try {
      const { user: currentUser, token } = await userService.login(userObject);
      localStorage.setItem('user', JSON.stringify(currentUser));
      localStorage.setItem('token', JSON.stringify(token));
      localStorage.setItem('isLoggingIn', true);
      setUser(currentUser);
      setAccessToken(token);
      setIsAuth(true);
      navigate('/notes/all');
    } catch (error) {
      toast({
        title: error.message,
        position: 'top',
        status: 'error',
        duration: 3000,
      });
    }
  };

  const register = async (newUser) => {
    try {
      await userService.create(newUser);
      toast({
        title: '注册成功，请前往登陆',
        position: 'top',
        status: 'success',
        duration: 3000,
      });
      navigate('/login');
    } catch (error) {
      toast({
        title: error.message,
        position: 'top',
        status: 'error',
        duration: 3000,
      });
    }
  };

  const logout = () => {
    localStorage.clear();
    setIsAuth(false);
    navigate('/');
  };

  return {
    user,
    accessToken,
    isAuth,
    login,
    register,
    logout,
  };
}

const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvidedAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export function useAuth() {
  return useContext(authContext);
}
