import React from 'react';
import { ModalWrap, ModalContent, IconWrap, ModalCloseIcon, Overlay } from './ModalStyles';
import TextEditor from './TextEditor';

const Modal = ({ createNote, show, handleShow }) => {
  return (
    <ModalWrap show={show}>
      <Overlay onClick={handleShow}></Overlay>
      <IconWrap>
        <ModalCloseIcon onClick={handleShow} />
      </IconWrap>
      <ModalContent>
        <TextEditor createNote={createNote}/>
      </ModalContent>
    </ModalWrap>
  );
};

export default Modal;
