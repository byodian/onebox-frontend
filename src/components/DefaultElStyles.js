import Styled from 'styled-components';

export const DefaultComponentWrap = Styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 55vh; 
`;

export const DefaultSvgWrap = Styled.div`
  display: flex;
  margin-bottom: var(--space-16);
  svg {
    width: 200px;
    height: auto;
  }
`;

export const Description = Styled.p`
  color: var(--color-gray-06);
`;
