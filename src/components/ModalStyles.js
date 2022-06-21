import styled from 'styled-components';

export const ModalWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 401;
  overflow: auto;
  opacity: ${props => props.show ? '1' : '0'};
  visibility: ${props => props.show ? 'visible' : 'hidden'};
  transition: all 0.2s ease-in-out;
`;

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--color-back-06);
`;

export const ModalContent= styled.div`
  position: relative;
  width: 100%;
  margin: var(--space-96) auto;
  padding: var(--space-16);
  background-color: white;
  border-radius: 4px;

  @media screen and (min-width: 768px) {
    width: 800px;
  }
`;
