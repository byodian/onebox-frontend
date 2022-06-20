import React, { useState } from 'react';
import { TogglePassword, PasswordInput,
  ButtonWrap,
  EyeHidedButton,
  EyeOpenedButton
} from './InputPasswordStyles';


const Password = ({ password }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };

  const type = open ? 'text' : 'password';

  return (
    <TogglePassword>
      <PasswordInput
        {...password}
        id="password"
        required
        reset="password"
        type={type}
        placeholder='请输入密码'
      ></PasswordInput>
      <ButtonWrap>
        {open
          ? <EyeOpenedButton onClick={handleOpen}></EyeOpenedButton>
          : <EyeHidedButton onClick={handleOpen}></EyeHidedButton>
        }
      </ButtonWrap>
    </TogglePassword>
  );
};

export default Password;
