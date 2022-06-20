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
  background-color: var(--color-back-08);
`;

export const ModalContent= styled.div`
  /* 子元素层叠上下文顺序比 overlay 组件高 */
  height: 200px;
  background-color: white;
  position: relative;
  padding: var(--space-16);
  margin-top: var(--space-96);

  @media screen and (min-width: 540px) {
    width: 55%;
    margin-left: auto;
    margin-right: auto;
  }

  @media screen and (min-width: 1120px) {
    width: 670px;
  }
`;
