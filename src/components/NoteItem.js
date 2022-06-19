import React from 'react';
import { useVisibility, useField } from '../hooks';
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
  IconWrap,
  IconGroup,
  TagsWrap,
  Tag
} from './NoteItemStyles';

import {
  FavoriteBorderIcon,
  FavoriteIcon,
  DeleteIcon,
  TagIcon,
} from './IconStyles';

const Note = ({ note, toggleLike, deleteNote, updateTag }) => {
  const [visibility, { handleVisibility }] = useVisibility(false);
  const tagsState = useField('text', note.tags.join(','));
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/notes/${note.id}`);
  };

  const handleTagUpdate = () => {
    updateTag(note.id, tagsState.value);
    handleVisibility();
  };

  return (
    <NoteItem>
      <NoteContentWrap onClick={handleClick}>
        <NoteTime>{getLocalDate(note.date)}</NoteTime>
        <NoteContent>{parse(note.content)}</NoteContent>
        <NoteGroup onClick={(event) => event.stopPropagation()}>
          <TagsWrap>
            {note.tags.map((tag, index) => (
              <Tag key={index} to={`/tags/${tag}`}>
                {tag}
              </Tag>
            ))}
          </TagsWrap>
          <IconGroup>
            <IconWrap>
              {note.like ? (
                <FavoriteIcon onClick={toggleLike}></FavoriteIcon>
              ) : (
                <FavoriteBorderIcon onClick={toggleLike}></FavoriteBorderIcon>
              )}
            </IconWrap>
            <IconWrap>
              <DeleteIcon onClick={deleteNote}></DeleteIcon>
            </IconWrap>
            <IconWrap>
              <TagIcon onClick={handleVisibility}></TagIcon>
            </IconWrap>
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
