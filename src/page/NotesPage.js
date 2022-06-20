import React, { useEffect, useState } from 'react';
import Header from '../components/NoteHeader';
import Modal from '../components/Modal';
import FloatButton from '../components/ButtonFloat';
import NoteItem from '../components/NoteItem';
import DefaultComponent from '../components/DefaultEl';
import TextEditor from '../components/TextEditor';
import { Container } from './AppStyles';
import { Content, ContentWrap } from './AppStyles';
import { ReactComponent as DefaultHomeSvg } from '../assets/svg/defaultHome.svg';
import { useAuth } from '../hooks';
import { compare } from '../utils';

import noteService from '../api/note';
import { Navigate } from 'react-router-dom';

const NotesPage = () => {
  const [modelVisiblity, setModelVisiblity] = useState(false);
  const [notes, setNotes] = useState([]);
  const auth = useAuth();

  useEffect(() => {
    async function fetchNotes() {
      try {
        noteService.setToken(auth.token);
        const initialNotes = await noteService.getNotesByUser(auth.user);
        setNotes(initialNotes.notes.sort(compare));
      } catch(error) {
        console.error(error.message);
      }
    }
    fetchNotes();
  }, [auth.token, auth.user]);

  const handleNoteAdd = async (noteObject) => {
    try {
      const returnedNote = await noteService.create(noteObject);
      setNotes(notes.concat(returnedNote).sort(compare));
    } catch(error) {
      console.log(error.message);
    }
  };

  const toggleLikeOf = async (id) => {
    const note = notes.find(note => note.id === id);
    const changedNote = { ...note, like: !note.like };

    try {
      const updatedNote = await noteService.update(id, changedNote);
      setNotes(notes.map(n => n.id !== id ? n : updatedNote));
    } catch(error) {
      console.log(error.message);
    }
  };

  const handleNoteDelete = async (id) => {
    try {
      setNotes(notes.filter(n => n.id !== id));
      await noteService.remove(id);
    } catch(error) {
      console.log(error.message);
    }
  };

  const handleTagUpdate = async (id, tags) => {
    const note = notes.find(n => n.id === id);
    const changedNote = { ...note, tags: tags };

    try {
      const updatedNote = await noteService.update(id, changedNote);
      setNotes(notes.map(note => note.id !== id ? note : updatedNote));
    } catch(error) {
      console.log(error.message);
    }
  };

  if (!auth.user) {
    return <Navigate to="/login" replace/>;
  }

  return (
    <Container>
      <Header handleLogout={auth.logout} />
      <main>
        <ContentWrap>
          <Content>
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
      </main>
      <Modal
        createNote={handleNoteAdd}
        show={modelVisiblity}
        handleShow={setModelVisiblity}
      />
      <FloatButton handleClick={setModelVisiblity} />
    </Container>
  );
};


export default NotesPage;
