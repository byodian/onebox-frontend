import styled from 'styled-components';

export const Label = styled.label`
  font-weight: bold;
  font-size: 1.4rem;
  margin-bottom: var(--space-4);
`;

export const Input = styled.input`
  display: block;
  width: 100%;
  padding: var(--space-4) var(--space-8);
  border-radius: var(--radius-md);
  border: 1px solid #333;
  outline: none;

  &::placeholder {
    color: var(--color-grey-05);
    font-size: 1.4rem;
  }

  &:focus:invalid {
    border-color: var(--color-td-primary);
  }

  &:focus:valid {
    border-color: var(--color-green-05);
  }
`;