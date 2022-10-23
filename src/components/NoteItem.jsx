import React, { useEffect } from 'react';
import parse from 'html-react-parser';
import Prism from 'prismjs';
import { getLocalDate } from '../utils';
import 'prismjs/themes/prism-tomorrow.css';
import './NoteItemStyle.scss';

function Note({ note, children }) {
  useEffect(() => {
    Prism.highlightAll();
  });

  return (
    <li
      className="note-item"
    >
      <div className="flex items-center mb-4">
        <time className="block text-gray-400">{getLocalDate(note.createdAt)}</time>
        <div className="note-item__buttons">
          {children}
        </div>
      </div>
      <div className="prose prose-base max-w-full">{parse(note.content)}</div>
    </li>
  );
}

export default Note;
