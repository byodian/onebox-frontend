import React from 'react';
import Header from '../components/HeaderNotes';
import Sidebar from '../components/Siderbar';
import Modal from '../components/Modal';
import FloatButton from '../components/ButtonFloat';
import { Main, Content, ContentWrap } from './NotesContainerStyles';

const NotesContainer = (props) => {
  const {
    open,
    show,
    message,
    tags,
    severity,
    handleOpen,
    handleLogout,
    createNote,
    handleShow,
  } = props;
  return (
    <>
      <Header handleLogout={handleLogout} handleClick={handleOpen} />
      <Main>
        <Sidebar isOpen={open} handleOpen={handleOpen} tags={tags} />
        <ContentWrap isOpen={open}>
          <Content>{props.children}</Content>
        </ContentWrap>
      </Main>
      <Modal
        createNote={createNote}
        message={message}
        severity={severity}
        show={show}
        handleShow={handleShow}
      ></Modal>
      <FloatButton handleClick={handleShow} />
    </>
  );
};


export default NotesContainer;
