import React, { useEffect } from 'react';
import parse from 'html-react-parser';
import { useResource } from '../hooks';
import noteService from '../api/note';
import { DetailsWrap } from './NoteDetailStyles';

const DetailsContent = ({ note, getLocalDate }) => {
  return (
    <>
      <p>
        <time>{getLocalDate(note.date)}</time>
      </p>
      {parse(note.content)}
    </>
  );
};

const Details = ({ id, getLocalDate }) => {
  const [note, { handleResources: handleNotes }] = useResource(null);

  useEffect(async () => {
    const returnedNote = await noteService.getById(id);
    handleNotes(returnedNote);
  }, []);

  return (
    <DetailsWrap>
      {note
        ? <DetailsContent note={note} getLocalDate={getLocalDate} />
        : null
      }
    </DetailsWrap>
  );
};

export default Details;
