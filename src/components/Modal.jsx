import React from 'react';
import { ModalWrap, ModalContent, Overlay } from './ModalStyles';

function Modal({ show, handleShow, children }) {
  return (
    <ModalWrap show={show}>
      <Overlay onClick={handleShow} />
      <ModalContent>
        {children}
      </ModalContent>
    </ModalWrap>
  );
}

export default Modal;
