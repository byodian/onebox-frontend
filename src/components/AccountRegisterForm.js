import React from 'react';
import { Input, Label } from './InputStyles';
import { useField } from '../hooks';
import { LoginButton } from './ButtonStyles';
import Password from './InputPassword';

const AccountRegisterForm = ({ handleFormSubmit }) => {
  const email = useField('email');
  const username = useField('text');
  const password = useField('password');

  const handleSubmit = (event) => {
    event.preventDefault();
    handleFormSubmit({
      email: email.value,
      username: username.value,
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
          <Label htmlFor="username">用户名</Label>
          <Input
            {...username}
            id="username"
            required
            reset="username"
          />
        </div>
        <div className="md-margin-bottom">
          <Label htmlFor="password">密码</Label>
          <Password password={password}></Password>
        </div>
        <div>
          <LoginButton id="login-button" type="submit">注册</LoginButton>
        </div>
      </form>
    </>
  );
};

export default AccountRegisterForm;
