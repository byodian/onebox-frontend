import styled from 'styled-components';
import { Button } from './ButtonStyles';

export const EditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: var(--space-32);
  padding: var(--space-16);
  border-radius: var(--radius-md);
  background-color: var(--color-base-white);
`;

export const SubmitButton = styled(Button)`
  min-width: 6rem;
  padding: var(--space-4) var(--space-8);
  margin-top: var(--space-16);
  font-size: 1.2rem;
  margin-left: auto;
  
  // right align
  @media screen and (min-width: 420px) {
    padding: var(--space-8) var(--space-16);
  }
`;
