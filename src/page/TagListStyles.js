import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const TagsWrap = styled.ul`
  /* display: flex; */
  flex-wrap: wrap;
  margin: 0;
`;
export const Tag = styled.li`
  display: inline-block;
  margin: 0 var(--space-8) var(--space-8) 0;
`;

export const TagLink = styled(Link)`
  display: block;
  color: var(--main-color);
  padding: var(--space-8) var(--space-16);
  border-radius: var(--radius-xl);
  background-color: #fff;
  border: 1px solid;
  white-space: nowrap;
  line-height: 0.8;
  font-size: 1.4rem;
  font-weight: 500;

  &:hover {
    background-color: var(--main-color-highlight-01);
    color: var(--main-color-highlight-02);
  }
`;