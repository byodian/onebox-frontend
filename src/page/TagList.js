import React, { useEffect } from 'react';
import { TagsWrap, Tag, TagLink } from './TagListStyles';
import noteService from '../api/note';

const TagList = ({ user, tags, handleTags }) => {
  useEffect(async () => {
    try {
      const initialNotes = await noteService.getNotesByUser(user.username);
      const tags = initialNotes.notes.map(n => n.tags).flat();
      const uniqueTags = [...new Set(tags)];
      handleTags(uniqueTags);
    } catch(error) {
      console.log(error.message);
    }
  }, []);

  return (
    <TagsWrap>
      {tags.map(tag => (
        <Tag key={tag}>
          <TagLink to={`/tags/${tag}`}>{tag}</TagLink>
        </Tag>
      ))}
    </TagsWrap>
  );
};

export default TagList;
