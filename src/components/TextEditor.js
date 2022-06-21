import React, { useState, useEffect } from 'react';
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

const TextEditor = ({ handleNoteSubmit, initialContent }) => {
  const [text, setText] = useState('');

  useEffect(() => {
    setText(initialContent || '');
  },[initialContent]);

  const handleNoteSave = async () => {
    if (text === '') {
      console.log('Empty note');
      return;
    }

    const requestBody = {
      content: text,
    };

    await handleNoteSubmit(requestBody);
    setText('');
  };

  return (
    <div className="py-6">
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
          type="button"
          onClick={handleNoteSave}
        >
          保存
        </button>
      </div>
    </div>
  );
};

export default TextEditor;
