import React, { useState, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { Button } from '@chakra-ui/react';

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
      'redo',

    ],
  },
};

function TextEditor({ handleNoteSubmit, initialContent }) {
  const [text, setText] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setText(initialContent || '');
  }, [initialContent]);

  const handleNoteSave = async () => {
    setIsLoading(true);
    const requestBody = {
      content: text,
    };
    await handleNoteSubmit(requestBody);
    setIsLoading(false);
    setText('');
    setIsDisabled(true);
  };

  return (
    <div className="py-6">
      <CKEditor
        editor={Editor}
        config={editorConfig}
        data={text}
        onChange={(event, editor) => {
          setText(editor.getData());
          if (editor.getData() !== '') {
            setIsDisabled(false);
          } else {
            setIsDisabled(true);
          }
        }}
      />
      <div className="text-right mt-6">
        <Button onClick={handleNoteSave} colorScheme="teal" isDisabled={isDisabled} isLoading={isLoading}>
          保存
        </Button>
      </div>
    </div>
  );
}

export default TextEditor;
