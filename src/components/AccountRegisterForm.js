import React from 'react';
import { Input, Label } from './InputStyles';
import { useField, useAuth } from '../hooks';
import { LoginButton } from './ButtonStyles';
import Password from './InputPassword';


const AccountRegisterForm = () => {
  const email = useField('email');
  const username = useField('text');
  const password = useField('password');
  const auth = useAuth();

  const handleSubmit = (event) => {
    event.preventDefault();
    auth.register({
      email: email.value,
      username: username.value,
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
          <Label htmlFor="username">用户名</Label>
          <Input
            {...username}
            id="username"
            required
            reset="username"
            placeholder='请输入用户名'
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="password">密码</Label>
          <Password password={password}></Password>
        </div>
        <div class="mt-8">
          <LoginButton id="login-button" type="submit">注册</LoginButton>
        </div>
      </form>
    </>
  );
};

export default AccountRegisterForm;
