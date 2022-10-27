import React, { useState } from 'react';
import { Button } from '@chakra-ui/react';
import { Input, Label } from './InputStyles';
import { useAuth } from '../hooks';

import {
  ButtonWrap,
  EyeHidedButton,
  EyeOpenedButton,
} from './InputPasswordStyles';

function AccountLoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassWord] = useState('');
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const auth = useAuth();

  const passwordType = visible ? 'text' : 'password';

  const handleVisibleToggle = () => {
    setVisible(!visible);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    await auth.login({
      email,
      password,
    });
    setIsLoading(false);
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
        <Button
          isLoading={isLoading}
          loadingText="登陆中"
          colorScheme="teal"
          onClick={handleSubmit}
          className="w-full"
        >
          登陆
        </Button>
      </div>
    </form>
  );
}

export default AccountLoginForm;
