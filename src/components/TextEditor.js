import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from 'ckeditor5-custom-build/build/ckeditor';

const editorConfig = {
  toolbar: {
    items: [
      'bold',
      'italic',
      'underline',
      'link',
      'bulletedList',
      'numberedList',
      'highlight',
      '|',
      'outdent',
      'indent',
      '|',
      'code',
      'codeBlock',
      'removeFormat',
      'undo',
      'redo'

    ]
  }
};

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
    <div className="py-6 border-b">
      <CKEditor
        editor={Editor}
        config = { editorConfig }
        data={text}
        onChange={(event, editor) => {
          setText(editor.getData());
        }}
      />
      <div className="text-right mt-6">
        <button
          className="bg-[#333] text-white px-4 py-1 rounded-md text-[1.4rem]"
          type="submit"
          onClick={addNote}
        >
          保存
        </button>
      </div>
    </div>
  );
};

export default TextEditor;
