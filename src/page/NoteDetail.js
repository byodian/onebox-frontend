import React, { useEffect, useState } from 'react';
import parse from 'html-react-parser';
import { Main } from './AppStyles';

import noteService from '../api/note';
import { getLocalDate } from '../utils';

import { useParams } from 'react-router-dom';

const NoteContent = ({ note }) => {
  return (
    <div className="prose prose-2xl">
      <p>
        <time className="block text-2xl text-gray-400">{getLocalDate(note.date)}</time>
      </p>
      {parse(note.content)}
    </div>
  );
};

const Note = () => {
  const params = useParams();
  const [note, setNote] = useState(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const returnedNote = await noteService.getById(params.id);
        setNote(returnedNote);
      } catch(error) {
        console.log(error);
      }
    };

    fetchNotes();
  }, [params.id]);

  return (
    <Main>
      {note
        ? <NoteContent note={note} />
        : null
      }
    </Main>
  );
};

export default Note;
