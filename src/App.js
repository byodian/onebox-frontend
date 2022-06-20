import React from 'react';
import Auth from './page/Auth';
import Home from './page/Home';
import NoteDetail from './page/NoteDetail';
import Notes from './page/Notes';
import { Routes, Route } from 'react-router-dom';
import { ProvideAuth } from './hooks/useAuth';

import './assets/styles/index.scss';

const App = () => {
  return (
    <Routes>
      <Route path="/notes/:id" element={<NoteDetail />} />
      <Route path="/notes" element={
        <ProvideAuth>
          <Notes />
        </ProvideAuth>
      } />
      <Route path="/login" element={
        <ProvideAuth>
          <Auth isLogginActive={true} />
        </ProvideAuth>
      }
      />
      <Route path="/register" element={
        <ProvideAuth>
          <Auth isLogginActive={false} />
        </ProvideAuth>
      }
      />
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
};

export default App;
