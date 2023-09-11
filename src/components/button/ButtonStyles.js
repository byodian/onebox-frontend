import styled from '@emotion/styled';
import { css } from '@emotion/react';

import {
  MdMenu,
  MdOutlineStar,
  MdAdd,
} from 'react-icons/md';

export const Button = styled.button`
  display: inline-block;
  padding: 0.6rem 1rem;
  background-color: #333;
  border-radius: var(--radius-md);
  font-size: 1rem;
  white-space: nowrap;
  min-width: 10rem;
  color: #fff;
  text-align: center;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #000;
  }

  ${(props) => props.primary && css`
    background: palevioletred;
    color: white;
  `}
`;

export const HamburgerButton = styled.button`
  display: flex;
  border-radius: var(--radius-sm);

  &:hover {
    background-color: var(--color-gray-02);
  }
`;

export const MenuButton = styled.button`
  display: flex;
  align-items: center;
  padding: 0;
  background-color: transparent;
  width: 100%;
  padding: var(--space-4) var(--space-8);

  &:hover {
    background-color: var(--color-gray-02);
  }
`;

export const MenuText = styled.span`
  margin-left: var(--space-8);
`;

export const Hamburger = styled(MdMenu)`
  width: 24px;
  height: 24px;
`;

export const PlusIcon = styled(MdAdd)`
  width: 24px;
  height: 24px;
`;

export const StarIcon = styled(MdOutlineStar)`
  color: var(--highlight);
`;
