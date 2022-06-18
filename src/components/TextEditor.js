import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { EditorContainer, SubmitButton } from './TextEditorStyles';

const TextEditor = ({ createNote }) => {

  const [text, setText] = useState('');

  const addNote = (event) => {
    event.preventDefault();
    createNote({
      content: text,
      like: false
    });
    setText('');
  };

  return (
    <EditorContainer>
      <CKEditor
        editor={ClassicEditor}
        data={text}
        onChange={(event, editor) => {
          setText(editor.getData());
        }}
      />
      <SubmitButton type="submit" onClick={addNote}>保存</SubmitButton>
    </EditorContainer>
  );
};

export default TextEditor;
