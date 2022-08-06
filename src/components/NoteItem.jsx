import React, { useEffect } from 'react';
import parse from 'html-react-parser';
import Prism from 'prismjs';
import { getLocalDate } from '../utils';
import 'prismjs/themes/prism-tomorrow.css';

function Note({ note, children }) {
  useEffect(() => {
    Prism.highlightAll();
  });

  return (
    <li
      className="flex flex-col gap-y-4 py-4 px-6 border-b first:border-t border-b-gray-100 hover:bg-gray-50"
    >
      <time className="block text-gray-400">{getLocalDate(note.date)}</time>
      <div className="prose prose-base max-w-full">{parse(note.content)}</div>
      <div className="flex select-none cursor-auto">
        <div className="flex gap-x-6 items-center">
          {note.tags.map((tag) => (
            <button
              key={tag}
              className="py-[1.5px] px-2 rounded-sm bg-[color:var(--highlight-1)] hover:text-[color:var(--highlight)] text-sm"
              type="button"
            >
              {tag}
            </button>
          ))}
        </div>
        {children}
      </div>
    </li>
  );
}

export default Note;
