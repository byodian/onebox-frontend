import React from 'react';
import AuthPage from './page/AuthPage';
import Home from './page/HomePage';
import NoteDetailPage from './page/NoteDetailPage';
import NotesPage from './page/NotesPage';
import { Routes, Route } from 'react-router-dom';
import { ProvideAuth } from './hooks/useAuth';

import './assets/styles/main.scss';

const App = () => {
  return (
    <Routes>
      <Route path="/notes/:id" element={<NoteDetailPage />} />
      <Route path="/notes" element={
        <ProvideAuth>
          <NotesPage />
        </ProvideAuth>
      } />
      <Route path="/login" element={
        <ProvideAuth>
          <AuthPage isLogginActive={true} />
        </ProvideAuth>
      }
      />
      <Route path="/register" element={
        <ProvideAuth>
          <AuthPage isLogginActive={false} />
        </ProvideAuth>
      }
      />
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
};

export default App;
