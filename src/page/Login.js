import React from 'react';
import { Input, Label } from '../components/InputStyles';
import { useField } from '../hooks';
import { ExtendedButton } from './LoginPageStyles';
import Password from '../components/PasswordInput';

const Login = ({ handleLogin }) => {
  const email = useField('email');
  const password = useField('password');

  const handleSubmit = (event) => {
    event.preventDefault();
    handleLogin({
      email: email.value,
      password: password.value
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="md-margin-bottom">
          <Label htmlFor="email">邮箱地址</Label>
          <Input
            {...email}
            id="email"
            required
            reset="email"
          />
        </div>
        <div className="md-margin-bottom">
          <Label htmlFor="password">密码</Label>
          <Password password={password}></Password>
        </div>
        <div>
          <ExtendedButton id="login-button" type="submit">登录</ExtendedButton>
        </div>
      </form>
    </>
  );
};

export default Login;
