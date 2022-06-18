import React, { useEffect, useState } from 'react';
import { useResource, useMessage, useVisibility } from './hooks';
import noteService from './api/note';
import TextEditor from './components/TextEditor';
import Overlay from './components/Overlay';
import DefaultComponent from './components/DefaultEl';
import { ReactComponent as DefaultHomeSvg } from './assets/svg/defaultHome.svg';
import { ReactComponent as DefaultTagsSvg } from './assets/svg/defaultTags.svg';
import AuthPage from './page/AuthPage';
import Home from './page/HomePage';
import Notes from './page/NoteList';
import Details from './page/NoteDetail';
import NotesContainer from './page/NotesContainer';
import TagList from './page/TagList';
import { Container } from './AppStyles';
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useMatch
} from 'react-router-dom';
import './assets/styles/main.scss';

const App = () => {
  const [user, setUser] = useState(null);
  const [notes, { handleResources: handleNotes }] = useResource([]);
  const [message, { handleMessage, removeMessage, severity }] = useMessage();
  const [tags, { handleResources: handleTags }] = useResource([]);
  const modal = useVisibility(false);
  const sidebar = useVisibility(false);
  const navigate = useNavigate();

  const helper = {
    getAllNotes: user => note =>
      note.user.username === user.username,
    getFavoriteNotes: user => note =>
      notes.user.username === user.username && note.like,
    compare: (a, b) => {
      if (a.date < b.date) return 1;
      if (a.date > b.date) return -1;
      return 0;
    },
    getLocalDate: (date) => {
      const d = new Date(date);
      const localTime = d.toLocaleTimeString('en', { hour12: false });
      const localDate = d.toLocaleDateString('zh-cn').replace(/\//g, '-');
      return `${localDate} ${localTime}`;
    }
  };

  useEffect(() => {
    const loggedNoteappUser = window.localStorage.getItem('loggedNoteappUser');
    if (loggedNoteappUser) {
      const user = JSON.parse(loggedNoteappUser);
      setUser(user);
      noteService.setToken(user.token);
    }
  }, []);

  // Route
  const match = useMatch('/notes/:id');
  const id = match ? match.params.id : null;

  const tagMatch = useMatch('/tags/:tag');
  const tag = tagMatch ? tagMatch.params.tag : null;

  // Get favorite notes
  const favoriteNotes = notes.filter(n => n.like);

  // Get the notes of specific tag
  const notesOfSpecificTag = notes.filter(n => n.tags.includes(tag));

  const addNote = async (noteObject) => {
    try {
      const returnedNote = await noteService.create(noteObject);
      handleNotes(notes.concat(returnedNote).sort(helper.compare));
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

  const deleteNoteOf = async (id) => {
    try {
      if (window.confirm('此操作不可撤销，并且将从你的个人资料中移除此条笔记')) {
        handleNotes(notes.filter(n => n.id !== id));
        await noteService.remove(id);
        handleMessage('删除成功', 'success');
        removeMessage(1000);
      }
    } catch(error) {
      handleMessage('删除失败', 'error');
      removeMessage(2000);
    }
  };

  const updateTagsOf = async (id, tags) => {
    const note = notes.find(n => n.id === id);
    const changedNote = { ...note, tags: tags };

    try {
      if (window.confirm('此操作将更新笔记标签')) {
        const updatedNote = await noteService.update(id, changedNote);
        handleNotes(notes.map(note => note.id !== id ? note : updatedNote));
      }
    } catch(error) {
      handleMessage('更新失败', 'error');
      removeMessage(2000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteappUser');
    setUser(null);
    handleTags([]);
    navigate('/');
  };

  const notesProps = {
    notes,
    user,
    handleNotes,
    message,
    severity,
    getLocalDate: helper.getLocalDate,
    compare: helper.compare,
    toggleLikeOf,
    deleteNoteOf,
    updateTagsOf
  };

  const custom = {
    open: sidebar.visibility,
    handleOpen: sidebar.handleVisibility,
    handleLogout,
    message,
    severity,
    createNote: addNote,
    handleShow: modal.handleVisibility,
    show: modal.visibility,
    tags
  };

  const showNotesPage = (notesProps) => (
    <Container>
      <Overlay
        visibility={sidebar.visibility}
        handleClick={sidebar.setHidden}
      />
      <NotesContainer {...custom}>
        <Notes {...notesProps}>
          {
            notes.length > 0
              ? <TextEditor createNote={addNote} />
              : <div>
                <TextEditor createNote={addNote} />
                <DefaultComponent icon={<DefaultHomeSvg />} text="写点什么吧？" />
              </div>
          }
        </Notes>
      </NotesContainer>
    </Container>
  );

  const showDetailsPage = () => (
    <Container>
      <Overlay
        visibility={sidebar.visibility}
        handleClick={sidebar.handleVisibility}
      />
      <NotesContainer {...custom}>
        <Details
          id={id}
          getLocalDate={helper.getLocalDate}
        />
      </NotesContainer>
    </Container>
  );

  const showTagsPage = () => (
    <Container>
      <Overlay
        visibility={sidebar.visibility}
        handleClick={sidebar.handleVisibility}
      />
      <NotesContainer {...custom}>
        <TagList
          user={user}
          tags={tags}
          handleTags={handleTags}
        />
        {notes.length > 0
          ? null
          : <DefaultComponent icon={<DefaultTagsSvg />} text="还没有标签" />
        }
      </NotesContainer>
    </Container>
  );

  return (
    <Routes>
      {/* <Route path="/tags/:tag"> */}
      {/*   { user ? showNotesPage({ ...notesProps, notes: notesOfSpecificTag }) : null } */}
      {/* </Route> */}
      {/* <Route path="/tags"> */}
      {/*   {user ? showTagsPage : null } */}
      {/* </Route> */}
      {/* <Route path="/notes/:id"> */}
      {/*   {showDetailsPage()} */}
      {/* </Route> */}
      {/* <Route path="/favorites"> */}
      {/*   { user ? showNotesPage({ ...notesProps, notes: favoriteNotes }) : null } */}
      {/* </Route> */}
      {/* <Route path="/notes"> */}
      {/*   { user ? showNotesPage(notesProps) : <Navigate to="/login" /> } */}
      {/* </Route> */}
      <Route path="/login" element={
        <AuthPage  isLogginActive={true} />
      } />
      <Route path="/register" element={
        <AuthPage  isLogginActive={false} />
      } />
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

export default App;
