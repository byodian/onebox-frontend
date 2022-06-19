import React, { useEffect } from 'react';
import Header from '../components/NoteHeader';
import Modal from '../components/Modal';
import FloatButton from '../components/ButtonFloat';
import NoteItem from '../components/NoteItem';
import DefaultComponent from '../components/DefaultEl';
import TextEditor from '../components/TextEditor';

import Alert from '../components/AlertStyles';
import { Container } from './AppStyles';
import { Main, Content, ContentWrap } from './NotesPageStyles';

import { ReactComponent as DefaultHomeSvg } from '../assets/svg/defaultHome.svg';

import { useVisibility, useMessage, useResource } from '../hooks';
import { compare } from '../utils';
import noteService from '../api/note';

import { useNavigate } from 'react-router-dom';

const NotesPage = () => {
  const [modelVisiblity, { handleVisibility: handleModalShow }] = useVisibility(false);
  const [{ message, severity }, { handleMessage, removeMessage }] = useMessage();
  const [notes, { handleResources: handleNotes }] = useResource([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedNoteappUser = window.localStorage.getItem('loggedNoteappUser');
    const { username, token } = JSON.parse(loggedNoteappUser);
    noteService.setToken(token);

    async function fetchNotes() {
      try {
        const initialNotes = await noteService.getNotesByUser(username);
        handleNotes(initialNotes.notes.sort(compare));
      } catch(error) {
        console.log(error.message);
      }
    }

    fetchNotes();
  }, []);


  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteappUser');
    // setUser(null);
    // handleTags([]);
    navigate('/');
  };

  const handleNoteAdd = async (noteObject) => {
    try {
      const returnedNote = await noteService.create(noteObject);
      handleNotes(notes.concat(returnedNote).sort(compare));
      handleMessage('保存成功', 'success');
      removeMessage(1000);
    } catch(exception) {
      handleMessage('内容不能为空或字数不能少于八', 'error');
      removeMessage(5000);
    }
  };

  const toggleLikeOf = async (id) => {
    const note = notes.find(note => note.id === id);
    const changedNote = { ...note, like: !note.like };

    try {
      const updatedNote = await noteService.update(id, changedNote);
      handleNotes(notes.map(n => n.id !== id ? n : updatedNote));
    } catch(error) {
      handleMessage('更新失败', 'error');
      removeMessage(2000);
    }
  };

  const handleNoteDelete = async (id) => {
    try {
      handleNotes(notes.filter(n => n.id !== id));
      await noteService.remove(id);
      handleMessage('删除成功', 'success');
      removeMessage(1000);
    } catch(error) {
      handleMessage('删除失败', 'error');
      removeMessage(2000);
    }
  };

  const handleTagUpdate = async (id, tags) => {
    const note = notes.find(n => n.id === id);
    const changedNote = { ...note, tags: tags };

    try {
      const updatedNote = await noteService.update(id, changedNote);
      handleNotes(notes.map(note => note.id !== id ? note : updatedNote));
    } catch(error) {
      handleMessage('更新失败', 'error');
      removeMessage(2000);
    }
  };

  return (
    <Container>
      <Header handleLogout={handleLogout} />
      <Main>
        <ContentWrap>
          <Content>
            <Alert severity={severity} message={message}>{message}</Alert>
            <TextEditor createNote={handleNoteAdd} />
            {
              notes.length === 0 && (
                <div>
                  <DefaultComponent icon={<DefaultHomeSvg />} text="写点什么吧？" />
                </div>)
            }
            <ul>
              {notes.map(note =>
                <NoteItem
                  key={note.id}
                  note={note}
                  toggleLike={() => toggleLikeOf(note.id)}
                  deleteNote={() => handleNoteDelete(note.id)}
                  updateTag={handleTagUpdate}
                />
              )}
            </ul>
          </Content>
        </ContentWrap>
      </Main>
      <Modal
        createNote={handleNoteAdd}
        message={message}
        severity={severity}
        show={modelVisiblity}
        handleShow={handleModalShow}
      />
      <FloatButton handleClick={handleModalShow} />
    </Container>
  );
};


export default NotesPage;
