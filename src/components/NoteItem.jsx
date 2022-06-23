import React from 'react';
import parse from 'html-react-parser';
import { getLocalDate } from '../utils';

function Note({ note, children }) {
  return (
    <li
      className="flex flex-col gap-y-4 py-6 px-8 border-b first:border-t border-b-gray-100 hover:bg-gray-50"
    >
      <time className="block text-2xl text-gray-400">{getLocalDate(note.date)}</time>
      <div className="prose prose-2xl max-w-full">{parse(note.content)}</div>
      <div className="flex select-none cursor-auto">
        <div className="flex text-xl gap-x-6 items-center">
          {note.tags.map((tag) => (
            <button
              key={tag}
              className="py-[1.5px] px-2 rounded-sm bg-[color:var(--highlight-1)] hover:text-[color:var(--highlight)]"
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
