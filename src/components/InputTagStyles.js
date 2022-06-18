import styled from 'styled-components';

export const TagsInputWrap = styled.div`
  position: relative;
  border: 1px solid var(--main-color);
  border-radius: var(--radius-md);
  margin-top: var(--space-16);
  overflow: hidden;
`;

export const TagsInput = styled.input`
  display: block;
  width: 100%;
  padding: var(--space-4) var(--space-8);
  border: none;

  &:focus {
    outline: none;
  }
`;

export const TagsButton = styled.button`
  position: absolute;
  top: 0;
  bottom: 0;
  right: var(--space-8);
  height: 2.4rem;
  margin-top: auto;
  margin-bottom: auto;
  padding: var(--space-4) var(--space-8);
  background-color: var(--main-color);
  color: #fff;
  border-radius: var(--radius-md);
  font-size: 1.2rem;
  line-height: 1;
`;
