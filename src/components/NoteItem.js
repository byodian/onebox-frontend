import React from 'react';
import { useVisibility, useField } from '../hooks';
import { useNavigate } from 'react-router-dom';
import parse from 'html-react-parser';
import InputTag from './InputTag';
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

const Note = ({ note, getLocalDate, toggleLike, deleteNote, updateTagsOf }) => {
  const tagsVisibility = useVisibility(false);
  const tagsState = useField('text', note.tags.join(','));
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/notes/${note.id}`);
  };

  const handleSubmit = () => {
    updateTagsOf(note.id, tagsState.value);
    tagsVisibility.handleVisibility();
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
              <TagIcon onClick={tagsVisibility.handleVisibility}></TagIcon>
            </IconWrap>
          </IconGroup>
        </NoteGroup>
        {tagsVisibility.visibility
          ? <InputTag tagsState={tagsState} handleTagsSubmit={handleSubmit} note={note}/>
          : null
        }
      </NoteContentWrap>
    </NoteItem>
  );
};

export default Note;
