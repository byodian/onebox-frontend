import React from 'react';

import Logo from '../components/Logo';
import AccountLoginForm from '../components/AccountLoginForm';
import AccountRegisterForm from '../components/AccountRegisterForm';

import {
  Container,
  LogoContainer,
  Heading,
  BreakLine,
  FormContainer,
  ExtendedLink
} from './AuthStyles';

const AuthPage = ({ isLogginActive }) => {
  const headingText = isLogginActive ? '登录' : '注册';

  return (
    <Container>
      <LogoContainer>
        <Logo />
      </LogoContainer>
      <FormContainer>
        <Heading>{headingText}</Heading>
        {isLogginActive
          ? <AccountLoginForm />
          : <AccountRegisterForm />
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
