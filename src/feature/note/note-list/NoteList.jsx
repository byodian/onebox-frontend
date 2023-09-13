import { NoteItem } from '../note-item';

export function NoteList({
  notes,
  folders,
  handleStarToggle,
  handleFolderUpdate,
  handleNoteUpdate,
  handleNoteDelete,
}) {
  return (
    <ul>
      {notes.map((note) => (
        <NoteItem
          key={note.id}
          handleNoteUpdate={handleNoteUpdate}
          handleNoteDelete={handleNoteDelete}
          note={note}
          folders={folders}
          handleStarToggle={handleStarToggle}
          handleFolderUpdate={handleFolderUpdate}
        />
      ))}
    </ul>
  );
}
