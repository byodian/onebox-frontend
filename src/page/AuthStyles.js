import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

export const ExtendedLink = styled(Link)`
  color: var(--color-red-06);
`;

export const LogoContainer = styled.div`
  padding: var(--space-32) var(--space-16);

  @media (min-width: 424px) {
    padding-left: 0;
    padding-right: 0;
  }
`;

export const BreakLine = styled.div`
  height: 1px;
  background-color: var(--color-gray-04);
  margin-top: var(--space-48);
`;

export const Container = styled.div`
  min-height: 100vh;

  @media (min-width: 424px) {
    width: 100%;
    max-width: 375px;
    margin: 0 auto;
  }
`;

export const FormContainer = styled.div`
  padding: var(--space-32) var(--space-16);
  border: 1px solid transparent;

  @media (min-width: 424px) {
    padding-left: var(--space-32);
    padding-right: var(--space-32);
    border: 1px solid var(--main-color);
    border-radius: var(--radius-md);
  }
`;
