import React from 'react';
import Logo from '../components/Logo';
import Alert from '../components/AlertStyles';
import {
  Container,
  LogoContainer,
  Heading,
  BreakLine,
  FormContainer,
  ExtendedLink
} from './LoginPageStyles';

const Form = ({ severity, heading, message, children }) => {
  return (
    <Container>
      <LogoContainer>
        <Logo />
      </LogoContainer>
      <FormContainer>
        <Heading>{heading}</Heading>
        <Alert severity={severity} message={message}>{message}</Alert>
        {children}
        <BreakLine></BreakLine>
        <div className="md-margin-top text-align-center sm1-font-size">
          {heading === '登录'
            ? <p>还没有账号？<ExtendedLink to="/register">注册</ExtendedLink></p>
            : <p>已有账号？<ExtendedLink to="/login">登录</ExtendedLink></p>
          }
        </div>
      </FormContainer>
    </Container>
  );
};

export default Form;
