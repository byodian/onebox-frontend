import React, { useState } from 'react';
import { useField } from '../hooks';
import { useNavigate } from 'react-router-dom';
import parse from 'html-react-parser';
import InputTag from './InputTag';
import { getLocalDate } from '../utils';

import {
  FavoriteBorderIcon,
  FavoriteIcon,
  DeleteIcon,
  TagIcon,
} from './IconStyles';

const Note = ({ note, toggleLike, deleteNote, updateTag }) => {
  const [visibility, setVisibility] = useState(false);
  const tagsState = useField('text', note.tags.join(','));
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/notes/${note.id}`);
  };

  const handleTagUpdate = () => {
    updateTag(note.id, tagsState.value);
    setVisibility(!visibility);
  };

  return (
    <li
      onClick={handleClick}
      className="flex flex-col gap-y-4 py-6 px-8 cursor-pointer border-b border-b-gray-100 hover:bg-gray-50"
    >
      <time className="block text-2xl text-gray-400">{getLocalDate(note.date)}</time>
      <div className="prose prose-2xl">{parse(note.content)}</div>
      <div className="flex select-none cursor-auto" onClick={(event) => event.stopPropagation()}>
        <div className="flex text-xl gap-x-6 items-center">
          {note.tags.map((tag, index) => (
            <button
              key={index}
              className="py-[1.5px] px-2 rounded-sm bg-[color:var(--highlight-1)] hover:text-[color:var(--highlight)]"
            >
              {tag}
            </button>
          ))}
        </div>
        <div className="flex ml-auto items-center gap-x-6">
          <div className="flex justify-center items-center w-[28px] h-[28px] rounded-full cursor-pointer hover:text-[color:var(--highlight)] hover:bg-[color:var(--highlight-1)]">
            {note.like ? (
              <FavoriteIcon onClick={toggleLike}></FavoriteIcon>
            ) : (
              <FavoriteBorderIcon onClick={toggleLike}></FavoriteBorderIcon>
            )}
          </div>
          <div className="flex justify-center items-center w-[28px] h-[28px] rounded-full cursor-pointer hover:text-[color:var(--highlight)] hover:bg-[color:var(--highlight-1)]">
            <DeleteIcon onClick={deleteNote}></DeleteIcon>
          </div>
          <div className="flex justify-center items-center w-[28px] h-[28px] rounded-full cursor-pointer hover:text-[color:var(--highlight)] hover:bg-[color:var(--highlight-1)]">
            <TagIcon onClick={() => setVisibility(!visibility)}></TagIcon>
          </div>
        </div>
      </div>
      {visibility
        ? <InputTag tagsState={tagsState} handleTagsSubmit={handleTagUpdate} note={note}/>
        : null
      }
    </li>
  );
};

export default Note;
