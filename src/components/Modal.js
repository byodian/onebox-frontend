import React from 'react';
import { ModalWrap, ModalContent, IconWrap, ModalCloseIcon, Overlay } from './ModalStyles';
import TextEditor from './TextEditor';
import Alert from './AlertStyles';

const Modal = ({ createNote, message, severity, show, handleShow }) => {
  return (
    <ModalWrap show={show}>
      <Overlay onClick={handleShow}></Overlay>
      <IconWrap>
        <ModalCloseIcon onClick={handleShow} />
      </IconWrap>
      <ModalContent>
        <Alert severity={severity} message={message}>{message}</Alert>
        <TextEditor createNote={createNote}/>
      </ModalContent>
    </ModalWrap>
  );
};

export default Modal;
