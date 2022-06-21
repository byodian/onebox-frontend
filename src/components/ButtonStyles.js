import styled, { css } from 'styled-components';

export const Button = styled.button`
  display: inline-block;
  padding: 0.8rem 1.6rem;
  background-color: #333;
  border-radius: var(--radius-md);
  font-size: var(--heading-sm-font-size);
  white-space: nowrap;
  min-width: 13rem;
  color: #fff;
  text-align: center;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #000;
  }

  ${props =>
    props.primary &&
    css`
      background: palevioletred;
      color: white;
  `}
`;

export const TextButton = styled(Button)`
  padding: 0;
  min-width: auto;
  background: none;
  color: var(--color-red-06);
  font-size: inherit;

  &:hover {
    background: none;
  }
`;

export const HamburgerButton = styled.button`
  display: flex;
  border-radius: var(--radius-sm);
  padding: var(--space-4); 

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

export const LoginButton = styled(Button)`
  display: block;
  width: 100%;
  border-radius: var(--radius-md);
`;

export const MenuText = styled.span`
  margin-left: var(--space-8);
`;
