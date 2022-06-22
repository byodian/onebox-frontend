import React, { useState, useContext, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService, userService } from '../api';

const authContext = createContext();

const useAuth = () => useContext(authContext);

function useProvidedAuth() {
  const initialUser = JSON.parse(localStorage.getItem('user'));
  const initialToken = JSON.parse(localStorage.getItem('token'));

  const [user, setUser] = useState(initialUser ?? null);
  const [token, setToken] = useState(initialToken ?? null);
  const navigate = useNavigate();

  const login = async (userObject) => {
    try {
      const { username, token: userToken } = await authService.login(userObject);
      localStorage.setItem('user', JSON.stringify(username));
      localStorage.setItem('token', JSON.stringify(userToken));
      setUser(username);
      setToken(userToken);
      navigate('/notes');
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
    navigate('/');
  };

  return {
    user,
    token,
    login,
    register,
    logout,
  };
}

export function ProvideAuth({ children }) {
  const auth = useProvidedAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export default useAuth;
