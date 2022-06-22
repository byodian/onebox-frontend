import styled from 'styled-components';
import { EyeOpenedIcon, EyeHidedIcon } from './IconStyles';

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

export const EyeOpenedButton = styled(EyeOpenedIcon)`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

export const EyeHidedButton = styled(EyeHidedIcon)`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;
