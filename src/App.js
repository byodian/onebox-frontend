import React, { useEffect, useState } from 'react';
import { useResource, useVisibility } from './hooks';
import DefaultComponent from './components/DefaultEl';
import { ReactComponent as DefaultTagsSvg } from './assets/svg/defaultTags.svg';
import AuthPage from './page/AuthPage';
import Home from './page/HomePage';
import Details from './page/NoteDetail';
import NotesContainer from './page/NotesPage';
import TagList from './page/TagList';
import { Container } from './AppStyles';
import NotesPage from './page/NotesPage';

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
  const [tags, { handleResources: handleTags }] = useResource([]);
  const [visibility, { handleVisibility }] = useVisibility(false);
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

  // Route
  const match = useMatch('/notes/:id');
  const id = match ? match.params.id : null;

  const tagMatch = useMatch('/tags/:tag');
  const tag = tagMatch ? tagMatch.params.tag : null;

  // Get favorite notes
  const favoriteNotes = notes.filter(n => n.like);

  // Get the notes of specific tag
  const notesOfSpecificTag = notes.filter(n => n.tags.includes(tag));

  const notesProps = {
    notes,
    user,
    handleNotes,
    getLocalDate: helper.getLocalDate,
    compare: helper.compare,
  };

  const showDetailsPage = () => (
    <Container>
      <NotesContainer>
        <Details
          id={id}
          getLocalDate={helper.getLocalDate}
        />
      </NotesContainer>
    </Container>
  );

  const showTagsPage = () => (
    <Container>
      <NotesContainer>
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
      <Route path="/notes" element={ <NotesPage /> } />
      <Route path="/login" element={ <AuthPage isLogginActive={true} /> } />
      <Route path="/register" element={ <AuthPage isLogginActive={false} /> } />
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

export default App;
