import styled from 'styled-components';

const Main = styled.main`
  padding: var(--space-32) var(--space-16);
  min-height: calc(100vh - var(--space-48));

  @media screen and (min-width: 768px) {
    max-width: 800px;
    margin: 0 auto;
  }
`;

export default Main;
