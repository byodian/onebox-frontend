import React from 'react';
import { Input, Label } from '../components/InputStyles';
import { useField } from '../hooks';
import { ExtendedButton } from './LoginPageStyles';
import InputPassword from '../components/InputPassword';

const Register = ({ handleRegister }) => {
  const email = useField('email');
  const username = useField('text');
  const password = useField('password');

  const handleSubmit = (event) => {
    event.preventDefault();
    handleRegister({
      email: email.value,
      username: username.value,
      password: password.value
    });
  };

  return (
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
        <InputPassword password={password} />
      </div>
      <div>
        <ExtendedButton id="login-button" type="submit">注册</ExtendedButton>
      </div>
    </form>
  );
};

export default Register;
