import React from 'react';
import { Input, Label } from './InputStyles';
import { useField } from '../hooks';
import { LoginButton } from './ButtonStyles';
import Password from './InputPassword';

const AccountLoginForm = ({ handleFormSubmit }) => {
  const email = useField('email');
  const password = useField('password');

  const handleSubmit = (event) => {
    event.preventDefault();
    handleFormSubmit({
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
          <LoginButton id="login-button" type="submit">登陆</LoginButton>
        </div>
      </form>
    </>
  );
};

export default AccountLoginForm;
