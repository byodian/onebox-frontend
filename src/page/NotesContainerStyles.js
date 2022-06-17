import styled from 'styled-components';

export const ContentWrap = styled.div`
  min-height: calc(100vh - var(--space-48));
  transition: all 0.2s ease-in-out;

  @media screen and (min-width: 768px) {
    margin-left: ${props => props.isOpen ? '18.0rem' : '0'};
  }
`;

export const Content = styled.div`
  padding: var(--space-32) var(--space-16);
  min-height: calc(100vh - var(--space-48));

  @media screen and (min-width: 768px) {
    max-width: 800px;
    margin: 0 auto;
  }
`;

export const Main = styled.main`
`;