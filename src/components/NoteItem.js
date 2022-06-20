import React, { useState } from 'react';
import { useField } from '../hooks';
import { useNavigate } from 'react-router-dom';
import parse from 'html-react-parser';
import InputTag from './InputTag';
import { getLocalDate } from '../utils';

import {
  NoteItem,
  NoteContentWrap,
  NoteTime,
  NoteContent,
  NoteGroup,
  IconGroup,
  Tag
} from './NoteItemStyles';

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
    setVisibility();
  };

  return (
    <NoteItem>
      <NoteContentWrap onClick={handleClick}>
        <NoteTime>{getLocalDate(note.date)}</NoteTime>
        <NoteContent>{parse(note.content)}</NoteContent>
        <NoteGroup onClick={(event) => event.stopPropagation()}>
          <div>
            {note.tags.map((tag, index) => (
              <Tag key={index}>
                {tag}
              </Tag>
            ))}
          </div>
          <IconGroup>
            <div>
              {note.like ? (
                <FavoriteIcon onClick={toggleLike}></FavoriteIcon>
              ) : (
                <FavoriteBorderIcon onClick={toggleLike}></FavoriteBorderIcon>
              )}
            </div>
            <div>
              <DeleteIcon onClick={deleteNote}></DeleteIcon>
            </div>
            <div>
              <TagIcon onClick={setVisibility}></TagIcon>
            </div>
          </IconGroup>
        </NoteGroup>
        {visibility
          ? <InputTag tagsState={tagsState} handleTagsSubmit={handleTagUpdate} note={note}/>
          : null
        }
      </NoteContentWrap>
    </NoteItem>
  );
};

export default Note;
