import React from 'react';
import { TagsInputWrap, TagsInput, TagsButton } from './InputTagStyles';

function TagsField({ tagsState, handleTagsSubmit }) {
  return (
    <TagsInputWrap onClick={(event) => event.stopPropagation()}>
      <TagsInput onChange={tagsState.onChange} value={tagsState.value} />
      <TagsButton onClick={handleTagsSubmit}>保存</TagsButton>
    </TagsInputWrap>
  );
}

export default TagsField;
