import React from 'react';
import { useNavigate } from 'react-router-dom';

import Logo from '../components/Logo';
import Alert from '../components/AlertStyles';
import AccountLoginForm from '../components/AccountLoginForm';
import AccountRegisterForm from '../components/AccountRegisterForm';

import {
  Container,
  LogoContainer,
  Heading,
  BreakLine,
  FormContainer,
  ExtendedLink
} from './AuthPageStyles';

import loginService from '../api/login';
import userService from '../api/user';
import noteService from '../api/note';

import { useMessage } from '../hooks';

const AuthPage = ({ isLogginActive }) => {
  const [{ message, severity }, { handleMessage, removeMessage }] = useMessage();
  const navigate = useNavigate();
  const headingText = isLogginActive ? '登录' : '注册';

  const login = async (userObject) => {
    try {
      const user = await loginService.login(userObject);
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user));
      noteService.setToken(user.token);
      handleMessage('登录成功', 'success');
      removeMessage(2000);
      navigate('/notes');
    } catch (error) {
      // handleMessage('用户名或密码不正确', 'error');
      handleMessage(error.message, 'error');
      removeMessage(5000);
    }
  };

  const register = async (newUser) => {
    try {
      const user = await userService.create(newUser);
      handleMessage(`用户 ${user.username} 注册成功，请登录！`, 'success');
      removeMessage(2000);
      navigate('/login');
    } catch(error) {
      // handleMessage('您输入的邮箱地址或用户名已被使用', 'error');
      handleMessage(error.message, 'error');
      console.dir(error);
      removeMessage(5000);
    }
  };

  return (
    <Container>
      <LogoContainer>
        <Logo />
      </LogoContainer>
      <FormContainer>
        <Heading>{headingText}</Heading>
        <Alert severity={severity} message={message}>{message}</Alert>
        {isLogginActive
          ? <AccountLoginForm handleFormSubmit={login} />
          : <AccountRegisterForm handleFormSubmit={register} />
        }
        <BreakLine />
        <div className="md-margin-top text-align-center sm1-font-size">
          {isLogginActive
            ? <p>还没有账号？<ExtendedLink to="/register">注册</ExtendedLink></p>
            : <p>已有账号？<ExtendedLink to="/login">登陆</ExtendedLink></p>
          }
        </div>
      </FormContainer>
    </Container>
  );
};

export default AuthPage;
