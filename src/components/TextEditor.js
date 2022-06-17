import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { EditorContainer, SubmitButton } from './TextEditorStyles';

const TextEditor = ({ text, setText, handleSubmit }) => {
  return (
    <EditorContainer>
      <CKEditor
        editor={ClassicEditor}
        data={text}
        onChange={(event, editor) => {
          setText(editor.getData());
        }}
      />
      <SubmitButton type="submit" onClick={handleSubmit}>保存</SubmitButton>
    </EditorContainer>
  );
};

export default TextEditor;
