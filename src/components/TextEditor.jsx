import { useState, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import {
  Button,
  FormControl,
  Select,
} from '@chakra-ui/react';
import { setEditorContent } from '../utils/auth';

const editorConfig = {
  toolbar: {
    items: [
      'bold',
      'italic',
      'strikethrough',
      'underline',
      'link',
      'bulletedList',
      'numberedList',
      'code',
      'codeBlock',
    ],
  },
};

function TextEditor({
  handleNoteSubmit, initialContent, folders, initialFolderId, handleError,
}) {
  const [content, setContent] = useState('');
  const [folderId, setFolderId] = useState(initialFolderId || '');
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setContent(initialContent || '');
  }, [initialContent]);

  const handleNoteSave = async () => {
    setIsLoading(true);
    const requestBody = folderId
      ? { content, folderId }
      : { content };

    try {
      await handleNoteSubmit(requestBody);

      setIsLoading(false);
      setContent('');
      setFolderId('');
      setIsDisabled(true);
    } catch (error) {
      setIsLoading(false);
      setIsDisabled(false);
      handleError(error);
    }
  };

  const handleChange = (e) => {
    setFolderId(e.target.value);
  };

  return (
    <div className="py-6">
      <CKEditor
        className="ckeditor-test"
        editor={Editor}
        config={editorConfig}
        data={content}
        onChange={(_event, editor) => {
          const text = editor.getData();
          setContent(text);
          setEditorContent(text);

          if (editor.getData() !== '') {
            setIsDisabled(false);
          } else {
            setIsDisabled(true);
          }
        }}
      />
      <div className="flex mt-6">
        <FormControl className="mr-10">
          <Select placeholder="选择分类" value={folderId} onChange={handleChange}>
            {folders.map((folder) => (
              <option value={folder.id} key={folder.id}>{folder.name}</option>
            ))}
          </Select>
        </FormControl>
        <div className="text-right ml-auto">
          <Button onClick={handleNoteSave} colorScheme="teal" isDisabled={isDisabled} isLoading={isLoading}>
            保存
          </Button>
        </div>
      </div>
    </div>
  );
}

export default TextEditor;
