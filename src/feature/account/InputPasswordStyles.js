import styled from '@emotion/styled';
import { BsEye, BsEyeSlash } from 'react-icons/bs';

export const ButtonWrap = styled.span`
  position: absolute; 
  right: var(--space-4);
  top: 0;
  bottom: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  margin-top: auto;
  margin-bottom: auto;
  color: var(--color-gray-06); 
`;

export const EyeOpenedButton = styled(BsEye)`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

export const EyeHidedButton = styled(BsEyeSlash)`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;
