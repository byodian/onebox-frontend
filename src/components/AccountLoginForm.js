import React from 'react';
import { Input, Label } from './InputStyles';
import { useField, useAuth } from '../hooks';
import { LoginButton } from './ButtonStyles';
import Password from './InputPassword';

const AccountLoginForm = () => {
  const email = useField('email');
  const password = useField('password');
  const auth = useAuth();

  const handleSubmit = (event) => {
    event.preventDefault();
    auth.login({
      email: email.value,
      password: password.value
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Label htmlFor="email">邮箱地址</Label>
          <Input
            {...email}
            id="email"
            required
            reset="email"
            placeholder='请输入邮箱地址'
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="password">密码</Label>
          <Password password={password}></Password>
        </div>
        <div class="mt-8">
          <LoginButton id="login-button" type="submit">登陆</LoginButton>
        </div>
      </form>
    </>
  );
};

export default AccountLoginForm;
