import React, { useEffect, useState } from 'react';
import parse from 'html-react-parser';
import { useParams } from 'react-router-dom';
import { Spinner } from '@chakra-ui/react';
import { noteService } from '../services';
import { getLocalDate } from '../utils';
import { useAuth } from '../hooks';

function Note() {
  const params = useParams();
  const [note, setNote] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const auth = useAuth();
  noteService.setToken(auth.accessToken);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const returnedNote = await noteService.getById(params.id);
        setNote(returnedNote);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchNotes();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  return (
    <main>
      {isLoading
        ? (
          <Spinner color="teal.500" />
        ) : (
          <div className="prose">
            <p>
              <time className="block text-gray-400">{getLocalDate(note.createdAt)}</time>
            </p>
            {parse(note.content)}
          </div>
        )}
    </main>

  );
}

export default Note;
