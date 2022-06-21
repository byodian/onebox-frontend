import React, { useEffect, useState } from 'react';
import Header from '../components/NoteHeader';
import Modal from '../components/Modal';
import FloatButton from '../components/ButtonFloat';
import NoteItem from '../components/NoteItem';
import NoteItemIcon from '../components/NoteItemIcon';
import DefaultComponent from '../components/DefaultEl';
import TextEditor from '../components/TextEditor';
import { Main } from './AppStyles';
import { ReactComponent as DefaultHomeSvg } from '../assets/svg/defaultHome.svg';
import { useAuth } from '../hooks';
import { compare } from '../utils';

import noteService from '../api/note';
import { Navigate, useNavigate } from 'react-router-dom';

const NotesPage = () => {
  const [visible, setVisible] = useState(false);
  const [notes, setNotes] = useState([]);
  const [currentId, setCurrentId] = useState('');
  const navigate = useNavigate();
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

  const handleModelVisible = (id, type) => {
    setVisible(!visible);

    console.log('id', id);
    if (type === 'update') {
      setCurrentId(id);
    } else {
      setCurrentId('');
    }
  };

  const handleNoteAdd = async (noteObject) => {
    try {
      const returnedNote = await noteService.create(noteObject);
      setNotes(notes.concat(returnedNote).sort(compare));
      setVisible(false);
    } catch(error) {
      console.log(error.message);
    }
  };

  const handleNoteUpdate = async (noteObject) => {
    try {
      setVisible(false);
      const updatedNote = await noteService.update(currentId, noteObject);
      setNotes(notes.map(note => note.id === currentId ? updatedNote : note));
    } catch(error) {
      console.log(error.message);
    }
  };

  const handleStarToggle = async (id) => {
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
    <div className="relative">
      <Header handleLogout={auth.logout} />
      <Main>
        <TextEditor handleNoteSubmit={handleNoteAdd} />
        {
          notes.length === 0 && (
            <div>
              <DefaultComponent icon={<DefaultHomeSvg />} text="写点什么吧？" />
            </div>)
        }
        <ul>
          {notes.map(note =>
            <NoteItem
              note={note}
              key={note.id}
            >
              <NoteItemIcon
                tags={note.tags}
                like={note.like}
                toggleLike={() => handleStarToggle(note.id)}
                deleteNote={() => handleNoteDelete(note.id)}
                updateTag={(tags) => handleTagUpdate(note.id, tags)}
                toggleVisible={() => handleModelVisible(note.id, 'update')}
                goDetail={() => navigate('/notes/' + note.id)}
              />
            </NoteItem>
          )}
        </ul>
      </Main>
      <Modal
        show={visible}
        handleShow={() => setVisible(!visible)}
      >
        <TextEditor
          handleNoteSubmit={currentId ? handleNoteUpdate : handleNoteAdd}
          initialContent={currentId ? notes.find(n => n.id === currentId)?.content : ''}
        />
      </Modal>
      <FloatButton handleClick={() => handleModelVisible(null, 'create')} />
    </div>
  );
};


export default NotesPage;
