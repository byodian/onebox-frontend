import React, { useState, useContext, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { userService } from '../services';

function useProvidedAuth() {
  const userItem = JSON.parse(localStorage.getItem('user'));
  const tokenItem = JSON.parse(localStorage.getItem('token'));
  const isLoggingIn = JSON.parse(localStorage.getItem('isLoggingIn')) ?? false;

  const [user, setUser] = useState(userItem);
  const [token, setToken] = useState(tokenItem);
  const [isAuth, setIsAuth] = useState(isLoggingIn);

  const navigate = useNavigate();

  const login = async (userObject) => {
    try {
      const { username, token: userToken } = await userService.login(userObject);
      localStorage.setItem('user', JSON.stringify(username));
      localStorage.setItem('token', JSON.stringify(userToken));
      localStorage.setItem('isLoggingIn', true);
      setUser(username);
      setToken(userToken);
      setIsAuth(true);
      navigate('/notes/all');
    } catch (error) {
      // handleMessage('用户名或密码不正确', 'error');
      console.log(error.message);
    }
  };

  const register = async (newUser) => {
    try {
      await userService.create(newUser);
      navigate('/login');
    } catch (error) {
      // handleMessage('您输入的邮箱地址或用户名已被使用', 'error');
      console.dir(error.message);
    }
  };

  const logout = () => {
    localStorage.clear();
    setIsAuth(false);
    navigate('/');
  };

  return {
    user,
    token,
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
