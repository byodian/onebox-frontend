import React, { useEffect } from 'react';
import NoteItem from '../components/NoteItem';
import noteService from '../api/note';
import Alert from '../components/AlertStyles';

const Notes = ({
  notes,
  user,
  children,
  message,
  severity,
  handleNotes,
  getLocalDate,
  compare,
  toggleLikeOf,
  deleteNoteOf,
  updateTagsOf
}) => {

  useEffect(async () => {
    try {
      const initialNotes = await noteService.getNotesByUser(user.username);
      handleNotes(initialNotes.notes.sort(compare));
    } catch(error) {
      console.log(error.message);
    }
  }, []);

  return (
    <>
      <Alert severity={severity} message={message}>{message}</Alert>
      {children}
      <ul>
        {notes.map(note =>
          <NoteItem
            key={note.id}
            note={note}
            getLocalDate={getLocalDate}
            toggleLike={() => toggleLikeOf(note.id)}
            deleteNote={() => deleteNoteOf(note.id)}
            updateTagsOf={updateTagsOf}
          />
        )}
      </ul>
    </>
  );
};

export default Notes;
