import React from 'react';
import { ModalWrap, ModalContent, Overlay } from './ModalStyles';

const Modal = ({ show, handleShow, children }) => {
  return (
    <ModalWrap show={show}>
      <Overlay onClick={handleShow}></Overlay>
      <ModalContent>
        {children}
      </ModalContent>
    </ModalWrap>
  );
};

export default Modal;
