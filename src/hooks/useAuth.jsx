import { useState, useContext, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import { loginApi, createUserApi } from '../services/user';
import {
  getStorageUser,
  getStorageLogIn,
  getStorageToken,
  generateStorageToken,
  generateStorageUser,
  generateStorageLogIn,
  clearStorage,
} from '../utils/auth';

function useProvidedAuth() {
  const toast = useToast();
  const [user, setUser] = useState(getStorageUser());
  const [accessToken, setAccessToken] = useState(getStorageToken());
  const [isAuth, setIsAuth] = useState(getStorageLogIn() ?? false);
  const navigate = useNavigate();

  const login = async (userObject) => {
    try {
      const { user: currentUser, token } = await loginApi(userObject);
      // 缓存数据
      generateStorageToken(token);
      generateStorageLogIn(true);
      generateStorageUser(currentUser);

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
      await createUserApi(newUser);
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
    clearStorage();
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
