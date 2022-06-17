import styled from 'styled-components';
import { MenuButton } from '../components/ButtonStyles';

export const ExtendedButton = styled(MenuButton)`
  padding: var(--space-12) var(--space-16);

  &:focus {
    background-color: var(--main-color);
    color: #fff;
  }

  &:focus path {
    fill: #fff;
  }
`;

export const NoteItems = styled.ul`
`;
