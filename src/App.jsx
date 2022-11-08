import { Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import Auth from './page/Auth';
import Home from './page/Home';
import NoteDetail from './page/NoteDetail';
import Notes from './page/Notes';
import { ProvideAuth } from './hooks/useAuth';

import './assets/styles/index.scss';

function App() {
  return (
    <ChakraProvider>
      <Routes>
        <Route
          path="/notes/:id"
          element={(
            <ProvideAuth>
              <NoteDetail />
            </ProvideAuth>
          )}
        />

        <Route
          path="/notes/all"
          element={(
            <ProvideAuth>
              <Notes pageType="all" />
            </ProvideAuth>
          )}
        />

        <Route
          path="/notes/today"
          element={(
            <ProvideAuth>
              <Notes pageType="today" />
            </ProvideAuth>
          )}
        />

        <Route
          path="/notes/star"
          element={(
            <ProvideAuth>
              <Notes pageType="star" />
            </ProvideAuth>
          )}
        />

        <Route
          path="/folders/:folderId"
          element={(
            <ProvideAuth>
              <Notes pageType="folder" />
            </ProvideAuth>
          )}
        />

        <Route
          path="/login"
          element={(
            <ProvideAuth>
              <Auth isLogginActive />
            </ProvideAuth>
          )}
        />

        <Route
          path="/register"
          element={(
            <ProvideAuth>
              <Auth isLogginActive={false} />
            </ProvideAuth>
          )}
        />
        <Route
          path="/"
          element={(
            <ProvideAuth>
              <Home />
            </ProvideAuth>
          )}
        />
        <Route path="*" element={<Home />} />
      </Routes>
    </ChakraProvider>
  );
}

export default App;
