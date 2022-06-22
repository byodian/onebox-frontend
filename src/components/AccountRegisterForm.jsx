import React, { useState } from 'react';
import { Input, Label } from './InputStyles';
import { useAuth } from '../hooks';
import { LoginButton } from './ButtonStyles';

import {
  ButtonWrap,
  EyeHidedButton,
  EyeOpenedButton,
} from './InputPasswordStyles';

function AccountRegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassWord] = useState('');
  const [username, setUsername] = useState('');
  const [visible, setVisible] = useState(false);

  const passwordType = visible ? 'text' : 'password';

  const handleVisibleToggle = () => {
    setVisible(!visible);
  };

  const auth = useAuth();

  const handleSubmit = () => {
    auth.register({
      email,
      username,
      password,
    });
  };

  return (
    <form>
      <div className="mb-4">
        <Label htmlFor="email">邮箱地址</Label>
        <Input
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          type="email"
          id="email"
          required
          reset="email"
          placeholder="请输入邮箱地址"
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="username">用户名</Label>
        <Input
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          type="text"
          id="username"
          name="username"
          required
          placeholder="请输入用户名"
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="password">密码</Label>
        <div className="relative">
          <Input
            value={password}
            onChange={(event) => setPassWord(event.target.value)}
            id="password"
            required
            reset="password"
            type={passwordType}
            placeholder="请输入密码"
          />
          <ButtonWrap>
            {visible
              ? <EyeOpenedButton onClick={handleVisibleToggle} />
              : <EyeHidedButton onClick={handleVisibleToggle} />}
          </ButtonWrap>
        </div>
      </div>
      <div className="mt-8">
        <LoginButton id="login-button" type="button" onClick={handleSubmit}>注册</LoginButton>
      </div>
    </form>
  );
}

export default AccountRegisterForm;
