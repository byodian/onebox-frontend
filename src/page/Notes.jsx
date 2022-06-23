import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Header from '../components/NoteHeader';
import Modal from '../components/Modal';
import FloatButton from '../components/ButtonFloat';
import NoteItem from '../components/NoteItem';
import NoteItemIcon from '../components/NoteItemIcon';
import DefaultComponent from '../components/DefaultEl';
import TextEditor from '../components/TextEditor';
import Main from './AppStyles';
import { ReactComponent as DefaultHomeSvg } from '../assets/svg/defaultHome.svg';
import { useAuth } from '../hooks';
import { compare } from '../utils';
import noteService from '../api/note';

let uid = 0;
function NotesPage() {
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
        setNotes(initialNotes);
      } catch (error) {
        console.error(error.message);
      }
    }
    fetchNotes();
  }, [auth.token, auth.user]);

  const handleModelVisible = (id, type) => {
    setVisible(!visible);

    if (type === 'update') {
      setCurrentId(id);
    } else {
      setCurrentId('');
    }
  };

  /**
  * 目前只能新增笔记内容
  * @param {Object} noteObject
  * @param {String} noteObject.content - 笔记内容
  * @returns
  */
  const handleNoteAdd = async (noteObject) => {
    try {
      const date = new Date().toString();
      const newNote = {
        ...noteObject, id: uid, tags: ['未标记'], date,
      };

      // 快速显示新增内容
      setNotes(notes.concat(newNote).sort(compare));

      uid += 1;
      setVisible(false);

      // 发送笔记内容到服务器
      await noteService.create(noteObject);
    } catch (error) {
      console.log(error.message);
    }
  };

  /**
  * @param {Object} updatedNote
  * @param {String} updateNote.content
  */
  const handleNoteUpdate = async (updatedNote) => {
    try {
      setVisible(false);
      // 目前只能更新内容
      setNotes(notes.map((note) => (
        note.id === currentId
          ? { ...note, content: updatedNote.content }
          : note
      )));
      await noteService.update(currentId, updatedNote);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleStarToggle = async (id) => {
    const note = notes.find((item) => item.id === id);
    const changedNote = { ...note, like: !note.like };

    try {
      setNotes(notes.map((n) => (n.id !== id ? n : changedNote)));
      await noteService.update(id, changedNote);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleNoteDelete = async (id) => {
    try {
      setNotes(notes.filter((n) => n.id !== id));
      await noteService.remove(id);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleTagUpdate = async (id, tags) => {
    const oldNote = notes.find((n) => n.id === id);
    const changedNote = { ...oldNote, tags };

    try {
      setNotes(notes.map((note) => (note.id !== id ? note : changedNote)));
      await noteService.update(id, changedNote);
    } catch (error) {
      console.log(error.message);
    }
  };

  if (!auth.user) {
    return <Navigate to="/login" replace />;
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
            </div>
          )
        }
        <ul>
          {notes.map((note) => (
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
                goDetail={() => navigate(`/notes/${note.id}`)}
              />
            </NoteItem>
          ))}
        </ul>
      </Main>
      <Modal
        show={visible}
        handleShow={() => setVisible(!visible)}
      >
        <TextEditor
          handleNoteSubmit={currentId ? handleNoteUpdate : handleNoteAdd}
          initialContent={currentId ? notes.find((n) => n.id === currentId)?.content : ''}
        />
      </Modal>
      <FloatButton handleClick={() => handleModelVisible(null, 'create')} />
    </div>
  );
}

export default NotesPage;
